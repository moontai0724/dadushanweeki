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
        aboutUsOpened: false,
        width: 1920,
        height: 1080,
      };
    },
  });
}

function registerComponents() {
  registerPopup("popup", "template-popup", ["place"]);
}

function registerPopup(componentName, componentId, props) {
  Vue.component(componentName, {
    template: document.getElementById(componentId),
    props: props,
    data() {
      return {
        isHalf: this.place && this.place.icon && this.place.icon.length > 0
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
      var audio = new Audio(this.place.sound ?? "./assets/click-sound.mp3");
      audio.volume = 0.1;
      audio.play();
    },
    destroyed() {
      window.removeEventListener("keydown", this.keyDownHandler);
    },
  });
}
