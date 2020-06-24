{/* <p data-toggle="modal" data-target="#staticBackdrop" id="modalHelper" hidden>Modal Helper</p>
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="staticBackdropLabel">Error..!</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p id="regAlertInfo"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">Understood</button>
            </div>  
        </div>
    </div>
</div> */}

export function makeModal(parentObj){
    let p = document.createElement('p')
    p.setAttribute('data-toggle', 'modal')
    p.setAttribute('data-target', '#staticBackdrop')
    p.id = 'modalHelper'
    p.hidden = true

    let modalFade = document.createElement('div')
    modalFade.classList.add('modal', 'fade')
    modalFade.id = 'staticBackdrop'
    let modalFadeAttrs = {
        'data-backdrop' : 'static',
        'data-keyboard' : 'false',
        'tabindex' : '-1',
        'role' : 'dialog',
        'aria-labelledby' : 'staticBackdropLabel',
        'aria-hidden' : 'true'
    }
    setAttributes.call(modalFade, modalFadeAttrs)

    let modalDialog = document.createElement('div')
    modalDialog.classList.add('modal-dialog')

    let modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')

    let modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')

    let h3 = document.createElement('h3')
    h3.classList.add('modal-title')
    h3.id = 'staticBackdropLabel'

    let btnClose = document.createElement('button')
    let btnCloseAttrs = {
        'type' : 'button',
        'class' : 'close',
        'data-dismiss' : 'modal',
        'aria-label' : 'Close'
    }
    setAttributes.call(btnClose, btnCloseAttrs)

    let span = document.createElement('span')
    span.setAttribute('aria-hidden', 'true')
    span.innerHTML = '&times;'

    btnClose.append(span)
    modalHeader.append(h3, btnClose)
    
    let modalBody = document.createElement('div')
    modalBody.classList.add('modal-body')

    let pTextMain = document.createElement('p')
    pTextMain.id = 'text-modal'
    modalBody.append(pTextMain)

    let footer = document.createElement('div')
    footer.classList.add('modal-footer')

    let btnMain = document.createElement('button')
    btnMain.id = 'btn-modal'
    let btnMainAttrs = {
        'type' : 'button',
        'data-dismiss' : 'modal'
    }
    setAttributes.call(btnMain, btnMainAttrs)

    footer.append(btnMain)
    modalContent.append(modalHeader, modalBody, footer)
    modalDialog.append(modalContent)
    modalFade.append(modalDialog)
    parentObj.append(p, modalFade)
}

export function popUpModal(btnColor, btnWord, text, heading){
    let btn = document.getElementById('btn-modal')
    let textPart = document.getElementById('text-modal')
    let headingText = document.getElementById('staticBackdropLabel')

    btn.innerHTML = btnWord
    let btnClasses = btn.classList
    btn.classList.remove(...btnClasses)
    btn.classList.add('btn', 'btn-'+btnColor)

    textPart.innerHTML = text
    headingText.innerHTML = heading
    document.getElementById('modalHelper').click()
}

function setAttributes(attributes){
    for(let key in attributes){
        this.setAttribute(key, attributes[key])
    }
}