var radioContainer = document.createElement("div");
const climbAreasContainer = document.getElementById("climb-areas-container");
const typeContainer = document.getElementById("climb-types"); 

// Vancouver, Squamish and Whistler collections in db
const van = db.collection("climbingAreas").doc("Vancouver");
const squam = db.collection("climbingAreas").doc("Squamish");

function signOut() {
  // To sign out a user
  firebase.auth().signOut().then(() => {
    window.location.assign("/index.html");
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
  });
}

// Trad, bouldering and climbing buttons
var tradButtonId = document.getElementById("trad");
var sportButtonId = document.getElementById("sport");
var boulderingButtonId = document.getElementById("bouldering");

// Label and input for trad, boulder and sport radio buttons
const tradButton = document.getElementsByClassName("trad-button");
const boulderingButton = document.getElementsByClassName("bouldering-button");
const sportButton = document.getElementsByClassName("sport-button");

// function showUserClimbTypes() {

//   firebase.auth().onAuthStateChanged((user) => {

//     if (user) {  
//       var uid = user.uid;
//       let userClimbingType = db.collection("users").doc(uid);
//       // Depending on user info in db, which show the selected button
//       userClimbingType.get().then((doc) => {
//         // Makes trad radio button (if user climbs trad)
//         if (doc.data().trad) {
//           tradButton[0].style.display = "initial";
//           tradButton[1].style.display = "initial";
//           console.log("user trad climbs");
//         }
  
//         // Makes bouldering radio button (if user boulders)
//         if (doc.data().bouldering) {
//           boulderingButton[0].style.display = "initial";
//           boulderingButton[1].style.display = "initial";
//           console.log("user boulders");
//         }
  
//         // Makes sport climbing radio button (if user sport climbs)
//         if (doc.data().sport) {
//           sportButton[0].style.display = "initial";
//           sportButton[1].style.display = "initial";
//           console.log("user sport climbs");
//         }
//       })
  
//     }
//   });

// }
// showUserClimbTypes();

var vanLi = document.createElement("li");
vanLi.setAttribute("id", "vancouver");
vanLi.setAttribute("class", "region");
vanLi.setAttribute("onclick", "showVanAreas()");

var squamLi = document.createElement("li");
squamLi.setAttribute("id", "squamish");
squamLi.setAttribute("class", "region");
squamLi.setAttribute("onclick", "showSquamAreas()");

van.get().then((doc) => {
  vanLi.innerText = doc.data().name;
});

squam.get().then((doc) => {
  squamLi.innerText = doc.data().name;
});

function createClimbAreas() {  
  climbAreasContainer.appendChild(vanLi);
  climbAreasContainer.appendChild(squamLi);
}
createClimbAreas();

var regionHeader = document.createElement("h4");
regionHeader.setAttribute("id", "regionHeader");
regionHeader.innerText = "Click city to view local crags";

if (vanLi.style.display != "none" && squamLi.style.display != "none") {
  climbAreasContainer.removeChild(vanLi);
  climbAreasContainer.removeChild(squamLi);

  climbAreasContainer.appendChild(regionHeader);

  climbAreasContainer.appendChild(vanLi);
  climbAreasContainer.appendChild(squamLi);
  
} else {
      regionHeader.style.display = "none";
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

  if (squamLi.style.display != "none" && vanLi.style.display == "none") {
    hideNonClickedRadioButtons("squamish", "trad", "bouldering", "sport")
    eliminateDuplicates("Squamish", "trad");
    showHome();
  } else if (vanLi.style.display != "none" && squamLi.style.display == "none") {
    hideNonClickedRadioButtons("vancouver", "trad", "bouldering", "sport")
    eliminateDuplicates("Vancouver", "trad");
    showHome();
  }
}

function showSport() {
  updateUsersCurrentType("sport");

  if (squamLi.style.display != "none" && vanLi.style.display == "none") {
    hideNonClickedRadioButtons("squamish", "sport", "bouldering", "trad")
    eliminateDuplicates("Squamish", "sport");
    showHome();
  } else if (vanLi.style.display != "none" && squamLi.style.display == "none") {
    hideNonClickedRadioButtons("vancouver", "sport", "bouldering", "trad")
    eliminateDuplicates("Vancouver", "sport");
    showHome();
  }
}

