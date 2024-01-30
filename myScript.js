let iconos;

function cargarIconos() {
    iconos = [
        '<i class="fa-solid fa-cake-candles"></i>',
        '<i class="fa-solid fa-clover"></i>',
        '<i class="fa-solid fa-leaf"></i>',
        '<i class="fa-solid fa-camera-retro"></i>',
        '<i class="fa-regular fa-calendar-days"></i>',
        '<i class="fa-solid fa-car"></i>',
        '<i class="fa-solid fa-carrot"></i>',
        '<i class="fa-solid fa-caravan"></i>',
        '<i class="fa-solid fa-file"></i>',
        '<i class="fa-solid fa-film"></i>',
        '<i class="fa-solid fa-fish"></i>',
        '<i class="fa-solid fa-fire"></i>'
    ]
}


function generarTablero() {
    cargarIconos();
    let tablero = document.getElementById("tablero");
    let tarjetas = [];
    selecciones = [];

    cantidadTarjetas = 4;

    for (let i = 0; i < cantidadTarjetas; i++) {
        tarjetas.push(
            `<div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                <div class="tarjeta" id="tarjeta${i}">
                    <div class="cara trasera" id="trasera${i}">
                        ${iconos[0]}
                    </div>
                    <div class="cara frontal">
                        <i class="fa-solid fa-question"></i>
                    </div>
                </div>
            </div>`
        )

        if (i % 2 == 1) {
            iconos.splice(0, 1)
        }
    }

    tarjetas.sort(() => Math.random() - 0.5);

    tablero.innerHTML = tarjetas.join("");

}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i);
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }

    if (selecciones.length == 2) {
        deseleccionar(selecciones);
        selecciones = [];
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
        let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
        let trasera1 = document.getElementById("trasera" + selecciones[0]);
        let trasera2 = document.getElementById("trasera" + selecciones[1]);

        if (trasera1.innerHTML != trasera2.innerHTML) {
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";
        } else {
            trasera1.style.background = "plum";
            trasera2.style.background = "plum";
        }
        if(verificarFin()){
            swal.fire({
                title: "El juego ha finalizado",
                text: "¡Enhorabuena!",
                icon: "sucess"
            })
        }
    }, 1000)
}

function verificarFin() {
    for (let i = 0; i < cantidadTarjetas; i++) {
        let trasera = document.getElementById("trasera" + i);
        if (trasera.style.background != 'plum') {
            return false;
        } 
    }
    return true;
}