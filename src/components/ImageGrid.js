import React from 'react';

const ImageGrid = ({ category, onImageSelect }) => {
  const images = Array.from({ length: 9 }, (_, i) => `${category}_${i + 1}.webp`);

  return (
    <div className="image-grid">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`${category} ${index + 1}`}
          onClick={() => onImageSelect(src)}
        />
      ))}
    </div>
  );
};

export default ImageGrid; 