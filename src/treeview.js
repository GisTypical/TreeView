class TreeView extends HTMLUListElement {

  constructor() {
    super();
    this.dirJSON = this.getAttribute('json');
    this.data = {};
    this.getJSON();
  }

  getJSON() {
    const request = new XMLHttpRequest();
    request.open('GET', this.dirJSON);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
      this.data = request.response;
      this.data["root"].forEach(data => {
        const liParent = document.createElement(`li`);
        liParent.innerHTML = data.value;
        this.appendChild(liParent);
        if (data.children !== undefined) {
          this.childs(liParent, data);
          this.hide();
        }
      });
    };
  }

  childs(liParent, data) {
    // Create a new unordered list for children
    const childList = document.createElement(`ul`);
    data.children.forEach(child => {
      const liChild = document.createElement(`li`);
      liChild.innerHTML = child.value;
      childList.appendChild(liChild);
      if (child.children !== undefined) {
        this.childs(liChild, child);
      }
    });
    liParent.appendChild(childList);
  }

  // Hide childs function
  hide() {
    var ulChildren = Array.from(this.querySelectorAll(`ul`));
    var liChildren = Array.from(this.querySelectorAll(`li`));
    ulChildren.forEach(ul => {
      ul.style.display = `none`;
    });
    liChildren.forEach(li => {
      var childrenText = li.childNodes[0];
      if (li.querySelector(`ul`) != null) {
        const span = document.createElement(`span`);
        span.textContent = childrenText.textContent;
        span.style.cursor = `pointer`;
        childrenText.parentNode.insertBefore(span, childrenText);
        childrenText.parentNode.removeChild(childrenText);
        span.onclick = (event) => {
          var next = event.target.nextElementSibling;
          if (next.style.display == ``) {
            next.style.display = `none`;
          }
          else {
            next.style.display = ``;
          }
        }
      }
    });
  }
}

customElements.define('tree-view', TreeView, { extends: 'ul' });