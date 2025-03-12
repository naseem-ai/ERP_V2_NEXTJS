'use client';

import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useAppSettings } from '@/config/app-settings';

export default function SidebarRight() {
  const { settings, updateSettings } = useAppSettings();
  
  const toggleAppSidebarEndMobile = (e: React.MouseEvent) => {
  	e.preventDefault();
  	
  	updateSettings({
  		appSidebarEndMobileToggled: !settings.appSidebarEndMobileToggled
  	})
  };

  return (
    <>
      <div id="sidebar-right" className="app-sidebar app-sidebar-end" data-bs-theme={!settings.appSidebarLight ? 'dark' : ''}>
        <PerfectScrollbar className="app-sidebar-content h-100" options={{ suppressScrollX: true }}>
          <div className="p-20px text-white">
            <p className="fw-bold mb-2">Accordion</p>
            <div className="accordion" id="accordionSidebar">
              {Array.from({ length: 8 }).map((_, index) => {
                const id = `collapse${index + 1}`;
                const headingId = `heading${index + 1}`;
                return (
                  <div key={id} className="accordion-item bg-gray-700 text-white border-0 rounded-0">
                    <h2 className="accordion-header bg-gray-900 rounded-0 d-flex align-items-center" id={headingId}>
                      <button
                        className="accordion-button bg-gray-900 rounded-0 text-white pointer-cursor d-flex align-items-center py-2 px-3 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${id}`}
                      >
                        Accordion #{index + 1}
                      </button>
                    </h2>
                    <div id={id} className="accordion-collapse collapse" data-bs-parent="#accordionSidebar">
                      <div className="accordion-body py-2 p-3">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PerfectScrollbar>
      </div>

      <div className="app-sidebar-bg app-sidebar-end" data-bs-theme={!settings.appSidebarLight ? 'dark' : ''}></div>
      <div className="app-sidebar-mobile-backdrop app-sidebar-end">
        <Link href="/" onClick={toggleAppSidebarEndMobile} className="stretched-link"></Link>
      </div>
    </>
  );
};