async function fetchUsers() {
  const loadingEl = document.getElementById('loading');
  const container = document.getElementById('user-container');

  // Show loading text
  loadingEl.classList.remove('hidden');
  container.innerHTML = ''; // clear old content

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    // Create user cards
    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'p-4 border rounded shadow-sm bg-gray-50';
      card.innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>City:</strong> ${user.address.city}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    container.innerHTML = `<p class="text-red-600">Something went wrong while fetching data.</p>`;
  } finally {
    // Hide loading text
    loadingEl.classList.add('hidden');
  }
}

// Add click event
document.getElementById('load-btn').addEventListener('click', fetchUsers);
