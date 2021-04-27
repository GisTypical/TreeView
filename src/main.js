class Styles extends HTMLElement {

  constructor() {

    super();

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'styles.css');

    document.head.appendChild(linkElem);

  }
}

customElements.define('styles-test', Styles);