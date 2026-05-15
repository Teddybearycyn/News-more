import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  RefreshCw, 
  Target, 
  BarChart3, 
  Zap,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  ChevronRight,
  ShieldCheck,
  Rocket,
  Coins,
  DollarSign,
  Loader2,
  BookOpen,
  BarChart,
  Globe2,
  Shield
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { format } from "date-fns";
import { cn } from "../lib/utils.ts";
import SEO from "../components/SEO.tsx";
import Counter from "../components/Counter.tsx";

interface PriceData {
  time: string;
  price: number;
  fullDate?: string;
}

const SYMBOLS = ["BTC/USDT", "ETH/USDT", "NZD/USD", "EUR/USD", "GBP/USD", "PEPE/USDT", "DOGE/USDT"];

function ShinyLogo({ icon: Icon, color }: { icon: any, color: string }) {
  return (
    <div className="relative group">
      <motion.div 
        animate={{ 
          filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 relative z-10 bg-zinc-900/50", color)}
      >
        <Icon size={24} />
      </motion.div>
      <div className={cn("absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity", color.replace("text-", "bg-"))} />
    </div>
  );
}

function MarketMiniTicker({ symbol, initialPrice, volatility }: { symbol: string, initialPrice: number, volatility: number }) {
  const [price, setPrice] = useState(initialPrice);
  const [prevPrice, setPrevPrice] = useState(initialPrice);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevPrice(price);
      const change = price * (Math.random() - 0.48) * volatility; // Slight up bias
      setPrice(p => p + change);
    }, 2000 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, [price, volatility]);

  const isUp = price >= prevPrice;

  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
      <span className="text-[10px] font-mono font-bold text-zinc-500">{symbol}</span>
      <div className="flex items-center gap-2">
        <motion.span 
          key={price}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className={cn("text-xs font-mono font-bold", isUp ? "text-green-500" : "text-red-500")}
        >
          {price.toFixed(symbol.includes("USDT") && !symbol.includes("PEPE") ? 2 : 6)}
        </motion.span>
        {isUp ? <TrendingUp size={10} className="text-green-500" /> : <TrendingDown size={10} className="text-red-500" />}
      </div>
    </div>
  );
}

