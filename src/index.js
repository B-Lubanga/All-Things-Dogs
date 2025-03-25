document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:4000/mbwa") // Fetch data from the JSON file
    .then((response) => response.json())
    .then((data) => {
      const dogGallery = document.getElementById("dogGallery");
      dogGallery.innerHTML = ""; // Clear existing content
      data.forEach((dog) => {
        const dogCard = `
                    <div class="bg-white p-4 rounded-lg shadow-lg">
                        <img src="${dog.url}" alt="${dog.name}" class="w-full h-48 object-cover rounded-lg">
                        <h2 class="text-xl font-semibold mt-2">${dog.name}</h2>
                        <p class="text-gray-600">${dog.breed}, ${dog.age}</p>
                    </div>
                `;
        dogGallery.innerHTML += dogCard; // Append dog card
      });
    })
    .catch((error) => console.error("Error loading dog data:", error));
});
