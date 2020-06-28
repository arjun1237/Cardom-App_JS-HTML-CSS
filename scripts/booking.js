import {damageInsurance, status} from './common.js'

const timeInput = document.getElementById('booking-time')
const usageInput = document.getElementById('booking-car-usage')
const fuelInput = document.getElementById('booking-fuel')
const lifeInsInput = document.getElementById('booking-life-insurance')
const chauffeurInput = document.getElementById('booking-chauffeur')
const damageInsInput = document.getElementById('booking-damage-insurance')
const depositInput = document.getElementById('booking-deposit')
const totalInput = document.getElementById('booking-total')
const selectDiffBtn = document.getElementById('select-different')
const advPayment = document.getElementById('adv-payment')
const booking = bookingCalculation()

function Booking(id, status, carID, userID, payment, chauffeur, carBookedFor, bookinDate, usage, InitialFuel, lifeInsurance, damageInsurance){
    this.id = id
    this.status = status
    this.carID = carID
    this.userID = userID
    this.payment = payment
    this.chauffeur = chauffeur
    this.carBookedFor = carBookedFor
    this.bookinDate = bookinDate
    this.usage = usage
    this.InitialFuel = InitialFuel
    this.lifeInsurance = lifeInsurance
    this.damageInsurance = damageInsurance
}

window.addEventListener('load', addEvents)

function addEvents(){
    if(checkLogin()[0]){
        booking.displayData()
        addEvents2Inputs()
        selectDiffBtn.addEventListener('click', go2Selection)
    }
}

function checkLogin(){
    let login = localStorage.getItem('login')
    if(login === null){
        location.href = 'login.html'
    }
    login = JSON.parse(login)
    if(login === undefined){
        localStorage.removeItem('login')
        location.href = 'login.html'
    }
    return [true, login]
}

function go2Selection(){
    localStorage.removeItem('car-selection')
    location.href = 'selection.html'
}

function addEvents2Inputs(){
    timeInput.addEventListener('blur', booking.storeDate)
    usageInput.addEventListener('blur', booking.storeUsage)
    fuelInput.addEventListener('blur', booking.storeFuel)
    lifeInsInput.addEventListener("change", booking.storeLifeInsure)
    chauffeurInput.addEventListener('change', booking.storeChauffeur)
    advPayment.addEventListener('click', bookCar)
}

function bookCar(){
    let bookings = localStorage.getItem('bookings')
    if(bookings === null){
        bookings = []
    }
    else{
        bookings = JSON.parse(bookings)
        if(bookings === undefined){
            bookings = []
        }
    }
    let id = bookings.length === 0? 1 : (bookings[bookings.length - 1].id + 1)

    let newBooking = new Booking( id, status[0], getSelection(), checkLogin()[1].id, 
                                totalInput.value, booking.getChauffeur(), booking.getDate(), 
                                Date.now(), booking.getUsage(), booking.getFuel(), 
                                booking.getLifeInsure(), booking.getDamageInsure() )

    bookings.push(newBooking)
    localStorage.setItem('bookings', JSON.stringify(bookings))
    location.href = 'receipt.html'
}

function getSelection(){    
    let carSelect = localStorage.getItem('car-selection')
    if(carSelect === null){
        location.href = 'selection.html'
        return
    }
    return JSON.parse(carSelect)
}

function bookingCalculation(){
    let carObj = getCar()
    let [minDateTime, usage, fuel, lifeInsure, chauffeur, damageInsure, deposit, fuelCap] = [setMinDateOnInput(), 1200, 1245, false, false, getDamageInsure(), getDeposit(), getFuelCap()]

    function getCar(){
        carSelect = getSelection()
        let cars = localStorage.getItem('cars')
        if(cars === null){
            location.href = 'selection.html'
            return
        }
        cars = JSON.parse(cars).filter(car => car.id === carSelect)
        if(cars.length === 0){
            location.href = 'selection.html'
            return
        }
        let car = cars[0]
        if(car === undefined || car.car === null || car.car === undefined){
            location.href = 'selection.html'
            return
        }
        return car
        //check booking status as well
    }


    // functions for data extrcation
    function getFuelCap(){
        return carObj.car.fuelCapacity
    }

    function getFuel(){
        return fuel
    }

    function getDamageInsure(){
        let type = carObj.car.type
        return damageInsurance[type]
    }

    function getDeposit(){
        return carObj.car.deposit
    }

    function getDate(){
        return minDateTime
    }

    function getChauffeur(){
        return chauffeur
    }

    function getLifeInsure(){
        return lifeInsure
    }

    function getUsage(){
        return Math.ceil(usage/50)
    }


    // functions to store
    function storeLifeInsure(){
        lifeInsure = lifeInsInput.checked
        displayData()
    }

    function storeChauffeur(){
        chauffeur = chauffeurInput.checked
        displayData()
    }

    function storeUsage(){
        let temp = Number(usageInput.value)
        if(isNaN(temp) || temp < 24){
            usageInput.value = 24
            usage = 24 * 50
        }
        else if(temp > 360){
            usageInput.value = 360
            usage = 360 * 50
        }
        else{
            usage = temp * 50
        }
        displayData()
    }

    function storeFuel(){
        let temp = Number(fuelInput.value)
        if(isNaN(temp) || temp < 15){
            fuelInput.value = 15
            fuel = 15 * 83
        }
        else if(temp > fuelCap){
            fuelInput.value = fuelCap
            fuel = fuelCap * 83
        }
        else{
            fuel = temp * 83
        }
        displayData()
    }

    function setMinDateOnInput(){
        let currentDate = new Date()
        let dateTime = new Date(currentDate.setDate(currentDate.getDate() + 1)).toJSON().slice(0, 16)
        timeInput.setAttribute('min', dateTime)
        timeInput.setAttribute('value', dateTime)
        return dateTime
    }

    function storeDate(){
        let dt = timeInput.value
        if(dt === undefined || dt === '' || (new Date(dt) - Date.now() < 3600000) ){
            dateTime = setMinDateOnInput()
            return
        }
        minDateTime = new Date(dt)
        displayData()
    }

    function displayData(){
        damageInsInput.innerHTML = "&#8377; " + damageInsure
        depositInput.innerHTML = "&#8377; " + deposit
        totalInput.innerHTML = "&#8377; " + ( usage + fuel + (lifeInsure ? 3500 : 0) 
                                        + (chauffeur ? 700*Math.ceil( (usage/50) /24) : 0) 
                                        + damageInsure + deposit )
    }

    return {displayData, storeDate, storeFuel, storeUsage, storeLifeInsure, storeChauffeur,
            getFuel, getDamageInsure, getLifeInsure, getDate, getDeposit, getChauffeur, getUsage}
}