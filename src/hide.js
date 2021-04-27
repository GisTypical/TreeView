var liParents = Array.from(document.querySelectorAll(`li`));
var ulChildren = Array.from(liParents.querySelectorAll(`ul`));
ulChildren.forEach(ul => {
    ul.style.display = `none`;
});
childrenLI.forEach(li => {
    var childrenText = li.childNodes[0];
    // Para que solo puedan ser clickeables los que tengan hijos
    if (li.querySelector(`ul`) != null) {
        /*  
        Agregar un span, para controlar mejor el evento
        como también para hacer que el cursor coloque como apuntador
        */
        const span = document.createElement(`span`);
        span.textContent = childrenText.textContent;
        span.style.cursor = `pointer`;
        childrenText.parentNode.insertBefore(span, childrenText);
        childrenText.parentNode.removeChild(childrenText);
        span.onclick = (e) => {
            // Obtener el nodo siguiente
            var next = e.target.nextElementSibling;
            if (next.style.display == ``) {
                // Ocultar los hijos al darle click
                next.style.display = `none`;
            }
            else {
                // Mostrar los hijos al darle click
                next.style.display = ``;
            }
        }
    }
});
