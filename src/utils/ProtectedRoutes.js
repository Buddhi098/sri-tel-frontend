import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
function ProtectedRoutes({isSignedIn, children}) {
	return isSignedIn == 'null' ? <Navigate to='/' /> : <Outlet />;
	// return isSignedIn == 'null' ? <Outlet /> : <Outlet />;
}
export default ProtectedRoutes;
