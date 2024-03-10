document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profile-form');
    const fullNameInput = document.getElementById('full-name');
    const dobInput = document.getElementById('dob');
    const emailInput = document.getElementById('email');

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveProfile();
    });

    function loadProfile() {
        const profile = JSON.parse(localStorage.getItem('userProfile'));
        if (profile) {
            fullNameInput.value = profile.fullName;
            dobInput.value = profile.dob;
            emailInput.value = profile.email;
        }
    }

    function saveProfile() {
        const profile = {
            fullName: fullNameInput.value,
            dob: dobInput.value,
            email: emailInput.value
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        alert('Profile saved successfully!');
    }

    loadProfile();
});
