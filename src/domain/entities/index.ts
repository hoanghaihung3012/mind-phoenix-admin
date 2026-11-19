export * from './Auth';

export interface DashboardMetrics {
  todaySales: {
    totalSales: number;
    salesChange: number;
    totalOrders: number;
    ordersChange: number;
    productSold: number;
    productSoldChange: number;
    newCustomers: number;
    newCustomersChange: number;
  };
  visitorInsights: Array<{
    month: string;
    loyalCustomers: number;
    newCustomers: number;
    uniqueVisitors: number;
  }>;
  totalRevenue: Array<{
    day: string;
    onlineSales: number;
    offlineSales: number;
  }>;
  customerSatisfaction: Array<{
    month: string;
    lastMonth: number;
    thisMonth: number;
  }>;
  targetVsReality: Array<{
    month: string;
    targetSales: number;
    realitySales: number;
  }>;
  topProducts: Array<{
    id: number;
    name: string;
    popularity: number;
    salesCount: number;
    color: string;
  }>;
  worldSalesMap: Array<{
    country: string;
    percentage: number;
    color: string;
  }>;
  volumeVsService: {
    volume: number;
    service: number;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  avatar: string;
  itemsCount: number;
  totalAmount: number;
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
  paymentMethod: string;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  rating: number;
  salesCount: number;
  popularity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  color: string;
  image?: string;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  level: number;
  points: number;
  school?: string;
  title?: string;
  streak?: number;
  status: string;
  // legacy optional fields for compatibility
  role?: string;
  dealsClosed?: number;
  totalRevenue?: number;
  targetAchievement?: number;
}

export interface SalesReportRow {
  id: string;
  period: string;
  region: string;
  channel: string;
  grossRevenue: number;
  discounts: number;
  netRevenue: number;
  costOfGoods: number;
  grossProfit: number;
  margin: number;
}

export interface MessageThread {
  id: string;
  contactName: string;
  contactEmail: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages?: Message[];
}

export interface Message {
  id: string;
  threadId: string;
  sender: 'user' | 'contact';
  content: string;
  timestamp: string;
}

export interface AppSettings {
  profile: {
    name: string;
    email: string;
    role: string;
    avatar: string;
    language: string;
    timezone: string;
  };
  notifications: {
    emailAlerts: boolean;
    orderUpdates: boolean;
    weeklyDigest: boolean;
    securityAlerts: boolean;
  };
  appearance: {
    theme: string;
    currency: string;
    compactView: boolean;
  };
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface ClientSession {
  sessionId: string;
  userId?: string | null;
  userName?: string | null;
  userEmail?: string | null;
  userAvatar?: string | null;
  role?: string | null;
  ip?: string;
  userAgent?: string;
  currentPage?: string;
  currentActivity?: string;
  firstSeenAt: string;
  lastSeenAt: string;
  isOnline?: boolean;
}

export interface AnalyticsEvent {
  id: string;
  sessionId: string;
  userId?: string | null;
  userName?: string | null;
  type: 'game_play' | 'tool_use' | 'score' | 'page_view' | 'interaction';
  targetId: string;
  targetTitle: string;
  score?: number;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface GameScoreRecord {
  id: string;
  gameId: string;
  gameTitle: string;
  playerName: string;
  userId?: string | null;
  score: number;
  createdAt: string;
}

export interface TopGameStat {
  id: string;
  title: string;
  playCount: number;
  lastPlayedAt: string;
}

export interface TopToolStat {
  id: string;
  title: string;
  usageCount: number;
  lastUsedAt: string;
}

export interface AnalyticsSummary {
  totalUsers: number;
  onlineUsers: number;
  onlineMembers: number;
  onlineGuests: number;
  totalGamePlays: number;
  totalToolUsages: number;
  topGames: TopGameStat[];
  topTools: TopToolStat[];
  topScores: GameScoreRecord[];
  recentActivities: AnalyticsEvent[];
  activeSessions: ClientSession[];
}

