'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAppSettings } from '@/config/app-settings';
	
export default function ExtraError() {
	
	const { updateSettings } = useAppSettings();
	
	useEffect(() => {
		updateSettings({
			appHeaderNone: true,
			appSidebarNone: true,
			appContentClass: 'p-0 h-100',
			appContentFullHeight: true
		});
		
		return () => {
			updateSettings({
				appHeaderNone: false,
				appSidebarNone: false,
				appContentClass: '',
				appContentFullHeight: false
			});
		};
		
		// eslint-disable-next-line
	}, []);
	
	return (
		<div className="error">
      <div className="error-code">404</div>
      <div className="error-content">
        <div className="error-message">We couldn&#39;t find it...</div>
        <div className="error-desc mb-4">
          The page you&#39;re looking for doesn&#39;t exist. <br />
          Perhaps, these pages will help find what you&#39;re looking for.
        </div>
        <div>
          <Link href="/" className="btn btn-success px-3">Go Home</Link>
        </div>
      </div>
    </div>
	)
}