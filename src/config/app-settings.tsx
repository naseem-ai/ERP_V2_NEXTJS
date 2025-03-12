import { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of the settings
interface AppSettings {
	appTheme: string;
  appBoxedLayout: boolean;
  appContentClass: string;
  appContentFullHeight: boolean;
  appContentNone: boolean;
  appHeaderNone: boolean;
  appHeaderFixed: boolean;
  appHeaderInverse: boolean;
  appHeaderMegaMenu: boolean;
  appHeaderLanguageBar: boolean;
  appSidebarWide: boolean;
  appSidebarTwo: boolean;
  appSidebarHover: boolean;
  appSidebarEnd: boolean;
  appSidebarEndToggled: boolean;
  appSidebarEndMobileToggled: boolean;
  appSidebarSearch: boolean;
  appSidebarFixed: boolean;
  appSidebarGrid: boolean;
  appSidebarNone: boolean;
  appSidebarMobileToggled: boolean;
  appSidebarMinified: boolean;
  appSidebarInverse: boolean;
  appSidebarLight: boolean;
  appSidebarTransparent: boolean;
  appFooter: boolean;
  appTopMenu: boolean;
  appTopMenuMobileToggled: boolean;
  appGradientEnabled: boolean;
}

interface AppSettingsContextValue {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

// Default app settings
const defaultSettings: AppSettings = {
	appTheme: '',
  appBoxedLayout: false,
  appContentClass: '',
  appContentFullHeight: false,
  appContentNone: false,
  appHeaderNone: false,
  appHeaderFixed: true,
  appHeaderInverse: false,
  appHeaderMegaMenu: false,
  appHeaderLanguageBar: false,
  appSidebarWide: false,
  appSidebarTwo: false,
  appSidebarHover: false,
  appSidebarEnd: false,
  appSidebarEndToggled: false,
  appSidebarEndMobileToggled: false,
  appSidebarSearch: false,
  appSidebarFixed: true,
  appSidebarGrid: false,
  appSidebarNone: false,
  appSidebarMobileToggled: false,
  appSidebarMinified: false,
  appSidebarInverse: true,
  appSidebarLight: false,
  appSidebarTransparent: false,
  appFooter: false,
  appTopMenu: false,
  appTopMenuMobileToggled: false,
  appGradientEnabled: false
};

const AppSettingsContext = createContext<AppSettingsContextValue | undefined>(
  undefined
);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <AppSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = (): AppSettingsContextValue => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};