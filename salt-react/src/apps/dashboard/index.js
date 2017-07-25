import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RouteWithSubRoutes } from '_components/router';

import './css/style.css';
import './css/dashboard.css';

const Dashboard = () => (
  <MemoryRouter>
    <div>
      <RouteWithSubRoutes exact path="/" component="dashboard/containers/DashboardViewer.js" />
      <RouteWithSubRoutes path="/editor" component="dashboard/containers/DashboardEditor.js" />
    </div>
  </MemoryRouter>
);

export default Dashboard;
