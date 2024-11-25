'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// Get the button and file input element
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-upload');


/*****************************************************************************************/
// Fake friends data
const friends = [
    "Alice Johnson",
    "Bob Smith",
    "Catherine Lee",
    "David Brown",
    "Ella Martinez",
    "Franklin Wilson",
    "Grace Adams",
    "Hannah Garcia"
];

// Function to render the friends list
function renderFriendsList() {
    const friendsList = document.getElementById('friendsList');
    friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        friendsList.appendChild(li);
    });
}

// Toggle Edit Profile
function toggleEdit() {
    const nameDisplay = document.getElementById('profileName');
    const bioDisplay = document.getElementById('profileBio');
    const nameInput = document.getElementById('editNameInput');
    const bioInput = document.getElementById('editBioInput');
    const editButton = document.getElementById('editProfileButton');
    const saveButton = document.getElementById('saveProfileButton');

    // Switch to edit mode
    nameInput.value = nameDisplay.textContent;
    bioInput.value = bioDisplay.textContent;

    nameDisplay.style.display = 'none';
    bioDisplay.style.display = 'none';
    nameInput.style.display = 'block';
    bioInput.style.display = 'block';
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
}

// Save Profile Changes
function saveProfile() {
    const nameDisplay = document.getElementById('profileName');
    const bioDisplay = document.getElementById('profileBio');
    const nameInput = document.getElementById('editNameInput');
    const bioInput = document.getElementById('editBioInput');
    const editButton = document.getElementById('editProfileButton');
    const saveButton = document.getElementById('saveProfileButton');

    // Save changes
    nameDisplay.textContent = nameInput.value;
    bioDisplay.textContent = bioInput.value;

    nameDisplay.style.display = 'inline-block';
    bioDisplay.style.display = 'inline-block';
    nameInput.style.display = 'none';
    bioInput.style.display = 'none';
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
}

// Adding new posts
function addPost() {
    const postContent = document.getElementById('newPostContent').value;
    const postsContainer = document.getElementById('postsContainer');

    if (postContent.trim() === '') return;

    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    postDiv.innerHTML = `
        <div class="post-header">
            <img src="profile-image.jpg" class="profile-img" alt="User">
            <h3>John Doe</h3>
        </div>
        <div class="post-content">${postContent}</div>
    `;
    postsContainer.appendChild(postDiv);
    document.getElementById('newPostContent').value = ''; // Clear textarea after posting
}

// Load friends list on page load
window.onload = function() {
    renderFriendsList();
}

/*****************************************************************************************/
// Add event listener to file input when a file is selected
fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];  // Get the selected file

    if (file && file.type.startsWith('image')) {
        const reader = new FileReader();  // Create a FileReader to read the file
        reader.onload = function (e) {
            // Set the body background to the uploaded image
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = 'cover';  // Ensure the image covers the whole body
            document.body.style.backgroundPosition = 'center';  // Center the image
            document.body.style.backgroundAttachment = 'fixed';  // Optional: Make the background fixed
        };
        reader.readAsDataURL(file);  // Convert the image to a data URL
    } else {
        alert('Please upload a valid image file.');
    }
});

// Add event listener to button to trigger file input
uploadBtn.addEventListener('click', function () {
    fileInput.click();
});

/*****************************************************************************************/
// Page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

/*****************************************************************************************/
// Tabbed component
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // Activate tab
    clicked.classList.add('operations__tab--active');

    // Activate content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

/*****************************************************************************************/
// Menu fade animation
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
