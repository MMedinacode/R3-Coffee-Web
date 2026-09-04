/* ---------- LOCALES (horarios reales tomados de Instagram @r3coffee_ y r3coffee.cl) ---------- */
const LOCATIONS = [
  {
    key:'miraflores', name:'Miraflores 537', zone:'Bellas Artes',
    address:'Miraflores 537, Santiago Centro',
    desc:'El local original de R3, chico y encantador, con mesas adentro y en el frontis. Acá empezó todo en 2022.',
    hours:{weekday:[7*60+30,20*60], saturday:[9*60,18*60], sunday:[9*60,18*60]},
    hoursText:'Lunes a viernes 7:30–20:00 · Sábado, domingo y feriados 9:00–18:00',
    mapsQuery:'Miraflores 537, Santiago'
  },
  {
    key:'merced', name:'Merced 649', zone:'Santiago Centro',
    address:'Merced 649, Santiago Centro',
    desc:'Segundo local de la marca, mismo cariño por el grano y la misma atención personalizada de siempre.',
    hours:{weekday:[8*60,18*60], saturday:[9*60,13*60+30], sunday:null},
    hoursText:'Lunes a viernes 8:00–18:00 · Sábado 9:00–13:30 · Domingo y feriados cerrado',
    mapsQuery:'Merced 649, Santiago'
  },
  {
    key:'londres', name:'Londres 42', zone:'Barrio Lastarria',
    address:'Londres 42, Santiago Centro',
    desc:'El local más nuevo de R3, en pleno barrio Lastarria — mismo tueste, mismo estándar.',
    hours:{weekday:[8*60,19*60+30], saturday:[9*60,14*60], sunday:[9*60,14*60]},
    hoursText:'Lunes a viernes 8:00–19:30 · Sábado, domingo y feriados 9:00–14:00',
    mapsQuery:'Londres 42, Santiago'
  }
];

const locCardsEl = document.getElementById('locCards');
const LOC_PHOTOS = {
  miraflores:'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop',
  merced:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
  londres:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop'
};

LOCATIONS.forEach(loc => {
  const isOpen = computeStatus(loc);
  const card = document.createElement('div');
  card.className = 'loc-card';
  card.onclick = () => openLocModal(loc.key);
  card.innerHTML = `
    <div class="loc-photo"><img src="${LOC_PHOTOS[loc.key]}" alt="${loc.name}"></div>
    <div class="loc-body">
      <span class="loc-zone">${loc.zone}</span>
      <h3>${loc.name}</h3>
      <div class="loc-status"><span class="status-dot ${isOpen ? '' : 'closed'}"></span> ${isOpen ? 'Abierto ahora' : 'Cerrado ahora'}</div>
      <span class="loc-cta">Ver detalles y mapa →</span>
    </div>`;
  locCardsEl.appendChild(card);
});
// FOTOGRAFÍAS DE EJEMPLO: idealmente una foto real por cada local, no una genérica compartida

function openLocModal(key){
  const loc = LOCATIONS.find(l => l.key === key);
  if(!loc) return;
  const isOpen = computeStatus(loc);
  document.getElementById('locModalZone').textContent = loc.zone;
  document.getElementById('locModalName').textContent = loc.name;
  document.getElementById('locModalAddress').textContent = loc.address;
  document.getElementById('locModalHours').textContent = loc.hoursText;
  const statusEl = document.getElementById('locModalStatus');
  statusEl.textContent = isOpen ? 'Abierto ahora' : 'Cerrado ahora';
  statusEl.style.color = isOpen ? '#4c7a3f' : '#b6543c';
  document.getElementById('locModalMap').src = 'https://www.google.com/maps?q=' + encodeURIComponent(loc.mapsQuery) + '&output=embed';
  document.getElementById('locModalDirections').href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(loc.mapsQuery);
  toggleLocModal(true);
}
function toggleLocModal(open){ document.getElementById('locModalOverlay').classList.toggle('open', open); }

function computeStatus(loc){
  const now = new Date();
  const day = now.getDay(); // 0 dom ... 6 sáb
  const minutes = now.getHours()*60 + now.getMinutes();
  let range;
  if(day === 0) range = loc.hours.sunday;
  else if(day === 6) range = loc.hours.saturday;
  else range = loc.hours.weekday;
  if(!range) return false;
  return minutes >= range[0] && minutes < range[1];
}

(function(){
  const first = LOCATIONS[0];
  const isOpen = computeStatus(first);
  document.getElementById('statusText').textContent = (isOpen ? 'Abierto ahora' : 'Cerrado ahora') + ' en ' + first.name;
  document.getElementById('statusDot').classList.toggle('closed', !isOpen);
})();

