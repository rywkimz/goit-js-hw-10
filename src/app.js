import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    breedSelect.style.display = 'block';
    Notiflix.Loading.remove();
  })
  .catch(error => {
    console.error('Error:', error);
    Notiflix.Loading.remove();
    Notiflix.Report.failure(
      'Error',
      'Could not fetch breeds. Please try again later.',
      'Close'
    );
  });
