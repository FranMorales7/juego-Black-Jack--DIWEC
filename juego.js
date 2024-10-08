///definicion de variables y objetos
let baraja = [];
const TipoCarta = ["C", "D", "P", "T"];
const Especiales = ["A", "K", "Q", "J"];
let puntos = 0;
let puntosJugador = 0,
    puntosBanca = 0;

//Referencias al html
const btPedir = document.querySelector("#btnPedir");
const btPasar = document.querySelector("#btnPasar");
const btNuevo = document.querySelector("#btnNuevo");
const marcador = document.querySelectorAll("small");
const divCartaJugador = document.querySelector("#jugador-cartas");
const divCartaBanca = document.querySelector("#banca-cartas");
const resultado = document.querySelector("#Ganador");


//variable para crear la baraja y repartir
const crearBaraja = () => {
    for (let a = 2; a <= 10; a++){
        for (let tipo of TipoCarta){
            baraja.push(a+tipo);
        }
    }

    for (let esp of Especiales){
        for (let tipo of TipoCarta){
            baraja.push(esp+tipo);
        }
    }
    //Desordenar las cartas
    baraja = _.shuffle(baraja);
    console.log(baraja);
    return baraja;
};

//pedir una carta y retirar de la baraja
const pedirCarta = () => {
    if(baraja.lenght === 0){
        throw "No hay cartas";
    }else{
        const carta = baraja.pop(); 
        return carta; 
    }
};

//calcular el valor de la carta
const valorCarta = (carta) =>{
    let puntos = carta.substring(0, carta.length - 1);
    let valor = isNaN(puntos) ? (puntos === "A" ? 11 : 10) : puntos * 1;
    return valor;
};

//Eventos
//click sobre boton Pedir
btPedir.addEventListener('click', () => {
    //sacar carta del array Baraja
    const carta = pedirCarta();
    //calcular puntos actuales del jugador
    puntosJugador += valorCarta(carta);
    //mostrar los puntos en el marcador
    marcador[0].innerText = puntosJugador;
    console.log(puntosJugador);
    
    //Se crea una nueva carta
    const nuevaCarta = document.createElement("img");
    nuevaCarta.classList.add("carta");
    nuevaCarta.src = "cartas/img/"+carta+".png";
    divCartaJugador.append(nuevaCarta);

    //Controlar puntos del jugador
    if (puntosJugador > 21){
        resultado.innerText = "--- Jugador 1 PIERDE ---"
        
        //el boton Pedir y el boton Pasar no se podran usar, ademas sera el turno de la banca
        btPedir.disabled = true;
        btPasar.disabled = true;
        turnoBanca(puntosJugador);
    } else if (puntosJugador === 21){
        resultado.innerText = "--- Jugador 1 GANA ---"
       
        //el boton Pedir y el boton Pasar no se podran usar, ademas sera el turno de la banca
        btPedir.disabled = true;
        btPasar.disabled = true;
        turnoBanca(puntosJugador);
    }

});

//click sobre el boton Pasar
btPasar.addEventListener('click', () => {
    //el boton Pedir y el boton Pasar no se podran usar, ademas sera el turno de la banca
    btPedir.disabled =  true;
    btPasar.disabled =  true;
    turnoBanca(puntosJugador);

});

//Turno de la banca

const turnoBanca = (puntosJugador) =>{
    //La banca seguira pidiendo cartas hasta que supere al jugador o saqué más de 21 puntos
    do {
    //sacar carta del array Baraja
    const cartaBanca = pedirCarta();
    //calcular puntos actuales de la banca
    puntosBanca += valorCarta(cartaBanca);
    //mostrar los puntos en el marcador
    marcador[1].innerText = puntosBanca;
    console.log(puntosBanca);
    //Muestra la carta de la banca
    const cartaImgBanca = document.createElement("img");
    cartaImgBanca.classList.add("carta");
    cartaImgBanca.src = "cartas/img/"+cartaBanca+".png";
    divCartaBanca.append(cartaImgBanca);
    }
    while (puntosBanca<puntosJugador && puntosJugador<=21);
    
    //Controlar puntos de la banca
    if (puntosBanca === puntosJugador ){
        resultado.innerText = "--- EMPATE ---"
    }
    else if (puntosBanca > 21){
        resultado.innerText = "--- Banca PIERDE ---"
        btPedir.disabled = true;
        btPasar.disabled = true;
    } else if (puntosBanca === 21){
        resultado.innerText = "--- Banca GANA ---"
        btPedir.disabled = true;
        btPasar.disabled = true;
    } else if (puntosBanca>puntosJugador){
        resultado.innerText = "--- Banca GANA ---"
        btPedir.disabled = true;
        btPasar.disabled = true;
    }
}


//click sobre el boton Nuevo
btNuevo.addEventListener('click', () => {
    //Se reinicia todos los objetos y se deja en blanco y se crea una nueva baraja
    btPedir.disabled = false;
    btPasar.disabled = false;
    baraja = [];
    crearBaraja();
    puntosBanca = 0;
    puntosJugador = 0;
    marcador[0].innerHTML = "0";
    marcador[1].innerHTML = "0";
    divCartaJugador.innerHTML = "";
    divCartaBanca.innerHTML = "";
    resultado.innerText = "Ganador Aquí";

});


crearBaraja();
console.log(baraja);