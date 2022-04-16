const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bg, solo, paredeD, paredeE, teto;
var rede, redeImg, bola, bolaImg, slingshot1, slingshot2;
var jogador1, jogador1Img, jogador2, jogador2Img;
var placar1 = 0, placar2 = 0;
var aImg, sImg, jImg, kImg;

function preload(){
    aImg = loadImage("Images/a.png");
    sImg = loadImage("Images/s.png");
    jImg = loadImage("Images/j.png");
    lImg = loadImage("Images/l.png");
    bg = loadImage("Images/praia.jpg");
    redeImg = loadImage("Images/rede.png");
    jogador1Img = loadImage("Images/jogador1.png");
    jogador2Img = loadImage("Images/jogador2.png");
}

function setup(){

    createCanvas(1366, 620);
    engine = Engine.create();
    world = engine.world;

    var options = {
        'restitution': 0.4,
        'isStatic': true
    }

    //área de jogo
    solo = new Solo(683, 620, 1366, 40);
    paredeD = new Solo(0, 236, 20, 633);
    paredeE = new Solo(1366, 236, 20, 633);
    teto = new Solo(683, 0, 1366, 20);

    rede = Bodies.rectangle(710, 470, 35, 240, options);
    World.add(world, rede);

    bola = new Bola(200, 500, 50, 50);

    jogador1 = Bodies.rectangle(150, 500, 40, 200, options);
    World.add(world, jogador1);

    jogador2 = Bodies.rectangle(1216, 500, 40, 200, options);
    World.add(world, jogador2); 

    slingshot1 = new Slingshot(bola.body, {x: jogador1.position.x+50, y: jogador1.position.y});
    //slingshot2 = new Slingshot(bola.body, {x: jogador2.position.x-50, y: jogador1.position.y});
}

function draw(){

    imageMode(CORNER);
    background(bg);
    
    Engine.update(engine);

    exibir();
    mover();
    placar();
    sacar();
}

//exibi os corpos
function exibir(){

    solo.display();
    bola.display();

    imageMode(CENTER);
    image(redeImg, rede.position.x, rede.position.y+30, 500, 400);
    image(jogador1Img, jogador1.position.x+10, jogador1.position.y, 70, 200);
    image(jogador2Img, jogador2.position.x-10, jogador2.position.y, 70, 200);

    image(aImg, 41, 100, 50, 50);
    image(sImg, 91, 101, 47, 47);
    image(jImg, 1275, 100, 50, 50);
    image(lImg, 1327, 101, 50, 50);
}

//movimento dos personagens
function mover(){

    if(keyCode == 68){
        Matter.Body.setPosition(this.jogador1, {x: jogador1.position.x+30, y: jogador1.position.y});
        keyCode = null;
    }

    if(keyCode == 65){
        Matter.Body.setPosition(this.jogador1, {x: jogador1.position.x-30, y: jogador1.position.y});
        keyCode = null;
    }

    if(keyCode == 74){
        Matter.Body.setPosition(this.jogador2, {x: jogador2.position.x-30, y: jogador2.position.y});
        keyCode = null;
    }

    if(keyCode == 76){
        Matter.Body.setPosition(this.jogador2, {x: jogador2.position.x+30, y: jogador2.position.y});
        keyCode = null;
    }
}

//segurar a bola
function mouseDragged(){
    Matter.Body.setPosition(bola.body, {x: mouseX , y: mouseY});
}

//soltar a bola
function mouseReleased(){
    slingshot1.fly();
    slingshot2.fly();
}

//exibir o placar
function placar(){
    stroke(0);
    textSize(40);
    strokeWeight(5);
    fill("green");
    text(placar1, 30, 50);
    fill("orange");
    text(placar2, 1316, 50);
}

//preparar bola para o saque e aumentar o placar
function sacar(){

    if(bola.body.position.y > 575){
        
        if(bola.body.position.x < 683){
            //slingshot2.attach(bola.body);
            placar2++;
        }else{
            placar1++;
            slingshot1.attach(bola.body);
        }
    }
}