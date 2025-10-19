// Estructura de datos inicial del menú para tienda de computadoras
let menuData = {
    "menu": [
        {
            "id": 1,
            "nombre": "Inicio",
            "enlace": "/inicio"
        },
        {
            "id": 2,
            "nombre": "Computadoras",
            "enlace": "/computadoras",
            "submenu": [
                {
                    "id": 21,
                    "nombre": "Portátiles",
                    "enlace": "/computadoras/portatiles"
                },
                {
                    "id": 22,
                    "nombre": "Computadoras de Escritorio",
                    "enlace": "/computadoras/escritorio"
                },
                {
                    "id": 23,
                    "nombre": "Estaciones de Trabajo",
                    "enlace": "/computadoras/estaciones"
                },
                {
                    "id": 24,
                    "nombre": "Componentes",
                    "enlace": "/computadoras/componentes",
                    "submenu": [
                        {
                            "id": 241,
                            "nombre": "Procesadores",
                            "enlace": "/computadoras/componentes/procesadores"
                        },
                        {
                            "id": 242,
                            "nombre": "Tarjetas Gráficas",
                            "enlace": "/computadoras/componentes/gpu"
                        },
                        {
                            "id": 243,
                            "nombre": "Memoria RAM",
                            "enlace": "/computadoras/componentes/ram"
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "nombre": "Software",
            "enlace": "/software",
            "submenu": [
                {
                    "id": 31,
                    "nombre": "Sistemas Operativos",
                    "enlace": "/software/sistemas-operativos"
                },
                {
                    "id": 32,
                    "nombre": "Suite de Oficina",
                    "enlace": "/software/oficina"
                },
                {
                    "id": 33,
                    "nombre": "Software de Diseño",
                    "enlace": "/software/diseno"
                },
                {
                    "id": 34,
                    "nombre": "Antivirus",
                    "enlace": "/software/antivirus"
                }
            ]
        },
        {
            "id": 4,
            "nombre": "Servicios",
            "enlace": "/servicios",
            "submenu": [
                {
                    "id": 41,
                    "nombre": "Reparación y Mantenimiento",
                    "enlace": "/servicios/reparacion"
                },
                {
                    "id": 42,
                    "nombre": "Instalación de Software",
                    "enlace": "/servicios/instalacion"
                },
                {
                    "id": 43,
                    "nombre": "Asesoría Técnica",
                    "enlace": "/servicios/asesoria"
                }
            ]
        },
        {
            "id": 5,
            "nombre": "Ofertas",
            "enlace": "/ofertas"
        },
        {
            "id": 6,
            "nombre": "Contacto",
            "enlace": "/contacto"
        }
    ]
};

// Datos de productos para mostrar en las páginas
const productData = {
    "/computadoras/portatiles": [
        { name: "Laptop Gamer Pro", price: "$1,299", desc: "Intel i7, 16GB RAM, RTX 3060" },
        { name: "Ultrabook Slim", price: "$899", desc: "Intel i5, 8GB RAM, SSD 512GB" },
        { name: "Laptop Business", price: "$1,099", desc: "Intel i7, 16GB RAM, 1TB SSD" }
    ],
    "/computadoras/escritorio": [
        { name: "Desktop Power", price: "$1,599", desc: "Intel i9, 32GB RAM, RTX 4070" },
        { name: "All-in-One", price: "$999", desc: "Pantalla 24\", Intel i5, 8GB RAM" },
        { name: "Workstation Pro", price: "$2,299", desc: "Doble Xeon, 64GB RAM, Quadro RTX" }
    ],
    "/software/sistemas-operativos": [
        { name: "Windows 11 Pro", price: "$199", desc: "Licencia completa" },
        { name: "Ubuntu Linux", price: "Gratis", desc: "Descarga directa" },
        { name: "macOS Monterey", price: "Incluido", desc: "Solo para Mac" }
    ],
    "/software/oficina": [
        { name: "Microsoft 365", price: "$99/año", desc: "Suscripción anual" },
        { name: "LibreOffice", price: "Gratis", desc: "Suite completa" },
        { name: "Google Workspace", price: "$72/año", desc: "Plan Business" }
    ]
};

// Elementos del DOM
const menuContainer = document.getElementById('menuContainer');
const menuForm = document.getElementById('menuForm');
const itemId = document.getElementById('itemId');
const itemName = document.getElementById('itemName');
const itemLink = document.getElementById('itemLink');
const parentItem = document.getElementById('parentItem');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const cancelBtn = document.getElementById('cancelBtn');
const menuItemsList = document.getElementById('menuItemsList');
const currentPage = document.getElementById('currentPage');
const menuToggle = document.getElementById('menuToggle');
const resetMenuBtn = document.getElementById('resetMenu');

// Variables para el modo de edición
let editingItemId = null;

// Función para generar el menú
function generateMenu() {
    menuContainer.innerHTML = '';
    const menuList = document.createElement('ul');
    menuList.className = 'menu';
    
    // Generar elementos del menú principal
    menuData.menu.forEach(item => {
        const menuItem = createMenuItem(item);
        menuList.appendChild(menuItem);
    });
    
    menuContainer.appendChild(menuList);
    updateParentSelect();
    updateMenuItemsList();
}

// Función para crear un elemento del menú (recursiva para submenús)
function createMenuItem(item) {
    const li = document.createElement('li');
    li.className = 'menu-item';
    li.dataset.id = item.id;
    
    const a = document.createElement('a');
    a.href = item.enlace;
    a.className = 'menu-link';
    a.textContent = item.nombre;
    
    // Prevenir la navegación real y mostrar la página actual
    a.addEventListener('click', function(e) {
        e.preventDefault();
        showCurrentPage(item.nombre, item.enlace);
    });
    
    li.appendChild(a);
    
    // Si tiene submenú, crearlo
    if (item.submenu && item.submenu.length > 0) {
        a.classList.add('has-submenu');
        
        const submenu = document.createElement('ul');
        submenu.className = 'submenu';
        
        item.submenu.forEach(subItem => {
            const subMenuItem = createMenuItem(subItem);
            submenu.appendChild(subMenuItem);
        });
        
        li.appendChild(submenu);
        
        // Evento para mostrar/ocultar submenú
        a.addEventListener('click', function(e) {
            e.stopPropagation();
            submenu.classList.toggle('active');
        });
    }
    
    return li;
}

// Función para mostrar la página actual
function showCurrentPage(name, link) {
    let content = '';
    
    // Contenido específico para cada página
    switch(link) {
        case '/inicio':
            content = `
                <h3>Bienvenido a TechShop</h3>
                <p>Tu tienda de confianza para computadoras y software de alta calidad.</p>
                <div class="product-grid">
                    <div class="product-card">
                        <div class="product-image">💻</div>
                        <div class="product-info">
                            <h4>Computadoras</h4>
                            <p>Encuentra el equipo perfecto para tus necesidades</p>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="product-image">🛡️</div>
                        <div class="product-info">
                            <h4>Software</h4>
                            <p>Los mejores programas y sistemas operativos</p>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="product-image">🔧</div>
                        <div class="product-info">
                            <h4>Servicios</h4>
                            <p>Reparación, instalación y asesoría técnica</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case '/ofertas':
            content = `
                <h3>Ofertas Especiales</h3>
                <p>Aprovecha nuestras promociones exclusivas:</p>
                <div class="product-grid">
                    <div class="product-card">
                        <div class="product-image">🔥</div>
                        <div class="product-info">
                            <h4>Laptop Gamer</h4>
                            <p><strong>25% OFF</strong> - Antes $1,599 - Ahora $1,199</p>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="product-image">🔥</div>
                        <div class="product-info">
                            <h4>Windows 11 Pro</h4>
                            <p><strong>15% OFF</strong> - Antes $199 - Ahora $169</p>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="product-image">🔥</div>
                        <div class="product-info">
                            <h4>Antivirus Total</h4>
                            <p><strong>50% OFF</strong> - 1 año de protección</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case '/contacto':
            content = `
                <h3>Contacto</h3>
                <p>Estamos aquí para ayudarte:</p>
                <p><strong>Teléfono:</strong> (829) 533-4418</p>
                <p><strong>Email:</strong> info@redtech.com</p>
                <p><strong>Dirección:</strong> Av. Tecnología 123, Ciudad Digital</p>
                <p><strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00</p>
            `;
            break;
        default:
            // Verificar si hay productos para esta categoría
            if (productData[link]) {
                content = `<h3>${name}</h3><p>Explora nuestros productos:</p>`;
                content += '<div class="product-grid">';
                productData[link].forEach(product => {
                    content += `
                        <div class="product-card">
                            <div class="product-image">📦</div>
                            <div class="product-info">
                                <h4>${product.name}</h4>
                                <p><strong>${product.price}</strong></p>
                                <p>${product.desc}</p>
                            </div>
                        </div>
                    `;
                });
                content += '</div>';
            } else {
                content = `
                    <h3>${name}</h3>
                    <p>Esta es la página de ${name}. En una aplicación real, aquí mostraríamos los productos y servicios relacionados.</p>
                    <p>Enlace: <code>${link}</code></p>
                `;
            }
    }
    
    currentPage.innerHTML = content;
}

// Función para actualizar el selector de menú padre
function updateParentSelect() {
    parentItem.innerHTML = '<option value="">-- Menú principal --</option>';
    
    // Función recursiva para agregar opciones
    function addOptions(items, level = 0) {
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = '→ '.repeat(level) + item.nombre;
            parentItem.appendChild(option);
            
            if (item.submenu && item.submenu.length > 0) {
                addOptions(item.submenu, level + 1);
            }
        });
    }
    
    addOptions(menuData.menu);
}

// Función para actualizar la lista de opciones del menú
function updateMenuItemsList() {
    menuItemsList.innerHTML = '';
    
    // Función recursiva para mostrar elementos
    function displayItems(items, level = 0) {
        items.forEach(item => {
            const div = document.createElement('div');
            div.style.paddingLeft = `${level * 20}px`;
            div.style.marginBottom = '10px';
            div.style.padding = '10px';
            div.style.backgroundColor = level % 2 === 0 ? '#f8f9fa' : '#e9ecef';
            div.style.borderRadius = '4px';
            
            div.innerHTML = `
                <strong>${item.nombre}</strong> (ID: ${item.id}) - ${item.enlace}
                <div style="margin-top: 5px;">
                    <button class="edit-btn" data-id="${item.id}">Editar</button>
                    <button class="delete-btn" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            
            menuItemsList.appendChild(div);
            
            if (item.submenu && item.submenu.length > 0) {
                displayItems(item.submenu, level + 1);
            }
        });
    }
    
    displayItems(menuData.menu);
    
    // Agregar eventos a los botones
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            editMenuItem(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            deleteMenuItem(id);
        });
    });
}

// Función para agregar o actualizar un elemento del menú
menuForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = parseInt(itemId.value);
    const name = itemName.value;
    const link = itemLink.value;
    const parentId = parentItem.value ? parseInt(parentItem.value) : null;
    
    // Validar ID único
    if (!editingItemId && findMenuItem(id, menuData.menu)) {
        alert('El ID ya existe. Por favor, usa un ID único.');
        return;
    }
    
    // Validar enlace
    if (!isValidLink(link)) {
        alert('El enlace debe comenzar con "/"');
        return;
    }
    
    const newItem = {
        id: id,
        nombre: name,
        enlace: link
    };
    
    if (editingItemId) {
        // Actualizar elemento existente
        updateMenuItem(editingItemId, newItem);
        resetForm();
    } else {
        // Agregar nuevo elemento
        if (parentId) {
            // Agregar como submenú
            addSubmenuItem(parentId, newItem);
        } else {
            // Agregar al menú principal
            menuData.menu.push(newItem);
        }
        
        resetForm();
        generateMenu();
    }
});

// Función para buscar un elemento del menú por ID
function findMenuItem(id, items) {
    for (const item of items) {
        if (item.id === id) {
            return item;
        }
        
        if (item.submenu) {
            const found = findMenuItem(id, item.submenu);
            if (found) return found;
        }
    }
    
    return null;
}

// Función para encontrar el padre de un elemento del menú
function findMenuItemParent(id, items, parent = null) {
    for (const item of items) {
        if (item.id === id) {
            return { parent, item };
        }
        
        if (item.submenu) {
            const found = findMenuItemParent(id, item.submenu, item);
            if (found) return found;
        }
    }
    
    return null;
}

// Función para agregar un elemento como submenú
function addSubmenuItem(parentId, newItem) {
    const parent = findMenuItem(parentId, menuData.menu);
    if (parent) {
        if (!parent.submenu) {
            parent.submenu = [];
        }
        parent.submenu.push(newItem);
        generateMenu();
    }
}

// Función para editar un elemento del menú
function editMenuItem(id) {
    const item = findMenuItem(id, menuData.menu);
    if (item) {
        itemId.value = item.id;
        itemName.value = item.nombre;
        itemLink.value = item.enlace;
        
        // Encontrar el padre del elemento
        const parentInfo = findMenuItemParent(id, menuData.menu);
        if (parentInfo && parentInfo.parent) {
            parentItem.value = parentInfo.parent.id;
        } else {
            parentItem.value = "";
        }
        
        editingItemId = id;
        addBtn.style.display = 'none';
        updateBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        
        itemId.disabled = true;
    }
}

// Función para actualizar un elemento del menú
function updateMenuItem(id, updatedItem) {
    const item = findMenuItem(id, menuData.menu);
    if (item) {
        // Encontrar el padre actual
        const parentInfo = findMenuItemParent(id, menuData.menu);
        const currentParent = parentInfo ? parentInfo.parent : null;
        
        // Si cambió el padre, mover el elemento
        const newParentId = parentItem.value ? parseInt(parentItem.value) : null;
        const newParent = newParentId ? findMenuItem(newParentId, menuData.menu) : null;
        
        if (currentParent !== newParent) {
            // Eliminar del padre actual
            if (currentParent) {
                currentParent.submenu = currentParent.submenu.filter(i => i.id !== id);
            } else {
                menuData.menu = menuData.menu.filter(i => i.id !== id);
            }
            
            // Agregar al nuevo padre
            if (newParent) {
                if (!newParent.submenu) {
                    newParent.submenu = [];
                }
                newParent.submenu.push(updatedItem);
            } else {
                menuData.menu.push(updatedItem);
            }
        } else {
            // Actualizar en el mismo lugar
            item.nombre = updatedItem.nombre;
            item.enlace = updatedItem.enlace;
        }
        
        generateMenu();
    }
}

// Función para eliminar un elemento del menú
function deleteMenuItem(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
        const parentInfo = findMenuItemParent(id, menuData.menu);
        
        if (parentInfo) {
            if (parentInfo.parent) {
                // Eliminar de submenú
                parentInfo.parent.submenu = parentInfo.parent.submenu.filter(item => item.id !== id);
            } else {
                // Eliminar del menú principal
                menuData.menu = menuData.menu.filter(item => item.id !== id);
            }
            
            generateMenu();
        }
    }
}

// Función para resetear el formulario
function resetForm() {
    menuForm.reset();
    editingItemId = null;
    addBtn.style.display = 'inline-block';
    updateBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    itemId.disabled = false;
}

// Función para validar enlace
function isValidLink(link) {
    return link.startsWith('/');
}

// Evento para el botón cancelar
cancelBtn.addEventListener('click', resetForm);

// Evento para el botón de toggle del menú en móviles
menuToggle.addEventListener('click', function() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
});

// Evento para el botón de resetear menú
resetMenuBtn.addEventListener('click', function() {
    if (confirm('¿Restaurar el menú original? Se perderán todos los cambios.')) {
        // Restaurar datos originales
        menuData = {
            "menu": [
                {
                    "id": 1,
                    "nombre": "Inicio",
                    "enlace": "/inicio"
                },
                {
                    "id": 2,
                    "nombre": "Computadoras",
                    "enlace": "/computadoras",
                    "submenu": [
                        {
                            "id": 21,
                            "nombre": "Portátiles",
                            "enlace": "/computadoras/portatiles"
                        },
                        {
                            "id": 22,
                            "nombre": "Computadoras de Escritorio",
                            "enlace": "/computadoras/escritorio"
                        },
                        {
                            "id": 23,
                            "nombre": "Estaciones de Trabajo",
                            "enlace": "/computadoras/estaciones"
                        },
                        {
                            "id": 24,
                            "nombre": "Componentes",
                            "enlace": "/computadoras/componentes",
                            "submenu": [
                                {
                                    "id": 241,
                                    "nombre": "Procesadores",
                                    "enlace": "/computadoras/componentes/procesadores"
                                },
                                {
                                    "id": 242,
                                    "nombre": "Tarjetas Gráficas",
                                    "enlace": "/computadoras/componentes/gpu"
                                },
                                {
                                    "id": 243,
                                    "nombre": "Memoria RAM",
                                    "enlace": "/computadoras/componentes/ram"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 3,
                    "nombre": "Software",
                    "enlace": "/software",
                    "submenu": [
                        {
                            "id": 31,
                            "nombre": "Sistemas Operativos",
                            "enlace": "/software/sistemas-operativos"
                        },
                        {
                            "id": 32,
                            "nombre": "Suite de Oficina",
                            "enlace": "/software/oficina"
                        },
                        {
                            "id": 33,
                            "nombre": "Software de Diseño",
                            "enlace": "/software/diseno"
                        },
                        {
                            "id": 34,
                            "nombre": "Antivirus",
                            "enlace": "/software/antivirus"
                        }
                    ]
                },
                {
                    "id": 4,
                    "nombre": "Servicios",
                    "enlace": "/servicios",
                    "submenu": [
                        {
                            "id": 41,
                            "nombre": "Reparación y Mantenimiento",
                            "enlace": "/servicios/reparacion"
                        },
                        {
                            "id": 42,
                            "nombre": "Instalación de Software",
                            "enlace": "/servicios/instalacion"
                        },
                        {
                            "id": 43,
                            "nombre": "Asesoría Técnica",
                            "enlace": "/servicios/asesoria"
                        }
                    ]
                },
                {
                    "id": 5,
                    "nombre": "Ofertas",
                    "enlace": "/ofertas"
                },
                {
                    "id": 6,
                    "nombre": "Contacto",
                    "enlace": "/contacto"
                }
            ]
        };
        
        generateMenu();
        showCurrentPage('Inicio', '/inicio');
    }
});

// Inicializar la aplicación
generateMenu();
showCurrentPage('Inicio', '/inicio');