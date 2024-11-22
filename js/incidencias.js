
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
 * Crea los botones para una fila y le asigna los eventos
 */
function crearBotones(fila) {
    let enProceso = document.createElement("button");
    let terminada = document.createElement("button");

    enProceso.setAttribute("id", "en-proceso");
    terminada.setAttribute("id", "terminada");

    enProceso.append("En proceso");
    terminada.append("Terminada");

    fila.append(enProceso, terminada);

    return fila;
}


/**
 * Pinta la tabla con las incidencias
 */
function crearFila(incidencia) {
    let tabla = document.querySelector("#tabla-incidencias");
    let fila = document.createElement("tr");

    // Agrega cada atributo del objeto a una columna de la nueva fila de la tabla
    Object.values(incidencia).forEach((value)=>{
        let td = document.createElement("td");
        td.append(value);
        fila.append(td);
    });

    crearBotones(fila);
    tabla.append(fila);
}


/**
 * Guarda la nueva incidencia en LocalStorage
 */
function guardarIncidencia(incidencia) {
    let incidencias = localStorage.getItem("incidencias");
    
    if (incidencias==null) {
        console.log(incidencias);
        incidencias = [];      
    }else {
        incidencias = JSON.parse(incidencias); 
    }

    incidencias.push(incidencia);
    localStorage.setItem("incidencias", JSON.stringify(incidencias));
}



/**
 * Crea un objeto con toda la información de la incidencia
 */
function crearIncidencia() {
    let incidencia = {
        fechaCreacion: "null",
        nombre: document.querySelector("#Usuario").value,
        telefono: document.querySelector("#Telefono").value,
        email: document.querySelector("#Email").value,
        responsable: "Sin asignar",
        tipo: document.querySelector("#Tipo").value,
        prioridad: "null",
        estado: estados[0], // Tramitada
        observaciones: document.querySelector("#Observaciones").value,
    };

    

    // Formatea un objeto Date
    let date = new Date();
    let format = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    
    date.getHours()<10 ? format += " 0" + date.getHours() : format += " " + date.getHours();
    date.getMinutes()<10 ? format += ":0" + date.getHours() : format += ":" + date.getMinutes();
    date.getSeconds()<10 ? format += ":0" + date.getSeconds() : format += ":" + date.getSeconds();

    incidencia.fechaCreacion = format;


    // Busca el radio que está checked
    let prioridad;
    let radios = document.querySelector("#Prioridad").querySelectorAll("input");
    radios.forEach((x)=>{
        if (x.checked) {
            prioridad = x.value;
            incidencia.prioridad = x.value;
        }
    });

    guardarIncidencia(incidencia);
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

    if (!valido) {
        alert("Todavía hay datos vacíos");
    }else {
        crearFila(crearIncidencia());
    }
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