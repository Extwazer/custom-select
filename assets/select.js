const getTemplate = (placeholder, data = []) => {
  const text = placeholder ?? "Select Element";
  const items = data.map((el) => {
    return `<li class="select__item" data-type="item" data-id="${el.id}">${el.value}</li>`;
  });
  return `
            <div class="select__input" data-type="input">
                <span data-selected="default" data-type="value">${text}</span>
                <span>&#8595;</span>
            </div>
            
            <div class="select__dropdown">
                <ul class="select__list">
                    ${items.join("")}
                 </ul>
            </div>
`;
};

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.#render(); //private method call
    this.#setup();
    this.selectedId = null;
  }

  #render() {
    //Private class method  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
    const { placeholder, data } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(placeholder, data);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this); //bind clickHandler this
    this.$el.addEventListener("click", this.clickHandler); //add to clickHandler event click
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === "input") {
      this.toggle();
    } else if (type === "item") {
      const id = event.target.dataset.id;
      this.select(id);
      //console.log("id ", id);
    }
  }

  get isOpen() {
    return this.$el.classList.contains("open");
  }

  get current() {
    return this.options.data.find((el) => el.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;
    this.$value.dataset.selected = id;
    this.$el.querySelectorAll('[data-type="item"]').forEach((element) => {
      element.classList.remove("selected");
    });
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected");
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add("open");
  }

  close() {
    this.$el.classList.remove("open");
  }

  destroy() {
    this.$el.removeEventListener("click", this.clickHandler);
  }
}
