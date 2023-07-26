// select html content.
const infoSection = document.querySelector(".information");
const addUserBtn = document.querySelector(".addUser");
const doubleMoneyBtn = document.querySelector(".double");
const showMillionairesBtn = document.querySelector(".showMillionaires");
const sortBtn = document.querySelector(".sort");
const calculateWealthBtn = document.querySelector(".calculateWealth");

// variable declaration.
let data = [];

// api call. (optional)
// getRandomUser();


// fetch api for random user and add money.
async function getRandomUser(){
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];

// Identify/Collect the Necessary Objects.
    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    }
// pass the objects.
    addData(newUser);
}

// adding data to data array value.
function addData(object){
    data.push(object);
    updateDOM();
}

// DOM update.
function updateDOM(provaiedData = data){
    // clear/update information div.
    infoSection.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    
    provaiedData.map((user) => {
        element = document.createElement('h5');
        element.innerHTML = `<strong>${user.name}</strong>$ ${user.money}`;
        infoSection.appendChild(element);
    });
}

// double everyone money.
function showDoubleMoney() {
    data = data.map((user) => {
        return { ...user , money: user.money * 2}
    });
    updateDOM();
}

// filter only millionaires.
function showMillionaires() {
    data = data.filter((user) => user.money > 1000000);
    updateDOM();
}

// sort users by richest.
function showRichest(){
    data.sort((userA, userB) => userB.money - userA.money);
    updateDOM();
}

//calculate wealth
function calculateWealth(){
    const Wealth = data.reduce((accumulator,index ) => (accumulator += index.money),0);

    const WealthEl = document.createElement('h4');
    WealthEl.innerHTML = `<strong>Total</strong>${Wealth}`;
    infoSection.appendChild(WealthEl);
}

// event listeners.
addUserBtn.addEventListener('click',getRandomUser);
doubleMoneyBtn.addEventListener('click',showDoubleMoney);
showMillionairesBtn.addEventListener('click',showMillionaires);
sortBtn.addEventListener('click',showRichest);
calculateWealthBtn.addEventListener('click',calculateWealth);