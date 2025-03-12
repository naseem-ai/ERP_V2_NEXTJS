'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import menus from '@/config/app-menu';

type NavItemProps = {
  menu: {
    path?: string;
    icon?: string;
    img?: string;
    title?: string;
    label?: string;
    badge?: string;
    highlight?: boolean;
    is_header?: boolean;
    is_divider?: boolean;
    children?: Array<{
      path: string;
      title: string;
    }>;
  };
};

function NavItem({ menu }: NavItemProps) {
  const currentPath = usePathname();
  const isActive = menu.path && currentPath.startsWith(menu.path) && (currentPath === menu.path || currentPath.startsWith(`${menu.path}/`));
	
	if (menu.is_header || menu.is_divider) {
		return '';
	}
  
	const icon = menu.icon && <div className="menu-icon"><i className={menu.icon}></i></div>;
	const img = menu.img && <div className="menu-icon-img"><Image src={menu.img} alt="" width="30" height="30" /></div>;
	const caret = (menu.children && !menu.badge) && <div className="menu-caret"></div>;
	const label = menu.label && <span className="menu-label ms-5px">{menu.label}</span>;
	const badge = menu.badge && <div className="menu-badge">{menu.badge}</div>;
	const highlight = menu.highlight && <i className="fa fa-paper-plane text-theme"></i>;
	const title = menu.title && <div className="menu-text">{menu.title} {label} {highlight}</div>;
	
	return (
		<div className={`menu-item${isActive ? ' active' : ''}${menu.children ? ' has-sub' : ''}`}>
			<Link href={menu.path || '#'} className="menu-link">
				{img} {icon} {title} {caret} {badge}
			</Link>
		
			{menu.children && (
				<div className="menu-submenu">
					{menu.children.map((submenu, i) => (
						<NavItem key={i} menu={submenu} />
					))}
				</div>
			)}
		</div>
	);
}

function TopNavNav() {
	// function handle menu button action - next / prev
	const handleMenuButtonAction = (element: HTMLElement, direction: 'next' | 'prev') => {
		const obj = element.closest('.menu') as HTMLElement | null;
    if (!obj) return;
    
		const objStyle = window.getComputedStyle(obj);
    const body = document.querySelector('body');
    if (!body) return;
    
    const bodyStyle = window.getComputedStyle(body);
    const targetCss = bodyStyle.getPropertyValue('direction') === 'rtl' ? 'margin-right' : 'margin-left';
    const marginLeft = parseInt(objStyle.getPropertyValue(targetCss), 10);
    const container = document.querySelector('.app-top-menu') as HTMLElement | null;
    if (!container) return;

    const containerWidth = container.clientWidth - container.clientHeight * 2;
    let totalWidth = 0;
    let finalScrollWidth = 0;

    const controlPrevObj = obj.querySelector('.menu-control-start') as HTMLElement | null;
    const controlPrevWidth = controlPrevObj ? controlPrevObj.clientWidth : 0;
    const controlNextObj = obj.querySelector('.menu-control-end') as HTMLElement | null;
    const controlNextWidth = controlNextObj ? controlNextObj.clientWidth : 0;
    const controlWidth = controlPrevWidth + controlNextWidth;

    const elms = Array.from(obj.querySelectorAll('.menu-item')) as HTMLElement[];
    elms.forEach((elm) => {
      if (!elm.classList.contains('menu-control')) {
        totalWidth += elm.clientWidth;
      }
    });

		switch (direction) {
      case 'next': {
        const widthLeft = totalWidth + marginLeft - containerWidth;
        if (widthLeft <= containerWidth) {
          finalScrollWidth = widthLeft - marginLeft - controlWidth;
          setTimeout(() => {
            const endControl = obj.querySelector('.menu-control.menu-control-end');
            endControl?.classList.remove('show');
          }, 300);
        } else {
          finalScrollWidth = containerWidth - marginLeft - controlWidth;
        }

        if (finalScrollWidth !== 0) {
          obj.style.transitionProperty = 'height, margin, padding';
          obj.style.transitionDuration = '300ms';
          if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
            obj.style.marginLeft = `-${finalScrollWidth}px`;
          } else {
            obj.style.marginRight = `-${finalScrollWidth}px`;
          }
          setTimeout(() => {
            obj.style.transitionProperty = '';
            obj.style.transitionDuration = '';
            const startControl = obj.querySelector('.menu-control.menu-control-start');
            startControl?.classList.add('show');
          }, 300);
        }
        break;
      }
      case 'prev': {
        const widthLeft = -marginLeft;

        if (widthLeft <= containerWidth) {
          const startControl = obj.querySelector('.menu-control.menu-control-start');
          startControl?.classList.remove('show');
          finalScrollWidth = 0;
        } else {
          finalScrollWidth = widthLeft - containerWidth + controlWidth;
        }

        obj.style.transitionProperty = 'height, margin, padding';
        obj.style.transitionDuration = '300ms';

        if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
          obj.style.marginLeft = `-${finalScrollWidth}px`;
        } else {
          obj.style.marginRight = `-${finalScrollWidth}px`;
        }

        setTimeout(() => {
          obj.style.transitionProperty = '';
          obj.style.transitionDuration = '';
          const endControl = obj.querySelector('.menu-control.menu-control-end');
          endControl?.classList.add('show');
        }, 300);
        break;
      }
      default:
        break;
    }
	}
	
	const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>, action: 'next' | 'prev') => {
    handleMenuButtonAction(event.currentTarget as HTMLElement, action);
  };
	
	return (
		<div className="menu">
			{menus.map((menu, i) => (
				<NavItem key={i} menu={menu} />
			))}
			<div className="menu-item menu-control menu-control-start">
				<a href="#/" className="menu-link" onClick={(event) => handleButtonClick(event, 'prev')}><i className="fa fa-angle-left"></i></a>
			</div>
			<div className="menu-item menu-control menu-control-end">
				<a href="#/" className="menu-link" onClick={(event) => handleButtonClick(event, 'next')}><i className="fa fa-angle-right"></i></a>
			</div>
		</div>
	);
}

export default TopNavNav;