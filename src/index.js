document.addEventListener("DOMContentLoaded", function () {
  fetchDogs(); // Fetch dog data when the page loads

  // Add event listener to search button
  document.getElementById("searchButton").addEventListener("click", filterDogs);

  // Function to fetch all dogs from the server
  function fetchDogs() {
    fetch("https://all-things-dog-be.onrender.com/mbwa") // Fetch data from the JSON server
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        displayPets(data); // Display all dogs on load
      })
      .catch((error) => console.error("Error loading dog data:", error));
  }

  // Function to filter dogs based on search criteria
  function filterDogs() {
    const breedInput = document
      .getElementById("searchBreed")
      .value.toLowerCase();
    const locationInput = document
      .getElementById("searchLocation")
      .value.toLowerCase();

    fetch("https://all-things-dog-be.onrender.com/mbwa") // Fetch the data again
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        // Filter the dogs based on user input
        const filteredDogs = data.filter(
          (dog) =>
            dog.breed.toLowerCase().includes(breedInput) &&
            dog.location.toLowerCase().includes(locationInput)
        );

        displayPets(filteredDogs); // Display only matching dogs
      })
      .catch((error) => console.error("Error loading dog data:", error));
  }

  // Function to display dogs in the UI section
  function displayPets(data) {
    const dogGallery = document.getElementById("dogGallery");
    dogGallery.innerHTML = ""; // Clear existing content

    const dataList = document.querySelector("#breedName");
    const locationList = document.querySelector("#locationList");

    data.forEach((dog) => {
      const option1 = document.createElement("option");
      option1.innerHTML = ` <option value= ${dog.breed}></option>`;
      dataList.appendChild(option1); //dog breed dropdown

      const option2 = document.createElement("option");
      option2.innerHTML = ` <option value=${dog.location}></option>`;
      locationList.appendChild(option2); //dog location drop-down

      const dogCard = `
          <div id='card' class="bg-white p-4 rounded-lg shadow-lg">
            <img src="${dog.url}" alt="${dog.name}" class="w-full h-48 object-cover rounded-lg">
            <h2 class="text-xl font-semibold mt-2">${dog.name}</h2>
            <p class="text-gray-600">${dog.breed}, ${dog.age}</p>
            <p class="text-gray-500">${dog.location}</p>
          </div>
        `;
      dogGallery.innerHTML += dogCard; // Append dog card to gallery
    });
  }

  // modal

  // Form
  document
    .getElementById("dogForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Get form values
      const dogImage = document.getElementById("dogImage").value;
      const dogName = document.getElementById("dogName").value;
      const dogBreed = document.getElementById("dogBreed").value;
      const dogAge = document.getElementById("dogAge").value;
      const dogLocation = document.getElementById("dogLocation").value;

      // Create dog object
      const dogData = {
        url: dogImage,
        name: dogName,
        breed: dogBreed,
        age: dogAge,
        location: dogLocation,
      };

      // Send data to db.json using fetch
      fetch("https://all-things-dog-be.onrender.com/mbwa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogData),
      })
        .then((response) => response.json())
        .then(() => {
          alert("Dog details submitted successfully!");
          document.getElementById("dogForm").reset(); // Reset form after submission
          fetchDogs(); // Refresh the dog list
        })
        .catch((error) => console.error("Error:", error));
    });

  // Smooth Scroll Function

  // function scrollToSection(sectionId) {
  //   document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  // }
});
