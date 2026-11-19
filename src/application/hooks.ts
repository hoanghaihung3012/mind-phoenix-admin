import { useState, useEffect, useCallback } from 'react';
import {
  DashboardMetrics,
  Order,
  Product,
  LeaderboardUser,
  SalesReportRow,
  MessageThread,
  Message,
  AppSettings,
  Contact,
  AnalyticsSummary,
} from '../domain/entities';
import {
  ApiDashboardRepository,
  ApiOrderRepository,
  ApiProductRepository,
  ApiLeaderboardRepository,
  ApiSalesReportRepository,
  ApiMessageRepository,
  ApiSettingsRepository,
  ApiContactRepository,
  ApiAnalyticsRepository,
} from '../infrastructure/repositories/ApiRepositories';

const dashboardRepo = new ApiDashboardRepository();
const orderRepo = new ApiOrderRepository();
const productRepo = new ApiProductRepository();
const leaderboardRepo = new ApiLeaderboardRepository();
const salesReportRepo = new ApiSalesReportRepository();
const messageRepo = new ApiMessageRepository();
const settingsRepo = new ApiSettingsRepository();
const contactRepo = new ApiContactRepository();
const analyticsRepo = new ApiAnalyticsRepository();

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dashboardRepo.getMetrics();
      setMetrics(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { metrics, loading, error, refetch: fetchMetrics };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await orderRepo.getOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const addOrder = async (order: Partial<Order>) => {
    const created = await orderRepo.createOrder(order);
    setOrders(prev => [created, ...prev]);
    return created;
  };

  return { orders, loading, error, addOrder, refetch: fetchOrders };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productRepo.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product: Partial<Product>) => {
    const created = await productRepo.createProduct(product);
    setProducts(prev => [created, ...prev]);
    return created;
  };

  return { products, loading, error, addProduct, refetch: fetchProducts };
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    leaderboardRepo.getLeaderboard()
      .then(setLeaderboard)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { leaderboard, loading, error };
}

export function useSalesReport() {
  const [reports, setReports] = useState<SalesReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    salesReportRepo.getReports()
      .then(setReports)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { reports, loading, error };
}

export function useMessages() {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messageRepo.getThreads()
      .then(data => {
        setThreads(data);
        if (data.length > 0) setActiveThreadId(data[0].id);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeThreadId) return;
    messageRepo.getMessages(activeThreadId).then(setMessages);
  }, [activeThreadId]);

  const sendMessage = async (content: string) => {
    if (!activeThreadId || !content.trim()) return;
    const msg = await messageRepo.sendMessage(activeThreadId, content);
    setMessages(prev => [...prev, msg]);
  };

  return {
    threads,
    activeThreadId,
    setActiveThreadId,
    messages,
    loading,
    sendMessage,
  };
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsRepo.getSettings()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  const updateSettings = async (newSettings: AppSettings) => {
    const updated = await settingsRepo.updateSettings(newSettings);
    setSettings(updated);
    return updated;
  };

  return { settings, loading, updateSettings };
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await contactRepo.getContacts();
      setContacts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const updateStatus = async (id: string, status: 'unread' | 'read' | 'replied') => {
    const updated = await contactRepo.updateStatus(id, status);
    setContacts(prev => prev.map(c => (c.id === id ? updated : c)));
    return updated;
  };

  const deleteContact = async (id: string) => {
    await contactRepo.deleteContact(id);
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return { contacts, loading, error, refetch: fetchContacts, updateStatus, deleteContact };
}

export function useAnalytics(pollInterval = 10000) {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    try {
      const data = await analyticsRepo.getSummary();
      setSummary(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load analytics summary');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
    if (pollInterval > 0) {
      const interval = setInterval(fetchSummary, pollInterval);
      return () => clearInterval(interval);
    }
  }, [fetchSummary, pollInterval]);

  return { summary, loading, error, refetch: fetchSummary };
}

