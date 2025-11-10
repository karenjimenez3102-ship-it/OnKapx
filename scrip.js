document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    //  CONFIGURACIÓN IMPORTANTE: 3227496038
    // ----------------------------------------------------
    // Usa el formato internacional sin el signo (+), solo el código de país (57 para Colombia)
    const WHATSAPP_NUMBER = '573227496038'; // Reemplaza con tu número real
    
    // Almacena el carrito como un array de objetos
    let cartItems = [];
    const cartCountElement = document.getElementById('cart-count');
    const productGrid = document.getElementById('product-grid');

    // Simulación de Productos
    const simulatedProducts = [
        { id: 1, name: "Snapback Premium Negra", price: 75000, type: "Visera Plana / Bordado 3D", image: "[Image Snapback]" },
        { id: 2, name: "Gorra Trucker Básica", price: 30000, type: "Malla / Clásica", image: "[Image Trucker]" },
        { id: 3, name: "Dad Hat Bordado", price: 55000, type: "Algodón Premium / Curva", image: "[Image Dad Hat]" },
        { id: 4, name: "Visera Plana Camuflada", price: 80000, type: "Snapback / Exclusiva", image: "[Image Camuflada]" }
    ];

    // Función para renderizar los productos dinámicamente
    function renderProducts() {
        // Limpia el producto de ejemplo fijo para evitar duplicados
        productGrid.innerHTML = ''; 
        
        simulatedProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            // Almacenamos el ID para identificar el producto al agregarlo
            card.setAttribute('data-id', product.id); 

            card.innerHTML = `
                ${product.image}
                <h4>${product.name}</h4>
                <p class="price">$${product.price.toLocaleString('es-CO')} COP</p>
                <p class="type">${product.type}</p>
                <button class="add-to-cart">Agregar al Carrito</button>
            `;
            productGrid.appendChild(card);
        });
    }

    renderProducts();

    // 1. Agregar Producto al Carrito
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-id'));
            
            const product = simulatedProducts.find(p => p.id === productId);

            // Añadir el producto al array del carrito
            cartItems.push(product); 
            
            // Actualizar el contador visual
            cartCountElement.textContent = cartItems.length;

            alert(`✅ ¡"${product.name}" añadido al pedido!`);
        }
    });

    // 2. Finalizar Pedido por WhatsApp
    document.getElementById('cart-button').addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert("Tu carrito está vacío. ¡Agrega una gorra primero!");
            return;
        }

        // ----------------------------------------------------
        //  Generación del Mensaje de WhatsApp
        // ----------------------------------------------------
        
        let message = `¡Hola OnKapx! 👋 Quiero hacer un pedido con los siguientes productos:\n\n`;
        let total = 0;
        
        // Agrupar productos por nombre y sumar el total
        const productSummary = {};
        
        cartItems.forEach(item => {
            productSummary[item.name] = (productSummary[item.name] || 0) + 1;
            total += item.price;
        });
        
        // Formatear el resumen del pedido
        for (const name in productSummary) {
            message += `* ${productSummary[name]}x ${name}\n`;
        }
        
        // Añadir el total final
        const formattedTotal = total.toLocaleString('es-CO');
        message += `\n*TOTAL ESTIMADO: $${formattedTotal} COP*\n\n`;
        message += `Por favor, envíame los detalles para el pago y el envío a mi dirección. ¡Gracias!`;
        
        // Codificar el mensaje para la URL
        const encodedMessage = encodeURIComponent(message);
        
        // Crear el enlace completo de WhatsApp
        const whatsappURL = `https://wa.me/${573227496038}?text=${encodedMessage}`;
        
        // Abrir el enlace en una nueva pestaña
        window.open(whatsappURL, '_blank');

        // Resetear el carrito después de generar el enlace (simulación de finalización)
        cartItems = [];
        cartCountElement.textContent = 0;
    });
});