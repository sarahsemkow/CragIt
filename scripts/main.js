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

  if (squamLi.style.display != "none" && vanLi.style.display == "none" && whisLi.style.display == "none") {
    hideNonClickedRadioButtons("squamish", "trad", "bouldering", "sport")
    eliminateDuplicates("Squamish", "trad");
    showHome();
  } else if (vanLi.style.display != "none" && squamLi.style.display == "none" && whisLi.style.display == "none") {
    hideNonClickedRadioButtons("vancouver", "trad", "bouldering", "sport")
    eliminateDuplicates("Vancouver", "trad");
    showHome();
  } else if (whisLi.style.display != "none" && vanLi.style.display == "none" && squamLi.style.display == "none") {
    hideNonClickedRadioButtons("whistler", "trad", "bouldering", "sport")
    eliminateDuplicates("Whistler", "trad");
    showHome();
  }
}

function showSport() {
  updateUsersCurrentType("sport");

  if (squamLi.style.display != "none" && vanLi.style.display == "none" && whisLi.style.display == "none") {
    hideNonClickedRadioButtons("squamish", "sport", "bouldering", "trad")
    eliminateDuplicates("Squamish", "sport");
    showHome();
  } else if (vanLi.style.display != "none" && squamLi.style.display == "none" && whisLi.style.display == "none") {
    hideNonClickedRadioButtons("vancouver", "sport", "bouldering", "trad")
    eliminateDuplicates("Vancouver", "sport");
    showHome();
  } else if (whisLi.style.display != "none" && vanLi.style.display == "none" && squamLi.style.display == "none") {
    hideNonClickedRadioButtons("whistler", "sport", "bouldering", "trad")
    eliminateDuplicates("Whistler", "sport");
    showHome();
  }
}

function showBouldering() {
  updateUsersCurrentType("bouldering");

  if (squamLi.style.display != "none" && vanLi.style.display == "none" && whisLi.style.display == "none") {
    hideNonClickedRadioButtons("squamish", "bouldering", "sport", "trad");
    eliminateDuplicates("Squamish", "bouldering");
    showHome();
  } else if (vanLi.style.display != "none" && squamLi.style.display == "none" && whisLi.style.display == "none") {
    hideNonClickedRadioButtons("vancouver", "bouldering", "sport", "trad");
    eliminateDuplicates("Vancouver", "bouldering");
    showHome();
  } else if (whisLi.style.display != "none" && vanLi.style.display == "none" && squamLi.style.display == "none") {
    hideNonClickedRadioButtons("whistler", "bouldering", "sport", "trad");
    eliminateDuplicates("Whistler", "bouldering");
    showHome();
  }
}

function eliminateDuplicates(regionName, climbType) {
  let j = 0;
  let regions = [];
  let regionLi = [];
  let areas = [];
  let areaLi = [];
  var areaName;
  let region;
  var areaNoSpaces;
  let type;
  let name;
  let nameNoSpaces;

  db.collection("climbingAreas").doc(`${regionName}`).get().then((doc) => {
    for (let i = 0; i < doc.data().areas.length; i++) {

      db.collection("climbingAreas").doc(`${regionName}`).collection(`${doc.data().areas[i]}`)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            areaName = doc.data().area;
            type = doc.data().type;
            region = doc.data().region;
            name = doc.data().name;

            if (type == `${climbType}`) {
              regions[j] = region; 
              areas[j] = areaName;
            }
            j++;

            nameNoSpaces = name.toLowerCase().replaceAll(' ', '');

            areaNoSpaces = areaName.toLowerCase().replaceAll(' ', '');;
            capitalized = capitalize(areaNoSpaces);

            regionNoSpaces = region.toLowerCase().replaceAll(' ', '');;
            capitalizedRegion = capitalize(regionNoSpaces);

            let onesInDoc = [];
            let numButtons = document.getElementsByClassName(`${climbType}`);
          
            for (let h = 0; h < numButtons.length; h++) {
              onesInDoc[h] = numButtons[h].innerText;
            }
          
            // console.log(numAreas.length); // cheakamus, crumpit, crumpit, murrin
            // console.log(numButtons.length); // cheakamus & crumpit in OBJECTS
            // console.log(onesInDoc.length); // cheakmus & crumpic
          
            for (let k = 0; k < areas.length; k++) {
              // console.log("number: " + numButtons[k].innerText);
              let n = 0;
              if (!onesInDoc.includes(areas[k])) {
                console.log("does not include: " + areas[k]);  
                if (areas[k] != undefined) {
                  areaLi[n] = areas[k];
                  regionLi[n] = regions[k];
                  n++;

                  for (let s = 0; s < areaLi.length; s++) {
                    let areaNoSpaces1 = areaLi[s].toLowerCase().replaceAll(' ', '');;
                    let capitalizedArea1 = capitalize(areaNoSpaces1);
                    let regionNoSpaces1 = regionLi[s].toLowerCase().replaceAll(' ', '');;

                    let iArea = document.createElement("li");
                    iArea.setAttribute("id", `${areaNoSpaces1}`);
                    iArea.setAttribute("class", `${climbType} ${regionNoSpaces1} ${areaNoSpaces1}`);
                    iArea.setAttribute("onclick", `show${capitalizedArea1}Area()`);
                    iArea.innerText = areaLi[s];

                    climbAreasContainer.appendChild(iArea);

                  }   
                }            
              }
            }

            if (document.getElementsByClassName(`${nameNoSpaces}`).length > 1) {
              for (let j = 0; j < document.getElementsByClassName(`${nameNoSpaces}`).length; j++) {
                // console.log(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
                climbAreasContainer.removeChild(document.getElementsByClassName(`${nameNoSpaces}`)[j + 1]);
              }                          
            }            

            if (document.getElementsByClassName(`${regionNoSpaces}`).length > 1) {
              for (let i = 0; i < document.getElementsByClassName(`${areaNoSpaces}`).length; i++) {
                // console.log(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
                climbAreasContainer.removeChild(document.getElementsByClassName(`${areaNoSpaces}`)[i]);
              }                          
            }

          })
        })
    }
  })
}

