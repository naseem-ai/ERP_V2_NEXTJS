'use client';

import { useEffect } from 'react';

interface NavScrollToProps {
  children: React.ReactNode;
}

function NavScrollTo({ children }: NavScrollToProps) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const interval = setInterval(() => {
				if (window.bootstrap) {
					new window.bootstrap.ScrollSpy(document.body, {
						target: '#sidebar-bootstrap',
						offset: 200
					});
	
					const elms = Array.from(document.querySelectorAll('#sidebar-bootstrap .nav-link')) as HTMLElement[];
					elms.forEach(elm => {
						elm.addEventListener('click', function (e) {
							e.preventDefault();
							const targetAttr = this.getAttribute('href');
							if (targetAttr) {
								const targetElm = document.querySelector(targetAttr) as HTMLElement;
								const targetHeader = document.querySelector('.app-header') as HTMLElement;
								const targetHeight = targetHeader?.offsetHeight || 0;
								if (targetElm) {
									const targetTop = targetElm.offsetTop - targetHeight - 24;
									window.scrollTo({ top: targetTop, behavior: 'smooth' });
								}
							}
						});
					});
	
					clearInterval(interval);
				}
			}, 100);
	
			return () => clearInterval(interval);
		}
	}, []);
	
	return (
		<nav id="sidebar-bootstrap" className="navbar navbar-sticky">
			{ children }
		</nav>
	);
};

export { NavScrollTo };
