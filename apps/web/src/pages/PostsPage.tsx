import { useState, useCallback } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import { createPost, updatePost, deletePost, type Post } from '../lib/api';

type Toast = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

export default function PostsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  let toastId = 0;

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  function handleCreateClick() {
    setEditingPost(null);
    setShowForm(true);
  }

  function handleEdit(post: Post) {
    setEditingPost(post);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingPost(null);
  }

  async function handleSubmit(data: { title: string; content: string; author: string }) {
    setIsSubmitting(true);
    try {
      if (editingPost) {
        await updatePost(editingPost.id, data);
        addToast('Post updated successfully', 'success');
      } else {
        await createPost(data);
        addToast('Post created successfully', 'success');
      }
      setShowForm(false);
      setEditingPost(null);
      setRefreshKey((k) => k + 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      addToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDeleteRequest(id: string) {
    setDeleteConfirm(id);
  }

  async function handleDeleteConfirm() {
    if (!deleteConfirm) return;
    try {
      await deletePost(deleteConfirm);
      addToast('Post deleted successfully', 'success');
      setRefreshKey((k) => k + 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete post';
      addToast(message, 'error');
    } finally {
      setDeleteConfirm(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Posts</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage your blog posts — create, edit, and delete.
          </p>
        </div>
        {!showForm && (
          <button onClick={handleCreateClick} className="btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Post
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <PostForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingPost}
            submitLabel={editingPost ? 'Update Post' : 'Create Post'}
            isLoading={isSubmitting}
          />
        </div>
      )}

      {/* Post List */}
      {!showForm && (
        <PostList
          refreshKey={refreshKey}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">
              Delete Post
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg animate-in slide-in-from-right-2 duration-300 ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            {toast.type === 'success' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
