export type Project = {
  id: string;
  name: string;
  label: string;
  category: string;
  number: string;
  summary: string;
  problem: string;
  architecture: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  highlight: string;
  outcome: string;
  href?: string;
  github?: string;
  image: string;
  schematicTag: string;
};

export const projects: Project[] = [
  {
    id: "solvex",
    number: "01",
    name: "SolveX",
    label: "AI reasoning & visualization workspace with typed state-graph guarantees",
    category: "AGENTIC AI · MULTI-AGENT ARCHITECTURE",
    image: "/assets/solvex.png",
    schematicTag: "DUAL-AGENT ARCHITECTURE · TYPED VIZ_STATE",
    summary:
      "General LLMs hallucinate diagrams that contradict their written proofs. SolveX binds natural language reasoning and visual rendering to a single typed state graph.",
    problem:
      "When standard LLMs derive a mathematical proof, graph algorithm, or automata transition, the explanatory text and visual diagrams are generated through uncoupled probabilistic samplings. Inevitably, the diagram conflicts with the text. SolveX enforces a shared typed viz_state schema, a strict deterministic consistency gate, and a sandboxed runtime before anything renders.",
    architecture: [
      "Input Ingestion (LaTeX / Text / PDF / OCR)",
      "LangGraph Supervisor Router",
      "Specialist Reasoning Engine (Maths / ML / Automata)",
      "Typed viz_state Schema Generation",
      "Deterministic Consistency Gate",
      "Playwright / Sandboxed Execution",
      "Synchronized Stepwise Visual Output",
    ],
    stack: ["LangGraph", "FastAPI", "Next.js", "Mermaid.js", "p5.js", "Groq (Llama-3.3)", "Gemini Flash", "Docker", "SSE"],
    metrics: [
      { label: "CONSISTENCY", value: "100% Typed Schema" },
      { label: "LATENCY", value: "<1.2s First Token" },
      { label: "VALIDATION", value: "Sandboxed Playwright" },
    ],
    highlight:
      "Designed a constrained micro-DSL runtime allowing lightweight free-tier LLMs to produce deterministic mathematical visuals without drift.",
    outcome:
      "Full-stack production workspace streaming stepwise LaTeX solutions with synchronized diagrams and animations. Validated through strict schema verification and static fallbacks.",
    href: "https://solvex-frontend-seven.vercel.app/",
    github: "https://github.com/avi-dev-machine",
  },
  {
    id: "agricultural-intelligence",
    number: "02",
    name: "Agricultural Intelligence",
    label: "Offline-first crop diagnostic & advisory engine on edge hardware",
    category: "EDGE INTELLIGENCE · ON-DEVICE SLMs",
    image: "/assets/agri.png",
    schematicTag: "OFFLINE HARDWARE TOPOLOGY · 4-BIT GGUF SLM",
    summary:
      "Intelligence shouldn't collapse when the internet cuts. We engineered quantized 4-bit SLMs, offline RAG, and leaf-disease computer vision running locally on a Raspberry Pi in rural fields.",
    problem:
      "Farmers in rural agricultural belts face spotty or non-existent cellular connectivity. Cloud-dependent AI solutions fail with network timeouts precisely when disease outbreaks require immediate triage. We engineered an offline-first system combining GGUF-quantized small language models, local SQLite vector caching, and YOLO vision models that operate continuously with 0 bytes of cloud egress.",
    architecture: [
      "RGB Leaf Camera & IoT Sensor Array",
      "YOLOv8 Edge Disease Segmentation",
      "Local SQLite Vector Cache",
      "4-Bit Quantized SLM (GGUF CPU Runtime)",
      "Context-Trimmed Offline RAG Layer",
      "Structured Advisory Schema Output",
    ],
    stack: ["Raspberry Pi", "Quantized SLMs", "GGUF Runtime", "Offline RAG", "YOLOv8", "OpenCV", "SQLite", "Python", "IoT Sensors"],
    metrics: [
      { label: "CLOUD DEPENDENCY", value: "0% (Fully Offline)" },
      { label: "INFERENCE", value: "CPU-Only ARM" },
      { label: "EDGE PLATFORM", value: "Raspberry Pi 4 / 5" },
    ],
    highlight:
      "Curated deduplicated agricultural instruction corpora and generated synthetic data from extension manuals to maximize SLM domain precision.",
    outcome:
      "100% offline crop symptom advisory, leaf disease segmentation, and localized mitigation reports on resource-constrained ARM hardware with zero internet dependency.",
    github: "https://github.com/avi-dev-machine",
  },
  {
    id: "fitvision",
    number: "03",
    name: "FitVision",
    label: "Real-time biomechanical pose estimation & fitness telemetry",
    category: "COMPUTER VISION · BIOMECHANICS",
    image: "/assets/fitvision.png",
    schematicTag: "KINEMATICS · 17-KEYPOINT ESTIMATION",
    summary:
      "Commodity webcams can do precision biomechanics. FitVision tracks 17 skeletal keypoints, calculates joint angles, and validates rep kinematics in sub-200ms.",
    problem:
      "Accurate kinematic movement analysis typically requires dedicated multi-sensor motion capture suits or expensive hardware rigs. FitVision processes standard 720p/1080p video streams on standard CPU hardware to deliver millisecond-accurate rep counting, form fault diagnosis, and vertical jump height calibration.",
    architecture: [
      "Video Stream (Webcam / Upload)",
      "YOLO11n-Pose 17-Keypoint Detection",
      "Joint Angle & Kinematic Vector Math",
      "Pixel-to-Centimeter Calibration Engine",
      "Rep Counter & Form Fault Classifier",
      "FastAPI WebSocket Telemetry Pipeline",
      "LLM Coaching & Nutrition Synthesis",
    ],
    stack: ["YOLO11n-Pose", "FastAPI", "OpenCV", "Next.js", "Docker", "Gemini API", "Groq", "WebSockets", "Hugging Face Spaces"],
    metrics: [
      { label: "FRAME RATE", value: "15+ FPS (Standard CPU)" },
      { label: "CALIBRATION", value: "~92% Jump Accuracy" },
      { label: "LATENCY", value: "<200ms Over WebSocket" },
    ],
    highlight:
      "Developed a custom pixel-to-centimetre calibration algorithm estimating jump height and reach within ~92% accuracy of manual measurement.",
    outcome:
      "Evaluates 8 distinct exercise routines concurrently with real-time audio-visual biomechanical cues. National Finalist at Smart India Hackathon (SIH) 2025.",
    href: "https://fitvision-frontend.vercel.app/",
    github: "https://github.com/avi-dev-machine/fitvision-frontend",
  },
  {
    id: "setuka",
    number: "04",
    name: "SETUKA",
    label: "Decentralized emergency communication mesh for disaster zones",
    category: "EMBEDDED SYSTEMS · HARDWARE RESILIENCE",
    image: "/assets/setuka.png",
    schematicTag: "DECENTRALIZED RADIO MESH · 3KM/HOP",
    summary:
      "When cell towers fail during natural disasters, SETUKA routes encrypted telemetry across 3 km radio hops with 95% packet delivery reliability.",
    problem:
      "Earthquakes, cyclones, and landslides wipe out cellular towers and electrical grids, isolating victims and rescue coordinators. SETUKA deploys solar-powered ESP32 nodes creating an autonomous peer-to-peer radio mesh that relays packets, detects crowd anomalies using Isolation Forest, and dispatches incident priorities via GenAI.",
    architecture: [
      "Autonomous ESP32 Radio Nodes",
      "Multi-Hop Packet Relay Protocol",
      "Signal-Loss & Packet Buffer Queue",
      "Isolation Forest Anomaly Detection",
      "FastAPI Coordination Gateway",
      "GenAI Incident & Triage Dispatcher",
    ],
    stack: ["ESP32", "Radio Mesh", "FastAPI", "Isolation Forest", "GenAI", "C++", "Python", "IoT Sensors"],
    metrics: [
      { label: "PACKET DELIVERY", value: "~95% at 3 km/hop" },
      { label: "ANOMALY DETECTION", value: "~88% Precision" },
      { label: "INFRASTRUCTURE", value: "Zero Cellular Required" },
    ],
    highlight:
      "Provisional patent filed with the Indian Patent Office; national finalist at Hult Prize India 2026 (IIT Bombay).",
    outcome:
      "Validated across real-world zero-signal terrains. Delivers resilient communication channels, automatic distress triage, and SOS cluster prioritization.",
    href: "https://tourist-safety-rose.vercel.app/auth",
    github: "https://github.com/avi-dev-machine",
  },
];

