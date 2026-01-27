import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import Home from "./Home";
import Dictionary from "./Dictionary";
import Books from "./Books";
import Search from "../component/Search";

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
			/>

			{/* CONTENTS, SEARCHBAR, AND ROUTES FOR HYPERLINK */}
			<div className="px-10">
				{/* SEARCHBAR COMPONENT */}
				{location.pathname !== "/" && (
					<div className="flex justify-center items-center mx-auto flex-col w-full h-full">
						<Search setQuery={setQuery} />
					</div>
				)}

				<Routes location={location} key={location.pathname}>
					{/* HOME CONTENT */}
					<Route path="/" element={<Home />} />

					{/* DICTIONARY CONTENT */}
					<Route
						path="/dictionary"
						element={<Dictionary query={query} />}
					/>

					{/* BOOKS CONTENT */}
					<Route path="/books" element={<Books query={query} />} />
				</Routes>
			</div>
		</div>
	);
};

export default Dashboard;
