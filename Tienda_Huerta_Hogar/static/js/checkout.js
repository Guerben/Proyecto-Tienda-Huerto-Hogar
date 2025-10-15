// ===== SISTEMA DE CHECKOUT =====

class CheckoutSystem {
    constructor() {
        this.cart = null;
        this.shippingCost = 0;
        this.discount = 0;
        this.couponCode = '';
        this.init();
    }

    init() {
        this.loadCart();
        this.bindEvents();
        this.updateOrderSummary();
        this.calculateShipping();
    }

    // Cargar carrito
    loadCart() {
        if (window.cart) {
            this.cart = window.cart;
        } else {
            // Si no hay carrito, redirigir al inicio
            window.location.href = '/index.html';
        }
    }

    // Vincular eventos
    bindEvents() {
        // Métodos de envío
        document.querySelectorAll('input[name="shipping"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.calculateShipping();
                this.updateOrderSummary();
            });
        });

        // Métodos de pago
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.togglePaymentForm();
            });
        });

        // Aplicar cupón
        document.getElementById('applyCoupon').addEventListener('click', () => {
            this.applyCoupon();
        });

        // Realizar pedido
        document.getElementById('placeOrderBtn').addEventListener('click', () => {
            this.placeOrder();
        });

        // Formatear número de tarjeta
        document.getElementById('cardNumber').addEventListener('input', (e) => {
            this.formatCardNumber(e.target);
        });

        // Formatear fecha de vencimiento
        document.getElementById('expiryDate').addEventListener('input', (e) => {
            this.formatExpiryDate(e.target);
        });

        // Solo números en CVV
        document.getElementById('cvv').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // Calcular costo de envío
    calculateShipping() {
        const selectedShipping = document.querySelector('input[name="shipping"]:checked');
        const subtotal = this.cart.getTotal();

        switch (selectedShipping.value) {
            case 'standard':
                this.shippingCost = subtotal >= 15000 ? 0 : 2500;
                break;
            case 'express':
                this.shippingCost = 3500;
                break;
            case 'pickup':
                this.shippingCost = 0;
                break;
        }

        // Actualizar precios mostrados
        document.getElementById('standardPrice').textContent = subtotal >= 15000 ? 'Gratis' : '$2.500';
        document.getElementById('expressPrice').textContent = '$3.500';
        document.getElementById('pickupPrice').textContent = 'Gratis';
    }

    // Actualizar resumen del pedido
    updateOrderSummary() {
        if (!this.cart) return;

        const orderItems = document.getElementById('orderItems');
        const subtotal = this.cart.getTotal();
        const total = subtotal + this.shippingCost - this.discount;

        // Mostrar items
        orderItems.innerHTML = this.cart.items.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="me-2" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                    <div>
                        <small class="fw-bold">${item.name}</small>
                        <br>
                        <small class="text-muted">Cantidad: ${item.quantity}</small>
                    </div>
                </div>
                <small class="fw-bold">$${(item.price * item.quantity).toLocaleString()}</small>
            </div>
        `).join('');

        // Actualizar totales
        document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
        document.getElementById('shippingCost').textContent = this.shippingCost === 0 ? 'Gratis' : `$${this.shippingCost.toLocaleString()}`;
        document.getElementById('totalAmount').textContent = `$${total.toLocaleString()}`;

        // Mostrar/ocultar descuento
        if (this.discount > 0) {
            document.getElementById('discountRow').style.display = 'flex';
            document.getElementById('discountAmount').textContent = `-$${this.discount.toLocaleString()}`;
        } else {
            document.getElementById('discountRow').style.display = 'none';
        }
    }

    // Aplicar cupón
    applyCoupon() {
        const couponInput = document.getElementById('couponCode');
        const couponMessage = document.getElementById('couponMessage');
        const code = couponInput.value.trim().toUpperCase();

        if (!code) {
            this.showCouponMessage('Por favor ingresa un código de cupón', 'warning');
            return;
        }

        // Cupones válidos
        const validCoupons = {
            'BIENVENIDO10': { type: 'percentage', value: 10, description: '10% de descuento' },
            'FRESCO15': { type: 'percentage', value: 15, description: '15% de descuento' },
            'ORGANICO20': { type: 'percentage', value: 20, description: '20% de descuento' },
            'ENVIOGRATIS': { type: 'shipping', value: 0, description: 'Envío gratis' },
            '5000OFF': { type: 'fixed', value: 5000, description: '$5.000 de descuento' }
        };

        if (validCoupons[code]) {
            const coupon = validCoupons[code];
            this.couponCode = code;
            
            if (coupon.type === 'shipping') {
                this.shippingCost = 0;
                this.showCouponMessage(`¡Cupón aplicado! ${coupon.description}`, 'success');
            } else {
                const subtotal = this.cart.getTotal();
                if (coupon.type === 'percentage') {
                    this.discount = Math.round(subtotal * (coupon.value / 100));
                } else if (coupon.type === 'fixed') {
                    this.discount = Math.min(coupon.value, subtotal);
                }
                this.showCouponMessage(`¡Cupón aplicado! ${coupon.description}`, 'success');
            }
            
            this.updateOrderSummary();
        } else {
            this.showCouponMessage('Código de cupón inválido', 'danger');
        }
    }

    // Mostrar mensaje de cupón
    showCouponMessage(message, type) {
        const couponMessage = document.getElementById('couponMessage');
        couponMessage.innerHTML = `<div class="alert alert-${type} alert-sm mb-0">${message}</div>`;
        
        setTimeout(() => {
            couponMessage.innerHTML = '';
        }, 5000);
    }

    // Alternar formulario de pago
    togglePaymentForm() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        const cardForm = document.getElementById('cardForm');
        
        if (selectedPayment.value === 'credit') {
            cardForm.style.display = 'block';
        } else {
            cardForm.style.display = 'none';
        }
    }

    // Formatear número de tarjeta
    formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        input.value = value;
    }

    // Formatear fecha de vencimiento
    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    }

    // Realizar pedido
    placeOrder() {
        if (!this.validateForm()) {
            return;
        }

        const orderData = this.collectOrderData();
        
        // Mostrar loading
        const btn = document.getElementById('placeOrderBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa fa-spinner fa-spin me-2"></i>Procesando...';
        btn.disabled = true;

        // Simular procesamiento
        setTimeout(() => {
            this.processOrder(orderData);
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }

    // Validar formulario
    validateForm() {
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'region'
        ];

        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });

        // Validar email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        }

        // Validar método de pago
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (selectedPayment.value === 'credit') {
            const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
            cardFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
        }

        if (!isValid) {
            this.showMessage('Por favor completa todos los campos requeridos', 'warning');
        }

        return isValid;
    }

    // Recopilar datos del pedido
    collectOrderData() {
        return {
            customer: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                region: document.getElementById('region').value,
                postalCode: document.getElementById('postalCode').value
            },
            shipping: {
                method: document.querySelector('input[name="shipping"]:checked').value,
                cost: this.shippingCost
            },
            payment: {
                method: document.querySelector('input[name="payment"]:checked').value,
                cardNumber: document.getElementById('cardNumber').value,
                expiryDate: document.getElementById('expiryDate').value,
                cvv: document.getElementById('cvv').value,
                cardName: document.getElementById('cardName').value
            },
            order: {
                items: this.cart.items,
                subtotal: this.cart.getTotal(),
                shipping: this.shippingCost,
                discount: this.discount,
                total: this.cart.getTotal() + this.shippingCost - this.discount,
                coupon: this.couponCode
            }
        };
    }

    // Procesar pedido
    processOrder(orderData) {
        // Guardar pedido en localStorage
        const orders = JSON.parse(localStorage.getItem('huertohogar_orders')) || [];
        const orderId = 'ORD-' + Date.now();
        
        const order = {
            id: orderId,
            date: new Date().toISOString(),
            status: 'confirmado',
            ...orderData
        };

        orders.push(order);
        localStorage.setItem('huertohogar_orders', JSON.stringify(orders));

        // Limpiar carrito
        this.cart.clearCart();

        // Mostrar confirmación
        this.showOrderConfirmation(orderId);
    }

    // Mostrar confirmación del pedido
    showOrderConfirmation(orderId) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center py-5">
                        <i class="fa fa-check-circle fa-4x text-success mb-3"></i>
                        <h3 class="text-success mb-3">¡Pedido Confirmado!</h3>
                        <p class="mb-3">Tu pedido ha sido procesado exitosamente.</p>
                        <p class="mb-4"><strong>Número de pedido:</strong> ${orderId}</p>
                        <p class="text-muted mb-4">Te enviaremos un email de confirmación con todos los detalles.</p>
                        <div class="d-flex gap-2 justify-content-center">
                            <a href="/index.html" class="btn btn-primary">Continuar Comprando</a>
                            <a href="/order-history.html" class="btn btn-outline-primary">Ver Pedidos</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    }

    // Mostrar mensaje
    showMessage(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
        alert.style.zIndex = '9999';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// Inicializar checkout cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new CheckoutSystem();
});
