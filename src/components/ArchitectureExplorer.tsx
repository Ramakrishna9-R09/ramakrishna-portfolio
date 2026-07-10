import { useState, useEffect, useRef } from 'react';
import { 
  Server, Database, Code2, Terminal, ArrowRight, Lock, Activity, 
  Layers, Globe, RefreshCw, Send, Trash2, 
  Brain, FileJson, Zap, Settings
} from 'lucide-react';
import { searchResumeIndex } from '../data/resumeData';

type TierId = 'client' | 'gateway' | 'cache' | 'vectordb' | 'llm';

interface CodeSnippets {
  client: string;
  gateway: string;
  cache: string;
  vectordb: string;
  llm: string;
}

const codeSnippets: CodeSnippets = {
  client: `// React Frontend API Client Hook
export function useAgentChat() {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string, persona: string, temp: number) => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + import.meta.env.VITE_APP_JWT
        },
        body: JSON.stringify({ query: text, persona, temperature: temp })
      });

      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("API Gateway error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}`,
  gateway: `// Vercel Edge Middleware Router (TypeScript)
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);
  
  if (!success) {
    return new NextResponse('Rate Limit Exceeded', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      }
    });
  }

  // Token Authorization Check
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse('Unauthorized API Access Token', { status: 401 });
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-Powered-By', 'Vercel Edge Runtime (BOM1)');
  return response;
}`,
  cache: `// Redis Semantic Cache Middleware
import { Redis } from '@upstash/redis';
import { generateEmbedding } from './embeddings';

const redis = new Redis({ url: 'REDIS_URL', token: 'TOKEN' });
const SIMILARITY_THRESHOLD = 0.96; // Avoid LLM costs on duplicates

export async function checkSemanticCache(query: string) {
  const queryEmbedding = await generateEmbedding(query);
  
  // Fetch vector indexes from Redis
  const cachedKeys = await redis.keys('chat_cache:*');
  
  for (const key of cachedKeys) {
    const entry = await redis.get(key) as { embedding: number[], response: string };
    const score = cosineSimilarity(queryEmbedding, entry.embedding);
    
    if (score >= SIMILARITY_THRESHOLD) {
      return { 
        hit: true, 
        similarity: score, 
        response: entry.response 
      };
    }
  }
  return { hit: false };
}`,
  vectordb: `// Cosine Similarity Dot-Product Search Index
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Search local chunks
export function vectorSearch(queryVector: number[], chunks: DocumentChunk[]) {
  return chunks
    .map(chunk => ({
      chunk,
      score: cosineSimilarity(queryVector, chunk.embedding)
    }))
    .filter(match => match.score > 0.75)
    .sort((a, b) => b.score - a.score);
}`,
  llm: `// Anthropic Claude 3.5 Sonnet RAG Synthesizer
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateRAGResponse(query: string, matchedChunks: string[], systemPrompt: string) {
  const contextBlock = matchedChunks
    .map((chunk, idx) => \`[Context \${idx + 1}]\\n\${chunk}\`)
    .join('\\n\\n');

  const userContent = \`Matched Knowledgebase context:\\n\${contextBlock}\\n\\nQuery: \${query}\`;

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    temperature: 0.7,
    system: systemPrompt,
    messages: [{ role: "user", content: userContent }],
  });

  return msg.content[0].text;
}`
};

interface SpecData {
  title: string;
  tech: string;
  latency: string;
  desc: string;
  metrics: { name: string; val: string }[];
}

