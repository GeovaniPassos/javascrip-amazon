function Cart(localStorageKey) {
    const addedMessageTimeouts = {};
    const cart = {
    cartItems: undefined,
    
    loadFromStorage() {
    
    this.cartItems = JSON.parse(localStorage.getItem('localStorageKey')) ;

    if (!this.cartItems) {
            this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionsId: '1'
            }];
        }
    },

    saveToStorege() {
        localStorage.setItem('localStorageKey', JSON.stringify(this.cartItems));
    },
 
    addToCart(productId){
        let matchingItem;

        const selectionQuantity = 1;
        //Number(document.querySelector(`.js-quantity-selector-${ productId }`).value);

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += selectionQuantity;
        } else {
            this.cartItems.push({
            productId: productId,
            quantity: selectionQuantity,
            deliveryOptionId: '1'
            });

            this.saveToStorege();
        }
    },

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.newCart = newCart;

        this.saveToStorege();
    },

    updateCartQuantity(productId){
        let cartQuantity = 0;

        this.cartItems.forEach((item) => {
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

        this.saveToStorege();
    },

    updateCardHeader() {
        let totalItensCart = 0;
        if (this.cartItems){
            totalItensCart = this.cartItems.reduce((sum, product) => sum + product.quantity, 0);
            totalItensCart != 0 ?  totalItensCart : totalItensCart = '';
            document.querySelector('.js-cart-quantity').innerHTML = totalItensCart;
        }
    },

    updateQuantity(productId, newQuantity){
        this.cartItems.forEach((item) => {
            if (item.productId === productId) {
                
                item.quantity += newQuantity;
                this.saveToStorege();
            }
        });
    },

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorege();
    }

    };

    return cart;
}

const cart = Cart('cart-opp');
const businessCart = Cart('cart-business');


cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);