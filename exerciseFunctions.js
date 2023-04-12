// JS functions for exercise tab

/* Represents the different types of exercises and fields associated with them. 
Updates when a user creates a new type of exercise. */
var exerciseTypes = {
  Run: ["Distance", "Duration", "Calories", "Time", "Date"],
  Yoga: ["Duration", "Calories", "Time", "Date"],
  Curlups: ["Weight", "Reps", "Calories", "Time", "Date"],
};

/* Populates list of exercise cards. Is called each time that screen
needs to be rendered. */
function showUserExercises() {
  let userExercises = JSON.parse(localStorage.getItem("userExercises"));

  let exerciseList = document.getElementById("userExerciseList");

  exerciseList.innerHTML = ``;

  for (let i in userExercises) {
    let exerciseCard = document.createElement("li");
    exerciseCard.className = "card-container";

    exerciseCard.innerHTML = `
    <h2 class="card-date">${userExercises[i].date}</h2>
    <div class="card">
        <div class="card-title-wrapper">
          <h2 class="card-title">${userExercises[i].name}</h2>
          <h3>${userExercises[i].time}</h3>
        </div>
        <div class="detailText">
          <ul id="cardDetails"></ul>
          ${Object.keys(userExercises[i])
            .filter(
              (k) =>
                k !== "name" &&
                k != "date" &&
                k != "time" &&
                userExercises[i][k]
            )
            .map((k) =>
              k == "calories"
                ? `<h3>${userExercises[i][k]} calories</h3>`
                : `<h3>${userExercises[i][k]}</h3>`
            )
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
      <h2 class="card-date">Today</h2>
      <div class="plus-button" onclick="enterNewWorkout()">
        <h1 style="font-weight:500">&#43;</h1>
      </div>
    `;

    let exerciseContainer = document.querySelector("#exerciseContainer");
    exerciseContainer.insertAdjacentElement("beforeend", plusButton);
  }
}

/* Button embedded in the main exercise card screen that allows the user
to enter a new workout session. */
function enterNewWorkout() {
  let exerciseContainer = document.getElementById("exerciseContainer");
  exerciseContainer.innerHTML = `
      <div class="searchContainer">
        <h1 class="todayHeader">Today's Workout</h1>
        <input type="text" id="newExerciseInput" placeholder="Search Workouts" 
          oninput="showSuggestionsExercise()" 
          onkeydown="handleKeyDown(event)" 
          class="searchInput"/>
        <ul id="exerciseSuggestions" class="searchSug"></ul>
      </div>
      `;

  // Makes it so that suggestions are shown as soon as this page is toggled
  // Without it, they will not be populated until the search field is clicked on
  showSuggestionsExercise();
}

/* Form to be shown when the user selects the + New Workout option from the
workout suggestion dropdown menu. Updates both userExercises[] and exerciseTypes[] */
function showNewWorkoutFields() {
  let userExercises = JSON.parse(localStorage.getItem("userExercises"));

  let exerciseContainer = document.getElementById("exerciseContainer");
  const placeholder = "Leave blank if not applicable";
  exerciseContainer.innerHTML = `
    <div class="newWorkoutContainer">
    <h1 class="todayHeader">New Workout</h1>
      <form>
        <label for="workoutName" class="newWorkoutFieldLabel">Workout Name: </label><br>
        <input class="newWorkoutField" type="text" id="workoutName" name="workoutName"><br><br>
        <label for="weight" class="newWorkoutFieldLabel">Weight: </label><br>
        <input class="newWorkoutField" type="text" id="weight" name="weight" placeholder="${placeholder}"><br><br>
        <label for="reps" class="newWorkoutFieldLabel">Reps: </label><br>
        <input class="newWorkoutField" type="text" id="reps" name="reps" placeholder="${placeholder}"><br><br>
        <label for="distance" class="newWorkoutFieldLabel">Distance: </label><br>
        <input class="newWorkoutField" type="text" id="distance" name="distance" placeholder="${placeholder}"><br><br>
        <label for="duration" class="newWorkoutFieldLabel">Duration: </label><br>
        <input class="newWorkoutField" type="text" id="duration" name="duration" placeholder="${placeholder}"><br><br>
        <label for="time" class="newWorkoutFieldLabel">Calories: </label><br>
        <div>
          <div class="calorieButton" id="calorieButton">
            <h2 class="calorieButtonText">Calculate Calories</h2>
          </div>
          <input class="newWorkoutField" type="text" id="calories" name="calories" placeholder="OR enter calories manually"><br><br>
        </div>
        <label for="time" class="newWorkoutFieldLabel">Time: </label><br>
        <input class="newWorkoutField" type="text" id="time" name="time"><br><br>
        <label for="date" class="newWorkoutFieldLabel">Date: </label><br>
        <input class="newWorkoutField" type="text" id="date" name="date"><br><br>
        <input class="addButton" type="submit" value="Add">
      </form>
    </div>
  `;

  let calorieButton = document.getElementById("calorieButton");
  let calorieField = document.getElementById("calories");

  calorieButton.addEventListener("click", function () {
    const randomNumber = Math.floor(Math.random() * 400) + 150;
    calorieField.value = randomNumber;
  });

  let form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page from reloading

    // Get input values
    let workoutName = document.getElementById("workoutName").value;
    let weight = document.getElementById("weight").value;
    let reps = document.getElementById("reps").value;
    let distance = document.getElementById("distance").value;
    let duration = document.getElementById("duration").value;
    let calories = document.getElementById("calories").value;
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

    newWorkoutFields.push("Calories");
    userExercises[newIndex].calories = calories;
    newWorkoutFields.push("Time");
    userExercises[newIndex].time = time;
    newWorkoutFields.push("Date");
    userExercises[newIndex].date = date;

    // Add new workout to exerciseTypes object
    exerciseTypes[workoutName] = newWorkoutFields;

    // NEW: write userExercises to local storage
    localStorage.clear();
    localStorage.setItem("userExercises", JSON.stringify(userExercises));
    // window.location.href = "index.html";

    exerciseContainer.innerHTML = `
    <ul class="card-list" id="userExerciseList"></ul>
    `;
    showUserExercises();
  });
}

