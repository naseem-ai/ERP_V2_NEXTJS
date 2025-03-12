declare module 'react-color' {
  export interface SketchPickerProps {
    color: string;
    onChangeComplete: (color: { hex: string }) => void;
  }

  export const SketchPicker: React.FC<SketchPickerProps>;
  
  export interface ChromePickerProps {
    color: string;
    onChangeComplete: (color: { hex: string }) => void;
  }

  export const ChromePicker: React.FC<ChromePickerProps>;
}

declare module 'lity' {
  const lity: unknown;
  export = lity;
}

declare module 'jsvectormap' {
  export interface JsVectorMapOptions {
    selector: string;
    map: string;
    zoomButtons?: boolean;
		normalizeFunction?: string;
		hoverOpacity?: number;
		hoverColor?: boolean;
		zoomOnScroll?: boolean;
		series?: object;
		focusOn?: object;
		markers?: object;
		markerStyle?: object;
		markerLabelStyle?: object;
    regionStyle?: {
      initial?: {
        fill?: string;
				fillOpacity?: number;
				stroke?: string;
				strokeWidth?: number;
				strokeOpacity?: number;
      };
      hover?: {
				fillOpacity: number;
			};
    };
    mapData?: object;
    labels? : {
    	markers?: {
        render?: (marker: Marker) => string;
      };
    };
    backgroundColor?: string;
  }

  export default class JsVectorMap {
    constructor(options: JsVectorMapOptions);
    setMapData(mapData: object): void;
    resizeMap(): void;
  }
}

declare module 'jsvectormap/dist/maps/world.js' {
  const mapData: object;
  export default mapData;
}

declare module 'datatables.net-buttons/js/buttons.colVis.min.js';
declare module 'datatables.net-buttons/js/buttons.html5.min.js';
declare module 'datatables.net-buttons/js/buttons.print.min.js';