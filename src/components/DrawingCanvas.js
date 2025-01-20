import React, { useEffect, useRef, useState } from 'react';

const DrawingCanvas = ({ imageSrc, onBack }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [originalImage, setOriginalImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      setOriginalImage(img);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvas.height) / rect.height;
    return [x, y];
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const [x, y] = getCoordinates(e);
    setLastPos({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;
    
    const [x, y] = getCoordinates(e);
    
    context.beginPath();
    context.moveTo(lastPos.x, lastPos.y);
    context.lineTo(x, y);
    context.stroke();
    
    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (context && originalImage) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.drawImage(originalImage, 0, 0);
    }
  };

  return (
    <div className="drawing-container">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      <div className="drawing-controls">
        <input
          type="color"
          onChange={(e) => context && (context.strokeStyle = e.target.value)}
        />
        <input
          type="range"
          min="1"
          max="50"
          defaultValue="5"
          onChange={(e) => context && (context.lineWidth = e.target.value)}
        />
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={onBack}>Back to Grid</button>
      </div>
    </div>
  );
};

export default DrawingCanvas; 