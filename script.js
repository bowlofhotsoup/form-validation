const form = document.querySelector('form');

const email = document.getElementById('email');
email.required = true;

const country = document.getElementById('country');
country.required = true;

const zip = document.getElementById('zip');
zip.required = true;

const password = document.getElementById('pw');
password.required = true;

const cfmPw = document.getElementById('cfm-pw');
cfmPw.required = true;

// 1: Email
function validateEmailField(email) {
  // Get the value of the email field
  const emailVal = email.value;
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Check if the email field has a next element sibling
  if (email.nextElementSibling) {
    // Check if the email is valid
    if (!emailVal.match(emailFormat)) {
      // Display an error message
      const errorMessage = 'Please enter a valid email';
      email.nextElementSibling.textContent = errorMessage;
      email.classList.add('invalid');
    } else {
      // Remove the error message
      email.nextElementSibling.textContent = '';
      email.classList.remove('invalid');
    }
  }
}

email.addEventListener('blur', (event) => {
  // Validate the input field
  validateEmailField(email);
});

// 2: Country
function validateCountryField(country) {
  const countryVal = country.value;
  const countryOptions = /ch|fr|de|nl/;

  // Check if the country field has a next element sibling
  if (country.nextElementSibling) {
    // Check if the country is selected
    if (!countryVal.match(countryOptions)) {
      // Display an error message
      const errorMessage = 'Please select a country';
      country.nextElementSibling.textContent = errorMessage;
      country.classList.add('invalid');
    } else {
      // Remove the error message
      country.nextElementSibling.textContent = '';
      country.classList.remove('invalid');
    }
  }
}

country.addEventListener('blur', (event) => {
  // Validate the input field
  validateCountryField(country);
});

// 3: Zip
function validateZipField(zip) {
  const constraints = {
    ch: [
      '^(CH-)?\\d{4}$',
      'Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950',
    ],
    fr: [
      '^(F-)?\\d{5}$',
      'France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012',
    ],
    de: [
      '^(D-)?\\d{5}$',
      'Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345',
    ],
    nl: [
      '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
      'Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
    ],
  };

  // read the country id
  const countryId = document.getElementById('country').value;

  // build the constraint checker
  const constraintChecker = new RegExp(constraints[countryId][0], '');

  // Get the value of the zip code field
  const zipVal = zip.value;
  console.log('zipVal:', zipVal);

  // Check if the zip field has a next element sibling
  if (zip.nextElementSibling) {
    // Check if the zip code is valid
    if (!zipVal.match(constraintChecker)) {
      // Display an error message
      const errorMessage = constraints[countryId][1];
      zip.nextElementSibling.textContent = errorMessage;
      zip.classList.add('invalid');
    } else {
      // Remove the error message
      zip.nextElementSibling.textContent = '';
      zip.classList.remove('invalid');
    }
  }
}

zip.addEventListener('blur', (event) => {
  // Validate the input field
  validateZipField(zip);
});

// 4: PW
function validatePwField(password) {
  // Get the value of the pw field
  const pwVal = password.value;
  console.log('pwVal:', pwVal);
  const pwFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  // Check if the pw field has a next element sibling
  if (password.nextElementSibling) {
    // Check if the pw is valid
    if (!pwVal.match(pwFormat)) {
      // Display an error message
      const errorMessage = 'Password needs to be at least 6 characters long and contain at least one number and one special character';
      password.nextElementSibling.textContent = errorMessage;
      password.classList.add('invalid');
    } else {
      console.log('Password is valid');
      // Remove the error message
      password.nextElementSibling.textContent = '';
      password.classList.remove('invalid');
    }
  }
}

password.addEventListener('blur', (event) => {
  // Validate the input field
  validatePwField(password);
});

// 5. Confirm PW
function validateCfmPwField(cfmPw) {
  // Get the value of the cfmPw field
  const cfmPwVal = cfmPw.value;
  console.log('cfmPwVal:', cfmPwVal);

  // Check if the cfmPw field has a next element sibling
  if (cfmPw.nextElementSibling) {
    // Check if the cfmPw is valid
    if (!cfmPwVal.match(password.value)) {
      // Display an error message
      const errorMessage = 'Passwords must match';
      cfmPw.nextElementSibling.textContent = errorMessage;
      cfmPw.classList.add('invalid');
    } else {
      console.log('passwords are a match');
      // Remove the error message
      cfmPw.nextElementSibling.textContent = '';
      cfmPw.classList.remove('invalid');
    }
  }
}

cfmPw.addEventListener('blur', (event) => {
  // Validate the input field
  validateCfmPwField(cfmPw);
});

// Prevent the form from submitting if any of the fields are invalid
form.addEventListener('submit', (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
  }
});
