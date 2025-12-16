
const addedMessageTimeouts = {};

const cart = {
    cartItens: undefined,
    
    loadFromStorage() {
    
    this.cartItens = JSON.parse(localStorage.getItem('cart-oop')) ;

    if (!this.cartItens) {
            this.cartItens = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionsId: '1'
            }];
        }
    },

    saveToStorege() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItens));
    },
 
    addToCart(productId){
        let matchingItem;

        const selectionQuantity = Number(document
                .querySelector(`.js-quantity-selector-${ productId }`).value);

        this.cartItens.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += selectionQuantity;
        } else {
            this.cartItens.push({
            productId: productId,
            quantity: selectionQuantity,
            deliveryOptionId: '1'
            });

            this.saveToStorege();
        }
    },

    removeFromCart(productId) {
        const newCart = [];

        this.cartItens.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.newCart = newCart;

        this.saveToStorege();
    },

    updateCartQuantity(productId){
        let cartQuantity = 0;

        this.cartItens.forEach((item) => {
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
        if (this.cartItens){
            totalItensCart = this.cartItens.reduce((sum, product) => sum + product.quantity, 0);
            totalItensCart != 0 ?  totalItensCart : totalItensCart = '';
            document.querySelector('.js-cart-quantity').innerHTML = totalItensCart;
        }
    },

    updateQuantity(productId, newQuantity){
        this.cartItens.forEach((item) => {
            if (item.productId === productId) {
                
                item.quantity += newQuantity;
                this.saveToStorege();
            }
        });
    },

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        
        this.cartItens.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorege();
    }

};

cart.loadFromStorage();

console.log(cart);