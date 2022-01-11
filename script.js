function startGame() {
    myGameArea.start();
    ninja.loadImages();
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.drawGameObject(ninja);
    ninja.update();
    myGameArea.draw(ninja);
    movement();

    
    if (keyboard.spacebar) {
        myGameArea.draw(bomba)
        bomba.explosionF();
        if (bomba.exploded) {
            myGameArea.draw(bomba.explosion.hrzEx);
            myGameArea.draw(bomba.explosion.vrtEx);
        }
    }
}
function collisioni(blocco) {
    if (ninja.y < (blocco.y + blocco.height) & (ninja.y + ninja.height) > blocco.y){
        if ((ninja.x + ninja.width + ninja.hsp) > blocco.x & ninja.x + ninja.hsp < (blocco.x + blocco.width)){
           ninja.hsp = 0;
        }
    }
    if (ninja.x < (blocco.x + blocco.width) & (ninja.x + ninja.width) > blocco.x){
        if ((ninja.y + ninja.height + ninja.vsp) > blocco.y & ninja.y + ninja.vsp < (blocco.y + blocco.height)){
           ninja.vsp = 0;
        }
     }
     
}
function border() {
    if (ninja.x + ninja.hsp < 0) {
        ninja.hsp = 0; 
    }
    if (ninja.y + ninja.vsp < 0) {
        ninja.vsp = 0; 
    }
    if (ninja.x + ninja.hsp + ninja.width > myGameArea.canvas.width) {
        ninja.hsp = 0; 
    }
    if (ninja.y + ninja.vsp + ninja.height > myGameArea.canvas.height) {
        ninja.vsp = 0; 
    }
}

function blocchiF() {
    for(let i = 0; i < blocchi.length; i++) {
        myGameArea.draw(blocchi[i]);
        collisioni(blocchi[i]);
    }
}

function movement() {
    ninja.hsp = 3 * (keyboard.right - keyboard.left);
    ninja.vsp = 3 * (keyboard.down - keyboard.up);

    border();
    blocchiF();

    ninja.x += ninja.hsp;
    ninja.y += ninja.vsp;
}

var keyboard = {
    up: false,
    down: false,
    left: false,
    right: false,
    spacebar: false
}

var myGameArea = {  
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1100;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 16,6); //ogni 16,6 ms chiamo il metodo updateGameArea
    } ,
    draw: function(component) {
        this.context.fillStyle = component.color;
        this.context.fillRect(component.x, component.y, component.width, component.height);
    } , 
    clear : function() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
    } , 
    drawGameObject: function(gameObject) {
        this.context.drawImage(
          gameObject.image,
          gameObject.x,
          gameObject.y,
          gameObject.width,
          gameObject.height
        )
    } ,
}

var bomba = {
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    color: "black",
    place: false,
    timer: 2500,
    exploded: false,

    explosion: {
        hrzEx : {
            x: 0,
            y: 0,
            width: 300,
            height: 60
        } ,
        vrtEx : {
            x: 0,
            y: 0,
            width: 60,
            height: 300
        }
    } ,
    explosionF: function() {
        if (!bomba.place ) {
            bomba.x = ninja.x;
            bomba.y = ninja.y;
        }
        console.log(bomba.place)
        switch (bomba.timer) {
            case 2500: bomba.place = true;
            bomba.timer--;
            break;
            case 0: this.exploded = true;
            bomba.timer--;
            break;
            case -500: 
                this.exploded = false;
                this.place = false;
                bomba.timer--;
                keyboard.spacebar = false;
            break;
            default: bomba.timer--;
        }
    } 
}

var ninja = {
    width: 80,
    height: 80,
    x: 10,
    y: 300,
    hsp: 0,
    vsp: 0,
    color: "yellow", 
    imageList: [], 
    contaFrame: 0, 
    actualFrame: 0,
    update: function() {
        this.contaFrame++;
        if (this.contaFrame == 5) {
          this.contaFrame = 0;
          this.actualFrame = (1 + this.actualFrame) % this.imageList.length;
          //console.log(this.actualFrame);
          this.image = this.imageList[this.actualFrame];
        }
    },
      
    loadImages: function() {
        for (imgPath of running) {
        var img = new Image(this.width, this.height);
        img.src = imgPath;
        this.imageList.push(img);
        }
        this.image = this.imageList[this.actualFrame];
    } 
};

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "ArrowLeft": keyboard.left = true;
        break;
        case "ArrowRight": keyboard.right = true;
        break;
        case "ArrowUp": keyboard.up = true;
        break;
        case "ArrowDown": keyboard.down = true;
        break;
        case " ": keyboard.spacebar = true;
        break;
    }
});

document.addEventListener('keyup', function(event) {
    switch (event.key) {
        case "ArrowLeft": keyboard.left = false;
        break;
        case "ArrowRight": keyboard.right = false;
        break;
        case "ArrowUp": keyboard.up = false;
        break;
        case "ArrowDown": keyboard.down = false;
        break;
    }
});

//ArrayBlocchi
blocchi = [
    {
        width : 100, 
        height : 100, 
        x: 100, 
        y: 100, 
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 300, 
        y: 100,
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 500, 
        y: 100,
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 700, 
        y: 100,
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 900, 
        y: 100,
        color: "grey"
    } ,
    //2nd
    {
        width : 100, 
        height : 100, 
        x: 100, 
        y: 300, 
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 300, 
        y: 300,
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 500, 
        y: 300,
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 700, 
        y: 300,
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 900, 
        y: 300,
        color: "grey"
    } ,
    //3rd
    {
        width : 100, 
        height : 100, 
        x: 100, 
        y: 500, 
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 300, 
        y: 500,
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 500, 
        y: 500,
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 700, 
        y: 500,
        color: "grey"
    } ,
    {
        width : 100, 
        height : 100, 
        x: 900, 
        y: 500,
        color: "grey"
    } ,
];