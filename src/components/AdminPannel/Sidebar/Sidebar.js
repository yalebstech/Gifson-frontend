import {
	faCalendar,
	faHome,
	faMailBulk,
	faShoppingBasket,
	faSignOutAlt,
	faUserPlus,
	faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Authentication/useAuth';
import './Sidebar.css';

const Sidebar = () => {

	const auth = useAuth();

	return (
		<div className="sidebar d-flex flex-column justify-content-between py-4 px-3" style={{ height: '100vh' }}>
			<ul className="list-unstyled nav flex-column">
				<li className="nav-item">
					<Link to="/admin/gifson" className="text-white nav-link ">
						<span>Gifson</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/admin/gifson/dashboard" className="text-white nav-link">
						<FontAwesomeIcon icon={faHome} /> <span>Dashboard</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/admin/gifson/allOrders" className="text-white nav-link ">
						<FontAwesomeIcon icon={faCalendar} /> <span>Orders</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/admin/gifson/products" className="text-white nav-link">
						<FontAwesomeIcon icon={faShoppingBasket} /> <span>Products</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/admin/gifson/customers" className="text-white nav-link">
						<FontAwesomeIcon icon={faUsers} /> <span>Customers</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/admin/gifson/registration" className="text-white nav-link ">
						<FontAwesomeIcon icon={faUserPlus} /> <span>Registration</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/admin/gifson/support" className="text-white nav-link ">
						<FontAwesomeIcon icon={faMailBulk} /> <span>Support</span>
					</Link>
				</li>
			</ul>
			<div>
				<ul className="list-unstyled nav">
					<li className="nav-item">
						<Link to="/admin/gifson" className="text-white nav-link">
							<FontAwesomeIcon
								icon={faSignOutAlt}
								onClick={() => {
									auth.signOut();
								}}
							/>
							<span>Logout</span>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
