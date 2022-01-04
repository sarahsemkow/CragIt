var uid;
var tradButton = document.getElementById("trad");
var boulderingButton = document.getElementById("bouldering");
var sportButton = document.getElementById("sport");

function fetchUserClimbPrefs() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
  
      let userClimbingType = db.collection("users").doc(uid);
  
      // userClimbingType.onSnapShot(doc => {
        // userData = doc.data();
  
      // })
      userClimbingType.get().then((doc) => {
  
        if (doc.data().trad) {
          tradButton.checked = true;
          console.log("user trad climbs");
        }
  
        if (doc.data().bouldering) {
          boulderingButton.checked = true;
          console.log("user boulders");
        }
  
        if (doc.data().sport) {
          sportButton.checked = true;
          console.log("user sport climbs");
        }
  
        console.log(doc.data());
      })
  
    }
  })

}
fetchUserClimbPrefs();



function postTrad() {
  firebase.auth().onAuthStateChanged((user) => {
    uid = user.uid;
    if (user) {
      if (document.getElementById("trad").checked) {
        db.collection("users").doc(uid).update({
          trad: true
        })
      } else {
        db.collection("users").doc(uid).update({
          trad: false
        })
      }
    }
  });
}

function postBouldering() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (document.getElementById("bouldering").checked) {
        db.collection("users").doc(uid).update({
          bouldering: true
        })
      } else {
        db.collection("users").doc(uid).update({
          bouldering: false
        })
      }
    }
  });
}
    
function postSport() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (document.getElementById("sport").checked) {
        db.collection("users").doc(uid).update({
          sport: true
        })
      } else {
        db.collection("users").doc(uid).update({
          sport: false
        })
      }
    }
  });
}

function postClimbing() {
  window.location.assign("/index.html");
}


      // console.log(db.collection("users").doc(user.uid));
    
      // console.log(userData);

      // currentUser = db.collection("users").doc(uid);

      // currentUser.onSnapshot(userDoc => {
      //   userData = userDoc.data();
      // })

