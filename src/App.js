// import logo from './logo.svg';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import './App.css';
import DetailPokemon from "./pages/DetailPokemon";
import ListPokemon from "./pages/ListPokemon";
import MyPokemon from "./pages/MyPokemon";
import WebRoute from "./routes/routes";

function App() {
	return (
        <Router>
            <Routes>
                <Route path="/" element={<WebRoute />}>
                    <Route path='/' element={<ListPokemon />} />
                    <Route path='pokemon/:pokemon' element={<DetailPokemon />} />
                    <Route path='my-pokemon' element={<MyPokemon />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;
