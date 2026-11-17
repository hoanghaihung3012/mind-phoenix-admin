import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Medal,
  Flame,
  Star,
  Zap,
  Search,
  Sparkles,
  Users,
  Award,
} from 'lucide-react';
import { useLeaderboard } from '../../application/hooks';
import { Card, Table, Avatar, Badge, ProgressBar } from '../components/ui';
import { LeaderboardUser } from '../../domain/entities';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard, loading } = useLeaderboard();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return leaderboard;
    const term = searchTerm.toLowerCase();
    return leaderboard.filter(
      u =>
        u.name.toLowerCase().includes(term) ||
        (u.school && u.school.toLowerCase().includes(term)) ||
        (u.title && u.title.toLowerCase().includes(term)) ||
        (u.status && u.status.toLowerCase().includes(term))
    );
  }, [leaderboard, searchTerm]);

  // Derived stats
  const topUser = leaderboard[0];
  const totalPoints = leaderboard.reduce((sum, u) => sum + (u.points || 0), 0);
  const highestLevel = leaderboard.reduce((max, u) => Math.max(max, u.level || 1), 1);
  const topStreak = leaderboard.reduce((max, u) => Math.max(max, u.streak || 0), 0);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-2xl drop-shadow">🥇</span>;
    if (rank === 2) return <span className="text-2xl drop-shadow">🥈</span>;
    if (rank === 3) return <span className="text-2xl drop-shadow">🥉</span>;
    return (
      <span className="w-7 h-7 rounded-full bg-[#F4F5FF] text-[#5D5FEF] font-bold text-xs flex items-center justify-center">
        #{rank}
      </span>
    );
  };

  const getStatusVariant = (status: string) => {
    if (status.includes('Top 1') || status.includes('Quán Quân')) return 'success';
    if (status.includes('Chiến Tướng') || status.includes('Bứt Phá')) return 'info';
    if (status.includes('Tích Cực') || status.includes('Chăm Chỉ')) return 'warning';
    return 'neutral';
  };

  const columns = [
    {
      header: 'Thứ hạng',
      accessor: (row: LeaderboardUser) => (
        <div className="flex items-center justify-center">{getRankBadge(row.rank)}</div>
      ),
      className: 'w-20 text-center',
    },
    {
      header: 'Người dùng / Học viên',
      accessor: (row: LeaderboardUser) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar src={row.avatar} name={row.name} size="md" />
            {row.rank <= 3 && (
              <span className="absolute -bottom-1 -right-1 text-xs">
                {row.rank === 1 ? '👑' : row.rank === 2 ? '⭐' : '✨'}
              </span>
            )}
          </div>
          <div>
            <div className="font-bold text-[#151D48] text-sm flex items-center gap-1.5">
              <span>{row.name}</span>
              {row.rank === 1 && (
                <span className="text-[10px] bg-[#FFE2E5] text-[#FA5A7D] px-1.5 py-0.2 rounded font-bold">
                  TOP 1
                </span>
              )}
            </div>
            <div className="text-[11px] text-[#737791]">{row.school || 'MindPhoenix Member'}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Điểm đạt được',
      accessor: (row: LeaderboardUser) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FFF4DE] flex items-center justify-center text-[#FFA800] shrink-0">
            <Star className="w-4 h-4 fill-[#FFA800]" />
          </div>
          <div>
            <div className="font-extrabold text-[#151D48] text-base leading-tight">
              {(row.points || 0).toLocaleString()} <span className="text-xs font-semibold text-[#FFA800]">XP</span>
            </div>
            <div className="text-[10px] text-[#737791]">Điểm tích lũy</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Level của user',
      accessor: (row: LeaderboardUser) => {
        // Calculate sub-level progress (e.g. remainder of points toward next level)
        const level = row.level || 1;
        const progress = Math.min(100, Math.max(15, (row.points % 1000) / 10));
        return (
          <div className="w-36">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-[#5D5FEF] bg-[#F4F5FF] px-2 py-0.5 rounded-md">
                Level {level}
              </span>
              <span className="text-[11px] font-semibold text-[#737791]">{progress.toFixed(0)}%</span>
            </div>
            <ProgressBar
              value={progress}
              color={level >= 15 ? '#FA5A7D' : level >= 10 ? '#5D5FEF' : '#00E096'}
              height="h-1.5"
            />
          </div>
        );
      },
    },
    {
      header: 'Danh hiệu / Huy hiệu',
      accessor: (row: LeaderboardUser) => (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#151D48]">
          <Award className="w-4 h-4 text-[#FFA800] shrink-0" />
          <span>{row.title || 'Học viên chăm chỉ'}</span>
        </div>
      ),
    },
    {
      header: 'Chuỗi học',
      accessor: (row: LeaderboardUser) => (
        <div className="flex items-center gap-1.5 font-bold text-xs text-[#FA5A7D]">
          <Flame className="w-4 h-4 fill-[#FA5A7D] shrink-0" />
          <span>{row.streak || 1} ngày</span>
        </div>
      ),
    },
    {
      header: 'Trạng thái',
      accessor: (row: LeaderboardUser) => (
        <Badge variant={getStatusVariant(row.status || '')}>
          {row.status || 'Đang hoạt động'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#FFF4DE] to-[#FFE8B8] rounded-[24px] p-5 border border-[#FFE8B8] flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider">Quán Quân Dẫn Đầu</span>
            <h3 className="text-xl font-extrabold text-[#151D48] mt-1 truncate max-w-[170px]">
              {topUser?.name || 'Chưa có'}
            </h3>
            <p className="text-xs text-[#B45309] font-medium mt-0.5">
              Level {topUser?.level || 1} · {(topUser?.points || 0).toLocaleString()} XP
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center text-2xl">
            👑
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 border border-[#EFF1F6] flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-[#737791] uppercase tracking-wider">Tổng Điểm Tích Lũy</span>
            <h3 className="text-2xl font-extrabold text-[#151D48] mt-1">
              {totalPoints.toLocaleString()} <span className="text-xs font-bold text-[#FFA800]">XP</span>
            </h3>
            <p className="text-xs text-[#00E096] font-semibold mt-0.5 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Toàn hệ thống
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FFF4DE] flex items-center justify-center text-[#FFA800]">
            <Star className="w-6 h-6 fill-[#FFA800]" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 border border-[#EFF1F6] flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-[#737791] uppercase tracking-wider">Level Cao Nhất</span>
            <h3 className="text-2xl font-extrabold text-[#5D5FEF] mt-1">
              Level {highestLevel}
            </h3>
            <p className="text-xs text-[#737791] font-medium mt-0.5">
              Hạng Bậc Phượng Hoàng
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F4F5FF] flex items-center justify-center text-[#5D5FEF]">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 border border-[#EFF1F6] flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-[#737791] uppercase tracking-wider">Chuỗi Kỷ Lục</span>
            <h3 className="text-2xl font-extrabold text-[#FA5A7D] mt-1 flex items-center gap-1.5">
              <Flame className="w-6 h-6 fill-[#FA5A7D]" />
              {topStreak} <span className="text-sm font-semibold">ngày</span>
            </h3>
            <p className="text-xs text-[#737791] font-medium mt-0.5">
              Học tập không gián đoạn
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FFE2E5] flex items-center justify-center text-[#FA5A7D]">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Rank 2 - Silver */}
          <div className="order-2 md:order-1 bg-gradient-to-b from-[#F9FAFB] to-white rounded-[24px] p-6 border-2 border-[#E5E7EB] text-center shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 left-4 text-2xl">🥈</div>
            <div>
              <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-b from-[#9CA3AF] to-[#E5E7EB] shadow-md mb-3">
                <img
                  src={leaderboard[1].avatar}
                  alt={leaderboard[1].name}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
              <h4 className="font-extrabold text-[#151D48] text-base">{leaderboard[1].name}</h4>
              <p className="text-xs text-[#737791] mt-0.5">{leaderboard[1].school || 'MindPhoenix Member'}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5E7EB]/60 text-xs font-bold text-[#374151]">
                <span>{leaderboard[1].title}</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-[#EFF1F6] flex items-center justify-around">
              <div>
                <div className="text-[11px] text-[#737791] font-medium">Điểm đạt được</div>
                <div className="text-lg font-extrabold text-[#151D48]">{leaderboard[1].points.toLocaleString()} XP</div>
              </div>
              <div className="w-[1px] h-8 bg-[#EFF1F6]" />
              <div>
                <div className="text-[11px] text-[#737791] font-medium">Level</div>
                <div className="text-lg font-extrabold text-[#5D5FEF]">Lv. {leaderboard[1].level}</div>
              </div>
            </div>
          </div>

          {/* Rank 1 - Champion Gold */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7]/40 to-white rounded-[24px] p-6 border-2 border-[#F59E0B] text-center shadow-lg relative overflow-hidden flex flex-col justify-between scale-100 md:-translate-y-2">
            <div className="absolute top-3 right-3 text-3xl animate-bounce">👑</div>
            <div className="absolute top-4 left-4 text-2xl">🥇</div>
            <div>
              <div className="w-24 h-24 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-[#F59E0B] to-[#FDE68A] shadow-lg mb-3">
                <img
                  src={leaderboard[0].avatar}
                  alt={leaderboard[0].name}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-[#F59E0B] text-white px-3 py-0.5 rounded-full shadow-sm">
                QUÁN QUÂN BẢNG VÀNG
              </span>
              <h4 className="font-extrabold text-[#151D48] text-lg mt-2">{leaderboard[0].name}</h4>
              <p className="text-xs text-[#B45309] font-medium mt-0.5">{leaderboard[0].school || 'MindPhoenix Academy'}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-xs font-extrabold text-[#B45309]">
                <span>{leaderboard[0].title}</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-[#FDE68A] flex items-center justify-around bg-white/80 rounded-2xl p-2 shadow-inner">
              <div>
                <div className="text-[11px] text-[#737791] font-medium">Điểm đạt được</div>
                <div className="text-xl font-black text-[#D97706]">{leaderboard[0].points.toLocaleString()} XP</div>
              </div>
              <div className="w-[1px] h-8 bg-[#FDE68A]" />
              <div>
                <div className="text-[11px] text-[#737791] font-medium">Level</div>
                <div className="text-xl font-black text-[#5D5FEF]">Lv. {leaderboard[0].level}</div>
              </div>
            </div>
          </div>

          {/* Rank 3 - Bronze */}
          <div className="order-3 md:order-3 bg-gradient-to-b from-[#FFF7ED] to-white rounded-[24px] p-6 border-2 border-[#FED7AA] text-center shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 left-4 text-2xl">🥉</div>
            <div>
              <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-b from-[#EA580C] to-[#FED7AA] shadow-md mb-3">
                <img
                  src={leaderboard[2].avatar}
                  alt={leaderboard[2].name}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
              <h4 className="font-extrabold text-[#151D48] text-base">{leaderboard[2].name}</h4>
              <p className="text-xs text-[#737791] mt-0.5">{leaderboard[2].school || 'MindPhoenix Member'}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FED7AA]/50 text-xs font-bold text-[#9A3412]">
                <span>{leaderboard[2].title}</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-[#EFF1F6] flex items-center justify-around">
              <div>
                <div className="text-[11px] text-[#737791] font-medium">Điểm đạt được</div>
                <div className="text-lg font-extrabold text-[#151D48]">{leaderboard[2].points.toLocaleString()} XP</div>
              </div>
              <div className="w-[1px] h-8 bg-[#EFF1F6]" />
              <div>
                <div className="text-[11px] text-[#737791] font-medium">Level</div>
                <div className="text-lg font-extrabold text-[#5D5FEF]">Lv. {leaderboard[2].level}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Leaderboard Table Card */}
      <Card
        title="Bảng Xếp Hạng Chi Tiết"
        subtitle="Danh sách học viên theo điểm số tích lũy và cấp độ thành tích"
        action={
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#737791] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, trường..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-3.5 py-1.5 text-xs bg-[#F9FAFB] border border-[#EFF1F6] rounded-xl text-[#151D48] placeholder-[#737791] focus:outline-none focus:border-[#5D5FEF] w-56 transition-colors"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5D5FEF] bg-[#F4F5FF] px-3 py-1.5 rounded-xl shrink-0">
              <Users className="w-4 h-4" />
              <span>{filteredUsers.length} Thành viên</span>
            </div>
          </div>
        }
      >
        {loading && leaderboard.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#737791] flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-[#5D5FEF] border-t-transparent rounded-full animate-spin" />
            <span>Đang tải bảng xếp hạng...</span>
          </div>
        ) : (
          <Table
            columns={columns}
            data={filteredUsers}
            keyExtractor={l => l.id}
            emptyMessage="Không tìm thấy thành viên phù hợp với từ khóa"
          />
        )}
      </Card>
    </div>
  );
};
