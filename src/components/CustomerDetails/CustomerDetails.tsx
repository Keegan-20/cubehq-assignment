import React, { useState, useEffect } from 'react';
import { Customer } from '../../types/CustomerList';
import './CustomerDetails.css';
import { generateRandomPhotos } from '../../utils/randomImages';

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Reset loaded images and set initial photos
    setLoadedImages(new Set());
    setCurrentPhotos(customer.photos);

    // Fetch unique random photos every 10 seconds
    const fetchPhotos = () => {
      setCurrentPhotos(generateRandomPhotos(9));
    };

    fetchPhotos(); // Fetch initial photos
    const interval = setInterval(fetchPhotos, 10000);

    // Cleanup interval on unmount or customer change
    return () => clearInterval(interval);
  }, [customer]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  // shorten text function
  const shortenText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  
  return (
    <div className="customer-details">
      <h2 className="customer-name">{shortenText(customer.name, 50)}</h2>
      <p className="customer-address">
        <span>Address: </span>{shortenText(customer.address, 100)}
      </p>
      <p className="customer-title">{shortenText(customer.title, 150)}</p>
      <div className="photo-grid">
        {currentPhotos.map((photo, index) => (
          <div key={index} className="photo-container">
            {!loadedImages.has(index) && <div className="shimmer" />}
            <img
              loading="lazy"
              src={photo}
              alt={`photo-${index}`}
              onLoad={() => handleImageLoad(index)}
              className={loadedImages.has(index) ? 'loaded' : ''}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
