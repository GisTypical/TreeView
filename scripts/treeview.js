class TreeView extends HTMLUListElement {

    constructor() {

        // Siempre debe estar el super()
        super();

        // Obtener dirección del atributo HTML
        this.dirJSON = this.getAttribute('json');

        this.obtenerJSON();

    }

    obtenerJSON() {
        const request = new XMLHttpRequest();
        request.open('GET', this.dirJSON);
        request.responseType = 'json';
        request.send();
        request.onload = () => {
            var obtenido = request.response;
            this.crearArbol(obtenido);
            this.esconder();
        };
    }

    crearArbol(json) {
        const datosJSON = json["raiz"];
        datosJSON.forEach(padreJSON => {
            var padreElmt = document.createElement("li");
            padreElmt.innerHTML = `${padreJSON.nombre}`;
            this.appendChild(padreElmt);
            if (padreJSON[`hijos`] !== undefined) {
                this.addHijos(padreElmt, padreJSON);
            }
        });
    }

    addHijos(raicesElmt, padreJSON) {
        var hijosJSON = padreJSON["hijos"];
        hijosJSON.forEach(hijoJSON => {

            var hijosElmt = document.createElement(`li`);
            // Tomar el UL de la raiz
            var padre = raicesElmt.children.item(`ul`);
            hijosElmt.innerHTML = `${hijoJSON.nombre}`

            if (raicesElmt.children.item(`ul`) == null) {
                // Si no se ha creado un UL se crea.
                padre = document.createElement(`ul`);
                raicesElmt.appendChild(padre);
                padre.appendChild(hijosElmt);
            }

            // Si ya existe un UL continuar con el mismo.
            padre.appendChild(hijosElmt)

            // Revisar si el hijo tiene mas hijos.
            if (hijoJSON.hijos !== undefined) {
                // Recursion para poder usar hijos infinitos.
                this.addHijos(hijosElmt, hijoJSON);
            }
        });
        return;
    }

    esconder() {
        var hijosUL = Array.from(this.querySelectorAll(`ul`));
        var hijosLI = Array.from(this.querySelectorAll(`li`));
        hijosUL.forEach(ul => {
            // Ocultar los hijos
            ul.style.display = `none`;
        });
        hijosLI.forEach(li => {
            var hijosText = li.childNodes[0];
            // Para que solo puedan ser clickeables los que tengan hijos
            if (li.querySelector(`ul`) != null) {
                /*  
                Agregar un span, para controlar mejor el evento
                como también para hacer que el cursor coloque como apuntador
                */
                const span = document.createElement(`span`);
                span.textContent = hijosText.textContent;
                span.style.cursor = `pointer`;
                hijosText.parentNode.insertBefore(span, hijosText);
                hijosText.parentNode.removeChild(hijosText);
                span.onclick = (e) => {
                    // Obtener el nodo siguiente
                    var siguiente = e.target.nextElementSibling;
                    if (siguiente.style.display == ``) {
                        // Ocultar los hijos al darle click
                        siguiente.style.display = `none`;
                        console.log(siguiente.style.display);
                    }
                    else {
                        // Mostrar los hijos al darle click
                        siguiente.style.display = ``;
                        console.log(siguiente.style.display);
                    }
                }
            }
        });
    }
}

customElements.define('pro-tree-view', TreeView, { extends: 'ul' });