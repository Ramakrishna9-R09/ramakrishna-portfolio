import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Terminal, Send, Play, RefreshCw, Info, Cpu, Database, Network, Binary, FileText, ChevronRight } from 'lucide-react';
import { searchResumeIndex } from '../data/resumeData';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'success' | 'error' | 'header';
}

type Stage = 'idle' | 'tokenizer' | 'embedding' | 'retrieval' | 'prompt' | 'output';

export default function AgentTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: '====================================================================', type: 'header' },
    { text: '   MODEL CONTEXT PROTOCOL (MCP) CLIENT CONTROLLER v3.0.0', type: 'header' },
    { text: '   Security Principal: Venkata Ramakrishna Kamepalli (Agent Architect)', type: 'header' },
    { text: '====================================================================', type: 'header' },
    { text: 'Initialization: Instantiating Claude 3.5 Sonnet agent pipeline...', type: 'output' },
    { text: 'Registered MCP tools: query_resume, calculate_performance, inspect_skills', type: 'success' },
    { text: 'RAG Knowledgebase initialized. 12 resume sections indexed.', type: 'output' },
    { text: 'Try advanced commands: "ask cgpa", "tools", or "call query_resume --field=projects".', type: 'output' },
    { text: 'Type "help" to list all commands.', type: 'output' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<Stage>('idle');
  const [activeQueryMatch, setActiveQueryMatch] = useState<number>(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const commandPresets = [
    { cmd: 'ask "what are his main GenAI skills?"', label: 'RAG: Ask GenAI Skills', desc: 'Queries Claude via semantic RAG' },
    { cmd: 'call query_resume --field="projects"', label: 'MCP: Call query_resume', desc: 'Runs JSON-RPC tool check' },
    { cmd: 'verify-credentials', label: 'Verify Credentials', desc: 'Audits credentials keys' },
    { cmd: 'tools', label: 'List MCP Tools', desc: 'Lists active RPC schemas' }
  ];

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const newLines = [...lines, { text: `user@mcp-host:~$ ${trimmed}`, type: 'input' as const }];
    setLines(newLines);
    setInputValue('');
    setIsProcessing(true);

    const cmdLower = trimmed.toLowerCase();

    // Trigger sequential animations for RAG queries
    if (cmdLower.startsWith('ask ')) {
      const query = trimmed.substring(4).replace(/['"]+/g, '');
      const ragResult = searchResumeIndex(query);
      setActiveQueryMatch(Math.floor(Math.random() * 15) + 82); // mock similarity match score

      setCurrentStage('tokenizer');
      setTimeout(() => {
        setCurrentStage('embedding');
        setTimeout(() => {
          setCurrentStage('retrieval');
          setTimeout(() => {
            setCurrentStage('prompt');
            setTimeout(() => {
              setCurrentStage('output');

              const response: TerminalLine[] = [
                { text: `[RAG Engine] Tokenizing query: "${query}"`, type: 'output' },
                { text: `[RAG Engine] Generating semantic embeddings (Cosine Similarity Check)...`, type: 'output' },
                { text: `[RAG Engine] Retrieved ${ragResult.context.length} matching context blocks (Score: ${(activeQueryMatch/100).toFixed(4)}):`, type: 'success' },
              ];

              ragResult.context.forEach(ctx => {
                response.push({ text: `  ↳ ${ctx}`, type: 'output' });
              });

              response.push(
                { text: `[Claude 3.5] Injecting matched context + system safety prompts...`, type: 'output' },
                { text: `[Claude Response] ${ragResult.response}`, type: 'success' }
              );

              setLines((prev) => [...prev, ...response]);
              setIsProcessing(false);
              setTimeout(() => {
                setCurrentStage('idle');
                setActiveQueryMatch(0);
              }, 3000);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
      return;
    }

    // Trigger sequential animations for MCP tool calls
    if (cmdLower.startsWith('call ')) {
      const toolCall = trimmed.substring(5);
      const fieldMatch = toolCall.match(/--field=["']?(\w+)["']?/);
      const field = fieldMatch ? fieldMatch[1] : 'education';

      setCurrentStage('tokenizer');
      setTimeout(() => {
        setCurrentStage('embedding');
        setTimeout(() => {
          setCurrentStage('retrieval');
          setTimeout(() => {
            setCurrentStage('prompt');
            setTimeout(() => {
              setCurrentStage('output');

              let response: TerminalLine[] = [];
              if (toolCall.startsWith('query_resume')) {
                response = [
                  { text: `[MCP Client] Mapping tool request to JSON-RPC 2.0 schema...`, type: 'output' },
                  { text: `>> SENDING HOST REQUEST:`, type: 'output' },
                  { text: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'tools/call',
                    params: {
                      name: 'query_resume',
                      arguments: { field: field }
                    },
                    id: Math.floor(Math.random() * 1000)
                  }, null, 2), type: 'header' },
                  { text: `[MCP Host] Invoking query_resume on local index...`, type: 'output' },
                  { text: `<< RECEIVED HOST RESPONSE:`, type: 'output' },
                ];

                if (field === 'projects') {
                  response.push({
                    text: JSON.stringify({
                      status: 'success',
                      result: {
                        content: [
                          { type: 'text', text: 'StudyMate (AWS Lambda RAG), IoT Scalp Detection (Edge CNN), VIT Connect (MERN), HR Workflow Designer (TS)' }
                        ]
                      }
                    }, null, 2),
                    type: 'success'
                  });
                } else if (field === 'skills') {
                  response.push({
                    text: JSON.stringify({
                      status: 'success',
                      result: {
                        content: [
                          { type: 'text', text: 'Python (OOP, Concurrency, Pytest), AWS Cloud, MongoDB Certified, GenAI MCP planning, TypeScript' }
                        ]
                      }
                    }, null, 2),
                    type: 'success'
                  });
                } else {
                  response.push({
                    text: JSON.stringify({
                      status: 'success',
                      result: {
                        content: [
                          { type: 'text', text: 'Vellore Institute of Technology (VIT) Chennai - Integrated M.Tech in Software Engineering (2022-2027)' }
                        ]
                      }
                    }, null, 2),
                    type: 'success'
                  });
                }
              } else {
                response = [
                  { text: `[MCP Client] Invalid tool: "${toolCall}". Registered tools are: query_resume, calculate_performance, inspect_skills.`, type: 'error' }
                ];
              }

              setLines((prev) => [...prev, ...response]);
              setIsProcessing(false);
              setTimeout(() => {
                setCurrentStage('idle');
              }, 3000);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
      return;
    }

    // Default static commands
    setTimeout(() => {
      let response: TerminalLine[] = [];
      switch (cmdLower) {
        case 'help':
          response = [
            { text: 'Model Context Protocol (MCP) Available Schemes:', type: 'output' },
            { text: '  ask "<question>"       - semantic RAG Query using Claude 3.5 on indexed resume context.', type: 'output' },
            { text: '  tools                   - inspects JSON-RPC schemas of registered MCP servers.', type: 'output' },
            { text: '  call query_resume --field="[projects|skills|education]"', type: 'output' },
            { text: '                          - executes a mock JSON-RPC 2.0 tool execution request.', type: 'output' },
            { text: '  verify-credentials      - audits verified credentials and credly licenses.', type: 'output' },
            { text: '  clear                   - clears terminal stdout logs.', type: 'output' },
            { text: '  download-resume         - downloads the resume PDF directly.', type: 'output' }
          ];
          break;

        case 'tools':
          response = [
            { text: '🔧 Listing registered MCP tools schema:', type: 'header' },
            { text: JSON.stringify([
              {
                name: 'query_resume',
                description: 'Fetch specific segments of Ramakrishna\'s resume',
                inputSchema: {
                  type: 'object',
                  properties: {
                    field: { type: 'string', enum: ['education', 'skills', 'projects', 'certifications'] }
                  },
                  required: ['field']
                }
              },
              {
                name: 'calculate_performance',
                description: 'Returns efficiency scores for optimized tasks',
                inputSchema: {
                  type: 'object',
                  properties: {
                    metric: { type: 'string', enum: ['latency', 'reliability', 'db_query'] }
                  },
                  required: ['metric']
                }
              }
            ], null, 2), type: 'success' }
          ];
          break;

        case 'verify-credentials':
          response = [
            { text: '🔍 Initializing agent credentials audit...', type: 'output' },
            { text: '🔑 Loading credential keystore: Anthropic Skilljar Verified...', type: 'output' },
            { text: '✓ [Success] Verified Claude with Anthropic API (ID: y74wjp348erp) - May 2026', type: 'success' },
            { text: '✓ [Success] Verified Model Context Protocol Specialist (ID: t832agpz7q82) - May 2026', type: 'success' },
            { text: '✓ [Success] Verified Introduction to Agent Skills (ID: gj7g8nr79xug) - May 2026', type: 'success' },
            { text: '🔑 Loading database credentials: Credly Verified...', type: 'output' },
            { text: '✓ [Success] Verified MongoDB Certified Associate Developer (ID: fe20e510) - May 2026', type: 'success' },
            { text: '✓ [Success] Verified Oracle Cloud Infrastructure AI Associate (ID: 2025-AI) - 2025', type: 'success' },
            { text: '----------------------------------------------------------', type: 'output' },
            { text: '🛡️ SECURITY AUDIT PASSED: Venkata Ramakrishna is a fully certified Agent Developer.', type: 'success' }
          ];
          break;

        case 'clear':
          setLines([]);
          setIsProcessing(false);
          return;

        case 'download-resume':
          response = [
            { text: '📄 Fetching resume PDF...', type: 'output' },
            { text: '🚀 Opening document in a new window...', type: 'success' }
          ];
          window.open('./Ramakrishna.pdf', '_blank');
          break;

        default:
          response = [
            { text: `Command not found: "${trimmed}". Type "help" for a list of valid commands.`, type: 'error' }
          ];
      }

      setLines((prev) => [...prev, ...response]);
      setIsProcessing(false);
    }, 400);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    }
  };

  // RAG Stage metadata helpers
  const getStageClass = (stage: Stage) => {
    const base = "flex items-center gap-3.5 p-3 rounded-xl border transition-all duration-300 ";
    if (currentStage === stage) {
      return base + "border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.15)] text-white";
    }
    const stagesOrder: Stage[] = ['idle', 'tokenizer', 'embedding', 'retrieval', 'prompt', 'output'];
    const activeIdx = stagesOrder.indexOf(currentStage);
    const thisIdx = stagesOrder.indexOf(stage);

    if (activeIdx > thisIdx && currentStage !== 'idle') {
      return base + "border-emerald-500/30 bg-emerald-500/5 text-gray-300";
    }
    return base + "border-white/5 bg-white/[0.01] text-gray-500";
  };

  const getStageIconClass = (stage: Stage) => {
    if (currentStage === stage) return "text-purple-400 scale-110 transition-transform duration-300";
    const stagesOrder: Stage[] = ['idle', 'tokenizer', 'embedding', 'retrieval', 'prompt', 'output'];
    const activeIdx = stagesOrder.indexOf(currentStage);
    const thisIdx = stagesOrder.indexOf(stage);
    if (activeIdx > thisIdx && currentStage !== 'idle') return "text-emerald-400";
    return "text-gray-600";
  };

  return (
    <section id="agent-terminal" className="py-24 relative overflow-hidden bg-black/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] purple-horizon-bottom" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Simulated Agentic Client CLI
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Type custom RAG questions or trigger JSON-RPC tool schemas. Experience how certified Model Context Protocol (MCP) agents index, call, and verify data.
          </p>
        </div>

        {/* Dual-Panel Diagnostics Container */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative grid grid-cols-1 lg:grid-cols-12 bg-black/60 backdrop-blur-xl">
          
          {/* Left Panel: CLI Console (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Terminal Title Bar */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-gray-400 font-mono ml-2 flex items-center gap-1.5 select-none">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  mcp-agent-cli
                </span>
              </div>
              <div className="flex items-center gap-2 select-none">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  Online
                </span>
              </div>
            </div>

            {/* Terminal Console Area */}
            <div className="p-5 h-[400px] overflow-y-auto font-mono text-xs md:text-sm text-gray-300 bg-black/40 flex flex-col gap-2 terminal-scrollbar">
              {lines.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === 'input'
                      ? 'text-white font-medium'
                      : line.type === 'success'
                      ? 'text-emerald-400'
                      : line.type === 'error'
                      ? 'text-white'
                      : line.type === 'header'
                      ? 'text-purple-400 font-semibold'
                      : 'text-gray-400'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {isProcessing && currentStage === 'output' && (
                <div className="text-purple-400 flex items-center gap-2 font-mono">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                  Agent is running tool execution pipeline...
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Input Line */}
            <div className="border-t border-white/10 p-3.5 bg-black/60 flex items-center gap-2.5">
              <span className="text-purple-400 font-mono font-semibold text-xs md:text-sm pl-1 select-none">
                user@mcp-host:~$
              </span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                disabled={isProcessing}
                placeholder='Type "ask what is his CGPA" or click presets below...'
                className="flex-1 bg-transparent text-white border-0 outline-none ring-0 focus:ring-0 font-mono text-xs md:text-sm select-none"
              />
              <button
                onClick={() => handleCommand(inputValue)}
                disabled={isProcessing || !inputValue.trim()}
                className="p-1.5 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel: RAG Visual Flow Diagnostics (4 Columns) */}
          <div className="lg:col-span-4 p-5 bg-black/[0.15] flex flex-col justify-between select-none">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
                <span className="text-xs uppercase font-mono tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
                  <Network className="w-4 h-4 text-purple-400" /> RAG Diagnostics
                </span>
                {activeQueryMatch > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 animate-pulse">
                    Match: {activeQueryMatch}%
                  </span>
                )}
              </div>

              {/* Sequential Flow Nodes */}
              <div className="flex flex-col gap-3.5 relative pl-2">
                {/* Visual vertical line connectors */}
                <div className="absolute left-[24px] top-6 bottom-6 w-[2px] bg-white/[0.04]" />
                {currentStage !== 'idle' && (
                  <div 
                    className="absolute left-[24px] top-6 w-[2px] bg-gradient-to-b from-purple-500 to-emerald-400 transition-all duration-1000"
                    style={{
                      height: currentStage === 'tokenizer' ? '0%' :
                              currentStage === 'embedding' ? '25%' :
                              currentStage === 'retrieval' ? '50%' :
                              currentStage === 'prompt' ? '75%' : '90%'
                    }}
                  />
                )}

                {/* Node 1: Tokenizer */}
                <div className={getStageClass('tokenizer')}>
                  <div className={`p-2 rounded-lg border border-white/5 bg-white/5 ${getStageIconClass('tokenizer')}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] font-bold font-display leading-none">1. Query Tokenizer</p>
                    <p className="text-[9px] text-gray-500 mt-1 font-sans">Splitting query into vector tags</p>
                  </div>
                </div>

                {/* Node 2: Embeddings Generator */}
                <div className={getStageClass('embedding')}>
                  <div className={`p-2 rounded-lg border border-white/5 bg-white/5 ${getStageIconClass('embedding')}`}>
                    <Binary className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] font-bold font-display leading-none">2. Cosine Similarity</p>
                    <p className="text-[9px] text-gray-500 mt-1 font-sans">Mapping semantic tensor matrices</p>
                  </div>
                </div>

                {/* Node 3: Database Index Search */}
                <div className={getStageClass('retrieval')}>
                  <div className={`p-2 rounded-lg border border-white/5 bg-white/5 ${getStageIconClass('retrieval')}`}>
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] font-bold font-display leading-none">3. Vector Match Retrieval</p>
                    <p className="text-[9px] text-gray-500 mt-1 font-sans">Querying local resume data blocks</p>
                  </div>
                </div>

                {/* Node 4: Prompt Construction */}
                <div className={getStageClass('prompt')}>
                  <div className={`p-2 rounded-lg border border-white/5 bg-white/5 ${getStageIconClass('prompt')}`}>
                    <Network className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] font-bold font-display leading-none">4. Context Synthesis</p>
                    <p className="text-[9px] text-gray-500 mt-1 font-sans">Compiling prompt constraints</p>
                  </div>
                </div>

                {/* Node 5: Model Response generation */}
                <div className={getStageClass('output')}>
                  <div className={`p-2 rounded-lg border border-white/5 bg-white/5 ${getStageIconClass('output')}`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] font-bold font-display leading-none">5. LLM Synthesis</p>
                    <p className="text-[9px] text-gray-500 mt-1 font-sans">Generating Claude Sonnet output stream</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry telemetry HUD info */}
            <div className="pt-4 border-t border-white/5 text-[9px] font-mono text-gray-500 flex justify-between items-center mt-4">
              <span>STATUS: {currentStage === 'idle' ? 'STANDBY' : 'PROCESSING'}</span>
              <span className="flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                RAG v3.0 (Strict Vercel ESM)
              </span>
            </div>
          </div>
        </div>

        {/* Command Presets Button Grid */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
            <Info className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Presets (click to run):</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {commandPresets.map((preset) => (
              <button
                key={preset.cmd}
                onClick={() => handleCommand(preset.cmd)}
                disabled={isProcessing}
                className="glass-card hover:border-purple-500/40 p-3 rounded-xl text-left hover:bg-white/5 border border-white/5 transition-all flex flex-col gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs font-bold text-white group-hover:text-purple-400">
                    {preset.label}
                  </span>
                  <Play className="w-3 h-3 text-purple-400 opacity-60" />
                </div>
                <span className="text-[10px] text-gray-400 leading-tight">
                  {preset.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
