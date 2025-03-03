document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const comments = document.getElementById('comments');
  const charCount = document.getElementById('comments-info');
  let formErrors = [];
  const fields = ['firstName', 'lastName', 'email', 'phone'];
  const errorOutputs = {
    firstName: document.getElementById('first-name-info'),
    lastName: document.getElementById('last-name-info'),
    email: document.getElementById('email-info'),
    phone: document.getElementById('phone-info')
  };

  const patterns = {
    firstName: /^[A-Za-z]+$/,
    lastName: /^[A-Za-z]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/
  };

  function addError(field, message, value) {
    const existingError = formErrors.find(error => error.field === field);
    if (!existingError) {
      formErrors.push({ field, message, value });
    }
  }

  function removeError(field) {
    formErrors = formErrors.filter(error => error.field !== field);
  }

  fields.forEach(field => {
    const input = document.getElementById(field);
    input.addEventListener('input', () => {
      errorOutputs[field].textContent = '';
      if (!patterns[field].test(input.value) && input.value !== '') {
        input.classList.add('flash');
        errorOutputs[field].textContent = 'Invalid character detected!';
        errorOutputs[field].style.color = 'red';
        addError(field, 'Invalid character detected!', input.value);
        setTimeout(() => {
          input.classList.remove('flash');
          errorOutputs[field].textContent = '';
        }, 2000);
      } else {
        removeError(field);
      }
    });
  });

  comments.addEventListener('input', () => {
    const remaining = 200 - comments.value.length;
    charCount.textContent = `${remaining} characters remaining`;
    charCount.style.color = remaining <= 20 ? 'red' : 'white';

    if (remaining < 0) {
      addError('comments', 'Comment exceeds character limit', comments.value);
    } else {
      removeError('comments');
    }
  });

  form.addEventListener('submit', (e) => {
    formErrors.length = 0;

    fields.forEach(field => {
      const input = document.getElementById(field);
      if (!input.checkValidity()) {
        addError(field, input.validationMessage, input.value);
      }
      if (input.value !== '' && !patterns[field].test(input.value)) {
        addError(field, 'Invalid character detected!', input.value);
      }
    });

    document.getElementById('formErrors').value = JSON.stringify(formErrors);
  });
});
