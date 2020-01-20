const announcement = {
    announcementText: `Lorem ipsum dolor sit amet consectetur adipiscing elit est vehicula torquent, consequat ridiculus sodales porta eleifend nam fermentum aenean diam urna, sociosqu ac pulvinar primis at libero accumsan curabitur lacus.
    Lorem ipsum dolor sit amet consectetur adipiscing elit est vehicula torquent, consequat ridiculus sodales porta eleifend nam fermentum aenean diam urna, sociosqu ac pulvinar primis at libero accumsan curabitur lacus.`,
    startDate: '2019-02-12',
    endDate: '2019-10-12'
}

const text = document.querySelector('#announcementText');
const startDate = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');

const setText = () => {
    text.innerHTML = announcement.announcementText;
    startDate.value = announcement.startDate;
    endDate.value = announcement.endDate;
}

setText();