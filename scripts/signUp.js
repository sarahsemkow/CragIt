
// window.onload = function() {
//   location.href = "loading.html";
// }

console.log("hello");


function createAccount() {
  console.log("account created");
  
  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("password").value;

  // Creates a new account by passing the new user's email address 
  // and password to createUserWithEmailAndPassword
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
  .then((userCredential) => {

    var user = userCredential.user;
    console.log("there");
    console.log(userEmail);

    if (userCredential.additionalUserInfo.isNewUser) {
      db.collection("users").doc(user.uid).set({
        name: user.displayName,
        email: user.email
      }).then(function() {
        console.log("New user added to firestore");
        window.location.assign("/views/climb_type.html");
      })
      .catch(function (error) {
        console.log("Error adding new user: " + error);
      });
    } else {
      return true;
    }
    return false;
    
  })
    // Signed in 
    // ...
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..        
  });
}

//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       var uid = user.uid;
//       // ...
//     } else {

//     }
//       // User is signed out
//       // ...
//   });



//   // same level as current page
//   // location.href = "climb_type.html";

//   // page located the root folder
//   // location.href = "/climb_type.html";
// }


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {

    }
      // User is signed out
      // ...
  });


// set an observer on the Auth object
// can then get the user's basic profile info form the User object


