const $$ = (sel) => document.querySelector(sel);

$$("#changeCreds").addEventListener("click", clearStorage);

function clearStorage(){
    localStorage.clear();
    window.location.href = "intro.html";
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

let firstName = localStorage.getItem('firstName');
let lastName = localStorage.getItem('lastName');
let username = localStorage.getItem('username');
let phoneNum = localStorage.getItem('phoneNum');
let city = localStorage.getItem('city');
let email = localStorage.getItem('email');
let lastVisit = localStorage.getItem('lastVisit');
let money = localStorage.getItem('money');

for (let i = 0; i < 2; i++) {document.querySelectorAll("#fullName")[i].innerHTML = `${firstName} ${lastName}`};
$$("#username").innerHTML = username;
$$("#phoneNum").innerHTML = phoneNum;
$$("#city").innerHTML = city;
$$("#email").innerHTML = email;
$$("#lastVisit").innerHTML = lastVisit;
localStorage.lastVisit = getDate();
$$("#moneyRemaining").innerHTML = parseInt(money).toLocaleString();

console.log(localStorage);
