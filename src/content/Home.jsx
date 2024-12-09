import Searchbar from "../component/Searchbar";
import { motion } from "framer-motion";

const Home = () => {
	return (
		<div className="flex justify-center items-center mx-auto my-6 flex-col w-full h-full">
			<motion.div
				whileInView={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 50 }}
				transition={{ duration: 0.5 }}>
				<Searchbar context={Home}/>
			</motion.div>
		</div>
	);
};

export default Home;