function hideNonClickedRadioButtons(lowercaseRegionName, mainClimb, climb1, climb2) {

  if (document.getElementById(`${lowercaseRegionName}`).style.display != "none") {
  // if (vanLi.style.display == "none" && whisLi.style.display == "none") {
    console.log("Van and Whistler are hidden");

    for (let i = 0; i < document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`).length; i++) {
      // console.log(document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`)[i].innerText + ` is shown-----`)
      document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`)[i].style.display = "block";
    }

    for (let i = 0; i < document.getElementsByClassName(`${climb1}`).length; i++) {
      // console.log(document.getElementsByClassName(`${climb1}`)[i].innerText + ` is hidden------`)
      document.getElementsByClassName(`${climb1}`)[i].style.display = "none";
    }

    for (let j = 0; j < document.getElementsByClassName(`${climb2}`).length; j++) {
      // console.log(document.getElementsByClassName(`${climb2}`)[j].innerText +  " is hidden------");
      document.getElementsByClassName(`${climb2}`)[j].style.display = "none";
    }

  }
}

function showAll(regionName) {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let areaName;
      let areaNoSpaces;
      let regionNoSpaces
      let region;
      let capitalized;
      let type;

        db.collection("climbingAreas").doc(`${regionName}`).get().then((doc) => {
          for (let i = 0; i < doc.data().areas.length; i++) {
    
            db.collection("climbingAreas").doc(`${regionName}`).collection(`${doc.data().areas[i]}`)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  areaName = doc.data().area;
                  type = doc.data().type;
                  region = doc.data().region;

                  areaNoSpaces = areaName.toLowerCase().replaceAll(' ', '');;
                  capitalized = capitalize(areaNoSpaces);
                  regionNoSpaces = region.toLowerCase().replaceAll(' ', '');;

                  let iArea = document.createElement("li");
                  iArea.setAttribute("id", `${areaNoSpaces}`);
                  iArea.setAttribute("class", `${type} ${areaNoSpaces} ${regionNoSpaces}`);
                  iArea.setAttribute("onclick", `show${capitalized}Area()`);
                  iArea.innerText = areaName;

                  climbAreasContainer.appendChild(iArea);

                  let nonCapitalRegion = `${regionName}`.toLowerCase();
                  let divs = document.getElementsByClassName(`${nonCapitalRegion}`);

                  for (let l = 0; l < divs.length; l++) {
                    divs[l].style.display = "block";
                  }

                  if (document.getElementsByClassName(`${areaNoSpaces}`).length > 1) {
                    for (let i = 0; i < document.getElementsByClassName(`${areaNoSpaces}`).length; i++) {
                      // console.log(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
                      climbAreasContainer.removeChild(document.getElementsByClassName(`${areaNoSpaces}`)[i + 1]);
                    }                          
                  }
                })
              })
          }
        })
    }
  })
}

// Show climbing areas in Squamish
function showSquamAreas() {

    vanLi.style.display = "none";
    whisLi.style.display = "none";
    document.getElementById("home").style.display = "initial";

    if (boulderingButtonId.checked) {
      hideNonClickedRadioButtons("squamish", "bouldering", "trad", "sport");
      eliminateDuplicates("Squamish", "bouldering");
      showHome();
    } else if (sportButtonId.checked) {
      hideNonClickedRadioButtons("squamish", "sport", "trad", "bouldering");
      eliminateDuplicates("Squamish", "sport");
      showHome();
    } else if (tradButtonId.checked) {
      hideNonClickedRadioButtons("squamish", "trad", "bouldering", "sport");
      eliminateDuplicates("Squamish", "trad");
      showHome();
    } else {
      showHome();
      showAll("Squamish");
    }

    console.log("squam clicked")

}

function showVanAreas() {

    squamLi.style.display = "none";
    whisLi.style.display = "none";

    if (boulderingButtonId.checked) {
      hideNonClickedRadioButtons("vancouver", "bouldering", "trad", "sport");
      eliminateDuplicates("Vancouver", "bouldering");
      showHome();
    } else if (sportButtonId.checked) {
      hideNonClickedRadioButtons("vancouver", "sport", "trad", "bouldering")
      eliminateDuplicates("Vancouver", "sport");
      showHome();
    } else if (tradButtonId.checked) {
      hideNonClickedRadioButtons("vancouver", "trad", "bouldering", "sport")
      eliminateDuplicates("Vancouver", "trad");
      showHome();
    } else {
      showHome();
      showAll("Vancouver");
    }

    console.log("van clicked")
}

function showMurrinparkArea() {
  showAreaClicked("squamish", "Murrin Park");
}

function showCheakamusArea() {
  showAreaClicked("squamish", "Cheakamus");
}

function showCrumpitwoodsArea() {
  showAreaClicked("squamish", "Crumpit Woods");
}

function showThegrandwallArea() {
  showAreaClicked("squamish", "The Grand Wall");
}

function showCypressmountainArea() {
  showAreaClicked("vancouver", "Cypress Mountain");
}

function showCaulfeildseacliffsArea() {
  showAreaClicked("vancouver", "Caulfeild Sea Cliffs");
}

function showLynnvalleyArea() {
  showAreaClicked("vancouver", "Lynn Valley");
}



function showAreaClicked(regionName, areaName) {
  // squamish, Murrin Park

  let capitalRegion = capitalize(regionName);
  let areaLower = areaName.toLowerCase().replaceAll(' ', '');;

  // let totalNumSquamAreas = document.getElementsByClassName("squamis"); // should be 5
  // let numSquamAreasShown = [];
  // let s = 0;

  // for (let i = 0; i < totalNumSquamAreas.length; i++) {
  //   if (totalNumSquamAreas[i].style.display != "none") {
  //     numSquamAreasShown[s] = totalNumSquamAreas[i].innerText;     
  //     s++;       
  //   }
  // }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let area;
      let areaNoSpaces;
      let cragName;
      let type;
      let region;
    
      console.log(`${areaName} was clicked`);
    
      let regionNames = document.getElementsByClassName(`${regionName}`);
    
      for (let j = 0; j < regionNames.length; j++) {
        if (regionNames[j] != document.getElementById(`${areaLower}`)) {
          regionNames[j].style.display = "none";
        }
      }
 
    
      db.collection("climbingAreas").doc(`${capitalRegion}`).collection(`${areaName}`)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            area = doc.data().area; // ie murrin park
            cragName = doc.data().name;
            type = doc.data().type;
            region = doc.data().region; // ie squamish

            cragNameNoSpaces = cragName.toLowerCase().replaceAll(' ', '');
            capitalizedCragName = capitalize(cragNameNoSpaces);

            areaNoSpaces = area.toLowerCase().replaceAll(' ', '');;
            capitalizedArea = capitalize(areaNoSpaces);

            let iArea = document.createElement("li");
            iArea.setAttribute("id", `${cragNameNoSpaces}`);
            iArea.setAttribute("class", `${type} ${areaNoSpaces} ${cragNameNoSpaces}`);
            // iArea.setAttribute("onclick", `show${capitalizedArea}Area()`);
            iArea.innerText = cragName;

            climbAreasContainer.appendChild(iArea);

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

function showWhisAreas() {
  vanLi.style.display = "none";
  squamLi.style.display = "none";
  console.log("Whistler clicked");
}

function showHome() {
  if (document.getElementById("vancouver").style.display != "none" 
    && document.getElementById("squamish").style.display != "none" 
    && document.getElementById("whistler").style.display != "none") {

      document.getElementById("home").style.display = "none";
    
  } else {
    document.getElementById("home").style.display = "block";

  }
}

showHome();

function goToHome() {

  console.log("going to home");

  document.getElementById("squamish").style.display = "block";
  document.getElementById("vancouver").style.display = "block";
  document.getElementById("whistler").style.display = "block";

  let squamDivs = document.getElementsByClassName("squamish");
  let vanDivs = document.getElementsByClassName("vancouver");
  let whisDivs = document.getElementsByClassName("whistler");

  for (let i = 0; i < squamDivs.length; i++) {
    squamDivs[i].style.display = "none";
  }

  for (let i = 0; i < vanDivs.length; i++) {
    vanDivs[i].style.display = "none";
  }

  for (let i = 0; i < whisDivs.length; i++) {
    whisDivs[i].style.display = "none";
  }

}

