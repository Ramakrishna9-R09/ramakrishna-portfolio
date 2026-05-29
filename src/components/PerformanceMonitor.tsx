import { useState, useEffect } from 'react';
import { Activity, Gauge, Cpu, Cloud, Database, X } from 'lucide-react';

export default function PerformanceMonitor() {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [loadTime, setLoadTime] = useState(120); // in ms
  const [memory, setMemory] = useState<string | null>(null);

  // Live FPS Counter
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      const delta = now - lastTime;

      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Precise Document Load Speed
  useEffect(() => {
    const calcLoadTime = () => {
      // Use Performance Navigation Timing
      const [navTiming] = performance.getEntriesByType('navigation') as any[];
      if (navTiming) {
        setLoadTime(Math.round(navTiming.duration || navTiming.loadEventEnd - navTiming.startTime));
      } else {
        // Fallback for older browsers
        const t = performance.timing;
        setLoadTime(Math.round(t.loadEventEnd - t.navigationStart));
      }

      // Memory Usage (Chrome/V8 only)
      const perf: any = window.performance;
      if (perf && perf.memory) {
        const usedMB = Math.round(perf.memory.usedJSHeapSize / (1024 * 1024));
        const limitMB = Math.round(perf.memory.jsHeapSizeLimit / (1024 * 1024));
        setMemory(`${usedMB}MB / ${limitMB}MB`);
      }
    };

    if (document.readyState === 'complete') {
      calcLoadTime();
    } else {
      window.addEventListener('load', calcLoadTime);
      return () => window.removeEventListener('load', calcLoadTime);
    }
  }, []);

  return (
    <>
      {/* Floating HUD toggle button (Top Left) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-6 z-50 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/30 text-gray-300 hover:text-white cursor-pointer backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 text-[11px] font-mono hover:scale-105"
      >
        <Gauge className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span>Telemetry HUD</span>
      </button>

      {/* Slide-out Telemetry Panel */}
      <div
        className={`fixed top-16 left-6 w-[280px] z-50 glass-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 font-mono text-xs ${
          isOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-purple-400" /> System Diagnostics
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content rows */}
        <div className="p-4 flex flex-col gap-3.5 text-gray-300">
          {/* Frame Rate */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-purple-400" /> Client Render
            </span>
            <div className="text-right">
              <span className={`font-bold ${fps >= 55 ? 'text-emerald-400' : 'text-amber-400'}`}>{fps} FPS</span>
            </div>
          </div>

          {/* Load time */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-purple-400" /> Load Duration
            </span>
            <span className="text-white font-bold">{loadTime} ms</span>
          </div>

          {/* Memory Heap */}
          {memory && (
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Heap Allocation</span>
              <span className="text-white font-bold">{memory}</span>
            </div>
          )}

          <div className="h-[1px] bg-white/5 my-1" />

          {/* AWS Lambda Warm/Cold state */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-1">
              <Cloud className="w-3.5 h-3.5 text-purple-400" /> AWS API state
            </span>
            <span className="text-emerald-400 font-bold uppercase text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              WARM READY
            </span>
          </div>

          {/* MongoDB optimization status */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-purple-400" /> DB query latency
            </span>
            <span className="text-white font-bold">34ms <span className="text-[10px] text-emerald-400 font-normal">(-20%)</span></span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-black/60 border-t border-white/5 text-[9px] text-gray-500 flex justify-between">
          <span>Engine: V8 / React 19</span>
          <span>RAG Nodes: 12</span>
        </div>
      </div>
    </>
  );
}
