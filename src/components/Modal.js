import React, { useState } from 'react';
import ImageGrid from './ImageGrid';
import DrawingCanvas from './DrawingCanvas';
import '../styles/Modal.css';

const Modal = ({ category, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="modal">
      <span className="close" onClick={onClose}>&times;</span>
      <div className="modal-content">
        {!selectedImage ? (
          <ImageGrid
            category={category}
            onImageSelect={setSelectedImage}
          />
        ) : (
          <DrawingCanvas
            imageSrc={selectedImage}
            onBack={() => setSelectedImage(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Modal; 