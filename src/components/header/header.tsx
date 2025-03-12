'use client';

import Link from 'next/link';
import DropdownNotification from './dropdown/notification';
import DropdownLanguage from './dropdown/language';
import DropdownProfile from './dropdown/profile';
import SearchForm from './search/form';
import DropdownMegaMenu from './dropdown/mega';
import { useAppSettings } from '@/config/app-settings';

export default function Header() {
  const { settings, updateSettings } = useAppSettings();
  
  const toggleAppSidebarEnd = (e: React.MouseEvent) => {
  	e.preventDefault();
  	
  	updateSettings({
			appSidebarEndToggled: !settings.appSidebarEndToggled
		});
  };
  
  const toggleAppSidebarEndMobile = (e: React.MouseEvent) => {
  	e.preventDefault();
  	
  	updateSettings({
			appSidebarEndMobileToggled: true
		});
  };
  
  const toggleAppSidebarMobile = () => {
  	updateSettings({
			appSidebarMobileToggled: true
		});
  };
  
  const toggleAppTopMenuMobile = () => {
  	updateSettings({
			appTopMenuMobileToggled: true
		});
  };
  
  return (
    <div id="header" className="app-header" data-bs-theme={settings.appHeaderInverse ? 'dark' : ''}>
      <div className="navbar-header">
        {settings.appSidebarTwo && (
          <button type="button" className="navbar-mobile-toggler" onClick={toggleAppSidebarEndMobile}>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        )}
        <Link href="/" className="navbar-brand">
          <span className="navbar-logo"></span> <b>Color</b> Admin
        </Link>

        {settings.appHeaderMegaMenu && (
          <button type="button" className="navbar-mobile-toggler" data-bs-toggle="collapse" data-bs-target="#top-navbar">
            <span className="fa-stack fa-lg text-inverse">
              <i className="far fa-square fa-stack-2x"></i>
              <i className="fa fa-cog fa-stack-1x"></i>
            </span>
          </button>
        )}
        {settings.appTopMenu && !settings.appSidebarNone && (
          <button type="button" className="navbar-mobile-toggler" onClick={toggleAppTopMenuMobile}>
            <span className="fa-stack fa-lg text-inverse">
              <i className="far fa-square fa-stack-2x"></i>
              <i className="fa fa-cog fa-stack-1x"></i>
            </span>
          </button>
        )}
        {settings.appSidebarNone && settings.appTopMenu && (
          <button type="button" className="navbar-mobile-toggler" onClick={toggleAppTopMenuMobile}>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        )}
        {!settings.appSidebarNone && (
          <button type="button" className="navbar-mobile-toggler" onClick={toggleAppSidebarMobile}>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        )}
      </div>

      {settings.appHeaderMegaMenu && <DropdownMegaMenu />}

      <div className="navbar-nav">
        <SearchForm />
        <DropdownNotification />

        {settings.appHeaderLanguageBar && <DropdownLanguage />}

        <DropdownProfile />

        {settings.appSidebarTwo && <div className="navbar-divider d-none d-md-block"></div>}

        {settings.appSidebarTwo && (
          <div className="navbar-item d-none d-md-block">
            <Link href="/" onClick={toggleAppSidebarEnd} className="navbar-link icon">
              <i className="fa fa-th"></i>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}