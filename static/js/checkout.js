window.extAsyncInit = function () {
  console.log("Loaded Facebook SDK");

  MessengerExtensions.getContext(
    document.body.dataset.appid,
    function success({ psid }) {
      console.log("Loaded Facebook context");
      var id = document.getElementById("id");
      id.value = psid;
      var submit = document.getElementById("submit");
      submit.disabled = false;
    },
    function error() {
      console.log("Failed to load Facebook context");
    }
  );
};
