# Professional Agentic Developer Portfolio

This is a premium, high-performance, and interactive single-page developer portfolio website engineered for **Venkata Ramakrishna Kamepalli**. 

The design combines Google and Apple senior developer aesthetics: a sleek dark mode theme (`#030014`), responsive Constellation Canvas animation, interactive diagnostics HUD telemetry, a live Claude AI RAG Chatbot, and a Model Context Protocol (MCP) JSON-RPC client simulator.

Live portfolio: https://ramakrishna-portfolio-main.vercel.app

---

## 🏗️ Project Architecture

The codebase follows a modular design separating state coordination, client-side RAG indexing, and UI rendering:

```
├── index.html                  # Metadata, preloaded Google Fonts (Inter, Outfit, Fira Code)
├── vite.config.ts              # Vite plugins configuration (React + Tailwind v4 Compiler)
├── src/
│   ├── main.tsx                # App bootstrap entry
│   ├── App.tsx                 # Viewport scroll observation, progress bars, layout coordination
│   ├── index.css               # CSS styling tokens, keyframes, backdrop horizons glows
│   ├── data/
│   │   ├── resumeData.ts       # Structured JSON Database & Mini-RAG keyword matching index
│   │   └── resumeData.test.ts  # RAG semantic index unit tests
│   └── components/
│       ├── Navbar.tsx          # Scroll-tracking glassmorphic header
│       ├── Hero.tsx            # Particle canvas constellation render & active glow customizer
│       ├── AgentTerminal.tsx   # JSON-RPC 2.5 compliant MCP tool call console CLI
│       ├── Skills.tsx          # Interactive categories, detail metrics grids
│       ├── Projects.tsx        # Portfolios display cards, detail panels slide drawers
│       ├── Certifications.tsx  # Verified credentials links layout
│       ├── EducationTimeline.tsx # Vertical academic timeline nodes
│       ├── Contact.tsx         # Contact clipboard triggers & input validation triggers
│       ├── ScrollReveal.tsx    # IntersectionObserver-based Apple-style entrance wrapper
│       ├── PerformanceMonitor.tsx # Developer HUD displaying FPS, V8 heap usage, and load times
│       └── AIAssistant.tsx     # Floating chatbot widget query responder
```

---

## ⚡ Key Systems Engineering

### 1. Xcode Telemetry HUD (`PerformanceMonitor.tsx`)
Monitors actual client browser load efficiency metrics:
- **Render Framerate (FPS)**: Uses standard browser `requestAnimationFrame` delta ticks to compute live frames.
- **Document Load Speed**: Calculates precise loading latency in milliseconds using the **V8 Navigation Performance Timing API** (`performance.getEntriesByType('navigation')`).
- **Memory Allocation**: Tracks JS heap metrics (`window.performance.memory`) in chromium environments.

### 2. Client-Side RAG QA Assistant (`AIAssistant.tsx` / `resumeData.ts`)
Decouples dataset records from the UI. User queries undergo a mini-RAG tokenization and keyword scoring search in `resumeData.ts` to identify the most relevant context blocks from the JSON database before formulating a structured, Claude-style agent response.

### 3. Model Context Protocol Simulator (`AgentTerminal.tsx`)
A terminal interface simulating tool execution specifications developed by Anthropic:
- **Tool Listing**: Outputs active JSON-schemas representing registered tool targets.
- **RPC calls**: Typing commands (e.g. `call query_resume --field="skills"`) prints standard-compliant **JSON-RPC 2.0 requests and responses** to show tool execution flows.

---

## 🛠️ Operations & Execution

### Setup Dependencies
Install dependencies locally:
```bash
npm install
```

### Local Dev Server
Launch Vite hot-module replacement server on `http://localhost:5173`:
```bash
npm run dev
```

### Unit Tests
Execute the TSX-driven RAG search index test suite:
```bash
npm run test
```

### Build Production Bundle
Build and minify production assets into `dist/`:
```bash
npm run build
```

---

## 🌐 Production Deployment
The website is automatically built and aliased to:
**[https://ramakrishna-portfolio-delta.vercel.app/](https://ramakrishna-portfolio-delta.vercel.app/)**
