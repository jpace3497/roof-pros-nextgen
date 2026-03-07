import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

function DemoPage() {
  const { company } = useParams()

  const companyName = company
    ? company.replace(/-/g, " ")
    : "Your Roofing Company"

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>{companyName}</h1>
      <h2>Your Roof. Our Priority.</h2>

      <p>
        This is a demo website mockup built for {companyName}.
      </p>

      <button style={{ padding: "12px 20px" }}>
        Get Free Roof Inspection
      </button>
    </div>
  )
}

function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Roof Demo</h1>
      <p>Demo generator for roofing companies.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:company" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
