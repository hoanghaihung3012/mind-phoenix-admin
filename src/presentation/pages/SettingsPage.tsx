import React, { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { useSettings } from '../../application/hooks';
import { Card, Button, Input, Select, Avatar } from '../components/ui';

export const SettingsPage: React.FC = () => {
  const { settings, loading, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    name: 'Administrator',
    email: 'hhh',
    role: 'Admin',
    language: 'VIE (VN)',
    timezone: 'UTC+7 (Asia/Bangkok)',
    emailAlerts: true,
    orderUpdates: true,
    theme: 'light',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        name: settings.profile.name || 'Administrator',
        email: settings.profile.email || 'hhh',
        role: settings.profile.role || 'Admin',
        language: settings.profile.language || 'VIE (VN)',
        timezone: settings.profile.timezone || 'UTC+7 (Asia/Bangkok)',
        emailAlerts: settings.notifications.emailAlerts,
        orderUpdates: settings.notifications.orderUpdates,
        theme: settings.appearance.theme,
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    await updateSettings({
      ...settings,
      profile: {
        ...settings.profile,
        name: formData.name,
        email: formData.email,
        language: formData.language,
        timezone: formData.timezone,
      },
      notifications: {
        ...settings.notifications,
        emailAlerts: formData.emailAlerts,
        orderUpdates: formData.orderUpdates,
      },
      appearance: {
        ...settings.appearance,
        theme: formData.theme,
      },
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (loading && !settings) {
    return <div className="p-8 text-center text-sm text-[#737791]">Đang tải cài đặt...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Card title="System & Admin Profile Settings" subtitle="Quản lý tài khoản quản trị và tùy chỉnh hệ thống">
        {savedSuccess && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#DCFCE7] border border-[#3CD856]/30 text-[#15803D] text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Đã lưu cấu hình cài đặt thành công!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-5 pb-6 border-b border-[#EFF1F6]">
            <Avatar
              src={settings?.profile.avatar}
              name={formData.name}
              size="lg"
            />
            <div>
              <h4 className="text-base font-bold text-[#151D48]">{formData.name}</h4>
              <p className="text-xs text-[#737791]">Tài khoản Admin cố định: <strong className="text-[#5D5FEF]">hhh</strong></p>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Họ và tên"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Tài khoản / Email"
              value={formData.email}
              disabled
              className="bg-[#EFF1F6] cursor-not-allowed"
            />
            <Select
              label="Ngôn ngữ hiển thị"
              value={formData.language}
              onChange={e => setFormData({ ...formData, language: e.target.value })}
              options={[
                { value: 'VIE (VN)', label: 'Tiếng Việt (VIE)' },
                { value: 'Eng (US)', label: 'English (US)' },
              ]}
            />
            <Select
              label="Múi giờ"
              value={formData.timezone}
              onChange={e => setFormData({ ...formData, timezone: e.target.value })}
              options={[
                { value: 'UTC+7 (Asia/Bangkok)', label: 'UTC+7 (Vietnam, Bangkok)' },
                { value: 'UTC+0 (GMT)', label: 'UTC+0 (London, GMT)' },
                { value: 'UTC-5 (EST)', label: 'UTC-5 (New York)' },
              ]}
            />
          </div>

          {/* Notifications */}
          <div className="pt-4 border-t border-[#EFF1F6]">
            <h4 className="text-xs font-bold text-[#151D48] uppercase tracking-wider mb-3">Thông báo</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-[#151D48]">
                <input
                  type="checkbox"
                  checked={formData.emailAlerts}
                  onChange={e => setFormData({ ...formData, emailAlerts: e.target.checked })}
                  className="rounded text-[#5D5FEF] accent-[#5D5FEF] w-4 h-4"
                />
                <span>Nhận thông báo qua email khi có đơn hàng mới</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-[#151D48]">
                <input
                  type="checkbox"
                  checked={formData.orderUpdates}
                  onChange={e => setFormData({ ...formData, orderUpdates: e.target.checked })}
                  className="rounded text-[#5D5FEF] accent-[#5D5FEF] w-4 h-4"
                />
                <span>Cập nhật bảo mật và tài khoản Admin</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#EFF1F6]">
            <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
