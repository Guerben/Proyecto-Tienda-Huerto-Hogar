// ===== HISTORIAL DE PEDIDOS =====

class OrderHistory {
    constructor() {
        this.orders = [];
        this.filteredOrders = [];
        this.init();
    }

    init() {
        this.loadOrders();
        this.bindEvents();
        this.displayOrders();
    }

    // Cargar pedidos
    loadOrders() {
        this.orders = JSON.parse(localStorage.getItem('huertohogar_orders')) || [];
        this.filteredOrders = [...this.orders];
    }

    // Vincular eventos
    bindEvents() {
        // Filtros
        document.getElementById('filterBtn').addEventListener('click', () => {
            this.applyFilters();
        });

        // Enter en filtros
        document.getElementById('statusFilter').addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('dateFrom').addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('dateTo').addEventListener('change', () => {
            this.applyFilters();
        });
    }

    // Aplicar filtros
    applyFilters() {
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;

        this.filteredOrders = this.orders.filter(order => {
            // Filtro por estado
            if (statusFilter && order.status !== statusFilter) {
                return false;
            }

            // Filtro por fecha
            const orderDate = new Date(order.date);
            if (dateFrom) {
                const fromDate = new Date(dateFrom);
                if (orderDate < fromDate) {
                    return false;
                }
            }
            if (dateTo) {
                const toDate = new Date(dateTo);
                toDate.setHours(23, 59, 59, 999);
                if (orderDate > toDate) {
                    return false;
                }
            }

            return true;
        });

        this.displayOrders();
    }

