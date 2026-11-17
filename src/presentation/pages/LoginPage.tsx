import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, KeyRound, Flame } from 'lucide-react';
import { useAuth } from '../../application/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage: React.FC = () => {
  const { login, loginAsAdmin } = useAuth();
  const [username, setUsername] = useState('hhh');
  const [password, setPassword] = useState('hhh');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Only allow admin account hhh / hhh
    if (username.trim() !== 'hhh' || password !== 'hhh') {
      setError('Trang quản trị chỉ cho phép tài khoản Admin: hhh / hhh');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email: username.trim(), password });
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdminLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await loginAsAdmin();
    } catch (err: any) {
      setError(err.message || 'Không thể đăng nhập admin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center p-4 selection:bg-[#5D5FEF] selection:text-white font-poppins">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-[0px_10px_35px_rgba(237,242,246,0.8)] border border-[#EFF1F6] p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-[20px] bg-[#5D5FEF] flex items-center justify-center shadow-[0px_6px_20px_rgba(93,95,239,0.35)] text-white mb-4">
            <Flame className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#151D48] tracking-tight">MindPhoenix Admin</h2>
          <p className="text-xs text-[#737791] mt-1.5">
            Cổng quản trị hệ thống nội bộ (Tài khoản cố định)
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4F5FF] text-[#5D5FEF] rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin duy nhất: hhh / hhh</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#FFE2E5] border border-[#FA5A7D]/20 text-[#FA5A7D] text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Tài khoản Admin"
            type="text"
            placeholder="hhh"
            value={username}
            onChange={e => setUsername(e.target.value)}
            icon={<KeyRound className="w-4 h-4" />}
            required
          />

          <Input
            label="Mật khẩu Admin"
            type="password"
            placeholder="hhh"
            value={password}
            onChange={e => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4 py-3"
            isLoading={isLoading}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Đăng nhập Quản trị viên
          </Button>
        </form>

        {/* Quick Demo Access Button */}
        <div className="mt-6 pt-6 border-t border-[#EFF1F6]">
          <button
            type="button"
            onClick={handleQuickAdminLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#F4F5FF] hover:bg-[#E8EAFF] border border-[#5D5FEF]/20 text-[#5D5FEF] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#5D5FEF] text-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#151D48] group-hover:text-[#5D5FEF]">
                  1-Click Admin Access
                </p>
                <p className="text-[11px] text-[#737791]">Tự động điền tài khoản hhh / hhh</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white text-[#5D5FEF] px-2.5 py-1 rounded-lg shadow-sm">
              Đăng nhập
            </span>
          </button>
        </div>

        {/* Notice for MindPhoenix Users */}
        <div className="mt-6 p-3 rounded-xl bg-[#F8F9FA] text-center border border-[#EFF1F6]">
          <p className="text-[11px] text-[#737791]">
            🔒 Trang Admin không mở đăng ký tự do. Học sinh / người dùng hãy truy cập website chính <strong className="text-[#151D48]">mindphoenix.xyz</strong> để Sign In / Sign Up.
          </p>
        </div>
      </div>
    </div>
  );
};
