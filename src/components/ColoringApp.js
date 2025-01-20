import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../styles/ColoringApp.css';

const ColoringApp = () => {
  const [code, setCode] = useState('');
  const [unlockedImages, setUnlockedImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  const images = [
    { src: 'mermaids.webp', alt: 'Unicorns and Mermaids', code: 'talya', position: { top: 0, left: 0 } },
    { src: 'shapes.webp', alt: 'Shapes', code: '2012', position: { top: 0, right: 0 } },
    { src: 'panda.webp', alt: 'Animals', code: 'sadie', position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } },
    { src: 'trees.webp', alt: 'Trees and Unicorns', code: 'thea', position: { bottom: 0, left: 0 } },
    { src: 'insects.webp', alt: 'Insects', code: 'maren', position: { bottom: 0, right: 0 } },
  ];

  useEffect(() => {
    const h1 = document.querySelector('h1');
    const text = h1.textContent;
    h1.textContent = '';
    [...text].forEach(letter => {
      if (letter !== ' ') {
        const span = document.createElement('span');
        span.textContent = letter;
        h1.appendChild(span);
      } else {
        h1.appendChild(document.createTextNode(' '));
      }
    });
  }, []);

  const checkCode = (value) => {
    setCode(value);
    const newUnlockedImages = { ...unlockedImages };
    
    if (value.toLowerCase() === 'unlock') {
      images.forEach(img => {
        newUnlockedImages[img.src] = true;
      });
    } else {
      const matchingImage = images.find(img => img.code === value.toLowerCase());
      if (matchingImage) {
        newUnlockedImages[matchingImage.src] = true;
      }
    }
    
    setUnlockedImages(newUnlockedImages);
  };

  const handleImageClick = (imageSrc) => {
    if (unlockedImages[imageSrc]) {
      setSelectedCategory(imageSrc.split('.')[0]);
    }
  };

  return (
    <div>
      <h1>Hello, Arya heart!</h1>
      <ol>
        <li>Unicorns and Mermaids</li>
        <li>Shapes</li>
        <li>Trees and Unicorns</li>
        <li>Animals</li>
        <li>Insects</li>
      </ol>
      
      <div>
        <label htmlFor="code">Code:</label>
        <input
          type="text"
          id="code"
          name="code"
          value={code}
          onChange={(e) => checkCode(e.target.value)}
        />
      </div>

      <div style={{ position: 'relative', width: '100%', height: '500px', margin: '20px 0' }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: image.src.includes('panda') ? '250px' : '200px',
              height: image.src.includes('panda') ? '250px' : '200px',
              ...image.position
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleImageClick(image.src);
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: '100%', height: '100%' }}
                className={!unlockedImages[image.src] ? 'locked' : ''}
              />
            </a>
            {!unlockedImages[image.src] && (
              <img
                src="lock.png"
                className="lock-overlay"
                alt="Lock"
                style={{ display: 'block' }}
              />
            )}
          </div>
        ))}
      </div>

      {selectedCategory && (
        <Modal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
};

export default ColoringApp; 