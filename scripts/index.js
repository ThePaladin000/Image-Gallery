const editButton = document.querySelector(".profile__edit-btn");
const closeButton = document.querySelector(".modal__close-btn");

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector(".card__template");

const profileFormElement = document.querySelector(".modal__form");

const editProfileModal = document.querySelector("#edit-modal");

const inputName = document.querySelector("#name");
const inputDescription = document.querySelector("#description");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//data for the cards (will implement in backend later)
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//populates the grid with cards
function getCardElement(data) {
  const card = cardTemplate.content.cloneNode(true);

  const cardName = data.name;
  const cardLink = data.link;

  card.querySelector(".card__title").textContent = cardName;

  card.querySelector(".card__image").src = cardLink;
  card.querySelector(".card__image").alt = cardName;

  return card;
}

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.append(cardElement);
}

//functions to open and close the edit profile modal
function openModal() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  editProfileModal.classList.add("modal_opened");
}

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

editButton.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal);

//submit logic for the profile save button
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closeModal();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
