
import * as funciones from './incidencias.js';


/**
 * Crea el DOM inicial de la página
 */
function constructor() {
    let body = document.querySelector("body");
    let primerEnlace = document.querySelector("#indexJS");
    let form = document.createElement("form");

    form.setAttribute("id", "datos");
    body.insertBefore(form, primerEnlace);

    funciones.construc_form();
    funciones.pintaTabla();
}


constructor();