const tierSpecs: Record<TierId, SpecData> = {
  client: {
    title: 'Frontend UI Client',
    tech: 'React 19, TypeScript, TailwindCSS',
    latency: 'Client Side (~0ms)',
    desc: 'Interactive visual client dashboard mapping user questions to REST endpoints, utilizing SSE (Server-Sent Events) for live token streaming telemetry.',
    metrics: [
      { name: 'UI Framework', val: 'Vite / React 19' },
      { name: 'FPS Rendering', val: '60 FPS (Hardware Accel)' },
      { name: 'State Manager', val: 'React Context / Hooks' }
    ]
  },
  gateway: {
    title: 'Vercel Edge API Gateway',
    tech: 'TypeScript Edge Middleware',
    latency: '15ms - 40ms',
    desc: 'Geographically distributed Serverless Router deployed on Vercel Edge. Intercepts CORS, handles JWT Authorization checks, and implements Upstash sliding-window rate-limiting.',
    metrics: [
      { name: 'Runtime', val: 'Vercel Edge (ESM)' },
      { name: 'Rate Limit', val: '10 req / 10 sec' },
      { name: 'Router Node', val: 'BOM1 (Mumbai, IN)' }
    ]
  },
  cache: {
    title: 'Redis Semantic Cache',
    tech: 'Upstash Redis KV Cache Store',
    latency: '8ms - 22ms',
    desc: 'Calculates user request hash and runs semantic similarity checks against previous RAG search cache. Instantly hits if similarity >= 96%, bypassing LLM cost.',
    metrics: [
      { name: 'Cache Status', val: 'Enabled' },
      { name: 'Average Read', val: '12ms' },
      { name: 'Redis Keys', val: 'Active TTL' }
    ]
  },
  vectordb: {
    title: 'Local VectorDB Search',
    tech: '1536-dim Embedding Matcher',
    latency: '20ms - 45ms',
    desc: 'Tokenizes user inputs and processes cosine dot-product algorithms against the local resume database chunks. Returns matched contextual paragraphs alongside similarity rankings.',
    metrics: [
      { name: 'Dimensions', val: '1536 (OpenAI / Claude standard)' },
      { name: 'Chunks Indexed', val: '12 Sections' },
      { name: 'Search Distance', val: 'Cosine Similarity' }
    ]
  },
  llm: {
    title: 'Claude 3.5 Sonnet Engine',
    tech: 'Anthropic Messages Client SDK',
    latency: '400ms - 1200ms',
    desc: 'Core synthesis module. Merges RAG context nodes, system instructions, and security constraints into prompt wrappers. Streams responses with performance diagnostic metrics.',
    metrics: [
      { name: 'Active Model', val: 'Claude 3.5 Sonnet v2' },
      { name: 'Context Window', val: '200k Tokens' },
      { name: 'Pricing Unit', val: '$3.00 / M Input Tokens' }
    ]
  }
};

