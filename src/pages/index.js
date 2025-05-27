import "./index.css";

// Import images
import logoImage from "../images/Logo.svg";
import avatarImage from "../images/avatar.jpg";

// Set up images
const logoImg = document.getElementById("logo-image");
const avatarImg = document.getElementById("avatar-image");

logoImg.src = logoImage;

import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";

import { Api } from "../../utils/Api.js";

const editButton = document.querySelector(".profile__edit-btn");
const newPostButton = document.querySelector(".profile__add-btn");
const avatarEditButton = document.querySelector(".profile__picture_edit-btn");

const closeEditProfileButton = document.querySelector(
  "#edit-profile-close-btn"
);
const closeNewPostButton = document.querySelector("#new-post-close-btn");
const closeImageModalButton = document.querySelector("#image-close-btn");
const closeAvatarModalButton = document.querySelector(
  "#avatar-modal .modal__close-btn"
);

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card__template");

const profileFormElement = document.querySelector("#edit-profile-form");
const newPostFormElement = document.querySelector("#new-post-form");
const avatarFormElement = document.querySelector("#edit-avatar-form");

const allModals = document.querySelectorAll(".modal");

const editProfileModal = document.querySelector("#edit-modal");
const newPostModal = document.querySelector("#new-post-modal");
const imageModal = document.querySelector("#image-modal");
const deleteModal = document.querySelector("#delete-modal");
const avatarModal = document.querySelector("#avatar-modal");

const inputName = document.querySelector("#name");
const inputDescription = document.querySelector("#description");
const inputSrc = document.querySelector("#url");
const inputCaption = document.querySelector("#caption");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");

const deleteForm = document.querySelector("#delete-form");
let selectedCard = null;
let selectedCardId = null;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f06d2a7e-0ac0-479e-8d49-8f96b44f5e76",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarImg.src = userData.avatar;
  })
  .catch((err) => {
    console.error("Error fetching user data:", err);
  });

// Load and render cards from the API
api.loadCards().then((cards) => {
  cards.forEach((card) => {
    renderCard(card);
  });
});

//helper function to return a new card
function getCardElement(data) {
  const card = cardTemplate.content.cloneNode(true);

  const cardName = data.name;
  const cardLink = data.link;

  card.querySelector(".card__title").textContent = cardName;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  // Store the card ID in the parent card div
  const cardElement = card.querySelector(".card");
  cardElement.setAttribute("id", data._id);

  //makes the like button interactive
  const likeButton = card.querySelector(".card__like-btn");

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-btn-liked")) {
      api.dislikeCard(data._id).then((res) => {
        likeButton.classList.remove("card__like-btn-liked");
      });
    } else {
      api.likeCard(data._id).then((res) => {
        likeButton.classList.add("card__like-btn-liked");
      });
    }
  });

  //makes the delete button functional
  const deleteButton = card.querySelector(".card__delete-btn");

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  //opens the image modal when you click on an image
  cardImage.addEventListener("click", (event) => {
    modalImage.src = cardImage.src;
    modalImage.alt = cardName;
    modalCaption.textContent = cardName;
    openModal(imageModal);
  });

  return card;
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;

  submitButton.textContent = "Deleting...";
  submitButton.disabled = true;

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

// Cancel button click handler
const cancelButton = deleteModal.querySelector(".modal__button_cancel");
cancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

//uses getCardElement and inserts into the DOM
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  // Add the card into the section using the method
  cardsList[method](cardElement);
}

//makes the close image modal button functional
closeImageModalButton.addEventListener("click", (event) => {
  closeModal(imageModal);
});

//opens the given modal
function openModal(modal) {
  modal.classList.add("modal_opened");

  // Function to close the modal when user hits the esc key
  function keydownListener(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      closeModal(modal);
    }
  }

  document.addEventListener("keydown", keydownListener);

  // Store the listener function for later removal
  modal.keydownListener = keydownListener;
}

editButton.addEventListener("click", (evt) => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  resetValidation(profileFormElement, settings);

  openModal(editProfileModal);
});

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

avatarEditButton.addEventListener("click", () => {
  openModal(avatarModal);
});

//submit logic for the profile save button
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;

  submitButton.textContent = "Saving...";
  submitButton.disabled = true;

  api
    .editUserInfo({ name: inputName.value, about: inputDescription.value })
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;

  submitButton.textContent = "Saving...";
  submitButton.disabled = true;

  const title = inputCaption.value;
  const source = document.querySelector("#new-post-form #url").value;

  const cardData = {
    name: title,
    link: source,
  };

  api
    .addNewCard(cardData)
    .then((card) => {
      renderCard(card);
      evt.target.reset();
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

newPostFormElement.addEventListener("submit", function (evt) {
  handleNewPostFormSubmit(evt);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;

  submitButton.textContent = "Saving...";
  submitButton.disabled = true;

  const avatarUrl = document.querySelector("#avatar-modal #url").value;

  api
    .editUserAvatar({ avatar: avatarUrl })
    .then((res) => {
      avatarImg.src = res.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

//makes modal close buttons functional
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  // Use the stored listener for removal
  document.removeEventListener("keydown", modal.keydownListener);
}

const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(popup));
});

//function to close the modal when user clicks the overlay
function overlayClickHandler(modals) {
  modals.forEach((modal) => {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
}

overlayClickHandler(allModals);

enableValidation(settings);
