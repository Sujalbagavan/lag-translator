const API_URL = 'https://pakpetewdrnllukowjgc.supabase.co/rest/v1/addplace';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha3BldGV3ZHJubGx1a293amdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3ODA1NDYsImV4cCI6MjA2MjM1NjU0Nn0.L3sy3kkryCfdWFGUPNITAKsjvOcwpEjwbkysChsT4Zg';

async function fetchPlaces() {
  try {
    const response = await fetch(API_URL + '?select=*', {
      method: 'GET',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data); // Add this to debug
    renderPlaces(data);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('places-container').innerHTML = 
      `<p>Error loading data: ${error.message}</p>`;
  }
}

function renderPlaces(places) {
  const container = document.getElementById('places-container');
  container.innerHTML = '';

  if (!Array.isArray(places) || places.length === 0) {
    container.innerHTML = '<p>No data available.</p>';
    return;
  }

  places.forEach(place => {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Adjust these property names according to your Supabase table columns
    card.innerHTML = `
      <h3>${place.name || place.title || 'No Title'}</h3>
      <p>${place.description || place.details || 'No Description'}</p>
    `;

    container.appendChild(card);
  });
}

// Call fetchPlaces when the page loads
document.addEventListener('DOMContentLoaded', fetchPlaces);
