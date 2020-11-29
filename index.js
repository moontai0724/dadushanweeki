document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const vueImpl = new Vue({
    el: document.getElementById("app"),
    data: {
      menuOpened: false,
    },
    methods: {
    },
  });
}
