"use client";

import { useEffect, useRef, useState } from "react";

// Helper to load p5.js reliably from /p5.min.js
function useP5Ready() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).p5) {
      setReady(true);
      return;
    }
    const existing = document.getElementById("p5-script");
    if (existing) {
      existing.addEventListener("load", () => setReady(true));
      return;
    }
    const script = document.createElement("script");
    script.id = "p5-script";
    script.src = "/p5.min.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, []);

  return ready;
}

// ==========================================
// 01. SOLVEX SKETCH
// Dual-Agent LangGraph Reasoning & Consistency Gate
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initSolveXSketch(p: any) {
  let t = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let nodes: any[] = [];
  let packets: { x: number; y: number; tx: number; ty: number; prog: number }[] = [];
  const mathFormulas = [
    "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
    "\\nabla_\\theta J(\\theta) = \\mathbb{E}[\\nabla \\log \\pi \\cdot Q]",
    "\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}",
    "viz\\_state: \\{nodes: 6, edges: 8\\}",
  ];
  let formulaIdx = 0;

  p.setup = () => {
    const parent = p.canvas.parentElement;
    const w = parent ? parent.clientWidth : 560;
    const h = parent ? parent.clientHeight : 430;
    p.createCanvas(w, h);

    nodes = [
      { id: "INPUT", x: w * 0.16, y: h * 0.28, label: "USER QUERY", col: [214, 255, 43], type: "source" },
      { id: "ROUTER", x: w * 0.42, y: h * 0.2, label: "LANGGRAPH ROUTER", col: [214, 255, 43], type: "supervisor" },
      { id: "MATH", x: w * 0.78, y: h * 0.22, label: "MATH / ML ENGINE", col: [211, 106, 75], type: "specialist" },
      { id: "STATE", x: w * 0.75, y: h * 0.58, label: "TYPED VIZ_STATE", col: [236, 232, 216], type: "state" },
      { id: "GATE", x: w * 0.45, y: h * 0.74, label: "CONSISTENCY GATE", col: [214, 255, 43], type: "verifier" },
      { id: "RENDER", x: w * 0.18, y: h * 0.7, label: "MERMAID / P5", col: [211, 106, 75], type: "renderer" },
    ];
  };

  p.windowResized = () => {
    const parent = p.canvas.parentElement;
    if (parent) {
      p.resizeCanvas(parent.clientWidth, parent.clientHeight);
      const w = parent.clientWidth, h = parent.clientHeight;
      nodes[0].x = w * 0.16; nodes[0].y = h * 0.28;
      nodes[1].x = w * 0.42; nodes[1].y = h * 0.2;
      nodes[2].x = w * 0.78; nodes[2].y = h * 0.22;
      nodes[3].x = w * 0.75; nodes[3].y = h * 0.58;
      nodes[4].x = w * 0.45; nodes[4].y = h * 0.74;
      nodes[5].x = w * 0.18; nodes[5].y = h * 0.7;
    }
  };

  p.draw = () => {
    p.background(11, 14, 11);
    t += 0.02;

    // Subtle grid
    p.stroke(25, 33, 25);
    p.strokeWeight(1);
    for (let x = 0; x < p.width; x += 36) p.line(x, 0, x, p.height);
    for (let y = 0; y < p.height; y += 36) p.line(0, y, p.width, y);

    // Spawn packets
    if (p.frameCount % 40 === 0) {
      const paths = [
        [nodes[0], nodes[1]],
        [nodes[1], nodes[2]],
        [nodes[2], nodes[3]],
        [nodes[3], nodes[4]],
        [nodes[4], nodes[5]],
      ];
      const link = paths[p.floor(p.random(paths.length))];
      packets.push({ x: link[0].x, y: link[0].y, tx: link[1].x, ty: link[1].y, prog: 0 });
    }

    if (p.frameCount % 180 === 0) {
      formulaIdx = (formulaIdx + 1) % mathFormulas.length;
    }

    // Draw links
    const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 4]];
    links.forEach(([a, b]) => {
      const na = nodes[a], nb = nodes[b];
      const pulse = 0.5 + 0.5 * Math.sin(t * 2 + a);
      p.stroke(214, 255, 43, 30 + pulse * 60);
      p.strokeWeight(1.2);
      p.line(na.x, na.y, nb.x, nb.y);
    });

    // Draw active packets
    packets = packets.filter(pk => pk.prog < 1);
    packets.forEach(pk => {
      pk.prog += 0.02;
      const px = p.lerp(pk.x, pk.tx, pk.prog);
      const py = p.lerp(pk.y, pk.ty, pk.prog);
      p.noStroke();
      p.fill(214, 255, 43, 220);
      p.circle(px, py, 6);
      p.fill(214, 255, 43, 60);
      p.circle(px, py, 16);
    });

    // Draw Nodes
    nodes.forEach((n, i) => {
      const pulse = 3 * Math.sin(t * 3 + i);
      p.noStroke();
      p.fill(n.col[0], n.col[1], n.col[2], 28);
      p.circle(n.x, n.y, 48 + pulse * 2);
      p.stroke(n.col[0], n.col[1], n.col[2], 180);
      p.strokeWeight(1.5);
      p.fill(16, 20, 16);
      p.circle(n.x, n.y, 22);
      p.noStroke();
      p.fill(n.col[0], n.col[1], n.col[2]);
      p.circle(n.x, n.y, 8);

      p.fill(236, 232, 216);
      p.textAlign(p.CENTER);
      p.textSize(8);
      p.textFont("monospace");
      p.text(n.label, n.x, n.y + 24);
    });

    // Top status bar
    p.fill(16, 20, 16, 200);
    p.stroke(214, 255, 43, 80);
    p.strokeWeight(1);
    p.rect(14, 14, 230, 24, 2);
    p.noStroke();
    p.fill(214, 255, 43);
    p.circle(24, 26, 6);
    p.fill(236, 232, 216);
    p.textAlign(p.LEFT);
    p.textSize(9);
    p.text("DUAL-AGENT REASONING GATE", 34, 29);

    // Formula streamer at bottom
    p.fill(14, 18, 14, 220);
    p.stroke(236, 232, 216, 30);
    p.rect(14, p.height - 40, p.width - 28, 28, 2);
    p.noStroke();
    p.fill(211, 106, 75);
    p.textSize(8);
    p.text("TYPED AST >>", 22, p.height - 23);
    p.fill(214, 255, 43);
    p.text(mathFormulas[formulaIdx], 95, p.height - 23);

    p.fill(214, 255, 43, 160);
    p.textAlign(p.RIGHT);
    p.text("VERIFIED: 100% TYPED", p.width - 24, p.height - 23);
  };
}

