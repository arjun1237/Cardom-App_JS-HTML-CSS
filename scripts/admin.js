import {status} from './common.js'

window.addEventListener('load', addEvents)

function addEvents(){
    let bookings = localStorage.getItem('bookings') || [] 
    controlChart(JSON.parse(bookings))
}

function controlChart(bookings){
    var ctx = document.getElementById('myChart').getContext('2d');
    let cars = JSON.parse(localStorage.getItem('cars') || [])
    let chartData = bookings.map(x => [new Date(x.carBookedFor).toDateString(), cars.filter(y => y.id === x.carID)[0]?.car?.type])
    let dates = {}
    for(let i=0; i<chartData.length; i++){
        if(dates.hasOwnProperty(chartData[i][0])){
            if(dates[chartData[i][0]][chartData[i][1]] === undefined){
                dates[chartData[i][0]] = {}
                dates[chartData[i][0]][chartData[i][1]] = 1
            }
            else{
                dates[chartData[i][0]][chartData[i][1]]++
            }
        }
        else{
            dates[chartData[i][0]] = {}
            dates[chartData[i][0]][chartData[i][1]] = 1
        }
    }
    console.log(dates)

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132)',
                borderWidth: 1
            },{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(155, 99, 232)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99)'
                },
                position: 'bottom'
            },
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}