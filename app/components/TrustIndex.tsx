'use client';

import { useEffect, useRef } from 'react';

export default function TrustIndex() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // vyčistit při re-renderu
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?95f82ff61b54749411564affa0e';
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
