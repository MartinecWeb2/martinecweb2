'use client';

import { useEffect, useRef } from 'react';

export default function TrustIndex() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // vyčistit při re-renderu
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?dc3adaf611e974869d96a18e73b';
    script.async = true;
    script.defer = true;

    ref.current.appendChild(script);
  }, []);

  return (
    <div
      ref={ref}
      className="trustindex-widget-container"
      style={{ minHeight: 350 }}
    />
  );
}
