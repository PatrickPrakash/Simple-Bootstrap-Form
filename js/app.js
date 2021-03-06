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
const bugseverity_name = [...document.getElementsByName("bug-severity")]
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
    return (file && file["files"] && (file["files"].length > 0) && file["files"][0].name) ? true : false;
}

const getFileName = (file) => {

    return file.files[0].name;
}

const getFileData = (file) => {
    return file.files[0]
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
    if (error) {
        error.classList.add('text-danger');
        error.textContent = message;
    }

}

const showSuccessLabel = (input, message) => {
    const formField = input.parentElement;
    const error = formField.querySelector('small');
    if (error) {
        error.classList.add('text-success');
        error.textContent = message;
    }

}

const showErrorBorderLabel = (input, message) => {
    const formField = input.parentElement;

    input.classList.remove('border-success');
    input.classList.add('border-danger');
    const error = formField.querySelector('small');

    if (error) {
        error.classList.add('text-danger');
        error.textContent = message;
    }

}


const showSuccessBorderLabel = (input) => {

    const formField = input.parentElement;
    input.classList.remove('border-danger');
    input.classList.add('border-success');

    const error = formField.querySelector('small');
    if (error) {
        error.classList.add('text-success')
        error.textContent = '';
    }

}



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




function checkEmail() {
    let valid = false;
    if (!isRequired(issuer_email.value)) {

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




function checkPhone() {
    let valid = false;
    if (isRequired(issuer_phone.value)) {
        if (!isPhoneValid(issuer_phone.value)) {
            showErrorBorderLabel(issuer_phone)
            showErrorBorderLabel(issuer_phone_label, "The phone number is not valid");
            valid = false;
        }
        else if (isPhoneValid(issuer_phone.value)) {
            showSuccessBorderLabel(issuer_phone);
            showSuccessBorderLabel(issuer_phone_label);
            valid = true;
        }
    }
    else {
        showErrorBorderLabel(issuer_phone);
        showErrorBorderLabel(issuer_phone_label, "Enter the phone number");
        valid = false;
    }

    return valid;
}


function checkBugSeverity() {
    let valid = false;
    if (!(bugseverity_name.some(c => c.checked))) {
        showErrorBorderLabel(bugseverity_label, "Please set anyone of the options");
        valid = false;
    }
    else {
        showSuccessBorderLabel(bugseverity_label);
        valid = true;
    }

    return valid;
}



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



function checkBugScreenshot() {
    let valid = true;

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
    return valid;
}

function closeIt(e) {
    console.log(e);
    google.script.host.close();
};




bugform.addEventListener('submit', function (e) {
    //Action when form is submitted
    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isConfirmEmailValid = checkConfirmEmail(),
        isPhoneValid = checkPhone(),
        isBugPlatform = checkBugPlatform(),
        isBugScreenshot = checkBugScreenshot(),
        isBugSeverity = checkBugSeverity(),
        isBugReport = checkBugReport();

    let isFormValid = isNameValid && isEmailValid && isConfirmEmailValid && isPhoneValid && isBugSeverity && isBugPlatform && isBugScreenshot && isBugReport;

    if (isFormValid) {
        console.log("Form is valid- It passed all the conditions");

        try {
            appScriptPost();
            console.log("Submitted the data")
        }
        catch {
            console.log("Error in the submission");
        }
    }
    //Prevent Form from reloading
    e.preventDefault();
});

function appScriptPost() {

    var severity_radios = document.querySelectorAll('input[type="radio"]:checked');
    var severity_value = severity_radios.length > 0 ? severity_radios[0].value : null;

    const fr = new FileReader();
    const file = bugform.bugscreenshot.files[0];
    fr.readAsArrayBuffer(file);
    fr.onload = f => {

        const url = "https://script.google.com/macros/s/AKfycbxBt--Lp313SLTjZ-MG8Pn1B151psP8YlufsF-yA-6g0_wK_hM2silbe3Y9ddTvIH1k/exec";

        const qs = new URLSearchParams({ filename: bugform.bugscreenshot.value, name: issuer_name.value, email: issuer_email.value, phone: issuer_phone.value, severity: severity_value, platform: bugplatform.value, report: bugreport.value });

        fetch(`${url}?${qs}`, { method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)]) })
            .then(res => {
                res.json()
                location.assign('/form.html');
            })
            .then(e => console.log(e))
            .catch(err => console.log(err));

        console.log("URL Form" + qs); // Prints the URLParams
    }
}


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

    if (e.target.name == 'bug-severity') {
        checkBugSeverity();
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