    // Mostrar pedidos
    displayOrders() {
        const ordersList = document.getElementById('ordersList');
        const noOrdersMessage = document.getElementById('noOrdersMessage');

        if (this.filteredOrders.length === 0) {
            ordersList.innerHTML = '';
            noOrdersMessage.style.display = 'block';
            return;
        }

        noOrdersMessage.style.display = 'none';

        // Ordenar por fecha (más recientes primero)
        const sortedOrders = this.filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

        ordersList.innerHTML = sortedOrders.map(order => `
            <div class="card mb-3 order-card" data-order-id="${order.id}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-3">
                            <h6 class="mb-1">Pedido #${order.id}</h6>
                            <small class="text-muted">${this.formatDate(order.date)}</small>
                        </div>
                        <div class="col-md-2">
                            <span class="badge ${this.getStatusBadgeClass(order.status)}">${this.getStatusText(order.status)}</span>
                        </div>
                        <div class="col-md-2">
                            <small class="text-muted">${order.items.length} producto${order.items.length > 1 ? 's' : ''}</small>
                        </div>
                        <div class="col-md-2">
                            <strong>$${order.order.total.toLocaleString()}</strong>
                        </div>
                        <div class="col-md-3 text-end">
                            <button class="btn btn-outline-primary btn-sm me-2" onclick="orderHistory.viewOrderDetails('${order.id}')">
                                <i class="fa fa-eye me-1"></i>Ver Detalles
                            </button>
                            ${order.status === 'entregado' ? `
                                <button class="btn btn-outline-success btn-sm" onclick="orderHistory.reorder('${order.id}')">
                                    <i class="fa fa-redo me-1"></i>Volver a Pedir
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Ver detalles del pedido
    viewOrderDetails(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const modalContent = document.getElementById('orderDetailContent');
        modalContent.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Información del Pedido</h6>
                    <table class="table table-sm">
                        <tr>
                            <td><strong>Número:</strong></td>
                            <td>${order.id}</td>
                        </tr>
                        <tr>
                            <td><strong>Fecha:</strong></td>
                            <td>${this.formatDate(order.date)}</td>
                        </tr>
                        <tr>
                            <td><strong>Estado:</strong></td>
                            <td><span class="badge ${this.getStatusBadgeClass(order.status)}">${this.getStatusText(order.status)}</span></td>
                        </tr>
                        <tr>
                            <td><strong>Método de Envío:</strong></td>
                            <td>${this.getShippingMethodText(order.shipping.method)}</td>
                        </tr>
                        <tr>
                            <td><strong>Método de Pago:</strong></td>
                            <td>${this.getPaymentMethodText(order.payment.method)}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6>Dirección de Envío</h6>
                    <address>
                        ${order.customer.firstName} ${order.customer.lastName}<br>
                        ${order.customer.address}<br>
                        ${order.customer.city}, ${order.customer.region}<br>
                        ${order.customer.postalCode}
                    </address>
                </div>
            </div>
            
            <hr>
            
            <h6>Productos</h6>
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="${item.image}" alt="${item.name}" class="me-2" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                                        ${item.name}
                                    </div>
                                </td>
                                <td>${item.quantity}</td>
                                <td>$${item.price.toLocaleString()}</td>
                                <td>$${(item.price * item.quantity).toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <hr>
            
            <div class="row">
                <div class="col-md-6">
                    <h6>Resumen de Costos</h6>
                    <table class="table table-sm">
                        <tr>
                            <td>Subtotal:</td>
                            <td class="text-end">$${order.order.subtotal.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Envío:</td>
                            <td class="text-end">${order.order.shipping === 0 ? 'Gratis' : `$${order.order.shipping.toLocaleString()}`}</td>
                        </tr>
                        ${order.order.discount > 0 ? `
                            <tr>
                                <td>Descuento:</td>
                                <td class="text-end text-success">-$${order.order.discount.toLocaleString()}</td>
                            </tr>
                        ` : ''}
                        <tr class="table-active">
                            <td><strong>Total:</strong></td>
                            <td class="text-end"><strong>$${order.order.total.toLocaleString()}</strong></td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    ${order.order.coupon ? `
                        <h6>Cupón Aplicado</h6>
                        <p class="text-success"><i class="fa fa-ticket-alt me-1"></i>${order.order.coupon}</p>
                    ` : ''}
                </div>
            </div>
        `;

        // Guardar ID del pedido para reordenar
        document.getElementById('reorderBtn').onclick = () => {
            this.reorder(orderId);
        };

        const modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
        modal.show();
    }

    // Volver a pedir
    reorder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        if (window.cart) {
            // Limpiar carrito actual
            window.cart.clearCart();
            
            // Agregar productos del pedido
            order.items.forEach(item => {
                for (let i = 0; i < item.quantity; i++) {
                    window.cart.addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        originalPrice: item.originalPrice,
                        image: item.image
                    });
                }
            });

            // Mostrar mensaje de éxito
            this.showMessage('Productos agregados al carrito', 'success');
            
            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('orderDetailModal'));
            modal.hide();
            
            // Redirigir al checkout
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 1000);
        }
    }

    // Formatear fecha
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Obtener clase del badge de estado
    getStatusBadgeClass(status) {
        const classes = {
            'confirmado': 'bg-warning',
            'enviado': 'bg-info',
            'entregado': 'bg-success',
            'cancelado': 'bg-danger'
        };
        return classes[status] || 'bg-secondary';
    }

    // Obtener texto del estado
    getStatusText(status) {
        const texts = {
            'confirmado': 'Confirmado',
            'enviado': 'Enviado',
            'entregado': 'Entregado',
            'cancelado': 'Cancelado'
        };
        return texts[status] || status;
    }

    // Obtener texto del método de envío
    getShippingMethodText(method) {
        const texts = {
            'standard': 'Envío Estándar',
            'express': 'Envío Express',
            'pickup': 'Retiro en Tienda'
        };
        return texts[method] || method;
    }

    // Obtener texto del método de pago
    getPaymentMethodText(method) {
        const texts = {
            'credit': 'Tarjeta de Crédito/Débito',
            'transfer': 'Transferencia Bancaria',
            'cash': 'Pago Contra Entrega'
        };
        return texts[method] || method;
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

// Inicializar historial de pedidos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.orderHistory = new OrderHistory();
});