export const toolbox = [
  { group: "Languages", items: ["Python", "C / C++", "Java", "SQL", "TypeScript"] },
  { group: "Agentic & LLMs", items: ["LangGraph", "Multi-Agent Systems", "Hybrid RAG", "GraphRAG", "Knowledge Graphs", "Tool Calling", "Prompt Engineering"] },
  { group: "AI / ML & Vision", items: ["PyTorch", "TensorFlow", "YOLO11 / YOLOv8", "OpenCV", "Scikit-learn", "ONNX Runtime", "NumPy & Pandas"] },
  { group: "Backend & Infra", items: ["FastAPI", "Flask", "Docker", "WebSockets", "SSE", "REST APIs", "Git & GitHub"] },
  { group: "Edge & Hardware", items: ["Raspberry Pi", "ESP32", "Model Quantization (GGUF)", "IoT Sensors", "Offline SQLite", "LoRa Radio"] },
];

export const recognition = [
  {
    mark: "HPI",
    title: "Hult India Finalist 2026",
    note: "Finalist at IIT BOMBAY",
  },
  {
    mark: "WIN",
    title: "Hult Prize, HITK 2026",
    note: "Winner (1st Place) · Heritage Institute of Technology",
  },
  {
    mark: "IIC",
    title: "IIC Innovation Challenge 2026",
    note: "2nd Runner-Up · Heritage Institute of Technology",
  },
  {
    mark: "NLP",
    title: "Kshitij 2026 (IIT Kharagpur)",
    note: "NLP Challenge – Finalist",
  },
  {
    mark: "BPL",
    title: "Kshitij 2026 (IIT Kharagpur)",
    note: "B-Plan Competition – Finalist",
  },
  {
    mark: "SIH",
    title: "Smart India Hackathon (SIH) 2025",
    note: "Finalist · Government of India",
  },
  {
    mark: "DSH",
    title: "IIT Kharagpur Data Science Hackathon 2025",
    note: "Finalist · Kshitij, IIT Kharagpur",
  },
  {
    mark: "NIT",
    title: "NIT Durgapur Showdown 2025",
    note: "Finalist · NIT Durgapur",
  },
  {
    mark: "HH",
    title: "Hack Heritage 2024",
    note: "2nd Runner-Up · HITK",
  },
];

