
/**
 * Objeto que guarda el tiempo límite en horas de resolución para cada nivel de prioridad
 */
const tiempoLimite = {
    urgentes: 24,
    medias: 48,
    bajo: 168 // 7 días en horas
}


/**
 * Valida que los datos del formulario no estén vacíos
 */
function validarDatos() {
    let valido = 1;
    let datos = document.querySelector("#datos").querySelectorAll("input");
    datos.forEach((x)=>{
        if (x.value=="") {
            valido = 0;
        }
    });

    if (!valido) {
        alert("Todavía hay datos vacíos");
    }else {
        
    }
}


/**
 * Inicio del programa
 * Crea el evento para evitar recarga al enviar el form
 * Crea el evento para llamar a validarDatos() al enviar el form
 */
function inicio() {

    // Evita que la página se recargue al enviar el form
    document.querySelector("#datos").addEventListener("submit", function(x){
        x.preventDefault();
    });

    document.querySelector("#Enviar").addEventListener("click", validarDatos);

    // PENDIENTE
    // 1. Crear objeto con fecha actual
    // 2. Crear variable para gestionar el estado (tramitada, en proceso, resuelta)
    // 3. Iniciar "Responsable" con valor por defecto: sin asignar
}

inicio();