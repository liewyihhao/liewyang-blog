import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useListMilestones, useCreateMilestone, useUpdateMilestone, useDeleteMilestone, getListMilestonesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";

interface Milestone {
  id: number;
  title: string;
  date: string;
  icon: string;
  imageUrl: string | null;
  note: string | null;
  order: number;
}

interface MilestoneFormProps {
  initial?: Milestone;
  onClose: () => void;
  onSave: (data: { title: string; date: string; icon: string; imageUrl: string | null; note: string | null; order: number }) => void;
  isPending: boolean;
  nextOrder: number;
}

function MilestoneForm({ initial, onClose, onSave, isPending, nextOrder }: MilestoneFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().split("T")[0]);
  const [icon, setIcon] = useState(initial?.icon ?? "⭐");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [note, setNote] = useState(initial?.note ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      date,
      icon,
      imageUrl: imageUrl.trim() || null,
      note: note.trim() || null,
      order: initial?.order ?? nextOrder,
    });
  };

  const commonIcons = ["😊", "👣", "🗣️", "🎂", "✈️", "🏊", "🎨", "🍕", "🌸", "⭐", "🏆", "📚", "🎵", "🐾", "🌈"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-bold text-xl">{initial ? "Edit Milestone" : "New Milestone"} 🏆</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-muted"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Icon</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {commonIcons.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`text-xl w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    icon === ic ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-muted"
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Or type an emoji..."
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Title</label>
            <input
              type="text"
              data-testid="milestone-title"
              required
              placeholder="e.g. First Smile, First Steps..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Date</label>
            <input
              type="date"
              data-testid="milestone-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Note</label>
            <textarea
              data-testid="milestone-note"
              placeholder="Write something about this milestone..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Photo URL (optional)</label>
            <input
              type="url"
              data-testid="milestone-image"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-2xl border border-border font-semibold text-sm hover:bg-muted">
              Cancel
            </button>
            <button
              type="submit"
              data-testid="milestone-save-btn"
              disabled={isPending}
              className="flex-1 bg-accent text-accent-foreground py-2.5 rounded-2xl font-bold text-sm hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Milestone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Milestones() {
  const [showForm, setShowForm] = useState(false);
  const [editMilestone, setEditMilestone] = useState<Milestone | null>(null);
  const queryClient = useQueryClient();

  const milestones = useListMilestones({ query: { queryKey: getListMilestonesQueryKey() } });
  const createMilestone = useCreateMilestone();
  const updateMilestone = useUpdateMilestone();
  const deleteMilestone = useDeleteMilestone();

  const data = (milestones.data ?? []) as Milestone[];
  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListMilestonesQueryKey() });

  const handleCreate = (formData: Parameters<MilestoneFormProps["onSave"]>[0]) => {
    createMilestone.mutate({ data: formData }, {
      onSuccess: () => { invalidate(); setShowForm(false); }
    });
  };

  const handleUpdate = (formData: Parameters<MilestoneFormProps["onSave"]>[0]) => {
    if (!editMilestone) return;
    updateMilestone.mutate({ id: editMilestone.id, data: formData }, {
      onSuccess: () => { invalidate(); setEditMilestone(null); }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Remove this milestone?")) return;
    deleteMilestone.mutate({ id }, { onSuccess: invalidate });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span>🏆</span> Milestones
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Celebrating every big moment</p>
          </div>
          <button
            data-testid="new-milestone-btn"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-2xl font-bold text-sm shadow-sm hover:opacity-90"
          >
            <Plus size={16} />
            Add Milestone
          </button>
        </div>

        {milestones.isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center text-muted-foreground">
              <span className="text-5xl block mb-3 animate-spin">⭐</span>
              Loading milestones...
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-6xl block mb-4">🏆</span>
            <p className="text-lg font-bold">No milestones yet!</p>
            <p className="text-muted-foreground text-sm mt-1">Add Liew Yang's first big achievement.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-accent text-accent-foreground px-5 py-2.5 rounded-2xl font-bold text-sm hover:opacity-90"
            >
              Add First Milestone
            </button>
          </div>
        ) : (
          <>
            {/* Timeline */}
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full hidden md:block" />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {data.map((milestone, i) => (
                  <div
                    key={milestone.id}
                    data-testid={`milestone-${milestone.id}`}
                    className="relative flex flex-col items-center text-center group"
                  >
                    {/* Icon bubble */}
                    <div
                      className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md border-4 border-white mb-3"
                      style={{
                        background: `hsl(${(i * 60) % 360}, 70%, 85%)`
                      }}
                    >
                      {milestone.icon}
                      {milestone.imageUrl && (
                        <img
                          src={milestone.imageUrl}
                          alt={milestone.title}
                          className="absolute inset-0 w-full h-full rounded-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                    </div>

                    <div className="font-bold text-sm">{milestone.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{milestone.date}</div>
                    {milestone.note && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 px-1">{milestone.note}</p>
                    )}

                    {/* Edit/Delete buttons */}
                    <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditMilestone(milestone)}
                        className="p-1.5 rounded-lg bg-white border border-border shadow-sm hover:bg-muted"
                      >
                        <Pencil size={11} />
                      </button>
                      <button
                        onClick={() => handleDelete(milestone.id)}
                        className="p-1.5 rounded-lg bg-white border border-border shadow-sm hover:bg-red-50 text-destructive"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards grid */}
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((milestone, i) => (
                <div
                  key={milestone.id}
                  className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {milestone.imageUrl && (
                    <img src={milestone.imageUrl} alt={milestone.title} className="w-full h-32 object-cover" />
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{milestone.icon}</span>
                      <div>
                        <div className="font-bold">{milestone.title}</div>
                        <div className="text-xs text-muted-foreground">{milestone.date}</div>
                      </div>
                    </div>
                    {milestone.note && (
                      <p className="text-sm text-muted-foreground">{milestone.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showForm && (
        <MilestoneForm
          onClose={() => setShowForm(false)}
          onSave={handleCreate}
          isPending={createMilestone.isPending}
          nextOrder={data.length + 1}
        />
      )}
      {editMilestone && (
        <MilestoneForm
          initial={editMilestone}
          onClose={() => setEditMilestone(null)}
          onSave={handleUpdate}
          isPending={updateMilestone.isPending}
          nextOrder={data.length + 1}
        />
      )}
    </div>
  );
}
