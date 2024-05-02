import {useScrollToTop} from "./hooks/use-scroll-to-top.js";
import Router from "./routes/sections.jsx";

export default function App() {
    useScrollToTop()
    return (
        <Router/>
    )
}