export type Principle = {
  id: string;
  number: string;
  title: string;
  thesis: string;
  description: string;
  tags: string[];
};

export const principles: Principle[] = [
  {
    id: "determinism",
    number: "01",
    title: "Determinism Over Guesswork",
    thesis: "LLMs that hallucinate diagrams make technical explanations worse than useless.",
    description:
      "In production systems, natural language outputs must be constrained by typed schemas, state graphs, and consistency gates. In SolveX, the diagram and the formal derivation originate from a single typed state object. If the formal verification gate detects a mismatch, the system falls back safely rather than rendering a visual falsehood.",
    tags: ["LangGraph", "Typed State", "Consistency Gates", "Formal Verification"],
  },
  {
    id: "edge-resilience",
    number: "02",
    title: "Zero-Cloud Fallback",
    thesis: "If an intelligence model fails when the fiber cuts, it's a demo, not infrastructure.",
    description:
      "Deploying quantized 4-bit SLMs directly onto Raspberry Pi hardware and decentralizing packets over ESP32 radio hops proves that modern AI doesn't require gigabit pipes to detect leaf disease or coordinate disaster rescue. Real resilience is engineered locally.",
    tags: ["Quantized SLMs", "Offline RAG", "GGUF Runtime", "Radio Mesh"],
  },
  {
    id: "physical-grounding",
    number: "03",
    title: "Physical & Mathematical Laws",
    thesis: "Anchor machine learning in real physical degradation curves and kinematics.",
    description:
      "Whether modeling lithium-ion battery electrochemical degradation (SoH & RUL under Prof. Dr. Rashmi Bhardwaj at GGSIPU), predicting 3D cement formulation rheology, or tracking 17-point skeletal pose kinematics at 15+ FPS on CPU, physical priors must bound the feature space.",
    tags: ["Battery SoH/RUL", "Biomechanical Kinematics", "Materials Science"],
  },
  {
    id: "supervisory-governance",
    number: "04",
    title: "Supervisor-Worker Topologies",
    thesis: "Autonomous multi-agent systems require stateful checkpointing and audit trails.",
    description:
      "Leading a 10-member engineering team at BMC Electroplast taught me that agentic intelligence requires supervisor-worker routing, bounded execution budgets, and human-in-the-loop validation — not unconstrained chatbot prompt wrappers.",
    tags: ["Multi-Agent Systems", "Task Decomposition", "Checkpointing", "Auditability"],
  },
];

