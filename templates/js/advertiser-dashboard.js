const burgerMenu = document.querySelector('#dehaze');
const viewAllButton = document.querySelector('#viewAll');
const activeButton = document.querySelector('#active');
const acceptedButton = document.querySelector('#accepted');
const deactivatedButton = document.querySelector('#deactivated');
const declinedButton = document.querySelector('#declined');
const navigationButtons = document.querySelector(('#hide-show'));
const display = document.querySelector('#announcements');
const firstnameDisplay = document.querySelector('#firstname');

const viewAll = document.querySelector('.viewAll');
const active = document.querySelector('.active');
const accepted = document.querySelector('.accepted');
const deactivated = document.querySelector('.deactivated');
const declined = document.querySelector('.declined');

let users = [
    {
        firstname: 'Jane',
        lastname: 'doe',
        email: 'janedoe@gmail.com',
        address: 'California',
        announcements: [
            {
                title: 'jane announcement one',
                status: 'pending',
                text: 'Jane Lorem ipsum sit amet 1'
            },
            {
                title: 'jane announcement two',
                status: 'pending',
                text: 'Jane Lorem ipsum sit amet 2'
            },
            {
                title: 'jane announcement three',
                status: 'active',
                text: 'Jane Lorem ipsum sit amet 3'
            },
            {
                title: 'jane announcement four',
                status: 'active',
                text: 'Jane Lorem ipsum sit amet 4'
            },
            {
                title: 'jane announcement five',
                status: 'deactivated',
                text: 'Jane Lorem ipsum sit amet 5'
            },
            {
                title: 'jane announcement six',
                status: 'deactivated',
                text: 'Jane Lorem ipsum sit amet 6'
            },
            {
                title: 'jane announcement seven',
                status: 'accepted',
                text: 'jane Lorem ipsum sit amet 7'
            },
            {
                title: 'jane announcement eight',
                status: 'accepted',
                text: 'jane Lorem ipsum sit amet 8'
            },
            {
                title: 'jane announcement nine',
                status: 'accepted',
                text: 'trevor Lorem ipsum sit amet 9'
            }
        ]
    }
];

const loadAllAnnouncements = () => {
    const user = users.find(user => user.email === 'janedoe@gmail.com');

    firstnameDisplay.innerHTML = user.firstname;

    const allAnnouncementsMarkup = user.announcements.map(announcement => {
       return `<div class="announcement">
                <div class="title">
                    <h3>${announcement.title}</h3>
                </div>
                <div class="body">
                    <p>${announcement.text}</p>
                </div>
                <div class="details">
                    <div class="status">
                        <p>Status: <span>${announcement.status}</span></p>
                    </div>
                    <div class="update">
                        <span class="material-icons">update</span>
                        <label>Update</label>
                    </div>
                </div>
            </div>`
    }).join('');

    display.innerHTML = allAnnouncementsMarkup;
}

const loadAnnouncementsOfSpecificState = (state) => {
    const user = users.find(user => user.email === 'janedoe@gmail.com');

    firstnameDisplay.innerHTML = user.firstname;

    const announcementsOfInterest = user.announcements.filter(announcement => announcement.status === state);

    if(announcementsOfInterest.length === 0){
        return display.innerHTML = `<div class="announcement">
        <p>There are no announcements with the status <em>${state}</em></p>
    </div>`;
    }

    const specificAnnouncementsMarkup = announcementsOfInterest.map(ann => {
        return `<div class="announcement">
        <div class="title">
            <h3>${ann.title}</h3>
        </div>
        <div class="body">
            <p>${ann.text}</p>
        </div>
        <div class="details">
            <div class="status">
                <p>Status: <span>${ann.status}</span></p>
            </div>
            <div class="update">
                <span class="material-icons">update</span>
                <label>Update</label>
            </div>
        </div>
    </div>`
    }).join('');

    display.innerHTML = specificAnnouncementsMarkup;
}

burgerMenu.addEventListener('click', () => {
    navigationButtons.classList.toggle('hide');
});

viewAllButton.addEventListener('click', () => {
    loadAllAnnouncements();
    navigationButtons.classList.add('hide');
});

activeButton.addEventListener('click', () => {
    const state = 'active'
    loadAnnouncementsOfSpecificState(state);
    navigationButtons.classList.add('hide');
});

acceptedButton.addEventListener('click', () => {
    const state = 'accepted';
    loadAnnouncementsOfSpecificState(state);
    navigationButtons.classList.add('hide');
});

deactivatedButton.addEventListener('click', () => {
    const state = 'deactivated';
    loadAnnouncementsOfSpecificState(state);
    navigationButtons.classList.add('hide');
});

declinedButton.addEventListener('click', () => {
    const state = 'declined';
    loadAnnouncementsOfSpecificState(state);
    navigationButtons.classList.add('hide');
});

viewAll.addEventListener('click', () => {
    loadAllAnnouncements();
});

active.addEventListener('click', () => {
    const state = 'active'
    loadAnnouncementsOfSpecificState(state);
});

accepted.addEventListener('click', () => {
    const state = 'accepted';
    loadAnnouncementsOfSpecificState(state);
});

deactivated.addEventListener('click', () => {
    const state = 'deactivated';
    loadAnnouncementsOfSpecificState(state);
});

declined.addEventListener('click', () => {
    const state = 'declined';
    loadAnnouncementsOfSpecificState(state);
});

loadAllAnnouncements();