import "@/App.css";
import { useScrollTracker } from "ratflow-sdk-react";
import {
    Link,
    Outlet,
    Route,
    Router,
    Routes,
    useLocation,
} from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import { useEffect } from "react";
import { useAnalytics } from "ratflow-sdk-react";
import LongPage from "./pages/long-page";
import { tags } from "./ratflow";

function AppLayout() {
    return (
        <>
            <nav style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Link to="/">Home</Link>
                <Link to="/long-page">Long page</Link>
                <Link to="/about">About</Link>
            </nav>
            <Outlet />
        </>
    );
}
function App() {
    const { ref } = useScrollTracker({ tag: tags.mainAppScroll });
    const { pathname } = useLocation();
    const { setCurrentPage } = useAnalytics();

    useEffect(() => {
        setCurrentPage(pathname);
    }, [pathname]);

    return (
        <div ref={ref} className="App" style={{height: "100%", width: "100%", overflowY: "scroll"}}>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/long-page" element={<LongPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
