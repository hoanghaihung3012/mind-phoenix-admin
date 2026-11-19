import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'vi' | 'en';

export interface Translations {
  [key: string]: string;
}

const VI_TRANSLATIONS: Translations = {
  // Brand & Header
  brandTitle: 'MindPhoenix',
  adminPortal: 'Cổng Quản Trị',
  searchPlaceholder: 'Tìm kiếm tại đây...',
  notifications: 'Thông báo',
  account: 'Tài khoản',
  adminRole: 'Quản trị viên',

  // Menu Sidebar
  menuDashboard: 'Dashboard',
  menuAnalytics: 'User & Analytics',
  menuLeaderboard: 'Bảng Xếp Hạng',
  menuOrders: 'Đơn Hàng',
  menuProducts: 'Sản Phẩm',
  menuContacts: 'Khách Hàng Liên Hệ',
  menuMessages: 'Tin Nhắn & Hỗ Trợ',
  menuSettings: 'Cài Đặt Hệ Thống',
  menuLogout: 'Đăng xuất',
  logoutConfirm: 'Bạn có chắc chắn muốn đăng xuất phiên quản trị?',

  // Common UI
  loading: 'Đang tải...',
  refresh: 'Làm mới',
  export: 'Xuất CSV',
  save: 'Lưu thay đổi',
  cancel: 'Hủy',
  delete: 'Xóa',
  close: 'Đóng',
  search: 'Tìm kiếm',
  filter: 'Bộ lọc',
  all: 'Tất cả',
  status: 'Trạng thái',
  actions: 'Thao tác',
  justNow: 'Vừa xong',
  secondsAgo: 'giây trước',
  minutesAgo: 'phút trước',
  hoursAgo: 'giờ trước',
  daysAgo: 'ngày trước',

  // Dashboard Page
  clientPulse: 'Real-time Client Pulse',
  pulseSubtitle: 'Hoạt động người dùng trên mindphoenix.xyz',
  pulseTitle: 'Giám sát Người Dùng & Tương Tác Trực Tuyến',
  totalUsersStat: 'Tổng tài khoản',
  onlineUsersStat: 'Đang Online',
  gamePlaysStat: 'Lượt chơi Game',
  viewAnalyticsBtn: 'Xem Analytics',
  todaySales: "Doanh Số Hôm Nay",
  salesSummary: 'Tổng quan bán hàng',
  totalSales: 'Tổng Doanh Số',
  totalOrders: 'Tổng Đơn Hàng',
  productSold: 'Sản Phẩm Đã Bán',
  newCustomers: 'Khách Hàng Mới',
  topPlayedGames: 'Top Game Được Chơi Nhiều',
  minigameSubtitle: 'Tương tác minigame giáo dục học sinh',
  topTools: 'Top Công Cụ Trợ Giảng',
  toolSubtitle: 'Tương tác tiện ích & sandbox lớp học',
  topScores: 'Bảng Vàng Điểm Cao',
  scoreSubtitle: 'Top kỷ lục điểm game client',
  viewDetails: 'Chi tiết',
  visitorInsights: 'Thông Tin Khách Ghé Thăm',
  totalRevenue: 'Tổng Doanh Thu',
  customerSatisfaction: 'Mức Độ Hài Lòng',
  targetVsReality: 'Mục Tiêu & Thực Tế',
  topProducts: 'Top Sản Phẩm Bán Chạy',
  salesMapping: 'Bản Đồ Bán Hàng Quốc Tế',
  volumeVsService: 'Khối Lượng & Mức Phục Vụ',

  // Analytics Page
  analyticsTitle: 'User & Client Analytics',
  analyticsSubtitle: 'Theo dõi người dùng online, lượt tương tác minigame, công cụ lớp học và kỷ lục điểm số client.',
  realtimeLive: 'Real-time Live',
  totalSystemUsers: 'Tổng User Hệ Thống',
  registeredAccounts: 'Tài khoản đăng ký',
  usersOnlineNow: 'Người Dùng Đang Online',
  membersAndGuests: 'thành viên · khách vãng lai',
  minigamePlays: 'Lượt Chơi Minigame',
  interactiveGames: 'tựa game tương tác',
  toolUsages: 'Lượt Dùng Công Cụ',
  toolsClassroom: 'Tiện ích & Sandbox lớp học',
  onlineSessionsTitle: 'Danh Sách Người Dùng & Khách Đang Online',
  onlineSessionsSub: 'Hiện có phiên truy cập hoạt động trong 90 giây qua',
  autoRefreshEvery: 'Tự động cập nhật mỗi 8s',
  colUserDevice: 'Người dùng / Thiết bị',
  colRole: 'Vai trò',
  colCurrentPage: 'Trang đang mở',
  colRealtimeActivity: 'Hoạt động thời gian thực',
  colLastActive: 'Hoạt động gần nhất',
  noActiveSessions: 'Chưa có người dùng trực tuyến trong 90 giây qua. Mở website client để xem live session!',
  memberBadge: 'Thành viên',
  guestBadge: 'Khách vãng lai',
  topGamesRanking: 'Top Game Được Chơi Nhiều Nhất',
  topGamesSub: 'Xếp hạng dựa trên lượt chơi và tương tác minigame của học sinh',
  topToolsRanking: 'Top Công Cụ Trợ Giảng & Học Tập',
  topToolsSub: 'Số lần giáo viên và học sinh mở các công cụ tương tác',
  hallOfFame: 'Bảng Vàng Điểm Cao (Top Game Scores)',
  hallOfFameSub: 'Kỷ lục điểm số cao nhất của các minigame được ghi nhận',
  activityStream: 'Nhật Ký Tương Tác Thời Gian Thực',
  activityStreamSub: 'Dòng sự kiện hoạt động của người dùng trên toàn bộ client',
  interestRate: 'Tỷ lệ quan tâm',
  usageRate: 'Tỷ lệ sử dụng',
  lastPlayed: 'Chơi gần nhất',
  lastUsed: 'Dùng gần nhất',
  rankCol: 'Hạng',
  playerCol: 'Người chơi',
  gameCol: 'Tựa Game',
  scoreCol: 'Điểm số',

  // Messages Page
  messagesSupportTitle: 'Messages & Customer Support',
  messagesSupportSub: 'Quản lý và phản hồi tin nhắn trực tiếp với từng người dùng & khách ghé thăm',
  conversations: 'Hội thoại',
  livePolling: 'Live Polling',
  noMessagesYet: 'Chưa có tin nhắn nào từ người dùng client.',
  deleteConversation: 'Xóa hội thoại',
  confirmDeleteChat: 'Bạn có chắc muốn xóa cuộc hội thoại này?',
  typeReplyPlaceholder: 'Nhập câu trả lời cho người dùng (Enter để gửi)...',
  replyBtn: 'Trả lời',
  selectConversationPrompt: 'Chọn một cuộc hội thoại từ danh sách bên trái để phản hồi.',

  // Orders Page
  ordersTitle: 'Quản Lý Đơn Hàng',
  ordersSub: 'Theo dõi tình trạng đơn đặt hàng và giao dịch',
  addOrderBtn: 'Thêm Đơn Hàng',
  filterStatus: 'Lọc trạng thái',
  allStatuses: 'Tất cả trạng thái',
  completed: 'Hoàn thành',
  processing: 'Đang xử lý',
  pending: 'Chờ xử lý',
  cancelled: 'Đã hủy',
  colOrderCode: 'Mã đơn',
  colCustomer: 'Khách hàng',
  colTotal: 'Tổng tiền',
  colItems: 'Số lượng',
  colPaymentMethod: 'Phương thức',
  colDate: 'Ngày tạo',
  modalAddOrder: 'Tạo đơn hàng mới',
  customerNameLabel: 'Tên khách hàng',
  customerEmailLabel: 'Email khách hàng',
  totalAmountLabel: 'Tổng số tiền ($)',
  paymentMethodLabel: 'Phương thức thanh toán',

  // Products Page
  productsTitle: 'Quản Lý Sản Phẩm',
  productsSub: 'Danh mục thiết bị và học liệu Mind Phoenix',
  addProductBtn: 'Thêm Sản Phẩm',
  colProduct: 'Sản phẩm',
  colCategory: 'Danh mục',
  colSku: 'Mã SKU',
  colPrice: 'Đơn giá',
  colStock: 'Tồn kho',
  colPopularity: 'Độ phổ biến',
  modalAddProduct: 'Thêm sản phẩm mới',
  productNameLabel: 'Tên sản phẩm',
  categoryLabel: 'Danh mục',
  priceLabel: 'Giá bán ($)',
  stockLabel: 'Số lượng kho',

  // Leaderboard Page
  leaderboardTitle: 'Bảng Xếp Hạng Học Viên',
  leaderboardSub: 'Tôn vinh thành tích học tập và giải đố minigame xuất sắc',
  searchStudentPlaceholder: 'Tìm học sinh, trường học, danh hiệu...',
  totalRanked: 'Tổng học viên xếp hạng',
  colRank: 'Hạng',
  colStudent: 'Học viên',
  colLevel: 'Cấp độ',
  colPoints: 'Điểm tích lũy',
  colStreak: 'Chuỗi thắng',
  colSchool: 'Trường học',

  // Contacts Page
  contactsTitle: 'Hộp Thư Khách Hàng Liên Hệ',
  contactsSub: 'Phản hồi yêu cầu hợp tác, bản quyền và tư vấn từ đối tác',
  searchContactPlaceholder: 'Tìm theo tên, email, SĐT hoặc nội dung...',
  statusAll: 'Tất cả',
  statusUnread: 'Chưa đọc',
  statusRead: 'Đã đọc',
  statusReplied: 'Đã phản hồi',
  colContactSender: 'Người gửi',
  colPhoneEmail: 'Liên hệ',
  colMessageSnippet: 'Nội dung tóm tắt',
  colStatus: 'Trạng thái',
  colReceivedAt: 'Thời gian gửi',
  detailModalTitle: 'Chi Tiết Thư Liên Hệ',
  markAsRead: 'Đánh dấu đã đọc',
  markAsReplied: 'Đánh dấu đã phản hồi',

  // Settings Page
  settingsTitle: 'Cài Đặt Hệ Thống & Quản Trị',
  settingsSub: 'Tùy chỉnh thông tin hồ sơ, thông báo và cấu hình',
  profileTab: 'Hồ Sơ Quản Trị',
  notificationsTab: 'Thông Báo',
  appearanceTab: 'Giao Diện',
  adminNameLabel: 'Tên quản trị viên',
  adminEmailLabel: 'Email / Username',
  adminRoleLabel: 'Vai trò tài khoản',
  languagePreference: 'Ngôn ngữ giao diện',
  timezoneLabel: 'Múi giờ hệ thống',
  emailAlertsLabel: 'Cảnh báo qua email khi có đơn hàng / tin nhắn mới',
  orderUpdatesLabel: 'Cập nhật trạng thái đơn hàng thời gian thực',
  weeklyDigestLabel: 'Bản tin báo cáo tuần tự động',
  settingsSavedNotice: 'Đã lưu cấu hình cài đặt thành công!',

  // Login Page
  loginPortalTitle: 'Đăng Nhập Quản Trị Viên',
  loginPortalSub: 'Hệ thống quản trị bán hàng & người dùng Mind Phoenix',
  loginUserLabel: 'Tên đăng nhập',
  loginPassLabel: 'Mật khẩu',
  loginBtn: 'Đăng nhập trang quản trị',
  oneClickAdmin: '⚡ 1-Click Đăng Nhập Nhanh (hhh / hhh)',
  securityNotice: 'Trang quản trị chỉ cấp quyền cho tài khoản Admin duy nhất (hhh / hhh). Không hỗ trợ đăng ký tự do.',
  loginErrorWrongCreds: 'Tài khoản hoặc mật khẩu không chính xác. Sử dụng: hhh / hhh',
};

