import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";

function Router() {
    return (
        <Routes>
            <Route path={"*"} element={<Home/>}/>
            <Route path={'/login'} element={<Login/>}/>
        </Routes>
    );
}

export default Router;