import Searchbar from "../component/Searchbar";

const Home = () => {
	return (
		<div className="flex justify-center items-center mx-auto my-6 flex-col w-full h-full">
			<div>
				<Searchbar context={Home}/>
			</div>
		</div>
	);
};

export default Home;