function showBouldering() {
  updateUsersCurrentType("bouldering");

  if (squamLi.style.display != "none" && vanLi.style.display == "none") {
    hideNonClickedRadioButtons("squamish", "bouldering", "sport", "trad");
    eliminateDuplicates("Squamish", "bouldering");
    showHome();
  } else if (vanLi.style.display != "none" && squamLi.style.display == "none") {
    hideNonClickedRadioButtons("vancouver", "bouldering", "sport", "trad");
    eliminateDuplicates("Vancouver", "bouldering");
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
                // console.log("does not include: " + areas[k]);  
                if (areas[k] != undefined) {
                  areaLi[n] = areas[k];
                  regionLi[n] = regions[k];
                  n++;
                  console.log(areaLi);

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

            // if (document.getElementsByClassName(`${regionNoSpaces}`).length > 1) {
            //   for (let i = 0; i < document.getElementsByClassName(`${areaNoSpaces}`).length; i++) {
            //     // console.log(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
            //     climbAreasContainer.removeChild(document.getElementsByClassName(`${areaNoSpaces}`)[i]);
            //   }                          
            // }

          })
        })
    }
  })
}

function hideNonClickedRadioButtons(lowercaseRegionName, mainClimb, climb1, climb2) {

  if (document.getElementById(`${lowercaseRegionName}`).style.display != "none") {
  // if (vanLi.style.display == "none" && whisLi.style.display == "none") {
    // console.log("Van and Whistler are hidden");

    // for (let i = 0; i < document.getElementsByClassName(`${mainClimb}`).length; i++) {
    //   // console.log(document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`)[i].innerText + ` is shown-----`)
    //   document.getElementsByClassName(`${mainClimb}`)[i].style.display = "none";
    //   // climbAreasContainer.removeChild(document.getElementsByClassName(`${mainClimb}`)[i]);
    // }

    for (let i = 0; i < document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`).length; i++) {
      // console.log(document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`)[i].innerText + ` is shown-----`)
      document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`)[i].style.display = "block";
    }

    for (let i = 0; i < document.getElementsByClassName(`${climb1}`).length; i++) {
      // console.log(document.getElementsByClassName(`${climb1}`)[i].innerText + ` is hidden------`)
      // climbAreasContainer.removeChild(document.getElementsByClassName(`${climb1}`)[i]);
      document.getElementsByClassName(`${climb1}`)[i].style.display = "none";
    }

    for (let j = 0; j < document.getElementsByClassName(`${climb2}`).length; j++) {
      // climbAreasContainer.removeChild(document.getElementsByClassName(`${climb2}`)[j]);
      // console.log(document.getElementsByClassName(`${climb2}`)[j].innerText +  " is hidden------");
      document.getElementsByClassName(`${climb2}`)[j].style.display = "none";
    }

  }
}

function showCragAreas(lowercaseRegionName, lowerNoSpaceAreaName, mainClimb, climb1, climb2) {
  
  if (document.getElementById(`${lowercaseRegionName}`).style.display != "none") {
    // if (vanLi.style.display == "none" && whisLi.style.display == "none") {
      // console.log("Van and Whistler are hidden");
  
      // for (let i = 0; i < document.getElementsByClassName(`${mainClimb}`).length; i++) {
      //   // console.log(document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`)[i].innerText + ` is shown-----`)
      //   document.getElementsByClassName(`${mainClimb}`)[i].style.display = "none";
      //   // climbAreasContainer.removeChild(document.getElementsByClassName(`${mainClimb}`)[i]);
      // }
      console.log(document.getElementsByClassName(`${climb1}`).length);
      if (document.getElementsByClassName(`${climb1}`).length > 0) {
        for (let i = 0; i < document.getElementsByClassName(`${climb1}`).length; i++) {
          console.log(document.getElementsByClassName(`${climb1}`)[i].id);
          document.getElementsByClassName(`${mainClimb}`)[i].style.display = "none";
        }
      }

      console.log(document.getElementsByClassName(`${climb2}`).length);
      if (document.getElementsByClassName(`${climb2}`).length > 0) {
        for (let i = 0; i < document.getElementsByClassName(`${climb2}`).length; i++) {
          console.log(document.getElementsByClassName(`${climb2}`)[i].id);
          document.getElementsByClassName(`${mainClimb}`)[i].style.display = "none";
        }
      }

      console.log(document.getElementsByClassName(`${mainClimb}`).length);
      for (let i = 0; i < document.getElementsByClassName(`${mainClimb}`).length; i++) {
        console.log(document.getElementsByClassName(`${mainClimb}`)[i].id);
        if (document.getElementsByClassName(`${mainClimb}`)[i].id == lowerNoSpaceAreaName) {
          
          document.getElementsByClassName(`${mainClimb}`)[i].style.display = "block";
        }
      }
    }
  }
  
      // for (let i = 0; i < document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`).length; i++) {
        
      //   // console.log(document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`)[i].innerText + ` is shown-----`)
      //   document.getElementsByClassName(`${mainClimb} ${lowercaseRegionName}`)[i].style.display = "block";
      // }
  
      // for (let i = 0; i < document.getElementsByClassName(`${climb1}`).length; i++) {
      //   // console.log(document.getElementsByClassName(`${climb1}`)[i].innerText + ` is hidden------`)
      //   // climbAreasContainer.removeChild(document.getElementsByClassName(`${climb1}`)[i]);
      //   document.getElementsByClassName(`${climb1}`)[i].style.display = "none";
      // }
  
      // for (let j = 0; j < document.getElementsByClassName(`${climb2}`).length; j++) {
      //   // climbAreasContainer.removeChild(document.getElementsByClassName(`${climb2}`)[j]);
      //   // console.log(document.getElementsByClassName(`${climb2}`)[j].innerText +  " is hidden------");
      //   document.getElementsByClassName(`${climb2}`)[j].style.display = "none";


