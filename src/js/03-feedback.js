import throttle from 'lodash.throttle'
const form = document.querySelector(".feedback-form");
const formInput = {};
const STORAGE_KEY = "feedback-form-state";

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", throttle(onTextInput), 500);

populateFields();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextInput(evt) {
  evt.preventDefault();

  formInput[evt.target.name] = evt.target.value;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formInput));
}

function populateFields() {
  const previousFormState = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (previousFormState) {
    const { email, message } = previousFormState;

    form.email.value = email;
    form.message.value = message;

    console.log(previousFormState);
  }
}
