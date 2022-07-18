document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("textarea"),
    submitButton = document.querySelector(".app-extension__submit"),
    email = document.querySelector(".properties__email");

  const limit = 10;
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    width: 450,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  input.addEventListener("input", checkMessageLength);

  function checkMessageLength(e) {
    let messageLength = e.target.value.length;

    if (messageLength > limit) {
      Toast.fire({
        icon: "warning",
        title: "Please shorten your message.",
      });
      disableSubmitButton(true);
    } else if (!messageLength) {
      disableSubmitButton(true);
    } else disableSubmitButton(false);
  }

  function disableSubmitButton(isDisabled) {
    isDisabled
      ? submitButton.setAttribute("disabled", "disabled")
      : submitButton.removeAttribute("disabled");
  }

  submitButton.addEventListener("click", (event) => {
    validateEmail(event);
  });

  function validateEmail(event) {
    const regx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!email.value.match(regx)) {
      event.preventDefault();
      Toast.fire({
        icon: "warning",
        title: "Please check your email.",
      });
    }
  }
});
