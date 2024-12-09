import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
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
				<AnimatePresence mode="wait">
					<Routes location={location} key={location.pathname}>
						<Route
							path="/"
							element={
								<motion.div
									whileInView={{ opacity: 1 }}
									initial={{ opacity: 0 }}
									transition={{ duration: 0.5 }}>
									<Home />
								</motion.div>
							}
						/>
						<Route
							path="/dictionary"
							element={
								<motion.div
									whileInView={{ opacity: 1}}
									initial={{ opacity: 0}}
									transition={{ duration: 0.5 }}>
									<Dictionary query={query} />
								</motion.div>
							}
						/>
						<Route
							path="/books"
							element={
								<motion.div
									whileInView={{ opacity: 1, x: 0 }}
									initial={{ opacity: 0, x: 50 }}
									transition={{ duration: 0.5 }}>
									<Books query={query} />
								</motion.div>
							}
						/>
					</Routes>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Dashboard;
