window.addEventListener('load', addEvents)

locations = ['Bangalore', 'Hyderabad', 'Mumbai', 'Poona', 'Chennai', 'Delhi', 'Kolkata']
roles = ['admin', 'super-admin', 'customer']
carType = ['Sedan', 'SUV', 'Hatchback', 'Minivan', 'Prestige']
status = ['booked', 'onroad', 'returned-need-confirm', 'returned']
fuel = ['diesel', 'petrol']

function Car(name, model, fuel, fuelCapacity, power, seater, type, deposit){
    this.name = name
    this.model = model
    this.fuel = fuel
    this.fuelCapacity = fuelCapacity
    this.power = power
    this.seater = seater
    this.type = type
    this.deposit = deposit
}

function addEvents(){
    renderDB()
}


function renderDB(){
    var sedans = extractSedans()
    var hatchbacks = extractHatchbacks()
    var SUVs = extractSUVs()
    var minivans = extractMinivans()
    var sportCars = extractSportCars()
}

function extractSedans(){
    var sedans = []
    sedans.push(new Car('Hyundai', 'Verna', fuel[0], 3, 45, 4, carType[0], 4500))
    sedans.push(new Car('Honda', 'Accord', fuel[0], 3, 60, 3, carType[0], 3750))
    sedans.push(new Car('Skoda', 'Rapid', fuel[0], 3, 55, 4, carType[0], 3750))
    sedans.push(new Car('Chevrolet', 'Malibu', fuel[1], 4, 60, 4, carType[0], 4760))
    sedans.push(new Car('Kia', 'Optima', fuel[1], 3, 70, 4, carType[0], 4100))
    sedans.push(new Car('Mercedes-Benz', 'C300', fuel[1], 3, 66, 4, carType[0], 5750))
    return sedans
}

function extractHatchbacks(){
    var hatchbacks = []
    hatchbacks.push(new Car('Ford', 'Fiesta ST', fuel[0], 3, carType[1]))
    hatchbacks.push(new Car('BMW', 'i3S', fuel[1], 4, carType[1]))
    hatchbacks.push(new Car('Volkswagen', 'Golf GTI', fuel[1], 3, carType[1]))
    hatchbacks.push(new Car('Maruti Suzuki', 'Baleno', fuel[0], 3, carType[1]))
    hatchbacks.push(new Car('Tata', 'Altos', fuel[0], 3, carType[1]))
    hatchbacks.push(new Car('Maruti Suzuki', 'Swift', fuel[0], 3, carType[1]))
    return hatchbacks
}

function extractSUVs(){
    var SUVs = []
    SUVs.push(new Car('Maruti Suzuki', 'Vistara Brezza'))
    SUVs.push(new Car('Mazda', 'CX-3'))
    SUVs.push(new Car('Hyundai', 'Creta'))
    SUVs.push(new Car('Mahinda', 'XUV300'))
    SUVs.push(new Car('Ford', 'Escape'))
    SUVs.push(new Car('Hyundai', 'Tucson'))
    return SUVs
}

function extractMinivans(){
    var minivans = []
    minivans.push(new Car('Honda', 'Odyssey'))
    minivans.push(new Car('Toyota', 'Sienna'))

}