window.addEventListener("DOMContentLoaded", () => {
  const SCRIPT_ID = "Messenger";
  if (document.getElementById(SCRIPT_ID)) {
    return;
  }
  var sdkElement = document.createElement("script");
  sdkElement.id = SCRIPT_ID;
  sdkElement.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  document.body.insertBefore(sdkElement, document.body.firstChild);
});
