import { useRef } from "react";
import { Link } from "wouter";
import { Heart, MessageCircle, Camera, BookOpen, Star, ArrowRight, Sparkles } from "lucide-react";
import { useGetProfile, useGetRecentActivity, useLikeMemory, getListMemoriesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

/* ─── Cute inline SVG animals & cars ─── */

function CuteCar({ color, x, delay, size = 80 }: { color: string; x: string; delay: string; size?: number }) {
  return (
    <div
      className="drift absolute"
      style={{ left: x, bottom: "28px", animationDelay: delay, zIndex: 5 }}
    >
      <svg width={size} height={size * 0.55} viewBox="0 0 120 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <rect x="4" y="26" width="112" height="32" rx="10" fill={color} />
        {/* Roof */}
        <rect x="24" y="10" width="68" height="22" rx="10" fill={color} />
        {/* Windows */}
        <rect x="28" y="14" width="25" height="14" rx="5" fill="#D6EFFF" opacity="0.85" />
        <rect x="59" y="14" width="25" height="14" rx="5" fill="#D6EFFF" opacity="0.85" />
        {/* Wheels */}
        <circle cx="30" cy="58" r="10" fill="#444" />
        <circle cx="30" cy="58" r="5" fill="#bbb" />
        <circle cx="90" cy="58" r="10" fill="#444" />
        <circle cx="90" cy="58" r="5" fill="#bbb" />
        {/* Headlight */}
        <ellipse cx="110" cy="36" rx="6" ry="4" fill="#FFF9A0" opacity="0.9" />
        {/* Smile */}
        <path d="M 95 38 Q 103 44 111 38" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        {/* Eyes on car hood */}
        <circle cx="100" cy="32" r="3" fill="white" opacity="0.8" />
        <circle cx="101" cy="31" r="1.5" fill="#333" opacity="0.8" />
      </svg>
    </div>
  );
}

function CuteBear({ style }: { style: React.CSSProperties }) {
  return (
    <div className="float-slow absolute" style={style}>
      <svg width="56" height="64" viewBox="0 0 56 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="32" r="20" fill="#F5C18A" />
        <circle cx="12" cy="16" r="9" fill="#F5C18A" />
        <circle cx="44" cy="16" r="9" fill="#F5C18A" />
        <circle cx="12" cy="16" r="6" fill="#E8A96A" />
        <circle cx="44" cy="16" r="6" fill="#E8A96A" />
        <ellipse cx="28" cy="38" rx="10" ry="8" fill="#E8A96A" />
        <circle cx="21" cy="27" r="4" fill="white" />
        <circle cx="35" cy="27" r="4" fill="white" />
        <circle cx="22" cy="27" r="2" fill="#333" />
        <circle cx="36" cy="27" r="2" fill="#333" />
        <ellipse cx="28" cy="36" rx="5" ry="3.5" fill="#C4845A" />
        <path d="M 23 39 Q 28 43 33 39" stroke="#C4845A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="21" cy="24" r="1" fill="white" />
        <circle cx="33" cy="24" r="1" fill="white" />
      </svg>
    </div>
  );
}

function CuteRabbit({ style }: { style: React.CSSProperties }) {
  return (
    <div className="float absolute" style={style}>
      <svg width="50" height="68" viewBox="0 0 50 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ears */}
        <ellipse cx="15" cy="18" rx="6" ry="14" fill="#f0c8d8" />
        <ellipse cx="35" cy="18" rx="6" ry="14" fill="#f0c8d8" />
        <ellipse cx="15" cy="18" rx="3.5" ry="10" fill="#FFB3C8" />
        <ellipse cx="35" cy="18" rx="3.5" ry="10" fill="#FFB3C8" />
        {/* Body */}
        <circle cx="25" cy="44" r="18" fill="#f0c8d8" />
        {/* Face */}
        <circle cx="25" cy="36" r="14" fill="#f8e8f0" />
        <circle cx="19" cy="33" r="3.5" fill="white" />
        <circle cx="31" cy="33" r="3.5" fill="white" />
        <circle cx="20" cy="33" r="1.8" fill="#555" />
        <circle cx="32" cy="33" r="1.8" fill="#555" />
        <ellipse cx="25" cy="38" rx="4" ry="2.8" fill="#FFB3C8" />
        <path d="M 21 41 Q 25 45 29 41" stroke="#FFB3C8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="19" cy="31" r="0.9" fill="white" />
        <circle cx="29" cy="31" r="0.9" fill="white" />
      </svg>
    </div>
  );
}

function CuteFox({ style }: { style: React.CSSProperties }) {
  return (
    <div className="drift absolute" style={style}>
      <svg width="54" height="60" viewBox="0 0 54 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ears */}
        <polygon points="10,22 4,4 20,16" fill="#F47B20" />
        <polygon points="44,22 50,4 34,16" fill="#F47B20" />
        <polygon points="12,20 7,8 19,17" fill="#FFDAB9" />
        <polygon points="42,20 47,8 35,17" fill="#FFDAB9" />
        {/* Head */}
        <circle cx="27" cy="30" r="20" fill="#F47B20" />
        {/* White face patch */}
        <ellipse cx="27" cy="34" rx="13" ry="11" fill="#FFDAB9" />
        {/* Eyes */}
        <circle cx="20" cy="26" r="4" fill="white" />
        <circle cx="34" cy="26" r="4" fill="white" />
        <circle cx="21" cy="26" r="2" fill="#333" />
        <circle cx="35" cy="26" r="2" fill="#333" />
        <circle cx="20" cy="25" r="1" fill="white" />
        <circle cx="34" cy="25" r="1" fill="white" />
        {/* Nose */}
        <ellipse cx="27" cy="32" rx="4" ry="3" fill="#C0392B" />
        <path d="M 23 35 Q 27 39 31 35" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

function CuteDuck({ style }: { style: React.CSSProperties }) {
  return (
    <div className="float absolute" style={style}>
      <svg width="48" height="52" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="24" cy="38" rx="18" ry="14" fill="#FFE066" />
        {/* Head */}
        <circle cx="36" cy="22" r="12" fill="#FFE066" />
        {/* Eye */}
        <circle cx="40" cy="19" r="3" fill="white" />
        <circle cx="41" cy="19" r="1.5" fill="#333" />
        <circle cx="40" cy="18" r="0.8" fill="white" />
        {/* Beak */}
        <ellipse cx="47" cy="24" rx="5" ry="3" fill="#FF9900" />
        {/* Wing */}
        <ellipse cx="16" cy="38" rx="8" ry="6" fill="#FFD700" />
      </svg>
    </div>
  );
}

function CuteCloud({ style, size = 80 }: { style: React.CSSProperties; size?: number }) {
  return (
    <div className="float-slow absolute" style={style}>
      <svg width={size} height={size * 0.6} viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="52" rx="50" ry="22" fill="white" opacity="0.9" />
        <circle cx="40" cy="44" r="18" fill="white" opacity="0.9" />
        <circle cx="65" cy="36" r="22" fill="white" opacity="0.9" />
        <circle cx="88" cy="44" r="16" fill="white" opacity="0.9" />
        {/* Cute face */}
        <circle cx="55" cy="48" r="2.5" fill="#aad4f0" />
        <circle cx="68" cy="48" r="2.5" fill="#aad4f0" />
        <path d="M 57 53 Q 62 57 67 53" stroke="#aad4f0" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

function CuteTree({ style }: { style: React.CSSProperties }) {
  return (
    <div className="float absolute" style={style}>
      <svg width="52" height="72" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="52" width="8" height="20" rx="4" fill="#8B5E3C" />
        <circle cx="26" cy="32" r="22" fill="#6DBE74" />
        <circle cx="14" cy="40" r="14" fill="#6DBE74" />
        <circle cx="38" cy="40" r="14" fill="#6DBE74" />
        <circle cx="26" cy="20" r="14" fill="#7DCF80" />
        <circle cx="26" cy="32" r="7" fill="#5AAD62" opacity="0.5" />
        {/* cute face */}
        <circle cx="22" cy="30" r="2" fill="#fff" opacity="0.7" />
        <circle cx="30" cy="30" r="2" fill="#fff" opacity="0.7" />
        <path d="M 21 35 Q 26 39 31 35" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
      </svg>
    </div>
  );
}

function HeroBanner() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Clouds */}
      <CuteCloud style={{ top: "6%", left: "3%", opacity: 0.95 }} size={100} />
      <CuteCloud style={{ top: "4%", right: "5%", opacity: 0.9, animationDelay: "1.2s" }} size={120} />
      <CuteCloud style={{ top: "18%", left: "28%", opacity: 0.7, animationDelay: "2s" }} size={70} />

      {/* Cute animals */}
      <CuteBear style={{ top: "8%", right: "36%", opacity: 0.95, animationDelay: "0.3s" }} />
      <CuteRabbit style={{ bottom: "22%", left: "3%", opacity: 0.92, animationDelay: "1s" }} />
      <CuteFox style={{ bottom: "20%", right: "3%", opacity: 0.9, animationDelay: "0.7s" }} />
      <CuteDuck style={{ top: "14%", left: "18%", opacity: 0.85, animationDelay: "1.8s" }} />

      {/* Trees */}
      <CuteTree style={{ bottom: "12%", left: "18%", opacity: 0.8, animationDelay: "0.5s" }} />
      <CuteTree style={{ bottom: "10%", right: "18%", opacity: 0.75, animationDelay: "1.4s" }} />

      {/* Floating sparkles / stars */}
      <div className="float absolute top-[30%] left-[8%] text-2xl opacity-60" style={{ animationDelay: "1.1s" }}>⭐</div>
      <div className="float absolute top-[12%] right-[28%] text-xl opacity-70" style={{ animationDelay: "0.6s" }}>✨</div>
      <div className="float absolute top-[38%] right-[10%] text-2xl opacity-55" style={{ animationDelay: "2.2s" }}>🌸</div>
      <div className="float absolute top-[48%] left-[32%] text-xl opacity-50" style={{ animationDelay: "1.7s" }}>🌟</div>
      <div className="float-slow absolute top-[24%] right-[20%] text-lg opacity-50" style={{ animationDelay: "3s" }}>💛</div>

      {/* Road + Cars at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <svg className="absolute bottom-0 left-0 right-0 w-full" height="20" viewBox="0 0 1440 20" preserveAspectRatio="none">
          <rect width="1440" height="20" fill="rgba(180,210,180,0.35)" />
          <line x1="0" y1="10" x2="1440" y2="10" stroke="white" strokeWidth="2" strokeDasharray="40 30" opacity="0.7" />
        </svg>
        <CuteCar color="#7EC8E3" x="4%" delay="0s" size={72} />
        <CuteCar color="#FFB347" x="22%" delay="0.8s" size={60} />
        <CuteCar color="#FF7F7F" x="52%" delay="1.6s" size={68} />
        <CuteCar color="#98D8A3" x="74%" delay="0.4s" size={64} />
        <CuteCar color="#C3A6E8" x="88%" delay="1.2s" size={56} />
      </div>
    </div>
  );
}

export default function Home() {
  const memoriesRef = useRef<HTMLDivElement>(null);
  const profile = useGetProfile();
  const recent = useGetRecentActivity();
  const queryClient = useQueryClient();
  const likeMutation = useLikeMemory();

  const childName = profile.data?.childName ?? "Liew Yang";
  const tagline = profile.data?.tagline ?? "The journey of our little star";
  const photoUrl = profile.data?.photoUrl;

  const handleLike = (id: number) => {
    likeMutation.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListMemoriesQueryKey() }),
    });
  };

  const scrollToMemories = () => {
    memoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #c8ebff 0%, #d8f5d8 38%, #fff5cc 75%, #ffe4d0 100%)" }}
      >
        <HeroBanner />

        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 py-16 pb-28">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/75 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-primary mb-6 shadow-sm">
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
                className="flex items-center gap-2 bg-white/85 backdrop-blur-sm text-foreground px-6 py-3 rounded-2xl font-bold text-base shadow-sm hover:bg-white transition-all border border-border"
              >
                <Camera size={18} />
                See My Adventures
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Profile photo — PNG with transparent background support */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Drop-shadow ring, no colour fill so transparent PNGs show cleanly */}
              <div
                className="w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center"
                style={{
                  boxShadow: "0 0 0 8px rgba(255,255,255,0.85), 0 8px 32px rgba(0,0,0,0.12)",
                  background: photoUrl ? "transparent" : "linear-gradient(135deg, #d0eeff 0%, #d8f6d8 100%)",
                }}
              >
                {photoUrl ? (
                  /* object-contain preserves transparent PNG, no clipping background */
                  <img
                    src={photoUrl}
                    alt={childName}
                    className="w-full h-full rounded-full object-contain drop-shadow-lg"
                    style={{ background: "transparent" }}
                  />
                ) : (
                  <span className="text-8xl select-none">👶</span>
                )}
              </div>
              <div className="float absolute -top-3 -right-3 bg-accent rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md">⭐</div>
              <div
                className="float-slow absolute -bottom-3 -left-3 bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md"
                style={{ animationDelay: "1s" }}
              >
                💛
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-5 font-medium">
              Update photo in{" "}
              <Link href="/admin">
                <span className="text-primary hover:underline cursor-pointer">Admin → Settings</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Latest Moments ── */}
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
                  <img src={memory.mediaUrl} alt={memory.caption ?? "Memory"} className="w-full h-full object-cover" />
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

      {/* ── Diary Preview ── */}
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

      {/* ── Footer ── */}
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
