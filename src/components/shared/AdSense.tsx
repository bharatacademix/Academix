import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string; // Your ad unit ID
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  fullWidth?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidth = true,
  style,
  className = '',
}) => {
  useEffect(() => {
    // Push ad request to the AdSense queue
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style,
        }}
        data-ad-client="ca-pub-9096209867795576"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth}
      ></ins>
    </div>
  );
};

// Declare window type for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
