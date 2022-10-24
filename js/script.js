let guardarMascotaJugador
let guardarMascotaEnemiga
let guardarAtaqueJugador
let guardarAtaqueEnemigo
let guardarVidasJugador = 3
let guardarVidasEnemigo = 3

function iniciarJuego(){
    document.getElementById("buttSeleccionar").addEventListener("click", seleccionarMascotaJugador)
    document.getElementById("buttFuego").addEventListener("click", event => seleccionarAtaque("Fuego"))
    document.getElementById("buttAgua").addEventListener("click", event => seleccionarAtaque("Agua"))
    document.getElementById("buttTierra").addEventListener("click", event => seleccionarAtaque("Tierra"))
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
    if (guardarAtaqueJugador==guardarAtaqueEnemigo) {
        generarMensajes("Empate")
    }else if(guardarAtaqueJugador == "Fuego" && guardarAtaqueEnemigo == "Tierra" || guardarAtaqueJugador == "Tierra" && guardarAtaqueEnemigo == "Agua" || guardarAtaqueJugador == "Agua" && guardarAtaqueEnemigo == "Fuego"){
        generarMensajes("Victoria")
        
        guardarVidasEnemigo--
        document.getElementById("spanVidasEnemigo").innerHTML = guardarVidasEnemigo
        if(guardarVidasEnemigo == 0 ){
            generarMensajeFinal(1)
        }
    }else{
        generarMensajes("Derrota")
        
        guardarVidasJugador--
        document.getElementById("spanVidasJugador").innerHTML = guardarVidasJugador
        if(guardarVidasJugador == 0 ){
            generarMensajeFinal(2)
        } 
    }
}
function generarMensajes(resultado){
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Tu mascota ataca con "+ guardarAtaqueJugador+", la mascota enemiga ataca con "+guardarAtaqueEnemigo+", "+resultado
    document.getElementById("mensajes").appendChild(parrafo)
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