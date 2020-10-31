class Styles extends HTMLElement {
    
    constructor(){
        
        // Siempre se debe tener el super
        super();

        // Creamos elemento link para cargar hoja de estilos externa
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'styles.css');


        document.head.appendChild(linkElem);

    }
}

customElements.define('styles-test', Styles);