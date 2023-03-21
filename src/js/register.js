// location.href = "index.html";
'use strict';

const $ = document;
const form = $.querySelector('form');

const email = $.querySelector('#email');
const name = $.querySelector('#name');
const password = $.querySelector('#password');

function addUserToFirebase(newUser) {
  fetch('https://usercrud-428ab-default-rtdb.firebaseio.com/users.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  }).then((res) => {
    console.log(res);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  addUserToFirebase(newUser);
});
