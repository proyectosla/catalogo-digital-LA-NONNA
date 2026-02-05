const products = [
    {
        id: 1,
        nombre: "Arepas Clásicas",
        descripcion: "Maíz pilado blanco y sal.",
        opciones: [
            { peso: "325g", precio: 5000 },
            { peso: "500g", precio: 7000 }
        ]
    },
    {
        id: 2,
        nombre: "Arepas Premium",
        descripcion: "Maíz pilado, mozzarella, mantequilla y toque dulce.",
        opciones: [
            { peso: "500g", precio: 8000 }
        ]
    },
    {
        id: 3,
        nombre: "La Arepa Consentida",
        descripcion: "Maíz pilado blanco, mozzarella y sal.",
        opciones: [
            { peso: "500g", precio: 8000 }
        ]
    }
];

let selectedItem = {};

function loadProducts() {
    const container = document.getElementById('catalog-container');
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <div class="selectors">
                <select id="p-${p.id}" onchange="calc(${p.id})">
                    ${p.opciones.map(o => `<option value="${o.precio}">${o.peso}</option>`).join('')}
                </select>
                <select id="c-${p.id}" onchange="calc(${p.id})">
                    ${[1,2,3,4,5].map(n => `<option value="${n}">${n} Pack</option>`).join('')}
                </select>
            </div>
            <div class="price-box">
                <span class="unit-price">Precio: $<span id="u-${p.id}">${p.opciones[0].precio}</span></span>
                <span class="total-price">Total: $<span id="t-${p.id}">${p.opciones[0].precio}</span></span>
            </div>
            <button class="btn-capsule" onclick="preOrder(${p.id})">Solicitar Pedido</button>
        `;
        container.appendChild(div);
    });
}

function calc(id) {
    const p = document.getElementById(`p-${id}`).value;
    const c = document.getElementById(`c-${id}`).value;
    document.getElementById(`u-${id}`).innerText = parseInt(p).toLocaleString();
    document.getElementById(`t-${id}`).innerText = (p * c).toLocaleString();
}

function openZoom(src) {
    document.getElementById('img-expanded').src = src;
    document.getElementById('image-modal').style.display = 'flex';
}

function closeZoom() { document.getElementById('image-modal').style.display = 'none'; }

function preOrder(id) {
    const p = products.find(x => x.id === id);
    const peso = document.getElementById(`p-${id}`).options[document.getElementById(`p-${id}`).selectedIndex].text;
    const cant = document.getElementById(`c-${id}`).value;
    const total = document.getElementById(`t-${id}`).innerText;
    selectedItem = { nombre: p.nombre, peso, cant, total };
    document.getElementById('summary-text').innerText = `${cant}x ${p.nombre} (${peso})`;
    document.getElementById('order-modal').style.display = 'flex';
}

function closeModal() { document.getElementById('order-modal').style.display = 'none'; }

function sendOrder() {
    const nom = document.getElementById('user-name').value;
    const tel = document.getElementById('user-phone').value;
    if(!nom || !tel) return alert("Completa tus datos");
    const msg = `*Pedido La Nonna*%0A*Cliente:* ${nom}%0A*Producto:* ${selectedItem.nombre}%0A*Cantidad:* ${selectedItem.cant} (${selectedItem.peso})%0A*Total:* $${selectedItem.total}`;
    window.open(`https://wa.me/573025990381?text=${msg}`, '_blank');
    closeModal();
}

window.onload = loadProducts;