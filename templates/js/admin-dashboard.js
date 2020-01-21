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
                        <h3 class="announcement-title">Lorem Ipsum</h3>
                    </div>
                    <div class="creator-and-status">
                        <p>Creator: <span id="creator">John Smith</span></p>
                        <p>Status: <span id="status"></span>Active</p>
                    </div>
                </div>
                <div class="body">
                    <p class="announcement-body">Lorem ipsum dolor sit amet</p>
                </div>
                <div class="change-status-delete">
                    <div class="status">
                        <form action="">
                            <label for="change-status">Change status:</label>
                            <select name="change-status">
                                <option value="change status" selected disabled>Change status</option>
                                <option value="active">Active</option>
                                <option value="deactivated">Deactivated</option>
                                <option value="accepted">Accepted</option>
                                <option value="declined">Declined</option>
                            </select>
                            <input type="submit" value="OK">
                        </form>
                    </div>
                </div>
            </div>`
            });
    
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