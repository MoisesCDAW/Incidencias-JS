


/**
 * Objeto que guarda el tiempo límite en horas de resolución para cada nivel de prioridad
 */
const tiempoLimite = {
    urgente: 24,
    media: 48,
    baja: 168 // 7 días en horas
}


/**
 * Array con los diferente estados que puede tener una incidencia
 */
const estados = [
    "Tramitada",
    "En proceso",
    "resuelta"
];


/**
 * Pinta la tabla con las incidencias
 */
function pintaTabla(incidencia) {
    let tabla = document.createElement("table");
    let cabecera = document.createElement("tr");
    let titulos = [
        "Fecha Creación", 
        "Usuario", 
        "Teléfono", 
        "Correo", 
        "Responsable", 
        "Tipo", 
        "Prioridad", 
        "Estado",
        "Observaciones"
    ];

    titulos.forEach((x) => {
        let th = document.createElement("th");
        th.append(x);
        cabecera.append(th);
    });

    document.querySelector("body").insertBefore(tabla, document.querySelector("#indexJS"));
    tabla.append(cabecera);

}


/**
 * Crea un objeto con toda la información de la incidencia
 */
function crearIncidencia() {
    let incidencia = {
        fechaCreacion: Date(),
        nombre: document.querySelector("#Usuario"),
        telefono: document.querySelector("#Telefono"),
        email: document.querySelector("#Email"),
        responsable: "Sin asignar",
        tipo: document.querySelector("#Tipo"),
        prioridad: "",
        estado: estados[0], // Tramitada
        observaciones: document.querySelector("#Observaciones"),
        limiteResol: ""
    };

    let prioridad;

    // Busca el radio que está checked
    let radios = document.querySelector("#Prioridad").querySelectorAll("input");
    radios.forEach((x)=>{
        if (x.checked) {
            prioridad = x.value;
            incidencia.prioridad = x.value;
        }
    });

    // Asigna límite de tiempo de resolución según su prioridad
    switch (prioridad) {
        case "Urgente":
            incidencia.limiteResol = tiempoLimite.urgente; // 24 h
            break;

        case "Media":
            incidencia.limiteResol = tiempoLimite.media; // 48 h
            break;

        case "Baja":
            incidencia.limiteResol = tiempoLimite.baja; // 168 h
            break;
    
        default:
            break;
    }

    return incidencia;
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

    pintaTabla(crearIncidencia());

    // if (!valido) {
    //     alert("Todavía hay datos vacíos");
    // }else {
    //     pintaTabla(crearIncidencia());
    // }
}


/**
 * Eventos del programa
 * Crea el evento para evitar recarga al enviar el form
 * Crea el evento para llamar a validarDatos() al enviar el form
 */
function eventos() {

    // Evita que la página se recargue al enviar el form
    document.querySelector("#datos").addEventListener("submit", function(x){
        x.preventDefault();
    });

    document.querySelector("#Enviar").addEventListener("click", validarDatos);
    // document.querySelector("#Enviar").addEventListener("click", crearIncidencia);
}

eventos();