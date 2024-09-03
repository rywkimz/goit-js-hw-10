import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import './app.js'; // This line can be omitted unless it's needed for some initialization in your project

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');

  // Fetch and populate the breed dropdown on page load
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      breedSelect.style.display = 'block'; // Show the select dropdown
      Notiflix.Loading.remove(); // Remove loading indicator
    })
    .catch(error => {
      console.error('Error:', error);
      Notiflix.Loading.remove(); // Remove loading indicator
      Notiflix.Report.failure(
        'Error',
        'Could not fetch breeds. Please try again later.',
        'Close'
      );
    });

  // Listen for changes in the breed selection and fetch the corresponding cat image
  breedSelect.addEventListener('change', function () {
    const selectedBreedId = this.value;
    fetchCatByBreed(selectedBreedId).then(cats => {
      const img = document.createElement('img');
      img.src = cats[0].url; // Assuming you want the first image in the result
      document.querySelector('.cat-info').appendChild(img); // Append the image to your desired container
    });
  });
});
