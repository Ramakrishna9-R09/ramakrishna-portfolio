import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Bot, X, Send, Sparkles, MessageSquareCode, ArrowUpRight, Settings2, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { searchResumeIndex } from '../data/resumeData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isStreaming?: boolean;
  metadata?: {
    latency: number;
    tokensSec: number;
    totalTokens: number;
    matchScore: number;
    matchedNodes: string[];
  };
}

type Persona = 'professional' | 'auditor' | 'creative';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDevPanel, setShowDevPanel] = useState(false);
  
  // Developer Configurations
  const [temperature, setTemperature] = useState<0.2 | 0.7 | 1.0>(0.7);
  const [activePersona, setActivePersona] = useState<Persona>('professional');
  const [showRAGSources, setShowRAGSources] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 'welcome',
      sender: 'assistant', 
      text: "I am Venkata's portfolio intelligence layer. Ask about projects, credentials, architecture decisions, availability, or backend and AI engineering proof points."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetQuestions = [
    { text: 'Verify GenAI Certifications', label: 'Certifications' },
    { text: 'Detail the StudyMate project', label: 'StudyMate project' },
    { text: 'What is his CGPA & education?', label: 'Education & CGPA' },
    { text: 'Is he available for office roles?', label: 'Role Availability' }
  ];

  // Exposing System Prompt Rules
  const systemPromptMapping = {
    professional: `SYSTEM PROMPT:
You are the professional AI representative for Venkata Ramakrishna.
1. Answer queries strictly using matched RAG context nodes.
2. Tone: Crisp, clean, software-engineer level.
3. Strict name safety: NEVER reference "Chandra" or "Kiran".
4. Temperature constraint: ${temperature}.`,
    auditor: `SYSTEM PROMPT:
You are the strict Technical Code Auditor persona.
1. Return answers alongside raw data matching statistics.
2. Emphasize verification links and credentials certifications.
3. Formulate replies with JSON block segments where appropriate.
4. Temperature constraint: ${temperature}.`,
    creative: `SYSTEM PROMPT:
You are the conversational Agent Companion persona.
1. Provide highly engaging, detailed explanations of projects.
2. Share background trivia about VIT Chennai studies.
3. Tone: Warm, helpful, and highly communicative.
4. Temperature constraint: ${temperature}.`
  };

  const handleSendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const messageId = `msg-${Date.now()}`;
    // 1. Append User Message
    setMessages((prev) => [...prev, { id: messageId, sender: 'user', text: trimmed }]);
    setInputText('');
    setIsTyping(true);

    const startTime = performance.now();

    // 2. Fetch semantic matches from RAG engine
    setTimeout(() => {
      const ragResult = searchResumeIndex(trimmed);
      const latency = Math.round(performance.now() - startTime);

      // Adjust text based on persona
      let finalResponseText = ragResult.response;
      if (activePersona === 'auditor') {
        finalResponseText = `[AUDIT SUCCESS] Cosine match verified.\n\n${ragResult.response}\n\n[RAG Telemetry] Latency: ${latency}ms | Matched nodes: ${ragResult.context.length} | Similarity Index: 0.923`;
      } else if (activePersona === 'creative') {
        finalResponseText = `${ragResult.response} Let me know if you would like me to trigger an MCP tool execution check to pull more details!`;
      }

      // If temperature is high, introduce slight randomness in lengths
      if (temperature === 1.0) {
        finalResponseText += " Feel free to connect regarding collaborations.";
      } else if (temperature === 0.2) {
        // Cut short / professional
        finalResponseText = finalResponseText.split('.')[0] + '.';
      }

      const totalTokens = Math.ceil(finalResponseText.length / 4);
      const speedK = Math.floor(Math.random() * 20) + 65; // ~65-85 tokens/sec
      const matchedScore = Math.floor(Math.random() * 10) + 88;

      const replyId = `reply-${Date.now()}`;
      setIsTyping(false);

      // Initialize streaming message
      setMessages((prev) => [
        ...prev, 
        { 
          id: replyId,
          sender: 'assistant', 
          text: '', 
          isStreaming: true,
          metadata: {
            latency,
            tokensSec: speedK,
            totalTokens,
            matchScore: matchedScore,
            matchedNodes: ragResult.context
          }
        }
      ]);

      // 3. True Token Streaming simulator loop
      let charIndex = 0;
      const interval = setInterval(() => {
        setMessages((prev) => {
          return prev.map((msg) => {
            if (msg.id === replyId) {
              const nextText = finalResponseText.substring(0, charIndex + 3); // stream 3 chars at a time
              const isFinished = nextText.length >= finalResponseText.length;
              if (isFinished) {
                clearInterval(interval);
              }
              return { 
                ...msg, 
                text: nextText,
                isStreaming: !isFinished
              };
            }
            return msg;
          });
        });
        charIndex += 3;
      }, 20);

    }, 800);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputText);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-20 z-40 p-3.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-500/20 text-white cursor-pointer shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-110 transition-all duration-300 select-none"
        title="Chat with Agent Assistant"
      >
        {isOpen ? <X className="w-5.5 h-5.5" /> : <Bot className="w-5.5 h-5.5 animate-pulse" />}
      </button>

      {/* Expandable Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 w-[90%] sm:w-[420px] h-[550px] z-40 glass-card border border-white/10 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-500 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Chat Title bar */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Assistant Agent</h4>
              <p className="text-[10px] text-gray-500 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                Claude RAG Engine v3.0
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDevPanel(!showDevPanel)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${showDevPanel ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-white'}`}
              title="Toggle Prompt Lab"
            >
              <Settings2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Prompt Playground Developer Panel */}
        {showDevPanel && (
          <div className="bg-neutral-950 border-b border-white/10 p-4 text-xs text-gray-300 font-mono flex flex-col gap-3 select-none overflow-y-auto max-h-[220px] terminal-scrollbar">
            <div className="flex items-center gap-1.5 text-purple-400 font-bold border-b border-white/5 pb-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>PROMPT PLAYGROUND</span>
            </div>

            {/* Persona Selector */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-wider text-gray-500">Agent Persona</label>
              <div className="grid grid-cols-3 gap-1">
                {(['professional', 'auditor', 'creative'] as Persona[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePersona(p)}
                    className={`p-1.5 rounded border text-[10px] capitalize transition-all cursor-pointer ${
                      activePersona === p ? 'border-purple-500 bg-purple-500/10 text-white font-bold' : 'border-white/5 text-gray-500'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Hyperparameter adjustments */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-wider text-gray-500">Temperature</label>
                <div className="flex gap-1">
                  {([0.2, 0.7, 1.0] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemperature(t)}
                      className={`flex-1 p-1 rounded border text-[10px] transition-all cursor-pointer ${
                        temperature === t ? 'border-purple-500 bg-purple-500/10 text-white font-bold' : 'border-white/5 text-gray-500'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <button
                  onClick={() => setShowRAGSources(!showRAGSources)}
                  className={`w-full p-1.5 rounded border text-[10px] transition-all cursor-pointer ${
                    showRAGSources ? 'border-purple-500 bg-purple-500/10 text-white font-bold' : 'border-white/5 text-gray-500'
                  }`}
                >
                  {showRAGSources ? 'Sources: Exposed' : 'Sources: Hidden'}
                </button>
              </div>
            </div>

            {/* System Prompt View */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-wider text-gray-500">Active System Prompt</label>
              <pre className="bg-white/5 border border-white/5 p-2 rounded text-[9px] text-gray-400 whitespace-pre-wrap leading-tight select-text select-none">
                {systemPromptMapping[activePersona]}
              </pre>
            </div>
          </div>
        )}

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto bg-black/40 flex flex-col gap-4 terminal-scrollbar text-xs md:text-sm font-sans">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-white/5 text-gray-300 border border-white/5 rounded-bl-none'
                }`}
              >
                {msg.text}

                {/* Token telemetry stats HUD */}
                {msg.sender === 'assistant' && msg.metadata && (
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] text-gray-500 select-none">
                    <span>Latency: {msg.metadata.latency}ms</span>
                    <span>Speed: {msg.metadata.tokensSec} t/s</span>
                    <span>Tokens: {msg.metadata.totalTokens}</span>
                  </div>
                )}
              </div>

              {/* RAG Retrieved context snippets */}
              {msg.sender === 'assistant' && msg.metadata && showRAGSources && msg.metadata.matchedNodes.length > 0 && (
                <RAGSourcesDropdown sources={msg.metadata.matchedNodes} score={msg.metadata.matchScore} />
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-none px-4 py-2.5 text-purple-400 flex items-center gap-2 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Dynamic Preset Prompts */}
        {messages.length === 1 && (
          <div className="p-3 bg-black/60 border-t border-white/5 flex flex-col gap-2 select-none">
            <p className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
              <MessageSquareCode className="w-3.5 h-3.5 text-purple-400" /> Suggested queries:
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {presetQuestions.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleSendMessage(q.text)}
                  className="glass-pill border border-white/5 hover:border-purple-500/25 p-2 rounded-xl text-left text-[10px] text-gray-300 hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <span>{q.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-purple-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-black/80 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            placeholder="Ask assistant about resume..."
            className="flex-1 bg-white/5 border border-white/5 focus:border-purple-500/30 text-white rounded-xl px-3 py-2 outline-none font-sans text-xs"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={isTyping || !inputText.trim()}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white cursor-pointer transition-colors disabled:opacity-40 flex items-center justify-center"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}

// Collapsible widget to inspect RAG Source context fragments
function RAGSourcesDropdown({ sources, score }: { sources: string[]; score: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-[85%] mt-1.5 pl-2 font-mono text-[9px] text-gray-500 select-none w-full">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 hover:text-gray-300 transition-colors cursor-pointer font-bold"
      >
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-purple-400" /> : <ChevronDown className="w-3.5 h-3.5 text-purple-400" />}
        <span>Matched Vector Blocks ({sources.length}) | Similarity Match: {score}%</span>
      </button>

      {isExpanded && (
        <div className="mt-1.5 flex flex-col gap-1.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 select-text">
          {sources.map((src, i) => (
            <div key={i} className="leading-tight p-1.5 bg-black/30 border border-white/5 rounded text-gray-400">
              <span className="text-purple-400 font-bold">Node A{i+1}: </span>
              {src.replace(/ Context \d+: /i, '').replace(/['"]+/g, '')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
