'use client';

// css
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '@/styles/nextjs.scss';

import { useEffect, useCallback } from 'react';
import Header from '@/components/header/header';
import TopMenu from '@/components/top-menu/top-menu';
import Sidebar from '@/components/sidebar/sidebar';
import SidebarRight from '@/components/sidebar-right/sidebar-right';
import ThemePanel from '@/components/theme-panel/theme-panel';
import { AppSettingsProvider, useAppSettings } from '@/config/app-settings';

function Layout({ children }: { children: React.ReactNode }) {
  const { settings } = useAppSettings();
  
  const handleScroll = useCallback(() => {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    	const totalScroll = window.scrollY;
			const elm = document.querySelector('.app');
			
			if (elm) {
				if (totalScroll > 0) {
					elm.classList.add('has-scroll');
				} else {
					elm.classList.remove('has-scroll');
				}
			}
		}
  }, []);
	
	useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={
    	'app ' +
			(settings.appBoxedLayout ? 'app-boxed-layout ' : '') + 
			(settings.appContentFullHeight ? 'app-content-full-height ' : '') + 
			(settings.appHeaderNone ? 'app-without-header ' : '') +  
			(settings.appHeaderFixed && !settings.appHeaderNone ? 'app-header-fixed ' : '') + 
			(settings.appSidebarWide ? 'app-with-wide-sidebar ' : '') + 
			(settings.appSidebarTwo ? 'app-with-two-sidebar ' : '') + 
			(settings.appSidebarEnd ? 'app-with-end-sidebar ' : '') + 
			(settings.appSidebarHover ? 'app-with-hover-sidebar ' : '') + 
			(settings.appSidebarEndToggled ? 'app-sidebar-end-toggled ' : '') + 
			(settings.appSidebarEndMobileToggled ? 'app-sidebar-end-mobile-toggled ' : '') + 
			(settings.appSidebarNone ? 'app-without-sidebar ' : '') + 
			(settings.appSidebarFixed ? 'app-sidebar-fixed ' : '') + 
			(settings.appSidebarMinified ? 'app-sidebar-minified ' : '') + 
			(settings.appSidebarMobileToggled ? 'app-sidebar-mobile-toggled' : '') +
			(settings.appFooter ? 'app-footer-fixed ' : '') + 
			(settings.appTopMenu ? 'app-with-top-menu ' : '') + 
			(settings.appGradientEnabled ? 'app-gradient-enabled ' : '')
    }>
			{settings.appTopMenu && (<TopMenu />)}
			{!settings.appHeaderNone && (<Header />)}
			{!settings.appSidebarNone && (<Sidebar />)}
			{!settings.appContentNone && (<div className={'app-content '+ settings.appContentClass }>{children}</div>)}
			{settings.appSidebarTwo && (<SidebarRight />)}
			{settings.appContentNone && (<>{children}</>)}
			<ThemePanel />
    </div>
  );
}


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	useEffect(() => {
  	let isMounted = true;

		const loadBootstrap = async () => {
			try {
				const bootstrap = await import('bootstrap');
				if (isMounted) {
					window.bootstrap = bootstrap;
				}
			} catch (error) {
				console.error('Error loading Bootstrap:', error);
			}
		};
	
		if (typeof window !== 'undefined') {
			loadBootstrap();
		}
	
		return () => {
			isMounted = false;
		};
  }, []);
  
	return (
    <html lang="en">
    	<head>
    		<title>Color Admin | Nextjs Version</title>
    	</head>
      <body>
      	<AppSettingsProvider>
					<Layout>{children}</Layout>
				</AppSettingsProvider>
      </body>
    </html>
  );
}
