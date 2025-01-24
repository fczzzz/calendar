let currentDate = new Date();
let birthdays = {
    "2025-12-01": ["Alice", "Bob", "Charlie", "David"],
    "2025-10-15": ["Eve", "Frank"],
    "2025-09-20": ["Grace"],
    "2025-04-10": ["Hannah", "Ivy", "Jack"]
};

$(document).ready(function() {
    generateCalendar(currentDate);
    drawBarChart();
    drawPieChart();

    // Add event listener for adding birthdays
    $('#calendarBody').on('click', '.day-content', function(event) {
        let day = $(this).text().trim();
        let monthYear = $('#monthYear').text();
        let key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;

        let birthdayNames = prompt(`Enter birthdays for ${day} ${monthYear}:`);
        if (birthdayNames) {
            birthdays[key] = birthdayNames.split(',').map(name => name.trim());
            updateCharts();
        }
    });
});

function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Explicitly set the locale to 'en-US' to get the month name in English
    $('#monthYear').text(date.toLocaleString('en-US', { month: 'long' }) + ' ' + year);

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tr = '<tr>';
    for(let i = 0; i < firstDay; i++) {
        tr += '<td></td>';
    }

    for(let day = 1; day <= daysInMonth; day++) {
        let key = `${year}-${month + 1}-${day}`;
        let birthdayText = birthdays[key] ? birthdays[key].join(', ') : '';
        if((firstDay + day) % 7 === 0) {
            tr += `<td><div contenteditable="false" class="day-content">${day}<br>${birthdayText}</div></td></tr><tr>`;
        } else {
            tr += `<td><div contenteditable="false" class="day-content">${day}<br>${birthdayText}</div></td>`;
        }
    }
    tr += '</tr>';

    $('#calendarBody').html(tr);
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
    updateCharts();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
    updateCharts();
}

function toggleCalendar() {
    $('.calendar').toggle();
}

function fadeInOutPieChart() {
    $('#pieChart').fadeToggle(1000);
}

function slideUpDownBarChart() {
    $('#barChart').slideToggle(1000);
}

function animateCalendar() {
    $('.calendar').animate({
        left: '250px',
        opacity: '0.5',
        height: '150px'
    }, 1500 );
}

function stopSliding() {
    $('.calendar').stop(true, true);
}

function callbackExample() {
    $('.calendar').hide(1000, function(){
        alert('The paragraph is now hidden');
    });
}

function chainingEffects() {
    $('.calendar').css("color", "red").slideUp(2000).slideDown(2000);
}

function addRemoveDay() {
    $('#calendarBody tr:first-child td:last-child').remove();
    $('#calendarBody tr:first-child').append('<td><div contenteditable="false" class="day-content">New Day</div></td>');
}

function appendDay() {
    $('#calendarBody tr:first-child').append('<td><div contenteditable="false" class="day-content">Appended Day</div></td>');
}

function afterBefore() {
    $('#calendarBody tr:first-child td:first-child').after('<td><div contenteditable="false" class="day-content">Inserted After</div></td>');
    $('#calendarBody tr:first-child td:last-child').before('<td><div contenteditable="false" class="day-content">Inserted Before</div></td>');
}

function changeHeightWidth() {
    $('.calendar').height(300);
    $('.calendar').width(400);
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const colors = [
    'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.4)', 'rgba(54, 162, 235, 0.4)', 'rgba(255, 206, 86, 0.4)',
    'rgba(75, 192, 192, 0.4)', 'rgba(153, 102, 255, 0.4)', 'rgba(255, 159, 64, 0.4)'
];

const borderColor = [
    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
];

function countBirthdaysByMonth() {
    return months.map(month => {
        let count = 0;
        Object.keys(birthdays).forEach(key => {
            let [year, m, day] = key.split('-').map(Number);
            if (months[m - 1] === month) {
                count += birthdays[key].length;
            }
        });
        return count;
    });
}

function drawBarChart() {
    var ctx = document.getElementById('barChart').getContext('2d');
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: '# of Birthdays',
                data: countBirthdaysByMonth(),
                backgroundColor: colors,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function drawPieChart() {
    var ctx = document.getElementById('pieChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: months,
            datasets: [{
                label: '# of Birthdays',
                data: countBirthdaysByMonth(),
                backgroundColor: colors,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Birthdays by Month'
                }
            }
        }
    });
}

function updateCharts() {
    $('#barChart').remove();
    $('#pieChart').remove();
    $('#barChartContainer').empty();
    $('#pieChartContainer').empty();
    $('#barChartContainer').append('<canvas id="barChart" width="400" height="200"></canvas>');
    $('#pieChartContainer').append('<canvas id="pieChart" width="400" height="200"></canvas>');
    drawBarChart();
    drawPieChart();
}

// Initialize containers for charts
$('#barChart').wrap('<div id="barChartContainer"></div>');
$('#pieChart').wrap('<div id="pieChartContainer"></div>');

// Initial generation of calendar and charts
generateCalendar(currentDate);
drawBarChart();
drawPieChart();
