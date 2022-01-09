let cragName = localStorage.getItem("crag");
let region = localStorage.getItem("region");
let area = localStorage.getItem("area");

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function signOut() {

  // To sign out a user
  firebase.auth().signOut().then(() => {
    window.location.assign("/index.html");
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
  });

}

const info = document.getElementById("info");
const submitView = document.getElementById("submit-or-view");
var submitDiv = document.getElementById("submit-div");
var submitHere = document.getElementById("submit-here");

let nameNoSpaces = cragName.toLowerCase().replaceAll(' ', '');
let regionNoSpaces = region.toLocaleLowerCase().replaceAll(' ', '');
let areaNoSpaces = area.toLocaleLowerCase().replaceAll(' ', '');
let capitalizedName = capitalize(nameNoSpaces);

db.collection("climbingAreas").doc(`${region}`).collection(`${area}`).doc(`${cragName}`)
  .get()
  .then(doc => {

    let climbType = doc.data().type;
    console.log(climbType);

    console.log(doc.data());
    let regionLi = document.getElementById("regionName");
    regionLi.innerText = `${region}`;
    regionLi.setAttribute("id", `${regionNoSpaces}`);
    let areaLi = document.getElementById("areaName");
    areaLi.innerText = `${area}`;
    areaLi.setAttribute("id", `${areaNoSpaces}`);
    areaLi.setAttribute("class", `${climbType}`)
    let cragLi = document.getElementById("cragName");
    cragLi.innerText = `${cragName}`;
    cragLi.setAttribute("id", `${nameNoSpaces}`);

});

var busyLevel = 
`<div id="business-levels">
  <div class="business">
    <label for="notbusy" class="not-busy-button">
      <input type="radio" id="not-busy" name="waitTime" class="busy-button">
      <div id="images-stacked-1" class="busy-images-stacked-1 images-stacked">
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <p>Not Busy</p>
      </div>
    </label>
  </div>
  <div class="business">
    <label for="busy" class="busy-button">
      <input type="radio" id="busy" name="waitTime" class="busy-button">
      <div id="images-stacked-2" class="busy-images-stacked-2 images-stacked">
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <p>Busy</p>
      </div>
    </label>
  </div>
  <div class="business">
    <label for="verybusy" class="very-busy-button">
      <input type="radio" id="very-busy" name="waitTime" class="busy-button">
      <div id="images-stacked-3" class="busy-images-stacked-3 images-stacked">
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <p>Very Busy</p>
      </div>
    </label>   
  </div>
</div>`;

var busyLevelView = 
`<div id="business-levels">
  <div class="business" id="not-busy">
    <label for="notbusy" class="not-busy-button">
      <input type="radio" id="notbusy" name="waitTime" class="busy-button" disabled>
      <div id="images-stacked-1" class="busy-images-stacked-1 images-stacked">
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <p>Not Busy</p>
      </div>
    </label>
  </div>
  <div class="business" id="busy-busy">
    <label for="busy" class="busy-button">
      <input type="radio" id="busy" name="waitTime" class="busy-button" disabled>
      <div id="images-stacked-2" class="busy-images-stacked-2 images-stacked">
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <p>Busy</p>
      </div>
    </label>
  </div>
  <div class="business" id="very-busy">
    <label for="verybusy" class="very-busy-button">
      <input type="radio" id="verybusy" name="waitTime" class="busy-button" disabled>
      <div id="images-stacked-3" class="busy-images-stacked-3 images-stacked">
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <p>Very Busy</p>
      </div>
    </label>   
  </div>
</div>`;

var busyLevelSubmit = 
`<div id="business-levels">
  <div class="business" id="not-busy-div">
    <label for="not-busy-button" class="not-busy-button">
      <input type="radio" id="not-busy-button" name="waitTime" class="not-busy-button">
      <div class="busy-images-stacked-1 images-stacked">
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <p>Not Busy</p>
      </div>
    </label>
  </div>
  <div class="business" id="busy-div">
    <label for="busy-button" class="busy-button">
      <input type="radio" id="busy-button" name="waitTime" class="busy-button">
      <div class="busy-images-stacked-2 images-stacked">
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <p>Busy</p>
      </div>
    </label>
  </div>
  <div class="business" id="very-busy-div">
    <label for="very-busy-button" class="very-busy-button">
      <input type="radio" id="very-busy-button" name="waitTime" class="very-busy-button">
      <div class="busy-images-stacked-3 images-stacked">
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <img src="https://img.icons8.com/ios-filled/50/000000/climbing.png"/>
        <p>Very Busy</p>
      </div>
    </label>   
  </div>
</div>`;

if (!document.getElementById("view").checked) {
  console.log("view should not be shown");
  document.getElementById("view-div").style.display = "none";
  document.getElementById("submit-here").style.display = "none";
}

if (!document.getElementById("submit").checked) {
  console.log("submit should not be shown");
  document.getElementById("submit-div").style.display = "none";
  document.getElementById("submit-here").style.display = "none";
}


var submitNotif = document.createElement("p");
submitNotif.setAttribute("id", "submitted");
submitNotif.innerText = `${cragName} wait time submitted!`;

var submittedOn = document.createElement("p");
submittedOn.setAttribute("id", "submitted-on");
submittedOn.innerText = "No wait times yet!";
// `<p id="submitted-on">No wait times yet!</p>`;

const submitButton = document.createElement("button");
submitButton.setAttribute("id", "submit-here");
submitButton.setAttribute("type", "submit");
submitButton.setAttribute("value", "next");
submitButton.setAttribute("onclick", "postWaitTime()")
submitButton.innerText = "Submit";

