//store variables
let moreButton = document.querySelector('#more')
let products = document.querySelector('.products-section')
let url= 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'
let name =''
let img = ''
let desc =''
let instalCount = ''
let instalValue = ''
let oldPrice =''
let price = ''

//form variables
const form = document.querySelector('#form')
const nameForm = document.querySelector('#name')
const email = document.querySelector('#email')
const cpf = document.querySelector('#cpf')
const submitBtn = document.querySelector('#submit')

//formShare variables
const formShare = document.querySelector('.formShare')
const friendName = document.querySelector('#friendName')
const emailShare = document.querySelector('#emailShare')

//api request
function popularCampos(response){
    if(window.matchMedia("(min-width: 421px)").matches){

        for(let i =0; i < response.products.length; i++){
            name = response.products[i].name
            img = response.products[i].image
            desc = response.products[i].description
            oldPrice = response.products[i].oldPrice
            price = response.products[i].price
            instalCount = response.products[i].installments.count
            instalValue = response.products[i].installments.value
            products.innerHTML += ` <div class="products">
                    <div class="divProductImg">
                    <img src="${img}">
                    </div>
                    <div>
                        <label class="productName">${name}</label>
                        <p class="productDescription">${desc}</p>
                        <span class="oldPrice">De: R$${oldPrice}</span>
                        <h3 class="price">Por: R$${price}</h3>
                        <span class="installments">ou ${instalCount}x de R$${instalValue}</span>
                        <button class="buyBtn"> Comprar</button>
                    </div>    
                </div>
            ` 
        }
    }
    else{
        for(let i =0; i < 4; i++){
            name = response.products[i].name
            img = response.products[i].image
            desc = response.products[i].description
            oldPrice = response.products[i].oldPrice
            price = response.products[i].price
            instalCount = response.products[i].installments.count
            instalValue = response.products[i].installments.value
            products.innerHTML += ` <div class="products">
                    <div class="divProductImg">
                    <img src="${img}">
                    </div>
                    <div>
                        <label class="productName">${name}</label>
                        <p class="productDescription">${desc}</p>
                        <span class="oldPrice">De: R$${oldPrice}</span>
                        <h3 class="price">Por: R$${price}</h3>
                        <span class="installments">ou ${instalCount}x de R$${instalValue}</span>
                        <button class="buyBtn"> Comprar</button>
                    </div>    
                </div>
            ` 
        }
    } 
  
    
  
}  

function error(){
    alert('Erro')
}
function query(){
    fetch(url)
    .then(response => response.json())
    .then(response => {
        popularCampos(response)
            let dados = response.nextPage
            url = `https://${dados}`
    })
    .catch(error)
}
query()
moreButton.addEventListener('click', e =>{
    e.preventDefault()

    query()
})

//validating form
form.addEventListener('submit', e =>{
    e.preventDefault()
    checkInputs()
    checkRadios()
})
function errorValidation(input, message){
    const formControl = input.parentElement;
    let span = formControl.querySelector('span')
    span.innerText = message
    span.classList.add('errorSpan')
    input.classList.remove('succes')
    input.classList.add('error')
}
function succesValidation(input){
    const formControl = input.parentElement;
    let span = formControl.querySelector('span')
    span.innerText = ''
    span.classList.remove('errorSpan')
    input.classList.add('succes')
}
function checkInputs(){
    const nameFormValue = nameForm.value.trim()
    const emailValue = email.value.trim()   
    const cpfValue = cpf.value.trim()
    if(nameFormValue === '' || nameFormValue === null){
        errorValidation(nameForm, "Preencha este campo corretamente!")
    }else{
        succesValidation(nameForm)
    }
    if(emailValue.indexOf("@")== -1 || emailValue.indexOf(".")== -1 || emailValue === '' || emailValue === null){
        errorValidation(email, "Preencha com email válido!")
    }else{
        succesValidation(email)
    }
    if(cpfValue ===''|| cpfValue === null|| cpfValue.length < 11){
        errorValidation(cpf, "Preencha com cpf válido!")
    }else{
        succesValidation(cpf)
    }
}         
function checkRadios(){
    const radioMessage = document.querySelector('#radioMessage')
    const inputRadio = document.querySelectorAll('#inputRadio')
    for(let i =0; i < inputRadio.length; i++){
        if(inputRadio[i].checked == false){
            radioMessage.classList.add("errorRadio")
            radioMessage.innerText = "Selecione um sexo"
        } 
        if(inputRadio[0].checked == true || inputRadio[1].checked == true){
            radioMessage.classList.remove("errorRadio")
            radioMessage.innerText = ''
        }
    }
}

//validating share form
formShare.addEventListener('submit', e =>{
    e.preventDefault()
    checkInputsShare()
})
function checkInputsShare(){
    const friendNameValue = friendName.value.trim()
    const emailShareValue = emailShare.value.trim()   
    if(friendNameValue === '' || friendNameValue === null){
        errorValidation(friendName, "Preencha este campo corretamente!")
    }else{
        succesValidation(friendName)
    }
    if(emailShareValue.indexOf("@")== -1 || emailShareValue.indexOf(".")== -1 || emailShareValue === '' || emailShareValue === null){
        errorValidation(emailShare, "Preencha com email válido!")
    }else{
        succesValidation(emailShare)
    }
}  