// function showAll(regionName) {
//   // climbAreasContainer.appendChild(areaHeader);

//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       let areaName;
//       let areaNoSpaces;
//       let regionNoSpaces
//       let region;
//       let capitalized;
//       let type;

//         db.collection("climbingAreas").doc(`${regionName}`).get().then((doc) => {
//           for (let i = 0; i < doc.data().areas.length; i++) {
    
//             db.collection("climbingAreas").doc(`${regionName}`).collection(`${doc.data().areas[i]}`)
//               .get()
//               .then(querySnapshot => {
//                 querySnapshot.forEach(doc => {
//                   areaName = doc.data().area;
//                   type = doc.data().type;
//                   region = doc.data().region;

//                   areaNoSpaces = areaName.toLowerCase().replaceAll(' ', '');;
//                   capitalized = capitalize(areaNoSpaces);
//                   regionNoSpaces = region.toLowerCase().replaceAll(' ', '');;

//                   let iArea = document.createElement("li");
//                   iArea.setAttribute("id", `${areaNoSpaces}`);
//                   iArea.setAttribute("class", `${type} ${areaNoSpaces} ${regionNoSpaces}`);
//                   iArea.setAttribute("onclick", `show${capitalized}Area()`);
//                   iArea.innerText = areaName;

//                   climbAreasContainer.appendChild(iArea);

//                   let nonCapitalRegion = `${regionName}`.toLowerCase();
//                   let divs = document.getElementsByClassName(`${nonCapitalRegion}`);

//                   for (let l = 0; l < divs.length; l++) {
//                     divs[l].style.display = "block";
//                   }

//                   if (document.getElementsByClassName(`${areaNoSpaces}`).length > 1) {
//                     for (let i = 0; i < document.getElementsByClassName(`${areaNoSpaces}`).length; i++) {
//                       // console.log(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
//                       climbAreasContainer.removeChild(document.getElementsByClassName(`${areaNoSpaces}`)[i + 1]);
//                     }                          
//                   }
//                 })
//               })
//           }
//         })
//     }
//   })
// }

// Show climbing areas in Squamish
function showSquamAreas() {

    vanLi.style.display = "none";
    document.getElementById("home").style.display = "initial";
    document.getElementById("regionHeader").style.display = "none";

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
      // showAll("Squamish");
    }

    console.log("squam clicked")

}

var areaHeader;
areaHeader = document.createElement("h4");
areaHeader.setAttribute("id", "areaHeader");
areaHeader.innerText = "Click area to view local crags";

function showAreaHeader() {

  // if ((vanLi.style.display != "none" || squamLi.style.display != "none" || whisLi.style.display != "none")
  //   && !(vanLi.style.display != "none" && squamLi.style.display != "none" && whisLi.style.display != "none")) {
  //   areaHeader.style.display = "block";
  // } else {
  //   climbAreasContainer.removeChild(areaHeader);
  // }

  if (document.getElementById("vancouver").style.display != "none" 
    && document.getElementById("squamish").style.display != "none") {

    areaHeader.style.display = "none";
    
  } else {
    areaHeader.style.display = "block";
  }

}


