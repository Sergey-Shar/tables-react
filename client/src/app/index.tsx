import "bootstrap/dist/css/bootstrap.min.css";
import { MainTable } from "features/table";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";

const App = () => {
	return (
		<Provider store={store}>
			<MainTable />
		</Provider>
	);
};
export default App;
