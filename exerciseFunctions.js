// JS functions for exercise tab

var userExercises = {
  0: {
    name: "Run",
    weight: false,
    reps: false,
    distance: "3.1 miles",
    duration: "39 min 12 sec",
    time: "8:31 am",
    date: "Wednesday, March 27th",
  },
  1: {
    name: "Yoga",
    weight: false,
    reps: false,
    distance: false,
    duration: "41 min",
    time: "10:40 am",
    date: "Thursday, March 28th",
  },
  2: {
    name: "Curlups",
    weight: "15 lbs",
    reps: "30x",
    distance: false,
    duration: false,
    time: "5:36 pm",
    date: "Friday, March 28th",
  },
};

// Represents the different types of exercises and fields associated with them
var exerciseTypes = {
  Run: ["Distance", "Duration", "Time", "Date"],
  Yoga: ["Duration", "Time", "Date"],
  Curlups: ["Weight", "Reps", "Time", "Date"],
};

// Populates list of exercise cards when exercise tab is first rendered.
function showUserExercises() {
  let exerciseList = document.getElementById("userExerciseList");

  exerciseList.innerHTML = ``;

  console.log(userExercises);

  for (let i in userExercises) {
    let exerciseCard = document.createElement("li");
    exerciseCard.className = "card-container";

    exerciseCard.innerHTML = `
    <h2>${userExercises[i].date}</h2>
    <div class="card">
      <div class="card-body">
        <div class="card-title-wrapper">
          <h3 class="card-title">${userExercises[i].name}</h3>
          <h4>${userExercises[i].time}</h4>
        </div>
        <ul id="cardDetails"></ul>
        ${Object.keys(userExercises[i])
          .filter(
            (k) =>
              k !== "name" && k != "date" && k != "time" && userExercises[i][k]
          )
          .map((k) => `<h4>${userExercises[i][k]}</h4>`)
          .join("")}
      </div>
    </div>
    `;

    exerciseList.appendChild(exerciseCard);
  }

  if (document.getElementById("card-container") == null) {
    let plusButton = document.createElement("li");
    plusButton.className = "card-container";
    plusButton.id = "card-container";

    plusButton.innerHTML = `
      <h2>Today</h2>
      <div class="plus-button" onclick="enterNewWorkout()">
        <h1 style="font-weight:500">&#43;</h1>
      </div>
    `;

    let exerciseContainer = document.querySelector("#exerciseContainer");
    exerciseContainer.insertAdjacentElement("beforeend", plusButton);
  }
}

function enterNewWorkout() {
  let exerciseContainer = document.getElementById("exerciseContainer");
  exerciseContainer.innerHTML = `
      <div class="searchContainer">
        <h1>Today</h1>
        <input type="text" id="newExerciseInput" placeholder="Search Workouts" 
          oninput="showSuggestionsExercise()" 
          onkeydown="handleKeyDown(event)" />
        <ul id="exerciseSuggestions" class="searchSug"></ul>
      </div>
      `;

  // Makes it so that suggestions are shown as soon as this page is toggled
  // Without it, they will not be populated until the search field is clicked on
  showSuggestionsExercise();
}

function showNewWorkoutFields() {
  let exerciseContainer = document.getElementById("exerciseContainer");
  const placeholder = "Leave blank if not applicable";
  exerciseContainer.innerHTML = `
    <div class="newWorkoutContainer">
    <h1>New Workout</h1>
      <form>
        <label for="workoutName">Workout Name: </label><br>
        <input class="newWorkoutField" type="text" id="workoutName" name="workoutName"><br><br>
        <label for="weight">Weight: </label><br>
        <input class="newWorkoutField" type="text" id="weight" name="weight" placeholder="${placeholder}"><br><br>
        <label for="reps">Reps: </label><br>
        <input class="newWorkoutField" type="text" id="reps" name="reps" placeholder="${placeholder}"><br><br>
        <label for="distance">Distance: </label><br>
        <input class="newWorkoutField" type="text" id="distance" name="distance" placeholder="${placeholder}"><br><br>
        <label for="duration">Duration: </label><br>
        <input class="newWorkoutField" type="text" id="duration" name="duration" placeholder="${placeholder}"><br><br>
        <label for="time">Time: </label><br>
        <input class="newWorkoutField" type="text" id="time" name="time"><br><br>
        <label for="date">Date: </label><br>
        <input class="newWorkoutField" type="text" id="date" name="date"><br><br>
        <input class="addButton" type="submit" value="Add">
      </form>
    </div>
  `;

  let form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page from reloading

    // Get input values
    let workoutName = document.getElementById("workoutName").value;
    let weight = document.getElementById("weight").value;
    let reps = document.getElementById("reps").value;
    let distance = document.getElementById("distance").value;
    let duration = document.getElementById("duration").value;
    let time = document.getElementById("time").value;
    let date = document.getElementById("date").value;

    let newWorkoutFields = [];

    let newIndex = Object.keys(userExercises).length;

    userExercises[newIndex] = {};

    userExercises[newIndex].name = workoutName;

    // TODO: Add workout type
    if (weight != "") {
      newWorkoutFields.push("Weight");
      userExercises[newIndex].weight = weight;
    }
    if (reps != "") {
      newWorkoutFields.push("Reps");
      userExercises[newIndex].reps = reps;
    }
    if (distance != "") {
      newWorkoutFields.push("Distance");
      userExercises[newIndex].distance = distance;
    }
    if (duration != "") {
      newWorkoutFields.push("Duration");
      userExercises[newIndex].duration = duration;
    }

    newWorkoutFields.push("Time");
    userExercises[newIndex].time = time;
    newWorkoutFields.push("Date");
    userExercises[newIndex].date = date;

    // Add new workout to exerciseTypes object
    exerciseTypes[workoutName] = newWorkoutFields;

    exerciseContainer.innerHTML = `
    <ul class="card-list" id="userExerciseList"></ul>
    `;
    showUserExercises();
  });
}

