// Function to create a calendar for a given year and month
function createCalendar(year, month) {
    const calendar = document.getElementById('calendarz');
    const daysOfWeek = ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();

    // SVG icons for different types of waste
    const svgs = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="black" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="#7DA483" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="silver" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="brown" /></svg>`
    ];
    
    // Create header row for days of the week
    const headerRow = daysOfWeek.map(day => `<td class="header-cell">${day}</td>`).join('');
    calendar.innerHTML = `<tr class="calendar-header">${headerRow}</tr>`;

    const calendarRows = [];
    let row = [];
    let day;

    // Fill in the empty cells before the first day of the month
    for (day = 0; day < firstDay; day++) {
        row.push('<td class="empty-cell"></td>');
    }

    // Populate the calendar with days and add data attributes for clicks and images
    for (let date = 1; date <= lastDate; date++) {
        const currentDay = (firstDay + date - 1) % 7;
        const weekendClass = (currentDay === 0 || currentDay === 6) ? 'weekend' : '';
        row.push(`<td class="day-cell ${weekendClass}" data-date="${date}" data-image-index="0" data-clicks="0">${date}</td>`);
        
        // End the row after Saturday
        if (currentDay === 6) {
            calendarRows.push(`<tr class="calendar-row">${row.join('')}</tr>`);
            row = [];
        }
    }

    // Add the last row to the calendar
    calendarRows.push(`<tr class="calendar-row">${row.join('')}</tr>`);
    calendar.innerHTML += calendarRows.join('');

    // Attach event listeners to the calendar cells
    addEventListeners(svgs);
}

// Function to add click event listeners to day cells
function addEventListeners(svgs) {
    const cells = document.querySelectorAll('.day-cell');

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function() {
            const clickCount = parseInt(this.dataset.clicks);
            const currentIndex = parseInt(this.dataset.imageIndex);

            // Cycle through SVG icons on click
            if (clickCount < svgs.length) {
                this.innerHTML = svgs[currentIndex];
                this.dataset.imageIndex = (currentIndex + 1) % svgs.length;
            } else {
                // Reset to date after three clicks
                this.innerHTML = this.dataset.date;
                this.dataset.imageIndex = 0;
                this.dataset.clicks = 0;
                return;
            }

            // Increment click count and save table state
            this.dataset.clicks = clickCount + 1;
            const table = document.getElementById('calendarz').innerHTML;
            localStorage.setItem("testTag", JSON.stringify(table));
        }, false);
    }
}

// Get the current date
const today = new Date();

// Load calendar from local storage or create a new one
if (localStorage.getItem("testTag")) {
    document.getElementById('calendarz').innerHTML = JSON.parse(localStorage.getItem("testTag"));
    addEventListeners([
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="black" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="#7DA483" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="silver" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="brown" /></svg>`
    ]);
} else {
    createCalendar(today.getFullYear(), today.getMonth() + 1);
}

// Function to clear the calendar and reset local storage
const clearTable = () => {
    localStorage.removeItem("testTag");
    createCalendar(today.getFullYear(), today.getMonth() + 1);
}

