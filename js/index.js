
/**
 * Crea el DOM para el formulario
 */
function construc_form() {
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
    let boton = document.createElement("button");

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
    boton.setAttribute("id", "Enviar");
    boton.append("Enviar");
    form.append(boton);
}


/**
 * Crea los botones para una fila y le asigna los eventos
 */
function crearBotones(fila) {
    let enProceso = document.createElement("button");
    let terminada = document.createElement("button");

    enProceso.append("En proceso");
    terminada.append("Finalizada");

    enProceso.addEventListener("click", ()=>{

        let aux = fila.querySelectorAll("td");
        aux.forEach((x)=>{
            if (x.childNodes[0].nodeValue=="Tramitada") {
                x.childNodes[0].nodeValue = "En Proceso";
            }
            
        });

        enProceso.setAttribute("disabled", "disabled");
    });

    terminada.addEventListener("click", ()=>{

        let aux = fila.querySelectorAll("td");
        aux.forEach((x)=>{
            if (x.childNodes[0].nodeValue=="En Proceso" || x.childNodes[0].nodeValue=="Tramitada") {
                x.childNodes[0].nodeValue = "Finalizada";
            }
            
        });

        fila.style.backgroundColor = "blue";
        enProceso.setAttribute("disabled", "disabled");
        terminada.setAttribute("disabled", "disabled");
    });

    fila.append(enProceso, terminada);

    return fila;
}


/**
 * Pinta la tabla con las incidencias
 */
function pintaTabla() {
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

        // Recorre el array de incidencias para imprimir cada incidencia
        incidencias.forEach((incidencia)=>{ 
            fila = document.createElement("tr");
    
            Object.values(incidencia).forEach((value)=>{ // Por cada objeto del array, añade uno a uno cada valor a una columna de la tabla
                let td = document.createElement("td");
                td.append(value);
                fila.append(td);
            });

            fila.style.color = "white";

            if (incidencia.prioridad=="Baja") {
                fila.style.backgroundColor = "green";
                
            }else if(incidencia.prioridad=="Media"){
                fila.style.backgroundColor = "orange";
            }else {
                fila.style.backgroundColor = "red";
            }

            fila = crearBotones(fila);  
            tabla.append(fila);
        });
    }

    localStorage.setItem("incidencias", JSON.stringify(incidencias));

}


/**
 * Crea el DOM inicial de la página
 */
function constructor() {
    let body = document.querySelector("body");
    let primerEnlace = document.querySelector("#indexJS");
    let form = document.createElement("form");

    form.setAttribute("id", "datos");
    body.insertBefore(form, primerEnlace);

    construc_form();
    pintaTabla();
    // localStorage.removeItem("incidencias");
}


constructor();