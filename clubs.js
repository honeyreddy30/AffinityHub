document.addEventListener('DOMContentLoaded', function () {
    
    fetchClubsData();

   
    function fetchClubsData() {
        fetch("./data.json")
            .then(response => response.json())
            .then(data => {
                
                populateFeaturettes(data.clubs);
                
                bindClubActions();
            })
            .catch(error => console.error('Error fetching the clubs data:', error));
    }

    
    function populateFeaturettes(clubs) {
        const featurettes = document.querySelectorAll('.featurette');
        clubs.forEach((club, index) => {
            if (index < featurettes.length) {
                populateFeaturette(featurettes[index], club);
            }
        });
    }

   
    function populateFeaturette(featurette, club) {
        const heading = featurette.querySelector('h2.featurette-heading');
        const paragraph = featurette.querySelector('p.lead');
        const imageContainer = featurette.querySelector('div.col-md-5');

        if (heading && paragraph && imageContainer) {
            heading.textContent = club.name;
            paragraph.textContent = club.description;
            setImage(imageContainer, club);
        }
    }

    
    function setImage(container, club) {
        const img = document.createElement('img');
        img.src = club.image;
        img.alt = club.name;
        img.className = 'bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto';
        img.width = 500;
        img.height = 500;
        container.innerHTML = '';
        container.appendChild(img);
    }

    
    function bindClubActions() {
        document.querySelectorAll('.join-btn').forEach(btn => {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                const clubId = this.dataset.clubId;
                joinClub(clubId);
            });
        });

        document.querySelectorAll('.message-btn').forEach(btn => {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                const clubId = this.dataset.clubId;
                const message = prompt('Enter your anonymous message:');
                if (message) {
                    sendMessage(clubId, message);
                }
            });
        });
    }
});


function joinClub(clubId) {
    let joinedClubs = JSON.parse(localStorage.getItem('joinedClubs')) || [];
   var club = document.getElementById(clubId);
    var memberCount = club.querySelector('.member-count');
    
    if (club.classList.contains('joined')) {
        alert("You are already in this club");
    } else {
        club.classList.add('joined');
        var count = parseInt(memberCount.innerText);
       memberCount.innerText = "Wohooo! You just made your " + (count + 1) + "st" + " move!!!";
        alert("You have successfully joined the club");
        joinedClubs.push(clubId);
        localStorage.setItem('joinedClubs', JSON.stringify(joinedClubs));
    }
}


function sendMessage(clubId, message) {
    let messages = JSON.parse(localStorage.getItem('clubMessages')) || {};
    if (!messages[clubId]) {
        messages[clubId] = [];
    }
    messages[clubId].push(message);
    localStorage.setItem('clubMessages', JSON.stringify(messages));
    alert('Your message has been sent anonymously.');
}




