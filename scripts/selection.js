import {locations, powers, fuel, carType, setAttributes, status} from './common.js'

window.addEventListener('load', addEvents)
const selectCity = document.getElementById('selectCity')
const selectFuel = document.getElementById('selectFuel')
const selectPower = document.getElementById('selectPower')
const selectType = document.getElementById('selectType')
const banner = document.getElementById('no-car-banner')

function addEvents(){
    addOptions(selectCity, locations, 'Choose', true)
    addEventToCity()
    addFilters()
}

let selectionObj = selection()

function selection(){
    removeNoCarBanner()
    let [locationVal, carTypeVal, fuelTypeVal, powerTypeVal] = [null, null, null, null]

    function changeLocation(val){
        if(locations.indexOf(val) === -1){
            locationVal = null
        }
        else{
            locationVal = val
        }
        filterCars()
    }

    function changeType(val){
        if(carType.indexOf(val) === -1){
            carTypeVal = null
        }
        else{
            carTypeVal = val
        }
        filterCars()
    }

    function changeFuel(val){
        if(fuel.indexOf(val) === -1){
            fuelTypeVal = null
        }
        else{
            fuelTypeVal = val
        }
        filterCars()
    }

    function changePower(val){
        val = Number(val)
        if(powers.indexOf(val) === -1){
            powerTypeVal = null
        }
        else{
            powerTypeVal = val
        }
        filterCars()
    }

    function displayNocarBanner(){
        banner.classList.remove('display-none')
    }
    
    function removeNoCarBanner(){
        banner.classList.add('display-none')
    }

    function filterCars(){
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
        
        // if location is null, that means the location is not selected, so cars wont be displayed
        cars = cars.filter(car => {
            let carObj = car.car
            let indCarType = carObj.type
            let indCarFuel = carObj.fuel
            let indCarPower = carObj.power
            return ( car.location === locationVal
                && (carTypeVal === null || indCarType === carTypeVal) 
                && (powerTypeVal === null || indCarPower === powerTypeVal)
                && (fuelTypeVal === null || indCarFuel === fuelTypeVal) )
        })

        wrapper.innerHTML = ''
        let bookings = localStorage.getItem('bookings')
        if(bookings === null){
            bookings = []
        }
        else{
            bookings = JSON.parse(bookings)
        }
        let ids = []
        bookings.forEach(b => {
            if(b.status !== status[2]){
                ids.push(b.carID)
            }
        })

        if(cars.length !== 0){
            removeNoCarBanner()
            cars.forEach(car => {
                let index = ids.indexOf(car.id)
                let temp = (index === -1 || car.status === status[2]) ? carDisplay(car, false) : carDisplay(car, true)
                wrapper.append(temp)
            })
        }
        else{            
            displayNocarBanner()
        }
    }

    return {changeLocation, changeType, changeFuel, changePower}    
}

function addEventToCity(){
    selectCity.addEventListener('change', displayFiltersCars)
}

function displayFiltersCars(){
    var div = document.getElementById('selection-cars')
    div.classList.remove('display-none')
    selectionObj.changeLocation(event.target.value)
}

function addFilters(){
    addOptions(selectType, carType, 'Car type (any)', false)
    addOptions(selectFuel, fuel, 'Motor Fuel (any)', false)
    addOptions(selectPower, powers, 'Minimum Power (any)', false)
    addEventsToFilter()
}

function addEventsToFilter(){
    selectType.addEventListener('change', () =>{
        selectionObj.changeType(event.target.value)
    })
    selectFuel.addEventListener('change', () =>{
        selectionObj.changeFuel(event.target.value)
    })
    selectPower.addEventListener('change', () =>{
        selectionObj.changePower(event.target.value)
    })
}

function addOptions(select, options, optionHead, defaultDisable){
    if(select === null){
        return
    }
    let option1 = document.createElement('option')
    option1.value = 'null'
    option1.textContent = optionHead + '...'
    option1.selected = true
    if(defaultDisable) option1.disabled = true
    select.append(option1)

    options.forEach(key => {
        let option = document.createElement('option')
        option.value = key
        option.textContent = key
        select.append(option)
    })
}

function carDisplay(car, isBooked){
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

    pBtn.addEventListener('click', () => { goToBooking(id) })

    bookCover.append(bookBtn)
    bookBtn.append(pBtn) 
    bookAppear.append(bookCover)
    cardBody.append(detailsTable, bookAppear)

    if(isBooked){
        const booked = document.createElement('div')
        booked.style.width = Object.assign(booked.style, {top: "0", left: "0", position: "absolute", zIndex: "10", width: "100%", height: "100%"})
        booked.classList.add('booked')

        const stamp = ` <div class="stamp">
                            <div class="s-outer border-light outer-size">
                                <div class="s-middle border-light middle-size">
                                    <div class="s-inner text-light">
                                        <p class="h4">Booked</p>
                                    </div>
                                </div>
                            </div>
                        </div>`
        booked.innerHTML = stamp

        cardDetailing.append(carImg, cardBody, booked)
    }
    else{
        cardDetailing.append(carImg, cardBody)

        cardDetailing.addEventListener('mouseover', () => {
            bookAppear.classList.remove('display-none')
        })
    
        cardDetailing.addEventListener('mouseout', () => {
            bookAppear.classList.add('display-none')
        })
    }
    
    const footer = document.createElement('div')
    footer.classList.add('card-footer', 'bg-secondary', 'text-white')
    const footerP = document.createElement('p')
    footerP.classList.add('mb-0')
    footerP.textContent = seater + ' seater'
    footer.append(footerP)
    card.append(cardHeader, cardDetailing, footer)
    topLayer.append(card)

    return topLayer
}

function goToBooking(id){
    localStorage.setItem('car-selection', id+'')
    location.href = 'booking.html'
}