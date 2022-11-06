// variales
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivo = null;

// elementos html
let mostrarMovimientos = document.getElementById("moviminetos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempo");

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});

// funciones 

function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivo);
            bloqueartarjetas();
        }
    },1000);
}

function bloqueartarjetas(){
    for (let i = 0; i <= 15 ; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="imagenes/${numeros[i]}.png">`;
        tarjetaBloqueada.disable = true;
    }
}

// funcion principal
function destapar(id){

    if (temporizador==false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas == 1) {
        // mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="imagenes/${primerResultado}.png">`;

        // desabilitar el sabilitar el primer boton
        tarjeta1.disable = true;

    }else if(tarjetasDestapadas == 2){
        // mostrar el segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="imagenes/${segundoResultado}.png">`;
        // desabilitar el sabilitar el segundo boton
        tarjeta2.disable = true;
        // incrementar moviminetos 
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;

            // aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos ${aciertos} GUAOOO!!!` ;
                mostrarTiempo.innerHTML = `Solo te demoraste ${timerInicial - timer} EXCELENTE!!!` ;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} MUY BIEN!!`;
            }

        }else{
            // mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disable = false;
                tarjeta2.disable = false;
                tarjetasDestapadas = 0;
            },1000);
        }
    }
}
