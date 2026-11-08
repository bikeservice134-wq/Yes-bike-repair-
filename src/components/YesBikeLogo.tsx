import React, { useState } from 'react';
import yesBikeLogoImg from '../assets/images/yes_bike_service_logo_1791192452539.jpg';

interface YesBikeLogoProps {
  className?: string;
  size?: number;
  alt?: string;
  priority?: boolean;
}

export const YesBikeLogo: React.FC<YesBikeLogoProps> = ({ 
  className = "w-12 h-12", 
  size = 48,
  alt = "YES BIKE SERVICE Logo",
  priority = false,
}) => {
  const [imgSrc, setImgSrc] = useState(yesBikeLogoImg);

  return (
    <img 
      src={imgSrc}
      onError={() => setImgSrc('/logo.jpg')}
      alt={alt}
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // @ts-ignore fetchPriority is supported in React and modern browsers
      fetchPriority={priority ? "high" : "auto"}
      className={`rounded-full object-cover shadow-sm ring-1 ring-amber-400/40 shrink-0 select-none ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

export default YesBikeLogo;