function showVanAreas() {
    squamLi.style.display = "none";
    document.getElementById("home").style.display = "initial";
    document.getElementById("regionHeader").style.display = "none";
    // showAreaHeader();

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
      // showAll("Vancouver");
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
  if (boulderingButtonId.checked) {
    console.log("Lynn bouldering was clicked");
    // showCragAreas("vancouver", "lynnvalley", "bouldering", "sport", "trad");
  } else if (sportButtonId.checked) {
    console.log("Lynn sport was clicked");
    // showCragAreas("vancouver", "lynnvalley", "sport", "bouldering", "trad");
  } else if (tradButtonId.checked) {
    console.log("Lynn trad was clicked");
    // showCragAreas("vancouver", "lynnvalley", "trad", "sport", "bouldering");
  }

  // showCragAreas(lowercaseRegionName, lowerNoSpaceAreaName, mainClimb, climb1, climb2

  // if (tradButtonId.checked) {
  //   showTrad();
  // } else if (boulderingButtonId.checked) {
  //   showBouldering();
  // } else if (sportButtonId.checked) {
  //   showSport();
  // }
  // eliminateDuplicates("Vancouver", "bouldering");
  // eliminateDuplicates("Vancouver", "sport");
  // eliminateDuplicates("Vancouver", "trad");
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
      let capitalizedRegion;
    
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

            capitalizedRegion = capitalize(region);

            let iArea = document.createElement("li");
            iArea.setAttribute("id", `${cragNameNoSpaces}`);
            iArea.setAttribute("class", `${type} ${areaNoSpaces} ${cragNameNoSpaces}`);
            iArea.setAttribute("onclick", `showDetails('${capitalizedRegion}', '${area}', '${cragName}')`);
            iArea.innerText = cragName;

            if (document.getElementsByClassName(`${type} ${areaNoSpaces} ${cragNameNoSpaces}`).length == 0) {
              climbAreasContainer.appendChild(iArea);
            }

            // if (document.getElementsByClassName(`${areaNoSpaces}`).length > 1) {
            //   for (let j = 0; j < document.getElementsByClassName(`${areaNoSpaces}`).length; j++) {
            //     console.log(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
            //     climbAreasContainer.removeChild(document.getElementsByClassName(`${areaNoSpaces}`)[j + 1]);
            //   }                          
            // }
          })
        })

        // let tradArea = document.getElementsByClassName(`trad ${regionName} ${areaLower}`);
        // let tradCrags = document.getElementsByClassName(`trad ${areaLower}`);
        // let boulderingCrags = document.getElementsByClassName(`bouldering ${areaLower}`)
        // let boulderingArea = document.getElementsByClassName(`bouldering ${regionName} ${areaLower}`);
        // let sportCrags = document.getElementsByClassName(`sport ${areaLower}`)
        // let sportArea = document.getElementsByClassName(`sport ${regionName} ${areaLower}`);

        // if (tradButtonId.checked) {
        //   console.log(tradArea);
        //   for (let i = 0; i < boulderingCrags.length; i++) {
        //     climbAreasContainer.removeChild(boulderingCrags[i]);
        //   }              
        //   for (let i = 0; i < sportCrags.length; i++) {
        //     climbAreasContainer.removeChild(sportCrags[i]);
        //   } 
        // } else if (boulderingButtonId.checked) {
        //   console.log(boulderingArea);
        //   for (let i = 0; i < tradCrags.length; i++) {
        //     climbAreasContainer.removeChild(tradCrags[i]);
        //   }              
        //   for (let i = 0; i < sportCrags.length; i++) {
        //     climbAreasContainer.removeChild(sportCrags[i]);
        //   } 
        // } else if (sportButtonId.checked) {
        //   console.log(sportArea);
        //   for (let i = 0; i < boulderingCrags.length; i++) {
        //     climbAreasContainer.removeChild(boulderingCrags[i]);
        //   }              
        //   for (let i = 0; i < tradCrags.length; i++) {
        //     climbAreasContainer.removeChild(tradCrags[i]);
        //   } 
        // }
    }
  })

}

function showHome() {
  if (document.getElementById("vancouver").style.display != "none" 
    && document.getElementById("squamish").style.display != "none") {

      document.getElementById("home").style.display = "none";
    
  } else {
    document.getElementById("home").style.display = "inline-block";


  }
}

function showDetails(region, area, name) {
  localStorage.setItem("crag", name);
  localStorage.setItem("region", region);
  localStorage.setItem("area", area);
  window.location.assign("/views/details.html");  
}

showHome();

function goToHome() {

  console.log("going to home");

  document.getElementById("squamish").style.display = "block";
  document.getElementById("vancouver").style.display = "block";
  document.getElementById("regionHeader").style.display = "block";
  // showAreaHeader();

  console.log(climbAreasContainer.childElementCount);

  if (climbAreasContainer.childElementCount > 3) {

    while (climbAreasContainer.childElementCount > 3) {
      climbAreasContainer.removeChild(climbAreasContainer.lastChild);

    }

  }

  // let squamDivs = document.getElementsByClassName("squamish");
  // let vanDivs = document.getElementsByClassName("vancouver");

  // for (let i = 0; i < squamDivs.length; i++) {
  //   climbAreasContainer.removeChild(squamDivs[i]);
  // }

  // for (let i = 0; i < vanDivs.length; i++) {
  //   climbAreasContainer.removeChild(vanDivs[i]);
  // }

  // get all things with class sport
  // hide all of them
}

