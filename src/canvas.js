let canvas = null;
let ctx = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let originalImage = null;
let activePointerId = null;

export function showDrawingCanvas(imageSrc) {
  document.querySelector('.image-grid').style.display = 'none';
  document.querySelector('.drawing-container').style.display = 'flex';

  canvas = document.getElementById('drawingCanvas');
  ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    originalImage = img;
    setupDrawingEvents();
  };
  img.src = imageSrc;
}

export function bindControls() {
  document.getElementById('colorPicker').addEventListener('change', (e) => {
    if (ctx) ctx.strokeStyle = e.target.value;
  });
  document.getElementById('brushSize').addEventListener('change', (e) => {
    if (ctx) ctx.lineWidth = e.target.value;
  });
  document.getElementById('clearCanvas').addEventListener('click', () => {
    if (!ctx || !originalImage) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0);
  });
  document.getElementById('backToGrid').addEventListener('click', () => {
    document.querySelector('.image-grid').style.display = 'grid';
    document.querySelector('.drawing-container').style.display = 'none';
  });
}

function setupDrawingEvents() {
  // Idempotent: showDrawingCanvas can run multiple times. Remove any prior
  // listeners before re-attaching so we don't stack handlers across pictures.
  canvas.removeEventListener('pointerdown', startDrawing);
  canvas.removeEventListener('pointermove', draw);
  canvas.removeEventListener('pointerup', stopDrawing);
  canvas.removeEventListener('pointercancel', stopDrawing);

  canvas.addEventListener('pointerdown', startDrawing);
  canvas.addEventListener('pointermove', draw);
  canvas.addEventListener('pointerup', stopDrawing);
  canvas.addEventListener('pointercancel', stopDrawing);
}

function startDrawing(e) {
  isDrawing = true;
  activePointerId = e.pointerId;
  // Capture so pointer events keep firing on this canvas even if the finger
  // drags outside its bounds — otherwise touchmove off-canvas drops events.
  canvas.setPointerCapture(e.pointerId);
  [lastX, lastY] = getCoordinates(e);
}

function draw(e) {
  if (!isDrawing || e.pointerId !== activePointerId) return;
  e.preventDefault();
  const [x, y] = getCoordinates(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
}

function stopDrawing(e) {
  if (e && e.pointerId !== activePointerId) return;
  isDrawing = false;
  activePointerId = null;
}

function getCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  return [x, y];
}