/* ---------- CARTA (precios reales: letrero físico para café + PDF Menú Verano 2026 para comida) ---------- */
const MENU = {
  caliente: {
    label:'Café caliente',
    groups:[{title:'Calientes', items:[
      {n:'Espresso', p:2300},
      {n:'Machiatto', p:2400},
      {n:'Gibraltar', p:2500},
      {n:'Cappuccino', p:2600},
      {n:'Flat White', p:2600},
      {n:'Latte', p:2900},
      {n:'Mocaccino', p:3100},
      {n:'Latte Machiatto', p:3200},
      {n:'Mega Cappuccino', p:3400},
      {n:'Mega Mocaccino', p:3500},
      {n:'Batch Brew / Americano — Pequeño', p:2300},
      {n:'Batch Brew / Americano — Mediano', p:2500},
      {n:'Batch Brew / Americano — Grande', p:2900},
      {n:'Filtrado V60', p:0, d:'Consulta el origen disponible con tu barista'},
    ]}]
  },
  fria: {
    label:'Café frío',
    groups:[{title:'Frías', items:[
      {n:'Ice Latte', p:0, d:'Consulta precio del día'},
      {n:'Ice vainilla / caramelo', p:3200},
      {n:'Ginger Espresso', p:3800},
      {n:'Tónic Espresso', p:3800},
      {n:'Cold Brew', p:3200},
      {n:'Matcha Latte (frío)', p:3500},
      {n:'Matcha Tónic', p:3800},
      {n:'Affogato', p:3500},
      {n:'Choco Ice Óbolo / Bohemia', p:3500},
      {n:'Ice Tea', p:3000},
      {n:'New Orleans', p:3300},
    ]}]
  },
  invierno: {
    label:'Infusiones',
    groups:[{title:'Invierno', items:[
      {n:'Chai Latte', p:3500},
      {n:'Té e infusiones', p:2500},
      {n:'Matcha Latte (caliente)', p:3500},
      {n:'Chocolate caliente', p:3200},
      {n:'Chocolate Óbolo 62%', p:3500},
      {n:'Dirty Chai Latte', p:3700},
      {n:'Irlandés', p:0, d:'Consulta precio del día'},
    ]},
    { title:'Extras', items:[
      {n:'Shot espresso extra', p:600},
      {n:'Bebida vegetal (avena / almendra)', p:300, d:'Desde $300, según tamaño: $300 / $500 / $700 / $900'},
      {n:'Extra syrup (caramelo, vainilla, crema irlandesa)', p:700},
    ]}]
  },
  pasteleria: {
    label:'Pastelería',
    groups:[{title:'Pastelería', items:[
      {n:'Queque zanahoria', p:2300},
      {n:'Queque banana chips', p:2600},
      {n:'Queque de limón', p:3800},
      {n:'Bolo de chocolate', p:2800},
      {n:'Mini muffin vegan', p:1100, v:1},
      {n:'Canelé', p:1700},
      {n:'Financier', p:1700},
      {n:'Macarrón', p:1600},
      {n:'Galletones', p:1900},
      {n:'Galletón relleno', p:3000},
      {n:'Pastel de nata', p:1900},
      {n:'Pan de queso', p:1300, v:1},
      {n:'Croissant jamón y queso', p:4200},
    ]}]
  },
  toasts: {
    label:'Toasts y bowl',
    groups:[{title:'Toasts', items:[
      {n:'Clásicas', p:4900, v:1, d:'Palta con toque de pimienta y sal de mar'},
      {n:'Encurtidos', p:5200, v:1, d:'Palta, cebolla morada encurtida y semillas de mostaza by María'},
      {n:'Hummus', p:5200, v:1, d:'Hummus, tomate cherry, pickles y semillas de mostaza dulce by María'},
      {n:'Serrano', p:5500, d:'Palta, jamón serrano, aceite de oliva y sal de mar'},
      {n:'Patagonia Toast', p:5500, d:'Palta, salmón con toque de eneldo y semillas de sésamo'},
      {n:'Banana Toast', p:5500, v:1, d:'Mantequilla de maní, banana flambeada con canela, yogurt griego, mermelada de temporada, menta y arándanos'},
    ]},
    {title:'Bowl', items:[
      {n:'Bowl yogurt con granola y frutas', p:4500, v:1, d:'Yogurt griego sin lactosa, mantequilla de maní, granola artesanal, frutas de temporada y un toque de miel'},
    ]}]
  },
  sandwiches: {
    label:'Sandwiches',
    groups:[{title:'Sandwiches', items:[
      {n:'Caprese', p:6500, v:1, d:'Queso mozzarella, aceituna, pesto, tomate'},
      {n:'Pastrami', p:6800, d:'Pastrami, palta, pickles, cebolla morada by María'},
      {n:'Napolitano', p:6500, d:'Jamón ahumado artesanal, queso mantecoso, tomate y toque de orégano'},
      {n:'Patagonia', p:6800, d:'Salmón, palta, rúcula, aceite de oliva'},
      {n:'BLT', p:6800, d:'Bacon con syrup de maple, tomate, lechuga, not mayo'},
      {n:'Jamón Serrano', p:6800, d:'Jamón serrano, queso mozzarella, rúcula, aceituna, aceite de oliva'},
      {n:'Queso Kimchi', p:6500, v:1, d:'Queso mantecoso con kimchi'},
      {n:'Jamón Palta', p:6500, d:'Jamón ahumado artesanal, palta, tomate, pickles by María, aceite de oliva'},
    ]}]
  }
};

