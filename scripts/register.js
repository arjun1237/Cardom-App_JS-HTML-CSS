import * as common from './common.js'

window.addEventListener('load', addEvents)

function addEvents(){
    addBlurEventToInputs()
    document.getElementById('sign-up').addEventListener('click', register)
}

function register(){
    event.preventDefault()
    checkAllInput()
}

// some important variables to be used often
const nameObj = document.getElementById('inputName')
const emailObj = document.getElementById('inputEmail')
const passObj = document.getElementById('inputPassword')
const licenseObj = document.getElementById('inputLicense')
const phoneObj = document.getElementById('inputPhone')
const ageObj = document.getElementById('inputAge')


function addBlurEventToInputs(){
    let objFunc = [
        [nameObj, checkName],
        [emailObj, checkEmail],
        [licenseObj, checkLicense],
        [passObj, checkPassword],
        [phoneObj, checkPhone],
        [ageObj, checkAge]
    ]
    for(let i=0; i<objFunc.length; i++){
        addBlurEvent(objFunc[i][1], objFunc[i][0])
    }
}

function addBlurEvent(callback, obj){
    obj.addEventListener('blur', function(){
        callback(obj.value)
    })
}

function checkAllInput(){
    console.log(checkName(nameObj.value), checkEmail(emailObj.value), checkPassword(passObj.value),
                 checkLicense(licenseObj.value), checkPhone(phoneObj.value), checkAge(ageObj.value))
    if(checkName(nameObj.value) 
        && checkEmail(emailObj.value)
        && checkPassword(passObj.value)
        && checkLicense(licenseObj.value)
        && checkPhone(phoneObj.value)
        && checkAge(ageObj.value)){
            if(emailDuplicate(emailObj.value)){
                document.getElementById('regAlertInfo').textContent = "Looks like the email provided has already been registered!"
                emailObj.value = ''
                document.getElementById('modalHelper').click()
                emailObj.classList.add("valid-check")
            }
            else{
                common.userObj.addUser(new common.User(null,   // userID will be updated by addUser
                                        nameObj.value.trim(),
                                        Number(ageObj.value),
                                        emailObj.value.trim(),
                                        phoneObj.value.trim(),
                                        licenseObj.value.trim(),
                                        passObj.value,
                                        common.roles[2]))  
                location.href = 'login.html'
            }
    }
    else{
        document.getElementById('regAlertInfo').textContent = "Please provide valid informations to register."
        document.getElementById('modalHelper').click()
    }
}

function emailDuplicate(email){
    email = email.trim()
    let user = common.checkUsersinStorage()
    if(user === null){
        user = []
    }
    user = user.filter(user => user.email === email)
    if(user.length > 0){
        return true
    }
    common.rightInput(emailObj)
    return false
}

function checkName(name){
    if(name.trim().length > 0){
        common.rightInput(nameObj)
        return true
    }
    common.wrongInput(nameObj)
    return false
}

function checkEmail(email){
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/  // attribution: https://www.w3resource.com/javascript/form/email-validation.php
    if(reg.test(email) && email.trim().length !== 0){
        common.rightInput(emailObj)
        return true
    }
    common.wrongInput(emailObj)
    return false
}

function checkPassword(pass){
    if(pass.length >= 10){
        common.rightInput(passObj)
        return true
    }
    common.wrongInput(passObj)
    return false
}

function checkLicense(license){
    if(/^[a-zA-Z0-9]*$/.test(license) && license.trim().length !== 0){
        common.rightInput(licenseObj)
        return true
    }
    common.wrongInput(licenseObj)
    return false
}

function checkAge(age){
    if(Number(age) >= 18){
        common.rightInput(ageObj)
        return true
    }
    common.wrongInput(ageObj)
    return false
}

function checkPhone(phone){
    if(phone.trim().length === 10){
        common.rightInput(phoneObj)
        return true
    }
    common.wrongInput(phoneObj)
    return false
}