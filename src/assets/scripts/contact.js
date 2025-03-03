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
  
    // Function to add error to formErrors[] if not already present
    function addError(field, message, value) {
      const existingError = formErrors.find(error => error.field === field);
      if (!existingError) {
        formErrors.push({ field, message, value });
      }
    }
  
    // Function to remove error if field is corrected
    function removeError(field) {
      formErrors = formErrors.filter(error => error.field !== field);
    }
  
    // Masking + Flashing + Error Messaging
    fields.forEach(field => {
      const input = document.getElementById(field);
      const pattern = input.pattern ? new RegExp(input.pattern) : /.*/;
  
      input.addEventListener('input', () => {
        errorOutputs[field].textContent = '';
        if (!pattern.test(input.value) && input.value !== '') {
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
  
    // Character Countdown
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
  
    // Submit + Error Collection
    form.addEventListener('submit', (e) => {
      formErrors.length = 0; // Reset array on submit attempt
  
      fields.forEach(field => {
        const input = document.getElementById(field);
        const pattern = input.pattern ? new RegExp(input.pattern) : /.*/;
  
        if (!input.checkValidity()) {
          addError(field, input.validationMessage, input.value);
        }
        if (input.value !== '' && !pattern.test(input.value)) {
          addError(field, 'Invalid character detected!', input.value);
        }
      });
  
      // Store errors before submitting
      document.getElementById('formErrors').value = JSON.stringify(formErrors);
  
      if (formErrors.length > 0) {
        e.preventDefault();
        alert('Form contains errors!');
        console.log('Errors:', formErrors);
      }
    });
  });
  