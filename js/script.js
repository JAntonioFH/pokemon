let guardarMascotaJugador
let guardarMascotaEnemiga
let guardarAtaqueJugador
let guardarAtaqueEnemigo
let guardarVidasJugador = 3
let guardarVidasEnemigo = 3
let arregloMokepones = []
let opcionMokepones

class Mokepon{
    constructor(nombre, foto, vida, ){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}
let bulbasaur = new Mokepon('bulbasaur','./assets/bulbasaur.png',5)
let charmander = new Mokepon('charmander','./assets/charmander.png',5)
let squirtle = new Mokepon('squirtle','./assets/squirtle.png',5)
bulbasaur.ataques.push(
    { nombre: '🌱', id:'buttTierra'},
    { nombre: '🌱', id:'buttTierra'},
    { nombre: '🌱', id:'buttTierra'},    
    { nombre: '💧', id:'buttAgua'},
    { nombre: '🔥', id:'buttFuego'},
)
charmander.ataques.push(
    { nombre: '🔥', id:'buttFuego'},
    { nombre: '🔥', id:'buttFuego'},
    { nombre: '🔥', id:'buttFuego'},
    { nombre: '💧', id:'buttAgua'},
    { nombre: '🌱', id:'buttTierra'},
)
squirtle.ataques.push(
    { nombre: '💧', id:'buttAgua'},
    { nombre: '💧', id:'buttAgua'},
    { nombre: '💧', id:'buttAgua'},
    { nombre: '🔥', id:'buttFuego'},
    { nombre: '🌱', id:'buttTierra'},
)
arregloMokepones.push(bulbasaur,charmander,squirtle)

function iniciarJuego(){
    document.getElementById("buttSeleccionar").addEventListener("click", seleccionarMascotaJugador)
    document.getElementById("buttFuego").addEventListener("click", event => seleccionarAtaque("Fuego"))
    document.getElementById("buttAgua").addEventListener("click", event => seleccionarAtaque("Agua"))
    document.getElementById("buttTierra").addEventListener("click", event => seleccionarAtaque("Tierra"))
    arregloMokepones.forEach(mokepon => {
        opcionMokepones=`
        <input class="botones-seleccionar-mascota" type="radio" name="mascotas" id=${mokepon.nombre}>
        <label class="tarjeta-de-pokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}/>
        </label>
        `
        document.getElementById("contenedor-tarjetas").innerHTML += opcionMokepones
    })
}
function seleccionarMascotaJugador(){
    if (document.getElementById("bulbasaur").checked == true) {
        guardarMascotaJugador = "Bulbasaur" 
        seleccionarMascotaEnemigo()
        document.getElementById("spanNombreMascotaJugador").innerHTML = guardarMascotaJugador     
    }else if(document.getElementById("charmander").checked == true){
        guardarMascotaJugador = "Charmander" 
        seleccionarMascotaEnemigo()
        document.getElementById("spanNombreMascotaJugador").innerHTML = guardarMascotaJugador  
    }else if(document.getElementById("squirtle").checked == true){
        guardarMascotaJugador = "Squirtle" 
        seleccionarMascotaEnemigo()
        document.getElementById("spanNombreMascotaJugador").innerHTML = guardarMascotaJugador  
    }else{
        alert("Porfavor selecciona una mascota")
    }
}
function seleccionarMascotaEnemigo(){
    document.getElementById("seleccionar-ataque").style.display = "block"
    document.getElementById("seleccionar-mascota").style.display = "none"
    let numeroAleatorio=aleatorio(1,3)

    if (numeroAleatorio == 1 ) {
        guardarMascotaEnemiga = "Bulbasaur" 
        document.getElementById("spanNombreMascotaEnemiga").innerHTML = "Bulbasaur"
    }else if(numeroAleatorio == 2){
        guardarMascotaEnemiga = "Charmander" 
        document.getElementById("spanNombreMascotaEnemiga").innerHTML = "Charmander"
    }else if(numeroAleatorio == 3){
        guardarMascotaEnemiga = "Squirtle"
        document.getElementById("spanNombreMascotaEnemiga").innerHTML = "Squirtle" 
    }
}
function seleccionarAtaque(ataque){
    if(guardarVidasEnemigo && guardarVidasJugador > 0){
        guardarAtaqueJugador = ataque
        ataqueAleatorio()
    }
}
function ataqueAleatorio(){
    let numeroAleatorio = aleatorio(1,3)
    if (numeroAleatorio == 1) {
        guardarAtaqueEnemigo = "Fuego"
    }else if(numeroAleatorio == 2){
        guardarAtaqueEnemigo = "Agua"
    }else if(numeroAleatorio == 3){
        guardarAtaqueEnemigo = "Tierra"
    }
    combate()
}
function combate(){
    let palomita = document.createElement("span")
    palomita.innerHTML = "✔"
    if (guardarAtaqueJugador==guardarAtaqueEnemigo) {
        generarMensajes("Empate")
    }else if(guardarAtaqueJugador == "Fuego" && guardarAtaqueEnemigo == "Tierra" || guardarAtaqueJugador == "Tierra" && guardarAtaqueEnemigo == "Agua" || guardarAtaqueJugador == "Agua" && guardarAtaqueEnemigo == "Fuego"){
        generarMensajes("Victoria")
        
        guardarVidasEnemigo--
        document.getElementById("spanVidasEnemigo").innerHTML = guardarVidasEnemigo
        document.getElementById("victoriasJugador").appendChild(palomita)
        if(guardarVidasEnemigo == 0 ){
            generarMensajeFinal(1)
        }
    }else{
        generarMensajes("Derrota")
        
        guardarVidasJugador--
        document.getElementById("spanVidasJugador").innerHTML = guardarVidasJugador
        document.getElementById("victoriasEnemigo").appendChild(palomita)
        if(guardarVidasJugador == 0 ){
            generarMensajeFinal(2)
        } 
    }
}
function generarMensajes(resultado){
    document.getElementById("resultado-de-batalla").innerHTML =  resultado
    let simboloElementoJugador
    let simboloElementoMaquina
    let generarSimbolos = document.createElement("span")
    let generarSimbolosM = document.createElement("span")
    if (guardarAtaqueJugador == "Fuego") {
        simboloElementoJugador= "🔥"
        generarSimbolos.innerHTML = simboloElementoJugador
    }else if(guardarAtaqueJugador == "Agua"){
        simboloElementoJugador= "💧"
        generarSimbolos.innerHTML = simboloElementoJugador
    }else{
        simboloElementoJugador= "🌱"
        generarSimbolos.innerHTML = simboloElementoJugador
    }
    if (guardarAtaqueEnemigo == "Fuego") {
        simboloElementoMaquina= "🔥"
        generarSimbolosM.innerHTML = simboloElementoMaquina
    }else if(guardarAtaqueEnemigo == "Agua"){
        simboloElementoMaquina= "💧"
        generarSimbolosM.innerHTML = simboloElementoMaquina
    }else{
        simboloElementoMaquina="🌱"
        generarSimbolosM.innerHTML = simboloElementoMaquina
    }
    document.getElementById("ataques-jugador").appendChild(generarSimbolos)
    document.getElementById("ataques-maquina").appendChild(generarSimbolosM)
console.log(simboloElementoMaquina)
}
function generarMensajeFinal(r){
    let parrafo = document.createElement("p")
    document.getElementById("buttFuego").disabled=true
    document.getElementById("buttAgua").disabled=true
    document.getElementById("buttTierra").disabled=true
    document.getElementById("buttReiniciar").style.display = "block"
    if(r == 1){
        parrafo.innerHTML = "Felicidades!! Ganaste"
        document.getElementById("mensajes").appendChild(parrafo)
    }else{
        let parrafo = document.createElement("p")
        parrafo.innerHTML = "Perdiste :(("
        document.getElementById("mensajes").appendChild(parrafo)
    }
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min + 1)+min)
}
function reiniciar(){
    location.reload()
}
window.addEventListener("load", iniciarJuego)