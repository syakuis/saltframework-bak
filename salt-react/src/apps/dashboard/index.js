import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { RouteWithSubRoutes } from '_components/router';

import './css/style.css';
import './css/dashboard.css';

const Dashboard = () => (
  <Router>
    <div>
      <RouteWithSubRoutes exact path="/" component="dashboard/containers/DashboardViewer.js" />
      <RouteWithSubRoutes path="/dashboard/editor" component="dashboard/containers/DashboardEditor.js" />
    </div>
  </Router>
);

export default Dashboard;
