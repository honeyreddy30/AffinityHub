document.addEventListener('DOMContentLoaded', function() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    alert("You must be logged in to view the dashboard.");
    window.location.href = 'index.html'; 
    return; 
  }

  const joinedClubs = JSON.parse(localStorage.getItem('joinedClubs')) || [];
  const userClubsContainer = document.getElementById('user-clubs');
  const availableClubsContainer = document.getElementById('available-clubs');

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.clubs.forEach(club => {
            const clubElement = document.createElement('div');
            clubElement.className = 'club-item'; 
            
            let clubContent = `<h3>${club.name}</h3>`;

            if (joinedClubs.includes(club.id)) {
                clubContent += `<div class="club-info">
                <img src="${club.image}" alt="${club.name}" style="width: 100px;">
                <button class="exit-club-btn" style="align-right" onclick="exitClub('${club.id}')">Exit</button>
                <hr>
                </div>`;
                clubElement.innerHTML = clubContent;
                userClubsContainer.appendChild(clubElement);
            } else {
                clubElement.innerHTML = `
                <h3>${club.name}</h3>
                <p>${club.description}</p>
                <img src="${club.image}" alt="${club.name}" style="width: 100px;">
                <hr>
            `;
                availableClubsContainer.appendChild(clubElement);
            }
        });
    })
    .catch(error => console.error('Error loading clubs data:', error));
});

function exitClub(clubId) {
  let joinedClubs = JSON.parse(localStorage.getItem('joinedClubs')) || [];
  const index = joinedClubs.indexOf(clubId);
  if (index > -1) {
      joinedClubs.splice(index, 1); 
      localStorage.setItem('joinedClubs', JSON.stringify(joinedClubs));
      
      window.location.reload(); 
  }
}

function displayUserName(user) {
  const userNameElement = document.getElementById('user-name');
  if (userNameElement) {
    userNameElement.textContent = user.username || 'User';
  }
}

function displayUserProfile(user) {
  const userProfileSection = document.getElementById('user-profile');
  if (userProfileSection) {
    userProfileSection.innerHTML = `<h2>Welcome, ${user.username}!</h2><p>Your clubs and suggestions will be displayed here.</p>`;
  }
}

function getClubs() {
  return JSON.parse(localStorage.getItem('clubs')) || [];
}

function getSuggestedClubs() {
  const allClubs = getClubs();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return allClubs.filter(club => !currentUser.clubs.includes(club.id));
}
