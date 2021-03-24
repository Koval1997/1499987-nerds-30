const showModalButtonSelector = document.querySelector("body > footer > section:nth-child(1) > div > div.contacts__wrapper > div > button");
const modalClassNameSelector = document.querySelector(".modal");
const formWriteSelector = modalClassNameSelector.querySelector(".modal__form");
const closeButtonSelector = modalClassNameSelector.querySelector(".close__button");
const nameFieldSelector = modalClassNameSelector.querySelector(".form__input:nth-child(1) input");
const emailFieldSelector = modalClassNameSelector.querySelector(".form__input:nth-child(2) input");
const textFieldSelector = modalClassNameSelector.querySelector(".form__input:nth-child(3) textarea");

const showModalClassName = "show-modal";
const errorModalClassName = "modal-error";

let isStorageSupport = true;
let locallocalStorageName = "";
let locallocalStorageEmail = "";

try {
  localStorageName = localStorage.getItem("name");
  localStorageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

showModalButtonSelector.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalClassNameSelector.classList.add(showModalClassName);
  if (localStorageName && localStorageEmail) {
    nameFieldSelector.value = localStorageName;
    emailFieldSelector.value = localStorageEmail;
    textFieldSelector.focus();
  } else {
    nameFieldSelector.focus();
  }
});

closeButtonSelector.addEventListener("click", function () {
    modalClassNameSelector.classList.remove(showModalClassName);
  if (modalClassNameSelector.classList.contains(errorModalClassName)) {
    modalClassNameSelector.classList.remove(errorModalClassName);
  }
});

formWriteSelector.addEventListener("submit", function (evt) {
  if (!nameFieldSelector.value || !emailFieldSelector.value || !textFieldSelector.value) {
    evt.preventDefault();
    modalClassNameSelector.classList.add(errorModalClassName);
  }
  if (isStorageSupport) {
    localStorage.setItem("name", nameFieldSelector.value);
    localStorage.setItem("email", emailFieldSelector.value);
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (modalClassNameSelector.classList.contains(showModalClassName)) {
      evt.preventDefault();
      modalClassNameSelector.classList.remove(showModalClassName);
      if (modalClassNameSelector.classList.contains(errorModalClassName)) {
        modalClassNameSelector.classList.remove(errorModalClassName);
      }
    }
  }
});

const imageSlide = document.querySelectorAll(".slider-item");
const btnSlide = document.querySelectorAll("body > main > section.slider > div > div > button.slider__button");

const activeSliderItem = "slider-item--active";
const currentSliderButton = "slider__button--current";

const changeSlide = function (imageSlide, btnSlide, index) {
  for (let i = 0; i < imageSlide.length; i++) {
    if (imageSlide[i].classList.contains(activeSliderItem)) {
      imageSlide[i].classList.remove(activeSliderItem);
    }
  }
  imageSlide[index].classList.add(activeSliderItem);

  for (let q = 0; q < btnSlide.length; q++) {
    if (btnSlide[q].classList.contains(currentSliderButton)) {
      btnSlide[q].classList.remove(currentSliderButton);
    }
  }
  btnSlide[index].classList.add(currentSliderButton);
};

for (let counter = 0; counter < btnSlide.length; counter++) {
  btnSlide[counter].addEventListener("click", function () {
    changeSlide(imageSlide, btnSlide, counter);
  });
}