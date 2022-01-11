function startGame() {
    myGameArea.start();
    ninja.loadImages();
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.drawGameObject(ninja);
    ninja.update();
    myGameArea.draw(blocco1);
    myGameArea.draw(ninja);
    movement();

}
function collisioni(blocco) {
    if (ninja.y < (blocco.y + blocco.height) & (ninja.y + ninja.height) > blocco.y){
        if ((ninja.x + ninja.width + hsp) > blocco.x & ninja.x + hsp < (blocco.x + blocco.width)){
           hsp = 0;
        }
    }
    if (ninja.x < (blocco.x + blocco.width) & (ninja.x + ninja.width) > blocco.x){
        if ((ninja.y + ninja.height + vsp) > blocco.y & ninja.y + vsp < (blocco.y + blocco.height)){
           vsp = 0;
        }
     }
     
}
function border() {
    if (ninja.x + hsp < 0) {
        hsp = 0; 
    }
    if (ninja.y + vsp < 0) {
        vsp = 0; 
    }
    if (ninja.x + hsp + ninja.width > 1080) {
        hsp = 0; 
    }
    if (ninja.y + vsp + ninja.height > 720) {
        vsp = 0; 
    }
}

function movement() {
    hsp = 3 * (keyboard.right - keyboard.left);
    vsp = 3 * (keyboard.down - keyboard.up);

    collisioni(blocco1);
    border();

    ninja.x += hsp;
    ninja.y += vsp;
}

var keyboard = {
    up: false,
    down: false,
    left: false,
    right: false
}

var myGameArea = {  
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1080;
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

let hsp = 0;
let vsp = 0;

var blocco1 = {
    width: 50,
    height: 50,
    x: 50,
    y: 50 ,
    color: "grey",
}

var ninja = {
    width: 40,
    height: 40,
    x: 10,
    y: 120,
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

var bomba = {
    width: 40, 
    height: 40,
    x: ninja.x ,
    y: ninja.y ,
}

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

class Blocco {
    constructor(x , y) {
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
    }
}