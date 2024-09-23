import * as UserViews from '../constants/AllViews';
import React from 'react';
export const customerRoutes = [
	{id: 1, path: '/bill', element: <UserViews.CustomerDashboard />},
	{id: 2, path: '/home', element: <UserViews.CustomerPackages />},
	{id: 3, path: '/support', element: <UserViews.CustomerSupport />},
];
export const adminRoutes = [
	{id: 1, path: '/home', element: <UserViews.AdminDashboard />},
	{id: 2, path: '/packs', element: <UserViews.AdminPackages />},
	{id: 3, path: '/assist', element: <UserViews.CustomerSupport />},
];