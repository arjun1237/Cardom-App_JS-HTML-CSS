import {rightInput, wrongInput, roles} from './common.js'
import {makeModal, popUpModal} from './modal.js'

window.addEventListener('load', addEvents)

function LoggedInUser(id, name, role, email, license, phone){
    this.id = id
    this.name = name
    this.role = role
    this.email = email
    this.license = license
    this.phone = phone
}

const emailObj = document.getElementById('inputLoginEmail')
const passObj = document.getElementById('inputLoginPassword')

function addEvents(){
    addBlurToInput()
    let mainCont = document.querySelector('.main-content')
    makeModal(mainCont)
    document.getElementById('loginSignIn').addEventListener('click', submit)
}

function submit(){
    event.preventDefault()
    if(! (checkInput(emailObj, emailObj.value) && checkInput(passObj, passObj.value))  ){
        checkInput(emailObj, emailObj.value)
        checkInput(passObj, passObj.value)
        let warning = 'Looks like you have not filled the credentials. Please fill it up to login!'
        popUpModal('warning', 'Understood', warning, 'Error..!')
    }
    else{
        let user = filterUser(localStorage.getItem('users'))
        if(user.length !== 0){
            user = user[0]
            let logInUser =  new LoggedInUser(user.id, user.name, 
                            user.role, user.email, user.license, user.phone)
            localStorage.setItem('login', JSON.stringify(logInUser))
            if(user.role === roles[0] || user.role === roles[1]){
                location.href = 'admin.html'
            }
            else{
                location.href = 'customer.html'
            }
        }
        else{
            let warning = 'Your credentials did not match. Please try again!'
            popUpModal('info', 'OK', warning, 'Error..!')
        }
    }
}

function filterUser(users){
    if(users === undefined || users === null){
        return false
    }
    else{
        users = JSON.parse(users)
        return users.filter(x => x.email === emailObj.value && x.password === passObj.value)
    }
}

function addBlurToInput(){
    addBlurEvent(checkInput, emailObj)
    addBlurEvent(checkInput, passObj)
}

function checkInput(obj, val){
    if(val.trim().length > 0){
        rightInput(obj)
        return true
    }
    wrongInput(obj)
    return false
}

function addBlurEvent(callback, obj){
    obj.addEventListener('blur', function(){
        callback(obj, obj.value)
    })
}