export default function ArchitectureExplorer({ activeTheme = 'purple' }: { activeTheme?: 'purple' | 'emerald' | 'indigo' }) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'playground'>('architecture');
  const [selectedTier, setSelectedTier] = useState<TierId>('gateway');
  
  // API Sandbox States
  const [selectedRoute, setSelectedRoute] = useState<string>('POST /api/v1/chat');
  const [sandboxQuery, setSandboxQuery] = useState<string>('what are his main GenAI skills?');
  const [sandboxPersona, setSandboxPersona] = useState<string>('professional');
  const [sandboxTemp, setSandboxTemp] = useState<number>(0.7);
  const [sandboxLimit, setSandboxLimit] = useState<number>(3);
  
  // Console execution states
  const [logs, setLogs] = useState<string[]>([]);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [responseJson, setResponseJson] = useState<string>('{}');
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [telemetry, setTelemetry] = useState({
    cacheHit: 'FALSE',
    latency: '0ms',
    tokens: '0',
    cost: '$0.000000',
    node: 'mcp-agent-gateway-BOM1'
  });

  // Redis simulated state
  const [redisKeys, setRedisKeys] = useState<string[]>([
    'chat_cache:ask_education',
    'chat_cache:list_projects',
    'chat_cache:get_skills'
  ]);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Handle Flush Cache Action
  const handleFlushCache = () => {
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] 🗑️ [RedisCache] Initiating manual cache flush...`,
      `[${new Date().toLocaleTimeString()}] 🗑️ [RedisCache] Unlinking ${redisKeys.length} active key patterns`,
      `[${new Date().toLocaleTimeString()}] 🗑️ [RedisCache] KEYS unlinked successfully: [${redisKeys.join(', ')}]`,
      `[${new Date().toLocaleTimeString()}] SUCCESS: Cache cleared. Cache hit rate reset to 0.00%.`
    ]);
    setRedisKeys([]);
  };

  // Run Simulated Endpoint Execution
  const executeSandboxRequest = () => {
    if (isRequesting) return;
    
    setIsRequesting(true);
    setLogs([]);
    setResponseJson('{}');
    setResponseHeaders({});
    
    const timestamp = () => `[${new Date().toLocaleTimeString()}]`;

    const addLog = (text: string, delay: number) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `${timestamp()} ${text}`]);
      }, delay);
    };

    // Route specific simulation
    if (selectedRoute === 'POST /api/v1/chat') {
      addLog(`⚡ [Gateway] Incoming POST /api/v1/chat`, 0);
      addLog(`🔒 [Auth] Validating JWT signature (Vercel Edge Verification)...`, 150);
      addLog(`✓ [Auth] Security Token Verified. Principal: Developer Sandbox`, 300);
      addLog(`🛡️ [RateLimiter] Rate Limiting sliding window check: Token bucket 98/100`, 450);
      
      const checkCacheDelay = 600;
      addLog(`🧠 [SemanticCache] Computing cosine matrix cache matches for: "${sandboxQuery}"`, checkCacheDelay);
      
      // Cache logic simulation
      const cacheHit = redisKeys.length > 0 && (
        sandboxQuery.toLowerCase().includes('cgpa') || 
        sandboxQuery.toLowerCase().includes('education') ||
        sandboxQuery.toLowerCase().includes('studymate')
      );

      setTimeout(() => {
        if (cacheHit) {
          addLog(`✓ [SemanticCache] Cache HIT! Cosine match score = 0.985 (Threshold 0.96)`, 750);
          addLog(`✓ [SemanticCache] Fast routing response. Skipping VectorDB & LLM call.`, 900);
          
          setTimeout(() => {
            const ragResult = searchResumeIndex(sandboxQuery);
            const totalTokens = Math.ceil(ragResult.response.length / 4);
            
            setResponseJson(JSON.stringify({
              status: "success",
              source: "cache",
              similarityScore: 0.985,
              response: ragResult.response,
              metadata: {
                cachedTimestamp: "2026-05-29T10:45:11Z",
                latency: 18,
                tokensSaved: totalTokens
              }
            }, null, 2));

            setResponseHeaders({
              'content-type': 'application/json; charset=utf-8',
              'x-powered-by': 'Vercel Edge Router (BOM1)',
              'x-semantic-cache-hit': 'TRUE',
              'x-ratelimit-remaining': '98',
              'cache-control': 'public, max-age=3600'
            });

            setTelemetry({
              cacheHit: 'TRUE',
              latency: '18ms',
              tokens: totalTokens.toString(),
              cost: '$0.000000 (Saved!)',
              node: 'mcp-agent-gateway-BOM1'
            });
            setIsRequesting(false);
          }, 1100);

        } else {
          addLog(`✗ [SemanticCache] Cache MISS. Similarity score below 0.96. Routing to database...`, 750);
          addLog(`📂 [VectorDB] Generating 1536-dim tensor embeddings for index comparison...`, 950);
          addLog(`📂 [VectorDB] Cosine database index scanning (12 resume paragraphs)...`, 1150);
          
          setTimeout(() => {
            const ragResult = searchResumeIndex(sandboxQuery);
            addLog(`✓ [VectorDB] Retrieved ${ragResult.context.length} matched paragraphs. Cosine similarity score = 0.912`, 1300);
            addLog(`🤖 [LLM] Assembling system configuration and context wrapper...`, 1450);
            addLog(`🤖 [LLM] Requesting model: claude-3-5-sonnet-20241022 (Temp: ${sandboxTemp}, Persona: ${sandboxPersona})`, 1600);
            addLog(`🤖 [LLM] Streaming response token payload...`, 1800);
            
            setTimeout(() => {
              addLog(`✓ [LLM] Synthesis finished. 200 OK generated.`, 2100);
              
              const totalTokens = Math.ceil(ragResult.response.length / 4) + 120; // adding overhead
              const costCalc = (totalTokens * 0.000003).toFixed(6);

              // Add a cache key simulated
              const mockKeyName = `chat_cache:sandbox_${sandboxQuery.toLowerCase().slice(0, 10).replace(/ /g, '_')}`;
              setRedisKeys(prev => [...prev, mockKeyName]);

              setResponseJson(JSON.stringify({
                status: "success",
                source: "llm-inference",
                similarityScore: 0.912,
                query: sandboxQuery,
                response: ragResult.response,
                contextNodes: ragResult.context.map(node => node.replace(/Context \d+: /i, '')),
                telemetry: {
                  inferenceTimeMs: 1210,
                  totalLatencyMs: 1250,
                  tokensConsumed: totalTokens,
                  calculatedCostUsd: `$${costCalc}`
                }
              }, null, 2));

              setResponseHeaders({
                'content-type': 'application/json; charset=utf-8',
                'x-powered-by': 'Vercel Edge Router (BOM1)',
                'x-semantic-cache-hit': 'FALSE',
                'x-ratelimit-remaining': '97',
                'x-inference-latency': '1210ms',
                'x-llm-tokens': totalTokens.toString()
              });

              setTelemetry({
                cacheHit: 'FALSE',
                latency: '1250ms',
                tokens: totalTokens.toString(),
                cost: `$${costCalc}`,
                node: 'mcp-agent-gateway-BOM1'
              });
              setIsRequesting(false);
            }, 2300);
          }, 1250);
        }
      }, 700);

    } else if (selectedRoute === 'POST /api/v1/embeddings/similarity') {
      addLog(`⚡ [Gateway] Incoming POST /api/v1/embeddings/similarity`, 0);
      addLog(`🔒 [Auth] Verification token confirmed.`, 150);
      addLog(`📂 [VectorDB] Generating embedding vector for query: "${sandboxQuery}"`, 300);
      addLog(`📂 [VectorDB] Scanning 1536-dimensional hyperplanes...`, 500);
      
      setTimeout(() => {
        const ragResult = searchResumeIndex(sandboxQuery);
        addLog(`✓ [VectorDB] Scan completed. Calculating dot product weights...`, 700);
        
        setTimeout(() => {
          const simulatedMatches = ragResult.context.map((ctx, idx) => {
            const score = (0.9124 - (idx * 0.05) - (Math.random() * 0.01)).toFixed(4);
            const content = ctx.replace(/Context \d+: /i, '').replace(/['"]+/g, '');
            const dimensionSamples = Array.from({ length: 6 }, () => (Math.random() * 0.2 - 0.1).toFixed(4));
            
            return {
              nodeId: `node_0${idx+1}`,
              score: parseFloat(score),
              vectorSample: `[${dimensionSamples.join(', ')}, ...]`,
              chunkExcerpt: content
            };
          });

          setResponseJson(JSON.stringify({
            status: "success",
            query: sandboxQuery,
            model: "text-embedding-3-small",
            dimensions: 1536,
            matches: simulatedMatches.slice(0, sandboxLimit)
          }, null, 2));

          setResponseHeaders({
            'content-type': 'application/json; charset=utf-8',
            'x-powered-by': 'Vercel Edge Router (BOM1)',
            'x-vector-count': simulatedMatches.length.toString()
          });

          setTelemetry({
            cacheHit: 'N/A',
            latency: '240ms',
            tokens: '8', // query tokens
            cost: '$0.000000',
            node: 'mcp-agent-gateway-BOM1'
          });
          setIsRequesting(false);
        }, 900);
      }, 600);

    } else if (selectedRoute === 'GET /api/v1/mcp/tools') {
      addLog(`⚡ [Gateway] Incoming GET /api/v1/mcp/tools`, 0);
      addLog(`🔌 [MCP Host] Querying registered tool definitions schema...`, 200);
      
      setTimeout(() => {
        addLog(`✓ [MCP Host] Retreived 2 active tool schemas. Returning JSON schema structure.`, 400);
        
        setResponseJson(JSON.stringify({
          jsonrpc: "2.0",
          result: {
            tools: [
              {
                name: "query_resume",
                description: "Retrieves specific text chunks of Kamepalli's credentials from vector nodes.",
                inputSchema: {
                  type: "object",
                  properties: {
                    field: {
                      type: "string",
                      enum: ["education", "skills", "projects", "certifications"],
                      description: "The specific resume category to inspect."
                    }
                  },
                  required: ["field"]
                }
              },
              {
                name: "calculate_performance",
                description: "Computes system performance benchmarks.",
                inputSchema: {
                  type: "object",
                  properties: {
                    metric: {
                      type: "string",
                      enum: ["latency", "reliability", "db_query"]
                    }
                  },
                  required: ["metric"]
                }
              }
            ]
          }
        }, null, 2));

        setResponseHeaders({
          'content-type': 'application/json; charset=utf-8',
          'x-powered-by': 'Vercel Edge Router (BOM1)',
          'x-mcp-protocol-version': '2024-11-05'
        });

        setTelemetry({
          cacheHit: 'FALSE',
          latency: '45ms',
          tokens: '0',
          cost: '$0.000000',
          node: 'mcp-agent-gateway-BOM1'
        });
        setIsRequesting(false);
      }, 500);

    } else if (selectedRoute === 'GET /api/v1/system/telemetry') {
      addLog(`⚡ [Gateway] Incoming GET /api/v1/system/telemetry`, 0);
      addLog(`⚙️ [System] Compiling metrics counters from Vercel logs and DB indexes...`, 150);
      
      setTimeout(() => {
        addLog(`✓ [System] Telemetry packet generated successfully.`, 300);

        setResponseJson(JSON.stringify({
          status: "healthy",
          timestamp: new Date().toISOString(),
          edgeServer: {
            provider: "Vercel Edge Network",
            nodeLocation: "BOM1 (Mumbai, India)",
            ipAddress: "192.168.1.1",
            avgLatencyMs: 32
          },
          caching: {
            semanticCacheEnabled: true,
            redisProvider: "Upstash Redis KV",
            activeKeysCount: redisKeys.length,
            redisConnected: true
          },
          agentSystems: {
            activeProtocol: "MCP Client JSON-RPC 2.0",
            registeredToolsCount: 2,
            ragEngineIndexNodes: 12
          },
          hardware: {
            cpuUsagePercent: (Math.random() * 8 + 4).toFixed(2) + '%',
            memoryUsagePercent: '34.2%'
          }
        }, null, 2));

        setResponseHeaders({
          'content-type': 'application/json; charset=utf-8',
          'x-powered-by': 'Vercel Edge Router (BOM1)',
          'x-telemetry-nodes': '4'
        });

        setTelemetry({
          cacheHit: 'FALSE',
          latency: '25ms',
          tokens: '0',
          cost: '$0.000000',
          node: 'mcp-agent-gateway-BOM1'
        });
        setIsRequesting(false);
      }, 400);
    }
  };

  const getThemeHighlight = () => {
    if (activeTheme === 'emerald') return 'text-emerald-400 border-emerald-500/30';
    if (activeTheme === 'indigo') return 'text-indigo-400 border-indigo-500/30';
    return 'text-purple-400 border-purple-500/30';
  };

  return (
    <section id="architecture-explorer" className="py-24 relative overflow-hidden bg-black/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[350px] purple-horizon opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 select-none">
          <span className={`text-[10px] uppercase font-mono px-3 py-1 rounded-full font-bold border ${getThemeHighlight()}`}>
            System Design Lab
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4 font-display text-white">
            Production AI Systems Sandbox
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Inspect backend pipelines, API boundaries, vector search behavior, rate-limit controls, and portfolio intelligence flows in one interactive lab.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10 select-none">
          <div className="bg-white/5 border border-white/10 rounded-full p-1 flex max-w-xs w-full">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? `bg-white/5 border border-white/10 text-white shadow-lg`
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Architecture
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'playground'
                  ? `bg-white/5 border border-white/10 text-white shadow-lg`
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              API Sandbox
            </button>
          </div>
        </div>

        {/* ARCHITECTURE VIEW */}
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Visual Flow Chart (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col gap-6 select-none">
              <div className="glass-card rounded-3xl p-6 bg-black/60 relative overflow-hidden min-h-[460px] flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-white mb-2 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-purple-400" />
                    Interactive System Pipelines
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans mb-8">
                    Each block represents a dedicated microservice step. Click on any segment to inspect its server configuration, dependencies, and backend logic.
                  </p>
                </div>

                {/* SVG Flow Map */}
                <div className="flex flex-col items-center gap-10 w-full relative z-10 pt-4">
                  {/* Tier 1: Client & Gateway */}
                  <div className="flex justify-around w-full gap-4">
                    {/* UI Client Node */}
                    <button
                      onClick={() => setSelectedTier('client')}
                      className={`architecture-node flex flex-col items-center p-3 rounded-2xl border text-center transition-all cursor-pointer min-w-[120px] max-w-[140px] relative ${
                        selectedTier === 'client'
                          ? 'architecture-node-active scale-[1.05]'
                          : 'architecture-node-idle'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 mb-2">
                        <Globe className="w-5 h-5 animate-pulse" />
                      </div>
                      <span className="text-[11px] font-bold font-display text-white">Client UI</span>
                      <span className="text-[9px] text-gray-500 font-mono mt-0.5">React (Vite)</span>
                    </button>

                    {/* Edge Gateway Node */}
                    <button
                      onClick={() => setSelectedTier('gateway')}
                      className={`architecture-node flex flex-col items-center p-3 rounded-2xl border text-center transition-all cursor-pointer min-w-[120px] max-w-[140px] relative ${
                        selectedTier === 'gateway'
                          ? 'architecture-node-active scale-[1.05]'
                          : 'architecture-node-idle'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 mb-2">
                        <Lock className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold font-display text-white">Edge API Router</span>
                      <span className="text-[9px] text-gray-500 font-mono mt-0.5">Vercel Edge Middleware</span>
                      {selectedTier === 'gateway' && (
                        <span className="absolute -top-1.5 -right-1.5 text-[8px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Flow Arrow down to RAG cache */}
                  <div className="flex flex-col items-center -my-6 text-gray-700">
                    <ArrowRight className="w-5 h-5 transform rotate-90 opacity-40 animate-bounce" />
                  </div>

                  {/* Tier 2: Cache & Databases */}
                  <div className="flex justify-around w-full gap-4">
                    {/* Redis Cache Node */}
                    <button
                      onClick={() => setSelectedTier('cache')}
                      className={`architecture-node flex flex-col items-center p-3 rounded-2xl border text-center transition-all cursor-pointer min-w-[120px] max-w-[140px] relative ${
                        selectedTier === 'cache'
                          ? 'architecture-node-active scale-[1.05]'
                          : 'architecture-node-idle'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-white/10 text-white mb-2">
                        <Server className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold font-display text-white">Semantic Cache</span>
                      <span className="text-[9px] text-gray-500 font-mono mt-0.5">Upstash Redis</span>
                    </button>

                    {/* Vector DB Node */}
                    <button
                      onClick={() => setSelectedTier('vectordb')}
                      className={`architecture-node flex flex-col items-center p-3 rounded-2xl border text-center transition-all cursor-pointer min-w-[120px] max-w-[140px] relative ${
                        selectedTier === 'vectordb'
                          ? 'architecture-node-active scale-[1.05]'
                          : 'architecture-node-idle'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mb-2">
                        <Database className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold font-display text-white">Local Vector DB</span>
                      <span className="text-[9px] text-gray-500 font-mono mt-0.5">Resume Match Index</span>
                    </button>
                  </div>

                  {/* Flow Arrow down to LLM */}
                  <div className="flex flex-col items-center -my-6 text-gray-700">
                    <ArrowRight className="w-5 h-5 transform rotate-90 opacity-40 animate-bounce" />
                  </div>

                  {/* Tier 3: LLM Engine */}
                  <div className="w-full flex justify-center pb-2">
                    <button
                      onClick={() => setSelectedTier('llm')}
                      className={`architecture-node flex flex-col items-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer w-[150px] relative ${
                        selectedTier === 'llm'
                          ? 'architecture-node-active scale-[1.05]'
                          : 'architecture-node-idle'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mb-2">
                        <Brain className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold font-display text-white">Claude 3.5 LLM</span>
                      <span className="text-[9px] text-gray-500 font-mono mt-0.5">Anthropic SDK Pipeline</span>
                    </button>
                  </div>
                </div>

                {/* Sub Status banner */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                    Status: Verified Secure
                  </span>
                  <span>BOM1 Server Online (v3.1.2)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Code & Specs Inspector (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Node Specifications Card */}
              <div className="glass-card rounded-3xl p-6 bg-black/60 select-none">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded font-bold border ${getThemeHighlight()}`}>
                      TIER SPECS
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-white mt-2">
                      {tierSpecs[selectedTier].title}
                    </h3>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono bg-white/5 border border-white/5 rounded px-2 py-1">
                    {tierSpecs[selectedTier].latency}
                  </span>
                </div>

                <div className="flex flex-col gap-3 font-sans text-xs text-gray-400 border-t border-white/5 pt-4">
                  <p className="leading-relaxed">
                    {tierSpecs[selectedTier].desc}
                  </p>
                  <p className="flex items-center gap-1.5 mt-1 font-mono text-[10px] text-gray-300">
                    <span className="text-purple-400">Stack:</span>
                    {tierSpecs[selectedTier].tech}
                  </p>

                  {/* Sub metrics list */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {tierSpecs[selectedTier].metrics.map((met, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1 text-center">
                        <span className="text-[8px] text-gray-500 uppercase tracking-wider font-mono">{met.name}</span>
                        <span className="text-[10px] font-bold text-white leading-tight font-mono">{met.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code Snippet Card */}
              <div className="glass-card rounded-3xl overflow-hidden bg-black/80 flex flex-col justify-between max-h-[350px]">
                <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between select-none">
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    {selectedTier === 'client' ? 'useAgentChat.ts' : 
                     selectedTier === 'gateway' ? 'middleware.ts' : 
                     selectedTier === 'cache' ? 'semanticCache.ts' : 
                     selectedTier === 'vectordb' ? 'similarity.ts' : 'synthesizer.ts'}
                  </span>
                  <span className="text-[9px] uppercase font-mono text-gray-600">TypeScript</span>
                </div>
                
                <div className="p-4 overflow-y-auto font-mono text-[10px] leading-relaxed text-gray-400 select-text max-h-[290px] terminal-scrollbar">
                  <pre className="whitespace-pre">{codeSnippets[selectedTier]}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REST API PLAYGROUND VIEW */}
        {activeTab === 'playground' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Request Parameters Panel (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6 select-none">
              <div className="glass-card rounded-3xl p-6 bg-black/60">
                <h3 className="font-display font-bold text-sm text-white mb-2 flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-purple-400" />
                  REST API Sandbox Configuration
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed font-sans mb-6">
                  Select a REST endpoint, configure custom HTTP body parameters, and execute the call to trigger simulated backend routines.
                </p>

                <div className="flex flex-col gap-4 font-mono text-xs text-gray-300">
                  {/* Route Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-gray-500 font-bold">API Route Method</label>
                    <div className="flex flex-col gap-1.5">
                      {[
                        'POST /api/v1/chat', 
                        'POST /api/v1/embeddings/similarity', 
                        'GET /api/v1/mcp/tools', 
                        'GET /api/v1/system/telemetry'
                      ].map((route) => (
                        <button
                          key={route}
                          onClick={() => {
                            setSelectedRoute(route);
                            if (route.includes('tools') || route.includes('telemetry')) {
                              setSandboxQuery('');
                            } else if (sandboxQuery === '') {
                              setSandboxQuery('what are his main GenAI skills?');
                            }
                          }}
                          className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            selectedRoute === route
                              ? `bg-white/5 border-purple-500/40 text-white font-bold`
                              : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                          }`}
                        >
                          <span className="text-[10px] font-bold">{route}</span>
                          <span className={`text-[8px] uppercase px-1.5 py-0.5 rounded font-mono font-black ${
                            route.startsWith('POST') ? 'bg-purple-500/10 text-purple-400 border border-purple-500/10' : 'bg-blue-500/10 text-blue-400 border border-blue-500/10'
                          }`}>
                            {route.startsWith('POST') ? 'POST' : 'GET'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Route Specific Input Params */}
                  {selectedRoute.includes('chat') && (
                    <>
                      <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">JSON Payload Body ("query")</label>
                        <input
                          type="text"
                          value={sandboxQuery}
                          onChange={(e) => setSandboxQuery(e.target.value)}
                          placeholder="Type query to test cache/db matches..."
                          className="bg-white/5 border border-white/5 focus:border-purple-500/30 text-white rounded-xl px-3 py-2 outline-none font-mono text-xs w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase text-gray-500 font-bold">Agent Persona</label>
                          <select
                            value={sandboxPersona}
                            onChange={(e) => setSandboxPersona(e.target.value)}
                            className="bg-white/5 border border-white/5 rounded-xl px-2 py-1.5 outline-none font-mono text-[10px] text-white cursor-pointer select-none"
                          >
                            <option value="professional" className="bg-[#0e0e11]">Professional</option>
                            <option value="auditor" className="bg-[#0e0e11]">Auditor</option>
                            <option value="creative" className="bg-[#0e0e11]">Creative</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] uppercase text-gray-500 font-bold">Temperature</label>
                          <select
                            value={sandboxTemp}
                            onChange={(e) => setSandboxTemp(parseFloat(e.target.value))}
                            className="bg-white/5 border border-white/5 rounded-xl px-2 py-1.5 outline-none font-mono text-[10px] text-white cursor-pointer select-none"
                          >
                            <option value="0.2" className="bg-[#0e0e11]">0.2 (Deterministic)</option>
                            <option value="0.7" className="bg-[#0e0e11]">0.7 (Balanced)</option>
                            <option value="1.0" className="bg-[#0e0e11]">1.0 (Creative)</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedRoute.includes('similarity') && (
                    <>
                      <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">JSON Payload Body ("query")</label>
                        <input
                          type="text"
                          value={sandboxQuery}
                          onChange={(e) => setSandboxQuery(e.target.value)}
                          placeholder="Type query to scan similarity metric..."
                          className="bg-white/5 border border-white/5 focus:border-purple-500/30 text-white rounded-xl px-3 py-2 outline-none font-mono text-xs w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase text-gray-500 font-bold">Limit Matches: {sandboxLimit}</label>
                        <input
                          type="range"
                          min="1"
                          max="3"
                          value={sandboxLimit}
                          onChange={(e) => setSandboxLimit(parseInt(e.target.value))}
                          className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                      </div>
                    </>
                  )}

                  {(selectedRoute.includes('tools') || selectedRoute.includes('telemetry')) && (
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[10px] text-gray-500 leading-normal">
                      ℹ️ This endpoint uses an HTTP GET method. No JSON request body arguments are required for retrieval.
                    </div>
                  )}

                  {/* Redis Keys viewer & Flush */}
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase text-gray-500 font-bold flex items-center gap-1">
                        <Server className="w-3.5 h-3.5 text-white" />
                        Redis Cache Store ({redisKeys.length})
                      </span>
                      {redisKeys.length > 0 && (
                        <button
                          onClick={handleFlushCache}
                          className="text-[9px] text-white/80 hover:text-white font-semibold flex items-center gap-1 cursor-pointer hover:underline"
                        >
                          <Trash2 className="w-3 h-3" /> Flush
                        </button>
                      )}
                    </div>
                    {redisKeys.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {redisKeys.map((key) => (
                          <span key={key} className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                            {key.replace('chat_cache:', '')}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[9px] text-gray-600 font-mono italic">Cache is empty. Trigger inquiries to cache results.</span>
                    )}
                  </div>

                  {/* Send Action */}
                  <button
                    onClick={executeSandboxRequest}
                    disabled={isRequesting || (selectedRoute.includes('POST') && !sandboxQuery.trim())}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold font-display cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-xs md:text-sm select-none disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none mt-2"
                  >
                    {isRequesting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Executing Endpoint Pipeline...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Execute API Call
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Simulated Log Console & Outputs (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Telemetry HUD Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 select-none">
                <div className="glass-card p-3 rounded-2xl bg-black/60 text-center flex flex-col gap-0.5">
                  <span className="text-[8px] text-gray-500 uppercase font-mono tracking-wider">Cache Hit</span>
                  <span className={`text-xs font-mono font-bold ${telemetry.cacheHit === 'TRUE' ? 'text-emerald-400' : 'text-white'}`}>
                    {telemetry.cacheHit}
                  </span>
                </div>
                <div className="glass-card p-3 rounded-2xl bg-black/60 text-center flex flex-col gap-0.5">
                  <span className="text-[8px] text-gray-500 uppercase font-mono tracking-wider">Latency</span>
                  <span className="text-xs font-mono font-bold text-white">{telemetry.latency}</span>
                </div>
                <div className="glass-card p-3 rounded-2xl bg-black/60 text-center flex flex-col gap-0.5">
                  <span className="text-[8px] text-gray-500 uppercase font-mono tracking-wider">Estimated Cost</span>
                  <span className="text-xs font-mono font-bold text-emerald-500">{telemetry.cost}</span>
                </div>
                <div className="glass-card p-3 rounded-2xl bg-black/60 text-center flex flex-col gap-0.5">
                  <span className="text-[8px] text-gray-500 uppercase font-mono tracking-wider">Tokens</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{telemetry.tokens}</span>
                </div>
              </div>

              {/* Console stdout screen */}
              <div className="glass-card rounded-3xl overflow-hidden bg-black/80 flex flex-col justify-between h-[250px] border border-white/5 relative">
                <div className="bg-white/5 px-4 py-2.5 border-b border-white/5 flex items-center justify-between select-none">
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    stdout_logs.log
                  </span>
                  <span className="text-[8px] font-bold font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Live Stream
                  </span>
                </div>

                <div className="p-4 overflow-y-auto font-mono text-[9px] sm:text-[10px] text-gray-400 flex flex-col gap-1.5 terminal-scrollbar flex-1">
                  {logs.length > 0 ? (
                    logs.map((log, idx) => (
                      <div key={idx} className="leading-relaxed whitespace-pre-wrap select-text">
                        {log.includes('✓') || log.includes('SUCCESS') ? (
                          <span className="text-emerald-400">{log}</span>
                        ) : log.includes('✗') || log.includes('🗑️') ? (
                          <span className="text-white">{log}</span>
                        ) : log.includes('⚡') ? (
                          <span className="text-purple-400 font-semibold">{log}</span>
                        ) : log.includes('🤖') || log.includes('🧠') ? (
                          <span className="text-amber-500">{log}</span>
                        ) : (
                          <span>{log}</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-600 italic select-none">
                      <Zap className="w-6 h-6 text-gray-700 animate-bounce mb-2" />
                      Await pipeline trigger. Click "Execute API Call" above.
                    </div>
                  )}
                  <div ref={consoleEndRef} />
                </div>
              </div>

              {/* REST Response Tabs */}
              <div className="glass-card rounded-3xl overflow-hidden bg-black/90 border border-white/5">
                <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between select-none">
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5">
                    <FileJson className="w-3.5 h-3.5 text-purple-400" />
                    Response Body & HTTP Headers
                  </span>
                  <span className="text-[9px] text-gray-500 font-mono">Status: 200 OK</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 max-h-[300px] overflow-hidden">
                  {/* Left Response Panel JSON (8 Cols) */}
                  <div className="md:col-span-8 p-4 overflow-y-auto border-b md:border-b-0 md:border-r border-white/5 font-mono text-[9px] text-gray-400 max-h-[300px] terminal-scrollbar select-text">
                    <pre className="whitespace-pre">{responseJson}</pre>
                  </div>
                  
                  {/* Right Response Headers Panel (4 Cols) */}
                  <div className="md:col-span-4 p-4 overflow-y-auto font-mono text-[9px] max-h-[300px] terminal-scrollbar select-text">
                    <div className="text-[8px] uppercase tracking-wider text-gray-500 font-bold mb-3 select-none">
                      HTTP Headers
                    </div>
                    {Object.keys(responseHeaders).length > 0 ? (
                      <div className="flex flex-col gap-2.5">
                        {Object.entries(responseHeaders).map(([key, val]) => (
                          <div key={key} className="flex flex-col gap-0.5">
                            <span className="text-purple-400 font-bold text-[8px]">{key}:</span>
                            <span className="text-gray-300 break-all leading-normal">{val}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-600 italic select-none">No active headers.</span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
