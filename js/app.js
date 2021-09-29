//Inttelinput JS
var input = document.querySelector("#issuerphone");
window.intlTelInput(input, {
    intialCountry: "auto",
});

//Form Validation

const issuer_name = document.querySelector('#issuername');
const issuer_email = document.querySelector('#issueremail');
const issuer_confirm_email = document.querySelector('#issueremailconfirm');
const issuer_phone = document.querySelector('#issuerphone');
const issuer_phone_label = document.querySelector('#issuer-phone-label');
const bugseverity_name = [...document.getElementsByName("bug-severity")].some(c => c.checked);
const bugseverity_label = document.querySelector('#bug-severity-label');
const bugplatform = document.querySelector("#bug-platform");
const bugscreenshot = document.querySelector('#bugscreenshot');
const bugreport = document.querySelector('#bug-report');

const bugform = document.querySelector('#bugform');


//Utility Functions

const isRequired = value => value == '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

const countWords = (input) => {
    const inputString = input.value;

    //Intialise the counter
    wordCounter = 0;

    var splitWords = inputString.split(' ');

    for (var i = 0; i < splitWords.length; i++) {
        if (splitWords[i] != "") {
            wordCounter += 1;
        }
    }

    return wordCounter;
}

// Error Showing Functions

const showErrorLabel = (input, message) => {
    const formField = input.parentElement;

    const error = formField.querySelector('small');
    error.classList.add('text-danger');
    error.textContent = message;
}

const showSuccessLabel = (input, message) => {
    const formField = input.parentElement;

    const error = formField.querySelector('small');
    error.classList.add('text-success');
    error.textContent = message;
}

const showErrorBorderLabel = (input, message) => {
    const formField = input.parentElement;

    input.classList.remove('border-success');
    input.classList.add('border-danger');

    const error = formField.querySelector('small');
    error.classList.add('text-danger');
    error.textContent = message;
}


const showSuccessBorderLabel = (input) => {

    const formField = input.parentElement;
    input.classList.remove('border-danger');
    input.classList.add('border-success');

    const error = formField.querySelector('small');
    error.classList.add('text-success')
    error.textContent = '';
}


// TODO: Validate Name
// The name cannot be a null value
function checkName() {
    let valid = false;
    if (isRequired(issuer_name.value)) {
        showSuccessBorderLabel(issuer_name);
        valid = true;
    }
    else {
        showErrorBorderLabel(issuer_name, "Name must not be empty");
        valid = false;
    }
    return valid;
}


// TODO: Validate Email
// check for a valid email by checking the "@" tag
// confirm the two input email fields

function checkEmail() {
    if (!isRequired(issuer_email.value)) {
        let valid = false;
        showErrorBorderLabel(issuer_email, "The email must not be empty");
        valid = false;
    }
    else if (!isEmailValid(issuer_email.value)) {
        showErrorBorderLabel(issuer_email, "The Email you entered is not valid. It should be in the form abc@test.com");
        valid = false;
    }
    else if (isEmailValid(issuer_email.value)) {
        showSuccessBorderLabel(issuer_email);
        valid = true;
    }

    return valid;
}

function checkConfirmEmail() {
    let valid = false;
    if (!isRequired(issuer_confirm_email.value)) {
        showErrorBorderLabel(issuer_confirm_email, "The email must not be blank")
        valid = false;
    }
    else if (!isEmailValid(issuer_confirm_email.value)) {
        showErrorBorderLabel(issuer_confirm_email, "The Email you entered is not valid. It should be in the form abc@test.com");
        valid = false;

    }
    else if (isRequired(issuer_confirm_email.value) && isEmailValid(issuer_confirm_email.value) && (issuer_email.value == issuer_confirm_email.value)) {
        showSuccessBorderLabel(issuer_confirm_email);
        valid = true;

    }
    else if (!(issuer_email.value == issuer_confirm_email.value)) {
        showErrorBorderLabel(issuer_confirm_email, "The Confirm Email doesn't match");
        valid = false;
    }

    return valid;
}


