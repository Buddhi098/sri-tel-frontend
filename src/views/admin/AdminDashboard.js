import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from '@mui/material';
import CustomerServiceIcon from '@mui/icons-material/SupportAgent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import '../../css/admin/admin.css';

const data = [
  { name: '10/17', Data: 1459870, Voice: 996450 },
  { name: '10/18', Data: 986560, Voice: 1045805 },
  { name: '10/19', Data: 1135690, Voice: 1034770 },
  { name: '10/20', Data: 1257450, Voice: 845580 },
  { name: '10/21', Data: 1087770, Voice: 970470 },
  { name: '10/22', Data: 1135660, Voice: 1032880 },
  { name: '10/23', Data: 1645760, Voice: 1276450 },
];

export default function AdminDashboard() {
  return (
	<div className="admin-dashboard" style={{ margin: '40px' }}> 
	  <header className="admin-header">
		<h1>Sri Tel Ltd (STL) - Admin Dashboard</h1>
		<h2>Welcome to Sri-Care</h2>
	  </header>
	  <section className="admin-section">
		<h3>Revenue (Last 7 days)</h3>
		<ResponsiveContainer width="100%" height={400}>
		  <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="Voice" stroke="#8884d8" activeDot={{ r: 8 }} />
			<Line type="monotone" dataKey="Data" stroke="#82ca9d" />
		  </LineChart>
		</ResponsiveContainer>
	  </section>
	  <section className="admin-section">
		<h3>Customer Care</h3>
		<Link href="/customer-care" underline="hover">
		  <CustomerServiceIcon /> Customer Care
		</Link>
		<p>Improve customer care and experience to attract new customers.</p>
	  </section>
	  <section className="admin-section">
		<h3>Account Creation</h3>
		<Link href="#" underline="hover">
		  <AccountCircleIcon /> Account Creation
		</Link>
		<p>Provide a simple and secure methodology for online account creation without manual steps.</p>
	  </section>
	  <section className="admin-section">
		<h3>Password Recovery</h3>
		<Link href="/password-recovery" underline="hover">
		  <LockResetIcon /> Password Recovery
		</Link>
		<p>Implement a simple and secure method for recovering and changing user passwords.</p>
	  </section>
	</div>
  );
}
