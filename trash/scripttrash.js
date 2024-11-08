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
    let headerRow = '<tr class="calendar-header">';
    daysOfWeek.forEach(day => headerRow += `<td class="header-cell">${day}</td>`);
    headerRow += '</tr>';
    calendar.innerHTML = headerRow;

    // Start the calendar rows
    let row = '<tr class="calendar-row">';
    let day;

    // Fill in the empty cells at the start of the month
    for (day = 0; day < firstDay; day++) {
        row += '<td class="empty-cell"></td>';
    }

    // Fill in the days of the month with click-to-cycle functionality
    for (let date = 1; date <= lastDate; date++) {
        const currentDay = (firstDay + date - 1) % 7;
        const weekendClass = (currentDay === 0 || currentDay === 6) ? 'weekend' : '';
        row += `<td class="day-cell ${weekendClass}" data-date="${date}" data-image-index="0" data-clicks="0">${date}</td>`;

        if (currentDay === 6) {  // Start a new row after Saturday
            row += '</tr>';
            if (date < lastDate) row += '<tr class="calendar-row">'; // Add a new row only if more dates are left
        }
    }

    row += '</tr>';
    calendar.innerHTML += row;

    // Add click event listener to each day cell
    document.querySelectorAll('.day-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            // Get current click count and image index
            let clickCount = parseInt(cell.dataset.clicks);
            let currentIndex = parseInt(cell.dataset.imageIndex);

            if (clickCount < 3) {
                // Change the content to the next SVG image
                cell.innerHTML = svgs[currentIndex];
                // Cycle to the next image index
                cell.dataset.imageIndex = (currentIndex + 1) % svgs.length;
            } else if (clickCount === 3) {
                // Reset the cell to the number and reset click count
                cell.innerHTML = cell.dataset.date;
                cell.dataset.imageIndex = 0; // Reset the image index
                cell.dataset.clicks = 0; // Reset the click counter
                return; // Exit early to prevent incrementing after reset
            }

            // Increment the click count
            cell.dataset.clicks = clickCount + 1;
        });
    });
}

// Get the current month and year
const today = new Date();
createCalendar(today.getFullYear(), today.getMonth() + 1);