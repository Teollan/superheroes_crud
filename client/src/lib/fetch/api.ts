const BASE = "https://superheroes-crud.onrender.com/api/";

interface FetchOptions extends RequestInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

async function request<T>(endpoint: string, options: FetchOptions): Promise<T> {
  const url = `${BASE}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function get<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, {
    method: "GET",
  });
}

function post<T, U>(endpoint: string, data: U): Promise<T> {
  return request<T>(endpoint, {
    method: "POST",
    body: data,
  });
}

function put<T, U>(endpoint: string, data: U): Promise<T> {
  return request<T>(endpoint, {
    method: "PUT",
    body: data,
  });
}

function del<T, U>(endpoint: string, data?: U): Promise<T> {
  return request<T>(endpoint, {
    method: "DELETE",
    body: data,
  });
}

export default {
  get,
  post,
  put,
  delete: del,
};