if (document.getElementById("view").checked) {
  showViews();
}

function showViews() {

  // info.appendChild(submittedOn);
  // console.log(info.children);

  // if (document.getElementById("submit-here") != null) {
  //   info.removeChild(document.getElementById("submitted-on"));
  //   info.removeChild(submitButton);
  //   info.removeChild(document.getElementById("business-levels"));
  // }
  
  // when clicked, show the wait time of the current crag
  document.getElementById("wait-time-submitted").style.display = "none";
  document.getElementById("view-div").style.display = "initial";
  document.getElementById("submit-div").style.display = "none";
  document.getElementById("submit-here").style.display = "none";

  db.collection("climbingAreas").doc(`${region}`).collection(`${area}`).doc(`${cragName}`)
    .get()
    .then(doc => {

      let timePosted = doc.data().timePosted;
      let datePosted = doc.data().datePosted;
      let busy = doc.data().busy;

      // console.log(busyLevel);
      // console.log(document.getElementById(busyLevel));
      // console.log(document.getElementById(busyLevel.checked));

      if (busy != undefined) {
        let busyLevel = busy.replaceAll(' ', '');;
        document.getElementById("busy-level").innerHTML = busyLevelView;
        document.getElementById(busyLevel).checked = true;
        
        // console.log("inner " + submittedOn.innerText);
        // submittedOn.innerText = "Submitted: " + datePosted + " @ " + timePosted;
        
        // info.appendChild(busyLevel);
        // info.innerHTML = info.innerHTML + busyLevel;
        // info.appendChild(busyLevel);
        
        // let busyButtons = document.getElementsByClassName("busy-button");

        // for (let i = 0; i < busyButtons.length; i++) {
        //   busyButtons[i].disabled = true;
        // }
        // document.getElementById(`${busyButton}`).checked = true;

        let busyButtons = document.getElementsByClassName("busy-button");

        for (let i = 0; i < busyButtons.length; i++) {
          if (busyButtons[i].checked != true) {
            busyButtons[i].checked = false;
          }
        }
        document.getElementById("submitted-on").innerText = "Submitted: " + datePosted + " @ " + timePosted;

      }      

    });

}

// function clear() {
//   console.log("Clearing");
//   info.innerHTML = '';
//   console.log(info.children);
//   console.log("children cleared");;
// }

var submitedShown = false;

function showSubmit() {

  document.getElementById("submit-div").style.display = "initial";
  document.getElementById("submit-here").style.display = "initial";
  document.getElementById("wait-time-submitted").style.display = "none";

  document.getElementById("view-div").style.display = "none";

  document.getElementById("submit-div").innerHTML = busyLevelSubmit;

  // info.removeChild(submittedOn);
  // console.log(info.children);

  // info.removeChild(document.getElementById("submitted-on"));

  // info.appendChild(submitButton);

  // let busyButtons = document.getElementsByClassName("busy-button");

  // for (let i = 0; i < busyButtons.length; i++) {
  //   busyButtons[i].disabled = false;
  //   busyButtons[i].checked = false;
  // }

  // <button id="submit-here" type="submit" value="next" onclick="postWaitTime()" style= "display: inline;">Submit</button>


}

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0"+minutes : minutes;
  let stringTime = hours + ":" + minutes + " " + ampm;
  return stringTime;
}

function postWaitTime() {
  let currentDate = new Date();
  let month = currentDate.toLocaleString("default", {month: "long"});
  let weekday = currentDate.toLocaleString("default", {weekday: "long"});
  
  let date = weekday + " " + month + " " + currentDate.getDate(); 
  
  let time = formatTime(currentDate);
  // let datetime = currentDate.toDateString();
  // let currentTime = currentDate.toString();
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {

      // db.collection("climbingAreas").doc(`${region}`).collection(`${area}`).doc(`${cragName}`)
      // .get()
      // .then(doc => {

      //   let timePosted = doc.data().timePosted;
      //   let datePosted = doc.data().datePosted;
      //   let busy = doc.data().busy;

      //   let busyButtons = document.getElementsByClassName("busy-button");

      //   for (let i = 0; i < busyButtons.length; i++) {
      //     if (busyButtons[i].checked) {
            
      //       let busyButton = busyButtons[i].id.replaceAll('-', ' ');;

      //       db.collection("climbingAreas").doc(`${region}`).collection(`${area}`).doc(`${cragName}`).update({
      //         busy: `${busyButton}`,
      //         datePosted: date,
      //         timePosted: time
      //       })

      //     }
      //   }

      // });

      if (document.getElementById("notbusy").checked) {
        console.log("It's very busy");

        db.collection("climbingAreas").doc(`${region}`).collection(`${area}`).doc(`${cragName}`).update({
          busy: "very busy",
          datePosted: date,
          timePosted: time
        })
      } else if (document.getElementById("busy-button").checked) {
        console.log("It's busy");

        db.collection("climbingAreas").doc(`${region}`).collection(`${area}`).doc(`${cragName}`).update({
          busy: "busy",
          datePosted: date,
          timePosted: time
        })
      } else if (document.getElementById("not-busy-button").checked) {
        console.log("It's not busy");

        db.collection("climbingAreas").doc(`${region}`).collection(`${area}`).doc(`${cragName}`).update({
          busy: "not busy",
          datePosted: date,
          timePosted: time
        })
      }

      document.getElementById("wait-time-submitted").innerText = "Wait time submitted";
      document.getElementById("wait-time-submitted").style.display = "block";

      // info.appendChild(submitNotif);

    }
  });

}



