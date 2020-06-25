{/* <div class="col-12 col-md-6 col-xl-4 mb-4 common-color-dark">
    <div class="card text-center common-color">
        <div class="card-header bg-dark text-light">
            <h5 class="card-title mb-2">Car Title</h5>
        </div>
        <div class="card-detailing">
            <img class="img-fluid border-bottom" src="https://imgd.aeplcdn.com/664x374/n/cw/ec/41652/hyundai-aura-right-front-three-quarter6.jpeg?q=85" alt="">
            <div class="card-body book-body">
                <table class="table mb-0">
                    <tbody class="card-text">
                        <tr>
                            <th class="border-top-0" scope="row">Power</th>
                            <td class="border-top-0 text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</td>
                        </tr>
                        <tr>
                            <th scope="row">Motor Fuel</th>
                            <td>Diesel</td>
                        </tr>
                        <tr>
                            <th scope="row">Usage</th>
                            <td>3500 Km</td>
                        </tr>
                        <tr>
                            <th scope="row">Type</th>
                            <td>Sedan</td>
                        </tr>
                    </tbody>
                </table>
                <div class="book-appear display-none">
                    <div class="book-cover">
                    </div>
                    <div class="book-btn">
                        <p class="btn btn-dark btn-lg">Book Now</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer common-bg-light">
            <p class="mb-0">4 seater</p>
        </div>
    </div> 
</div> */}

import {locations, powers, fuel, carType, setAttributes} from './common.js'

window.addEventListener('load', addEvents)
const selectCity = document.getElementById('selectCity')
const selectFuel = document.getElementById('selectFuel')
const selectPower = document.getElementById('selectPower')
const selectType = document.getElementById('selectType')

function addEvents(){
    addOptions(selectCity, locations, 'Choose')
    addEventToCity()
    addFilters()
}

function addEventToCity(){
    selectCity.addEventListener('change', displayFiltersCars)
}

function displayFiltersCars(){
    var div = document.getElementById('selection-cars')
    div.classList.remove('display-none')
    displayCars(event.target.value)
}

function displayNocarBanner(){

}

function addFilters(){
    addOptions(selectType, carType, 'Car type')
    addOptions(selectFuel, fuel, 'Motor Fuel')
    addOptions(selectPower, powers, 'Minimum Power')
    addEventsToFilter()
}

function addEventsToFilter(){
    selectFuel.addEventListener('change', )
}

function addOptions(select, options, optionHead){
    if(select === null){
        return
    }
    let option1 = document.createElement('option')
    option1.value = 'null'
    option1.textContent = optionHead + '...'
    option1.selected = true
    option1.disabled = true
    select.append(option1)

    options.forEach(key => {
        let option = document.createElement('option')
        option.value = key
        option.textContent = key
        select.append(option)
    })
}

function displayCars(location){
    let cars = localStorage.getItem('cars')
    const wrapper = document.getElementById('all-cars')

    if(cars === null){
        displayNocarBanner()
        return
    }
    cars = JSON.parse(cars)
    if(cars === undefined || cars.length === 0){
        displayNocarBanner()
        return
    }
    cars.filter(x => x.location === location).forEach(car => {
        if(car === null || undefined || car.car === null || car.car === undefined){
            return
        }
        wrapper.append(carDisplay(car))
    })
}

function carDisplay(car){
    const carDetail = car.car
    const id = car.id
    const usage = car.usage
    const fuel = carDetail.fuel
    const img = carDetail.img
    const model = carDetail.model
    const brand = carDetail.name
    const seater = carDetail.seater
    const type = carDetail.type
    const power = carDetail.power

    let topLayer = document.createElement('div')
    topLayer.classList.add('col-12', 'col-md-6', 'col-xl-4', 'mb-4', 'common-color-dark')   
    topLayer.setAttribute('data-cardID', id) 

    const card = document.createElement('div')
    card.classList.add('card', 'text-center', 'common-color')

    const cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header', 'bg-dark', 'text-light')
    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title', 'mb-2')
    cardTitle.innerHTML = brand + ' ' + model
    cardHeader.append(cardTitle)

    const cardDetailing = document.createElement('div')
    cardDetailing.classList.add('card-detailing')

    const carImg = document.createElement('img')
    carImg.classList.add('img-fluid', 'border-bottom')
    let carImgAttrs = {
        'src' : img,
        'alt' : brand + ' ' + model
    }
    carImg.style.width = '230px'
    carImg.style.height = '150px'
    setAttributes.call(carImg, carImgAttrs)
    
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body', 'book-body', 'p-md-1', 'p-lg-3')

    const detailsTable = document.createElement('table')
    detailsTable.classList.add('table', 'mb-0')

    const tBody = document.createElement('tbody')
    tBody.classList.add('card-text')

    const trPower = document.createElement('tr')
    const thPowerTitle = document.createElement('th')
    thPowerTitle.classList.add('border-top-0')
    thPowerTitle.setAttribute('scope', 'row')
    thPowerTitle.textContent = 'Power'
    const tdRating = document.createElement('td')
    tdRating.classList.add('border-top-0', 'text-warning')
    let stars = ''
    for(let i=0, j=power; i<5; i++, j--){
        if(j > 0){
            stars += '&#9733;'
        }
        else{
            stars += '&#9734;'
        }
        if(i < 4){
            stars += ' '
        }
    }
    tdRating.innerHTML = stars
    trPower.append(thPowerTitle, tdRating)
    tBody.append(trPower)
    
    let trs = {
        'Motor Fuel' : fuel, 
        'Usage' : usage, 
        'Type' : type
    }

    for(let key in trs){
        // console.log(key, trs[key])
        let tr = document.createElement('tr')
        let th = document.createElement('th')
        let td = document.createElement('td')

        th.classList.add('border-top-0')
        th.setAttribute('scope', 'row')
        th.textContent = key

        td.innerHTML = trs[key]
        tr.append(th, td)
        tBody.append(tr)
    }
    detailsTable.append(tBody)

    const bookAppear = document.createElement('div')
    bookAppear.classList.add('book-appear', 'display-none')
    const bookCover = document.createElement('div')
    bookCover.classList.add('book-cover')
    const bookBtn = document.createElement('div')
    bookBtn.classList.add('book-btn')
    const pBtn = document.createElement('p')
    pBtn.classList.add('btn', 'btn-dark', 'btn-lg')
    pBtn.textContent = 'Book Now'
    bookBtn.append(pBtn)
    bookAppear.append(bookCover, bookBtn)
    cardBody.append(detailsTable, bookAppear)
    cardDetailing.append(carImg, cardBody)
    
    const footer = document.createElement('div')
    footer.classList.add('card-footer', 'common-bg-light')
    const footerP = document.createElement('p')
    footerP.classList.add('mb-0')
    footerP.textContent = seater + ' seater'
    footer.append(footerP)
    card.append(cardHeader, cardDetailing, footer)
    topLayer.append(card)

    return topLayer
}