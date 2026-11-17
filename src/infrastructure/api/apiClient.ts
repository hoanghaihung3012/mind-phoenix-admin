const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5005/api';

export class ApiClient {
  private static getToken(): string | null {
    return localStorage.getItem('mindphoenix_admin_token') || localStorage.getItem('auth_token');
  }

  static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });
      const json = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(json?.message || `Request failed with status ${response.status}`);
      }

      return json?.data !== undefined ? json.data : (json as T);
    } catch (err: any) {
      console.warn(`API call ${endpoint} error:`, err.message);
      throw err;
    }
  }

  static get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  static post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}
