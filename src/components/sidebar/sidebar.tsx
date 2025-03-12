'use client';

import { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SidebarNav from '@/components/sidebar/sidebar-nav';
import SidebarProfile from '@/components/sidebar/sidebar-profile';
import SidebarMinifyBtn from '@/components/sidebar/sidebar-minify-btn';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useAppSettings } from '@/config/app-settings';
import { slideUp } from '@/composables/slideUp';
import { slideDown } from '@/composables/slideDown';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
	const { settings, updateSettings } = useAppSettings();
	const router = useRouter();
	
	const handleGetHiddenMenuHeight = (elm: HTMLElement): number => {
		elm.setAttribute('style', 'display: block !important; position: absolute; visibility: hidden');
		const targetHeight = elm.clientHeight;
		elm.removeAttribute('style');
		return targetHeight;
	};
	
	const handleSidebarMinifyFloatMenuClick = () => {
		const elements = document.querySelectorAll<HTMLElement>(
			'#app-sidebar-float-submenu .menu-item.has-sub > .menu-link'
		);
	
		elements.forEach((elm) => {
			elm.onclick = (e) => {
				e.preventDefault();
				const targetItem = elm.closest('.menu-item');
				if (!targetItem) return;
	
				const target = targetItem.querySelector('.menu-submenu') as HTMLElement;
				if (!target) return;
	
				const targetStyle = getComputedStyle(target);
				const isClosed = targetStyle.getPropertyValue('display') === 'none';
	
				target.style.display = isClosed ? 'block' : 'none';
	
				const loopHeight = setInterval(() => {
					const floatSubmenu = document.getElementById('app-sidebar-float-submenu');
					if (!floatSubmenu) return;
	
					const targetHeight = floatSubmenu.clientHeight;
					const targetOffset = floatSubmenu.getBoundingClientRect();
					const windowHeight = document.body.clientHeight;
	
					if (isClosed && targetOffset.top + targetHeight > windowHeight) {
						floatSubmenu.style.top = 'auto';
						floatSubmenu.style.bottom = '0';
					}
				}, 1);
	
				setTimeout(() => clearInterval(loopHeight), 250);
			};
		});
	};
	
	useEffect(() => {
		let appSidebarFloatSubmenuTimeout: ReturnType<typeof setTimeout> | null = null;
		let appSidebarFloatSubmenuDom: HTMLElement | null = null;
		
		const hideSidebarFloatMenu = () => {
			appSidebarFloatSubmenuTimeout = setTimeout(() => {
				document.getElementById('app-sidebar-float-submenu')?.remove();
				appSidebarFloatSubmenuDom = null;
			}, 250);
		};
		
		const handleSidebarMinifyFloatMenu = (event: MouseEvent) => {
			const elm = event.currentTarget as HTMLElement;
			const sidebar = document.querySelector('#sidebar') as HTMLElement;
		
			if (!sidebar || !elm) return;
		
			const appElm = document.querySelector('.app');
			if (!appElm || !appElm.classList.contains('app-sidebar-minified')) return;
		
			clearTimeout(appSidebarFloatSubmenuTimeout!);
		
			const targetMenu = elm.closest('.menu-item')?.querySelector('.menu-submenu') as HTMLElement;
			if (!targetMenu) return;
		
			if (appSidebarFloatSubmenuDom === elm && document.querySelector('#app-sidebar-float-submenu')) {
				return;
			}
		
			appSidebarFloatSubmenuDom = elm;
		
			const sidebarRect = sidebar.getBoundingClientRect();
			const sidebarWidth = sidebar.clientWidth;
			const sidebarX = sidebarRect.left + sidebarWidth;
			const targetHeight = handleGetHiddenMenuHeight(targetMenu);
			const targetRect = elm.getBoundingClientRect();
			const targetTop = targetRect.top;
			const windowHeight = document.body.clientHeight;
		
			let floatSubmenu = document.getElementById('app-sidebar-float-submenu') as HTMLElement;
			if (!floatSubmenu) {
				floatSubmenu = document.createElement('div');
				floatSubmenu.id = 'app-sidebar-float-submenu';
				floatSubmenu.className = 'app-sidebar-float-submenu-container';
				
				const appSidebar = document.getElementById('sidebar');
				if (appSidebar?.getAttribute('data-bs-theme') === 'dark') {
					floatSubmenu.setAttribute('data-bs-theme', 'dark');
				}
				document.body.appendChild(floatSubmenu);
			}
		
			floatSubmenu.innerHTML = ''+
			'<div class="app-sidebar-float-submenu-arrow" id="app-sidebar-float-submenu-arrow"></div>'+
			'<div class="app-sidebar-float-submenu-line" id="app-sidebar-float-submenu-line"></div>'+
			'<div class="app-sidebar-float-submenu overflow-scroll mh-100vh">'+ targetMenu.innerHTML +'</div>';
			floatSubmenu.style.top = `${targetTop}px`;
			floatSubmenu.style.left = `${sidebarX}px`;
			floatSubmenu.style.bottom = 'auto';
			
			const floatSubmenuArrowElm = document.querySelector('#app-sidebar-float-submenu-arrow') as HTMLElement;
			const floatSubmenuLineElm = document.querySelector('#app-sidebar-float-submenu-line') as HTMLElement;
		
			if (windowHeight - targetTop < targetHeight) {
				floatSubmenu.style.top = 'auto';
				floatSubmenu.style.bottom = '0';
				
				const arrowBottom = (windowHeight - targetTop) - 21;
				if (floatSubmenuArrowElm) {
					floatSubmenuArrowElm.style.top = 'auto';
					floatSubmenuArrowElm.style.bottom = arrowBottom + 'px';
				}
				if (floatSubmenuLineElm) {
					floatSubmenuLineElm.style.top = '20px';
					floatSubmenuLineElm.style.bottom = arrowBottom + 'px';
				}
			} else {
				if (floatSubmenuArrowElm) {
					floatSubmenuArrowElm.style.top = '20px';
					floatSubmenuArrowElm.style.bottom = 'auto';
				}
				if (floatSubmenuLineElm) {
					floatSubmenuLineElm.style.top = '20px';
					floatSubmenuLineElm.style.bottom = 'auto';
				}
			}
		
			floatSubmenu.addEventListener('mouseenter', () => {
				clearTimeout(appSidebarFloatSubmenuTimeout!);
			});
		
			floatSubmenu.addEventListener('mouseleave', () => {
				appSidebarFloatSubmenuTimeout = setTimeout(() => {
					floatSubmenu.remove();
				}, 250);
			});
		
			const links = floatSubmenu.querySelectorAll('a');
			links.forEach((link) => {
				link.addEventListener('click', function (e) {
					e.preventDefault();
					
					const parentMenuItem = this.closest('.menu-item');
					if (parentMenuItem?.classList.contains('has-sub')) {
						const submenu = parentMenuItem.querySelector('.menu-submenu') as HTMLElement;
						if (submenu) {
							submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
						}
					} else {
						const href = this.getAttribute('href');
						if (href) {
							router.push(href);
							floatSubmenu.remove();
						}
					}
				});
			});
		
			handleSidebarMinifyFloatMenuClick();
		};
		
		const bodyElement = document.querySelector('body');
    bodyElement?.classList.add('app-init');
		
		const handleSidebarMenuToggle = function (menus: HTMLElement[]) {
      menus.forEach((menu) => {
        const isInit = menu.getAttribute('data-init');
        if (!isInit) {
          menu.addEventListener('click', function (e) {
            e.preventDefault();

            const target = menu.nextElementSibling as HTMLElement | null;

            menus.forEach((m) => {
              const otherTarget = m.nextElementSibling as HTMLElement | null;
              if (otherTarget && otherTarget !== target) {
                slideUp(otherTarget);
                otherTarget.closest('.menu-item')?.classList.remove('expand');
              }
            });

            if (target) {
              const targetItemElm = target.closest('.menu-item') as HTMLElement;

              if (
                targetItemElm.classList.contains('expand') ||
                (targetItemElm.classList.contains('active') && !target.style.display)
              ) {
                targetItemElm.classList.remove('expand');
                slideUp(target);
              } else {
                targetItemElm.classList.add('expand');
                slideDown(target);
              }
            }
          });

          menu.setAttribute('data-init', 'true');
        }
      });
    };
	
		const menuBaseSelector = '.app-sidebar .menu > .menu-item.has-sub';
		const submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

		// menu
		const menuLinkSelector = menuBaseSelector + ' > .menu-link';
		const menus: HTMLElement[] = Array.from(document.querySelectorAll<HTMLElement>(menuLinkSelector));
		handleSidebarMenuToggle(menus);
		
		// submenu lvl 1
		const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
		const submenusLvl1: HTMLElement[] = Array.from(
			document.querySelectorAll<HTMLElement>(submenuLvl1Selector + ' > .menu-link')
		);
		handleSidebarMenuToggle(submenusLvl1);
		
		// submenu lvl 2
		const submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
		const submenusLvl2: HTMLElement[] = Array.from(
			document.querySelectorAll<HTMLElement>(submenuLvl2Selector + ' > .menu-link')
		);
		handleSidebarMenuToggle(submenusLvl2);
		
		const attachSidebarEvents = () => {
			const menuLinks = document.querySelectorAll<HTMLElement>(
				".app-sidebar .menu > .menu-item.has-sub > .menu-link"
			);
	
			menuLinks.forEach((elm) => {
				elm.removeEventListener("mouseenter", handleSidebarMinifyFloatMenu);
				elm.addEventListener("mouseenter", handleSidebarMinifyFloatMenu);
				
				elm.removeEventListener("mouseleave", hideSidebarFloatMenu);
				elm.addEventListener("mouseleave", hideSidebarFloatMenu);
			});
		};
		const sidebarObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.addedNodes.length > 0) {
					attachSidebarEvents();
				}
			});
		});
		const sidebarContainer = document.getElementById("sidebar");
		if (sidebarContainer) {
			sidebarObserver.observe(sidebarContainer, { childList: true, subtree: true });
		}
		attachSidebarEvents();
	
		return () => {
			sidebarObserver.disconnect();
		};
	}, [router]);
	
	const toggleAppSidebarMobile = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		
		const state = !settings.appSidebarMobileToggled;
		
		updateSettings({ appSidebarMobileToggled: state });
		if (localStorage) {
			localStorage.setItem('appSidebarMobileToggled', state.toString());
		}
	};

  return (
    <>
      <div id="sidebar" className={'app-sidebar ' + (settings.appSidebarGrid ? 'app-sidebar-grid ' : '') + (settings.appSidebarTransparent ? 'app-sidebar-transparent ' : '')}  data-bs-theme={!settings.appSidebarLight ? 'dark' : ''}>
        <PerfectScrollbar className="app-sidebar-content" options={{ suppressScrollX: true }}>
        	{!settings.appSidebarSearch && <SidebarProfile />}
          <SidebarNav />
          <SidebarMinifyBtn />
        </PerfectScrollbar>
      </div>
			<div className="app-sidebar-bg" data-bs-theme={!settings.appSidebarLight ? 'dark' : ''}></div>
			<div className="app-sidebar-mobile-backdrop"><button onClick={toggleAppSidebarMobile} className="stretched-link"></button></div>
    </>
  );
}