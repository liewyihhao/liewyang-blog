import { useRef } from "react";
import { Link } from "wouter";
import { Heart, MessageCircle, Camera, BookOpen, Star, ArrowRight, Sparkles } from "lucide-react";
import { useGetProfile, useGetRecentActivity, useGetStats, useLikeMemory, getListMemoriesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

function FloatingDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="float absolute top-12 left-8 text-4xl opacity-70">☁️</div>
      <div className="float-slow absolute top-20 right-16 text-5xl opacity-60" style={{ animationDelay: "1s" }}>☁️</div>
      <div className="float absolute top-40 left-1/4 text-3xl opacity-50" style={{ animationDelay: "2s" }}>⭐</div>
      <div className="drift absolute top-16 right-1/3 text-2xl opacity-60" style={{ animationDelay: "0.5s" }}>🌟</div>
      <div className="float absolute bottom-20 left-12 text-3xl opacity-50" style={{ animationDelay: "1.5s" }}>🌸</div>
      <div className="float-slow absolute bottom-32 right-10 text-4xl opacity-60" style={{ animationDelay: "3s" }}>🦋</div>
      <div className="drift absolute top-1/2 left-4 text-3xl opacity-40" style={{ animationDelay: "2.5s" }}>🌿</div>
      <div className="float absolute top-1/3 right-8 text-2xl opacity-50" style={{ animationDelay: "0.8s" }}>✨</div>
      <div className="float-slow absolute bottom-16 left-1/3 text-2xl opacity-40" style={{ animationDelay: "1.2s" }}>🐝</div>
    </div>
  );
}

