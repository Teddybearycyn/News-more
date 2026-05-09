import { motion, AnimatePresence } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, ArrowRight, X, Calendar, User, Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import SEO from "../components/SEO.tsx";
import { getBlogs } from "../services/blogService.ts";
import { BlogPost } from "../data/blogs.ts";

const categories = ["All", "News", "Politics", "Crypto", "Freelancing", "Web3", "Sports"];

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getBlogs().then(data => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(blogs.map(p => p.author)));
    return ["All", ...uniqueAuthors];
  }, [blogs]);

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = selectedAuthor === "All" || post.author === selectedAuthor;
    
    const postDate = new Date(post.date);
    const matchesStartDate = !startDate || postDate >= new Date(startDate);
    const matchesEndDate = !endDate || postDate <= new Date(endDate);

    return matchesCategory && matchesSearch && matchesAuthor && matchesStartDate && matchesEndDate;
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSelectedAuthor("All");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <SEO 
        title="Expert Articles & Insights" 
        description="Explore our library of expert-led articles on freelancing, IT, support operations, technical engineering, and geopolitical analysis." 
        canonical="/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "The Journal | News More Expert",
          "description": "Explore our library of expert-led articles on freelancing, IT, support operations and technical engineering.",
          "url": "https://newsmore.expert/blog"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <header className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-7xl font-display font-medium">
              The Journal<span className="text-orange-500">.</span>
            </h1>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${
                showFilters ? "bg-orange-500 border-orange-500 text-white" : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
              }`}
            >
              <Filter size={14} /> {showFilters ? "Hide Filters" : "Advanced Filters"}
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    selectedCategory === cat 
                      ? "bg-orange-600 text-white" 
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white/5 border border-white/10 rounded-[32px] mb-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 flex items-center gap-2">
                      <User size={12} /> Filter by Author
                    </label>
                    <select 
                      value={selectedAuthor}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                    >
                      {authors.map(author => (
                        <option key={author} value={author} className="bg-[#0A0A0A]">{author}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 flex items-center gap-2">
                      <Calendar size={12} /> From Date
                    </label>
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/30 flex items-center gap-2">
                      <Calendar size={12} /> To Date
                    </label>
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end">
                    <button 
                      onClick={clearFilters}
                      className="flex items-center gap-2 text-white/30 hover:text-orange-500 transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                      <X size={14} /> Clear all filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {loading ? (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-white/40">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="font-mono text-xs uppercase tracking-widest">Loading latest insights...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden rounded-3xl mb-6 bg-white/5 border border-white/10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/1200x630/111827/f97316?text=Expert+Insights";
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
                    {post.category}
                  </div>
                </Link>
                <div className="text-[10px] font-mono text-orange-500/80 uppercase tracking-[0.2em] mb-4">
                  {post.author} • {post.date}
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-2xl md:text-3xl font-medium mb-4 group-hover:text-orange-500 transition-all leading-snug">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-white/40 mb-8 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 group/btn font-bold text-xs uppercase tracking-tighter pb-1 border-b-2 border-orange-500/0 hover:border-orange-500 transition-all"
                >
                  Read Story <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center">
              <h3 className="text-2xl text-white/20">No articles found matching your criteria.</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
