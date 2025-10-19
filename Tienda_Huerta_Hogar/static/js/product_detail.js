

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

    // Cargara  productos desde la URL
    loadProductFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            this.product = this.getProductById(productId);
            if (this.product) {
                this.displayProduct();
            } else {
                this.showProductNotFound(productId);
            }
        } else {
            this.showProductNotFound('Ninguno');
        }
    }

    // Obtiene un producto por su ID
    getProductById(id) {
        const products = this.getAllProducts();
        return products.find(product => product.id === id);
    }

    // Obtiene todos los productos (Catálogo completo basado en product.html)
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
                id: 'pepinos-alaska',
                name: 'Pepinos Alaska',
                price: 1090,
                originalPrice: 2000,
                image: '/static/img/product-5.jpg',
                images: ['/static/img/product-5.jpg', '/static/img/product-5.jpg', '/static/img/product-5.jpg'],
                description: 'Pepinos frescos de la variedad Alaska, ideales para ensaladas y bebidas refrescantes. Jugosos y crujientes, cultivados con métodos sostenibles.',
                category: 'vegetales',
                stock: 45,
                rating: 4.5,
                reviews: 90
            },
            {
                id: 'tomates-rojos',
                name: 'Tomates',
                price: 1950,
                originalPrice: 2100,
                image: '/static/img/product-6.jpg',
                images: ['/static/img/product-6.jpg', '/static/img/product-6.jpg', '/static/img/product-6.jpg'],
                description: 'Tomates grandes y maduros, perfectos para salsas y consumo diario. Sabor intenso y textura firme, directo de nuestra huerta.',
                category: 'vegetales',
                stock: 55,
                rating: 4.7,
                reviews: 110
            },
            {
                id: 'papas-frescas',
                name: 'Papas',
                price: 690,
                originalPrice: 800,
                image: '/static/img/product-7.jpg',
                images: ['/static/img/product-7.jpg', '/static/img/product-7.jpg', '/static/img/product-7.jpg'],
                description: 'Papas frescas, ideales para freír, cocer o asar. De cultivo local y sin conservantes.',
                category: 'vegetales',
                stock: 80,
                rating: 4.6,
                reviews: 180
            },
            {
                id: 'espinacas',
                name: 'Espinacas Americana',
                price: 1190,
                originalPrice: 1500,
                image: '/static/img/Espinaca-Americana.jpg',
                images: ['/static/img/Espinaca-Americana.jpg', '/static/img/Espinaca-Americana.jpg', '/static/img/Espinaca-Americana.jpg'],
                description: 'Espinacas frescas americanas, ricas en hierro y vitaminas. Perfectas para ensaladas o salteados rápidos.',
                category: 'vegetales',
                stock: 30,
                rating: 4.9,
                reviews: 105
            },
            {
                id: 'peras',
                name: 'Peras',
                price: 1050,
                originalPrice: 1690,
                image: '/static/img/peras.jpg',
                images: ['/static/img/peras.jpg', '/static/img/peras.jpg', '/static/img/peras.jpg'],
                description: 'Peras jugosas y dulces. Fruta de temporada cultivada con cuidado para asegurar la mejor calidad.',
                category: 'frutas',
                stock: 40,
                rating: 4.5,
                reviews: 75
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
                id: 'uvas-negras',
                name: 'Uvas',
                price: 2000,
                originalPrice: 2300,
                image: '/static/img/uvas.jpg',
                images: ['/static/img/uvas.jpg', '/static/img/uvas.jpg', '/static/img/uvas.jpg'],
                description: 'Uvas frescas de mesa, dulces y crujientes. Ideales para snacks o para acompañar quesos.',
                category: 'frutas',
                stock: 45,
                rating: 4.7,
                reviews: 112
            },
            {
                id: 'kiwi-fresco',
                name: 'Kiwi',
                price: 3990,
                originalPrice: 4190,
                image: '/static/img/kiwi.jpg',
                images: ['/static/img/kiwi.jpg', '/static/img/kiwi.jpg', '/static/img/kiwi.jpg'],
                description: 'Kiwi fresco, lleno de vitamina C y fibra. Un sabor tropical perfecto para energizar tu día.',
                category: 'frutas',
                stock: 50,
                rating: 4.8,
                reviews: 95
            },
            {
                id: 'platanos-ecuatorianos',
                name: 'Plátanos Ecuatorianos',
                price: 1450,
                originalPrice: 2000,
                image: '/static/img/bananas.jpg',
                images: ['/static/img/bananas.jpg', '/static/img/bananas.jpg', '/static/img/bananas.jpg'],
                description: 'Plátanos (bananas) de Ecuador, dulces y cremosos. La fuente de potasio perfecta para cualquier momento.',
                category: 'frutas',
                stock: 70,
                rating: 4.5,
                reviews: 130
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
            },
            {
                id: 'mantequilla-untable',
                name: 'Mantequilla Untable con Sal 200 GR',
                price: 3350, // Corregido de $3.3500
                originalPrice: 3650,
                image: '/static/img/Mantequilla.png',
                images: ['/static/img/Mantequilla.png', '/static/img/Mantequilla.png', '/static/img/Mantequilla.png'],
                description: 'Mantequilla fresca y untable con un toque de sal. Ideal para tostadas y repostería.',
                category: 'lacteos',
                stock: 60,
                rating: 4.7,
                reviews: 80
            },
            {
                id: 'mantequilla-soprole',
                name: 'Mantequilla con Sal Soprole 250 GR',
                price: 2000,
                originalPrice: 2990,
                image: '/static/img/mantequilla_con_sal_250gr.webp',
                images: ['/static/img/mantequilla_con_sal_250gr.webp', '/static/img/mantequilla_con_sal_250gr.webp', '/static/img/mantequilla_con_sal_250gr.webp'],
                description: 'Mantequilla tradicional Soprole con sal. Calidad garantizada para tus comidas.',
                category: 'lacteos',
                stock: 75,
                rating: 4.5,
                reviews: 90
            },
            {
                id: 'miel-organica',
                name: 'Miel de Abeja 1KG de nuestra huerta',
                price: 8550,
                originalPrice: 9340,
                image: '/static/img/miel_organica.png',
                images: ['/static/img/miel_organica.png', '/static/img/miel_organica.png', '/static/img/miel_organica.png'],
                description: 'Miel de abeja 100% orgánica y pura, recolectada directamente de nuestra huerta. Endulzante natural y saludable.',
                category: 'lacteos', 
                stock: 50,
                rating: 4.9,
                reviews: 150
            },
            {
                id: 'milo-saborizante',
                name: 'Saborizante en Polvo Milo Sabor Chocolate',
                price: 5990,
                originalPrice: 6200,
                image: '/static/img/milo.jpeg',
                images: ['/static/img/milo.jpeg', '/static/img/milo.jpeg', '/static/img/milo.jpeg'],
                description: 'Saborizante en polvo Milo, perfecto para mezclar con leche y crear una bebida nutritiva con sabor a chocolate.',
                category: 'lacteos',
                stock: 90,
                rating: 4.4,
                reviews: 65
            }
        ];
    }

    // Mostramos producto
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
        const discountElement = document.getElementById('discount');
        if (discount > 0) {
            discountElement.textContent = `-${discount}%`;
            discountElement.style.display = 'inline-block';
        } else {
            discountElement.style.display = 'none';
        }

        // Imágenes thumbnails
        this.product.images.forEach((image, index) => {
            const thumb = document.getElementById(`thumb${index + 1}`);
            if (thumb) {
                thumb.src = image;
                thumb.alt = `${this.product.name} ${index + 1}`;
                // Marcamos el thumbnail principal como activo
                if (index === 0) {
                     thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
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

        // Actualiza el título de la página
        document.title = `${this.product.name} - HuertoHogar`;
    }

    // Muestra el mensaje de producto no encontrado
    showProductNotFound(id) {
        document.body.innerHTML = `
            <div class="container-fluid py-5 mt-5">
                <div class="container text-center">
                    <h1 class="display-4 text-muted">Producto no encontrado</h1>
                    <p class="lead">El producto con ID '${id}' que buscas no existe o ha sido removido.</p>
                    <a href="/index.html" class="btn btn-primary btn-lg">Volver al Inicio</a>
                </div>
            </div>
        `;
    }

    // Carga productos relacionados
    loadRelatedProducts() {
        if (!this.product) return;

        const container = document.getElementById('relatedProducts');
        if (!container) return; // en caso que el contenedor no existe, no hara nada

        const relatedProducts = this.getAllProducts()
            .filter(p => p.id !== this.product.id && p.category === this.product.category)
            .slice(0, 4);

        if (relatedProducts.length === 0) {
             // Ocultara sección si no hay relacionados, o mostrara un mensaje
             // Decidimos dejarla con un mensaje simple 
             container.innerHTML = '<p class="text-center text-muted">No hay más productos en esta categoría.</p>';
             return;
        }

        container.innerHTML = relatedProducts.map(product => `
            <div class="col-lg-3 col-md-6">
                <div class="product-item">
                    <div class="position-relative bg-light overflow-hidden">
                        <img class="img-fluid w-100" src="${product.image}" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">Fresco</div>
                    </div>
                    <div class="text-center p-4">
                        <a class="d-block h5 mb-2" href="product_detail.html?id=${product.id}">${product.name}</a>
                        <span class="text-primary me-1">$${product.price.toLocaleString()}</span>
                        <span class="text-body text-decoration-line-through">$${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <div class="d-flex border-top">
                        <small class="w-50 text-center border-end py-2">
                            <a class="text-body" href="product_detail.html?id=${product.id}"><i class="fa fa-eye text-primary me-2"></i>Ver detalles</a>
                        </small>
                        <small class="w-50 text-center py-2">
                            <a class="text-body add-to-cart-btn" href="#" data-product='${JSON.stringify(product).replace(/'/g, '&#39;')}'>
                                <i class="fa fa-shopping-bag text-primary me-2"></i>Añadir al carrito
                            </a>
                        </small>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Vinculamos los eventos
    bindEvents() {
        // Cantidad
        document.getElementById('increaseQty').addEventListener('click', () => {
            const qtyInput = document.getElementById('quantity');
            const currentQty = parseInt(qtyInput.value);
            if (currentQty < 10) {
                qtyInput.value = currentQty + 1;
                this.quantity = parseInt(qtyInput.value);
            }
        });

        document.getElementById('decreaseQty').addEventListener('click', () => {
            const qtyInput = document.getElementById('quantity');
            const currentQty = parseInt(qtyInput.value);
            if (currentQty > 1) {
                qtyInput.value = currentQty - 1;
                this.quantity = parseInt(qtyInput.value);
            }
        });

        document.getElementById('quantity').addEventListener('change', (e) => {
            this.quantity = parseInt(e.target.value);
        });

        // funcion para agregar al carrito
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            this.addToCart();
        });

        //  para comprar ahora
        document.getElementById('buyNowBtn').addEventListener('click', () => {
            this.buyNow();
        });

        // para cambiar la imagen principal
        document.querySelectorAll('[id^="thumb"]').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                document.getElementById('mainProductImage').src = e.target.src;
                
                document.querySelectorAll('[id^="thumb"]').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Eventos para productos relacionados (delegación)
        document.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart-btn');
            if (addToCartBtn) {
                e.preventDefault();
                const productData = JSON.parse(addToCartBtn.dataset.product);
                if (window.cart) {
                    window.cart.addItem(productData);
                    this.showSuccessMessage(`${productData.name} agregado al carrito (1 unidad)`);
                }
            }
        });
    }

    // Agrega al carrito
    addToCart() {
        if (!this.product) return;

        // Agrega la cantidad especificada
        if (window.cart && this.quantity > 0) {
             for (let i = 0; i < this.quantity; i++) {
                 
                 window.cart.addItem(this.product); 
             }
        }
        
        // Pintamos mensaje de éxito
        this.showSuccessMessage(`${this.product.name} agregado al carrito (${this.quantity} unidades)`);
    }

   
    buyNow() {
        if (!this.product) return;

        
        this.addToCart();

        // Redirige al checkout
        window.location.href = 'checkout.html';
    }

    // Pintamos un mensaje de éxito (Toast)
    showSuccessMessage(message) {
        const toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            const container = document.createElement('div');
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fa fa-check-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        document.querySelector('.toast-container').appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }
}

// Inicializara cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof bootstrap !== 'undefined') {
        new ProductDetail();
    } else {
        console.error("Bootstrap no está cargado. Asegúrate de incluir el script de Bootstrap 5.");
    }
});
