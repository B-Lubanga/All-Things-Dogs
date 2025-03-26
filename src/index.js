document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:4000/mbwa") // Fetch data from the JSON file
    .then((response) => response.json())
    .then((res) => displayPets(res))
    .catch((error) => console.error("Error loading dog data:", error));

  function displayPets(data) {
    const dogGallery = document.getElementById("dogGallery");
    const dogList = document.querySelector("#breedName");
    const dogLocation = document.querySelector("#locationList");

    dogGallery.innerHTML = ""; // Clear existing content
    data.forEach((dog) => {
      let searchOption = document.createElement("option");
      searchOption.value = dog.breed;
      searchOption.textContent = dog.breed;
      dogList.appendChild(searchOption); //display search options

      const dogCard = `
                      <div id='card' class="bg-white p-4 rounded-lg shadow-lg">
                          <img src="${dog.url}" alt="${dog.name}" class="w-full h-48 object-cover rounded-lg">
                          <h2 class="text-xl font-semibold mt-2">${dog.name}</h2>
                          <p class="text-gray-600">${dog.breed}, ${dog.age}</p>
                      </div>
                  `;
      dogGallery.innerHTML += dogCard; // Append dog card

      // Get form values
      const dogImage = document.getElementById("dogImage").value;
      const dogName = document.getElementById("dogName").value;
      const dogBreed = document.getElementById("dogBreed").value;
      const dogAge = document.getElementById("dogAge").value;
      const dogLocation = document.getElementById("dogLocation").value;

      // Create dog object
      const dogData = {
        image: dogImage,
        name: dogName,
        breed: dogBreed,
        age: dogAge,
        location: dogLocation,
      };

      // Send data to db.json using fetch
      fetch("http://localhost:4000/mbwa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Dog details submitted successfully!");
          document.getElementById("dogForm").reset(); // Reset form after submission
        })
        .catch((error) => console.error("Error:", error));
    });

    // Smooth Scroll Function
    function scrollToSection(sectionId) {
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    }
  }
});
