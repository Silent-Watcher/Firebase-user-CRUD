'use strict';

const $ = document;

function fetchUsersFromFirebase() {
  fetch('https://usercrud-428ab-default-rtdb.firebaseio.com/users.json')
    .then((res) => {
      if (res.status === 200) return res.json();
    })
    .then((users) => {
      addUsers(users);
    });
}

function addUsers(users) {
  let usersFragment = document.createDocumentFragment();
  for (const user of Object.values(users)) {
    usersFragment.appendChild(createUserElement(user));
  }
  $.querySelector('main').appendChild(usersFragment);
}

function createUserElement(user) {
  let userElem = $.createElement('div');
  userElem.className =
    'user d-flex justify-content-around align-items-center p-3';
  userElem.insertAdjacentHTML(
    'afterbegin',
    `<figure class="mb-0 rounded-circle overflow-hidden">
  <img
    class="img-fluid"
    src="../img/male_avatar.png"
    alt="user_avatar"
  />
</figure>
<section class="user_info ps-4">
  <p class="name mb-0 text-light">${user.name}</p>
  <p class="email mb-0 text-light">${user.email}</p>
  <p class="pass mb-0 text-light">${user.password}</p>
</section>
<section class="buttons d-flex w-25">
  <button class="btn btn-secondary me-2">delete</button>
  <button class="btn btn-secondary">edit</button>
</section>`
  );
  return userElem;
}

window.addEventListener('load', () => {
  fetchUsersFromFirebase();
});

