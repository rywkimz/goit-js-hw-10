import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoDiv = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const errorParagraph = document.querySelector('.error');

  // Hide relevant elements initially
  breedSelect.style.display = 'none';
  catInfoDiv.style.display = 'none';
  errorParagraph.style.display = 'none';

  // Show loader and hide select during request
  Notiflix.Loading.standard('Loading breeds...');

  // Fetch the list of breeds and populate the selector
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      // Show select and hide loader after breeds are loaded
      breedSelect.style.display = 'block';
      Notiflix.Loading.remove();
    })
    .catch(error => {
      console.error('Error:', error);
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        'Error',
        'Could not fetch breeds. Please try again later.',
        'Okay'
      );
    });

  // Listen for changes in the breed selector
  breedSelect.addEventListener('change', event => {
    const breedId = event.target.value;

    // Show loader and hide cat info during request
    Notiflix.Loading.standard('Loading cat info...');

    // Fetch cat info by breed
    fetchCatByBreed(breedId)
      .then(cat => {
        const { name, description, temperament } = cat.breeds[0];
        const catInfoHTML = `
          <h2>${name}</h2>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
          <img src="${cat.url}" alt="${name}" />
        `;
        catInfoDiv.innerHTML = catInfoHTML;

        // Show cat info and hide loader
        catInfoDiv.style.display = 'block';
        Notiflix.Loading.remove();
      })
      .catch(error => {
        console.error('Error:', error);
        Notiflix.Loading.remove();
        Notiflix.Report.failure(
          'Error',
          'Could not fetch cat info. Please try again later.',
          'Okay'
        );
      });
  });
});
