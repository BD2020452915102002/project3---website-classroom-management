import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import News from "../pages/student/News.jsx";
import Statistic from "../pages/student/Statistic.jsx";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Home />}>
                <Route index element={<Navigate to="news" replace />} />
                <Route path="news" element={<News />} />
                <Route path="statistic" element={<Statistic />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default Router;