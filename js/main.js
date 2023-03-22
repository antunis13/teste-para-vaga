
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
function popularCampos(response){
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
                        <label class="productName">${name}</label>
                        <p class="productDescription">${desc}</p>
                        <span class="oldPrice">De: R$${oldPrice}</span>
                        <h3 class="price">Por: R$${price}</h3>
                        <span class="installments">ou ${instalCount}x de R$${instalValue}</span>
                        <button class="buyBtn"> Comprar</button>
                    </div>
                ` 
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
        


