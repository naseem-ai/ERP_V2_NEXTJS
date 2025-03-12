'use client';

import { useEffect } from 'react';
import TopMenuNav from './top-menu-nav';
import { slideToggle } from '@/composables/slideToggle';
import { slideUp } from '@/composables/slideUp';


function handleUnlimitedTopMenuRender() {
	// handle page load active menu focus
	function handlePageLoadMenuFocus() {
    const targetMenu = document.querySelector('.app-top-menu .menu') as HTMLElement | null;
    if (!targetMenu) {
      return;
    }
    const bodyStyle = window.getComputedStyle(document.body);
    const appTopMenu = document.querySelector('.app-top-menu') as HTMLElement | null;
    if (!appTopMenu) {
      return;
    }

    const viewWidth = appTopMenu.clientWidth;
    let prevWidth = 0;
    let fullWidth = 0;

    const controlNextObj = targetMenu.querySelector('.menu-control-end') as HTMLElement | null;
    const controlNextWidth = controlNextObj?.clientWidth || 0;
    let controlWidth = 0;

    const elms = Array.from(document.querySelectorAll('.app-top-menu .menu > .menu-item')) as HTMLElement[];
    if (elms.length) {
      let found = false;
      elms.forEach((elm) => {
        if (!elm.classList.contains('menu-control')) {
          fullWidth += elm.clientWidth;
          if (!found) {
            prevWidth += elm.clientWidth;
          }
          if (elm.classList.contains('active')) {
            found = true;
          }
        }
      });
    }

    const elm = targetMenu.querySelector('.menu-control.menu-control-end') as HTMLElement | null;
    if (elm) {
      if (prevWidth !== fullWidth && fullWidth >= viewWidth) {
        elm.classList.add('show');
        controlWidth += controlNextWidth;
      } else {
        elm.classList.remove('show');
      }
    }

    const elm2 = targetMenu.querySelector('.menu-control.menu-control-start') as HTMLElement | null;
    if (elm2) {
      if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
        elm2.classList.add('show');
      } else {
        elm2.classList.remove('show');
      }
    }

    if (prevWidth >= viewWidth) {
      const finalScrollWidth = prevWidth - viewWidth + controlWidth;
      if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
        targetMenu.style.marginLeft = `-${finalScrollWidth}px`;
      } else {
        targetMenu.style.marginRight = `-${finalScrollWidth}px`;
      }
    }
  }
	
	function enableFluidContainerDrag(containerClassName: string) {
    const container = document.querySelector(containerClassName) as HTMLElement | null;
    if (!container) {
      return;
    }
    const menu = container.querySelector('.menu') as HTMLElement | null;
    if (!menu) {
      return;
    }
    const menuItems = Array.from(menu.querySelectorAll('.menu-item:not(.menu-control)')) as HTMLElement[];

    let startX: number | null = null;
    let scrollLeft = 0;
    let mouseDown = false;
    let menuWidth = 0;
    let maxScroll = 0;

    menuItems.forEach((element) => {
      menuWidth += element.offsetWidth;
    });

    container.addEventListener('mousedown', (e: MouseEvent) => {
      mouseDown = true;
      startX = e.pageX;
      scrollLeft = menu.style.marginLeft ? parseInt(menu.style.marginLeft) : 0;
      maxScroll = container.offsetWidth - menuWidth;
    });

    container.addEventListener('touchstart', (e: TouchEvent) => {
      mouseDown = true;
      const touch = e.targetTouches[0];
      startX = touch.pageX;
      scrollLeft = menu.style.marginLeft ? parseInt(menu.style.marginLeft) : 0;
      maxScroll = container.offsetWidth - menuWidth;
    });

    const endDrag = () => {
      mouseDown = false;
      startX = null;
    };

    container.addEventListener('mouseup', endDrag);
    container.addEventListener('touchend', endDrag);

    container.addEventListener('mousemove', (e: MouseEvent) => {
      if (!startX || !mouseDown || window.innerWidth < 768) return;
      e.preventDefault();
      const x = e.pageX;
      const walkX = (x - startX) * 1;
      const totalMarginLeft = scrollLeft + walkX;
      handleDragMenu(menu, container, totalMarginLeft, menuWidth, maxScroll);
    });

    container.addEventListener('touchmove', (e: TouchEvent) => {
      if (!startX || !mouseDown || window.innerWidth < 768) return;
      e.preventDefault();
      const touch = e.targetTouches[0];
      const x = touch.pageX;
      const walkX = (x - startX) * 1;
      const totalMarginLeft = scrollLeft + walkX;
      handleDragMenu(menu, container, totalMarginLeft, menuWidth, maxScroll);
    });
  }

  function handleDragMenu(menu: HTMLElement, container: HTMLElement, totalMarginLeft: number, menuWidth: number, maxScroll: number) {
    const endControl = menu.querySelector('.menu-control.menu-control-end') as HTMLElement | null;
    const startControl = menu.querySelector('.menu-control.menu-control-start') as HTMLElement | null;

    if (totalMarginLeft <= maxScroll) {
      totalMarginLeft = maxScroll;
      endControl?.classList.remove('show');
    } else {
      endControl?.classList.add('show');
    }

    if (menuWidth < container.offsetWidth) {
      startControl?.classList.remove('show');
    }

    if (maxScroll > 0) {
      endControl?.classList.remove('show');
    }

    if (totalMarginLeft > 0) {
      totalMarginLeft = 0;
      startControl?.classList.remove('show');
    } else {
      startControl?.classList.add('show');
    }

    menu.style.marginLeft = `${totalMarginLeft}px`;
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      const targetElm = document.querySelector('.app-top-menu') as HTMLElement | null;
      targetElm?.removeAttribute('style');

      const targetMenu = document.querySelector('.app-top-menu .menu') as HTMLElement | null;
      targetMenu?.removeAttribute('style');

      const subMenus = document.querySelectorAll('.app-top-menu .menu-submenu') as NodeListOf<HTMLElement>;
      subMenus.forEach((submenu) => submenu.removeAttribute('style'));

      handlePageLoadMenuFocus();
    }
    enableFluidContainerDrag('.app-top-menu');
  });

  if (window.innerWidth >= 768) {
    handlePageLoadMenuFocus();
    enableFluidContainerDrag('.app-top-menu');
  }
};

