//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;

//Velocidade da bolinha
let raio = diametro / 2;
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10
let raqueteAltura = 90
let colidiu = false

//Variáveis raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//Placar do jogo
let meusPontos = 0
let pontosDoOponente = 0

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificacaoLimiteBorda();
    mostraRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    incluiPlacar();
    marcaPonto();
}
function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}
function movimentaBolinha() {
    xBolinha += velocidadexBolinha;
    yBolinha += velocidadeyBolinha;
}
function verificacaoLimiteBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadexBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeyBolinha *= -1;
    }
}
function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
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
    colidiu =
        collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio)
    if (colidiu) {
        velocidadexBolinha *= -1;
        raquetada.play();
    }
}
function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar
    calculaChanceDeErrar()
}
function incluiPlacar() {
    textAlign(CENTER)
    stroke(255);
    textSize(20);
    fill(color(255, 140, 0));
    rect(130, 5, 40, 30);
    fill(255);
    text(meusPontos, 150, 26);
    fill(color(255, 140, 0));
    rect(430, 5, 40, 30);
    fill(255);
    text(pontosDoOponente, 450, 26);
}
function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}
function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}
function calculaChanceDeErrar() {
    if (pontosDoOponente >= meusPontos) {
        chanceDeErrar += 1
        if (chanceDeErrar >= 39) {
            chanceDeErrar = 40
        }
    } else {
        chanceDeErrar -= 1
        if (chanceDeErrar <= 35) {
            chanceDeErrar = 35
        }
    }
}
