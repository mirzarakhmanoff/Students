import { Users } from "./DB/server.js";

const btnOpen = document.querySelector(".btn__open");
const popap = document.querySelector(".popap");
const btnClose = document.querySelector(".btn__close");
const lastTd = document.querySelectorAll(".lastTd");

const ageSelect = document.getElementById("age");
const scoreSelect = document.getElementById("score");
const fName = document.querySelector(".model__fname");
const lName = document.querySelector(".model__lname");

const ageValue = document.querySelector(".ageValue");
const scoreValue = document.querySelector(".scoreValue");
const btnSubmit = document.querySelector(".btnSubmit");
const table = document.querySelector(".table");
const addres = document.querySelector(".model__addres");
const model = document.querySelector(".model");
const overlay = document.querySelector(".overlay");

window.addEventListener("load", () => {
  const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
  storedUsers.forEach((user) => {
    createUser(user);
  });
});

overlay.addEventListener("click", (event) => {
  event.preventDefault();
  popap.style.display = "none";
});

lastTd.forEach((e) => {
  e.setAttribute("colspan", "2");
});

btnOpen.addEventListener("click", (event) => {
  event.preventDefault();
  popupState("flex");
});

btnClose.addEventListener("click", (event) => {
  event.preventDefault();
  popupState("none");
});

function popupState(state) {
  popap.style.display = state;
}

for (let i = 1; i <= 100; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  ageSelect.appendChild(option);
}

for (let i = 1; i <= 9; i += 0.5) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  scoreSelect.appendChild(option);
}
function createUser(user) {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td data-student="id">${user.id}</td>
      <td data-student="First Name">${user.fName}</td>
      <td data-student="Last Name">${user.lName}</td>
      <td data-student="Age">${user.age}</td>
      <td data-student="Location">${user.location}</td>
      <td data-student="IELTS Score" class="lastTd">${user.score}</td>
      <td><i class="fas fa-trash trash"></i></td>`;

  const trashIcon = row.querySelector(".trash");
  trashIcon.addEventListener("click", () => {
    row.remove();

    const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
    const updatedUsers = storedUsers.filter((u) => u.id !== user.id);
    localStorage.setItem("Users", JSON.stringify(updatedUsers));
  });

  table.appendChild(row);
}

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const age = ageSelect.value;
  const score = scoreSelect.value;
  const firstName = fName.value;
  const lastName = lName.value;
  const location = addres.value;

  if (!firstName || !lastName || !age || !location || !score) {
    alert("Пожалуйста, заполните все обязательные поля.");
    return;
  }

  const id = new Date().getTime();

  const newUser = {
    id,
    fName: firstName,
    lName: lastName,
    age,
    location,
    score,
  };

  const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];

  storedUsers.push(newUser);

  localStorage.setItem("Users", JSON.stringify(storedUsers));

  createUser(newUser);

  popupState("none");
  model.reset();
});
