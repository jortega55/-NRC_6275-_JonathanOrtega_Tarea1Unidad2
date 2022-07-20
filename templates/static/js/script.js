
//Declaración de variables para la formacion del canvas
var canvasWidth = 600;
var canvasHeight = 400;

var player;
var playerYPosition = 200;

var fallSpeed = 0;
var interval = setInterval(updateCanvas, 20);

var isJumping = false;
var jumpSpeed = 0;

var block;

// Creación de una variable de puntuación inicializada en 0
var score = 0;
// Create a variable to hold our scoreLabel
var scoreLabel;

// Función para iniciar el juego. 
function startGame() {
    gameCanvas.start();
    player = new createPlayer(30, 30, 10);
    block = new createBlock();
    // Assign your scoreLabel variable a value from scoreLabel()
    scoreLabel = new createScoreLabel(10, 30);
}
// variable gameCanvas donde se crea el documento de canvas y se inicializa una funcion
var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}
// funcion de creación del jugador que hara los saltos
function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
   //Caracteristicas de la imagen del jugador  
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //funcion que se determina la velocidad de la caida del jugador al realizar el salto
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopPlayer();
        }
    }
    //funcion para detener al jugador mediante la altura del lienzo
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    //funcion para la velocidad de salto del jugador 
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
}
//Funcion para crear el bloque de competencia del jugador donde se determina parametros aleatorios en altura, ancho y velocidad. 
function createBlock() {
    var width = randomNumber(10, 50);
    var height = randomNumber(10, 200);
    var speed = randomNumber(2, 6);
    
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    //funcion para las Caracteristicas del loque a crear
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle =  "red";
        ctx.fillRect(this.x, this.y, width, height);
    }
    //Funcion para que el jugador reaccione despues de pasar un obstaculo
    this.attackPlayer = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    //funcion donde determina otros valores al obstaculo despues que el jugador lo sobrepase. 
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Increase your score if your block made it to the edge
            score++;
        }
    }
}
//funcion para detectar una colision o que el jugador no logre pasar el obstaculo
// se determina las condiciones donde se detendra el juego
function detectCollision() {
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;
    
    var playerBottom = player.y + player.height;
    var blockTop = block.y;
    
    if (playerRight > blockLeft && 
        playerLeft < blockLeft && 
        playerBottom > blockTop) {
        
        gameCanvas.stop();
    }
}
//funcion para la funcionalidad del marcador en la parte superior izquierda
function createScoreLabel(x, y) {
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "35px Marker Felt";
        ctx.fillStyle = "yellow";
        ctx.fillText(this.text, this.x, this.y);
    }
}
//funcion de canvas para la colision del juego 
function updateCanvas() {
    detectCollision();
    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    player.makeFall();
    player.draw();
    player.jump();
    
    block.draw();
    block.attackPlayer();
    
    // Redraw your score and update the value
    scoreLabel.text = "CRÉDITOS: " + score;
    scoreLabel.draw();
}
//funcion para un numero aleatorio
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//funcion para inicializar los saltos
function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() { resetJump(); }, 1000);
    }
}

