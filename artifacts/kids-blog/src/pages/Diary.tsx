import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Pencil, Trash2 } from "lucide-react";
import { useListDiaryEntries, useCreateDiaryEntry, useUpdateDiaryEntry, useDeleteDiaryEntry, getListDiaryEntriesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";

interface DiaryEntry {
  id: number;
  date: string;
  title: string;
  message: string;
  images: string[];
  createdAt: string;
}

interface DiaryFormProps {
  initial?: DiaryEntry;
  onClose: () => void;
  onSave: (data: { date: string; title: string; message: string; images: string[] }) => void;
  isPending: boolean;
}

function DiaryForm({ initial, onClose, onSave, isPending }: DiaryFormProps) {
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().split("T")[0]);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [message, setMessage] = useState(initial?.message ?? "");
  const [imagesRaw, setImagesRaw] = useState(initial?.images.join("\n") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date,
      title,
      message,
      images: imagesRaw.split("\n").map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-bold text-xl">{initial ? "Edit Entry" : "New Diary Page"} 📖</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-muted"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Date</label>
            <input
              type="date"
              data-testid="diary-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Title</label>
            <input
              type="text"
              data-testid="diary-title"
              placeholder="e.g. First Steps, My Little Sunshine..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Message</label>
            <textarea
              data-testid="diary-message"
              placeholder="Write your memory here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Photo URLs (one per line)</label>
            <textarea
              data-testid="diary-images"
              placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
              value={imagesRaw}
              onChange={(e) => setImagesRaw(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-2xl border border-border font-semibold text-sm hover:bg-muted transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              data-testid="diary-save-btn"
              disabled={isPending}
              className="flex-1 bg-primary text-white py-2.5 rounded-2xl font-bold text-sm hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Page"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BookPage({ entry }: { entry: DiaryEntry }) {
  return (
    <div className="grid md:grid-cols-2 min-h-[360px]">
      {/* Left page */}
      <div className="book-page p-8 md:border-r border-amber-200/60">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <span>📅</span>
          <span className="font-semibold">{entry.date}</span>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">{entry.title}</h2>
        <div className="paper-texture rounded-xl p-4">
          <p className="text-sm leading-loose text-foreground/80 whitespace-pre-line">
            {entry.message}
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <span className="text-2xl">❤️</span>
        </div>
      </div>
      {/* Right page */}
      <div className="book-page p-8 flex flex-col items-center justify-center gap-3">
        {entry.images.length > 0 ? (
          entry.images.slice(0, 2).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Photo ${i + 1}`}
              className="rounded-2xl object-cover w-full shadow-md"
              style={{ maxHeight: i === 0 ? "200px" : "140px" }}
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            <span className="text-6xl block mb-3">🐰</span>
            <p className="text-sm font-medium">A page from the heart</p>
          </div>
        )}
        {/* Page number */}
        <div className="text-xs text-muted-foreground mt-auto">🦊</div>
      </div>
    </div>
  );
}

export default function Diary() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState<DiaryEntry | null>(null);
  const queryClient = useQueryClient();

  const entries = useListDiaryEntries({ query: { queryKey: getListDiaryEntriesQueryKey() } });
  const createEntry = useCreateDiaryEntry();
  const updateEntry = useUpdateDiaryEntry();
  const deleteEntry = useDeleteDiaryEntry();

  const data = (entries.data ?? []) as DiaryEntry[];
  const totalPages = data.length;
  const current = data[currentPage];

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListDiaryEntriesQueryKey() });

  const handleCreate = (formData: { date: string; title: string; message: string; images: string[] }) => {
    createEntry.mutate({ data: formData }, {
      onSuccess: () => { invalidate(); setShowForm(false); setCurrentPage(0); }
    });
  };

  const handleUpdate = (formData: { date: string; title: string; message: string; images: string[] }) => {
    if (!editEntry) return;
    updateEntry.mutate({ id: editEntry.id, data: formData }, {
      onSuccess: () => { invalidate(); setEditEntry(null); }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this diary page?")) return;
    deleteEntry.mutate({ id }, {
      onSuccess: () => {
        invalidate();
        setCurrentPage(Math.max(0, currentPage - 1));
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span>📖</span> My Diary
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Messages from my parents, memories for my future</p>
          </div>
          <button
            data-testid="new-diary-btn"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-sm hover:opacity-90"
          >
            <Plus size={16} />
            New Page
          </button>
        </div>

        {entries.isLoading ? (
          <div className="bg-white rounded-3xl shadow-lg border border-amber-200/60 min-h-[400px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <span className="text-5xl block mb-3">📖</span>
              Loading diary...
            </div>
          </div>
        ) : totalPages === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-amber-200/60 min-h-[400px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <span className="text-5xl block mb-3">📝</span>
              <p className="font-bold text-lg">No diary pages yet!</p>
              <p className="text-sm mt-1">Add the first memory for Liew Yang.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 bg-primary text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:opacity-90"
              >
                Write First Entry
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Book */}
            <div className="relative bg-amber-50 rounded-3xl shadow-xl border-2 border-amber-200/60 overflow-hidden">
              {/* Book binding */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-300/60 to-amber-200/20 z-10 hidden md:block">
                <div className="flex flex-col gap-4 items-center pt-8">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-amber-400/60" />
                  ))}
                </div>
              </div>
              <div className="md:pl-6">
                <BookPage entry={current} />
              </div>
              {/* Page actions */}
              <div className="absolute top-3 right-3 flex gap-2 z-20">
                <button
                  data-testid="edit-diary-btn"
                  onClick={() => setEditEntry(current)}
                  className="bg-white/80 p-2 rounded-xl shadow-sm hover:bg-white border border-border"
                >
                  <Pencil size={14} />
                </button>
                <button
                  data-testid="delete-diary-btn"
                  onClick={() => handleDelete(current.id)}
                  className="bg-white/80 p-2 rounded-xl shadow-sm hover:bg-red-50 border border-border text-destructive"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                data-testid="prev-page-btn"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-border font-semibold text-sm disabled:opacity-40 hover:bg-muted transition-colors shadow-sm"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {/* Page dots */}
              <div className="flex gap-1.5">
                {data.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentPage ? "bg-primary w-5" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <button
                data-testid="next-page-btn"
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-border font-semibold text-sm disabled:opacity-40 hover:bg-muted transition-colors shadow-sm"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-3">
              Page {currentPage + 1} of {totalPages}
            </p>

            {/* All entries list */}
            <div className="mt-10">
              <h3 className="font-bold text-lg mb-4">All Diary Entries</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.map((entry, i) => (
                  <button
                    key={entry.id}
                    onClick={() => setCurrentPage(i)}
                    data-testid={`diary-entry-${entry.id}`}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      i === currentPage ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-white hover:bg-muted/50"
                    }`}
                  >
                    <div className="text-xs text-muted-foreground mb-1">{entry.date}</div>
                    <div className="font-bold text-sm">{entry.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{entry.message}</div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <DiaryForm onClose={() => setShowForm(false)} onSave={handleCreate} isPending={createEntry.isPending} />
      )}
      {editEntry && (
        <DiaryForm initial={editEntry} onClose={() => setEditEntry(null)} onSave={handleUpdate} isPending={updateEntry.isPending} />
      )}
    </div>
  );
}
