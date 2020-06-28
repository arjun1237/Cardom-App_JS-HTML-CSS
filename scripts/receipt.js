import {addCommatoNum} from './common.js'

const receiptTitle = document.getElementById('receipt-title')
const receiptID = document.getElementById('receipt-id')
const receiptDT = document.getElementById('receipt-date-time')
const receiptUsage = document.getElementById('receipt-usage')
const receiptUsageMoney = document.getElementById('receipt-usage-money')
const receiptFuel = document.getElementById('receipt-fuel')
const receiptFuelMoney = document.getElementById('receipt-fuel-money')
const receiptChauffeurBool = document.getElementById('receipt-chauffeur-bool')
const receiptChauffeur = document.getElementById('receipt-chauffeur')
const receiptLifeBool = document.getElementById('receipt-lifeInsure-bool')
const receiptLife = document.getElementById('receipt-lifeInsure')
const receiptDamage = document.getElementById('receipt-damage')
const receiptDeposit = document.getElementById('receipt-deposit')
const receiptTotal = document.getElementById('receipt-total')
const receiptGST = document.getElementById('receipt-gst')
const receiptAmtPaid = document.getElementById('receipt-amount-paid')

window.addEventListener('load', filterData)

function filterData(){
    let bookings = localStorage.getItem('bookings')
    let user = localStorage.getItem('login')

    if(bookings === null || user === null){
        returnToSelection()
    }

    bookings = JSON.parse(bookings)
    user = JSON.parse(user)

    if(bookings.length === 0){
        returnToSelection()
    }

    let userID = user.id
    bookings = bookings.filter(booking => booking.userID === userID)
    if(bookings.length === 0){
        returnToSelection()
    }

    let booking = bookings[bookings.length-1]
    let carID = booking.carID    
    let cars = localStorage.getItem('cars')
    if(cars === null){
        returnToSelection()
    }
    cars = JSON.parse(cars)
    if(cars.length === 0){
        returnToSelection()
    }
    cars = cars.filter(car => car.id === carID)
    if(cars.length === 0 || cars[0].car === undefined){
        returnToSelection()
    }
    
    displayData(booking, cars[0])
}

function displayData(booking, carObj){
    let car = carObj.car
    receiptTitle.textContent = car.name + " " + car.model
    receiptID.textContent = booking.id
    receiptDT.textContent = new Date(booking.carBookedFor).toString().slice(0, 21) + " hrs"
    receiptUsage.textContent = booking.usage + " hrs"
    receiptUsageMoney.innerHTML = "&#8377; " + addCommatoNum(booking.usage * 50)
    receiptFuel.textContent = booking.initialFuel + " litres"
    receiptFuelMoney.innerHTML = "&#8377; " + addCommatoNum(booking.initialFuel * 83)
    receiptChauffeurBool.textContent = booking.chauffeur ? "Yes" : "No"
    receiptChauffeur.innerHTML = `&#8377; ${booking.chauffeur? addCommatoNum(Math.ceil(booking.usage/24)*700) : 0}` 
    receiptLifeBool.textContent = booking.lifeInsurance ? "Yes" : "No"
    receiptLife.innerHTML = `&#8377; ${booking.lifeInsurance? '3,500' : 0}`
    receiptDamage.innerHTML = "&#8377; " + addCommatoNum(booking.damageInsurance)
    receiptDeposit.innerHTML = "&#8377; " + addCommatoNum(car.deposit)
    let total = (booking.usage*50) + (booking.initialFuel*83) 
                + (booking.lifeInsurance ? 3500 : 0) 
                + (booking.chauffeur ? 700*Math.ceil(booking.usage/24) : 0) 
                + booking.damageInsurance + car.deposit
    receiptTotal.innerHTML = "&#8377; " + addCommatoNum(total)
    let GST = Math.ceil(total*0.18)
    receiptGST.innerHTML = `&#8377; ${addCommatoNum(GST)} (18%)`
    receiptAmtPaid.innerHTML = '&#8377; ' + addCommatoNum(total + GST)
}

function returnToSelection(){
    location.href = 'selection.href'
    return
}