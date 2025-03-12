'use client';

import React, { createContext, useState, useContext, useRef, ReactNode } from 'react';
import { slideToggle } from '@/composables/slideToggle';

interface PanelContextType {
  expand: boolean;
  reload: boolean;
  remove: boolean;
  toggleExpand: () => void;
  toggleReload: () => void;
  toggleRemove: () => void;
  toggleCollapse: () => void;
  panelBodyRef: React.RefObject<HTMLDivElement>;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

interface PanelProps {
  theme?: string;
  className?: string;
  children: ReactNode;
}

export function Panel({ theme = 'inverse', className = '', children }: PanelProps) {
  const [expand, setExpand] = useState(false);
  const [reload, setReload] = useState(false);
  const [remove, setRemove] = useState(false);
  const panelBodyRef = useRef<HTMLDivElement>(null!);

  const toggleExpand = () => setExpand((prev) => !prev);
  const toggleRemove = () => setRemove((prev) => !prev);
  const toggleReload = () => {
    if (!reload) {
      setReload(true);
      setTimeout(() => setReload(false), 2000);
    }
  };

  const toggleCollapse = () => {
    if (panelBodyRef.current) {
      slideToggle(panelBodyRef.current);
    }
  };

  const panelState: PanelContextType = {
    expand,
    reload,
    remove,
    toggleExpand,
    toggleReload,
    toggleRemove,
    toggleCollapse,
    panelBodyRef,
  };

  return (
    <PanelContext.Provider value={panelState}>
      {!remove && (
        <div className={`panel panel-${theme} ${expand ? 'panel-expand' : ''} ${reload ? 'panel-loading' : ''} ${className}`}>
          {children}
        </div>
      )}
    </PanelContext.Provider>
  );
}

interface PanelHeaderProps {
  className?: string;
  noButton?: boolean;
  children?: ReactNode;
}

export function PanelHeader({ className = '', noButton = false, children }: PanelHeaderProps) {
  const context = useContext(PanelContext);
  if (!context) throw new Error('PanelHeader must be used within a Panel');

  const { toggleExpand, toggleReload, toggleRemove, toggleCollapse } = context;

  return (
    <div className={`panel-heading ${className}`}>
      <h4 className="panel-title">{children}</h4>
      {!noButton && (
        <div className="panel-heading-btn">
          <button className="btn btn-xs btn-icon btn-circle btn-default" onClick={toggleExpand}>
            <i className="fa fa-expand"></i>
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-xs btn-icon btn-circle btn-success" onClick={toggleReload}>
            <i className="fa fa-redo"></i>
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-xs btn-icon btn-circle btn-warning" onClick={toggleCollapse}>
            <i className="fa fa-minus"></i>
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-xs btn-icon btn-circle btn-danger" onClick={toggleRemove}>
            <i className="fa fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
}

interface PanelBodyProps {
  className?: string;
  children?: ReactNode;
}

export function PanelBody({ className = '', children }: PanelBodyProps) {
  const context = useContext(PanelContext);
  if (!context) throw new Error('PanelBody must be used within a Panel');

  const { reload, panelBodyRef } = context;

  return (
    <div ref={panelBodyRef} className={`panel-body ${className}`}>
      {children}
      {reload && (
        <div className="panel-loader">
          <span className="spinner spinner-sm"></span>
        </div>
      )}
    </div>
  );
}

interface PanelFooterProps {
  className?: string;
  children?: ReactNode;
}

export function PanelFooter({ className = '', children }: PanelFooterProps) {
  return <div className={`panel-footer ${className}`}>{children}</div>;
}