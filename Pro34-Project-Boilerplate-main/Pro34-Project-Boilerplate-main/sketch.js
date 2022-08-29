
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var solo;
var link, corda;
var cenario;
var bolaIMG;
var cestaIMG;
var cesta;
var botao;
var bola


function preload() {
  cenario = loadImage("planodefundo.png");
  cestaIMG = loadImage("cesta.png");
  bolaIMG = loadImage("bola.png");
}
function setup() {
  createCanvas(500,700);

  engine = Engine.create();
  world = engine.world;
  
  solo = new Ground(200, 680, 600, 60);


  cesta = Bodies.rectangle(200, 450, 50, 100, {isStatic: true});
  World.add(world, cesta);

  mais_leve = {
      density:0.00001, frictionAir : 1
  }
  bola = Bodies.circle(250, 100, 10, mais_leve);
  World.add(world, bola);

  corda = new Rope(7, {x: 190, y: 90});
  Composite.add(corda.body, bola);
  ligacao = new Link(corda, bola);

  corda2 = new Rope(7, {x: 340, y: 100});
  Composite.add(corda2.body, bola);
  ligacao2 = new Link(corda2, bola);
  
  botao = createImg("botaodecortar.png");
  botao.position(190, 90);
  botao.size(50, 50);
  botao.mouseClicked(soltar)

  botao2 = createImg("botaodecortar.png");
  botao2.position(340, 100);
  botao2.size(50, 50);
  botao2.mouseClicked(soltar2);

  
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
}

var venceu = false;
function draw() {
    background(cenario);

    Engine.update(engine);
    image(cenario, width/2, height/2, width, height);
    image(cestaIMG, 200, 500, 200, 200);
    image(bolaIMG, bola.position.x, bola.position.y, 20, 20);

    corda.show();
    solo.show();
    corda2.show();

    fill("brown");
    textSize(40);
    text("Acerte a cesta", 15, 50);

    var colisao = Matter.SAT.collides(cesta, bola);
    if(colisao.collided == true){
    venceu = true
   }
    if(venceu == true){
    textSize(50)
    text("PARABÉNS!", 15, 250);
    }

}

function soltar() {
  corda.break();
  ligacao.detach();
  ligacao = null;
}

function soltar2() {
  corda2.break();
  ligacao2.detach();
  ligacao2 = null;
}

