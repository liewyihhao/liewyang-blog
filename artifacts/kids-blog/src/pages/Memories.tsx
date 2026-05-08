import { useState } from "react";
import { Heart, MessageCircle, Plus, X } from "lucide-react";
import { useListMemories, useLikeMemory, useListComments, useAddComment, getListMemoriesQueryKey, getListCommentsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Navbar } from "@/components/Navbar";

type FilterType = "all" | "photo" | "video";

interface SelectedMemory {
  id: number;
  mediaUrl: string;
  caption: string | null;
  type: string;
  likes: number;
  commentCount: number;
  createdAt: string;
}

function CommentPanel({ memoryId, onClose }: { memoryId: number; onClose: () => void }) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const comments = useListComments(memoryId, { query: { queryKey: getListCommentsQueryKey(memoryId) } });
  const addComment = useAddComment();
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    addComment.mutate({ id: memoryId, data: { author, text } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListCommentsQueryKey(memoryId) });
        queryClient.invalidateQueries({ queryKey: getListMemoriesQueryKey() });
        setText("");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-bold text-lg">Comments</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-muted">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {comments.isLoading ? (
            <div className="text-center text-muted-foreground text-sm py-8">Loading comments...</div>
          ) : comments.data && comments.data.length > 0 ? (
            comments.data.map((c) => (
              <div key={c.id} className="bg-muted rounded-2xl p-3">
                <div className="font-semibold text-sm">{c.author}</div>
                <div className="text-sm mt-0.5">{c.text}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground text-sm py-8">
              <span className="text-3xl block mb-2">💬</span>
              No comments yet — be the first!
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-border space-y-2">
          <input
            data-testid="comment-author"
            className="w-full px-4 py-2.5 rounded-2xl border border-border bg-muted/50 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              data-testid="comment-text"
              className="flex-1 px-4 py-2.5 rounded-2xl border border-border bg-muted/50 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              data-testid="comment-submit"
              disabled={addComment.isPending}
              className="bg-primary text-white px-4 py-2.5 rounded-2xl text-sm font-bold hover:opacity-90 disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Memories() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedMemory, setSelectedMemory] = useState<SelectedMemory | null>(null);
  const [commentMemoryId, setCommentMemoryId] = useState<number | null>(null);

  const params = filter !== "all" ? { type: filter } : undefined;
  const memories = useListMemories(params, { query: { queryKey: getListMemoriesQueryKey(params) } });
  const likeMutation = useLikeMemory();
  const queryClient = useQueryClient();

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    likeMutation.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListMemoriesQueryKey(params) })
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span>📸</span> Latest Moments
            </h1>
            <p className="text-muted-foreground text-sm mt-1">A glimpse of my recent adventures</p>
          </div>

          <div className="flex items-center gap-2">
            {(["all", "photo", "video"] as FilterType[]).map((f) => (
              <button
                key={f}
                data-testid={`filter-${f}`}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                  filter === f ? "bg-primary text-white shadow-sm" : "bg-white border border-border hover:bg-muted"
                }`}
              >
                {f === "all" ? "All" : f === "photo" ? "Photos" : "Videos"}
              </button>
            ))}
          </div>
        </div>

        {memories.isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : memories.data?.memories && memories.data.memories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {memories.data.memories.map((memory) => (
              <div
                key={memory.id}
                data-testid={`memory-card-${memory.id}`}
                onClick={() => setSelectedMemory(memory as SelectedMemory)}
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
                      onClick={(e) => handleLike(e, memory.id)}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                      <Heart size={12} className="fill-red-400 text-red-400" />
                      <span>{memory.likes}</span>
                    </button>
                    <button
                      data-testid={`comment-btn-${memory.id}`}
                      onClick={(e) => { e.stopPropagation(); setCommentMemoryId(memory.id); }}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <MessageCircle size={12} />
                      <span>{memory.commentCount}</span>
                    </button>
                    <span>{formatDistanceToNow(new Date(memory.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <span className="text-6xl block mb-4">🌟</span>
            <p className="text-lg font-bold">No memories yet!</p>
            <p className="text-muted-foreground text-sm mt-1">Visit Admin to upload your first photo.</p>
          </div>
        )}
      </div>

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelectedMemory(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedMemory.mediaUrl} alt={selectedMemory.caption ?? "Memory"} className="w-full max-h-80 object-cover" />
              <button onClick={() => setSelectedMemory(null)} className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow">
                <X size={16} />
              </button>
            </div>
            <div className="p-5">
              {selectedMemory.caption && (
                <p className="font-medium mb-3">{selectedMemory.caption}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button
                  onClick={() => { handleLike({ stopPropagation: () => {} } as React.MouseEvent, selectedMemory.id); setSelectedMemory(null); }}
                  className="flex items-center gap-1.5 text-red-500 hover:text-red-600"
                >
                  <Heart size={16} className="fill-red-400" />
                  {selectedMemory.likes} likes
                </button>
                <button
                  onClick={() => { setSelectedMemory(null); setCommentMemoryId(selectedMemory.id); }}
                  className="flex items-center gap-1.5 hover:text-primary"
                >
                  <MessageCircle size={16} />
                  {selectedMemory.commentCount} comments
                </button>
                <span className="ml-auto">{formatDistanceToNow(new Date(selectedMemory.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Panel */}
      {commentMemoryId !== null && (
        <CommentPanel memoryId={commentMemoryId} onClose={() => setCommentMemoryId(null)} />
      )}
    </div>
  );
}
