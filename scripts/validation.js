const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "error__message",
  errorClass: "error__visible",
};

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (errorElement) {
    errorElement.classList.add("input-valid");
    input.classList.remove("modal__input-error");
  }
}

function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.classList.remove("input-valid");

  input.classList.add("modal__input-error");
  errorElement.textContent = errorMessage;
}

function checkInputValidity(form, input) {
  if (input.validity.valid) {
    hideInputError(form, input);
  } else {
    showInputError(form, input, input.validationMessage);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputs, buttonEl) {
  if (hasInvalidInput(inputs)) {
    disableButton(buttonEl);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove("modal__button_disabled");
  }
}

function disableButton(buttonElement) {
  buttonElement.disabled = true;
  buttonElement.classList.add("modal__button_disabled");
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, inputElement);
      toggleButtonState(inputs, submitButton);
    });
  });
}

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

enableValidation(settings);