// ==========================================
// 02. AGRICULTURAL INTELLIGENCE SKETCH
// Offline SLM on Raspberry Pi & YOLO Lesion Detection
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initAgriSketch(p: any) {
  let scanY = 0;
  let t = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lesions: any[] = [];

  p.setup = () => {
    const parent = p.canvas.parentElement;
    const w = parent ? parent.clientWidth : 560;
    const h = parent ? parent.clientHeight : 430;
    p.createCanvas(w, h);

    lesions = [
      { x: w * 0.44, y: h * 0.36, w: 54, h: 42, label: "BLIGHT 94.2%", col: [211, 106, 75] },
      { x: w * 0.58, y: h * 0.52, w: 46, h: 38, label: "RUST 88.7%", col: [214, 255, 43] },
      { x: w * 0.38, y: h * 0.64, w: 40, h: 34, label: "CHLOROSIS 91%", col: [214, 255, 43] },
    ];
  };

  p.windowResized = () => {
    const parent = p.canvas.parentElement;
    if (parent) {
      p.resizeCanvas(parent.clientWidth, parent.clientHeight);
      const w = parent.clientWidth, h = parent.clientHeight;
      lesions[0].x = w * 0.44; lesions[0].y = h * 0.36;
      lesions[1].x = w * 0.58; lesions[1].y = h * 0.52;
      lesions[2].x = w * 0.38; lesions[2].y = h * 0.64;
    }
  };

  p.draw = () => {
    p.background(10, 15, 10);
    t += 0.02;
    scanY = (scanY + 1.6) % p.height;

    // Coordinate grid
    p.stroke(20, 36, 20);
    p.strokeWeight(1);
    for (let x = 0; x < p.width; x += 40) p.line(x, 0, x, p.height);
    for (let y = 0; y < p.height; y += 40) p.line(0, y, p.width, y);

    // Leaf contour
    const cx = p.width * 0.48, cy = p.height * 0.5;
    p.stroke(40, 95, 40, 180);
    p.strokeWeight(1.5);
    p.noFill();

    // Leaf main spine
    p.line(cx, cy - 130, cx, cy + 130);

    // Leaf veins
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue;
      const vy = cy + i * 24;
      const vx = cx + (i > 0 ? 60 - Math.abs(i) * 10 : -60 + Math.abs(i) * 10);
      p.line(cx, vy, vx, vy - 15);
    }

    // Leaf outer boundary (approximated curve)
    p.stroke(214, 255, 43, 70);
    p.beginShape();
    p.vertex(cx, cy - 130);
    p.bezierVertex(cx + 90, cy - 60, cx + 110, cy + 40, cx, cy + 130);
    p.bezierVertex(cx - 110, cy + 40, cx - 90, cy - 60, cx, cy - 130);
    p.endShape();

    // Laser scan beam
    p.noStroke();
    for (let i = 0; i < 10; i++) {
      const a = p.map(i, 0, 10, 120, 0);
      p.fill(214, 255, 43, a);
      p.rect(0, scanY - i * 2, p.width, 2);
    }

    // YOLO Bounding boxes
    lesions.forEach(box => {
      const isScanned = Math.abs(scanY - box.y) < 30;
      p.noFill();
      p.stroke(box.col[0], box.col[1], box.col[2], isScanned ? 240 : 130);
      p.strokeWeight(isScanned ? 2 : 1.2);
      p.rect(box.x - box.w / 2, box.y - box.h / 2, box.w, box.h);

      // Corner crosshairs
      const x1 = box.x - box.w / 2, y1 = box.y - box.h / 2;
      p.stroke(214, 255, 43);
      p.line(x1, y1, x1 + 6, y1);
      p.line(x1, y1, x1, y1 + 6);

      // Label
      p.fill(10, 15, 10, 210);
      p.noStroke();
      p.rect(box.x - box.w / 2, box.y - box.h / 2 - 13, box.w + 14, 12);
      p.fill(box.col[0], box.col[1], box.col[2]);
      p.textSize(7.5);
      p.textFont("monospace");
      p.textAlign(p.LEFT);
      p.text(box.label, box.x - box.w / 2 + 3, box.y - box.h / 2 - 4);
    });

    // Top status banner
    p.fill(12, 18, 12, 210);
    p.stroke(214, 255, 43, 70);
    p.rect(14, 14, 250, 24, 2);
    p.noStroke();
    p.fill(214, 255, 43);
    p.circle(24, 26, 6);
    p.fill(236, 232, 216);
    p.textSize(9);
    p.text("RASPBERRY PI / 100% OFFLINE RAG", 34, 29);

    // Bottom telemetry bar
    p.fill(12, 18, 12, 220);
    p.stroke(236, 232, 216, 30);
    p.rect(14, p.height - 40, p.width - 28, 28, 2);
    p.noStroke();
    p.fill(214, 255, 43);
    p.textSize(8);
    p.text("GGUF 4-bit SLM >> 17.8 tok/s", 22, p.height - 23);
    p.fill(236, 232, 216, 170);
    p.textAlign(p.RIGHT);
    p.text("SOIL: 42.4% · TEMP: 28.1°C · ZERO CLOUD", p.width - 22, p.height - 23);
  };
}

