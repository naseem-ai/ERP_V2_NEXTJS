'use client';

import React from 'react';

export default function DropdownMegaMenu() {
  return (
    <div className="collapse d-md-block me-auto" id="top-navbar">
      <div className="navbar-nav">
        <div className="navbar-item dropdown dropdown-lg">
          <a href="#" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
            <i className="fa fa-th-large fa-fw me-1"></i>
            <span className="d-lg-inline d-md-none">Mega</span>
            <b className="caret ms-1"></b>
          </a>
          <div className="dropdown-menu dropdown-menu-lg text-gray-900">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="h5 fw-bolder mb-2">UI Kits</div>
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <ul className="nav d-block fw-bold">
                      {["FontAwesome", "Ionicons", "Simple Line Icons", "Typography", "Media Object", "Widget Boxes", "Tabs & Accordions"].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-ellipsis text-dark text-decoration-none">
                            <i className="fa fa-chevron-right fa-fw text-gray-500"></i> {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="nav d-block fw-bold">
                      {["Unlimited Nav Tabs", "Modal & Notification", "Buttons"].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-ellipsis text-dark text-decoration-none">
                            <i className="fa fa-chevron-right fa-fw text-gray-500"></i> {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="h5 fw-bolder mb-2">
                  Page Options <span className="badge bg-pink ms-2">11</span>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <ul className="nav d-block fw-bold">
                      <li>
                        <a href="#" className="text-ellipsis text-dark text-decoration-none">
                          <i className="fa fa-chevron-right fa-fw text-gray-500"></i> Blank Page
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-ellipsis text-dark text-decoration-none">
                          <i className="fa fa-chevron-right fa-fw text-gray-500"></i> Page with Footer
                          <span className="badge bg-success py-1 ms-2">NEW</span>
                        </a>
                      </li>
                      {["Page without Sidebar", "Page with Right Sidebar", "Page with Minified Sidebar", "Page with Two Sidebar", "Page with Line Icons"].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-ellipsis text-dark text-decoration-none">
                            <i className="fa fa-chevron-right fa-fw text-gray-500"></i> {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="nav d-block fw-bold">
                      {["Full Height Content", "Page with Mega Menu", "Page with Light Sidebar", "Page with Large Sidebar"].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-ellipsis text-dark text-decoration-none">
                            <i className="fa fa-chevron-right fa-fw text-gray-500"></i> {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 fw-bold">
                <div className="h5 fw-bolder mb-2">Paragraph</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis libero purus, fermentum at libero convallis, auctor dignissim mauris. Nunc laoreet pellentesque turpis sodales ornare. Nunc vestibulum nunc lorem, at sodales velit malesuada congue. Nam est tortor, tincidunt sit amet eros vitae, aliquam finibus mauris.
                </p>
                <p>
                  Fusce ac ligula laoreet ante dapibus mattis. Nam auctor vulputate aliquam. Suspendisse efficitur, felis sed elementum eleifend, ipsum tellus sodales nisi, ut condimentum nisi sem in nibh. Phasellus suscipit vulputate purus at venenatis. Quisque luctus tincidunt tempor.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-item">
          <a href="#" className="navbar-link d-flex align-items-center">
            <i className="fa fa-gem fa-fw me-1"></i>
            <span className="d-lg-inline d-md-none">Client</span>
          </a>
        </div>

        <div className="navbar-item dropdown">
          <a href="#" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
            <i className="fa fa-database fa-fw me-1"></i>
            <span className="d-lg-inline d-md-none">New</span>
            <b className="caret ms-1"></b>
          </a>
          <div className="dropdown-menu">
            {["Action", "Another action", "Something else here"].map((item) => (
              <a key={item} href="#" className="dropdown-item">
                {item}
              </a>
            ))}
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">Separated link</a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">One more separated link</a>
          </div>
        </div>
      </div>
    </div>
  );
}