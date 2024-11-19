
/**
 * Objeto que guarda el tiempo límite de resolución para cada nivel de prioridad
 */
const tiempoLimite = {
    urgentes: 24,
    medias: 48,
    bajo: 168
}


/**
 * Inicio del programa
 * Crea el evento para evitar recarga al enviar el form
 */
function inicio() {

    // Evita que la página se recargue al enviar el form
    document.querySelector("#datos").addEventListener("submit", function(x){
        x.preventDefault();
    });

    // PENDIENTE
    // 1. Crear objeto con fecha actual
    // 2. Crear variable para gestionar el estado (tramitada, en proceso, resuelta)
    // 3. Iniciar "Responsable" con valor por defecto: sin asignar
}

inicio();