document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  registerComponents();

  const vueImpl = new Vue({
    el: document.getElementById("app"),
    data() {
      return {
        mountain: MOUNTAIN,
        places: PLACES,
        menuOpened: false,
        currentPlace: undefined,
        width: 1920,
        height: 1080,
      };
    },
    methods: {
      resizeHandler() {
        let mountain = this.$refs.mountain;
        this.width = mountain.width;
        this.height = mountain.height;
        console.log("Mountain size changed to ", this.width, this.height);
      },
    },
    created() {
      window.addEventListener("resize", this.resizeHandler);
    },
    destroyed() {
      window.removeEventListener("resize", this.resizeHandler);
    },
  });
}

function registerComponents() {
  registerPopup();
}

function registerPopup() {
  Vue.component("popup", {
    template: document.getElementById("template-popup"),
    props: ["place"],
    data() {
      return {
        isHalf: this.place.icon && this.place.icon.length > 0
      };
    },
    methods: {
      keyDownHandler(event) {
        if (event.keyCode === 27)
          this.closePopup();
      },
      closePopup() {
        this.$emit("close");
      }
    },
    created() {
      window.addEventListener("keydown", this.keyDownHandler);
    },
    destroyed() {
      window.removeEventListener("keydown", this.keyDownHandler);
    },
  });
}
