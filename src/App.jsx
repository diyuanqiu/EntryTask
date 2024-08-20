import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import './App.css'
import LoginView from "./views/Login/LoginView.jsx";
import ListView from "./views/List/ListView.jsx";
import HomeView from "./views/Home/HomeView.jsx";
import ActivityDetailView from "./views/Detail/ActivityDetailView.jsx";
import {EventsProvider} from "./context/EventsContext.jsx";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/Login" replace />}
                    />
                    <Route
                        path="/Login"
                        element={<LoginView />}
                    />
                    <Route
                        path="/List"
                        element={
                            <EventsProvider>
                                <ListView />
                            </EventsProvider>
                        }
                    />
                    <Route
                        path="/Home"
                        element={
                            <EventsProvider>
                                <HomeView />
                            </EventsProvider>
                        }
                    />
                    <Route
                        path="/Detail"
                        element={
                            <EventsProvider>
                                    <ActivityDetailView />
                            </EventsProvider>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