// TODO: Validate the Phone Number
// Check if the phone number has 10 digits without any extra country code such as +
// Manually select the small element using ID #issuer-phone-label

function checkPhone() {
    let valid;
    if (!isPhoneValid(issuer_phone.value)) {
        showErrorBorderLabel(issuer_phone_label, "The phone number is not valid");
        showErrorBorderLabel(issuer_phone, "The phone number is not valid");
        valid = false;
    }
    else if (isRequired(issuer_phone.value) && isPhoneValid(issuer_phone.value)) {
        showSuccessBorderLabel(issuer_phone_label);
        showSuccessBorderLabel(issuer_phone);
        valid = true;
    }

    return valid;
}

// TODO: Validate the Severity of the BUG checkboxes
// Anyone of the radio button must be selected 
function checkBugSeverity(isSelected) {
    let valid = false;
    if (isSelected) {
        valid = true;
    }
    else {
        valid = false;
    }
    return valid;
}

// TODO: Validate the plaform dropdown menu
// Any one of the value in the dropdown menu must be selected it cannot be null

function checkBugPlatform() {
    let valid = false;

    if (isRequired(bugplatform) && !(bugplatform.value == 'Select the platform')) {
        showSuccessBorderLabel(bugplatform);
        valid = true;
    }
    else {
        showErrorBorderLabel(bugplatform, "Select some option of above");
        valid = false;
    }

    return valid
}

// TODO: Validate Choose File Section
// Only Image files such as PNG, JPEG are accepted in the file upload section
// Check for null 

function checkBugScreenshot() {
    let valid = false;

    if (isFileExist(bugscreenshot)) {
        const fileName = getFileName(bugscreenshot);

        if (fileName.match(/.(jpg|jpeg|png)$/i)) {
            valid = true;
            showSuccessBorderLabel(bugscreenshot);
        }
        else {
            showErrorBorderLabel(bugscreenshot, "Add the png or jpeg");
            valid = false;
        }

    }
    else {
        showErrorBorderLabel(bugscreenshot, "Add the screenshot");
        valid = false;
    }


    return valid;
}

//TODO: Validate BUG Description
// The description should be above 20 words and maximum upto 150 words

function checkBugReport() {
    let valid = false;
    if (isBetween(countWords(bugreport), 20, 150)) {
        showSuccessBorderLabel(bugreport);
        valid = true;
    }
    else if (!isRequired(bugreport.value)) {
        showErrorBorderLabel(bugreport, "The report is empty");
        valid = false;
    }
    else {
        showErrorBorderLabel(bugreport, "The report must contain minimum 20 words upto maximum 150 words");
        valid = false;
    }
}


bugform.addEventListener('submit', function (e) {
    //Action when form is submitted
    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isConfirmEmailValid = checkConfirmEmail(),
        isPhoneValid = checkPhone(),
        isBugSeverity = checkBugSeverity(),
        isBugPlatform = checkBugPlatform(),
        isBugScreenshot = checkBugScreenshot(),
        isBugReport = checkBugReport();

    let isFormValid = isNameValid && isEmailValid && isConfirmEmailValid && isPhoneValid && isBugSeverity && isBugPlatform && isBugScreenshot && isBugReport;

    if (isFormValid) {
        console.log("Form is valid- It passed all the conditions");
    }

    //Prevent Form from reloading
    e.preventDefault();
});



//Timer for checking the executing the function repeatedly

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};


bugform.addEventListener('input', debounce(function (e) {

    if (e.target.name == "bug-severity") {
        checkBugSeverity(true);
    }


    switch (e.target.id) {
        case 'issuername':
            checkName();
            break;
        case 'issueremail':
            checkEmail();
            break;
        case 'issueremailconfirm':
            checkConfirmEmail();
            break;
        case 'issuerphone':
            checkPhone();
            break;

        case 'bug-platform':
            checkBugPlatform();
            break;

        case 'bugscreenshot':
            checkBugScreenshot();
            break;

        case 'bug-report':
            checkBugReport();
            break;
    }

}));



