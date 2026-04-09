import { categories } from './categories.js';

export function renderGallery(container, onOpen) {
  for (const cat of categories) {
    const wrap = document.createElement('div');
    wrap.className = `thumb slot-${cat.slot}`;
    wrap.dataset.id = cat.id;

    const img = document.createElement('img');
    img.src = `${cat.id}.webp`;
    img.alt = cat.label;
    img.classList.add('locked');

    const lock = document.createElement('img');
    lock.src = 'lock.png';
    lock.alt = 'Lock';
    lock.className = 'lock-overlay';
    lock.style.display = 'block';

    wrap.append(img, lock);
    wrap.addEventListener('click', () => {
      if (!img.classList.contains('locked')) onOpen(cat);
    });

    container.appendChild(wrap);
  }
}

export function applyCode(value) {
  const code = value.toLowerCase();
  for (const cat of categories) {
    if (code !== 'unlock' && code !== cat.code) continue;
    const wrap = document.querySelector(`.thumb[data-id="${cat.id}"]`);
    if (!wrap) continue;
    const img = wrap.querySelector('img:not(.lock-overlay)');
    img.classList.remove('locked');
    const lock = wrap.querySelector('.lock-overlay');
    if (lock) lock.style.display = 'none';
  }
}

export function renderCategoryList(ol) {
  for (const cat of categories) {
    const li = document.createElement('li');
    li.textContent = cat.label;
    ol.appendChild(li);
  }
}
