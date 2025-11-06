const addedMessageTimeouts = {};

export let cart = JSON.parse(localStorage.getItem('cart'));

/*
if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
    }];
}*/


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
        quantity: selectionQuantity
        });

        saveToStorege();
    }
}

function updateCardHeader() {
    let totalItensCart = 0;
    if (cart){
        totalItensCart = cart.reduce((sum, product) => sum + product.quantity, 0);
    }

   document.querySelector('.js-cart-quantity').innerHTML = totalItensCart;
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

    // Check if there's a previous timeout for this
    // product. If there is, we should stop it.

    //debugger
    const previousTimeoutId = addedMessageTimeouts[productId];
    
    if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    // Save the timeoutId for this product
    // so we can stop it later if we need to.

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