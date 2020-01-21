const burgerMenu = document.querySelector('#dehaze');
const viewAllButton = document.querySelector('#viewAll');
const navigationButtons = document.querySelector(('#hide-show'));
const display = document.querySelector('#announcements');
const firstnameDisplay = document.querySelector('#firstname');

const viewAll = document.querySelector('.viewAll');

let users = [
    {
        firstname: 'Jane',
        lastname: 'doe',
        email: 'janedoe@gmail.com',
        address: 'California',
        isAdmin: false,
        announcements: [
            {
                title: 'jane announcement one',
                status: 'declined',
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
        ]
    },

    {
        firstname: 'Sam ',
        lastname: 'Smith',
        email: 'samsmith@gmail.com',
        address: 'New York',
        isAdmin: false,
        announcements: [
            {
                title: 'sam announcement one',
                status: 'deactivated',
                text: 'sam Lorem ipsum sit amet 1'
            },
            {
                title: 'sam announcement two',
                status: 'active',
                text: 'sam Lorem ipsum sit amet 2'
            },
            {
                title: 'sam announcement three',
                status: 'declined',
                text: 'sam Lorem ipsum sit amet 3'
            },
        ]
    },

];

const loadAllAnnouncements = () => {
        firstnameDisplay.innerHTML = 'Admin';
        const allAnnouncements = users.map(user => {
           const oneUserAnnouncements = user.announcements.map(announcement => {
                return `<div class="announcement">
                <div class="header">
                    <div class="title">
                        <h3 class="announcement-title">${announcement.title}</h3>
                    </div>
                    <div class="creator-and-status">
                        <p>Creator: <span id="creator">${user.firstname} ${user.lastname}</span></p>
                        <p>Status: <span id="status"></span>${announcement.status}</p>
                    </div>
                </div>
                <div class="body">
                    <p class="announcement-body">Lorem ipsum dolor sit amet</p>
                </div>
            </div>`
            })
    
            return oneUserAnnouncements.join('');
        });
    
        return allAnnouncements.join('');
    }

    const displayAnnouncements = () => {
        display.innerHTML = loadAllAnnouncements();
    }

burgerMenu.addEventListener('click', () => {
    navigationButtons.classList.toggle('hide');
});

viewAll.addEventListener('click', () => {
    loadAllAnnouncements();
});

displayAnnouncements();