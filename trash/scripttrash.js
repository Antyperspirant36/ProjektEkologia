function createCalendar(year, month) {
    const calendar = document.getElementById('calendarz');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();

    // Array of SVG tags (inline SVG code)
    const svgs = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="black" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="silver" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="brown" /></svg>`
    ];

    // Create header row with day names
    const headerRow = daysOfWeek.map(day => `<td class="header-cell">${day}</td>`).join('');
    calendar.innerHTML = `<tr class="calendar-header">${headerRow}</tr>`;

    // Start the calendar rows
    const calendarRows = [];
    let row = [];
    let day;

    // Fill in the empty cells at the start of the month
    for (day = 0; day < firstDay; day++) {
        row.push('<td class="empty-cell"></td>');
    }

    // Fill in the days of the month with click-to-cycle functionality
    for (let date = 1; date <= lastDate; date++) {
        const currentDay = (firstDay + date - 1) % 7;
        const weekendClass = (currentDay === 0 || currentDay === 6) ? 'weekend' : '';
        row.push(`<td class="day-cell ${weekendClass}" data-date="${date}" data-image-index="0" data-clicks="0">${date}</td>`);

        if (currentDay === 6) {  // Start a new row after Saturday
            calendarRows.push(`<tr class="calendar-row">${row.join('')}</tr>`);
            row = [];
        }
    }

    calendarRows.push(`<tr class="calendar-row">${row.join('')}</tr>`);
    calendar.innerHTML += calendarRows.join('');

    // Add click event listeners to each day cell
    addEventListeners(svgs);
}

// Function to add click event listeners
function addEventListeners(svgs) {
    const cells = document.querySelectorAll('.day-cell');

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function() {
            const clickCount = parseInt(this.dataset.clicks);
            const currentIndex = parseInt(this.dataset.imageIndex);

            if (clickCount < 3) {
                this.innerHTML = svgs[currentIndex];
                this.dataset.imageIndex = (currentIndex + 1) % svgs.length;
            } else {
                this.innerHTML = this.dataset.date;
                this.dataset.imageIndex = 0;
                this.dataset.clicks = 0;
                return;
            }

            this.dataset.clicks = clickCount + 1;

            const table = document.getElementById('calendarz').innerHTML;
            localStorage.setItem("testTag", JSON.stringify(table));
        }, false);
    }
}

// Get the current month and year
const today = new Date();

if (localStorage.getItem("testTag")) {
    document.getElementById('calendarz').innerHTML = JSON.parse(localStorage.getItem("testTag"));
    addEventListeners([  // Restore event listeners with SVG data
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="black" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="silver" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="12" fill="brown" /></svg>`
    ]);
} else {
    createCalendar(today.getFullYear(), today.getMonth() + 1);
}

const clearTable = () => {
    localStorage.removeItem("testTag");
    createCalendar(today.getFullYear(), today.getMonth() + 1);
}
