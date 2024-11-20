
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
 * Crea el DOM inicial de la página
 */
function constructor() {
    let body = document.querySelector("body");
    let primerEnlace = document.querySelector("#indexJS");
    let form = document.createElement("form");

    form.setAttribute("id", "datos");
    body.insertBefore(form, primerEnlace);

    construc_form();
}


constructor();