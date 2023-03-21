'use strict';

const $ = document;
const FirebaseCollection = 'users';

async function fetchUsersFromFirebase() {
  await fetch(
    `https://usercrud-428ab-default-rtdb.firebaseio.com/${FirebaseCollection}.json`
  )
    .then((res) => {
      if (res.status === 200) return res.json();
    })
    .then((users) => {
      addUsers(users);
    });
}

function addUsers(users) {
  let usersFragment = document.createDocumentFragment();
  for (const [id, info] of Object.entries(users)) {
    usersFragment.appendChild(createUserElement(id, info));
  }
  $.querySelector('main').appendChild(usersFragment);
}

function createUserElement(id, user) {
  let userElem = $.createElement('div');
  userElem.dataset.id = id;
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
  <button class="btn btn-secondary me-2 " onclick ='removeUser(event);'>delete</button>
  <button class="btn btn-secondary">edit</button>
</section>`
  );
  return userElem;
}

window.addEventListener('load', () => {
  fetchUsersFromFirebase();
});

async function removeUser(event) {
  let userElem = event.target.parentElement.parentElement;
  await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      removeUserFromFirebase(FirebaseCollection, userElem.dataset.id);
    }
  });
  userElem.remove();
}

async function removeUserFromFirebase(collection, userId) {
  await fetch(
    `https://usercrud-428ab-default-rtdb.firebaseio.com/${collection}/${userId}.json`,
    {
      method: 'DELETE',
    }
  ).then((res) => {
    if (res.status === 200) {
      Swal.fire('Deleted!', 'user has been deleted.', 'success');
    }
  });
}
