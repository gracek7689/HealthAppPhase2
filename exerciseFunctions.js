// JS functions for exercise tab

function enterNewWorkout() {
  var exerciseContainer = document.getElementById("exerciseContainer");
  exerciseContainer.innerHTML = `
      <div class="searchContainer">
        <h1>Today</h1>
        <input type="text" id="newExerciseInput" class="form-control" placeholder="Search..." 
          oninput="showSuggestionsExercise()" 
          onkeydown="handleKeyDown(event)" />
        <ul id="exerciseSuggestions" class="searchSug"></ul>
      </div>
      `;
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

function showSuggestionsExercise() {
  let input = document.getElementById("newExerciseInput");
  let inputValue = input.value.trim().toLowerCase();

  // Get the list of items that match the input value
  let matchingExercises = exercises.filter((item) =>
    item.toLowerCase().startsWith(inputValue)
  );

  // Prepend the plus button to the matchingExercises list
  matchingExercises.unshift("+ New Workout");

  // Clear the suggestions
  clearSuggestionsExercise();

  // if (inputValue === "") {
  //   return;
  // }

  // if (matchingExercises.length === 0) {
  //   let suggestionsList = document.getElementById("exerciseSuggestions");
  //   suggestionsList.style.display = "none";
  //   return;
  // }

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
    console.log(item);
  }
}
