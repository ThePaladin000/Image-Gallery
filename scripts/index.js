const editButton = document.querySelector(".profile__edit-btn");
const newPostButton = document.querySelector(".profile__add-btn");

const closeEditProfileButton = document.querySelector(
  "#edit-profile-close-btn"
);
const closeNewPostButton = document.querySelector("#new-post-close-btn");
const closeImageModalButton = document.querySelector("#image-close-btn");

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card__template");

const profileFormElement = document.querySelector("#edit-profile-form");
const newPostFormElement = document.querySelector("#new-post-form");

const editProfileModal = document.querySelector("#edit-modal");
const newPostModal = document.querySelector("#new-post-modal");
const imageModal = document.querySelector("#image-modal");

const inputName = document.querySelector("#name");
const inputDescription = document.querySelector("#description");
const inputSrc = document.querySelector("#source");
const inputCaption = document.querySelector("#caption");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");

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
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

//populates the grid with cards
function getCardElement(data) {
  const card = cardTemplate.content.cloneNode(true);

  const cardName = data.name;
  const cardLink = data.link;

  card.querySelector(".card__title").textContent = cardName;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  //makes the like button interactive
  const likeButton = card.querySelector(".card__like-btn");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-btn-liked");
  });

  //makes the delete button functional
  const deleteButton = card.querySelector(".card__delete-btn");
  deleteButton.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    card.remove();
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

initialCards.forEach((cardItem) => {
  const cardElement = getCardElement(cardItem);
  cardsList.append(cardElement);
});

//makes the close image modal button functional
closeImageModalButton.addEventListener("click", (event) => {
  closeModal(imageModal);
});

//opens the given modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openModal(editProfileModal);
});

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

//submit logic for the profile save button
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//submit logic for new post button
function createNewCard(name, source) {
  const card = cardTemplate.content.cloneNode(true);

  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = source;
  card.querySelector(".card__image").alt = name;

  //makes the like button interactive
  const likeButton = card.querySelector(".card__like-btn");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-btn-liked");
  });

  //makes the delete button functional
  const deleteButton = card.querySelector(".card__delete-btn");
  deleteButton.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    card.remove();
  });

  //opens the image modal when you click on an image
  const cardImage = card.querySelector(".card__image");

  cardImage.addEventListener("click", (event) => {
    modalImage.src = cardImage.src;
    modalImage.alt = name;
    modalCaption.textContent = name;
    openModal(imageModal);
  });

  return card;
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  const source = inputSrc.value;
  const title = inputCaption.value;
  const newCard = createNewCard(title, source);

  cardsList.prepend(newCard);

  closeModal(newPostModal);

  inputSrc.value = "";
  inputCaption.value = "";
}

newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

//makes modal close buttons functional
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(popup));
});
