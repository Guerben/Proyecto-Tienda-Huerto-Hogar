// ===== PÁGINA DE DETALLES DEL PRODUCTO =====

class ProductDetail {
    constructor() {
        this.product = null;
        this.quantity = 1;
        this.init();
    }

    init() {
        this.loadProductFromURL();
        this.bindEvents();
        this.loadRelatedProducts();
    }

    // Cargar producto desde la URL
    loadProductFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            this.product = this.getProductById(productId);
            if (this.product) {
                this.displayProduct();
            } else {
                this.showProductNotFound();
            }
        } else {
            this.showProductNotFound();
        }
    }

    // Obtener producto por ID
    getProductById(id) {
        const products = this.getAllProducts();
        return products.find(product => product.id === id);
    }

    // Obtener todos los productos
    getAllProducts() {
        return [
            {
                id: 'tomates-cherry',
                name: 'Tomates Cherry',
                price: 3990,
                originalPrice: 5000,
                image: '/static/img/product-1.jpg',
                images: ['/static/img/product-1.jpg', '/static/img/product-1.jpg', '/static/img/product-1.jpg'],
                description: 'Deliciosos tomates cherry orgánicos, cultivados sin pesticidas químicos. Perfectos para ensaladas, snacks saludables o como ingrediente en tus recetas favoritas. Cada tomate está lleno de sabor y nutrientes naturales.',
                category: 'vegetales',
                stock: 50,
                rating: 4.8,
                reviews: 124
            },
            {
                id: 'pimientos-tricolores',
                name: 'Pimientos Tricolores',
                price: 1690,
                originalPrice: 2000,
                image: '/static/img/pimiento_tricolor.webp',
                images: ['/static/img/pimiento_tricolor.webp', '/static/img/pimiento_tricolor.webp', '/static/img/pimiento_tricolor.webp'],
                description: 'Pimientos frescos en tres colores vibrantes: rojo, amarillo y verde. Ideales para agregar color y sabor a tus platos. Cultivados orgánicamente para garantizar la máxima frescura y calidad.',
                category: 'vegetales',
                stock: 30,
                rating: 4.6,
                reviews: 89
            },
            {
                id: 'ajis',
                name: 'Ajíes',
                price: 5490,
                originalPrice: 6000,
                image: '/static/img/product-3.jpg',
                images: ['/static/img/product-3.jpg', '/static/img/product-3.jpg', '/static/img/product-3.jpg'],
                description: 'Ajíes frescos y picantes, perfectos para darle sabor a tus comidas. Cultivados con técnicas orgánicas que preservan su sabor natural y propiedades nutricionales.',
                category: 'vegetales',
                stock: 25,
                rating: 4.7,
                reviews: 67
            },
            {
                id: 'zanahorias',
                name: 'Zanahorias',
                price: 1190,
                originalPrice: 2000,
                image: '/static/img/zanahorias-1024x683.jpg',
                images: ['/static/img/zanahorias-1024x683.jpg', '/static/img/zanahorias-1024x683.jpg', '/static/img/zanahorias-1024x683.jpg'],
                description: 'Zanahorias crujientes y dulces, ricas en betacaroteno y vitaminas. Perfectas para comer crudas, cocidas o en jugos. Cultivadas orgánicamente para mantener su sabor natural.',
                category: 'vegetales',
                stock: 40,
                rating: 4.9,
                reviews: 156
            },
            {
                id: 'pinas-frescas',
                name: 'Piñas Frescas',
                price: 2490,
                originalPrice: 3600,
                image: '/static/img/product-2.jpg',
                images: ['/static/img/product-2.jpg', '/static/img/product-2.jpg', '/static/img/product-2.jpg'],
                description: 'Piñas tropicales frescas y jugosas, llenas de sabor dulce y natural. Perfectas para postres, batidos o comer directamente. Cultivadas sin químicos para preservar su sabor auténtico.',
                category: 'frutas',
                stock: 20,
                rating: 4.8,
                reviews: 98
            },
            {
                id: 'manzanas-fuji',
                name: 'Manzanas Fuji',
                price: 2000,
                originalPrice: 2300,
                image: '/static/img/manzanas-fuji.jpg',
                images: ['/static/img/manzanas-fuji.jpg', '/static/img/manzanas-fuji.jpg', '/static/img/manzanas-fuji.jpg'],
                description: 'Manzanas Fuji crujientes y dulces, una de las variedades más populares. Perfectas para comer como snack saludable o en recetas. Cultivadas orgánicamente.',
                category: 'frutas',
                stock: 60,
                rating: 4.7,
                reviews: 203
            },
            {
                id: 'frutillas',
                name: 'Frutillas',
                price: 2100,
                originalPrice: 3000,
                image: '/static/img/product-4.jpg',
                images: ['/static/img/product-4.jpg', '/static/img/product-4.jpg', '/static/img/product-4.jpg'],
                description: 'Frutillas frescas y aromáticas, perfectas para postres, batidos o comer solas. Cultivadas sin pesticidas para garantizar su sabor natural y propiedades antioxidantes.',
                category: 'frutas',
                stock: 35,
                rating: 4.9,
                reviews: 145
            },
            {
                id: 'naranjas',
                name: 'Naranjas',
                price: 1100,
                originalPrice: 2000,
                image: '/static/img/naranjas.jpg',
                images: ['/static/img/naranjas.jpg', '/static/img/naranjas.jpg', '/static/img/naranjas.jpg'],
                description: 'Naranjas jugosas y ricas en vitamina C, perfectas para jugos o comer directamente. Cultivadas orgánicamente para mantener su sabor cítrico natural.',
                category: 'frutas',
                stock: 80,
                rating: 4.6,
                reviews: 178
            },
            {
                id: 'leche-chocolate',
                name: 'Leche Descremada Sabor Chocolate',
                price: 1099,
                originalPrice: 1300,
                image: '/static/img/chocolate.png',
                images: ['/static/img/chocolate.png', '/static/img/chocolate.png', '/static/img/chocolate.png'],
                description: 'Leche descremada con sabor a chocolate, rica en calcio y proteínas. Perfecta para el desayuno o como bebida refrescante. Producto lácteo de alta calidad.',
                category: 'lacteos',
                stock: 100,
                rating: 4.5,
                reviews: 87
            },
            {
                id: 'leche-natural',
                name: 'Leche Enteral Natural 1 LT',
                price: 1000,
                originalPrice: 1350,
                image: '/static/img/leche.webp',
                images: ['/static/img/leche.webp', '/static/img/leche.webp', '/static/img/leche.webp'],
                description: 'Leche entera fresca y natural, rica en calcio y vitaminas. Perfecta para toda la familia. Producto lácteo de la más alta calidad.',
                category: 'lacteos',
                stock: 120,
                rating: 4.7,
                reviews: 134
            },
            {
                id: 'yogurt-batido',
                name: 'Pack Yoghurt Batido Colun 12 X 125 GR',
                price: 2600,
                originalPrice: 2999,
                image: '/static/img/jogurt.png',
                images: ['/static/img/jogurt.png', '/static/img/jogurt.png', '/static/img/jogurt.png'],
                description: 'Pack de 12 yogures batidos de diferentes sabores. Rico en probióticos y calcio. Perfecto para el desayuno o como snack saludable.',
                category: 'lacteos',
                stock: 45,
                rating: 4.6,
                reviews: 92
            },
            {
                id: 'queso-ranco',
                name: 'Queso Ranco Laminado Colun 500 GR',
                price: 7000,
                originalPrice: 7250,
                image: '/static/img/queso.webp',
                images: ['/static/img/queso.webp', '/static/img/queso.webp', '/static/img/queso.webp'],
                description: 'Queso Ranco laminado de alta calidad, perfecto para sándwiches, pizzas o comer directamente. Rico en calcio y proteínas.',
                category: 'lacteos',
                stock: 30,
                rating: 4.8,
                reviews: 76
            }
        ];
    }

    // Mostrar producto
    displayProduct() {
        if (!this.product) return;

        // Información básica
        document.getElementById('productName').textContent = this.product.name;
        document.getElementById('currentPrice').textContent = `$${this.product.price.toLocaleString()}`;
        document.getElementById('originalPrice').textContent = `$${this.product.originalPrice.toLocaleString()}`;
        document.getElementById('productDescription').textContent = this.product.description;
        document.getElementById('mainProductImage').src = this.product.image;
        document.getElementById('mainProductImage').alt = this.product.name;

        // Descuento
        const discount = Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
        if (discount > 0) {
            document.getElementById('discount').textContent = `-${discount}%`;
        } else {
            document.getElementById('discount').style.display = 'none';
        }

        // Imágenes thumbnails
        this.product.images.forEach((image, index) => {
            const thumb = document.getElementById(`thumb${index + 1}`);
            if (thumb) {
                thumb.src = image;
                thumb.alt = `${this.product.name} ${index + 1}`;
            }
        });

        // Rating
        const stars = document.querySelectorAll('.stars .fa-star');
        const rating = Math.floor(this.product.rating);
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('text-warning');
            } else {
                star.classList.remove('text-warning');
            }
        });

        // Actualizar título de la página
        document.title = `${this.product.name} - HuertoHogar`;
    }

    // Mostrar producto no encontrado
    showProductNotFound() {
        document.body.innerHTML = `
            <div class="container-fluid py-5 mt-5">
                <div class="container text-center">
                    <h1 class="display-4 text-muted">Producto no encontrado</h1>
                    <p class="lead">El producto que buscas no existe o ha sido removido.</p>
                    <a href="/index.html" class="btn btn-primary btn-lg">Volver al Inicio</a>
                </div>
            </div>
        `;
    }

    // Cargar productos relacionados
    loadRelatedProducts() {
        if (!this.product) return;

        const relatedProducts = this.getAllProducts()
            .filter(p => p.id !== this.product.id && p.category === this.product.category)
            .slice(0, 4);

        const container = document.getElementById('relatedProducts');
        container.innerHTML = relatedProducts.map(product => `
            <div class="col-lg-3 col-md-6">
                <div class="product-item">
                    <div class="position-relative bg-light overflow-hidden">
                        <img class="img-fluid w-100" src="${product.image}" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">Fresco</div>
                    </div>
                    <div class="text-center p-4">
                        <a class="d-block h5 mb-2" href="product-detail.html?id=${product.id}">${product.name}</a>
                        <span class="text-primary me-1">$${product.price.toLocaleString()}</span>
                        <span class="text-body text-decoration-line-through">$${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <div class="d-flex border-top">
                        <small class="w-50 text-center border-end py-2">
                            <a class="text-body" href="product-detail.html?id=${product.id}"><i class="fa fa-eye text-primary me-2"></i>Ver detalles</a>
                        </small>
                        <small class="w-50 text-center py-2">
                            <a class="text-body add-to-cart-btn" href="#" data-product='${JSON.stringify(product)}'><i class="fa fa-shopping-bag text-primary me-2"></i>Añadir al carrito</a>
                        </small>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Vincular eventos
    bindEvents() {
        // Cantidad
        document.getElementById('increaseQty').addEventListener('click', () => {
            const qtyInput = document.getElementById('quantity');
            const currentQty = parseInt(qtyInput.value);
            if (currentQty < 10) {
                qtyInput.value = currentQty + 1;
                this.quantity = qtyInput.value;
            }
        });

        document.getElementById('decreaseQty').addEventListener('click', () => {
            const qtyInput = document.getElementById('quantity');
            const currentQty = parseInt(qtyInput.value);
            if (currentQty > 1) {
                qtyInput.value = currentQty - 1;
                this.quantity = qtyInput.value;
            }
        });

        document.getElementById('quantity').addEventListener('change', (e) => {
            this.quantity = parseInt(e.target.value);
        });

        // Agregar al carrito
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            this.addToCart();
        });

        // Comprar ahora
        document.getElementById('buyNowBtn').addEventListener('click', () => {
            this.buyNow();
        });

        // Cambiar imagen principal
        document.querySelectorAll('[id^="thumb"]').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                document.getElementById('mainProductImage').src = e.target.src;
            });
        });

        // Eventos para productos relacionados
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                e.preventDefault();
                const productData = JSON.parse(e.target.closest('.add-to-cart-btn').dataset.product);
                if (window.cart) {
                    window.cart.addItem(productData);
                }
            }
        });
    }

    // Agregar al carrito
    addToCart() {
        if (!this.product) return;

        const productToAdd = {
            ...this.product,
            quantity: this.quantity
        };

        // Agregar la cantidad especificada
        for (let i = 0; i < this.quantity; i++) {
            if (window.cart) {
                window.cart.addItem(this.product);
            }
        }

        // Mostrar mensaje de éxito
        this.showSuccessMessage(`${this.product.name} agregado al carrito (${this.quantity} unidades)`);
    }

    // Comprar ahora
    buyNow() {
        if (!this.product) return;

        // Agregar al carrito
        this.addToCart();

        // Abrir modal del carrito
        if (window.cart) {
            window.cart.openCartModal();
        }
    }

    // Mostrar mensaje de éxito
    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed top-0 end-0 m-3';
        toast.style.zIndex = '9999';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fa fa-check-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new ProductDetail();
});