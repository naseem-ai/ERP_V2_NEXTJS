'use client';

import React, { useEffect, useRef, CSSProperties, ReactNode } from 'react';

// Card Component
export function Card({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: CSSProperties; }) {
	return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}

// Card Header
export function CardHeader({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: CSSProperties; }) {
  return (
    <div className={`card-header ${className}`} style={style}>
      {children}
    </div>
  );
}

// Card Body
export function CardBody({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: CSSProperties; }) {
  return (
    <div className={`card-body ${className}`} style={style}>
      {children}
    </div>
  );
}

// Card Image Overlay
export function CardImgOverlay({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: CSSProperties; }) {
  return (
    <div className={`card-img-overlay  ${className}`} style={style}>
      {children}
    </div>
  );
}

// Card Footer
export function CardFooter({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: CSSProperties; }) {
  return (
    <div className={`card-footer  ${className}`} style={style}>
      {children}
    </div>
  );
}

// Card Group
export function CardGroup({ children, className = '', style = {} }: { children: ReactNode; className?: string; style?: CSSProperties; }) {
  return (
    <div className={`card-group  ${className}`} style={style}>
      {children}
    </div>
  );
}

// Card Expand Toggler
export function CardExpandToggler() {
  const tooltipRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
		const tooltipElement = tooltipRef.current;

    if (tooltipElement && window.bootstrap) {
      const tooltipInstance = new window.bootstrap.Tooltip(tooltipElement, {
        title: 'Expand / Compress',
        placement: 'bottom',
        trigger: 'hover',
      });

      return () => {
        tooltipInstance.dispose();
      };
    }
  }, []);

  const toggleCardExpand = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = (e.target as HTMLElement).closest('.card');
    const targetClass = 'card-expand';

    if (document.body.classList.contains(targetClass) && target && target.classList.contains(targetClass)) {
      target.removeAttribute('style');
      target.classList.remove(targetClass);
      document.body.classList.remove(targetClass);
    } else {
      document.body.classList.add(targetClass);
      if (target) {
      	target.classList.add(targetClass);
      }
    }

    window.dispatchEvent(new Event('resize'));
  };

  return (
    <a
      href="#/"
      onClick={toggleCardExpand}
      ref={tooltipRef}
      className="text-body text-opacity-50 text-decoration-none"
    >
      <i className="fa fa-fw fa-expand"></i> Expand
    </a>
  );
}