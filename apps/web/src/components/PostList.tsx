import { useEffect, useState } from 'react';
import { getPosts, type Post } from '../lib/api';
import PostCard from './PostCard';

interface PostListProps {
  refreshKey: number;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

export default function PostList({ refreshKey, onEdit, onDelete }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getPosts()
      .then((data) => {
        if (!cancelled) {
          setPosts(data);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch posts');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        <p className="mt-3 text-sm text-slate-500">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-10 w-10 text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-red-800">
          Failed to load posts
        </h3>
        <p className="mt-1 text-xs text-red-600">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-10 w-10 text-slate-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-700">No posts yet</h3>
        <p className="mt-1 text-xs text-slate-500">
          Create your first post to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
