
// items for DB mocking
export const locations = ['Bangalore', 'Hyderabad', 'Mumbai', 'Poona', 'Chennai', 'Delhi', 'Kolkata']
export const roles = ['admin', 'super-admin', 'customer']
export const carType = ['Sedan', 'SUV', 'Hatchback', 'Minivan', 'Prestige']
export const status = ['booked', 'returned-need-confirm', 'returned']
export const fuel = ['diesel', 'petrol']
export const powers = [1, 2, 3, 4, 5]
export const damageInsurance = { 
    'Sedan' : 750, 
    'SUV' : 1200, 
    'Hatchback' : 1350, 
    'Minivan' : 2350, 
    'Prestige' : 3800 
}

// creates and stores data in DB
//-------------------------------------------------------
export var vehicleObj = manageVehicle()
export var userObj = manageUsers()


// models and their properties
//------------------------------------------------------------------------------------------------
function Car(name, model, fuel, power, fuelCapacity, seater, type, deposit, img){
    this.name = name
    this.model = model
    this.fuel = fuel
    this.fuelCapacity = fuelCapacity
    this.power = power
    this.seater = seater
    this.type = type
    this.deposit = deposit
    if(img === null || img === undefined || img.trim() === ""){
        img = "https://via.placeholder.com/500X300"
    }
    this.img = img
}

function VehicleInfo(id, car, location, isUltimate, usage){
    this.id = id
    this.car = car
    this.location = location
    this.isUltimate = isUltimate
    this.usage = usage
}

export function User(id, name, age, email, phone, license, password, role){
    this.id = id
    this.name = name
    this.age = age
    this.email = email
    this.phone = phone
    this.license = license
    this.password = password
    this.role = role
}

export function Payment(val, gst = 0.18){
    this.val = val
    this.taxedVal = Math.ceil(val*gst) + val
}

export function Booking(id, carID, userID, payment, chauffeur, carBookedFor, bookingDate, usage, initialFuel, lifeInsurance, damageInsurance, status){
    this.id = id
    this.carID = carID
    this.userID = userID
    this.payment = payment
    this.chauffeur = chauffeur
    this.carBookedFor = carBookedFor
    this.bookingDate = bookingDate
    this.usage = usage
    this.initialFuel = initialFuel
    this.lifeInsurance = lifeInsurance
    this.damageInsurance = damageInsurance
    this.status = status
}

function manageUsers(){
    let userID = 0

    // mock admins details in DB (not real)
    let admins = ['Mithun', 'Surya', 'Neha', 'Vipin', 'Wazir', 'Akash', 'Sultan', 'Chirag', 'Pawan', 'Mahi', 'Manideep']
    let pass = 'pass123'
    let license = '87655ADFSG'
    let phone = '8767676543'
    setUserID()
    generateBookings()
    
    function setUserID(){
        var users = checkUsersinStorage()
        if(!users){
            generateAllUsers()
        }
        else{
            userID = users[users.length - 1].id
        }
    }

    function generateAllUsers(){
        var users = []
        for(var i=0; i<admins.length; i++){
            users.push(new User(++userID, admins[i], random(50, 20), 
                                admins[i].toLowerCase() + "@cardom.com", 
                                phone, license, pass, 
                                (admins[i].toLowerCase() === "surya" || admins[i].toLowerCase() === "neha") ? roles[1] : roles[0] ))
        }
        localStorage.setItem('users', JSON.stringify(users))
    }

    function generateBookings(){
        let bookings = checkBookingsinStorage()
        if(!bookings){
            localStorage.setItem('bookings', JSON.stringify(renderBookingsDB()))
        }
    }

    function addUser(user){
        var users = checkUsersinStorage()
        user.id = ++userID
        if(users === null){
            users = []
        }
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users))
    }

    function removeUser(id){
        var users = checkUsersinStorage()
        if(users === null){
            return
        }
        users = users.filter(e => e.id !== id)
        localStorage.setItem('users', JSON.stringify(users))
    }

    return {addUser, removeUser}
}

