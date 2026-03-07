import { useParams } from "react-router-dom";

export default function DemoPage() {
  const { company } = useParams();

  const companyName = company
    ? company.replace(/-/g, " ")
    : "Your Roofing Company";

  return (
    <div style={{ fontFamily: "Arial", margin: 0, padding: 0 }}>

      {/* HERO SECTION */}
      <div
        style={{
          background: "#1e293b",
          color: "white",
          padding: "80px 40px",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
          {companyName}
        </h1>

        <h2 style={{ fontWeight: "normal" }}>
          Trusted Roofing Experts
        </h2>

        <button
          style={{
            marginTop: "30px",
            padding: "14px 28px",
            fontSize: "16px",
            background: "#f97316",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Get Free Roof Inspection
        </button>
      </div>

      {/* SERVICES */}
      <div style={{ padding: "60px 40px", textAlign: "center" }}>
        <h2>Our Roofing Services</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "40px"
          }}
        >
          <div>Roof Repair</div>
          <div>Roof Replacement</div>
          <div>Shingle Roofing</div>
          <div>Emergency Leak Repair</div>
        </div>
      </div>

      {/* REVIEWS */}
      <div
        style={{
          background: "#f1f5f9",
          padding: "60px 40px",
          textAlign: "center"
        }}
      >
        <h2>Customer Reviews</h2>
        <p style={{ fontSize: "22px", marginTop: "10px" }}>
          ★★★★★ 4.9 Rating from Local Homeowners
        </p>
      </div>

      {/* CTA */}
      <div style={{ padding: "80px 40px", textAlign: "center" }}>
        <h2>Schedule Your Free Roof Inspection</h2>

        <button
          style={{
            marginTop: "20px",
            padding: "14px 28px",
            fontSize: "16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Request Estimate
        </button>
      </div>

    </div>
  );
}
