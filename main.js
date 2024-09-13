var canvas;
var ctx;
var FPS = 5

// ESCENARIO / TABLERO
var columns = 50;
var rows = 50;
var escenario; //matriz del nivel

// TILES / Cuadros / mosaicos
var withTile;
var heightTiles;

const muro = "#000000"
const camino = "#888888"


// RUTA
var principio;
var fin;

var openSet = [];
var closedSet = [];

var caminoSet = [];
var terminado = false;



// Creamos un array 2D
function createArray2D(r,c) {
  var obj = new Array(r)
  for (let index = 0; index < r; index++) {
    obj[index] = new Array(c)
    
  }
  return obj
}

function Casillas(x, y) {

  // Positions
  this.x = x
  this.y = y
  

  // types (obstaculo =1 , vacio = 0)
  this.tipo = 0

  var aleatorio = Math.floor(Math.random()*5) // valor entre 0 y 4
  if(aleatorio === 1){
    this.tipo = 1 
  }

  // PESOS
  this.f = 0 // coste total (g+h)
  this.g = 0 // pasos dados
  this.h = 0 // heuristica (estimacion de lo que queda)

  this.vecions = [];
  this.padres = null;

  // metodo que calcula sus vecinos
  this.addVecions = function (params) {
    if(this.x > 0){
      this.vecions.push(escenario[this.y][this.x-1])
    }

    if(this.x < rows-1){
      this.vecions.push(escenario[this.y][this.x+1])
    }

    if(this.y > 0){
      this.vecions.push(escenario[this.y-1][this.x])
    }

    if(this.y > columns -1){
      this.vecions.push(escenario[this.y+1][this.x])
    }
  }


  // Metodo que dibuja
  this.dibuja = function () {
    var color; 

    if(this.tipo == 0){
      color = camino;
    }

    if(this.tipo == 1){
      color = muro;
    }

    // Dibujamos el cuadro en el canvas

    ctx.fillStyle = color;
    ctx.fillRect(this.x*withTile, this.y*heightTiles, withTile, heightTiles)

  }

}


function Inicialized(params) {
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext('2d')

  // CALCUMAMOS EL TAMAÑO  DE LOS TILES (proporcionalmente)
  withTile = parseInt(canvas.width / columns)
  heightTiles = parseInt(canvas.height / rows)

  // Cramos matriz
  escenario = createArray2D(rows, columns)

  // AÑADIMOS LOS OBJETOS CASILLAS
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      escenario[i][j] = new Casillas(i,j)
      
    }
  }

  // AÑADIR VECINOS
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      escenario[i][j].addVecions()
      
    }
  }


  // CREAMOS ORIGEN Y DESTINO DE LA RUTA
  principio = escenario[0][0]
  fin = escenario[columns-1][fillRect-1]


  // INICIALIZAMOS OPENSET
  openSet.push(principio);
  

  // BUCLE PRINCIPAL
  setInterval(() => {
    main()
  }, 1000/FPS);
}


function dibujarEscenario(params) {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      escenario[i][j].dibuja()
      
    }
  }
}

function main() {
  dibujarEscenario()
}