// ==========================================
// 03. FITVISION SKETCH
// YOLO11n-Pose Real-Time Kinematics & Rep Counter
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initFitSketch(p: any) {
  let timer = 0;
  let reps = 0;
  let inRep = false;

  p.setup = () => {
    const parent = p.canvas.parentElement;
    const w = parent ? parent.clientWidth : 560;
    const h = parent ? parent.clientHeight : 430;
    p.createCanvas(w, h);
    p.angleMode(p.DEGREES);
  };

  p.windowResized = () => {
    const parent = p.canvas.parentElement;
    if (parent) p.resizeCanvas(parent.clientWidth, parent.clientHeight);
  };

  p.draw = () => {
    p.background(10, 12, 16);
    timer += 1.8;

    // Squat cycle (sine wave)
    const cycle = (Math.sin((timer * Math.PI) / 180) + 1) / 2; // 0 = bottom squat, 1 = standing
    const kneeAngle = p.round(88 + cycle * 76); // 88 deg to 164 deg

    if (cycle < 0.15 && !inRep) {
      inRep = true;
    }
    if (cycle > 0.88 && inRep) {
      inRep = false;
      reps++;
    }

    const cx = p.width * 0.5;
    const cy = p.height * 0.44 + (1 - cycle) * 38; // Body moves down in squat

    // Keypoints
    const head = { x: cx, y: cy - 95 };
    const neck = { x: cx, y: cy - 68 };
    const spine = { x: cx, y: cy - 20 };
    const hip = { x: cx, y: cy + 18 };

    // Legs bend outwards in squat
    const hipSpread = 28 + (1 - cycle) * 12;
    const kneeSpread = 44 + (1 - cycle) * 22;
    const kneeDrop = (1 - cycle) * 20;

    const hipL = { x: cx - hipSpread, y: hip.y };
    const hipR = { x: cx + hipSpread, y: hip.y };
    const kneeL = { x: cx - kneeSpread, y: cy + 78 - kneeDrop };
    const kneeR = { x: cx + kneeSpread, y: cy + 78 - kneeDrop };
    const ankleL = { x: cx - 38, y: p.height * 0.78 };
    const ankleR = { x: cx + 38, y: p.height * 0.78 };

    // Arms
    const shoulderL = { x: cx - 36, y: neck.y + 4 };
    const shoulderR = { x: cx + 36, y: neck.y + 4 };
    const elbowL = { x: cx - 62, y: neck.y + 32 };
    const elbowR = { x: cx + 62, y: neck.y + 32 };
    const wristL = { x: cx - 34, y: neck.y + 54 };
    const wristR = { x: cx + 34, y: neck.y + 54 };

    // Draw Bones
    const drawBone = (a: { x: number; y: number }, b: { x: number; y: number }, col: number[]) => {
      p.stroke(col[0], col[1], col[2], 210);
      p.strokeWeight(2.6);
      p.line(a.x, a.y, b.x, b.y);
    };

    // Spine & Head
    drawBone(head, neck, [214, 255, 43]);
    drawBone(neck, spine, [214, 255, 43]);
    drawBone(spine, hip, [214, 255, 43]);

    // Torso to hips
    drawBone(hip, hipL, [214, 255, 43]);
    drawBone(hip, hipR, [214, 255, 43]);

    // Legs
    drawBone(hipL, kneeL, [214, 255, 43]);
    drawBone(kneeL, ankleL, [214, 255, 43]);
    drawBone(hipR, kneeR, [214, 255, 43]);
    drawBone(kneeR, ankleR, [214, 255, 43]);

    // Arms
    drawBone(neck, shoulderL, [236, 232, 216]);
    drawBone(shoulderL, elbowL, [236, 232, 216]);
    drawBone(elbowL, wristL, [236, 232, 216]);
    drawBone(neck, shoulderR, [236, 232, 216]);
    drawBone(shoulderR, elbowR, [236, 232, 216]);
    drawBone(elbowR, wristR, [236, 232, 216]);

    // Head circle
    p.noFill();
    p.stroke(214, 255, 43, 200);
    p.strokeWeight(1.8);
    p.circle(head.x, head.y - 12, 26);

    // Keypoint joints
    const joints = [head, neck, spine, hip, hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR];
    joints.forEach(j => {
      p.noStroke();
      p.fill(211, 106, 75, 230);
      p.circle(j.x, j.y, 7);
    });

    // Knee Angle Arc
    p.stroke(211, 106, 75, 220);
    p.strokeWeight(1.5);
    p.noFill();
    p.arc(kneeL.x, kneeL.y, 44, 44, 180, 180 + kneeAngle * 0.7);

    p.fill(214, 255, 43);
    p.noStroke();
    p.textSize(8);
    p.text(`${kneeAngle}°`, kneeL.x - 28, kneeL.y - 6);

    // HUD Display
    p.fill(14, 16, 22, 210);
    p.stroke(214, 255, 43, 80);
    p.rect(14, 14, 250, 24, 2);
    p.noStroke();
    p.fill(214, 255, 43);
    p.circle(24, 26, 6);
    p.fill(236, 232, 216);
    p.textSize(9);
    p.text("YOLO11n-POSE / BIOMECHANICS", 34, 29);

    // Bottom telemetry bar
    p.fill(14, 16, 22, 220);
    p.stroke(236, 232, 216, 30);
    p.rect(14, p.height - 40, p.width - 28, 28, 2);
    p.noStroke();
    p.fill(214, 255, 43);
    p.textSize(9);
    p.text(`SQUAT REPS: ${String(reps).padStart(2, "0")}`, 22, p.height - 23);
    p.fill(211, 106, 75);
    p.text(kneeAngle < 95 ? "DEPTH: VALID PARALLEL" : "DEPTH: IN TRANSIT", 140, p.height - 23);
    p.fill(236, 232, 216, 170);
    p.textAlign(p.RIGHT);
    p.text("15+ FPS CPU · ~92% ACCURACY", p.width - 22, p.height - 23);
  };
}

