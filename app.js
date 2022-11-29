const genearteBtn = document.querySelector(".btn");
const passwodrOneBtn = document.querySelector(".passwodr-one");
const passwodrTwoBtn = document.querySelector(".passwodr-two");
const lengthElement = document.querySelector("#length");
const capitalElement = document.querySelector("#capital");
const smallElement = document.querySelector("#small");
const numberElement = document.querySelector("#number");
const specialElement = document.querySelector("#symbol");
const form = document.querySelector("#form");

const fieldsArray = [
  {
    field: capitalElement,
    getChar: getCapitalLetter,
  },
  {
    field: smallElement,
    getChar: getSmallLetter,
  },
  {
    field: numberElement,
    getChar: getNumber,
  },
  {
    field: specialElement,
    getChar: getSpecialChar,
  },
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const length = lengthElement.value;
  let generatePasswordOne = "";
  let generatePasswordTwo = "";
  const typeArray = fieldsArray.filter(({ field }) => field.checked);

  for (i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * typeArray.length);
    const letter = typeArray[index].getChar();
    generatePasswordOne += letter;
  }
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * typeArray.length);
    const letter = typeArray[index].getChar();
    generatePasswordTwo += letter;
  }
  passwodrOneBtn.innerText = generatePasswordOne;
  passwodrTwoBtn.innerText = generatePasswordTwo;
});

function getRandomChar(min, max) {
  const limit = max - min + 1;
  return String.fromCharCode(Math.floor(Math.random() * limit) + min);
}
function getCapitalLetter() {
  return getRandomChar(65, 90);
}

function getSmallLetter() {
  return getRandomChar(97, 122);
}

function getNumber() {
  return getRandomChar(48, 57);
}

function getSpecialChar() {
  const specialChar = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'";
  return specialChar[Math.floor(Math.random() * specialChar.length)];
}
function showNotification() {
  const notification = new Notification("New message!!!", {
    body: "Your password is now copy to clipboard",
    icon: "https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png",
  });
}
function copyPassOne() {
  navigator.clipboard.writeText(passwodrOneBtn.innerText);
  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification();
      }
    });
  }
}
function copyPassTwo() {
  navigator.clipboard.writeText(passwodrTwoBtn.innerText);
  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification();
      }
    });
  }
}

passwodrOneBtn.addEventListener("click", copyPassOne);
passwodrTwoBtn.addEventListener("click", copyPassTwo);
