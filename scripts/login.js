window.addEventListener('load', addEvents)

const emailObj = document.getElementById('inputLoginEmail')
const passObj = document.getElementById('inputLoginPassword')

function addEvents(){
    add
}

function checkEmail(email){
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/  // attribution: https://www.w3resource.com/javascript/form/email-validation.php
    if(reg.test(email) && email.trim().length !== 0){
        rightInput(emailObj)
        return true
    }
    wrongInput(emailObj)
    return false
}

function addFocusOutEvent(callback, obj){
    obj.addEventListener('blur', function(){
        callback(obj.value)
    })
}