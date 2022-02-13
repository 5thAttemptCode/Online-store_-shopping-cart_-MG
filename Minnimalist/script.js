/*__________Open/Close Menu__________*/ 
const toggle = document.getElementById('toggle');
const menu = document.getElementById('menu');
const ul = document.querySelector('ul')

document.onclick = function(e){
    if(e.target.id !== 'sidebar' && e.target.id !== 'toggle')
    {
        toggle.classList.remove('active')
        menu.classList.remove('active')
        ul.classList.remove('active')
    }
}

toggle.onclick = function(){
    toggle.classList.toggle('active')
    menu.classList.toggle('active')
    ul.classList.toggle('active')
}


/*__________Open/Close Cart__________*/ 
const cart = document.getElementById('cart');
const cartFull = document.getElementById('cart-full');
const close = document.getElementById('close')

close.onclick = function(){
    cartFull.classList.remove('active')
}

cart.onclick = function(){
    cartFull.classList.toggle('active')
}

/*__________Cart counter__________*/ 
var noti = document.querySelector('.fa-shopping-cart');
var button = document.getElementsByTagName('button')
for(var but of button){
    but.addEventListener('click', (e)=>{
        var add = Number(noti.getAttribute('data-count') || 0);
        noti.setAttribute('data-count', add +1);
        noti.classList.add('zero')
    })
}


/*__________SHOPPING CART FUNCTIONALITY__________*/ 
/*__________Make sure content is loaded__________*/ 
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

/*__________All ready also before page content is finished loading__________*/ 
function ready() {
    /*________Remove Button________*/
    var removeCartItemButton = document.getElementsByClassName("btn-danger")
    for (var i = 0; i < removeCartItemButton.length; i++){
        var button = removeCartItemButton[i]
        button.addEventListener('click', removeCartItem)
    }
    /*________Adjusting the quantity________*/
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    /*________Add Button________*/
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    /*________Purchase Button________*/
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


/*_______Function Purchase Button__________*/
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

/*_______Function for Remove________*/
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

/*________Function for Quanity________*/
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

/*________Function for Add (only adds the empty array________*/
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

/*________Function for Add (add content array)________*/
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title){
            alert("This item is already in our shopping cart")
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


/*__________updating total price_________*/ 
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0

    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElemnt = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElemnt.value 
        total = total + (price *quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