const money = n => n === 0 ? 'Consultar' : '$' + n.toLocaleString('es-CL');

const tabsEl = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');
const catKeys = Object.keys(MENU);

catKeys.forEach((key, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i===0 ? ' active':'');
  tab.textContent = MENU[key].label;
  tab.onclick = () => showTab(key);
  tab.dataset.key = key;
  tabsEl.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i===0 ? ' active':'');
  panel.id = 'panel-' + key;
  MENU[key].groups.forEach(group => {
    if(group.title && MENU[key].groups.length > 1){
      const h = document.createElement('div');
      h.style.cssText = 'font-family:Space Mono,monospace;font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin:28px 0 12px;font-weight:700;';
      h.textContent = group.title;
      panel.appendChild(h);
    }
    const grid = document.createElement('div');
    grid.className = 'menu-grid';
    group.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'menu-item';
      row.onclick = () => openModal(item);
      row.innerHTML = `
        <div class="menu-item-text">
          <span class="name">${item.n}</span>${item.v ? '<span class="veg-tag">VEG</span>' : ''}
          ${item.d ? `<div class="desc">${item.d}</div>` : ''}
        </div>
        <div class="price mono">${money(item.p)}</div>`;
      grid.appendChild(row);
    });
    panel.appendChild(grid);
  });
  panelsEl.appendChild(panel);
});

function showTab(key){
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.toggle('active', t.dataset.key === key));
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + key));
}

/* ---------- MODAL PRODUCTO ---------- */
let currentItem = null;
function openModal(item){
  if(item.p === 0){ return; } // sin precio confirmado, no se agrega al pedido
  currentItem = item;
  document.getElementById('modalName').textContent = item.n + (item.v ? ' (vegano/vegetariano)' : '');
  document.getElementById('modalPrice').textContent = money(item.p);
  document.getElementById('modalDesc').textContent = item.d || 'Preparado del día en R3 Coffee.';
  toggleModal(true);
}
document.getElementById('modalAddBtn').onclick = () => {
  if(currentItem){ addToCart(currentItem); }
  toggleModal(false);
  toggleCart(true);
};
function toggleModal(open){ document.getElementById('modalOverlay').classList.toggle('open', open); }

/* ---------- CARRITO ---------- */
let cart = [];
function addToCart(item){
  const existing = cart.find(c => c.n === item.n);
  if(existing){ existing.qty++; } else { cart.push({...item, qty:1}); }
  renderCart();
}
function changeQty(name, delta){
  const line = cart.find(c => c.n === name);
  if(!line) return;
  line.qty += delta;
  if(line.qty <= 0) cart = cart.filter(c => c.n !== name);
  renderCart();
}
function renderCart(){
  const linesEl = document.getElementById('cartLines');
  const count = cart.reduce((a,c) => a + c.qty, 0);
  document.getElementById('cartCount').textContent = count;
  if(cart.length === 0){
    linesEl.innerHTML = '<p class="cart-empty">Todavía no agregaste nada.</p>';
  } else {
    linesEl.innerHTML = cart.map(c => `
      <div class="cart-line">
        <div>
          <div class="name">${c.n}</div>
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty('${c.n.replace(/'/g,"\\'")}', -1)">–</button>
            <span class="mono">${c.qty}</span>
            <button class="qty-btn" onclick="changeQty('${c.n.replace(/'/g,"\\'")}', 1)">+</button>
          </div>
        </div>
        <div class="mono">${money(c.p * c.qty)}</div>
      </div>`).join('');
  }
  const total = cart.reduce((a,c) => a + c.p*c.qty, 0);
  document.getElementById('cartTotal').textContent = money(total);
}
function toggleCart(open){ document.getElementById('cartOverlay').classList.toggle('open', open); }
renderCart();

/* ---------- NAV MÓVIL ---------- */
document.getElementById('navToggle').addEventListener('click', function(){
  document.getElementById('navLinks').classList.toggle('open');
});

/* ---------- NAVEGACIÓN SPA POR PESTAÑAS ---------- */
const panels = document.querySelectorAll('.tab-panel');

function goToTab(tabId){
  panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === tabId));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('navLinks').classList.remove('open');
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    goToTab(el.dataset.tab);
  });
});
