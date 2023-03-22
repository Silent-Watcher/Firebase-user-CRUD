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
    if (res.status === 200) {
      Toast.fire({
        icon: 'success',
        title: `${newUser.name} added successfully`,
        didDestroy: () => {
          location.href = 'index.html';
        },
      });
    }
    if(res.status === 401) {
        Swal.fire({
            icon: 'error',
            title: '401 unauthorized',
            text: 'Something went wrong!',
            footer: '<a href="https://firebase.google.com/docs/cloud-messaging/auth-server">Why do I have this issue?</a>'
          })
    }
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

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

// cursor
new kursor({
  type: 1,
  removeDefaultCursor: true,
})
