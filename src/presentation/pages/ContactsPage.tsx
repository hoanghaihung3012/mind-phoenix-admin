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
  Copy,
  Check,
} from 'lucide-react';
import { useContacts } from '../../application/hooks';
import { useLanguage } from '../../application/LanguageContext';
import { Card, Button, Badge, Modal } from '../components/ui';
import { Contact } from '../../domain/entities';

export const ContactsPage: React.FC = () => {
  const { contacts, loading, refetch, updateStatus, deleteContact } = useContacts();
  const { t, language } = useLanguage();

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
      return date.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US', {
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
        return <Badge variant="warning">{t('statusUnread')}</Badge>;
      case 'read':
        return <Badge variant="info">{t('statusRead')}</Badge>;
      case 'replied':
        return <Badge variant="success">{t('statusReplied')}</Badge>;
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
    const confirmMsg = language === 'vi'
      ? 'Bạn có chắc chắn muốn xóa liên hệ này không?'
      : 'Are you sure you want to delete this contact?';
    if (window.confirm(confirmMsg)) {
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
              {t('contactsTitle')}
            </h1>
            <span className="bg-[#5D5FEF]/10 text-[#5D5FEF] font-semibold text-xs px-2.5 py-0.5 rounded-full">
              {totalCount} {language === 'vi' ? 'yêu cầu' : 'inquiries'}
            </span>
          </div>
          <p className="text-xs text-[#737791] mt-1">
            {t('contactsSub')}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          icon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />}
        >
          {t('refresh')}
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#F8F9FA] shadow-[0px_4px_20px_rgba(238,238,238,0.5)] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#737791]">
              {language === 'vi' ? 'Tổng liên hệ nhận được' : 'Total Inquiries'}
            </div>
            <div className="text-2xl font-bold text-[#151D48] mt-1">{totalCount}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#5D5FEF]/10 text-[#5D5FEF] flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#F8F9FA] shadow-[0px_4px_20px_rgba(238,238,238,0.5)] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#FFA800]">
              {language === 'vi' ? 'Chưa xử lý (Mới)' : 'Unprocessed (New)'}
            </div>
            <div className="text-2xl font-bold text-[#FFA800] mt-1">{unreadCount}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FFF4DE] text-[#FFA800] flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#F8F9FA] shadow-[0px_4px_20px_rgba(238,238,238,0.5)] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#3CD856]">
              {language === 'vi' ? 'Đã liên hệ phản hồi' : 'Replied & Handled'}
            </div>
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
              placeholder={t('searchContactPlaceholder')}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#EFF1F6] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#151D48] placeholder:text-[#A0A4B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 focus:border-[#5D5FEF] transition-all"
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: t('statusAll'), count: totalCount },
              { id: 'unread', label: t('statusUnread'), count: unreadCount },
              { id: 'read', label: t('statusRead'), count: readCount },
              { id: 'replied', label: t('statusReplied'), count: repliedCount },
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
            <span>{t('loading')}</span>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-3xl bg-[#F9FAFB] flex items-center justify-center text-[#A0A4B8] mx-auto mb-3">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-[#151D48]">
              {language === 'vi' ? 'Không có thông tin liên hệ nào' : 'No Inquiries Found'}
            </h3>
            <p className="text-xs text-[#737791] mt-1 max-w-sm mx-auto">
              {searchTerm || statusFilter !== 'all'
                ? (language === 'vi' ? 'Không tìm thấy kết quả phù hợp với điều kiện tìm kiếm và bộ lọc của bạn.' : 'No results matching your filters.')
                : (language === 'vi' ? 'Chưa có khách hàng nào gửi thông tin liên hệ qua website.' : 'No customer messages submitted yet.')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F8F9FA] text-[11px] font-bold text-[#A0A4B8] uppercase tracking-wider">
                  <th className="pb-3.5 pr-4">{t('colContactSender')}</th>
                  <th className="pb-3.5 px-4">Email</th>
                  <th className="pb-3.5 px-4">{language === 'vi' ? 'Số điện thoại' : 'Phone'}</th>
                  <th className="pb-3.5 px-4">{t('colMessageSnippet')}</th>
                  <th className="pb-3.5 px-4">{t('colReceivedAt')}</th>
                  <th className="pb-3.5 px-4">{t('colStatus')}</th>
                  <th className="pb-3.5 pl-4 text-right">{t('actions')}</th>
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
                                <span className="w-2 h-2 rounded-full bg-[#FA5A7D] shrink-0" title={t('statusUnread')} />
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
                            title="Copy Email"
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
                            title="Copy Phone"
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
                          <option value="unread">{t('statusUnread')}</option>
                          <option value="read">{t('statusRead')}</option>
                          <option value="replied">{t('statusReplied')}</option>
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
                            title="View"
                            icon={<Eye className="w-3.5 h-3.5" />}
                          >
                            {language === 'vi' ? 'Xem' : 'View'}
                          </Button>
                          <button
                            type="button"
                            onClick={() => handleDelete(contact.id)}
                            disabled={deletingId === contact.id}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
                            title={t('delete')}
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
          title={t('detailModalTitle')}
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
                    <span>{language === 'vi' ? 'Gửi lúc:' : 'Sent at:'} {formatDate(selectedContact.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div>{getStatusBadge(selectedContact.status)}</div>
            </div>

            {/* Contact Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-[#EFF1F6] bg-white">
                <span className="text-[10px] uppercase font-bold text-[#A0A4B8] tracking-wider block mb-1">
                  Email
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
                  {language === 'vi' ? 'Số điện thoại' : 'Phone'}
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
                <span>{language === 'vi' ? 'Nội dung tin nhắn khách gửi:' : 'Message Content:'}</span>
              </label>
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#EFF1F6] text-[#151D48] leading-relaxed whitespace-pre-wrap font-sans">
                {selectedContact.message}
              </div>
            </div>

            {/* Update Status In Modal */}
            <div className="pt-2 border-t border-[#F8F9FA] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#737791] font-semibold">
                  {language === 'vi' ? 'Cập nhật trạng thái:' : 'Update Status:'}
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
                  <option value="unread">{t('statusUnread')}</option>
                  <option value="read">{t('statusRead')}</option>
                  <option value="replied">{t('statusReplied')}</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EFF1F6] text-[#151D48] hover:bg-gray-50 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'vi' ? 'Gọi ngay' : 'Call'}</span>
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
                  <span>{language === 'vi' ? 'Gửi Email phản hồi' : 'Reply by Email'}</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};