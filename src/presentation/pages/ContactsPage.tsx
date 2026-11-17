import React, { useState, useMemo } from 'react';
import {
  Inbox,
  Search,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  CheckCircle,
  Eye,
  Trash2,
  RefreshCw,
  Clock,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { useContacts } from '../../application/hooks';
import { Card, Button, Badge, Modal } from '../components/ui';
import { Contact } from '../../domain/entities';

export const ContactsPage: React.FC = () => {
  const { contacts, loading, refetch, updateStatus, deleteContact } = useContacts();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Copy helper
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Metrics
  const totalCount = contacts.length;
  const unreadCount = contacts.filter(c => c.status === 'unread').length;
  const repliedCount = contacts.filter(c => c.status === 'replied').length;
  const readCount = contacts.filter(c => c.status === 'read').length;

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, statusFilter]);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const getStatusBadge = (status: Contact['status']) => {
    switch (status) {
      case 'unread':
        return <Badge variant="warning">Chưa đọc</Badge>;
      case 'read':
        return <Badge variant="info">Đã xem</Badge>;
      case 'replied':
        return <Badge variant="success">Đã liên hệ</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-indigo-500',
      'bg-emerald-500',
      'bg-rose-500',
      'bg-amber-500',
      'bg-sky-500',
      'bg-purple-500',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa liên hệ này không?')) {
      setDeletingId(id);
      try {
        await deleteContact(id);
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#151D48] tracking-tight">
              Quản lý thông tin liên hệ khách gửi
            </h1>
            <span className="bg-[#5D5FEF]/10 text-[#5D5FEF] font-semibold text-xs px-2.5 py-0.5 rounded-full">
              {totalCount} yêu cầu
            </span>
          </div>
          <p className="text-xs text-[#737791] mt-1">
            Xem và xử lý thông tin liên hệ (Tên, Email, Số điện thoại, Lời nhắn) khách gửi qua Contact Us
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          icon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />}
        >
          Làm mới
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#F8F9FA] shadow-[0px_4px_20px_rgba(238,238,238,0.5)] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#737791]">Tổng liên hệ nhận được</div>
            <div className="text-2xl font-bold text-[#151D48] mt-1">{totalCount}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#5D5FEF]/10 text-[#5D5FEF] flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#F8F9FA] shadow-[0px_4px_20px_rgba(238,238,238,0.5)] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#FFA800]">Chưa xử lý (Mới)</div>
            <div className="text-2xl font-bold text-[#FFA800] mt-1">{unreadCount}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FFF4DE] text-[#FFA800] flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#F8F9FA] shadow-[0px_4px_20px_rgba(238,238,238,0.5)] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#3CD856]">Đã liên hệ phản hồi</div>
            <div className="text-2xl font-bold text-[#3CD856] mt-1">{repliedCount}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#E6FBF2] text-[#3CD856] flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search & Status Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#737791] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại, nội dung..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#EFF1F6] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#151D48] placeholder:text-[#A0A4B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 focus:border-[#5D5FEF] transition-all"
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Tất cả', count: totalCount },
              { id: 'unread', label: 'Chưa đọc', count: unreadCount },
              { id: 'read', label: 'Đã xem', count: readCount },
              { id: 'replied', label: 'Đã liên hệ', count: repliedCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? 'bg-[#5D5FEF] text-white shadow-[0px_4px_12px_rgba(93,95,239,0.25)]'
                    : 'bg-[#F9FAFB] text-[#737791] hover:bg-[#F3F4F6] hover:text-[#151D48]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    statusFilter === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Contacts List / Table */}
      <Card>
        {loading && contacts.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#737791]">
            <div className="w-8 h-8 border-3 border-[#5D5FEF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span>Đang tải danh sách liên hệ...</span>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-3xl bg-[#F9FAFB] flex items-center justify-center text-[#A0A4B8] mx-auto mb-3">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-[#151D48]">Không có thông tin liên hệ nào</h3>
            <p className="text-xs text-[#737791] mt-1 max-w-sm mx-auto">
              {searchTerm || statusFilter !== 'all'
                ? 'Không tìm thấy kết quả phù hợp với điều kiện tìm kiếm và bộ lọc của bạn.'
                : 'Chưa có khách hàng nào gửi thông tin liên hệ qua website.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F8F9FA] text-[11px] font-bold text-[#A0A4B8] uppercase tracking-wider">
                  <th className="pb-3.5 pr-4">Khách hàng</th>
                  <th className="pb-3.5 px-4">Email</th>
                  <th className="pb-3.5 px-4">Số điện thoại</th>
                  <th className="pb-3.5 px-4">Nội dung liên hệ</th>
                  <th className="pb-3.5 px-4">Thời gian</th>
                  <th className="pb-3.5 px-4">Trạng thái</th>
                  <th className="pb-3.5 pl-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F9FA]">
                {filteredContacts.map(contact => {
                  const initial = contact.name.trim().charAt(0).toUpperCase() || 'K';
                  return (
                    <tr
                      key={contact.id}
                      className="hover:bg-[#F9FAFB]/70 transition-colors text-xs"
                    >
                      {/* Customer Name */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full ${getAvatarColor(
                              contact.name
                            )} text-white font-bold flex items-center justify-center shrink-0 shadow-xs`}
                          >
                            {initial}
                          </div>
                          <div>
                            <div className="font-bold text-[#151D48] flex items-center gap-1.5">
                              <span>{contact.name}</span>
                              {contact.status === 'unread' && (
                                <span className="w-2 h-2 rounded-full bg-[#FA5A7D] shrink-0" title="Chưa đọc" />
                              )}
                            </div>
                            <div className="text-[11px] text-[#737791] font-mono">
                              #{contact.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-[#5D5FEF] hover:underline font-medium"
                          >
                            {contact.email}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopy(contact.email, `email-${contact.id}`)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded"
                            title="Sao chép email"
                          >
                            {copiedField === `email-${contact.id}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${contact.phone}`}
                            className="font-medium text-[#151D48] hover:text-[#5D5FEF]"
                          >
                            {contact.phone}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopy(contact.phone, `phone-${contact.id}`)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded"
                            title="Sao chép số điện thoại"
                          >
                            {copiedField === `phone-${contact.id}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Message preview */}
                      <td className="py-4 px-4 max-w-xs">
                        <p className="line-clamp-2 text-[#737791]" title={contact.message}>
                          {contact.message}
                        </p>
                      </td>

                      {/* Created Date */}
                      <td className="py-4 px-4 text-[#737791] text-[11px] whitespace-nowrap">
                        {formatDate(contact.createdAt)}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <select
                          value={contact.status}
                          onChange={e =>
                            updateStatus(contact.id, e.target.value as Contact['status'])
                          }
                          className={`text-xs font-semibold rounded-lg px-2.5 py-1 border outline-none cursor-pointer ${
                            contact.status === 'unread'
                              ? 'bg-[#FFF4DE] text-[#FFA800] border-[#FFA800]/30'
                              : contact.status === 'replied'
                              ? 'bg-[#E6FBF2] text-[#3CD856] border-[#3CD856]/30'
                              : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}
                        >
                          <option value="unread">Chưa đọc</option>
                          <option value="read">Đã xem</option>
                          <option value="replied">Đã liên hệ</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pl-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedContact(contact);
                              if (contact.status === 'unread') {
                                updateStatus(contact.id, 'read');
                              }
                            }}
                            title="Xem chi tiết"
                            icon={<Eye className="w-3.5 h-3.5" />}
                          >
                            Xem
                          </Button>
                          <button
                            type="button"
                            onClick={() => handleDelete(contact.id)}
                            disabled={deletingId === contact.id}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
                            title="Xóa liên hệ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Contact Details Modal */}
      {selectedContact && (
        <Modal
          isOpen={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          title="Chi tiết thông tin liên hệ của khách hàng"
        >
          <div className="space-y-5 text-xs">
            {/* Top info card */}
            <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#EFF1F6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${getAvatarColor(
                    selectedContact.name
                  )} text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {selectedContact.name.trim().charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#151D48]">
                    {selectedContact.name}
                  </h3>
                  <div className="text-[11px] text-[#737791] flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#5D5FEF]" />
                    <span>Gửi lúc: {formatDate(selectedContact.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div>{getStatusBadge(selectedContact.status)}</div>
            </div>

            {/* Contact Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-[#EFF1F6] bg-white">
                <span className="text-[10px] uppercase font-bold text-[#A0A4B8] tracking-wider block mb-1">
                  Địa chỉ Email
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="font-semibold text-[#5D5FEF] hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedContact.email, 'modal-email')}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    {copiedField === 'modal-email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[#EFF1F6] bg-white">
                <span className="text-[10px] uppercase font-bold text-[#A0A4B8] tracking-wider block mb-1">
                  Số điện thoại
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="font-semibold text-[#151D48] hover:text-[#5D5FEF]"
                  >
                    {selectedContact.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedContact.phone, 'modal-phone')}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    {copiedField === 'modal-phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="text-[11px] font-bold text-[#151D48] flex items-center gap-1.5 mb-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#5D5FEF]" />
                <span>Nội dung tin nhắn khách gửi:</span>
              </label>
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#EFF1F6] text-[#151D48] leading-relaxed whitespace-pre-wrap font-sans">
                {selectedContact.message}
              </div>
            </div>

            {/* Update Status In Modal */}
            <div className="pt-2 border-t border-[#F8F9FA] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#737791] font-semibold">
                  Cập nhật trạng thái:
                </span>
                <select
                  value={selectedContact.status}
                  onChange={async e => {
                    const newStatus = e.target.value as Contact['status'];
                    const updated = await updateStatus(selectedContact.id, newStatus);
                    setSelectedContact(updated);
                  }}
                  className="text-xs font-semibold rounded-xl px-3 py-1.5 border border-[#EFF1F6] bg-white text-[#151D48] outline-none"
                >
                  <option value="unread">Chưa đọc</option>
                  <option value="read">Đã xem</option>
                  <option value="replied">Đã liên hệ</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EFF1F6] text-[#151D48] hover:bg-gray-50 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Gọi ngay</span>
                </a>
                <a
                  href={`mailto:${selectedContact.email}?subject=Phản hồi liên hệ từ Mind Phoenix&body=Chào ${encodeURIComponent(
                    selectedContact.name
                  )},%0D%0A%0D%0ACảm ơn bạn đã liên hệ với Mind Phoenix...`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#5D5FEF] text-white hover:bg-[#4A4CD8] font-semibold shadow-xs"
                  onClick={() => {
                    updateStatus(selectedContact.id, 'replied');
                    setSelectedContact(prev => prev ? { ...prev, status: 'replied' } : null);
                  }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Gửi Email phản hồi</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