function manageVehicle(){
    let carID = 0
    setCarID()

    function setCarID(){
        var cars = checkCarsinStorage()
        if(cars === null){
            generateAllCarData()
        }
        else{
            carID = cars[cars.length - 1].id
        }
    }

    function generateAllCarData(){
        if(localStorage.getItem('cars') !== null){
            return
        }
        var vehicles = []
        var cars = renderDB()
        for(var i=0; i<locations.length; i++){
            for(var j=0; j<cars.length; j++){
                vehicles.push(new VehicleInfo(++carID, cars[j], 
                                            locations[i], cars[j].type === carType[4], 
                                            Math.round(Math.random()*30000) ))
            }
        }
        localStorage.setItem('cars', JSON.stringify(vehicles))
    }

    function addNewVehicle(vehicle){
        vehicle.id = ++carID
        var cars = checkCarsinStorage()
        if(cars !== null){
            cars.push(vehicle)
            localStorage.setItem('cars', JSON.stringify(cars))
            return
        }
        localStorage.setItem('cars', JSON.stringify([vehicle]))
    }

    function removeVehicle(id){
        cars = checkCarsinStorage()
        if(cars !== null){
            localStorage.setItem('cars', JSON.stringify(cars.filter(car => car.id !== id)))
        }
    }
    return {addNewVehicle, removeVehicle}
}


// creating bookings data for mock DB
// args - id, carID, userID, payment, chauffeur, carBookedFor, bookingDate, usage, initialFuel, lifeInsurance, damageInsurance, status
// ----------------------------------------------------
function renderBookingsDB(){
    let bookings = []
    bookings.push(new Booking(uuidv4(), 4, 12, new Payment(9876), true, "2020-07-21T05:20", 1596345630813, 24, 15, true, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 9, 12, new Payment(9876), true, "2020-07-23T05:20", 1596345630813, 24, 15, true, 1350, "booked"))
    bookings.push(new Booking(uuidv4(), 17, 12, new Payment(9876), false, "2020-07-23T05:20", 1596345630813, 24, 15, false, 1200, "booked"))
    bookings.push(new Booking(uuidv4(), 3, 12, new Payment(9876), true, "2020-07-23T05:20", 1596345630813, 24, 15, true, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 30, 12, new Payment(9876), false, "2020-07-23T05:20", 1596345630813, 24, 15, false, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 36, 12, new Payment(9876), false, "2020-07-23T05:20", 1596345630813, 24, 15, true, 1350, "booked"))
    bookings.push(new Booking(uuidv4(), 44, 12, new Payment(9876), true, "2020-07-22T05:20", 1596345630813, 24, 15, false, 1200, "booked"))
    bookings.push(new Booking(uuidv4(), 55, 12, new Payment(9876), false, "2020-07-22T05:20", 1596345630813, 24, 15, true, 3800, "booked"))
    bookings.push(new Booking(uuidv4(), 84, 12, new Payment(9876), true, "2020-07-20T05:20", 1596345630813, 24, 15, false, 3800, "booked"))
    bookings.push(new Booking(uuidv4(), 76, 12, new Payment(9876), false, "2020-07-25T05:20", 1596345630813, 24, 15, true, 2350, "booked"))
    bookings.push(new Booking(uuidv4(), 89, 12, new Payment(9876), true, "2020-07-25T05:20", 1596345630813, 24, 15, true, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 95, 12, new Payment(9876), true, "2020-07-25T05:20", 1596345630813, 24, 15, true, 1350, "booked"))
    bookings.push(new Booking(uuidv4(), 87, 12, new Payment(9876), false, "2020-07-17T05:20", 1596345630813, 24, 15, false, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 63, 12, new Payment(9876), true, "2020-07-18T05:20", 1596345630813, 24, 15, true, 1350, "booked"))
    bookings.push(new Booking(uuidv4(), 144, 12, new Payment(9876), false, "2020-07-13T05:20", 1596345630813, 24, 15, false, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 142, 12, new Payment(9876), true, "2020-07-13T05:20", 1596345630813, 24, 15, true, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 157, 12, new Payment(9876), false, "2020-07-13T05:20", 1596345630813, 24, 15, true, 1200, "booked"))
    bookings.push(new Booking(uuidv4(), 196, 12, new Payment(9876), true, "2020-07-27T05:20", 1596345630813, 24, 15, false, 3800, "booked"))
    bookings.push(new Booking(uuidv4(), 170, 12, new Payment(9876), true, "2020-07-28T05:20", 1596345630813, 24, 15, true, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 178, 12, new Payment(9876), false, "2020-07-29T05:20", 1596345630813, 24, 15, false, 1350, "booked"))
    bookings.push(new Booking(uuidv4(), 172, 12, new Payment(9876), false, "2020-07-30T05:20", 1596345630813, 24, 15, true, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 114, 12, new Payment(9876), false, "2020-07-31T05:20", 1596345630813, 24, 15, false, 750, "booked"))
    bookings.push(new Booking(uuidv4(), 121, 12, new Payment(9876), false, "2020-07-25T05:20", 1596345630813, 24, 15, true, 3800, "booked"))
    bookings.push(new Booking(uuidv4(), 61, 12, new Payment(9876), true, "2020-08-01T05:20", 1596345630813, 24, 15, false, 1250, "booked"))
    bookings.push(new Booking(uuidv4(), 151, 12, new Payment(9876), false, "2020-08-02T05:20", 1596345630813, 24, 15, true, 3250, "booked"))
    bookings.push(new Booking(uuidv4(), 158, 12, new Payment(9876), true, "2020-08-03T05:20", 1596345630813, 24, 15, false, 1250, "booked"))

    return bookings
}


