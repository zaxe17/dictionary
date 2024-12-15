import { useState } from "react";
import Sidebar from "./component/Sidebar";
import Dashboard from "./content/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
	const [sidebarToggle, setSidebarToggle] = useState(false);

	return (
		<Router>
			<div className="flex selection:text-emerald-700 selection:bg-emerald-200">
				{/* BACKGROUND */}
				<div className="fixed top-0 -z-10 h-full w-full">
					<div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#ccfbf1_10%,#0f766e_100%)] transform rotate-180"></div>
				</div>

				{/* SIDEBAR COMPONENT */}
				<Sidebar sidebarToggle={sidebarToggle} />

				{/* DASHBOARD CONTENT, AND SIDEBAR TOGGLE */}
				<Dashboard
					sidebarToggle={sidebarToggle}
					setSidebarToggle={setSidebarToggle}
				/>
			</div>
		</Router>
	);
};

export default App;
