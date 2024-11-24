

/**
 * Ordena el array según fecha de resolución y según la prioridad
 */
function ordenarFechaResol(incidencias) {

    const formatearFecha = (fecha) => {
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0'); // padStart() exige dos dígitos, si no los tiene, le agrega un 0 al inicio
        const day = String(fecha.getDate()).padStart(2, '0');
        const hours = String(fecha.getHours()).padStart(2, '0');
        const minutes = String(fecha.getMinutes()).padStart(2, '0');
        const seconds = String(fecha.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const calculaHoras = (prioridad)=>{
        let horas = 24;
        if (prioridad=="Baja") {
            horas = 168;
        }else if(prioridad=="Media"){
            horas = 48;
        }
        return horas;
    }

    // Se sumas las horas correspondientes a cada incidencia
    incidencias.forEach((x)=>{
        let horas = calculaHoras(x.prioridad);

        let fecha = new Date(x.fechaCreacion);
        fecha.setHours(fecha.getHours()+horas);
    
        x.fechaCreacion = formatearFecha(fecha);
    });

    // Se ordena con las nuevas fechas de forma ascendente
    incidencias.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));

    // Regresa cada incidencia al estado original; es decir, a la fecha con la que se creó
    incidencias.forEach((x)=>{
        let horas = calculaHoras(x.prioridad);

        let fecha = new Date(x.fechaCreacion);
        fecha.setHours(fecha.getHours()-horas);
    
        x.fechaCreacion = formatearFecha(fecha);
    });

    return incidencias;
}


/**
 * Guarda la nueva incidencia en LocalStorage
 */
function guardarIncidencia(incidencia, posicion=null, nuevoEstado) {
    let incidencias = localStorage.getItem("incidencias");
    
    if (incidencias==null) {
        console.log(incidencias);
        incidencias = [];      
    }else {
        incidencias = JSON.parse(incidencias); 
    }

    if (posicion!=null) {
        posicion-=1; // -1 porque la posición son los ID de cada fila y comienzan por 1, con arrays hay que empezar en 0
        let actualizada = incidencias[posicion].estado=nuevoEstado;
        incidencias.slice(posicion, posicion, actualizada);
    }else {
        incidencias.push(incidencia);
    }

    localStorage.setItem("incidencias", JSON.stringify(incidencias));
    pintaTabla();

}


/**
 * Pinta los fondos de cada fila según su nivel de prioridad
 * También se encarga de, según el estaado, desactivar botones
 */
function pintaFondos(fila, incidencia) {
    let enProceso = fila.querySelector("#en-proceso");
    let finalizada = fila.querySelector("#finalizada");


    if (incidencia.estado=="En Proceso") {
        enProceso.setAttribute("disabled", "disabled");
    }

    fila.style.color = "white";
    if (incidencia.estado=="Finalizada") {
        enProceso.setAttribute("disabled", "disabled");
        finalizada.setAttribute("disabled", "disabled");
        fila.style.backgroundColor = "blue";
    }else {
        if (incidencia.prioridad=="Baja") {
            fila.style.backgroundColor = "green";
            
        }else if(incidencia.prioridad=="Media"){
            fila.style.backgroundColor = "orange";
        }else {
            fila.style.backgroundColor = "red";
        }
    }

    return fila;
}


/**
 * Crea los botones para una fila y le asigna los eventos
 */
function crearBotones(fila) {
    let enProceso = document.createElement("button");
    let finalizada = document.createElement("button");

    enProceso.setAttribute("id", "en-proceso");
    finalizada.setAttribute("id", "finalizada");

    // Asigna el texto a mostrar de los botones
    enProceso.append("En proceso");
    finalizada.append("Finalizada");

    enProceso.addEventListener("click", ()=>{
        let aux = fila.querySelectorAll("td");
        aux.forEach((x)=>{
            if (x.childNodes[0].nodeValue=="Tramitada") {
                x.childNodes[0].nodeValue = "En Proceso";
                guardarIncidencia(null, fila.id, "En Proceso");
            }
            
        });

        enProceso.setAttribute("disabled", "disabled");
    });

    finalizada.addEventListener("click", ()=>{

        let aux = fila.querySelectorAll("td");
        aux.forEach((x)=>{
            if (x.childNodes[0].nodeValue=="En Proceso" || x.childNodes[0].nodeValue=="Tramitada") {
                x.childNodes[0].nodeValue = "Finalizada";
                guardarIncidencia(null, fila.id, "Finalizada");
            }
        });

        fila.style.backgroundColor = "blue";
        enProceso.setAttribute("disabled", "disabled");
        finalizada.setAttribute("disabled", "disabled");
    });

    fila.append(enProceso, finalizada);

    return fila;
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
        estado: "Tramitada",
        observaciones: document.querySelector("#Observaciones").value,
    };

    

    // Formatea un objeto Date
    let date = new Date();
    let format = date.getFullYear() + "-" + (Number(date.getMonth())+1) + "-" + date.getDate();
    
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
        crearIncidencia();
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
    document.querySelector("#Borrar").addEventListener("click", ()=>{
        localStorage.removeItem("incidencias");
        location.reload();
    });
}


