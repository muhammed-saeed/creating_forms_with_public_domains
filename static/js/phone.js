(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyDC3N4bHlEHbknJrGok6qCiydQaEPWGqBE",
    authDomain: "tirhal-15a03.firebaseapp.com",
    projectId: "tirhal-15a03",
    storageBucket: "tirhal-15a03.appspot.com",
    messagingSenderId: "860853700944",
    appId: "1:860853700944:web:ef17d14e069306beb28455",
    measurementId: "G-NEZV4XRN3Z",
  };

  firebase.initializeApp(firebaseConfig);
  firebase.auth().useDeviceLanguage();

  document.addEventListener("DOMContentLoaded", async function () {
    const signinButton = document.getElementById("signin");
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("signin", {
      size: "invisible",
      callback: signIn,
    });
    window.recaptchaVerifierId = await window.recaptchaVerifier.render();
    signinButton.toggleAttribute("disabled", false);

    const changePhoneButton = document.getElementById("change-phone");
    changePhoneButton.addEventListener("click", () => changePhone());

    const verifyButton = document.getElementById("verify");
    verifyButton.addEventListener("click", () => verifyOTP());
  });

  async function signIn() {
    const phone = getPhoneNumber();
    const appVerifier = window.recaptchaVerifier;
    try {
      window.phoneConfirmation = await firebase
        .auth()
        .signInWithPhoneNumber(phone, appVerifier);
      showOTPInput();
    } catch (err) {
      resetRecaptcha();
      // TODO instruct user to retry
      console.error(err);
    }
  }

  async function changePhone() {
    clearPhoneNumber();
    clearOTPCode();
    resetRecaptcha();
    showPhoneInput();
  }

  async function verifyOTP() {
    const code = getOTPCode();
    try {
      const { user } = await window.phoneConfirmation.confirm(code);
      onPhoneVerified(user);
    } catch (err) {
      // TODO handle login failure
      console.error(err);
    } finally {
      clearOTPCode();
    }
  }

  async function onPhoneVerified(user) {
    const nextUrlStr = document.getElementById("verify").dataset.nextUrl;
    const nextUrl = new URL(nextUrlStr);

    const idToken = await user.getIdToken();
    nextUrl.searchParams.append("idToken", idToken);

    window.location.replace(nextUrl);
  }

  function showPhoneInput() {
    document.getElementById("phone-container").classList.toggle("hide", false);
    document.getElementById("otp-container").classList.toggle("hide", true);
    document.getElementById("phone").focus();
  }

  function showOTPInput() {
    document.getElementById("phone-container").classList.toggle("hide", true);
    document.getElementById("otp-container").classList.toggle("hide", false);
    document.getElementById("otp").focus();
  }

  function getPhoneNumber() {
    const phoneInput = document.getElementById("phone");
    return phoneInput.value;
  }

  function getOTPCode() {
    const otpInput = document.getElementById("otp");
    return otpInput.value;
  }
  function clearPhoneNumber() {
    const phoneInput = document.getElementById("phone");
    phoneInput.value = "";
  }

  function clearOTPCode() {
    const otpInput = document.getElementById("otp");
    otpInput.value = "";
  }

  function resetRecaptcha() {
    grecaptcha.reset(window.recaptchaVerifierId);
  }
})();
