import { useState } from "react";
import Sidebar from "./contents/Sidebar";
import Dashboard from "./contents/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
	const [sidebarToggle, setSidebarToggle] = useState(false);

	return (
		<Router>
			<div className="flex">
				<div className="fixed top-0 -z-10 h-full w-full">
					<div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#0f766e_100%)]"></div>
				</div>

				<Sidebar sidebarToggle={sidebarToggle} />

				<Dashboard
					sidebarToggle={sidebarToggle}
					setSidebarToggle={setSidebarToggle}
				/>
			</div>
		</Router>
	);
};

export default App;