// creating car data for mock DB
// ----------------------------------------------------
function renderDB(){
    var sedans = extractSedans()
    var hatchbacks = extractHatchbacks()
    var SUVs = extractSUVs()
    var minivans = extractMinivans()
    var sportCars = extractSportCars()
    var all_cars = [...sedans, ...hatchbacks, ...SUVs, ...minivans, ...sportCars]
    return all_cars
}

function extractSedans(){
    var sedans = []
    sedans.push(new Car('Hyundai', 'Verna', fuel[0], 3, 45, 4, carType[0], 4500, "https://imgd.aeplcdn.com/664x374/n/cw/ec/41197/hyundai-verna-right-front-three-quarter7.jpeg"))
    sedans.push(new Car('Honda', 'Accord', fuel[0], 3, 60, 3, carType[0], 3750, "https://cars.usnews.com/static/images/Auto/izmo/i159163880/2020_honda_accord_angularfront.jpg"))
    sedans.push(new Car('Skoda', 'Rapid', fuel[0], 3, 55, 4, carType[0], 3750, "https://media.zigcdn.com/media/model/2020/May/new_600x400.jpg"))
    sedans.push(new Car('Chevrolet', 'Malibu', fuel[1], 4, 60, 4, carType[0], 4760, "https://cars.usnews.com/static/images/Auto/izmo/i158791983/2020_chevrolet_malibu_angularfront.jpg"))
    sedans.push(new Car('Kia', 'Optima', fuel[1], 3, 70, 4, carType[0], 4100, "https://cars.usnews.com/static/images/Auto/izmo/i159163912/2020_kia_optima_angularfront.jpg"))
    sedans.push(new Car('Mercedes-Benz', 'C300', fuel[1], 3, 66, 4, carType[0], 5750, "https://cars.usnews.com/static/images/Auto/izmo/i158816106/2020_mercedes_benz_c_class_angularfront.jpg"))
    return sedans
}

