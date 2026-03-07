import { useRouter } from "next/router";

export default function DemoPage() {
  const router = useRouter();
  const { company } = router.query;

  const companyName =
    typeof company === "string"
      ? company.replace(/-/g, " ")
      : "Your Roofing Company";

  return (
    <div style={{padding:"40px",fontFamily:"Arial"}}>
      <h1>{companyName}</h1>
      <h2>Your Roof. Our Priority.</h2>

      <p>
        This is a demo website mockup built for {companyName}.
      </p>

      <button style={{padding:"12px 20px"}}>
        Get Free Roof Inspection
      </button>
    </div>
  );
}