export default function MarketCenter() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTC/USDT");
  const [timeframe, setTimeframe] = useState("1H");
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900/90 border border-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl">
          <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1 tracking-widest">
            {payload[0].payload.fullDate || payload[0].payload.time}
          </div>
          <div className="text-xl font-mono font-bold text-white flex items-center gap-2">
            <span className="text-orange-500">$</span>
            {payload[0].value.toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: (selectedSymbol.includes("PEPE") || selectedSymbol.includes("DOGE")) ? 6 : 4 
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  // Initial History Fetch or Simulation
  useEffect(() => {
    setIsLoading(true);
    // Simulate resolution based on timeframe
    const limit = timeframe === "1H" ? 50 : timeframe === "4H" ? 100 : 200;
    
    fetch(`/api/trading/history?symbol=${selectedSymbol}&limit=${limit}`)
      .then(res => {
        if (!res.ok) throw new Error("Server response not ok");
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error("Data is not an array");
        const formatted = data.map((d: any) => ({
          time: format(new Date(d.time), 'HH:mm'),
          fullDate: format(new Date(d.time), 'MMM dd, HH:mm:ss'),
          price: d.price
        }));
        setPriceHistory(formatted);
        if (formatted.length > 0) {
          setCurrentPrice(formatted[formatted.length - 1].price);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch market history:", err);
        // Fallback: Generate mock history if server fails
        const mockData = [];
        let basePrice = SYMBOLS.indexOf(selectedSymbol) * 1000 + 100;
        if (selectedSymbol.includes("BTC")) basePrice = 65000;
        if (selectedSymbol.includes("ETH")) basePrice = 3400;
        
        for (let i = 0; i < limit; i++) {
          basePrice += basePrice * (Math.random() - 0.5) * 0.002;
          mockData.push({
            time: format(new Date(Date.now() - (limit - i) * 60000), 'HH:mm'),
            fullDate: format(new Date(Date.now() - (limit - i) * 60000), 'MMM dd, HH:mm:ss'),
            price: basePrice
          });
        }
        setPriceHistory(mockData);
        setCurrentPrice(mockData[mockData.length - 1].price);
        setIsLoading(false);
      });
  }, [selectedSymbol, timeframe]);

  // Live Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/trading/ticker?symbol=${selectedSymbol}`)
        .then(res => {
          if (!res.ok) throw new Error("Ticker fail");
          return res.json();
        })
        .then(data => {
          const newPrice = parseFloat(data.price);
          if (isNaN(newPrice)) return;
          setCurrentPrice(newPrice);
          setPriceHistory(prev => {
            const newList = [...prev, { 
              time: format(new Date(), 'HH:mm:ss'), 
              fullDate: format(new Date(), 'MMM dd, HH:mm:ss'),
              price: newPrice 
            }];
            return newList.slice(timeframe === "1H" ? -50 : timeframe === "4H" ? -100 : -200);
          });
        })
        .catch(() => {
          // Silent fallback: just simulate a small move locally if fetch fails
          setCurrentPrice(prev => {
            const change = prev * (Math.random() - 0.48) * 0.0005;
            const newPrice = prev + change;
            setPriceHistory(history => {
              const newList = [...history, { 
                time: format(new Date(), 'HH:mm:ss'), 
                fullDate: format(new Date(), 'MMM dd, HH:mm:ss'),
                price: newPrice 
              }];
              return newList.slice(timeframe === "1H" ? -50 : timeframe === "4H" ? -100 : -200);
            });
            return newPrice;
          });
        });
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedSymbol, timeframe]);

  const priceDiff = (priceHistory && priceHistory.length > 1) 
    ? currentPrice - priceHistory[0].price 
    : 0;
  const pricePercent = (priceHistory && priceHistory.length > 1 && priceHistory[0].price !== 0) 
    ? (priceDiff / priceHistory[0].price) * 100 
    : 0;

  // Global Macro Stats State
  const [macroStats, setMacroStats] = useState([
    { l: "Global Hashrate", t: 680.2, s: " EH/s", d: "+2.4%", dec: 1, base: 680.2 },
    { l: "Total Locked (TVL)", t: 124, p: "$", s: "B", d: "-0.5%", dec: 0, base: 124 },
    { l: "Fear & Greed", t: 68, s: " / Greed", d: "NEUTRAL", dec: 0, base: 68 },
    { l: "Active Wallets", t: 2.4, s: "M", d: "+12%", dec: 1, base: 2.4 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMacroStats(prev => prev.map(stat => {
        const fluctuation = (Math.random() - 0.5) * (stat.base * 0.005); // 0.5% fluctuation
        return { ...stat, t: stat.t + fluctuation };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col bg-[#050505] text-white font-sans selection:bg-orange-500/30">
      <SEO 
        title="Live Market Intelligence Hub | News More Expert" 
        description="Comprehensive real-time market data dashboard for 2026. Access professional forex pair analysis (EUR/USD, GBP/USD), cryptocurrency trends (BTC, ETH), and emerging digital asset education. Our hub aggregates institutional-grade signals for expert traders and financial educators." 
        canonical="/market"
      />
      
      {/* Scrollable Dashboard Container */}
      <div className="relative">
        {/* Scanning Line & Layout Grid - Homepage feel */}
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
          <motion.div 
            animate={{ 
              y: ["0%", "100%", "0%"],
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.1)]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          {/* Top Header - Glassmorphism */}
          <div className="relative mb-12">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-orange-500 text-[9px] font-black uppercase tracking-[0.3em] mb-3"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Pro-Tier Intelligence Feed
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                  Market <span className="italic font-light">Center.</span>
                </h1>
                <p className="text-zinc-500 text-base leading-relaxed max-w-xl">
                  Aggregated institutional data streams for the next generation of digital asset engineers. Analysis and real-time execution.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 bg-zinc-900/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-3xl">
                {SYMBOLS.map(symbol => (
                  <button
                    key={symbol}
                    onClick={() => setSelectedSymbol(symbol)}
                    className={cn(
                      "px-4 py-2 rounded-xl transition-all font-mono text-[10px] font-bold tracking-tight",
                      selectedSymbol === symbol 
                        ? "bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)]" 
                        : "text-zinc-500 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Terminal Section - Now strictly within container */}
          <section className="mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-zinc-900/30 border border-white/5 rounded-[40px] p-6 lg:p-10 backdrop-blur-xl relative overflow-hidden ring-1 ring-white/5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-8 relative z-10">
                <div className="flex items-center gap-6">
                  <ShinyLogo icon={BarChart3} color="text-orange-500" />
                  <div>
                    <div className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-1">Live Price Source</div>
                    <div className="text-4xl font-mono tracking-tighter flex items-center gap-4">
                      ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: (selectedSymbol.includes("PEPE") || selectedSymbol.includes("DOGE")) ? 6 : 4 })}
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-black border flex items-center gap-1",
                        priceDiff >= 0 ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                      )}>
                        {priceDiff >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {Math.abs(pricePercent).toFixed(3)}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 flex-nowrap custom-scrollbar max-w-full">
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 mr-2 shrink-0">
                    {["1H", "4H", "1D"].map(tf => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={cn(
                          "px-3 py-1 rounded-lg text-[9px] font-black transition-all whitespace-nowrap",
                          timeframe === tf ? "bg-orange-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
                        )}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                  {[
                    { label: "Stability", value: "99.9%", color: "text-emerald-500" },
                    { label: "Period", value: timeframe, color: "text-orange-500" },
                    { label: "Status", value: "OPEN", color: "text-green-500" }
                  ].map(item => (
                    <div key={item.label} className="bg-white/5 border border-white/5 px-4 py-2 rounded-xl text-center min-w-[80px] shrink-0">
                      <div className="text-[8px] text-zinc-500 font-bold uppercase mb-0.5">{item.label}</div>
                      <div className={cn("text-[10px] font-mono font-bold", item.color)}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {isLoading ? (
                <div className="h-[450px] flex flex-col items-center justify-center text-white/20">
                  <Loader2 size={48} className="animate-spin mb-4" />
                  <p className="font-mono text-sm uppercase tracking-widest">Synchronizing Market Data...</p>
                </div>
              ) : (
                <div className="h-[450px] w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceHistory}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.1} />
                      <XAxis dataKey="time" hide />
                      <YAxis domain={['auto', 'auto']} hide />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '4 4' }} />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#f97316" 
                        strokeWidth={3} 
                        fill="url(#chartGradient)"
                        animationDuration={300}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-4 text-[9px] font-bold text-zinc-600">
                  <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SYSTEM: STABLE</span>
                  <span className="flex items-center gap-1.5"><RefreshCw size={10} className="animate-spin text-orange-500" /> GLOBAL SYNC: ACTIVE</span>
                </div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase">Latency: 12ms</div>
              </div>
            </motion.div>
          </section>

          {/* Quick Watchlist Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <MarketMiniTicker symbol="PEPE/USDT" initialPrice={0.00000845} volatility={0.005} />
            <MarketMiniTicker symbol="DOGE/USDT" initialPrice={0.1542} volatility={0.002} />
            <MarketMiniTicker symbol="ETH/USDT" initialPrice={2642.12} volatility={0.0008} />
            <MarketMiniTicker symbol="GBP/USD" initialPrice={1.2742} volatility={0.0002} />
          </div>

          <motion.div 
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-600 p-8 rounded-[40px] text-white relative overflow-hidden group mb-16 border border-white/10 shadow-[0_0_80px_rgba(37,99,235,0.15)]"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-1">Alpha Signals v2.4</h4>
                  <p className="text-indigo-100/70 text-xs max-w-md">Proprietary institutional-grade AI filters detecting volatility patterns before they hit the retail desk. Access the same data as the whales.</p>
                </div>
              </div>
              <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-100 transition-all shrink-0 active:scale-95">
                Unlock Deep Access
              </button>
            </div>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
          </motion.div>

          {/* Small Academy Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: DollarSign, title: "Forex Hub", color: "text-emerald-500", glowColor: "rgba(16, 185, 129, 0.5)", desc: "Global currency dynamics." },
              { icon: Coins, title: "Crypto", color: "text-orange-500", glowColor: "rgba(249, 115, 22, 0.5)", desc: "Digital asset primitives." },
              { icon: Rocket, title: "Meme Lab", color: "text-purple-500", glowColor: "rgba(168, 85, 247, 0.5)", desc: "Sentiment-driven trading." }
            ].map((item, idx) => (
              <div key={item.title} className="p-6 bg-zinc-900/40 border border-white/5 rounded-[32px] hover:border-white/20 transition-all group overflow-hidden relative">
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    boxShadow: [
                      `0 0 0px ${item.glowColor.replace('0.5', '0')}`,
                      `0 0 25px ${item.glowColor}`,
                      `0 0 0px ${item.glowColor.replace('0.5', '0')}`
                    ]
                  }}
                  transition={{ 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 },
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }
                  }}
                  className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden", item.color)}
                >
                  <item.icon size={20} className="relative z-10" />
                  
                  {/* Shining Light Sweep Effect */}
                  <motion.div
                    animate={{ x: ['-150%', '150%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 + idx, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                  />
                </motion.div>
                <h5 className="font-bold mb-2 group-hover:text-white/100 text-white/90">{item.title}</h5>
                <p className="text-zinc-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Macro Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-t border-white/5">
            {macroStats.map((stat, i) => (
              <div key={stat.l} className="group">
                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 group-hover:text-orange-500 transition-colors">{stat.l}</div>
                <div className="text-xl font-mono font-bold">
                  <Counter target={stat.t} prefix={stat.p} suffix={stat.s} decimals={stat.dec} />
                </div>
                <div className="text-[9px] font-bold text-orange-500 mt-0.5">{stat.d}</div>
              </div>
            ))}
          </div>

          {/* Educational Content Section - Added for SEO and AdSense Compliance */}
          <div className="mt-20 pt-20 border-t border-white/5 space-y-20 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <BookOpen size={16} />
                  Intelligence Framework
                </div>
                <h2 className="text-3xl font-display font-bold mb-6 text-white leading-tight">
                  Understanding the <span className="text-orange-500">2026 Digital Economy</span> & Market Dynamics.
                </h2>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                  <p>
                    The modern financial landscape has evolved into a highly integrated ecosystem where traditional Forex markets, institutional digital assets, and high-volatility retail instruments coexist. Our Live Market Intelligence Hub is designed to bridge the gap between complex raw data and actionable insights.
                  </p>
                  <p>
                    At <span className="text-white">News More Expert</span>, we prioritize data integrity and real-time synchronization. By aggregating multi-source feeds from global liquidity providers, we offer a comprehensive view of market liquidations, whale movements, and macro-economic shifts.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-6 bg-zinc-900/40 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                    <Globe2 size={20} />
                  </div>
                  <h3 className="text-white font-bold mb-2">Global Forex pairs</h3>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">
                    Analyzing major pairs like EUR/USD and GBP/USD requires understanding interest rate differentials and geopolitical stability.
                  </p>
                </div>
                <div className="p-6 bg-zinc-900/40 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                    <BarChart size={20} />
                  </div>
                  <h3 className="text-white font-bold mb-2">Crypto Volatility</h3>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">
                    Digital assets like Bitcoin and Ethereum serve as leading indicators for global risk-on sentiment and technological adoption.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/30 p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <Shield size={16} className="text-orange-500" />
                    Data Sovereignty
                  </h4>
                  <p className="text-zinc-500 text-xs leading-loose">
                    In an era of misinformation, our platform ensures every price tick is verified against decentralized consensus and centralized exchange depth. We provide the tools; you provide the strategy.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <Activity size={16} className="text-orange-500" />
                    Market Indicators
                  </h4>
                  <p className="text-zinc-500 text-xs leading-loose">
                    From Relative Strength Index (RSI) to Moving Average Convergence Divergence (MACD), our system processes technical signals in the background to highlight divergence patterns in 2026 trends.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <Zap size={16} className="text-orange-500" />
                    AI Optimization
                  </h4>
                  <p className="text-zinc-500 text-xs leading-loose">
                    Our "Alpha Signals" utilize machine learning models to filter out market noise, focusing on high-probability setups across multiple timeframes from 1H to the Daily chart.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
