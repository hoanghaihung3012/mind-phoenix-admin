import { ApiClient } from '../api/apiClient';
import {
  DashboardMetrics,
  Order,
  Product,
  LeaderboardUser,
  SalesReportRow,
  MessageThread,
  Message,
  AppSettings,
} from '../../domain/entities';

export class ApiDashboardRepository {
  async getMetrics(): Promise<DashboardMetrics> {
    return ApiClient.get<DashboardMetrics>('/dashboard');
  }
}

export class ApiOrderRepository {
  async getOrders(): Promise<Order[]> {
    return ApiClient.get<Order[]>('/orders');
  }
  async createOrder(order: Partial<Order>): Promise<Order> {
    return ApiClient.post<Order>('/orders', order);
  }
}

export class ApiProductRepository {
  async getProducts(): Promise<Product[]> {
    return ApiClient.get<Product[]>('/products');
  }
  async createProduct(product: Partial<Product>): Promise<Product> {
    return ApiClient.post<Product>('/products', product);
  }
}

export class ApiLeaderboardRepository {
  async getLeaderboard(): Promise<LeaderboardUser[]> {
    return ApiClient.get<LeaderboardUser[]>('/leaderboard');
  }
}

export class ApiSalesReportRepository {
  async getReports(): Promise<SalesReportRow[]> {
    return ApiClient.get<SalesReportRow[]>('/reports');
  }
}

export class ApiMessageRepository {
  async getThreads(): Promise<MessageThread[]> {
    return ApiClient.get<MessageThread[]>('/messages/threads');
  }
  async getMessages(threadId: string): Promise<Message[]> {
    return ApiClient.get<Message[]>(`/messages/${threadId}`);
  }
  async sendMessage(threadId: string, content: string): Promise<Message> {
    return ApiClient.post<Message>(`/messages/${threadId}`, { content });
  }
}

export class ApiSettingsRepository {
  async getSettings(): Promise<AppSettings> {
    return ApiClient.get<AppSettings>('/settings');
  }
  async updateSettings(settings: AppSettings): Promise<AppSettings> {
    return ApiClient.put<AppSettings>('/settings', settings);
  }
}
