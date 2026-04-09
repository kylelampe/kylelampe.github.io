export function showImageGrid(category, onPick) {
  const modal = document.getElementById('imageModal');
  const grid = modal.querySelector('.image-grid');
  const drawingContainer = modal.querySelector('.drawing-container');

  grid.style.display = 'grid';
  drawingContainer.style.display = 'none';
  grid.innerHTML = '';

  for (let i = 1; i <= category.count; i++) {
    const img = document.createElement('img');
    img.src = `${category.id}_${i}.webp`;
    img.alt = `${category.label} ${i}`;
    img.addEventListener('click', () => onPick(img.src));
    grid.appendChild(img);
  }

  modal.style.display = 'block';
}

export function hideModal() {
  document.getElementById('imageModal').style.display = 'none';
}
