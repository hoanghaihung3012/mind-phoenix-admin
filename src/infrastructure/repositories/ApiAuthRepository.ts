import { ApiClient } from '../api/apiClient';
import { User, AuthResponse, LoginCredentials } from '../../domain/entities/Auth';

export class ApiAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return ApiClient.post<AuthResponse>('/auth/login', credentials);
  }

  async getMe(): Promise<User> {
    return ApiClient.get<User>('/auth/me');
  }

  async logout(): Promise<void> {
    try {
      await ApiClient.post('/auth/logout');
    } catch {
      // Ignore network errors on logout
    }
  }
}
