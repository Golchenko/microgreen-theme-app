document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("textarea"),
    submitButton = document.querySelector(".app-extension__submit"),
    email = document.querySelector("#emailInput"),
    radioButtons = document.querySelectorAll('input[type="radio"]'),
    calendar = document.querySelector("#calendar");

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

  for (const radioButton of radioButtons) {
    radioButton.addEventListener("click", (event) => {
      switch (event.target.id) {
        case "email":
          email.style.display = "block";
          submitButton.addEventListener("click", (event) => {
            validateEmail(event);
          });
          break;
        case "postcard":
          email.style.display = "none";
          break;
        case "ASAP":
          calendar.style.display = "none";
          break;
        case "date":
          setCurrentDate();
          calendar.style.display = "block";
          break;
      }
    });
  }

  const setCurrentDate = () => {
    let currentDate = new Date().toJSON().slice(0, 10);
    calendar.value = currentDate;
  };

  const validateEmail = (event) => {
    const regx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!email.value.match(regx)) {
      event.preventDefault();
      Toast.fire({
        icon: "warning",
        title: "Please check your email.",
      });
    }
  };
});
