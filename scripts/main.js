var radioContainer = document.createElement("div");
const climbAreasContainer = document.getElementById("climb-areas-container");
const typeContainer = document.getElementById("climb-types"); 

// Vancouver, Squamish and Whistler collections in db
const van = db.collection("climbingAreas").doc("Vancouver");
const squam = db.collection("climbingAreas").doc("Squamish");
const whis = db.collection("climbingAreas").doc("Whistler");

function buttonStuff() {

  tradButton[0].style.display = "none";
  tradButton[1].style.display = "none";

  boulderingButton[0].style.display = "none";
  boulderingButton[1].style.display = "none";

  sportButton[0].style.display = "none";
  sportButton[1].style.display = "none";
}

// Trad, bouldering and climbing buttons
var tradButtonId = document.getElementById("trad");
var sportButtonId = document.getElementById("sport");
var boulderingButtonId = document.getElementById("bouldering");

// Label and input for trad, boulder and sport radio buttons
const tradButton = document.getElementsByClassName("trad-button");
const boulderingButton = document.getElementsByClassName("bouldering-button");
const sportButton = document.getElementsByClassName("sport-button");

function showUserClimbTypes() {

  firebase.auth().onAuthStateChanged((user) => {
    var uid = user.uid;

    if (user) {  
      let userClimbingType = db.collection("users").doc(uid);
      // Depending on user info in db, which show the selected button
      userClimbingType.get().then((doc) => {
        // Makes trad radio button (if user climbs trad)
        if (doc.data().trad) {
          tradButton[0].style.display = "initial";
          tradButton[1].style.display = "initial";
          console.log("user trad climbs");
        }
  
        // Makes bouldering radio button (if user boulders)
        if (doc.data().bouldering) {
          boulderingButton[0].style.display = "initial";
          boulderingButton[1].style.display = "initial";
          console.log("user boulders");
        }
  
        // Makes sport climbing radio button (if user sport climbs)
        if (doc.data().sport) {
          sportButton[0].style.display = "initial";
          sportButton[1].style.display = "initial";
          console.log("user sport climbs");
        }
      })
  
    }
  });

}
showUserClimbTypes();

var vanLi;
var squamLi;
var whisLi;

function createClimbAreas() {
  vanLi = document.createElement("li");
  vanLi.setAttribute("id", "vancouver");
  vanLi.setAttribute("onclick", "showVanAreas()")

  squamLi = document.createElement("li");
  squamLi.setAttribute("id", "squamish");
  squamLi.setAttribute("onclick", "showSquamAreas()");

  whisLi = document.createElement("li");
  whisLi.setAttribute("id", "whistler");
  whisLi.setAttribute("onclick", "showWhisAreas()");

  climbAreasContainer.appendChild(vanLi);
  climbAreasContainer.appendChild(squamLi);
  climbAreasContainer.appendChild(whisLi);

  van.get().then((doc) => {
    vanLi.innerText = doc.data().name;
  });

  squam.get().then((doc) => {
    squamLi.innerText = doc.data().name;
  });

  whis.get().then((doc) => {
    whisLi.innerText = doc.data().name;
  });
}
createClimbAreas();

function showVanAreas() {
  console.log("Van clicked");
  squamLi.style.display = "none";
  whisLi.style.display = "none";
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function updateUsersCurrentType(climbType) {
  firebase.auth().onAuthStateChanged((user) => {
    uid = user.uid;
    if (user) {
      if (document.getElementById(`${climbType}`).checked) {
        db.collection("users").doc(uid).update({
          currentType: `${climbType}`
        })
      }
    }
  });
}

function fetchUserClimbPrefs() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
      let userClimbingType = db.collection("users").doc(uid);

      userClimbingType.get().then((doc) => {
        if (doc.data().currentType != undefined) {
          let buttonClicked = doc.data().currentType;
          document.getElementById(buttonClicked).checked = true;
        }
      })
    }
  })
}
fetchUserClimbPrefs();

function showTrad() {
  updateUsersCurrentType("trad");
  hideNonClickedRadioButtons("trad","bouldering","sport");
}

