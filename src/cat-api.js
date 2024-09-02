import axios from 'axios';

// Set the default API key for axios
axios.defaults.headers.common['x-api-key'] = 'CHEIA_TA_API'; // Replace 'CHEIA_TA_API' with your actual API key

/**
 * Fetches the list of cat breeds from The Cat API.
 * @returns {Promise<Array>} A promise that resolves to an array of breeds.
 */
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error; // Rethrow the error to be handled by the caller
    });
}

/**
 * Fetches cat information based on the breed ID.
 * @param {string} breedId - The ID of the breed to fetch.
 * @returns {Promise<Object>} A promise that resolves to the cat information object.
 */
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0]) // Assuming the response is an array with the cat object at index 0
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error; // Rethrow the error to be handled by the caller
    });
}