const EN_TRANSLATIONS: Translations = {
  // Brand & Header
  brandTitle: 'MindPhoenix',
  adminPortal: 'Admin Portal',
  searchPlaceholder: 'Search here...',
  notifications: 'Notifications',
  account: 'Account',
  adminRole: 'Administrator',

  // Menu Sidebar
  menuDashboard: 'Dashboard',
  menuAnalytics: 'User & Analytics',
  menuLeaderboard: 'Leaderboard',
  menuOrders: 'Orders',
  menuProducts: 'Products',
  menuContacts: 'Inquiries',
  menuMessages: 'Messages & Support',
  menuSettings: 'Settings',
  menuLogout: 'Sign Out',
  logoutConfirm: 'Are you sure you want to sign out of the admin portal?',

  // Common UI
  loading: 'Loading...',
  refresh: 'Refresh',
  export: 'Export CSV',
  save: 'Save Changes',
  cancel: 'Cancel',
  delete: 'Delete',
  close: 'Close',
  search: 'Search',
  filter: 'Filter',
  all: 'All',
  status: 'Status',
  actions: 'Actions',
  justNow: 'Just now',
  secondsAgo: 'seconds ago',
  minutesAgo: 'minutes ago',
  hoursAgo: 'hours ago',
  daysAgo: 'days ago',

  // Dashboard Page
  clientPulse: 'Real-time Client Pulse',
  pulseSubtitle: 'User activity across mindphoenix.xyz',
  pulseTitle: 'Real-Time User Monitoring & Live Engagement',
  totalUsersStat: 'Total Users',
  onlineUsersStat: 'Online Now',
  gamePlaysStat: 'Game Plays',
  viewAnalyticsBtn: 'View Analytics',
  todaySales: "Today's Sales",
  salesSummary: 'Sales Summary',
  totalSales: 'Total Sales',
  totalOrders: 'Total Orders',
  productSold: 'Products Sold',
  newCustomers: 'New Customers',
  topPlayedGames: 'Top Played Games',
  minigameSubtitle: 'Student interactive educational minigames',
  topTools: 'Top Classroom Tools',
  toolSubtitle: 'Classroom utilities & math sandbox engagement',
  topScores: 'Top Game Scores',
  scoreSubtitle: 'Client game high-score records',
  viewDetails: 'Details',
  visitorInsights: 'Visitor Insights',
  totalRevenue: 'Total Revenue',
  customerSatisfaction: 'Customer Satisfaction',
  targetVsReality: 'Target vs Reality',
  topProducts: 'Top Products',
  salesMapping: 'Sales Mapping by Country',
  volumeVsService: 'Volume vs Service Level',

  // Analytics Page
  analyticsTitle: 'User & Client Analytics',
  analyticsSubtitle: 'Monitor live online users, minigame activity, classroom tools, and client high scores.',
  realtimeLive: 'Real-time Live',
  totalSystemUsers: 'Total Registered Users',
  registeredAccounts: 'Registered student accounts',
  usersOnlineNow: 'Users Online Now',
  membersAndGuests: 'members · guest visitors',
  minigamePlays: 'Minigame Plays',
  interactiveGames: 'interactive game titles',
  toolUsages: 'Tool Usages',
  toolsClassroom: 'Utilities & Classroom Sandbox',
  onlineSessionsTitle: 'Active Online Users & Guest Sessions',
  onlineSessionsSub: 'Active sessions detected within the past 90 seconds',
  autoRefreshEvery: 'Auto-refreshes every 8s',
  colUserDevice: 'User / Session ID',
  colRole: 'Role',
  colCurrentPage: 'Current Page',
  colRealtimeActivity: 'Real-time Activity',
  colLastActive: 'Last Active',
  noActiveSessions: 'No active users in the past 90 seconds. Open the client site to see live sessions!',
  memberBadge: 'Member',
  guestBadge: 'Guest',
  topGamesRanking: 'Top Played Games Ranking',
  topGamesSub: 'Ranked by total student plays and puzzle sessions',
  topToolsRanking: 'Top Classroom & Student Tools',
  topToolsSub: 'Times teachers and students launched interactive utilities',
  hallOfFame: 'Hall of Fame (Top Game Scores)',
  hallOfFameSub: 'Highest recorded minigame scores across the platform',
  activityStream: 'Live Client Activity Stream',
  activityStreamSub: 'Real-time feed of user interactions across all games and tools',
  interestRate: 'Interest share',
  usageRate: 'Usage share',
  lastPlayed: 'Last played',
  lastUsed: 'Last used',
  rankCol: 'Rank',
  playerCol: 'Player',
  gameCol: 'Game Title',
  scoreCol: 'Score',

  // Messages Page
  messagesSupportTitle: 'Messages & Customer Support',
  messagesSupportSub: 'Direct customer support and real-time chat with students & visitors',
  conversations: 'Conversations',
  livePolling: 'Live Polling',
  noMessagesYet: 'No messages received from client users yet.',
  deleteConversation: 'Delete conversation',
  confirmDeleteChat: 'Are you sure you want to delete this conversation?',
  typeReplyPlaceholder: 'Type a reply for the user (Press Enter to send)...',
  replyBtn: 'Reply',
  selectConversationPrompt: 'Select a conversation from the left to start replying.',

  // Orders Page
  ordersTitle: 'Orders Management',
  ordersSub: 'Track customer orders, payments and delivery fulfillment',
  addOrderBtn: 'Add Order',
  filterStatus: 'Filter status',
  allStatuses: 'All statuses',
  completed: 'Completed',
  processing: 'Processing',
  pending: 'Pending',
  cancelled: 'Cancelled',
  colOrderCode: 'Order #',
  colCustomer: 'Customer',
  colTotal: 'Total Amount',
  colItems: 'Items',
  colPaymentMethod: 'Payment',
  colDate: 'Created Date',
  modalAddOrder: 'Create New Order',
  customerNameLabel: 'Customer Name',
  customerEmailLabel: 'Customer Email',
  totalAmountLabel: 'Total Amount ($)',
  paymentMethodLabel: 'Payment Method',

  // Products Page
  productsTitle: 'Product Catalog',
  productsSub: 'Manage educational devices and Mind Phoenix merchandise',
  addProductBtn: 'Add Product',
  colProduct: 'Product',
  colCategory: 'Category',
  colSku: 'SKU',
  colPrice: 'Price',
  colStock: 'Stock',
  colPopularity: 'Popularity',
  modalAddProduct: 'Add New Product',
  productNameLabel: 'Product Name',
  categoryLabel: 'Category',
  priceLabel: 'Price ($)',
  stockLabel: 'Stock Quantity',

  // Leaderboard Page
  leaderboardTitle: 'Student Leaderboard',
  leaderboardSub: 'Celebrating top student achievements and minigame puzzle masters',
  searchStudentPlaceholder: 'Search student, school, titles...',
  totalRanked: 'Total Ranked Students',
  colRank: 'Rank',
  colStudent: 'Student',
  colLevel: 'Level',
  colPoints: 'XP Points',
  colStreak: 'Streak',
  colSchool: 'School',

  // Contacts Page
  contactsTitle: 'Customer Inquiries Inbox',
  contactsSub: 'Review partnerships, licensing inquiries and feedback',
  searchContactPlaceholder: 'Search by name, email, phone or message...',
  statusAll: 'All',
  statusUnread: 'Unread',
  statusRead: 'Read',
  statusReplied: 'Replied',
  colContactSender: 'Sender',
  colPhoneEmail: 'Contact Info',
  colMessageSnippet: 'Message Excerpt',
  colStatus: 'Status',
  colReceivedAt: 'Received At',
  detailModalTitle: 'Inquiry Details',
  markAsRead: 'Mark as Read',
  markAsReplied: 'Mark as Replied',

  // Settings Page
  settingsTitle: 'System Settings & Admin Preferences',
  settingsSub: 'Manage your administrator profile, notifications, and portal settings',
  profileTab: 'Admin Profile',
  notificationsTab: 'Notifications',
  appearanceTab: 'Appearance',
  adminNameLabel: 'Administrator Name',
  adminEmailLabel: 'Email / Username',
  adminRoleLabel: 'Account Role',
  languagePreference: 'Portal Language',
  timezoneLabel: 'System Timezone',
  emailAlertsLabel: 'Email alerts for new customer orders and contact inquiries',
  orderUpdatesLabel: 'Real-time order status updates',
  weeklyDigestLabel: 'Automated weekly performance summary digest',
  settingsSavedNotice: 'Settings saved successfully!',

  // Login Page
  loginPortalTitle: 'Admin Portal Login',
  loginPortalSub: 'Mind Phoenix sales & user management dashboard',
  loginUserLabel: 'Username',
  loginPassLabel: 'Password',
  loginBtn: 'Sign In to Portal',
  oneClickAdmin: '⚡ 1-Click Admin Access (hhh / hhh)',
  securityNotice: 'Restricted administrative portal. Only the designated Admin account (hhh / hhh) is permitted.',
  loginErrorWrongCreds: 'Incorrect credentials. Please use: hhh / hhh',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'mindphoenix_dashboard_lang';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'vi' || saved === 'en') return saved;
    }
    return 'vi'; // Default to Vietnamese
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const t = (key: string, fallback?: string): string => {
    const dict = language === 'vi' ? VI_TRANSLATIONS : EN_TRANSLATIONS;
    return dict[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
