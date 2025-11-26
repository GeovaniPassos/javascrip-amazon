import { cart } from '../../data/cart.js';

export function renderCheckoutHeader() {
    
    const quantity = cart.reduce((sum, product) => sum + product.quantity, 0);

    let varItem = 'item';
    if (quantity > 1) {
        varItem = 'itens';
    }

    const headerHTML = `
        Checkout (<a class="return-to-home-link"
            href="amazon.html">${quantity} ${varItem}</a>)`;

    return document.querySelector('.js-header-quantity-itens').innerHTML = headerHTML;
}