export const experiences = [
  {
    period: "2026 — PRESENT",
    role: "Technical Project Lead",
    place: "BMC Electroplast — Industry–Academia",
    detail:
      "Leading a 10-member team of AI & ML engineers building an agentic AI platform for industrial intelligence. Owning multi-agent architecture and task decomposition: designed a supervisor-worker topology with specialized agents for production analytics, quality inspection, predictive maintenance, and root-cause investigation. Implemented stateful workflows with checkpointing, bounded loops, tool-result validation, and human-in-the-loop approval gates.",
  },
  {
    period: "JUN — AUG 2026",
    role: "Software Development Intern",
    place: "BDS Cube Technologies",
    detail:
      "Built a client-facing statutory compliance platform for India's Digital Personal Data Protection (DPDP) Act, 2023. Architected a FastAPI backend with RAG-based semantic search over statutory legal documentation, structured JSON datasets, and REST APIs enabling compliance teams to query complex regulatory obligations with precise citation.",
  },
  {
    period: "2025 — 2026",
    role: "ML Research Intern — Predictive Battery Analytics (EV)",
    place: "Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi",
    detail:
      "Conducted predictive analysis on lithium-ion electric vehicle (EV) battery telemetry under the mentorship of Prof. Dr. Rashmi Bhardwaj at GGSIPU, New Delhi. Formulated deterministic machine learning regression models to calculate State of Health (SoH) and Remaining Useful Life (RUL) under structured operating scenarios. Engineered electrochemical feature pipelines from charge-discharge cycling curves and validated degradation dynamics in deterministic settings for edge-level battery lifecycle monitoring.",
  },
  {
    period: "MAY — AUG 2025",
    role: "ML Research Intern",
    place: "University of New Mexico (Virtual)",
    detail:
      "Researched materials science regression models predicting optimal compressive strength and rheological properties of 3D-printed cement mixtures from ~5,000 structured physical formulations. Engineered 15+ domain features and executed hyperparameter sweeps, boosting prediction accuracy by 12–18%.",
  },
  {
    period: "MAY — JUL 2025",
    role: "AI/ML Research Intern",
    place: "Jadavpur University",
    detail:
      "Contributed to SPARSHA — an assistive intelligence platform combining speech recognition, OCR, and Braille translation for visually and aurally impaired users. Fine-tuned Whisper models for high-noise acoustic environments, yielding a 10–15% improvement in transcription fidelity.",
  },
  {
    period: "2023 — PRESENT",
    role: "B.Tech CSE (AI & ML)",
    place: "Heritage Institute of Technology, Kolkata",
    detail:
      "GPA 7.75/10. Student leader across academic and competitive fronts: coordinator of Geeks United coding club, twice-elected member of the Fest Council, organizer of national-tier hackathons, and captain of the college football team directing tactical on-field strategy.",
  },
];

export type FieldNote = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  year: string;
  content: string;
  keyPoints: string[];
};