// ==========================================
// 04. SETUKA SKETCH
// ESP32 Decentralized Mesh & Self-Healing Packet Routing
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initSetukaSketch(p: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let nodes: any[] = [];
  let packets: { x: number; y: number; tx: number; ty: number; prog: number }[] = [];
  let t = 0;
  let waveR = 0;

  p.setup = () => {
    const parent = p.canvas.parentElement;
    const w = parent ? parent.clientWidth : 560;
    const h = parent ? parent.clientHeight : 430;
    p.createCanvas(w, h);

    nodes = [
      { id: "NODE-01", x: w * 0.18, y: h * 0.32, active: true },
      { id: "NODE-02", x: w * 0.44, y: h * 0.22, active: true },
      { id: "NODE-03", x: w * 0.76, y: h * 0.35, active: true },
      { id: "NODE-04", x: w * 0.62, y: h * 0.72, active: true },
      { id: "GATEWAY", x: w * 0.26, y: h * 0.76, active: true },
    ];
  };

  p.windowResized = () => {
    const parent = p.canvas.parentElement;
    if (parent) {
      p.resizeCanvas(parent.clientWidth, parent.clientHeight);
      const w = parent.clientWidth, h = parent.clientHeight;
      nodes[0].x = w * 0.18; nodes[0].y = h * 0.32;
      nodes[1].x = w * 0.44; nodes[1].y = h * 0.22;
      nodes[2].x = w * 0.76; nodes[2].y = h * 0.35;
      nodes[3].x = w * 0.62; nodes[3].y = h * 0.72;
      nodes[4].x = w * 0.26; nodes[4].y = h * 0.76;
    }
  };

  p.draw = () => {
    p.background(10, 13, 10);
    t += 0.02;
    waveR = (waveR + 1.2) % 75;

    // Periodic self-healing demonstration
    if (p.frameCount % 240 === 160) {
      nodes[2].active = false; // Node drops
    } else if (p.frameCount % 240 === 0) {
      nodes[2].active = true; // Node recovers
    }

    // Packet generation
    if (p.frameCount % 45 === 0) {
      // Find active path to gateway
      if (nodes[2].active) {
        packets.push({ x: nodes[0].x, y: nodes[0].y, tx: nodes[1].x, ty: nodes[1].y, prog: 0 });
        packets.push({ x: nodes[1].x, y: nodes[1].y, tx: nodes[2].x, ty: nodes[2].y, prog: 0 });
        packets.push({ x: nodes[2].x, y: nodes[2].y, tx: nodes[3].x, ty: nodes[3].y, prog: 0 });
      } else {
        // Self-healed alternative path
        packets.push({ x: nodes[0].x, y: nodes[0].y, tx: nodes[1].x, ty: nodes[1].y, prog: 0 });
        packets.push({ x: nodes[1].x, y: nodes[1].y, tx: nodes[3].x, ty: nodes[3].y, prog: 0 });
      }
      packets.push({ x: nodes[3].x, y: nodes[3].y, tx: nodes[4].x, ty: nodes[4].y, prog: 0 });
    }

    // Links between nodes
    const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]];
    links.forEach(([a, b]) => {
      const na = nodes[a], nb = nodes[b];
      const isRouteActive = na.active && nb.active;
      p.stroke(isRouteActive ? 214 : 70, isRouteActive ? 255 : 80, isRouteActive ? 43 : 80, isRouteActive ? 70 : 25);
      p.strokeWeight(isRouteActive ? 1.4 : 0.8);
      p.line(na.x, na.y, nb.x, nb.y);

      // Distance tag
      if (isRouteActive) {
        p.noStroke();
        p.fill(214, 255, 43, 110);
        p.textSize(7);
        p.textAlign(p.CENTER);
        p.text("3.0 km", (na.x + nb.x) / 2, (na.y + nb.y) / 2 - 4);
      }
    });

    // Packets
    packets = packets.filter(pk => pk.prog < 1);
    packets.forEach(pk => {
      pk.prog += 0.025;
      const px = p.lerp(pk.x, pk.tx, pk.prog);
      const py = p.lerp(pk.y, pk.ty, pk.prog);
      p.noStroke();
      p.fill(214, 255, 43, 230);
      p.circle(px, py, 6);
      p.fill(214, 255, 43, 60);
      p.circle(px, py, 14);
    });

    // Nodes
    nodes.forEach(n => {
      const col = n.active ? [214, 255, 43] : [211, 106, 75];
      // Radio wavefront ripples
      if (n.active) {
        p.noFill();
        p.stroke(214, 255, 43, 80 - waveR);
        p.strokeWeight(1);
        p.circle(n.x, n.y, waveR * 2);
      }

      p.stroke(col[0], col[1], col[2], 180);
      p.strokeWeight(1.5);
      p.fill(14, 18, 14);
      p.circle(n.x, n.y, 24);

      p.noStroke();
      p.fill(col[0], col[1], col[2]);
      p.circle(n.x, n.y, 8);

      p.fill(236, 232, 216);
      p.textSize(8);
      p.textAlign(p.CENTER);
      p.textFont("monospace");
      p.text(n.active ? n.id : `${n.id} [SEVERED]`, n.x, n.y + 22);
    });

    // Top status banner
    p.fill(12, 17, 12, 210);
    p.stroke(214, 255, 43, 70);
    p.rect(14, 14, 270, 24, 2);
    p.noStroke();
    p.fill(214, 255, 43);
    p.circle(24, 26, 6);
    p.fill(236, 232, 216);
    p.textSize(9);
    p.text("ESP32 DECENTRALIZED MESH (433MHz)", 34, 29);

    // Bottom telemetry bar
    p.fill(12, 17, 12, 220);
    p.stroke(236, 232, 216, 30);
    p.rect(14, p.height - 40, p.width - 28, 28, 2);
    p.noStroke();
    p.fill(214, 255, 43);
    p.textSize(9);
    p.text("PACKET DELIVERY: 95.4%", 22, p.height - 23);
    p.fill(nodes[2].active ? [214, 255, 43] : [211, 106, 75]);
    p.text(nodes[2].active ? "STATUS: ALL HOPS NOMINAL" : "STATUS: HEALED ROUTE (FAILOVER)", 165, p.height - 23);
    p.fill(236, 232, 216, 170);
    p.textAlign(p.RIGHT);
    p.text("3 KM/HOP · ZERO CELLULAR", p.width - 22, p.height - 23);
  };
}

export function ProjectP5Canvas({ visualId }: { visualId: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const p5Ready = useP5Ready();

  useEffect(() => {
    if (!p5Ready || !mountRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const P5 = (window as any).p5;
    if (!P5) return;

    let sketchFn = initSolveXSketch;
    if (visualId === "agri") sketchFn = initAgriSketch;
    else if (visualId === "fit") sketchFn = initFitSketch;
    else if (visualId === "setuka") sketchFn = initSetukaSketch;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let instance: any = null;
    try {
      instance = new P5(sketchFn, mountRef.current);
    } catch (e) {
      console.warn("p5 instantiation failed", e);
    }

    return () => {
      try {
        instance?.remove();
      } catch {
        // cleanup ignore
      }
    };
  }, [p5Ready, visualId]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#0b0e0b",
      }}
    />
  );
}
