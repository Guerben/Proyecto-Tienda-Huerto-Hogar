
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartUI();
        this.bindEvents();
    }

    // Cargar carrito desde localStorage
    loadCart() {
        const savedCart = localStorage.getItem('huertohogar_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Guardar carrito en localStorage
    saveCart() {
        localStorage.setItem('huertohogar_cart', JSON.stringify(this.items));
    }

    // Agregar producto al carrito
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showAddToCartMessage(product.name);
    }

    // Remover producto del carrito
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    // Actualizar cantidad de un producto
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    // Limpiar carrito
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }

    // Calcular total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Calcular cantidad total de items
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Actualizar interfaz del carrito
    updateCartUI() {
        this.updateCartCounter();
        this.updateCartModal();
    }

    // Actualizar contador del carrito en navbar
    updateCartCounter() {
        const cartCounter = document.getElementById('cart-counter');
        const totalItems = this.getTotalItems();
        
        if (cartCounter) {
            cartCounter.textContent = totalItems;
            cartCounter.style.display = totalItems > 0 ? 'inline' : 'none';
        }
    }

    // Actualizar modal del carrito
    updateCartModal() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const checkoutButton = document.getElementById('checkout-btn');

        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '';
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            if (checkoutButton) checkoutButton.style.display = 'none';
            if (cartTotal) cartTotal.textContent = '$0';
            return;
        }

        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        if (checkoutButton) checkoutButton.style.display = 'block';

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item d-flex align-items-center mb-3 p-3 border rounded">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3" style="width: 60px; height: 60px; object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.name}</h6>
                    <div class="d-flex align-items-center">
                        <span class="text-primary fw-bold">$${item.price.toLocaleString()}</span>
                        ${item.originalPrice ? `<span class="text-muted text-decoration-line-through ms-2">$${item.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="cart.removeItem('${item.id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        if (cartTotal) {
            cartTotal.textContent = `$${this.getTotal().toLocaleString()}`;
        }
    }

    // Mostrar mensaje de producto agregado
    showAddToCartMessage(productName) {
        // Crear toast notification
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed top-0 end-0 m-3';
        toast.style.zIndex = '9999';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fa fa-check-circle me-2"></i>
                    ${productName} agregado al carrito
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        // Remover el toast después de que se oculte
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    // Vincular eventos
    bindEvents() {
        // Eventos para botones "Añadir al carrito"
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                e.preventDefault();
                const productElement = e.target.closest('.product-item');
                if (productElement) {
                    this.addProductFromElement(productElement);
                }
            }
        });

        // Evento para abrir modal del carrito
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-icon')) {
                e.preventDefault();
                this.openCartModal();
            }
        });

        // Evento para limpiar carrito
        document.addEventListener('click', (e) => {
            if (e.target.id === 'clear-cart-btn') {
                if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                    this.clearCart();
                }
            }
        });

        // Evento para proceder al checkout
        document.addEventListener('click', (e) => {
            if (e.target.id === 'checkout-btn') {
                this.proceedToCheckout();
            }
        });
    }

    // Agregar producto desde elemento HTML
    addProductFromElement(productElement) {
        const nameElement = productElement.querySelector('a.d-block.h5');
        const priceElement = productElement.querySelector('.text-primary');
        const originalPriceElement = productElement.querySelector('.text-decoration-line-through');
        const imageElement = productElement.querySelector('img');

        if (!nameElement || !priceElement) return;

        const name = nameElement.textContent.trim();
        const priceText = priceElement.textContent.trim();
        const originalPriceText = originalPriceElement ? originalPriceElement.textContent.trim() : null;
        const image = imageElement ? imageElement.src : '';

        // Extraer precio numérico
        const price = this.extractPrice(priceText);
        const originalPrice = originalPriceText ? this.extractPrice(originalPriceText) : null;

        if (price === null) return;

        const product = {
            id: this.generateProductId(name),
            name: name,
            price: price,
            originalPrice: originalPrice,
            image: image
        };

        this.addItem(product);
    }

    // Extraer precio numérico del texto
    extractPrice(priceText) {
        const match = priceText.match(/[\d.,]+/);
        if (match) {
            return parseFloat(match[0].replace(/[.,]/g, '').replace(/(\d+)(\d{3})$/, '$1.$2'));
        }
        return null;
    }

    // Generar ID único para producto
    generateProductId(name) {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    // Abrir modal del carrito
    openCartModal() {
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    }

    // Proceder al checkout
    proceedToCheckout() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        // Redirigir a la página de checkout
        window.location.href = 'checkout.html';
    }
}

// Inicializar carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.cart = new ShoppingCart();
});

// Función global para agregar productos (para compatibilidad)
function addToCart(productData) {
    if (window.cart) {
        window.cart.addItem(productData);
    }
}