function extractHatchbacks(){
    var hatchbacks = []
    hatchbacks.push(new Car('Ford', 'Fiesta ST', fuel[0], 3, 43, 3, carType[2], 3780, "https://images.hgmsites.net/hug/2019-ford-fiesta-se-hatch-angular-front-exterior-view_100674447_h.jpg"))
    hatchbacks.push(new Car('BMW', 'i3S', fuel[1], 4, 56, 4, carType[2], 6500, "https://cars.usnews.com/static/images/Auto/izmo/i6511875/2017_bmw_i3_angularfront.jpg"))
    hatchbacks.push(new Car('Volkswagen', 'Golf GTI', fuel[1], 3, 62, 4, carType[2], 5000, "https://images.dealer.com/ddc/vehicles/2020/Volkswagen/Golf%20GTI/Hatchback/trim_20T_SE_493086/color/Pure%20White-0Q0Q-233%2C234%2C229-640-en_US.jpg"))
    hatchbacks.push(new Car('Maruti Suzuki', 'Baleno', fuel[0], 3, 45, 4, carType[2], 3450, "https://images.carandbike.com/car-images/colors/maruti-suzuki/baleno/maruti-suzuki-baleno-metalic-premium-silver.webp?v=1567509589"))
    hatchbacks.push(new Car('Tata', 'Altos', fuel[0], 3, 60, 4, carType[2], 2450, "https://images.carandbike.com/car-images/colors/tata/altroz/tata-altroz-avenue-white.webp?v=1579669942"))
    hatchbacks.push(new Car('Maruti Suzuki', 'Swift', fuel[0], 2, 42, 4, carType[2], 2300, "https://imgd.aeplcdn.com/664x374/cw/ec/26742/Maruti-Suzuki-New-Swift-Exterior-117654.jpg"))
    return hatchbacks
}

function extractSUVs(){
    var SUVs = []
    SUVs.push(new Car('Maruti Suzuki', 'Vistara Brezza', fuel[0], 3, 56, 4, carType[1], 2890, "https://imgd.aeplcdn.com/664x374/cw/ec/26742/Maruti-Suzuki-New-Swift-Exterior-117654.jpg?wm=0&q=85"))
    SUVs.push(new Car('Mazda', 'CX-3', fuel[1], 3, 67, 4, carType[1], 4560, "https://cars.usnews.com/static/images/Auto/izmo/i125534603/2019_mazda_cx_3_angularfront.jpg"))
    SUVs.push(new Car('Hyundai', 'Creta', fuel[1], 3, 51, 4, carType[1], 3460, "https://imgd.aeplcdn.com/664x374/n/cw/ec/41564/hyundai-creta-right-front-three-quarter9.jpeg"))
    SUVs.push(new Car('Mahinda', 'XUV300', fuel[0], 4, 67, 4, carType[1], 4450, "https://stimg.cardekho.com/images/car-images/930x620/Mahindra/Mahindra-XUV300/6795/1550133922118/221_red_af0f1f.jpg"))
    SUVs.push(new Car('Ford', 'Escape', fuel[1], 4, 56, 4, carType[1], 6540, "https://cars.usnews.com/static/images/Auto/izmo/i100899633/2019_ford_escape_angularfront.jpg"))
    SUVs.push(new Car('Hyundai', 'Tucson', fuel[0], 4, 52, 4, carType[1], 5560, "https://images.financialexpress.com/2017/01/Hyundai-Tucson-main-480.jpg"))
    return SUVs
}

