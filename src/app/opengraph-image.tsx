import { ImageResponse } from "next/og";

export const alt = "Avijnan Purkait — Intelligent field systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", color: "#ECE8D8", background: "#0A0B0A", padding: "54px" }}>
        <div style={{ position: "absolute", width: "920px", height: "920px", borderRadius: "50%", top: "-490px", right: "-160px", border: "2px solid #D6FF2B", opacity: 0.6 }} />
        <div style={{ position: "absolute", width: "660px", height: "660px", borderRadius: "50%", top: "-360px", right: "-35px", border: "2px solid #D6FF2B", opacity: 0.35 }} />
        <div style={{ position: "absolute", top: "0", right: "0", bottom: "0", width: "315px", display: "flex", background: "#D6FF2B" }} />
        <div style={{ position: "absolute", top: "40px", right: "40px", width: "235px", height: "550px", display: "flex", flexDirection: "column", justifyContent: "space-between", border: "2px solid #0A0B0A", padding: "18px", color: "#0A0B0A" }}>
          <span style={{ fontSize: "18px", fontFamily: "monospace" }}>FIELD MANUAL / 01</span>
          <span style={{ display: "flex", fontSize: "92px", lineHeight: 0.78, fontWeight: 900, letterSpacing: "-7px" }}>AP</span>
          <span style={{ fontSize: "18px", fontFamily: "monospace" }}>KOLKATA — INDIA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "860px" }}>
          <div style={{ display: "flex", fontSize: "19px", fontFamily: "monospace", color: "#D6FF2B" }}>AVIJNAN PURKAIT — SYSTEMS BUILDER</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: "112px", lineHeight: 0.76, fontWeight: 900, letterSpacing: "-7px" }}>
            <span>INTELLIGENT</span>
            <span style={{ color: "#D6FF2B" }}>FIELD SYSTEMS</span>
          </div>
          <div style={{ display: "flex", width: "640px", fontSize: "23px", lineHeight: 1.35, color: "#B4B5AB" }}>AI, computer vision, edge intelligence, and resilient hardware made tangible.</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
