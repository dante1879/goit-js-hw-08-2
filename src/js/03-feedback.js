import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
let formInput = {};
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextInput), 500);
form.addEventListener('input', onTextInput);
populateFields();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (!form.email.value || !form.message.value) {
    alert('Please complete all fields.');
    return;
  }

  console.log(formInput);
  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
}

function onTextInput(evt) {
  formInput[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formInput));
}

function populateFields() {
  const previousFormState = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};

  if (previousFormState) {
    const { email, message } = previousFormState;
    form.email.value = email || '';
    form.message.value = message || '';
  }
}