function showInputWorkoutFields(workoutName) {
  let exerciseContainer = document.getElementById("exerciseContainer");
  exerciseContainer.innerHTML = `
    <div class="newWorkoutContainer">
    <h1>${workoutName}</h1>
      <form>
      <ul id="cardDetails"></ul>
      ${exerciseTypes[workoutName]
        .map(
          (k) => `
          <label for="${k}">${k}: </label><br>
          <input class="newWorkoutField" type="text" id="${k.toLowerCase()}" name="${k}"><br><br>
        `
        )
        .join("")}
        <input class="addButton" type="submit" value="Add">
      </form>
    </div>
  `;

  let form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page from reloading

    // Get input values
    // let workoutName =
    //   document.getElementById("workoutName") != null
    //     ? document.getElementById("workoutName").value
    //     : "";
    let weight = exerciseTypes[workoutName].includes("Weight")
      ? document.getElementById("weight").value
      : "";
    let reps = exerciseTypes[workoutName].includes("Reps")
      ? document.getElementById("reps").value
      : "";
    let distance = exerciseTypes[workoutName].includes("Distance")
      ? document.getElementById("distance").value
      : "";
    let duration = exerciseTypes[workoutName].includes("Duration")
      ? document.getElementById("duration").value
      : "";
    let time = exerciseTypes[workoutName].includes("Time") // NECESSARY?
      ? document.getElementById("time").value
      : "";
    let date = exerciseTypes[workoutName].includes("Date") // NECESSARY?
      ? document.getElementById("date").value
      : "";

    let newIndex = Object.keys(userExercises).length;

    userExercises[newIndex] = {};

    userExercises[newIndex].name = workoutName;

    // TODO: Add workout type
    if (weight != "") {
      userExercises[newIndex].weight = weight;
    }
    if (reps != "") {
      userExercises[newIndex].reps = reps;
    }
    if (distance != "") {
      userExercises[newIndex].distance = distance;
    }
    if (duration != "") {
      userExercises[newIndex].duration = duration;
    }

    userExercises[newIndex].time = time;
    userExercises[newIndex].date = date;

    exerciseContainer.innerHTML = `
    <ul class="card-list" id="userExerciseList"></ul>
    `;
    showUserExercises();
  });
}

function showSuggestionsExercise() {
  let input = document.getElementById("newExerciseInput");
  let inputValue = input.value.trim().toLowerCase();

  // Get the list of items that match the input value
  let matchingExercises = Object.keys(exerciseTypes)
    .filter((exercise) => exercise.toLowerCase().startsWith(inputValue))
    .map((exercise) => exercise);

  // Prepend the plus button to the matchingExercises list
  matchingExercises.unshift("+ New Workout");

  // Clear the suggestions
  clearSuggestionsExercise();

  // Add the matching items to the suggestions list
  let suggestionsList = document.getElementById("exerciseSuggestions");
  suggestionsList.style.display = "block";

  // Position the suggestions list below the input element
  let inputRect = input.getBoundingClientRect();
  suggestionsList.style.left = inputRect.left + "px";
  suggestionsList.style.top = inputRect.bottom + "px";

  matchingExercises.forEach((item) => {
    let suggestion = document.createElement("li");

    suggestion.className = item == "+ New Workout" ? "newWorkout" : "sugResult";

    suggestion.textContent = item;
    suggestion.addEventListener("click", () => {
      exerSugClicked(item, userExercises, exerciseTypes);
      fillFields(item);
      // clearSuggestionsExercise();
    });
    suggestionsList.appendChild(suggestion);
  });
}

function handleKeyDownExercise(event) {
  let input = document.getElementById("newExerciseInput");
  let inputValue = input.value;

  // Check for backspace key
  if (event.keyCode === 8 && inputValue.length === 0) {
    clearSuggestionsExercise();
  }
}

function clearSuggestionsExercise() {
  let suggestionsList = document.getElementById("exerciseSuggestions");
  suggestionsList.innerHTML = "";
  suggestionsList.style.display = "none";
}

function exerSugClicked(item) {
  // If the user opted to add a new workout
  if (item === "+ New Workout") {
    showNewWorkoutFields();
  }

  // If the user selected a pre-existing workout
  else {
    showInputWorkoutFields(item);
  }
}
