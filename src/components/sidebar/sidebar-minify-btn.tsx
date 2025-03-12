"use client";

import { useAppSettings } from "@/config/app-settings";

export default function SidebarMinifyBtn() {
  const { settings, updateSettings } = useAppSettings();
  
  const toggleAppSidebarMinified = () => {
  	updateSettings({
			appSidebarMinified: !settings.appSidebarMinified
		});
  };

  return (
    <div className="menu">
      <div className="menu-item d-flex">
        <a href="#0" className="app-sidebar-minify-btn ms-auto" onClick={toggleAppSidebarMinified}>
          <i className="fa fa-angle-double-left"></i>
        </a>
      </div>
    </div>
  );
}