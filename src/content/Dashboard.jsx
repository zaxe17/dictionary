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
			{/* NAVBAR COMPONENT */}
			<Navbar
				sidebarToggle={sidebarToggle}
				setSidebarToggle={setSidebarToggle}
				setQuery={setQuery}
			/>

			{/* CONTENTS AND ROUTES FOR HYPERLINK */}
			<div className="px-10">
				<Routes location={location} key={location.pathname}>

					{/* HOME CONTENT */}
					<Route path="/" element={<Home />} />

					{/* DICTIONARY CONTENT */}
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
