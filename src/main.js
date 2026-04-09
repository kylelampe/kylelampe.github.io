import './styles.css';
import { renderGallery, applyCode, renderCategoryList } from './gallery.js';
import { showImageGrid, hideModal } from './grid.js';
import { showDrawingCanvas, bindControls } from './canvas.js';

window.addEventListener('DOMContentLoaded', () => {
  rainbowifyHeading();
  renderCategoryList(document.getElementById('categoryList'));
  renderGallery(document.getElementById('thumbnails'), (cat) => {
    showImageGrid(cat, showDrawingCanvas);
  });
  bindControls();

  document.getElementById('code').addEventListener('input', (e) => {
    applyCode(e.target.value);
  });

  document.querySelector('.close').addEventListener('click', hideModal);
  window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('imageModal')) {
      hideModal();
    }
  });
});

function rainbowifyHeading() {
  const h1 = document.querySelector('h1');
  const text = h1.textContent;
  h1.textContent = '';
  for (const letter of text) {
    if (letter !== ' ') {
      const span = document.createElement('span');
      span.textContent = letter;
      h1.appendChild(span);
    } else {
      h1.appendChild(document.createTextNode(' '));
    }
  }
}
