import { HashRouter as Router, Routes, Route } from "react-router-dom";
import DemoPage from "./pages/[company]";

function Home() {
return (
<div style={{ padding: "40px", fontFamily: "Arial" }}> <h1>Roof Demo</h1> <p>Demo generator for roofing companies.</p> </div>
);
}

export default function App() {
return ( <Router> <Routes>
<Route path="/" element={<Home />} />
<Route path="/:company" element={<DemoPage />} /> </Routes> </Router>
);
}
