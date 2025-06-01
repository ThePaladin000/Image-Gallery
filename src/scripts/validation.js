export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};

export function resetValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((inputElement) => {
    hideInputError(form, inputElement, config);
  });
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (errorElement) {
    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  }
}

function showInputError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.classList.add(config.errorClass);

  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function checkInputValidity(form, input, config) {
  if (input.validity.valid) {
    hideInputError(form, input, config);
  } else {
    showInputError(form, input, input.validationMessage, config);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputs, buttonEl, config) {
  if (hasInvalidInput(inputs)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
}

export function disableButton(buttonElement, config) {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, submitButton, config);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, inputElement, config);
      toggleButtonState(inputs, submitButton, settings);
    });
  });
}

export function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}