function extractMinivans(){
    var minivans = []
    minivans.push(new Car('Honda', 'Odyssey', fuel[1], 3, 76, 6, carType[3], 5600, "https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/640x400/quality/80/https://s.aolcdn.com/commerce/autodata/images/USC90HOV011A021001.jpg"))
    minivans.push(new Car('Toyota', 'Sienna', fuel[1], 4, 87, 6, carType[3], 7600, "https://www.motortrend.com/uploads/sites/10/2019/05/2020-toyota-sienna-limited-fwd-minivan-angular-front.png?fit=around%7C875:492.1875"))
    minivans.push(new Car('Nissan', 'Quest', fuel[1], 4, 77, 6, carType[3], 7300, "https://www.cstatic-images.com/car-pictures/xl/usc70niv091b021001.png"))
    minivans.push(new Car('Maruti Suzuki', 'Eeco', fuel[1], 4, 73, 6, carType[3], 7900, "https://www.carvengers.in/media/imgData/maruti-eeco/Colors/maruti-eeco-mettalic-grey.jpg"))
    minivans.push(new Car('Chrysler', 'Pacifica', fuel[1], 4, 83, 6, carType[3], 8100, "https://www.cstatic-images.com/car-pictures/xl/USC70CRV091A021001.png"))
    return minivans
}

function extractSportCars(){
    var superCars = []
    superCars.push(new Car('BMW', 'Z4', fuel[1], 5, 57, 2, carType[4], 9890, "https://images.carandbike.com/car-images/large/bmw/z4/bmw-z4.webp?v=29"))
    superCars.push(new Car('Subaru', 'BRZ', fuel[1], 5, 59, 2, carType[4], 9290, "https://www.subaru.com/content/dam/subaru/vehicles/2020/BRZ/vsp/landing-page/compare-models/13783_024_M6Y.png"))
    superCars.push(new Car('Mazda', 'MX-5 Miata', fuel[1], 5, 62, 2, carType[4], 10160, "https://i.pcmag.com/imagery/reviews/036NmLXpIvRSRGWCQQE8tTZ-5.fit_scale.size_2698x1517.v_1569480071.jpg"))
    superCars.push(new Car('Nissan', '370Z', fuel[1], 5, 47, 2, carType[4], 11290, "https://stimg.cardekho.com/images/carexteriorimages/630x420/Nissan/Nissan-370Z/741/front-left-side-47.jpg"))
    superCars.push(new Car('Chevrolet', 'Corvette', fuel[1], 5, 42, 2, carType[4], 12390, "https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/640x400/quality/80/https://s.aolcdn.com/commerce/autodata/images/USD00CHC061C021001.jpg"))
    return superCars
}



// helper functions
//--------------------------------------------------------------------------------------------------------------------------------- 
export function checkCarsinStorage(){        
    var cars = localStorage.getItem('cars')
    if(cars === null || cars === undefined){
        return null
    }
    return JSON.parse(cars)
}

export function checkBookingsinStorage(){        
    var bookings = localStorage.getItem('bookings')
    if(bookings === null || bookings === undefined){
        return null
    }
    return JSON.parse(bookings)
}

export function checkUsersinStorage(){   
    var users = localStorage.getItem('users')
    if(users === null || users === undefined){
        return null
    }
    return JSON.parse(users)
}

export function random(max, min){
    max = Math.abs(max)
    min = Math.abs(min)
    var rand = Math.round(Math.random() * Math.abs(max-min))
    return rand + min + 1
}

export function addCommatoNum(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function logout(){
    localStorage.removeItem('login')
    location.href = 'login.html'
}



// input validation helpers
export function rightInput(obj){
    obj.classList.remove("valid-check")
    obj.parentElement
        .nextElementSibling.querySelector('small')
        .classList.add('display-none')
}

export function wrongInput(obj){
    obj.classList.add("valid-check")
    obj.parentElement
        .nextElementSibling.querySelector('small')
        .classList.remove('display-none')
}


// add attribute helper
export function setAttributes(attributes){
    for(let key in attributes){
        this.setAttribute(key, attributes[key])
    }
}



// on-load events relate to the index page
//---------------------------------------------------------------------------
window.addEventListener('load', addEvents)

function addEvents(){
    let logout = document.getElementById('logout-user')
    if(logout !== null) logout.addEventListener('click', logout)

    // let loginList = document.querySelector('.after-login-list')
    // if(logout){
    //     loginList.classList.remove('display-none')
    // }
    // else{
    //     loginList.classList.add('display-none')
    // }
}