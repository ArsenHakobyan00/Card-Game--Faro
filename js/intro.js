const $$ = sel => document.querySelector(sel);

const checkName = /^[a-zA-z \-\']+$/;
const checkUsername = /^[A-Z][a-z]{3}[0-5]$/;
const checkPhoneNum = /^\(\d{3}\)\s\d{3}\-\d{4}|\d{3}\.\d{3}\.\d{4}$/;
const checkCity = /^[A-Za-zéèêüùûç]+$/;
const checkEmail = /^[a-z0-9\_\-\.]+@[a-z0-9]+\.(com|ca|org)$/;
const checkNumber = /^[0-9]+$/;

window.addEventListener("load", checkStorage);

function checkStorage() {
    if (localStorage.length === 0) {
        return true;
    }

    else if ((!localStorage.getItem('firstName') || !localStorage.getItem('lastName') || !localStorage.getItem('username') || !localStorage.getItem('phoneNum') || !localStorage.getItem('city') || !localStorage.getItem('email') || !localStorage.getItem('money') || !localStorage.getItem('lastVisit')) && localStorage.length > 0) {
        localStorage.clear();
        window.location.href = "intro.html";
    }
    else {
        window.location.replace("game.html");
    }
}
let numValid;

$$("form").addEventListener("submit", checkForm);
function checkForm(e) {
    numValid = 0;
    validateFirstName();
    validateLastName();
    validateUsername();
    validatePhoneNum();
    validateCity();
    validateEmail();
    validateMoney();

    if (numValid == 7)
        createStorage();
    else   
        e.preventDefault();
        // return false;
}

$$("#reset").addEventListener("click", resetFields);
function resetFields() { 
    $$("#firstName").value = "";
    $$("#firstName").style.borderColor = "red";
    
    $$("#lastName").value = "";
    $$("#lastName").style.borderColor = "red";
    
    $$("#username").value = "";
    $$("#username").style.borderColor = "red";
    
    $$("#phoneNum").value = "";
    $$("#phoneNum").style.borderColor = "red";
    
    $$("#city").value = "";
    $$("#city").style.borderColor = "red";
    
    $$("#email").value = "";
    $$("#email").style.borderColor = "red";
    
    $$("#startingMoney").value = "";
    $$("#startingMoney").style.borderColor = "red";

}

function createStorage() {
    localStorage.setItem('firstName', $$("#firstName").value);
    localStorage.setItem('lastName', $$("#lastName").value);
    localStorage.setItem('username', $$("#username").value);
    localStorage.setItem('phoneNum', $$("#phoneNum").value);
    localStorage.setItem('city', $$("#city").value);
    localStorage.setItem('email', $$("#email").value);
    localStorage.setItem('money', $$("#startingMoney").value);
    localStorage.setItem('lastVisit', getDate());
}

function getDate() {
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const d = new Date();
    month = months[d.getMonth()];
    day = d.getDate();
    year = d.getFullYear();
    hours = d.getHours();
    minutes = ('0'+d.getMinutes()).slice(-2);

    let lastVisit = `${month} ${day}, ${year} at ${hours}:${minutes}`;
    return lastVisit;
}

let alertMsg = function(){
    $$(".errors").innerHTML = "*Please fill out every field";
}

let validateFirstName = function () {
    let firstName = $$("#firstName").value;
    
    if (firstName.trim().length <= 20 && firstName.trim().length > 0) {
        if (firstName.match(checkName)) {
            $$("#firstName").style.borderColor = "green";
            numValid++;
        }
        else {
            $$("#firstName").style.borderColor = "red";
            alert("The first name you entered is not valid");
        }
    }
    
    else if (firstName.trim().length == 0) {
        $$("#firstName").style.borderColor = "red";
        alertMsg();
    }
    
    else {
        $$("#firstName").style.borderColor = "red";
        alert("Your first name should have a maximum of 20 characters");
    }
}

let validateLastName = function () {
    let lastName = $$("#lastName").value;
    if (lastName.trim().length <= 30 && lastName.trim().length > 0) {
        if (lastName.match(checkName)) {
            $$("#lastName").style.borderColor = "green";
            numValid++;
        }
        else {
            $$("#lastName").style.borderColor = "red";
            alert("The last name you entered is not valid");
        }
    }
    else if (lastName.trim().length == 0) {
        $$("#lastName").style.borderColor = "red";
        alertMsg();
    }
    else {
        $$("#lastName").style.borderColor = "red";
        alert("Your last name should have a maximum of 20 characters");
    }
}

let validateUsername = function() {
    let username = $$("#username").value;
    if(username.trim().match(checkUsername) && username.trim().length > 0) {
        $$("#username").style.borderColor = "green";
        numValid++;
    } 
    
    else if (username.trim().length == 0){
        $$("#username").style.borderColor = "red";
        alertMsg();
    }
    
    else {
        $$("#username").style.borderColor = "red";
        alert("Username must start with an uppercase letter, followed by three lowercase letters and finally either a single digit between 0 and 5 (inclusive).\nEx: Axyz5");
    }
}

let validatePhoneNum = function() {
    let phoneNum = $$("#phoneNum").value;
    if (phoneNum.trim().length != 0) {
        if(phoneNum.trim().match(checkPhoneNum)) {
            $$("#phoneNum").style.borderColor = "green";
            numValid++;
        }
        else {
            $$("#phoneNum").style.borderColor = "red";
            alert("Your phone number should have one of these two formats:\n(###) ###-#### or ###.###.####")
        }
    }
    else {
        $$("#phoneNum").style.borderColor = "red";    
        alertMsg();
    }
}

let validateCity = function() {
    let city = $$("#city").value;
    if (city.trim().length != 0) {
        if(city.trim().match(checkCity)) {
            $$("#city").style.borderColor = "green";
            numValid++;
        }
        else {
            $$("#city").style.borderColor = "red";
            alert("Your city's name should only contain letters");
        }
    }
    else {
        $$("#city").style.borderColor = "red";    
        alertMsg();
    }
}

let validateEmail = function() {
    let email = $$("#email").value;
    if (email.trim().length != 0) {
        if (email.trim().match(checkEmail)) {
            $$("#email").style.borderColor = "green";
            numValid++;
        }
        else {
            $$("#email").style.borderColor = "red";
            alert("Your email address should be similar to the format: namevalue@domain.[com|ca|org]\nwhere namevalue is any combination of letters, numbers and underscore (_), dash (-) or period (.).  Domain is any combination of letters and numbers. Top level domain can ONLY be those listed.");
        }
    }
    else {
        $$("#email").style.borderColor = "red";    
        alertMsg();
    }
}

let validateMoney = function() {
    let startingMoney = $$("#startingMoney").value;
    if (startingMoney.trim().length != 0) {
        if(startingMoney.trim().match(checkNumber)) {
            if (startingMoney <= 5000 && startingMoney >= 5) {
                $$("#startingMoney").style.borderColor = "green";
                numValid++;
            }
            else {
                $$("#startingMoney").style.borderColor = "red";
                alert("The starting money should be between $5-$5000 (inclusive)");
            }
        }
        else if (startingMoney.indexOf(".") != -1 || startingMoney.indexOf(",") != -1) {
            $$("#startingMoney").style.borderColor = "red";
            alert("No cents are allowed");
        }
        else if (startingMoney.indexOf("$") != -1) {
            startingMoney = startingMoney.replace("$", "");
            $$("#startingMoney").value = startingMoney;
            if(startingMoney.trim().match(checkNumber)) {
                startingMoney = parseInt(startingMoney);
                if (startingMoney <= 5000 && startingMoney >= 5 /*&& startingMoney.trim().match(checkNumber)*/) {
                    $$("#startingMoney").style.borderColor = "green";
                    numValid++;
                }
                else {
                    $$("#startingMoney").style.borderColor = "red";
                    alert("The starting amount of money should be between $5-$5000 (inclusive)");
                }
            }
            else {
                $$("#startingMoney").style.borderColor = "red";
                alert("The amount of starting money you entered is not a number");
            }
        }
        else {
            $$("#startingMoney").style.borderColor = "red";
            alert("The amount of starting money you entered is not a number");
        }
    }
    else {
        $$("#startingMoney").style.borderColor = "red";
        alertMsg();
    }
}

