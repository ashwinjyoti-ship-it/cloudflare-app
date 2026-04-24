const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  author?: string;
}

export interface ApiError extends Error {
  status?: number;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = new Error(
      `HTTP ${response.status}: ${response.statusText}`
    ) as ApiError;
    error.status = response.status;
    try {
      const body = await response.json();
      error.message = body.message || body.error || error.message;
    } catch {
      // ignore parse error
    }
    throw error;
  }
  return response.json() as Promise<T>;
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_BASE}/api/posts`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  return handleResponse<Post[]>(response);
}

export async function getPost(id: string): Promise<Post> {
  const response = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  return handleResponse<Post>(response);
}

export async function createPost(data: CreatePostData): Promise<Post> {
  const response = await fetch(`${API_BASE}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Post>(response);
}

export async function updatePost(
  id: string,
  data: UpdatePostData
): Promise<Post> {
  const response = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Post>(response);
}

export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    const error = new Error(
      `HTTP ${response.status}: ${response.statusText}`
    ) as ApiError;
    error.status = response.status;
    try {
      const body = await response.json();
      error.message = body.message || body.error || error.message;
    } catch {
      // ignore
    }
    throw error;
  }
}
