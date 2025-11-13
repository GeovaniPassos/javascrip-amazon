
const addedMessageTimeouts = {};

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [];
}

function saveToStorege() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addCart(productId){
    let matchingItem;

    const selectionQuantity = Number(document
            .querySelector(`.js-quantity-selector-${ productId }`).value);

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += selectionQuantity;
    } else {
        cart.push({
        productId: productId,
        quantity: selectionQuantity,
        deliveryOptionId: '1'
        });

        saveToStorege();
    }
}

export function updateCardHeader() {
    let totalItensCart = 0;
    if (cart){
        totalItensCart = cart.reduce((sum, product) => sum + product.quantity, 0);
        totalItensCart != 0 ?  totalItensCart : totalItensCart = '';
        document.querySelector('.js-cart-quantity').innerHTML = totalItensCart;
    }
}

export function updateCartQuantity(productId){
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });

    updateCardHeader(cartQuantity);

    const addedMessage = document
        .querySelector(`.js-added-to-cart-${productId}`);

    addedMessage.classList.add('added-to-cart-visible');

    const previousTimeoutId = addedMessageTimeouts[productId];
    
    if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    addedMessageTimeouts[productId] = timeoutId;

    saveToStorege();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorege();
}

export function updateQuantity(productId, newQuantity){
    cart.forEach((item) => {
        if (item.productId === productId) {
            
            item.quantity += newQuantity;
            saveToStorege();
        }
    });
}

function updateDeliveryOption(productId, deliveryOptionId) {
    
}