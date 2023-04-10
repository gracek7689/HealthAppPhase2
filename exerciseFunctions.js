// JS functions for exercise tab

// Populates list of exercise cards when exercise tab is first rendered.
function showUserExercises(userExercises, exerciseTypes) {
  let exerciseList = document.getElementById("userExerciseList");

  // WHY TF DOES THIS WORK
  if (document.getElementById("cardDetails") != null) {
    document.getElementById("cardDetail").remove();
  }

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
          .filter((k) => k !== "name" && k != "date" && userExercises[i][k])
          .map((k) => `<h4>${userExercises[i][k]}</h4>`)
          .join("")}
      </div>
    </div>
    `;

    exerciseList.appendChild(exerciseCard);
  }
  let plusButton = document.createElement("li");
  plusButton.className = "card-container";

  plusButton.innerHTML = `
    <h2>Today</h2>
    <div class="plus-button" onclick="enterNewWorkout(userExercises, exerciseTypes)">
      <h1 style="font-weight:500">&#43;</h1>
    </div>
  `;

  let exerciseContainer = document.querySelector("#exerciseContainer");
  exerciseContainer.insertAdjacentElement("beforeend", plusButton);
}

function enterNewWorkout(userExercises, exerciseTypes) {
  var exerciseContainer = document.getElementById("exerciseContainer");
  exerciseContainer.innerHTML = `
      <div class="searchContainer">
        <h1>Today</h1>
        <input type="text" id="newExerciseInput" placeholder="Search Workouts" 
          oninput="showSuggestionsExercise(userExercises, exerciseTypes)" 
          onkeydown="handleKeyDown(event)" />
        <ul id="exerciseSuggestions" class="searchSug"></ul>
      </div>
      `;

  // Makes it so that suggestions are shown as soon as this page is toggled
  // Without it, they will not be populated until the search field is clicked on
  showSuggestionsExercise(userExercises, exerciseTypes);
}

function showNewWorkoutFields() {
  var exerciseContainer = document.getElementById("exerciseContainer");
  exerciseContainer.innerHTML = `
    <div class="newWorkoutContainer">
    <h1>New Workout</h1>
      <form>
        <label for="workoutName">Workout Name: </label><br>
        <input class="newWorkoutField" type="text" id="workoutName" name="workoutName"><br><br>
        <label for="weight">Weight: </label><br>
        <input class="newWorkoutField" type="text" id="weight" name="weight"><br><br>
        <label for="reps">Reps: </label><br>
        <input class="newWorkoutField" type="text" id="reps" name="reps"><br><br>
        <label for="distance">Distance: </label><br>
        <input class="newWorkoutField" type="text" id="distance" name="distance"><br><br>
        <label for="time">Time: </label><br>
        <input class="newWorkoutField" type="text" id="time" name="time"><br><br>
        <input class="addButton" type="submit" value="Add">
      </form>
    </div>
  `;
}

function showInputWorkoutFields(workoutName) {
  var exerciseContainer = document.getElementById("exerciseContainer");
  exerciseContainer.innerHTML = `
    <div class="newWorkoutContainer">
    <h1>${workoutName}</h1>
      <form>
        <label for="workoutName">Workout Name: </label><br>
        <input class="newWorkoutField" type="text" id="workoutName" name="workoutName"><br><br>
        <label for="weight">Weight: </label><br>
        <input class="newWorkoutField" type="text" id="weight" name="weight"><br><br>
        <label for="reps">Reps: </label><br>
        <input class="newWorkoutField" type="text" id="reps" name="reps"><br><br>
        <label for="distance">Distance: </label><br>
        <input class="newWorkoutField" type="text" id="distance" name="distance"><br><br>
        <label for="time">Time: </label><br>
        <input class="newWorkoutField" type="text" id="time" name="time"><br><br>
        <input class="addButton" type="submit" value="Add">
      </form>
    </div>
  `;
}

function showSuggestionsExercise(userExercises, exerciseTypes) {
  let input = document.getElementById("newExerciseInput");
  let inputValue = input.value.trim().toLowerCase();

  // Get the list of items that match the input value
  let matchingExercises = Object.values(exerciseTypes)
    .filter((exercise) => exercise.name.toLowerCase().startsWith(inputValue))
    .map((exercise) => exercise.name);
  // let matchingExercises = userExercises.filter((item) =>
  //   item.toLowerCase().startsWith(inputValue)
  // );

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
      exerSugClicked(item);
      fillFields(item);
      clearSuggestionsExercise();
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
