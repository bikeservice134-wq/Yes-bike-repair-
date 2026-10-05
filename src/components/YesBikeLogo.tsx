import React, { useState } from 'react';
import yesBikeLogoImg from '../assets/images/yes_bike_service_logo_1791192452539.jpg';

interface YesBikeLogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

export const YesBikeLogo: React.FC<YesBikeLogoProps> = ({ 
  className = "w-10 h-10", 
  size,
  alt = "YES BIKE SERVICE Logo" 
}) => {
  const [imgSrc, setImgSrc] = useState(yesBikeLogoImg);

  return (
    <img 
      src={imgSrc}
      onError={() => setImgSrc('/logo.jpg')}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover shadow-sm ring-1 ring-yellow-400/40 shrink-0 select-none ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

export default YesBikeLogo;