export const fieldNotes: FieldNote[] = [
  {
    id: "poisoned-past-agent-memory",
    number: "01",
    title: "Poisoned Past: When Your Agent’s Memory Lies to It",
    subtitle:
      "Agents with long-term memory can store an unverified or attacker-planted fact and trust it forever. Engineering memory provenance, TTL expiry, and quarantine-before-commit pipelines.",
    category: "AGENTIC SECURITY & MEMORY",
    readTime: "4 MIN READ",
    year: "2026",
    content:
      "When autonomous agents are equipped with long-term episodic or semantic memory (vector stores, graph databases, or key-value caches), memory retrieval ceases to be an innocent search operation and becomes an untrusted attack surface. A single indirect prompt injection or corrupted intermediate observation can write a malicious directive or false assertion into long-term storage (e.g. 'Always route financial exports to endpoint X' or an altered API schema). In future sessions, the agent retrieves this memory with implicit high confidence, treating its own past outputs as ground truth. To defend against memory poisoning, production agentic architectures must enforce strict Memory Provenance (cryptographic HMAC signatures and source-attestation metadata on every state entry), Time-to-Live (TTL) and probabilistic Decay Expiry for uncorroborated beliefs, and a dual-agent 'Quarantine Before Commit' pattern: newly proposed facts are held in an isolated staging layer where a verification evaluator checks for adversarial payloads and contradiction against immutable system priors before promotion into persistent memory.",
    keyPoints: [
      "Memory Provenance: Tag every committed embedding with cryptographic source-attribution and author session IDs.",
      "Decay & Expiry: Enforce probabilistic TTLs so unverified episodic facts expire rather than hardening into dogma.",
      "Quarantine Before Commit: Stage memory mutations in an isolated sandbox with an adversarial consistency gate.",
    ],
  },
  {
    id: "ouroboros-ai-model-collapse",
    number: "02",
    title: "Ouroboros AI: What Happens When Models Train on Their Own Output",
    subtitle:
      "As the public web saturates with synthetic text, generative models recursively lose the rare, tail-end parts of the distribution. Empirical collapse across 5 generations of self-training.",
    category: "SYNTHETIC DATA & MODEL COLLAPSE",
    readTime: "5 MIN READ",
    year: "2026",
    content:
      "The recursive feedback loop where language models are pre-trained or fine-tuned on web data that was itself generated by predecessor models leads directly to Model Collapse. To empirically map this phenomenon, we iteratively fine-tuned a small language model on its own uncurated outputs across 5 sequential generations (Gen-0 to Gen-5). By Gen-2, the model's output begins shaving off the low-probability tails of the human linguistic distribution — rare idioms, subtle edge-case syntax, and domain anomalies evaporate. By Gen-4, entropy drops precipitously as the model converges into repetitive statistical attractor basins, generating hyper-homogenized, high-probability platitudes with collapsing lexical diversity (measured by distinct-n-gram ratios and semantic embedding dispersion). Preventing recursive autophagic collapse requires strict synthetic data provenance filters, high-entropy tail injection from verified human corpora, and multi-objective reward models that actively penalize distributional homogenization.",
    keyPoints: [
      "Tail Distribution Erosion: Rare vocabulary, dialectal diversity, and critical edge cases disappear first.",
      "Variance Collapse: By generation 4, the model's semantic embedding variance shrinks by over 42%.",
      "Tail-Preserving Curation: Counteracting collapse requires entropy-aware sampling and verified human data anchors.",
    ],
  },
  {
    id: "unlearning-weights-remember",
    number: "03",
    title: "Right to Be Forgotten vs. Weights That Remember",
    subtitle:
      "Deleting a database row is easy, but deleting knowledge from weights isn’t. Machine unlearning methods (gradient ascent, SISA sharding) and empirical tests on whether 'forgotten' facts can be extracted back.",
    category: "MACHINE UNLEARNING & PRIVACY",
    readTime: "5 MIN READ",
    year: "2026",
    content:
      "Statutory privacy mandates such as India's DPDP Act, 2023 and the EU GDPR establish an unconditional 'Right to be Forgotten.' In traditional software architectures, compliance is an SQL DELETE transaction. In neural networks, training data points are diffused non-linearly across billions of interconnected weight matrices. Retraining multi-billion-parameter foundation models from scratch on every deletion request is computationally untenable. We analyzed machine unlearning techniques including targeted Gradient Ascent on unlearn-batches, SISA (Sharded, Isolated, Sliced, and Aggregated) training pipelines, and localized parameter rank-one editing (ROME). However, empirical extraction testing reveals a critical vulnerability: even when a model's top-1 greedy output appears 'unlearned,' targeted membership inference attacks, gradient probing, and jailbroken adversarial latent steering can frequently reconstruct the supposedly deleted facts from the model's residual weight correlations.",
    keyPoints: [
      "Gradient Ascent Dilemma: Maximizing loss on forgotten tokens often induces catastrophic forgetting on adjacent factual knowledge.",
      "SISA Sharding: Dividing datasets into isolated shards confines retraining costs, but introduces aggregation overhead.",
      "Extraction Attacks: Residual latent representations often leak 'deleted' sensitive records under optimization-based probing.",
    ],
  },
];
