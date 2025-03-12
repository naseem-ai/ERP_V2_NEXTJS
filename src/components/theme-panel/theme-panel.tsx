"use client";

import { useState, useEffect } from "react";
import { useAppSettings } from "@/config/app-settings";

export default function ThemePanel() {
  const { settings, updateSettings } = useAppSettings();
  const [active, setActive] = useState(0);
	const [mode, setMode] = useState('');
	const [theme, setTheme] = useState('');

	const toggleAppThemePanel = () => {
		setActive((prev) => (prev === 0 ? 1 : 0));
		localStorage.appThemePanelActive = !active;
	};

	const setAppTheme = (theme: string) => {
		document.body.classList.forEach((cls) => {
			if (cls.startsWith('theme-') && cls !== theme) {
				document.body.classList.remove(cls);
			}
		});

		if (theme) {
			document.body.classList.add('theme-' + theme);
		}
		localStorage.appTheme = theme;
		setTheme(theme);
		document.dispatchEvent(new Event('theme-reload'));
	};

	const setAppMode = (mode: string) => {
		document.documentElement.setAttribute('data-bs-theme', mode);
		localStorage.appMode = mode;
		setMode(mode);
		document.dispatchEvent(new Event('theme-reload'));
	};
	
	const handleDarkModeCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		setMode((isChecked) ? 'dark' : 'light');
		setAppMode(isChecked ? 'dark' : 'light');
  };

  const versions = [
    { href: 'https://seantheme.com/color-admin/admin/html/index_v2.html', img: '/assets/img/version/html.jpg' },
    { href: 'https://seantheme.com/color-admin/admin/ajax/', img: '/assets/img/version/ajax.jpg' },
    { href: 'https://seantheme.com/color-admin/admin/angularjs/', img: '/assets/img/version/angular1x.jpg' },
    { href: 'https://seantheme.com/color-admin/admin/angularjs19/', img: '/assets/img/version/angular10x.jpg' },
    { href: 'https://seantheme.com/color-admin/admin/svelte/', img: '/assets/img/version/svelte.jpg' },
    { href: '#', img: '/assets/img/version/laravel.jpg', alert: 'Laravel Version only available in downloaded version.' },
    { href: '#', img: '/assets/img/version/django.jpg', alert: 'Django Version only available in downloaded version.' },
    { href: 'https://seantheme.com/color-admin/admin/vue3/', img: '/assets/img/version/vuejs.jpg' },
    { href: 'https://seantheme.com/color-admin/admin/react/', img: '/assets/img/version/reactjs.jpg' },
    { href: '#', img: '/assets/img/version/dotnet.jpg', alert: '.NET Core MVC Version only available in downloaded version.' },
    { href: 'https://seantheme.com/color-admin/admin/nextjs/', img: '/assets/img/version/nextjs.jpg', active: true },
  ];

  const themeList = ['red', 'pink', 'orange', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'purple', 'indigo', 'dark'];

  const handleToggle = (setting: string, value: boolean) => {
  	const newSettings = { ...settings, [setting]: value };

		if (setting === 'appHeaderFixed' && !value) {
			newSettings['appSidebarFixed'] = false;
		}
	
		if (setting === 'appSidebarFixed' && value) {
			newSettings['appHeaderFixed'] = true;
		}
	
		updateSettings(newSettings);
  }

  const toggleTheme = (e: React.MouseEvent, theme: string) => {
    e.preventDefault();
    updateSettings({ appTheme: theme });
    setAppTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('appTheme', theme);
    }
  }

  const handleClick = (event: React.MouseEvent, alertMessage?: string) => {
    if (alertMessage) {
      event.preventDefault();
      window.alert(alertMessage);
    }
  };
  
  const getSetting = (key: string): boolean => !!settings?.[key as keyof typeof settings];
  
	useEffect(() => {
		if (typeof window !== 'undefined' && localStorage) {
			setActive(localStorage.appThemePanelActive === 'true' ? 1 : 0);
			setAppMode(localStorage.appMode || '');
			setAppTheme(localStorage.appTheme || 'teal');
		}
		setTimeout(() => {
			if (typeof window !== 'undefined' && window.bootstrap) {
				const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
				tooltipElements.forEach((tooltipElement) => {
					new window.bootstrap.Tooltip(tooltipElement);
				});
			}
		}, 100);
	}, []);

  return (
    <div className={`theme-panel ${active ? "active" : ""}`}>
      <a href="#0" onClick={toggleAppThemePanel} className="theme-collapse-btn">
        <i className="fa fa-cog"></i>
      </a>
      <div className="theme-panel-content" data-scrollbar="true" data-height="100%">
        <h5>App Settings</h5>

        <div className="theme-list">
          {themeList.map((themeItem, i) => (
            <div key={i} className={`theme-list-item ${themeItem === theme ? "active" : ""}`}>
              <a href="#0" data-bs-toggle="tooltip" data-bs-title={themeItem.charAt(0).toUpperCase() + themeItem.slice(1)} onClick={(e) => toggleTheme(e, themeItem)} className={`theme-list-link bg-${themeItem}`}>
                &nbsp;
              </a>
            </div>
          ))}
        </div>
        
        <div className="theme-panel-divider"></div>
			
				<div className="row mt-10px">
					<div className="col-8 control-label text-dark fw-bold">
						<div>Dark Mode <span className="badge bg-primary ms-1 py-2px position-relative" style={{top: '-1px'}}>NEW</span></div>
						<div className="lh-14">
							<small className="text-dark opacity-50">
								Adjust the appearance to reduce glare and give your eyes a break.
							</small>
						</div>
					</div>
					<div className="col-4 d-flex">
						<div className="form-check form-switch ms-auto mb-0">
							<input type="checkbox" className="form-check-input" name="app-theme-dark-mode" onChange={handleDarkModeCheckboxChange} id="appThemeDarkMode" checked={(mode == 'dark') ? true : false} value="1" />
							<label className="form-check-label" htmlFor="appThemeDarkMode">&nbsp;</label>
						</div>
					</div>
				</div>

        <div className="theme-panel-divider"></div>

        <div className="theme-options">
					{['HeaderFixed', 'HeaderInverse', 'SidebarFixed', 'SidebarGrid', 'GradientEnabled'].map(
						(option, index) => (
							<div key={index} className="row mt-10px align-items-center">
								<div className="col-8 control-label text-dark fw-bold">
									{option.replace(/([A-Z])/g, " $1").trim()}
								</div>
								<div className="col-4 d-flex">
									<div className="form-check form-switch ms-auto mb-0">
										<input
											type="checkbox"
											className="form-check-input"
											id={`app${option}`}
											checked={getSetting(`app${option}`)}
											onChange={(e) => handleToggle(`app${option}`, e.target.checked)}
										/>
										<label className="form-check-label" htmlFor={`app${option}`}>
											&nbsp;
										</label>
									</div>
								</div>
							</div>
						)
					)}
				</div>

        <div className="theme-panel-divider"></div>
        <h5>Admin Design (6)</h5>
        <div className="theme-version">
          {['default', 'transparent', 'apple', 'material', 'facebook', 'google'].map((theme, i) => (
            <div key={i} className="theme-version-item">
              <a href={`https://seantheme.com/color-admin/admin/${theme}/index_v2.html`} className={`theme-version-link${i == 0 ? " active" : ""}`}>
                <span style={{ backgroundImage: `url(/assets/img/theme/${theme}.jpg)` }} className="theme-version-cover"></span>
              </a>
            </div>
          ))}
        </div>

        <div className="theme-panel-divider"></div>
        <h5>Language Version (9)</h5>
        <div className="theme-version">
          {versions.map(({ href, img, alert, active }, index) => (
            <div className="theme-version-item" key={index}>
              {alert ? (
                <a href="#" onClick={(e) => handleClick(e, alert)} className="theme-version-link">
                  <span style={{ backgroundImage: `url(${img})` }} className="theme-version-cover"></span>
                </a>
              ) : (
                <a href={href} className={`theme-version-link ${active ? "active" : ""}`}>
                  <span style={{ backgroundImage: `url(${img})` }} className="theme-version-cover"></span>
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="theme-panel-divider"></div>
        <h5>Frontend Design (5)</h5>
        <div className="theme-version">
          {['one-page-parallax', 'e-commerce', 'blog', 'forum', 'corporate'].map((theme, i) => (
            <div key={i} className="theme-version-item">
              <a
                href={`https://seantheme.com/color-admin/frontend/${theme}/`}
                target="_blank"
                rel="noreferrer"
                className="theme-version-link"
              >
                <span style={{ backgroundImage: `url(/assets/img/theme/${theme}.jpg)` }} className="theme-version-cover"></span>
              </a>
            </div>
          ))}
        </div>

        <div className="theme-panel-divider"></div>
        <a href="https://seantheme.com/color-admin/documentation/" className="btn btn-dark d-block w-100 rounded-pill mb-10px" target="_blank" rel="noreferrer">
          <b>Documentation</b>
        </a>
        <a href="#0" className="btn btn-default d-block w-100 rounded-pill">
          <b>Reset Local Storage</b>
        </a>
      </div>
    </div>
  );
}