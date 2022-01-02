
// window.onload = function() {
//   location.href = "loading.html";
// }

// const loginForm = document.getElementById("login-form");
// loginForm.addEventListener("submit", e => {
//   e.preventDefault();

//   // same level as current page
//   // location.href = "climb_type.html";

//   // page located the root folder
//   // location.href = "/climb_type.html";
// }

// firebase.auth().onAuthStateChanged(user => {
//   console.log(user);
// })


function logIn() {
  console.log("logging in");

  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("password").value;

    // When a user signs in, passes the user's email address and password
  // to signInWithEmailAndPassword
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
  .then((userCredential) => {
    // Signed in
    console.log("signing in");
    var user = userCredential.user;
    // console.log(userCredential);
    console.log("new" + userCredential.additionalUserInfo.isNewUser);
    // ...

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;

        console.log("change windows");
        window.location.assign("/views/climb_type.html");

        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

// function signOut() {

//   // To sign out a user
//   firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//     }).catch((error) => {
//     // An error happened.
//   });

// set an observer on the Auth object
// can then get the user's basic profile info form the User object

