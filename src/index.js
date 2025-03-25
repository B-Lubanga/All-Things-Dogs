ocument.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/mbwa") // Fetch data from the JSON file
    .then((response) => response.json())
    .then((res) => displayPets(res))
    .catch((error) => console.error("Error loading dog data:", error));

  function displayPets(data) {
    const dogGallery = document.getElementById("dogGallery");
    const dogList = document.querySelector("#breedName");

    dogGallery.innerHTML = ""; // Clear existing content
    data.forEach((dog) => {
      let searchOption = document.createElement("option");
      searchOption.innerHTML = `<option value="${dog.breed}"> `;
      dogList.appendChild(searchOption); //display search options

      const dogCard = `
                      <div id='card' class="bg-white p-4 rounded-lg shadow-lg">
                          <img src="${dog.url}" alt="${dog.name}" class="w-full h-48 object-cover rounded-lg">
                          <h2 class="text-xl font-semibold mt-2">${dog.name}</h2>
                          <p class="text-gray-600">${dog.breed}, ${dog.age}</p>
                      </div>
                  `;
      dogGallery.innerHTML += dogCard; // Append dog card

      // Smooth Scroll Function
      function scrollToSection(sectionId) {
        document
          .getElementById(sectionId)
          .scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
