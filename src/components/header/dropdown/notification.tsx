'use client';

import React from 'react';
import Image from 'next/image';

export default function DropdownNotification() {
  return (
    <div className="navbar-item dropdown">
      <a href="#" data-bs-toggle="dropdown" className="navbar-link dropdown-toggle icon">
        <i className="fa fa-bell"></i>
        <span className="badge">0</span>
      </a>
      <div className="dropdown-menu media-list dropdown-menu-end">
        <div className="dropdown-header">NOTIFICATIONS (5)</div>
        
        <div className="text-center w-300px py-3">
					No notification found
				</div>
      </div>
    </div>
  );
}