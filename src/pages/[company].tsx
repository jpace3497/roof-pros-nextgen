import { useParams } from "react-router-dom";

export default function DemoPage() {
const { company } = useParams();

const companyName = company
? company.replace(/-/g, " ")
: "Your Roofing Company";

return (
<div style={{ padding: "40px", fontFamily: "Arial" }}> <h1>{companyName}</h1> <h2>Your Roof. Our Priority.</h2>

  <p>This is a demo website mockup built for {companyName}.</p>

  <button style={{ padding: "12px 20px", marginTop: "20px" }}>
    Get Free Roof Inspection
  </button>
</div>

);
}