export default function Home() {
  const memoriesRef = useRef<HTMLDivElement>(null);
  const profile = useGetProfile();
  const recent = useGetRecentActivity();
  const stats = useGetStats();
  const queryClient = useQueryClient();
  const likeMutation = useLikeMemory();

  const childName = profile.data?.childName ?? "Liew Yang";
  const tagline = profile.data?.tagline ?? "The journey of our little star";
  const photoUrl = profile.data?.photoUrl;

  const handleLike = (id: number) => {
    likeMutation.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListMemoriesQueryKey() });
      }
    });
  };

  const scrollToMemories = () => {
    memoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #e0f4ff 0%, #e8f8e8 40%, #fff8e8 100%)" }}>
        <FloatingDecoration />

        {/* Road decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-300/30 rounded-t-full"></div>
          <div className="absolute bottom-3 left-0 right-0 h-1 border-t-2 border-dashed border-white/50"></div>
          <div className="float absolute bottom-4 left-8 text-3xl" style={{ animationDelay: "0.3s" }}>🚗</div>
          <div className="float absolute bottom-4 right-20 text-2xl" style={{ animationDelay: "1.5s" }}>🚙</div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 py-16">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-primary mb-6 shadow-sm">
              <Sparkles size={14} />
              Welcome to my world
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              Hi, I'm{" "}
              <span className="text-primary">{childName}!</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
              {tagline}. Every moment captured, every memory treasured. 💛
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/diary">
                <button
                  data-testid="btn-explore-diary"
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-base shadow-md hover:opacity-90 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <BookOpen size={18} />
                  Explore My Diary
                </button>
              </Link>
              <button
                data-testid="btn-see-adventures"
                onClick={scrollToMemories}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-foreground px-6 py-3 rounded-2xl font-bold text-base shadow-sm hover:bg-white transition-all border border-border"
              >
                <Camera size={18} />
                See My Adventures
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-8 border-white shadow-xl">
                {photoUrl ? (
                  <img src={photoUrl} alt={childName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-8xl">👶</span>
                  </div>
                )}
              </div>
              <div className="float absolute -top-3 -right-3 bg-accent rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md">⭐</div>
              <div className="float-slow absolute -bottom-3 -left-3 bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md" style={{ animationDelay: "1s" }}>💛</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      {stats.data && (
        <section className="py-8 bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: "Memories", value: stats.data.totalMemories, emoji: "📸" },
                { label: "Diary Pages", value: stats.data.totalDiaryEntries, emoji: "📖" },
                { label: "Milestones", value: stats.data.totalMilestones, emoji: "🏆" },
                { label: "Total Likes", value: stats.data.totalLikes, emoji: "❤️" },
              ].map(({ label, value, emoji }) => (
                <div key={label} className="bg-muted rounded-2xl p-4">
                  <div className="text-2xl mb-1">{emoji}</div>
                  <div className="text-2xl font-bold text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Moments */}
      <section ref={memoriesRef} className="py-16 max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="text-accent fill-accent" size={20} />
              <h2 className="text-2xl font-bold">Latest Moments</h2>
            </div>
            <p className="text-muted-foreground text-sm">A glimpse of my recent adventures</p>
          </div>
          <Link href="/memories">
            <button className="flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline">
              View All <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {recent.isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : recent.data?.recentMemories && recent.data.recentMemories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {recent.data.recentMemories.map((memory) => (
              <div
                key={memory.id}
                data-testid={`memory-card-${memory.id}`}
                className="memory-card relative rounded-2xl overflow-hidden bg-white shadow-sm border border-border group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={memory.mediaUrl}
                    alt={memory.caption ?? "Memory"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {memory.type === "video" && (
                  <div className="absolute top-2 right-2 bg-black/60 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-white text-xs">▶</span>
                  </div>
                )}
                <div className="p-3">
                  {memory.caption && (
                    <p className="text-xs text-foreground font-medium line-clamp-2 mb-2">{memory.caption}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <button
                      data-testid={`like-btn-${memory.id}`}
                      onClick={() => handleLike(memory.id)}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                      <Heart size={12} className="fill-red-400 text-red-400" />
                      <span>{memory.likes}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      <span>{memory.commentCount}</span>
                    </div>
                    <span>{formatDistanceToNow(new Date(memory.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <span className="text-5xl mb-4 block">📸</span>
            <p className="font-semibold">No memories yet!</p>
            <Link href="/admin">
              <button className="mt-3 text-primary text-sm hover:underline">Add the first memory</button>
            </Link>
          </div>
        )}
      </section>

      {/* Diary Preview */}
      {recent.data?.recentDiaryEntries && recent.data.recentDiaryEntries.length > 0 && (
        <section className="py-16 bg-amber-50/60">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">📖</span>
                  <h2 className="text-2xl font-bold">My Diary</h2>
                </div>
                <p className="text-muted-foreground text-sm">Messages from my parents, memories for my future</p>
              </div>
              <Link href="/diary">
                <button className="flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline">
                  View All <ArrowRight size={14} />
                </button>
              </Link>
            </div>

            {/* Book UI */}
            <div className="bg-white rounded-3xl shadow-lg border border-amber-200/60 overflow-hidden">
              <div className="grid md:grid-cols-2 min-h-[280px]">
                <div className="book-page p-8 border-r border-amber-100">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span>📅</span>
                    <span className="font-medium">{recent.data.recentDiaryEntries[0].date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{recent.data.recentDiaryEntries[0].title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/80 paper-texture p-4 rounded-xl">
                    {recent.data.recentDiaryEntries[0].message.slice(0, 250)}
                    {recent.data.recentDiaryEntries[0].message.length > 250 ? "..." : ""}
                  </p>
                </div>
                <div className="book-page p-8 flex items-center justify-center">
                  {recent.data.recentDiaryEntries[0].images.length > 0 ? (
                    <img
                      src={recent.data.recentDiaryEntries[0].images[0]}
                      alt="Diary"
                      className="rounded-2xl object-cover w-full max-h-48 shadow-md"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <span className="text-6xl block mb-2">🐻</span>
                      <span className="text-sm">Every moment is a story</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-8 py-4 bg-amber-50/80 border-t border-amber-100 flex justify-center">
                <Link href="/diary">
                  <button className="flex items-center gap-2 text-amber-700 font-semibold text-sm hover:underline">
                    <BookOpen size={15} />
                    View All Diary Entries
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center bg-white border-t border-border">
        <div className="text-4xl mb-3">💙</div>
        <p className="text-lg font-bold text-foreground">Every moment is a memory</p>
        <p className="text-sm text-muted-foreground mt-1">
          A special place for our little boy to look back and see how loved he is, today and always.
        </p>
        <p className="text-xs text-muted-foreground mt-4">© 2024 {childName}'s Adventure Diary. Made with ❤️</p>
      </footer>
    </div>
  );
}
