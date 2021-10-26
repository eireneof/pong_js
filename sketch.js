// variáveis do canvas
let widht = 600;
let height = 400;

// variáveis da bolinha 
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 15;
let raioBolinha = diametroBolinha / 2;

// variáveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variáveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let velocidadeXOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

// function preload() {
//     trilha = loadSound("trilha.mp3");
//     ponto = loadSound("ponto.mp3");
//     raquetada = loadSound("raquetada.mp3");
// }


let colidiu = false;

function setup() {
    createCanvas(widht, height);
    // trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    mostraRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaBolinha();
    movimentaMinhaRaquete();
    movimentaRaqueteOponente();
    verificaColisaoBorda();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluirPlacar();
    marcaPonto();
       
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametroBolinha)
}

function mostraRaquete(x, y) {
    rect(x, y, comprimentoRaquete, alturaRaquete);
}


function movimentaBolinha() { 
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if(xBolinha + raioBolinha > widht || xBolinha - raioBolinha < 0) {
        velocidadeXBolinha *= -1;
    }
    
    if(yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0) {
        velocidadeYBolinha *= -1;
    }
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
    if(colidiu) {
        velocidadeXBolinha *= -1;
        // raquetada.play();
    }
}

function movimentaRaqueteOponente(){
    velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
    calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
    if (pontosOponente >= meusPontos) {
      chanceDeErrar += 1
      if (chanceDeErrar >= 39){
      chanceDeErrar = 40
      }
    } else {
      chanceDeErrar -= 1
      if (chanceDeErrar <= 35){
      chanceDeErrar = 35
      }
    }
  }

function incluirPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosOponente, 470, 26);
}

function marcaPonto(){
    if(xBolinha > 590) {
        meusPontos += 1;
        // ponto.play();
    }
    if(xBolinha < 10) {
        pontosOponente += 1;
        // ponto.play();
    }
}