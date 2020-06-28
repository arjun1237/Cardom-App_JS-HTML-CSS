import {damageInsurance, addCommatoNum} from './common.js'

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

const detailImg = document.getElementById('detail-img')
const detailPower = document.getElementById('detail-power')
const detailFuel = document.getElementById('detail-fuel')
const detailUsage = document.getElementById('detail-usage')
const detailType = document.getElementById('detail-type')
const detailSeater = document.getElementById('detail-seater')
const detailTitle = document.getElementById('detail-title')

const booking = bookingCalculation()

function Booking(id, carID, userID, payment, chauffeur, carBookedFor, bookinDate, usage, initialFuel, lifeInsurance, damageInsurance){
    this.id = id
    this.carID = carID
    this.userID = userID
    this.payment = payment
    this.chauffeur = chauffeur
    this.carBookedFor = carBookedFor
    this.bookinDate = bookinDate
    this.usage = usage
    this.initialFuel = initialFuel
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

function displayCarDetail(carObj){
    let car = carObj.car
    detailImg.src = car.img
    detailImg.style.height = '297px'
    detailImg.style.width = '75%'
    detailImg.style.margin = 'auto'
    detailImg.alt = car.name + " " + car.model
    let power = car.power
    detailPower.innerHTML = [ ...( new Array(power).fill('&#9733;') ), ...( new Array(5-power).fill('&#9734;') ) ].join(' ')
    detailFuel.textContent = car.fuel[0].toUpperCase() + car.fuel.slice(1)
    detailUsage.textContent = addCommatoNum(carObj.usage) + " Km"
    detailType.textContent = car.type
    detailSeater.textContent = car.seater
    detailTitle.textContent = car.name + " " + car.model
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
    let carSelect = getSelection()
    let bookingID = "CRDM" + Date.now() + "CR" + carSelect
    let newBooking = new Booking( bookingID, carSelect, checkLogin()[1].id, 
                                totalInput.value, booking.getChauffeur(), booking.getDate(), 
                                Date.now(), booking.getUsage(), booking.getFuel(), 
                                booking.getLifeInsure(), booking.getDamageInsure() )

    bookings.push(newBooking)
    localStorage.setItem('bookings', JSON.stringify(bookings))
    localStorage.removeItem('car-selection')
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

function getCars(){
    let cars = localStorage.getItem('cars')
    if(cars === null){
        location.href = 'selection.html'
        return
    }
    return JSON.parse(cars)
}

function bookingCalculation(){
    let carObj = getCar()
    let [minDateTime, usage, fuel, lifeInsure, chauffeur, damageInsure, deposit, fuelCap] = [setMinDateOnInput(), 24, 15, false, false, getDamageInsure(), getDeposit(), getFuelCap()]

    function getCar(){
        let carSelect = getSelection()
        let cars = getCars().filter(car => car.id === carSelect)
        if(cars.length === 0){
            location.href = 'selection.html'
            return
        }
        let car = cars[0]
        if(car === undefined || car.car === null || car.car === undefined){
            location.href = 'selection.html'
            return
        }
        displayCarDetail(car)
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
        return usage
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
            usage = 24
        }
        else if(temp > 360){
            usageInput.value = 360
            usage = 360
        }
        else{
            usage = temp
        }
        displayData()
    }

    function storeFuel(){
        let temp = Number(fuelInput.value)
        if(isNaN(temp) || temp < 15){
            fuelInput.value = 15
            fuel = 15
        }
        else if(temp > fuelCap){
            fuelInput.value = fuelCap
            fuel = fuelCap
        }
        else{
            fuel = temp
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
        damageInsInput.innerHTML = "&#8377; " + addCommatoNum(damageInsure)
        depositInput.innerHTML = "&#8377; " + addCommatoNum(deposit)
        totalInput.innerHTML = "&#8377; " + addCommatoNum( (usage*50) + (fuel*83) + (lifeInsure ? 3500 : 0) 
                                        + (chauffeur ? 700*Math.ceil(usage/24) : 0) 
                                        + damageInsure + deposit )
    }

    return {displayData, storeDate, storeFuel, storeUsage, storeLifeInsure, storeChauffeur,
            getFuel, getDamageInsure, getLifeInsure, getDate, getDeposit, getChauffeur, getUsage}
}