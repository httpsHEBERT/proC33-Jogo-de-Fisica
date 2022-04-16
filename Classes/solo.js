class Solo {

    constructor(x, y, width, height){

        var options = {
            'isStatic': true,
            'density': 1,
            'restitution': 0,
            'friction': 0
        }
            
        this.solo = Bodies.rectangle(x, y, width, height, options);
        this.width = width, this.height = height;
        World.add(world, this.solo);
    }
      
    display(){
        
        noStroke();
        fill(188, 67, 67);
        rectMode(CENTER);
        fill("#e3c54f")
        rect(this.solo.position.x, this.solo.position.y, this.width, this.height);
    }
}