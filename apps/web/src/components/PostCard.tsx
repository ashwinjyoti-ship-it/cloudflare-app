import type { Post } from '../lib/api';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  return (
    <div className="card group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 truncate">
            {post.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
              {post.author}
            </span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(post)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
            aria-label="Edit post"
            title="Edit post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-colors"
            aria-label="Delete post"
            title="Delete post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-600 line-clamp-3">{post.content}</p>
    </div>
  );
}
