import { useState, useEffect } from 'react';
import type { CreatePostData, Post } from '../lib/api';

interface PostFormProps {
  onSubmit: (data: CreatePostData) => void;
  onCancel: () => void;
  initialData?: Post | null;
  submitLabel?: string;
  isLoading?: boolean;
}

export default function PostForm({
  onSubmit,
  onCancel,
  initialData,
  submitLabel = 'Create Post',
  isLoading = false,
}: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setAuthor(initialData.author);
    } else {
      setTitle('');
      setContent('');
      setAuthor('');
    }
  }, [initialData]);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: title.trim(), content: content.trim(), author: author.trim() });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h3 className="mb-4 text-base font-semibold text-slate-900">
        {initialData ? 'Edit Post' : 'Create New Post'}
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="post-title" className="label">
            Title
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
            }}
            className={`input ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="post-author" className="label">
            Author
          </label>
          <input
            id="post-author"
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              if (errors.author) setErrors((prev) => ({ ...prev, author: '' }));
            }}
            className={`input ${errors.author ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="mt-1 text-xs text-red-600">{errors.author}</p>
          )}
        </div>

        <div>
          <label htmlFor="post-content" className="label">
            Content
          </label>
          <textarea
            id="post-content"
            rows={5}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) setErrors((prev) => ({ ...prev, content: '' }));
            }}
            className={`input resize-y ${errors.content ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            placeholder="Write your post content..."
          />
          {errors.content && (
            <p className="mt-1 text-xs text-red-600">{errors.content}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
