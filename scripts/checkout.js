import { cart, removeFromCart, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}
            js-cart-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary 
                            js-update-link" data-product-id="${matchingProduct.id}">
                        Update
                        </span>
                        <input class="quantity-input js-input-quantity-id-${matchingProduct.id}"
                            type="numeric" inputmode="numeric"
                            min="1" max="999" required>
                        <span class="save-quantity-link js-save-quantity-link link-primary"
                            data-product-id="${matchingProduct.id}">
                        Save</span>
                        <span class="delete-quantity-link link-primary 
                            js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                </div>
            </div>
        </div>
    `;

});

function deliveryOptionsHTML() {
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = '';

        `
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${todayString}
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
            </div>
        </div>
        `
    });
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            itensCard();
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`);
                container.remove();
                itensCard();
            }); 

            itensCard();
    });

document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const marchingClass = document.querySelector(`.js-cart-item-container-${productId}`);
            const quantityInput = Number(document.querySelector(`.js-input-quantity-id-${productId}`).value);
            
            if (quantityInput > 0 && quantityInput < 1000) {
                updateQuantity(productId, quantityInput);
            } else {
                window.alert("Valor inválido!");
            }
            
            cart.forEach((item) => {
                if (item.productId === productId) {
                    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = item.quantity;
                }
            });
            
            itensCard();

            marchingClass.classList.remove('is-editing-quantity');
        });
    });

document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const matchingProductClass = document.querySelector(`.js-cart-item-container-${productId}`);
            matchingProductClass.classList.add('is-editing-quantity');
        });
    });

document.querySelector('.quantity-input')
        .addEventListener('keydown', function(event) {
            if (event.which == 13) {
                document.querySelector('.js-save-quantity-link').click();
            }
        });

function itensCard() {
    const quantity = cart.reduce((sum, product) => sum + product.quantity, 0);
    document.querySelector('.js-quantity-itens').innerHTML = `${quantity} itens`;
    document.querySelector('.js-quantity-itens-row').innerHTML = `items (${quantity}):`;
    
}