function handleTopMenuToggle(menus: HTMLElement[], forMobile: boolean = false): void {
	menus.forEach((menu) => {
		menu.addEventListener('click', function (e) {
      e.preventDefault();

			if (!forMobile || (forMobile && document.body.clientWidth < 768)) {
				const target = (this as HTMLElement).nextElementSibling as HTMLElement | null;

				menus.forEach((m) => {
					const otherTarget = m.nextElementSibling as HTMLElement | null;
					if (otherTarget && otherTarget !== target) {
						slideUp(otherTarget);
						const closestMenuItem = otherTarget.closest('.menu-item');
						if (closestMenuItem) {
							closestMenuItem.classList.remove('expand');
							closestMenuItem.classList.add('closed');
						}
					}
				});

				if (target) {
					slideToggle(target);
				}
			}
		});
	});
};

function handleTopMenuSubMenu(): void {
	// Base selectors
	const menuBaseSelector = '.app-top-menu .menu > .menu-item.has-sub';
	const submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';
	
	// Menu - Toggle / Collapse
	const menuLinkSelector = menuBaseSelector + ' > .menu-link';
	const menus = Array.from(document.querySelectorAll(menuLinkSelector)) as HTMLElement[];
	handleTopMenuToggle(menus, true);

	// Menu - Submenu lvl 1
	const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
	const submenusLvl1 = Array.from(document.querySelectorAll(submenuLvl1Selector + ' > .menu-link')) as HTMLElement[];
	handleTopMenuToggle(submenusLvl1);

	// Submenu lvl 2
	const submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
	const submenusLvl2 = Array.from(document.querySelectorAll(submenuLvl2Selector + ' > .menu-link')) as HTMLElement[];
	handleTopMenuToggle(submenusLvl2);
}

function TopMenu() {
	useEffect(() => {
		handleUnlimitedTopMenuRender();
		handleTopMenuSubMenu();
	});
		
	return (
		<div id="top-menu" className="app-top-menu" data-bs-theme="dark">
			<TopMenuNav />
		</div>
	)
}

export default TopMenu;
