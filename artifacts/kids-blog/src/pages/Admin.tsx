import { useState, useRef } from "react";
import { LayoutDashboard, Upload, BookOpen, Trophy, Settings, LogOut, Lock, Camera, X } from "lucide-react";
import { useGetStats, useGetProfile, useUpdateProfile, useCreateMemory, useListMemories, useDeleteMemory, useListDiaryEntries, useListMilestones, getListMemoriesQueryKey, getListDiaryEntriesQueryKey, getListMilestonesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { useUpload } from "@workspace/object-storage-web";

const ADMIN_PASSWORD = "liewyang2024";
const STORAGE_BASE = "/api/storage";

function toServingUrl(objectPath: string) {
  return `${STORAGE_BASE}${objectPath}`;
}

type AdminTab = "dashboard" | "upload" | "diary" | "milestones" | "settings";

/* ── File upload button component ── */
function FileUploadButton({
  accept,
  onUploaded,
  label,
  previewUrl,
  onClear,
  disabled,
  capture,
}: {
  accept: string;
  onUploaded: (servingUrl: string) => void;
  label: string;
  previewUrl?: string;
  onClear?: () => void;
  disabled?: boolean;
  capture?: "user" | "environment";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const { uploadFile, isUploading, progress, error } = useUpload({
    basePath: STORAGE_BASE,
    onSuccess: (res) => {
      onUploaded(toServingUrl(res.objectPath));
      setLocalPreview(null);
    },
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalPreview(URL.createObjectURL(file));
    await uploadFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  const preview = previewUrl || localPreview;

  return (
    <div className="space-y-3">
      {preview && (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="w-32 h-32 rounded-2xl object-cover shadow-md border-4 border-white" />
          {onClear && !isUploading && (
            <button
              type="button"
              onClick={() => { onClear(); setLocalPreview(null); }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600"
            >
              <X size={12} />
            </button>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={disabled || isUploading}
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Camera size={15} />
          {isUploading ? `Uploading… ${progress}%` : label}
        </button>
        {/* Allow camera capture on mobile */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          capture={capture}
          className="hidden"
          onChange={handleChange}
        />
        <span className="text-xs text-muted-foreground">From device or camera</span>
      </div>
      {error && <p className="text-xs text-destructive font-medium">{error.message}</p>}
    </div>
  );
}

/* ── Password Gate ── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      localStorage.setItem("admin_unlocked", "true");
      onUnlock();
    } else {
      setError(true);
      setPwd("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-border p-8 w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <Lock size={28} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-1">Admin Panel</h2>
        <p className="text-muted-foreground text-sm mb-6">Enter password to access the admin dashboard</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            data-testid="admin-password"
            placeholder="Enter password"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setError(false); }}
            className="w-full px-4 py-3 rounded-2xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-center font-medium"
          />
          {error && <p className="text-destructive text-xs font-medium">Incorrect password</p>}
          <button
            type="submit"
            data-testid="admin-login-btn"
            className="w-full bg-primary text-white py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity"
          >
            Unlock Admin
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-5">🔒 Private family access only</p>
      </div>
    </div>
  );
}

/* ── Dashboard ── */
function Dashboard() {
  const stats = useGetStats();
  const s = stats.data;
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total Memories", value: s?.totalMemories ?? 0, emoji: "📸" },
          { label: "Photos", value: s?.totalPhotos ?? 0, emoji: "🖼️" },
          { label: "Videos", value: s?.totalVideos ?? 0, emoji: "🎥" },
          { label: "Diary Pages", value: s?.totalDiaryEntries ?? 0, emoji: "📖" },
          { label: "Milestones", value: s?.totalMilestones ?? 0, emoji: "🏆" },
          { label: "Total Likes", value: s?.totalLikes ?? 0, emoji: "❤️" },
        ].map(({ label, value, emoji }) => (
          <div key={label} className="bg-muted/60 rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">{emoji}</div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground font-medium">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Upload Media ── */
function UploadMedia() {
  const [type, setType] = useState<"photo" | "video">("photo");
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");
  const createMemory = useCreateMemory();
  const queryClient = useQueryClient();
  const memories = useListMemories();
  const deleteMemory = useDeleteMemory();

  const handleFileUploaded = (servingUrl: string) => {
    setMediaUrl(servingUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaUrl) return;
    createMemory.mutate({ data: { type, mediaUrl, caption: caption || null } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListMemoriesQueryKey() });
        setMediaUrl("");
        setCaption("");
      }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this memory?")) return;
    deleteMemory.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListMemoriesQueryKey() })
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Upload Media</h2>
      <form onSubmit={handleSubmit} className="bg-muted/40 rounded-2xl p-5 space-y-4">
        {/* Photo / Video toggle */}
        <div className="flex gap-3">
          {(["photo", "video"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setType(t); setMediaUrl(""); }}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm capitalize transition-all ${
                type === t ? "bg-primary text-white shadow-sm" : "bg-white border border-border hover:bg-muted"
              }`}
            >
              {t === "photo" ? "📸 Photo" : "🎥 Video"}
            </button>
          ))}
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {type === "photo" ? "Choose Photo" : "Choose Video"}
          </label>
          <FileUploadButton
            accept={type === "photo" ? "image/*" : "video/*"}
            capture={type === "photo" ? "environment" : undefined}
            onUploaded={handleFileUploaded}
            label={type === "photo" ? "Select Photo / Take Photo" : "Select Video"}
            previewUrl={mediaUrl || undefined}
            onClear={() => setMediaUrl("")}
          />
        </div>

        {/* Caption */}
        <div>
          <label className="block text-sm font-semibold mb-1.5">Caption (optional)</label>
          <input
            type="text"
            data-testid="upload-caption"
            placeholder="Add a sweet caption…"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <button
          type="submit"
          data-testid="upload-submit"
          disabled={!mediaUrl || createMemory.isPending}
          className="w-full bg-primary text-white py-2.5 rounded-2xl font-bold hover:opacity-90 disabled:opacity-50"
        >
          {createMemory.isPending ? "Saving…" : "Save Memory"}
        </button>
      </form>

      {/* Existing memories grid */}
      <div>
        <h3 className="font-bold mb-3">All Memories ({memories.data?.total ?? 0})</h3>
        <div className="grid grid-cols-3 gap-2">
          {memories.data?.memories.map((m) => (
            <div key={m.id} className="relative group">
              <img src={m.mediaUrl} alt="" className="w-full aspect-square object-cover rounded-xl" />
              <button
                onClick={() => handleDelete(m.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Diary Manager ── */
function DiaryManager() {
  const entries = useListDiaryEntries({ query: { queryKey: getListDiaryEntriesQueryKey() } });
  const data = entries.data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Diary Entries ({data.length})</h2>
        <a href="/diary" className="text-primary text-sm font-semibold hover:underline">Manage in Diary →</a>
      </div>
      <div className="space-y-2">
        {data.map((e) => (
          <div key={e.id} className="bg-white rounded-2xl border border-border p-4">
            <div className="text-xs text-muted-foreground">{e.date}</div>
            <div className="font-bold mt-0.5">{e.title}</div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{e.message}</p>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <span className="text-4xl block mb-2">📖</span>
            No diary entries yet
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Milestones Manager ── */
function MilestonesManager() {
  const milestones = useListMilestones({ query: { queryKey: getListMilestonesQueryKey() } });
  const data = milestones.data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Milestones ({data.length})</h2>
        <a href="/milestones" className="text-primary text-sm font-semibold hover:underline">Manage →</a>
      </div>
      <div className="space-y-2">
        {data.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-3">
            <span className="text-2xl">{m.icon}</span>
            <div>
              <div className="font-bold">{m.title}</div>
              <div className="text-xs text-muted-foreground">{m.date}</div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <span className="text-4xl block mb-2">🏆</span>
            No milestones yet
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Settings ── */
function SettingsPanel() {
  const profile = useGetProfile();
  const updateProfile = useUpdateProfile();
  const queryClient = useQueryClient();

  const p = profile.data;
  const [name, setName] = useState(p?.childName ?? "Liew Yang");
  const [tagline, setTagline] = useState(p?.tagline ?? "");
  const [photoUrl, setPhotoUrl] = useState(p?.photoUrl ?? "");
  const [birthDate, setBirthDate] = useState(p?.birthDate ?? "");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate({
      data: { childName: name, tagline, photoUrl: photoUrl || null, birthDate: birthDate || null }
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Settings</h2>
      <form onSubmit={handleSubmit} className="bg-muted/40 rounded-2xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5">Child's Name</label>
          <input
            type="text"
            data-testid="settings-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Tagline</label>
          <input
            type="text"
            data-testid="settings-tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="The journey of our little star"
            className="w-full px-4 py-2.5 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Profile Photo</label>
          <FileUploadButton
            accept="image/*"
            capture="user"
            onUploaded={(url) => setPhotoUrl(url)}
            label="Upload Photo / Take Selfie"
            previewUrl={photoUrl || undefined}
            onClear={() => setPhotoUrl("")}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Birth Date</label>
          <input
            type="date"
            data-testid="settings-birthdate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button
          type="submit"
          data-testid="settings-save"
          disabled={updateProfile.isPending}
          className={`w-full py-2.5 rounded-2xl font-bold transition-all ${
            saved ? "bg-secondary text-white" : "bg-primary text-white hover:opacity-90"
          } disabled:opacity-50`}
        >
          {saved ? "Saved!" : updateProfile.isPending ? "Saving…" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

/* ── Main Admin page ── */
export default function Admin() {
  const [unlocked, setUnlocked] = useState(localStorage.getItem("admin_unlocked") === "true");
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("admin_unlocked");
    setUnlocked(false);
  };

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const sidebarItems = [
    { id: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
    { id: "upload" as AdminTab, label: "Upload Media", icon: Upload },
    { id: "diary" as AdminTab, label: "Diary Editor", icon: BookOpen },
    { id: "milestones" as AdminTab, label: "Milestones", icon: Trophy },
    { id: "settings" as AdminTab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="font-bold text-sm">Admin Panel</div>
                <div className="text-xs text-muted-foreground">Liew Yang's Diary</div>
              </div>
              <nav className="p-2 space-y-0.5">
                {sidebarItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    data-testid={`admin-tab-${id}`}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all ${
                      activeTab === id ? "bg-primary text-white" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
              </nav>
              <div className="p-2 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-destructive hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl border border-border shadow-sm p-6">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "upload" && <UploadMedia />}
            {activeTab === "diary" && <DiaryManager />}
            {activeTab === "milestones" && <MilestonesManager />}
            {activeTab === "settings" && <SettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
