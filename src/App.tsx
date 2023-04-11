import "@/App.css";
import useScrollTracker from "./hooks/trackers/use-scroll";
import {
    Link,
    Outlet,
    Route,
    Router,
    Routes,
    useLocation,
} from "react-router-dom";
import NotFound from "./components/not-found";
import Home from "./components/home";
import { useEffect } from "react";
import { useAnalytics } from "./contexts/analytics-context";

function AppLayout() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/fdsfds">???</Link>
            </nav>
            <Outlet />
        </div>
    );
}
function App() {
    const { ref } = useScrollTracker({ tag: "div" });
    const { pathname } = useLocation();
    const { setCurrentPage } = useAnalytics();

    useEffect(() => {
      setCurrentPage(pathname);
    }, [pathname]);

    return (
        <div ref={ref} className="App">
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
