"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Activity, BatteryCharging, Radio, CheckCircle2, AlertTriangle, Play, RotateCcw } from "lucide-react";

type LabMode = "solvex" | "fitvision" | "battery" | "setuka";

export function Workbench({ onClose }: { onClose: () => void }) {
  const [activeMode, setActiveMode] = useState<LabMode>("solvex");

  // Mode 1: SolveX state
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [simulateHallucination, setSimulateHallucination] = useState(false);
  const [gateStatus, setGateStatus] = useState<"idle" | "verifying" | "passed" | "rejected">("passed");

  const prompts = [
    { title: "AM-GM Inequality Proof", router: "Algebra & Analysis Specialist", latex: "\\frac{a + b}{2} \\ge \\sqrt{ab}", viz: "Geometric Square Partition" },
    { title: "EV Battery Degradation", router: "Deterministic Regression Specialist", latex: "SoH(t) = 1 - \\alpha t^{\\beta} e^{-\\frac{E_a}{RT}}", viz: "Cycle Capacity Decay Curve" },
    { title: "2D Kinematics Inversion", router: "Biomechanical Motion Specialist", latex: "\\theta_{knee} = \\arccos\\left(\\frac{L_1^2 + L_2^2 - D^2}{2 L_1 L_2}\\right)", viz: "17-Point Skeletal Keypoints" },
  ];

  // Mode 2: FitVision state
  const [squatReps, setSquatReps] = useState(6);
  const [kneeAngle, setKneeAngle] = useState(94);
  const fitCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mode 3: Battery Lab state
  const [cycleCount, setCycleCount] = useState(380);
  const [temperature, setTemperature] = useState(25);
  const [cRate, setCRate] = useState(1.0);
  const batteryCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mode 4: Mesh state
  const [meshNodes, setMeshNodes] = useState([
    { id: "N01", name: "Alpine Relay", x: 0.18, y: 0.35, active: true },
    { id: "N02", name: "Valley Bridge", x: 0.45, y: 0.22, active: true },
    { id: "N03", name: "Ridge Post", x: 0.78, y: 0.38, active: true },
    { id: "N04", name: "Camp Echo", x: 0.62, y: 0.75, active: true },
    { id: "GATEWAY", name: "HQ Terminal", x: 0.25, y: 0.72, active: true },
  ]);
  const meshCanvasRef = useRef<HTMLCanvasElement>(null);

  // Trigger verification flow on prompt or toggle change
  const runSolveXGate = useCallback(() => {
    setGateStatus("verifying");
    const timer = setTimeout(() => {
      setGateStatus(simulateHallucination ? "rejected" : "passed");
    }, 450);
    return () => clearTimeout(timer);
  }, [simulateHallucination]);

  useEffect(() => {
    if (activeMode === "solvex") {
      runSolveXGate();
    }
  }, [selectedPrompt, simulateHallucination, activeMode, runSolveXGate]);

  // FitVision canvas loop
  useEffect(() => {
    if (activeMode !== "fitvision") return;
    const canvas = fitCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const draw = () => {
      t += 0.03;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Background grid
      ctx.strokeStyle = "rgba(25, 35, 25, 0.6)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      const cycle = (Math.sin(t) + 1) / 2; // 0 to 1
      const currentAngle = Math.round(86 + cycle * 76);
      setKneeAngle(currentAngle);

      const cx = W * 0.5;
      const cy = H * 0.44 + (1 - cycle) * 36;

      const head = { x: cx, y: cy - 90 };
      const neck = { x: cx, y: cy - 65 };
      const hip = { x: cx, y: cy + 18 };
      const hipL = { x: cx - (24 + (1 - cycle) * 10), y: hip.y };
      const hipR = { x: cx + (24 + (1 - cycle) * 10), y: hip.y };
      const kneeL = { x: cx - (44 + (1 - cycle) * 20), y: cy + 74 - (1 - cycle) * 18 };
      const kneeR = { x: cx + (44 + (1 - cycle) * 20), y: cy + 74 - (1 - cycle) * 18 };
      const ankleL = { x: cx - 36, y: H * 0.82 };
      const ankleR = { x: cx + 36, y: H * 0.82 };

      // Draw bones
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(214, 255, 43, 0.9)";
      ctx.beginPath();
      ctx.moveTo(head.x, head.y); ctx.lineTo(neck.x, neck.y); ctx.lineTo(hip.x, hip.y);
      ctx.moveTo(hipL.x, hipL.y); ctx.lineTo(kneeL.x, kneeL.y); ctx.lineTo(ankleL.x, ankleL.y);
      ctx.moveTo(hipR.x, hipR.y); ctx.lineTo(kneeR.x, kneeR.y); ctx.lineTo(ankleR.x, ankleR.y);
      ctx.stroke();

      // Head
      ctx.strokeStyle = "rgba(214, 255, 43, 0.8)";
      ctx.beginPath();
      ctx.arc(head.x, head.y - 10, 18, 0, Math.PI * 2);
      ctx.stroke();

      // Joints
      [head, neck, hip, hipL, hipR, kneeL, kneeR, ankleL, ankleR].forEach(j => {
        ctx.fillStyle = "rgba(211, 106, 75, 1)";
        ctx.beginPath();
        ctx.arc(j.x, j.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Knee angle arc
      ctx.strokeStyle = "rgba(211, 106, 75, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(kneeL.x, kneeL.y, 28, Math.PI * 0.5, Math.PI * 0.5 + (currentAngle * Math.PI) / 180);
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [activeMode]);

  // Battery Degradation simulator calculation
  const calculateBattery = () => {
    // Deterministic electrochemical Arrhenius & cycle power-law
    // SoH = 1 - A * cycles^0.55 * exp(-Ea / (R * T)) * (C_rate^0.2)
    const tempK = temperature + 273.15;
    const tempFactor = Math.exp((temperature - 25) / 38);
    const cRateFactor = Math.pow(cRate, 0.35);
    const loss = 0.00048 * Math.pow(cycleCount, 0.62) * tempFactor * cRateFactor;
    const soh = Math.max(55, Math.round((1 - loss) * 1000) / 10);
    const rul = Math.max(0, Math.round((soh - 70) * 36)); // Cycles until 70% EOL
    return { soh, rul };
  };

  const { soh, rul } = calculateBattery();

  // Battery Canvas graph loop
  useEffect(() => {
    if (activeMode !== "battery") return;
    const canvas = batteryCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Axes & grid
    ctx.strokeStyle = "rgba(40, 55, 40, 0.7)";
    ctx.lineWidth = 1;
    for (let y = 30; y < H - 40; y += 35) {
      ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }

    // Baseline 100% and 70% threshold
    const y100 = 40;
    const y70 = H - 60;
    ctx.strokeStyle = "rgba(211, 106, 75, 0.6)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(50, y70); ctx.lineTo(W - 20, y70); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(211, 106, 75, 0.8)";
    ctx.font = "9px monospace";
    ctx.fillText("70% EOL THRESHOLD", W - 140, y70 - 6);

    // Plot degradation curve across cycles 0 to 1500
    ctx.strokeStyle = "rgba(214, 255, 43, 0.9)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const maxCycles = 1500;
    const tempFactor = Math.exp((temperature - 25) / 38);
    const cRateFactor = Math.pow(cRate, 0.35);

    let curPoint = { x: 50, y: y100 };

    for (let c = 0; c <= maxCycles; c += 25) {
      const loss = 0.00048 * Math.pow(c, 0.62) * tempFactor * cRateFactor;
      const curSoH = Math.max(50, (1 - loss) * 100);
      const px = 50 + (c / maxCycles) * (W - 80);
      const py = y100 + ((100 - curSoH) / 35) * (y70 - y100);

      if (c === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);

      if (Math.abs(c - cycleCount) < 25) {
        curPoint = { x: px, y: py };
      }
    }
    ctx.stroke();

    // Draw current operating marker
    ctx.fillStyle = "rgba(214, 255, 43, 0.3)";
    ctx.beginPath(); ctx.arc(curPoint.x, curPoint.y, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(214, 255, 43, 1)";
    ctx.beginPath(); ctx.arc(curPoint.x, curPoint.y, 6, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "10px monospace";
    ctx.fillText(`CURRENT: ${soh}% SoH`, curPoint.x + 12, curPoint.y - 8);

    // Axis labels
    ctx.fillStyle = "rgba(236, 232, 216, 0.6)";
    ctx.font = "9px monospace";
    ctx.fillText("0 CYCLES", 45, H - 20);
    ctx.fillText("750 CYCLES", W * 0.5 - 25, H - 20);
    ctx.fillText("1500 CYCLES", W - 80, H - 20);
  }, [activeMode, cycleCount, temperature, cRate, soh]);

  // Mesh Canvas loop
  useEffect(() => {
    if (activeMode !== "setuka") return;
    const canvas = meshCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let packets: { x: number; y: number; tx: number; ty: number; prog: number }[] = [];

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const draw = () => {
      t += 0.02;
      ctx.clearRect(0, 0, W, H);

      // Radar grid
      ctx.strokeStyle = "rgba(30, 42, 30, 0.7)";
      ctx.lineWidth = 1;
      for (let r = 50; r < Math.min(W, H); r += 60) {
        ctx.beginPath(); ctx.arc(W * 0.5, H * 0.5, r, 0, Math.PI * 2); ctx.stroke();
      }

      // Spawning packets
      if (Math.floor(t * 10) % 20 === 0) {
        const active = meshNodes.filter(n => n.active);
        if (active.length >= 2) {
          const a = active[Math.floor(Math.random() * (active.length - 1))];
          const b = active[active.length - 1]; // Gateway
          packets.push({ x: a.x * W, y: a.y * H, tx: b.x * W, ty: b.y * H, prog: 0 });
        }
      }

      // Draw radio links
      const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]];
      links.forEach(([ai, bi]) => {
        const a = meshNodes[ai], b = meshNodes[bi];
        const isUp = a.active && b.active;
        ctx.strokeStyle = isUp ? "rgba(214, 255, 43, 0.4)" : "rgba(211, 106, 75, 0.2)";
        ctx.lineWidth = isUp ? 1.5 : 0.8;
        if (!isUp) ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(a.x * W, a.y * H); ctx.lineTo(b.x * W, b.y * H); ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Packets
      packets = packets.filter(p => p.prog < 1);
      packets.forEach(p => {
        p.prog += 0.025;
        const px = p.x + (p.tx - p.x) * p.prog;
        const py = p.y + (p.ty - p.y) * p.prog;
        ctx.fillStyle = "rgba(214, 255, 43, 0.9)";
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
      });

      // Draw Nodes
      meshNodes.forEach(n => {
        const nx = n.x * W, ny = n.y * H;
        ctx.fillStyle = n.active ? "rgba(214, 255, 43, 0.15)" : "rgba(211, 106, 75, 0.15)";
        ctx.beginPath(); ctx.arc(nx, ny, 20, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = n.active ? "rgba(214, 255, 43, 1)" : "rgba(211, 106, 75, 1)";
        ctx.beginPath(); ctx.arc(nx, ny, 6, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${n.id} (${n.active ? "UP" : "DOWN"})`, nx, ny + 24);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [activeMode, meshNodes]);

  return (
    <motion.div
      className="lab-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Systems Interactive Workbench"
    >
      <div className="lab-top">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="status-dot" style={{ backgroundColor: "#d6ff2b" }} />
          <b style={{ color: "#d6ff2b", letterSpacing: "0.08em" }}>SYSTEMS INTERACTIVE LAB</b>
        </div>
        <p style={{ margin: "0 auto", color: "#8a9488", font: "11px var(--mono)" }}>
          INTERACTIVE ARCHITECTURE SANDBOX · SWITCH DOMAIN TO TEST
        </p>
        <button onClick={onClose} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#fff", background: "none", border: 0 }}>
          CLOSE <X size={18} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: "calc(100vh - 60px)", overflow: "hidden" }}>
        {/* Navigation Sidebar */}
        <aside style={{ borderRight: "1px solid var(--rule)", padding: "20px 14px", display: "flex", flexDirection: "column", gap: 10, background: "#0c0f0c" }}>
          <p style={{ font: "9px var(--mono)", color: "var(--mute)", letterSpacing: "0.08em", margin: "0 0 10px 8px" }}>
            SELECT INTERACTIVE MODEL
          </p>

          <button
            onClick={() => setActiveMode("solvex")}
            style={{
              padding: "12px 14px",
              textAlign: "left",
              border: activeMode === "solvex" ? "1px solid var(--acid)" : "1px solid var(--rule)",
              background: activeMode === "solvex" ? "rgba(214, 255, 43, 0.08)" : "transparent",
              color: activeMode === "solvex" ? "var(--acid)" : "var(--paper)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              font: "11px var(--mono)",
            }}
          >
            <Sparkles size={16} /> 01 SolveX Reasoner
          </button>

          <button
            onClick={() => setActiveMode("fitvision")}
            style={{
              padding: "12px 14px",
              textAlign: "left",
              border: activeMode === "fitvision" ? "1px solid var(--acid)" : "1px solid var(--rule)",
              background: activeMode === "fitvision" ? "rgba(214, 255, 43, 0.08)" : "transparent",
              color: activeMode === "fitvision" ? "var(--acid)" : "var(--paper)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              font: "11px var(--mono)",
            }}
          >
            <Activity size={16} /> 02 FitVision Pose
          </button>

          <button
            onClick={() => setActiveMode("battery")}
            style={{
              padding: "12px 14px",
              textAlign: "left",
              border: activeMode === "battery" ? "1px solid var(--acid)" : "1px solid var(--rule)",
              background: activeMode === "battery" ? "rgba(214, 255, 43, 0.08)" : "transparent",
              color: activeMode === "battery" ? "var(--acid)" : "var(--paper)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              font: "11px var(--mono)",
            }}
          >
            <BatteryCharging size={16} /> 03 EV Battery Prognosis
          </button>

          <button
            onClick={() => setActiveMode("setuka")}
            style={{
              padding: "12px 14px",
              textAlign: "left",
              border: activeMode === "setuka" ? "1px solid var(--acid)" : "1px solid var(--rule)",
              background: activeMode === "setuka" ? "rgba(214, 255, 43, 0.08)" : "transparent",
              color: activeMode === "setuka" ? "var(--acid)" : "var(--paper)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              font: "11px var(--mono)",
            }}
          >
            <Radio size={16} /> 04 SETUKA Mesh
          </button>

          <div style={{ marginTop: "auto", padding: "14px", border: "1px solid var(--rule)", background: "#101410", fontSize: "10px", lineHeight: 1.4, color: "var(--mute)" }}>
            <b style={{ color: "var(--paper)", display: "block", marginBottom: 4 }}>CORE HYPOTHESIS:</b>
            Systems must remain accountable to physical and formal bounds. Never trust unverified generative output.
          </div>
        </aside>

        {/* Content Area */}
        <main style={{ padding: "30px 40px", overflowY: "auto", background: "#080a08" }}>
          {/* MODE 1: SOLVEX */}
          {activeMode === "solvex" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <p style={{ font: "10px var(--mono)", color: "var(--acid)", margin: "0 0 6px" }}>MODULE 01 · DUAL-AGENT REASONING GATE</p>
                <h2 style={{ fontSize: "28px", margin: "0 0 10px", letterSpacing: "-0.03em" }}>SolveX Verification Pipeline</h2>
                <p style={{ color: "var(--mute)", maxWidth: 680, fontSize: "14px", margin: 0 }}>
                  LLMs frequently generate diagrams that contradict their own derivations. SolveX enforces a typed <code style={{ color: "var(--acid)" }}>viz_state</code> consistency gate. Test the pipeline below:
                </p>
              </div>

              {/* Prompt selection */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {prompts.map((p, idx) => (
                  <button
                    key={p.title}
                    onClick={() => setSelectedPrompt(idx)}
                    style={{
                      padding: "8px 14px",
                      border: selectedPrompt === idx ? "1px solid var(--acid)" : "1px solid var(--rule)",
                      background: selectedPrompt === idx ? "rgba(214, 255, 43, 0.1)" : "#121612",
                      color: selectedPrompt === idx ? "var(--acid)" : "var(--paper)",
                      font: "10px var(--mono)",
                      cursor: "pointer",
                    }}
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              {/* Pipeline Flowchart Visual */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <div style={{ padding: 16, border: "1px solid var(--rule)", background: "#111611" }}>
                  <span style={{ font: "9px var(--mono)", color: "var(--acid)" }}>STAGE 01</span>
                  <h4 style={{ margin: "8px 0 4px", fontSize: "13px" }}>Query Ingest</h4>
                  <p style={{ margin: 0, font: "10px var(--mono)", color: "var(--mute)" }}>
                    Input: &quot;{prompts[selectedPrompt].title}&quot;
                  </p>
                </div>

                <div style={{ padding: 16, border: "1px solid var(--rule)", background: "#111611" }}>
                  <span style={{ font: "9px var(--mono)", color: "var(--acid)" }}>STAGE 02</span>
                  <h4 style={{ margin: "8px 0 4px", fontSize: "13px" }}>Router Agent</h4>
                  <p style={{ margin: 0, font: "10px var(--mono)", color: "var(--mute)" }}>
                    Routed to: {prompts[selectedPrompt].router}
                  </p>
                </div>

                <div style={{ padding: 16, border: "1px solid var(--rule)", background: "#111611" }}>
                  <span style={{ font: "9px var(--mono)", color: "var(--acid)" }}>STAGE 03</span>
                  <h4 style={{ margin: "8px 0 4px", fontSize: "13px" }}>Typed State</h4>
                  <p style={{ margin: 0, font: "10px var(--mono)", color: "var(--mute)" }}>
                    Generates AST: {prompts[selectedPrompt].viz}
                  </p>
                </div>

                <div style={{
                  padding: 16,
                  border: gateStatus === "passed" ? "1px solid var(--acid)" : "1px solid var(--oxide)",
                  background: gateStatus === "passed" ? "rgba(214, 255, 43, 0.06)" : "rgba(211, 106, 75, 0.1)",
                }}>
                  <span style={{ font: "9px var(--mono)", color: gateStatus === "passed" ? "var(--acid)" : "var(--oxide)" }}>
                    STAGE 04 · GATE
                  </span>
                  <h4 style={{ margin: "8px 0 4px", fontSize: "13px" }}>
                    {gateStatus === "verifying" ? "Validating AST..." : gateStatus === "passed" ? "Consistency Pass" : "Divergence Blocked"}
                  </h4>
                  <p style={{ margin: 0, font: "10px var(--mono)", color: "var(--paper)" }}>
                    {gateStatus === "passed" ? "Diagram == Proof (0 Divergence)" : "Visual contradiction intercepted!"}
                  </p>
                </div>
              </div>

              {/* Code / Verification box */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
                <div style={{ padding: 20, border: "1px solid var(--rule)", background: "#0c0e0c" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ font: "10px var(--mono)", color: "var(--acid)" }}>STEPWISE LATEX REASONING</span>
                    <span style={{ font: "9px var(--mono)", color: "var(--mute)" }}>FASTAPI + LANGGRAPH</span>
                  </div>
                  <pre style={{ margin: 0, color: "#d6ff2b", font: "13px/1.6 monospace", background: "#111611", padding: 14, overflowX: "auto" }}>
                    {`# Deterministic Stepwise Output:\n\nFormula: ${prompts[selectedPrompt].latex}\nState: ${prompts[selectedPrompt].viz}\nGate Verification: ${gateStatus.toUpperCase()}`}
                  </pre>
                </div>

                <div style={{ padding: 20, border: "1px solid var(--rule)", background: "#0c0e0c", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h4 style={{ margin: "0 0 10px", fontSize: "14px" }}>Test Hallucination Gate</h4>
                    <p style={{ fontSize: "12px", color: "var(--mute)", lineHeight: 1.5 }}>
                      Toggle this to simulate when a generic LLM hallucinates an invalid diagram. Watch SolveX prevent the bad visual from rendering:
                    </p>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <button
                      onClick={() => setSimulateHallucination(!simulateHallucination)}
                      style={{
                        padding: "10px 16px",
                        border: "1px solid",
                        borderColor: simulateHallucination ? "var(--oxide)" : "var(--acid)",
                        background: simulateHallucination ? "rgba(211, 106, 75, 0.2)" : "rgba(214, 255, 43, 0.1)",
                        color: simulateHallucination ? "var(--oxide)" : "var(--acid)",
                        font: "11px var(--mono)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {simulateHallucination ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
                      {simulateHallucination ? "Simulating Hallucinated Diagram (ON)" : "Inject LLM Contradiction (OFF)"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: FITVISION */}
          {activeMode === "fitvision" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ font: "10px var(--mono)", color: "var(--acid)", margin: "0 0 6px" }}>MODULE 02 · COMPUTER VISION POSE</p>
                <h2 style={{ fontSize: "28px", margin: "0 0 10px", letterSpacing: "-0.03em" }}>FitVision Biomechanics</h2>
                <p style={{ color: "var(--mute)", maxWidth: 680, fontSize: "14px", margin: 0 }}>
                  Real-time YOLO11n-Pose estimation on CPU hardware. Live kinematic angles calculated from 17 body keypoints with automated rep counting:
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
                <div style={{ position: "relative", height: 380, border: "1px solid var(--rule)", background: "#0c0d12" }}>
                  <canvas ref={fitCanvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
                  <div style={{ position: "absolute", bottom: 12, left: 16, font: "10px var(--mono)", color: "var(--acid)" }}>
                    TRACKING: 17 KEYPOINTS · 15+ FPS CPU
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ padding: 18, border: "1px solid var(--rule)", background: "#11141a" }}>
                    <span style={{ font: "9px var(--mono)", color: "var(--mute)" }}>LIVE KNEE FLEXION ANGLE</span>
                    <b style={{ display: "block", font: "36px/1 var(--display)", color: "var(--acid)", marginTop: 6 }}>
                      {kneeAngle}°
                    </b>
                    <span style={{ font: "10px var(--mono)", color: kneeAngle < 95 ? "#d6ff2b" : "#d36a4b" }}>
                      {kneeAngle < 95 ? "● DEPTH: FULL PARALLEL" : "○ ASCENT / EXTENSION"}
                    </span>
                  </div>

                  <div style={{ padding: 18, border: "1px solid var(--rule)", background: "#11141a" }}>
                    <span style={{ font: "9px var(--mono)", color: "var(--mute)" }}>COMPLETED REPETITIONS</span>
                    <b style={{ display: "block", font: "36px/1 var(--display)", color: "#fff", marginTop: 6 }}>
                      {squatReps}
                    </b>
                    <button
                      onClick={() => setSquatReps(r => r + 1)}
                      style={{ marginTop: 8, padding: "6px 12px", border: "1px solid var(--rule)", background: "transparent", color: "var(--acid)", font: "9px var(--mono)", cursor: "pointer" }}
                    >
                      + ADD REP MANUALLY
                    </button>
                  </div>

                  <div style={{ padding: 18, border: "1px solid var(--rule)", background: "#11141a", fontSize: "11px", color: "var(--mute)", lineHeight: 1.5 }}>
                    <b style={{ color: "var(--paper)" }}>SIH 2025 National Finalist:</b> Pixel-to-centimeter calibration algorithm calculates jump height and form consistency in &lt;200ms latency.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: EV BATTERY PROGNOSIS */}
          {activeMode === "battery" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ font: "10px var(--mono)", color: "var(--acid)", margin: "0 0 6px" }}>
                  MODULE 03 · RESEARCH UNDER PROF. DR. RASHMI BHARDWAJ (GGSIPU)
                </p>
                <h2 style={{ fontSize: "28px", margin: "0 0 10px", letterSpacing: "-0.03em" }}>EV Battery SoH &amp; RUL Prognosis</h2>
                <p style={{ color: "var(--mute)", maxWidth: 720, fontSize: "14px", margin: 0 }}>
                  Deterministic machine learning regression modeling for lithium-ion electric vehicle batteries. Adjust operating telemetry to compute State of Health (SoH) and Remaining Useful Life (RUL):
                </p>
              </div>

              {/* Sliders */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                <div style={{ padding: 16, border: "1px solid var(--rule)", background: "#111611" }}>
                  <label style={{ display: "flex", justifyContent: "space-between", font: "10px var(--mono)", color: "var(--acid)" }}>
                    <span>CYCLE COUNT</span>
                    <b>{cycleCount} cycles</b>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1400"
                    step="20"
                    value={cycleCount}
                    onChange={e => setCycleCount(Number(e.target.value))}
                    style={{ width: "100%", marginTop: 12, accentColor: "#d6ff2b" }}
                  />
                </div>

                <div style={{ padding: 16, border: "1px solid var(--rule)", background: "#111611" }}>
                  <label style={{ display: "flex", justifyContent: "space-between", font: "10px var(--mono)", color: "var(--acid)" }}>
                    <span>TEMPERATURE</span>
                    <b>{temperature}°C</b>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="1"
                    value={temperature}
                    onChange={e => setTemperature(Number(e.target.value))}
                    style={{ width: "100%", marginTop: 12, accentColor: "#d6ff2b" }}
                  />
                </div>

                <div style={{ padding: 16, border: "1px solid var(--rule)", background: "#111611" }}>
                  <label style={{ display: "flex", justifyContent: "space-between", font: "10px var(--mono)", color: "var(--acid)" }}>
                    <span>C-RATE (DISCHARGE)</span>
                    <b>{cRate.toFixed(1)}C</b>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={cRate}
                    onChange={e => setCRate(Number(e.target.value))}
                    style={{ width: "100%", marginTop: 12, accentColor: "#d6ff2b" }}
                  />
                </div>
              </div>

              {/* Live Canvas Curve */}
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
                <div style={{ position: "relative", height: 320, border: "1px solid var(--rule)", background: "#0b0f0b" }}>
                  <canvas ref={batteryCanvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ padding: 18, border: "1px solid var(--rule)", background: "#111611" }}>
                    <span style={{ font: "9px var(--mono)", color: "var(--mute)" }}>CALCULATED STATE OF HEALTH</span>
                    <b style={{ display: "block", font: "38px/1 var(--display)", color: soh > 80 ? "var(--acid)" : "var(--oxide)", marginTop: 6 }}>
                      {soh}%
                    </b>
                    <span style={{ font: "10px var(--mono)", color: "var(--mute)" }}>
                      {soh > 80 ? "NOMINAL CELL HEALTH" : "DEGRADED BATTERY CONDITION"}
                    </span>
                  </div>

                  <div style={{ padding: 18, border: "1px solid var(--rule)", background: "#111611" }}>
                    <span style={{ font: "9px var(--mono)", color: "var(--mute)" }}>ESTIMATED REMAINING USEFUL LIFE</span>
                    <b style={{ display: "block", font: "38px/1 var(--display)", color: "#fff", marginTop: 6 }}>
                      {rul} CYCLES
                    </b>
                    <span style={{ font: "10px var(--mono)", color: "var(--mute)" }}>
                      UNTIL 70% CAPACITY FADE
                    </span>
                  </div>

                  <div style={{ padding: 12, border: "1px solid var(--rule)", background: "#111611", font: "9px var(--mono)", color: "var(--mute)", lineHeight: 1.4 }}>
                    Predictive feature engineering over electrochemical charging curves under Prof. Dr. Rashmi Bhardwaj at Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 4: SETUKA MESH */}
          {activeMode === "setuka" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ font: "10px var(--mono)", color: "var(--acid)", margin: "0 0 6px" }}>MODULE 04 · ZERO-CELLULAR EMERGENCY RESILIENCE</p>
                <h2 style={{ fontSize: "28px", margin: "0 0 10px", letterSpacing: "-0.03em" }}>SETUKA ESP32 Mesh Simulator</h2>
                <p style={{ color: "var(--mute)", maxWidth: 720, fontSize: "14px", margin: 0 }}>
                  In disasters, cellular towers collapse first. Click any node below to simulate a tower failure and watch the radio mesh self-heal across 3 km hops:
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
                <div style={{ position: "relative", height: 380, border: "1px solid var(--rule)", background: "#0a0d0a" }}>
                  <canvas ref={meshCanvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ font: "10px var(--mono)", color: "var(--acid)", margin: 0 }}>CLICK NODE TO TOGGLE LINK STATUS:</p>
                  {meshNodes.map((n, idx) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        const updated = [...meshNodes];
                        updated[idx].active = !updated[idx].active;
                        setMeshNodes(updated);
                      }}
                      style={{
                        padding: "10px 14px",
                        border: n.active ? "1px solid var(--rule)" : "1px solid var(--oxide)",
                        background: n.active ? "#111611" : "rgba(211, 106, 75, 0.15)",
                        color: n.active ? "var(--paper)" : "var(--oxide)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        font: "10px var(--mono)",
                        cursor: "pointer",
                      }}
                    >
                      <span>{n.id}: {n.name}</span>
                      <b>{n.active ? "ONLINE [UP]" : "SEVERED [DOWN]"}</b>
                    </button>
                  ))}

                  <div style={{ marginTop: 10, padding: 12, border: "1px solid var(--rule)", background: "#111611", font: "10px var(--mono)", color: "var(--acid)" }}>
                    DELIVERY SUCCESS: 95.4% · 3 KM/HOP · HULT PRIZE FINALIST (IIT BOMBAY)
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
}
