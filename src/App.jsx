import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import LoginView from "./views/Login/LoginView.jsx";
import ListView from "./views/List/ListView.jsx";
import HomeView from "./views/Home/HomeView.jsx";
import ActivityDetailView from "./views/Detail/ActivityDetailView.jsx";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<LoginView />}
                    />
                    <Route
                        path="/List"
                        element={<ListView />}
                    />
                    <Route
                        path="/Home"
                        element={<HomeView />}
                    />
                    <Route
                        path="/Detail"
                        element={<ActivityDetailView />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
