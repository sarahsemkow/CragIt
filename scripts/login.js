
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

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", e => {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  const toggle = togglePassword.innerText === "visibility" ? "visibility_off" : "visibility";
  togglePassword.innerText = toggle;
});


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
        window.location.assign("/views/main.html");

        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  })
  .catch((error) => {
    var errorMessage = error.message;
    let passBox = document.getElementById("password-box");
    let errorMes = document.createElement("p");
    errorMes.innerText = errorMessage;
    errorMes.setAttribute("id", "errorMessage");
    passBox.appendChild(errorMes);

    var errorCode = error.code;
    console.log(errorCode);
    console.log(errorMessage);

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