/* Called when an existing workout type is selected from the workout suggestion dropdown menu. */
function showInputWorkoutFields(workoutName) {
  let userExercises = JSON.parse(localStorage.getItem("userExercises"));

  let exerciseContainer = document.getElementById("exerciseContainer");
  exerciseContainer.innerHTML = `
    <div class="newWorkoutContainer">
    <h1>${workoutName}</h1>
      <form>
      <ul id="cardDetails"></ul>
      ${exerciseTypes[workoutName]
        .map((k) =>
          k != "Calories"
            ? `
          <label class="newWorkoutFieldLabel" for="${k}">${k}: </label><br>
          <input class="newWorkoutField" type="text" id="${k.toLowerCase()}" name="${k}"><br><br>
          `
            : `
          <label class="newWorkoutFieldLabel" for="${k}">${k}: </label><br>
          <div class="calorieButton" id="calorieButton">
            <h2 class="calorieButtonText">Calculate Calories</h2>
          </div>
          <input class="newWorkoutField" type="text" id="calories" name="calories" placeholder="OR enter calories manually"><br><br>
          </div>
          `
        )
        .join("")}
        <div class="addButton" id="add">
          <h2 class="addButtonText">Add</h2>
        </div>
      </form>
    </div>
  `;

  let calorieButton = document.getElementById("calorieButton");
  let calorieField = document.getElementById("calories");

  calorieButton.addEventListener("click", function () {
    const randomNumber = Math.floor(Math.random() * 400) + 150;
    calorieField.value = randomNumber;
  });

  let addButton = document.getElementById("add");

  addButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent page from reloading

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
    let calories = exerciseTypes[workoutName].includes("Calories")
      ? document.getElementById("calories").value
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

    userExercises[newIndex].calories = calories;
    userExercises[newIndex].time = time;
    userExercises[newIndex].date = date;

    localStorage.clear();
    localStorage.setItem("userExercises", JSON.stringify(userExercises));

    exerciseContainer.innerHTML = `
    <ul class="card-list" id="userExerciseList"></ul>
    `;
    showUserExercises();
  });
}

/* Populates the suggestion list when the user opts to enter a new workout session. */
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

  matchingExercises.forEach((item, index) => {
    let suggestion = document.createElement("li");

    if (index == matchingExercises.length - 1) {
      suggestion.className = "lastSug";
    } else {
      suggestion.className =
        item == "+ New Workout" ? "newWorkout" : "sugResult";
    }

    suggestion.textContent = item;
    suggestion.addEventListener("click", () => {
      exerSugClicked(item);
      fillFields(item);
    });
    suggestionsList.appendChild(suggestion);
  });
}

function clearSuggestionsExercise() {
  let suggestionsList = document.getElementById("exerciseSuggestions");
  suggestionsList.innerHTML = "";
  suggestionsList.style.display = "none";
}

/* Handles what happens when one of the workout suggestion dropdown options is clicked */
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
