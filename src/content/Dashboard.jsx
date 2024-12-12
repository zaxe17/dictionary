import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import Home from "./Home";
import Dictionary from "./Dictionary";
import Books from "./Books";

const Dashboard = ({ sidebarToggle, setSidebarToggle }) => {
	const [query, setQuery] = useState("");
	const location = useLocation();

	return (
		<div
			className={`${
				sidebarToggle ? "" : "lg:ml-64"
			} w-full transition-all duration-300 ease-in-out`}>
			<Navbar
				sidebarToggle={sidebarToggle}
				setSidebarToggle={setSidebarToggle}
				setQuery={setQuery}
			/>
			<div className="px-10">
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Home />} />
					<Route
						path="/dictionary"
						element={<Dictionary query={query} />}
					/>
					<Route path="/books" element={<Books query={query} />} />
				</Routes>
			</div>
		</div>
	);
};

export default Dashboard;