/**
 * Crea el DOM para el formulario
 */
export function construc_form() {
    let form = document.querySelector("#datos");

    let titulos = [
        ["Usuario", "Nombre de usuario"], 
        ["Telefono", "Télefono de contacto"],
        ["Email", "Email de contacto"], 
    ];

    let tiposIncidencia = [
        "Hardware",
        "Software",
        "Solicitud de nuevos servicios",
        "Resolución de dudas"
    ];

    let prioridad = [
        "Baja",
        "Media",
        "Urgente"
    ];
    
    let contenedor = "";
    let span = ""; 
    let textArea = document.createElement("textarea");
    let select = document.createElement("select");
    let enviar = document.createElement("button");
    let borrar = document.createElement("button");

    // Bloque para crear inputs tipo text con su <span>
    for (let i = 0; i < titulos.length; i++) {
        let contenedor = document.createElement("div");
        let input = document.createElement("input");
        let span = document.createElement("span");

        span.append(titulos[i][1]);
        input.setAttribute("id", titulos[i][0]);
        input.setAttribute("type", "text");

        contenedor.append(span, input);
        form.append(contenedor);
    }


    // Input <select> para tipo de incidencia
    contenedor = document.createElement("div");
    span = document.createElement("span");
    span.append("Tipo de incidencia");
    select.setAttribute("id", "Tipo");
    contenedor.append(span, select);

    for (let i = 0; i < tiposIncidencia.length; i++) {
        let opcion = document.createElement("option");
        opcion.append(tiposIncidencia[i]);
        select.append(opcion);
    }

    form.append(contenedor);

    // Input tipo radio para prioridad
    contenedor = document.createElement("div");
    contenedor.setAttribute("id", "Prioridad");
    span = document.createElement("span");
    span.append("Prioridad: ");
    contenedor.append(span);

    for (let i = 0; i < prioridad.length; i++) {
        let input = document.createElement("input");
        let aux = document.createElement("span");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "Prioridad");
        input.setAttribute("id", prioridad[i]);
        input.setAttribute("value", prioridad[i]);
        aux.append(prioridad[i]);
        contenedor.append(input, aux);
    }

    form.append(contenedor);

    // Input <textarea> para las observaciones
    contenedor = document.createElement("div");
    span = document.createElement("span");
    span.append("Observaciones");
    textArea.setAttribute("id", "Observaciones");
    contenedor.append(span, textArea);

    form.append(contenedor);


    // Botón de envío del form
    enviar.setAttribute("id", "Enviar");
    borrar.setAttribute("id", "Borrar");
    enviar.append("Enviar");
    borrar.append("Borrar Todo");

    form.append(enviar, borrar);
    eventos();
}


/**
 * Pinta la tabla con las incidencias
 */
export function pintaTabla() {

    let incidencias = localStorage.getItem("incidencias");

    if (incidencias==null) {
        incidencias = [];      
    }else {
        incidencias = JSON.parse(incidencias); 
    }

    // Evita que la tabla se imprima varias veces
    let tablaOld = document.querySelector("#tabla-incidencias");
    if (tablaOld!=null) {
        tablaOld.remove();
    }

    let body = document.querySelector("body");
    let primerEnlace = document.querySelector("#indexJS");
    let tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla-incidencias");
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

    // Crea las cabeceras de la tabla partiendo del array "titulos"
    titulos.forEach((x) => {
        let th = document.createElement("th");
        th.append(x);
        cabecera.append(th);
    });

    body.insertBefore(tabla, primerEnlace);
    tabla.append(cabecera);


    if (incidencias!=null) {

        // Ordena el array según fecha de resolución
        incidencias = ordenarFechaResol(incidencias);

        // Recorre el array de incidencias para imprimir cada incidencia
        let ID = 1;
        incidencias.forEach((incidencia)=>{ 
            let fila = document.createElement("tr");
            fila.setAttribute("id", ID);
            ID++;
            
            Object.values(incidencia).forEach((value)=>{ // Por cada objeto del array, añade uno a uno cada valor a una columna de la tabla
                let td = document.createElement("td");
                td.append(value);
                fila.append(td);
            });

            fila = crearBotones(fila);  
            pintaFondos(fila, incidencia);
            tabla.append(fila);
        });
    }

    localStorage.setItem("incidencias", JSON.stringify(incidencias));
} 

