//Inttelinput JS
var input = document.querySelector("#issuerphone");
window.intlTelInput(input, {
    intialCountry: "auto",
});

//Form Validation

const issuer_name = document.querySelector('#issuername');
const issuer_email = document.querySelector('#issueremail');
const confirmemail = document.querySelector('#issueremailconfirm');
const issuer_phone = document.querySelector('#issuerphone');
const bugseverity = [...document.getElementsByName("bug-severity")].some(c => c.checked);
const bugplatform = document.getElementById("bug-platform");
const bugscreenshot = document.querySelector('#bugscreenshot');
const bugreport = document.querySelector('#bug-report');

const bugform = document.querySelector('#bugform');


//Utility Functions

const isRequired = value => value == '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isPhoneValid = (phone) => {
    return phone.match(/\d/g).length === 10;
}

const isFileExist = (file) => {
    if (file.files[0].name) {
        return true;
    }
    else {
        return false;
    }
}

const getFileName = (file) => {

    return file.files[0].name;
}

// Error Showing Functions

const showError = (input, message) => {
    const formField = input.parentElement;

    input.classList.remove('border-success');
    input.classList.add('border-danger');

    const error = formField.querySelector('small');
    error.classList.add('text-danger');
    error.textContent = message;
}

const showSuccess = (input) => {

    const formField = input.parentElement;
    input.classList.remove('border-danger');
    input.classList.add('border-success');

    const error = formField.querySelector('small');
    error.classList.add('text-success')
    error.textContent = '';
}


bugform.addEventListener('submit', function (e) {
    // checkName();
    // checkEmail();
    // checkPhone();
    // checkBugSeverity();
    // checkBugPlatform();
    // checkBugScreenshot();
    // checkBugReport();

    showError(issuer_name, "A error msg");
    showError(issuer_email, "A error msg");
    showError(issuer_name, "A error msg");
    showError(confirmemail, "A error msg");
    //showError(issuer_phone, "A error msg");
    // showError(bugseverity, "A error msg");
    showError(bugplatform, "A error msg");
    showError(bugscreenshot, "A error msg");
    showError(bugreport, "A error msg");

    //Prevent Form from reloading
    e.preventDefault();
});













// TODO: Validate Name
// The name cannot be a null value



// TODO: Validate Email
// check for a valid email by checking the "@" tag
// confirm the two input email fields

// TODO: Validate the Phone Number
// Check if the phone number has 10 digits without any extra country code such as +

// TODO: Validate the Severity of the BUG checkboxes
// Anyone of the radio button must be selected 

// TODO: Validate the plaform dropdown menu
// Any one of the value in the dropdown menu must be selected it cannot be null

// TODO: Validate Choose File Section
// Only Image files such as PNG, JPEG are accepted in the file upload section
// Check for null 

//TODO: Validate BUG Description
// The description should be above 20 words and maximum upto 150 words


