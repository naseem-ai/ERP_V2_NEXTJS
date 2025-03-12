'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import menus from '@/config/app-menu';
import { useAppSettings } from '@/config/app-settings';

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
  const currentPath = usePathname() || '';
  const isActive = menu.path && currentPath.startsWith(menu.path) && (currentPath === menu.path || currentPath.startsWith(`${menu.path}/`));
	
	if (menu.is_header) {
    return <div className="menu-header">{menu.title}</div>;
  }

  if (menu.is_divider) {
    return <div className="menu-divider"></div>;
  }

  const icon = menu.icon ? (
		<div className="menu-icon">
			<i className={menu.icon}></i>
		</div>
	) : null;
	
	const img = menu.img ? (
		<div className="menu-icon-img">
			<Image src={menu.img} alt="" width="16" height="16" />
		</div>
	) : null;
	
	const caret = menu.children && !menu.badge ? <div className="menu-caret"></div> : null;
	
	const label = menu.label ? <span className="menu-label ms-5px">{menu.label}</span> : null;
	
	const badge = menu.badge ? <div className="menu-badge">{menu.badge}</div> : null;
	
	const highlight = menu.highlight ? <i className="fa fa-paper-plane text-theme"></i> : null;
	
	const title = menu.title ? (
		<div className="menu-text">
			{menu.title} {label} {highlight}
		</div>
	) : null;

  return (
    <div className={`menu-item${isActive ? ' active' : ''}${menu.children ? ' has-sub' : ''}`}>
      <Link href={menu.path || '#'} className="menu-link">
        { img } { icon } { title }{ caret } { badge }
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

function SidebarNav() {
	const { settings } = useAppSettings();
	
	const handleSidebarSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetValue = e.target.value.toLowerCase();
		const sidebarSelector = ".app-sidebar:not(.app-sidebar-end)";
	
		if (targetValue) {
			const elms = Array.from(
				document.querySelectorAll(
					`${sidebarSelector} .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search),
					 ${sidebarSelector} .menu-submenu > .menu-item`
				)
			);
			elms.forEach((elm) => (elm as HTMLElement).classList.add("d-none"));
	
			const elms2 = Array.from(document.querySelectorAll(`${sidebarSelector} .has-text`));
			elms2.forEach((elm) => (elm as HTMLElement).classList.remove("has-text"));
	
			const elms3 = Array.from(document.querySelectorAll(`${sidebarSelector} .expand`));
			elms3.forEach((elm) => (elm as HTMLElement).classList.remove("expand"));
	
			const elms4 = Array.from(
				document.querySelectorAll(
					`${sidebarSelector} .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search) > .menu-link, 
					 .app-sidebar .menu-submenu > .menu-item > .menu-link`
				)
			);
	
			elms4.forEach((elm) => {
				const menuLink = elm as HTMLElement;
				const targetText = menuLink.textContent?.toLowerCase() || "";
	
				if (targetText.includes(targetValue)) {
					const targetElm = menuLink.closest(".menu-item") as HTMLElement | null;
					targetElm?.classList.remove("d-none");
					targetElm?.classList.add("has-text");
	
					const targetElm2 = menuLink.closest(".menu-item.has-sub") as HTMLElement | null;
					if (targetElm2) {
						const targetElm3 = targetElm2.querySelector(".menu-submenu .menu-item.d-none") as HTMLElement | null;
						targetElm3?.classList.remove("d-none");
					}
	
					const targetElm4 = menuLink.closest(".menu-submenu") as HTMLElement | null;
					if (targetElm4) {
						targetElm4.style.display = "block";
	
						const targetElm5 = targetElm?.querySelector(".menu-item:not(.has-text)") as HTMLElement | null;
						targetElm5?.classList.add("d-none");
	
						const targetElm6 = menuLink.closest(".has-sub:not(.has-text)") as HTMLElement | null;
						if (targetElm6) {
							targetElm6.classList.remove("d-none");
							targetElm6.classList.add("expand");
	
							const targetElm7 = targetElm6.closest(".has-sub:not(.has-text)") as HTMLElement | null;
							if (targetElm7) {
								targetElm7.classList.remove("d-none");
								targetElm7.classList.add("expand");
							}
						}
					}
				}
			});
		} else {
			const elms5 = Array.from(
				document.querySelectorAll(`${sidebarSelector} .menu > .menu-item.has-sub .menu-submenu`)
			);
			elms5.forEach((elm) => (elm as HTMLElement).removeAttribute("style"));
	
			const elms6 = Array.from(
				document.querySelectorAll(`${sidebarSelector} .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search)`)
			);
			elms6.forEach((elm) => (elm as HTMLElement).classList.remove("d-none"));
	
			const elms7 = Array.from(document.querySelectorAll(`${sidebarSelector} .menu-submenu > .menu-item`));
			elms7.forEach((elm) => (elm as HTMLElement).classList.remove("d-none"));
	
			const elms8 = Array.from(document.querySelectorAll(`${sidebarSelector} .expand`));
			elms8.forEach((elm) => (elm as HTMLElement).classList.remove("expand"));
		}
	};
	
  return (
    <div className="menu">
    	{settings.appSidebarSearch && (
				<div className="menu-search mb-n3">
					<input type="text" className="form-control" placeholder="Sidebar menu filter..." onChange={handleSidebarSearch} />
				</div>
			)}
      {menus.map((menu, i) => (
        <NavItem key={i} menu={menu} />
      ))}
    </div>
  );
}

export default SidebarNav;