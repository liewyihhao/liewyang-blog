import { useState } from "react";
import { Play, X, Heart } from "lucide-react";
import { useListMemories, useLikeMemory, getListMemoriesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Navbar } from "@/components/Navbar";

export default function Videos() {
  const [selected, setSelected] = useState<number | null>(null);
  const params = { type: "video" as const };
  const videos = useListMemories(params, { query: { queryKey: getListMemoriesQueryKey(params) } });
  const likeMutation = useLikeMemory();
  const queryClient = useQueryClient();

  const data = videos.data?.memories ?? [];
  const selectedVideo = data.find((v) => v.id === selected);

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span>🎥</span> Videos
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Watch my fun and exciting moments</p>
        </div>

        {videos.isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-6xl block mb-4">🎬</span>
            <p className="text-lg font-bold">No videos yet!</p>
            <p className="text-muted-foreground text-sm mt-1">Upload the first video from the Admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((video) => (
              <div
                key={video.id}
                data-testid={`video-card-${video.id}`}
                onClick={() => setSelected(video.id)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-border cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={video.mediaUrl}
                    alt={video.caption ?? "Video"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} className="text-primary ml-0.5 fill-primary" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md font-medium">
                    Video
                  </div>
                </div>
                <div className="p-3">
                  {video.caption && (
                    <p className="text-sm font-semibold line-clamp-1 mb-2">{video.caption}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <button
                      data-testid={`video-like-${video.id}`}
                      onClick={(e) => handleLike(e, video.id)}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                      <Heart size={12} className="fill-red-400 text-red-400" />
                      {video.likes}
                    </button>
                    <span>{formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video player modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedVideo.mediaUrl}
                alt={selectedVideo.caption ?? "Video"}
                className="w-full max-h-80 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="text-center text-white">
                  <Play size={48} className="fill-white mx-auto mb-2" />
                  <p className="text-sm opacity-80">Video playback coming soon</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-5">
              {selectedVideo.caption && (
                <p className="font-semibold mb-2">{selectedVideo.caption}</p>
              )}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <button
                  onClick={(e) => handleLike(e, selectedVideo.id)}
                  className="flex items-center gap-1.5 text-red-500"
                >
                  <Heart size={16} className="fill-red-400" />
                  {selectedVideo.likes} likes
                </button>
                <span>{formatDistanceToNow(new Date(selectedVideo.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