function showSport() {
  updateUsersCurrentType("sport");
  hideNonClickedRadioButtons("sport","bouldering","trad");

  
  let j = 0;
  let numSportOnes = [];
  let sportLiToMake = [];
  var areaName;
  var areaNoSpaces;
  let cragAreaName;
  let capitalized;
  let type;

  squam.get().then((squamDoc) => {
    for (let i = 0; i < squamDoc.data().areas.length; i++) {
      cragAreaName = squamDoc.data().areas[i];

      squam.collection(`${squamDoc.data().areas[i]}`)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            areaName = doc.data().area;
            type = doc.data().type;

            if (type == "sport") {
              numSportOnes[j] = areaName; 
            }
            j++;

            areaNoSpaces = areaName.toLowerCase().replaceAll(' ', '');;
            capitalized = capitalize(areaNoSpaces);

            let sportsOnesInDoc = [];
            let numSportButtons = document.getElementsByClassName("sport");
          
            for (let h = 0; h < numSportButtons.length; h++) {
              sportsOnesInDoc[h] = numSportButtons[h].innerText;
            }
          
            console.log(numSportOnes.length); // cheakamus, crumpit, crumpit, murrin
            console.log(numSportButtons.length); // cheakamus & crumpit in OBJECTS
            console.log(sportsOnesInDoc.length); // cheakmus & crumpic

            areaNoSpaces1 = areaName.toLowerCase().replaceAll(' ', '');;
            capitalized1 = capitalize(areaNoSpaces);
          
            for (let k = 0; k < numSportOnes.length; k++) {
              // console.log("number: " + numSportButtons[k].innerText);
              let n = 0;
              if (!sportsOnesInDoc.includes(numSportOnes[k])) {
                console.log("does not include: " + numSportOnes[k]);  
                if (numSportOnes[k] != undefined) {
                  sportLiToMake[n] = numSportOnes[k];
                  console.log(sportLiToMake);
                  n++;

                  for (let s = 0; s < sportLiToMake.length; s++) {
                    let areaNoSpaces1 = sportLiToMake[s].toLowerCase().replaceAll(' ', '');;
                    let capitalized1 = capitalize(areaNoSpaces1);

                    let iArea = document.createElement("li");
                    iArea.setAttribute("id", `${areaNoSpaces1}`);
                    iArea.setAttribute("class", `squam-areas sport ${areaNoSpaces1}`);
                    iArea.setAttribute("onclick", `show${capitalized1}Area()`);
                    iArea.innerText = sportLiToMake[s];

                    climbAreasContainer.appendChild(iArea);

                  }

                  
                }            
              }
          
            }

            


            // if (document.getElementsByClassName(`${areaNoSpaces}`).length > 1) {
            //   for (let j = 0; j < document.getElementsByClassName(`${areaNoSpaces}`).length; j++) {
            //     console.log(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
            //     climbAreasContainer.removeChild(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
            //   }                          
            // }
          })
        })
    }
  })

}

function showBouldering() {
  updateUsersCurrentType("bouldering");
  hideNonClickedRadioButtons("bouldering","sport","trad");
}


function hideNonClickedRadioButtons(mainClimb, climb1, climb2) {

  if (vanLi.style.display == "none" && whisLi.style.display == "none") {
    console.log("Van and Whistler are hidden");

    for (let i = 0; i < document.getElementsByClassName(`${mainClimb}`).length; i++) {
      document.getElementsByClassName(`${mainClimb}`)[i].style.display = "block";
    }

    for (let i = 0; i < document.getElementsByClassName(`${climb1}`).length; i++) {
      document.getElementsByClassName(`${climb1}`)[i].style.display = "none";
    }

    for (let j = 0; j < document.getElementsByClassName(`${climb2}`).length; j++) {
      document.getElementsByClassName(`${climb2}`)[j].style.display = "none";
    }

  }
}

function showAll(area) {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var areaName;
      var areaNoSpaces;
      uid = user.uid;
      let cragAreaName;
      let capitalized;
      let type;

        squam.get().then((squamDoc) => {
          for (let i = 0; i < squamDoc.data().areas.length; i++) {
            cragAreaName = squamDoc.data().areas[i];
    
            squam.collection(`${squamDoc.data().areas[i]}`)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  areaName = doc.data().area;
                  type = doc.data().type;

                  areaNoSpaces = areaName.toLowerCase().replaceAll(' ', '');;
                  capitalized = capitalize(areaNoSpaces);

                  let iArea = document.createElement("li");
                  iArea.setAttribute("id", `${areaNoSpaces}`);
                  iArea.setAttribute("class", `${area}-areas ${type} ${areaNoSpaces}`);
                  iArea.setAttribute("onclick", `show${capitalized}Area()`);
                  iArea.innerText = areaName;

                  climbAreasContainer.appendChild(iArea);

                  if (document.getElementsByClassName(`${areaNoSpaces}`).length > 1) {
                    for (let j = 0; j < document.getElementsByClassName(`${areaNoSpaces}`).length; j++) {
                      console.log(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
                      climbAreasContainer.removeChild(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
                    }                          
                  }
                })
              })
          }
        })
    }
  })
}

var squamClicked = false;

// Show climbing areas in Squamish
function showSquamAreas() {

  if (squamClicked) {
    console.log("already clicked");
    console.log(squamClicked);

  } else if (!squamClicked) {

    vanLi.style.display = "none";
    whisLi.style.display = "none";

    showAll("squam");  

  console.log("clicked")
  console.log(squamClicked);
  squamClicked = true;

  // let cheakamusLi = document.createElement("li");
  //   cheakamusLi.setAttribute("id", "cheakamus");

  // var cheakamusArea = squam.collection("Cheakamus").doc("Electric Ave");

  // cheakamusArea.get().then((doc) => {
  //   // console.log(doc.data());
  //   // console.log(doc.data().area);

  //   cheakamusLi.innerText = doc.data().area;


  // })

}

}

function showWhisAreas() {
  vanLi.style.display = "none";
  squamLi.style.display = "none";
  console.log("Whistler clicked");
}


