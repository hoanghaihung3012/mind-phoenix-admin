import React, { useState } from 'react';
import {
  Users,
  Activity,
  Gamepad2,
  Wrench,
  Trophy,
  RefreshCw,
  Clock,
  Compass,
  Monitor,
  Flame,
  Award,
  Circle,
  Sparkles,
} from 'lucide-react';
import { useAnalytics } from '../../application/hooks';
import { Card, StatCard, Button, ProgressBar } from '../components/ui';

export const AnalyticsPage: React.FC = () => {
  const { summary, loading, refetch } = useAnalytics(8000); // Poll every 8s
  const [activeFilter, setActiveFilter] = useState<'all' | 'games' | 'tools' | 'scores'>('all');

  const formatTimeAgo = (isoString?: string) => {
    if (!isoString) return 'Vừa xong';
    const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diff < 10) return 'Vừa xong';
    if (diff < 60) return `${diff} giây trước`;
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins} phút trước`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} giờ trước`;
    return `${Math.floor(hours / 24)} ngày trước`;
  };

  const totalGamePlays = summary?.totalGamePlays || 0;
  const totalToolUsages = summary?.totalToolUsages || 0;

  // Calculate highest game count for relative progress bar
  const maxGamePlays = Math.max(1, ...(summary?.topGames.map(g => g.playCount) || [1]));
  const maxToolUsages = Math.max(1, ...(summary?.topTools.map(t => t.usageCount) || [1]));

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-[#F8F9FA] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#151D48]">User & Client Analytics</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-time Live
            </span>
          </div>
          <p className="text-xs text-[#737791] mt-1">
            Theo dõi người dùng online, lượt tương tác minigame, công cụ lớp học và kỷ lục điểm số client.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="export"
            icon={<RefreshCw className={`w-4 h-4 text-[#737791] ${loading ? 'animate-spin' : ''}`} />}
            onClick={() => refetch()}
          >
            Làm mới
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          variant="purple"
          icon={<Users className="w-5 h-5" />}
          value={String(summary?.totalUsers || 0)}
          title="Tổng User Hệ Thống"
          change="Tài khoản đăng ký"
        />
        <StatCard
          variant="green"
          icon={<Activity className="w-5 h-5" />}
          value={String(summary?.onlineUsers || 0)}
          title="Người Dùng Đang Online"
          change={`${summary?.onlineMembers || 0} thành viên · ${summary?.onlineGuests || 0} khách`}
        />
        <StatCard
          variant="pink"
          icon={<Gamepad2 className="w-5 h-5" />}
          value={String(totalGamePlays)}
          title="Lượt Chơi Minigame"
          change={`${summary?.topGames?.length || 0} tựa game tương tác`}
        />
        <StatCard
          variant="orange"
          icon={<Wrench className="w-5 h-5" />}
          value={String(totalToolUsages)}
          title="Lượt Dùng Công Cụ"
          change="Tiện ích & Sandbox lớp học"
        />
      </div>

      {/* Live Online Users Table */}
      <Card
        title="Danh Sách Người Dùng & Khách Đang Online"
        subtitle={`Hiện có ${summary?.onlineUsers || 0} phiên truy cập hoạt động trong 90 giây qua`}
        action={
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <Circle className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500 animate-pulse" />
            Tự động cập nhật mỗi 8s
          </div>
        }
      >
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F8F9FA] text-[11px] font-bold text-[#737791] uppercase tracking-wider">
                <th className="py-3 px-3">Người dùng / Thiết bị</th>
                <th className="py-3 px-3">Vai trò</th>
                <th className="py-3 px-3">Trang đang mở</th>
                <th className="py-3 px-3">Hoạt động thời gian thực</th>
                <th className="py-3 px-3 text-right">Hoạt động gần nhất</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F9FA] text-xs">
              {(summary?.activeSessions || []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#737791]">
                    Chưa có người dùng trực tuyến trong 90 giây qua. Mở website client để xem live session!
                  </td>
                </tr>
              ) : (
                (summary?.activeSessions || []).map((sess) => (
                  <tr key={sess.sessionId} className="hover:bg-[#FAFBFC] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={sess.userAvatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + sess.sessionId}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover border border-emerald-300"
                          />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#151D48] flex items-center gap-1.5">
                            {sess.userName || 'Khách vãng lai'}
                            {sess.userId && (
                              <span className="text-[10px] bg-[#5D5FEF]/10 text-[#5D5FEF] px-1.5 py-0.2 rounded font-medium">
                                Member
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#737791] font-mono">
                            {sess.sessionId.substring(0, 14)}...
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F4F5F7] text-[#444A6D]">
                        {sess.role || (sess.userId ? 'Học viên' : 'Khách vãng lai')}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 text-[#5D5FEF] font-mono text-[11px]">
                        <Compass className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate max-w-[160px]">{sess.currentPage || '/'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-[#151D48] bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-md text-[11px]">
                        {sess.currentActivity || 'Đang khám phá website'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[#737791] font-medium">
                      <div className="flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3 text-emerald-500" />
                        <span>{formatTimeAgo(sess.lastSeenAt)}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Row: Top Games & Top Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Played Games */}
        <Card
          title="Top Game Được Chơi Nhiều Nhất"
          subtitle="Xếp hạng dựa trên lượt chơi và tương tác minigame của học sinh"
          action={
            <div className="p-1 bg-[#F4F5F7] rounded-xl flex items-center text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white shadow-xs font-semibold text-[#151D48]">
                {summary?.topGames.length || 0} Trò chơi
              </span>
            </div>
          }
        >
          <div className="space-y-4 mt-2">
            {(summary?.topGames || []).map((game, idx) => {
              const pct = Math.round((game.playCount / maxGamePlays) * 100);
              const colors = ['#5D5FEF', '#FF8900', '#00E096', '#FF5B5B', '#884DFF', '#0095FF'];
              const color = colors[idx % colors.length];

              return (
                <div key={game.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#F4F5F7] flex items-center justify-center font-bold text-[11px] text-[#737791]">
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-[#151D48]">{game.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#737791]">
                      <span className="font-bold text-[#151D48]">{game.playCount}</span> lượt chơi
                    </div>
                  </div>
                  <ProgressBar value={pct} color={color} height="h-2" />
                  <div className="flex justify-between text-[10px] text-[#A0A4A8]">
                    <span>Tỷ lệ quan tâm: {pct}%</span>
                    <span>Chơi gần nhất: {formatTimeAgo(game.lastPlayedAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Tools Used */}
        <Card
          title="Top Công Cụ Trợ Giảng & Học Tập"
          subtitle="Số lần giáo viên và học sinh mở các công cụ tương tác"
          action={
            <div className="p-1 bg-[#F4F5F7] rounded-xl flex items-center text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white shadow-xs font-semibold text-[#151D48]">
                {summary?.topTools.length || 0} Công cụ
              </span>
            </div>
          }
        >
          <div className="space-y-4 mt-2">
            {(summary?.topTools || []).map((tool, idx) => {
              const pct = Math.round((tool.usageCount / maxToolUsages) * 100);
              const colors = ['#00E096', '#5D5FEF', '#FF8900', '#FF5B5B'];
              const color = colors[idx % colors.length];

              return (
                <div key={tool.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#F4F5F7] flex items-center justify-center font-bold text-[11px] text-[#737791]">
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-[#151D48]">{tool.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#737791]">
                      <span className="font-bold text-[#151D48]">{tool.usageCount}</span> lần dùng
                    </div>
                  </div>
                  <ProgressBar value={pct} color={color} height="h-2" />
                  <div className="flex justify-between text-[10px] text-[#A0A4A8]">
                    <span>Tỷ lệ sử dụng: {pct}%</span>
                    <span>Dùng gần nhất: {formatTimeAgo(tool.lastUsedAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Row: Top Scores Leaderboard & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Scores */}
        <Card
          title="Bảng Vàng Điểm Cao (Top Game Scores)"
          subtitle="Kỷ lục điểm số cao nhất của các minigame được ghi nhận"
          action={
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <Trophy className="w-3.5 h-3.5" />
              MindPhoenix Hall of Fame
            </div>
          }
        >
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#F8F9FA] text-[11px] font-bold text-[#737791] uppercase">
                  <th className="py-2.5 px-2">Hạng</th>
                  <th className="py-2.5 px-2">Người chơi</th>
                  <th className="py-2.5 px-2">Tựa Game</th>
                  <th className="py-2.5 px-2 text-right">Điểm số</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F9FA]">
                {(summary?.topScores || []).map((item, idx) => {
                  let badge = (
                    <span className="w-6 h-6 rounded-full bg-[#F4F5F7] text-[#737791] font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                  );
                  if (idx === 0) {
                    badge = (
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center shadow-xs">
                        🥇
                      </span>
                    );
                  } else if (idx === 1) {
                    badge = (
                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                        🥈
                      </span>
                    );
                  } else if (idx === 2) {
                    badge = (
                      <span className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-900 font-bold text-xs flex items-center justify-center">
                        🥉
                      </span>
                    );
                  }

                  return (
                    <tr key={item.id} className="hover:bg-[#FAFBFC]">
                      <td className="py-2.5 px-2">{badge}</td>
                      <td className="py-2.5 px-2 font-semibold text-[#151D48]">{item.playerName}</td>
                      <td className="py-2.5 px-2 text-[#5D5FEF] font-medium">{item.gameTitle}</td>
                      <td className="py-2.5 px-2 text-right">
                        <span className="font-bold text-emerald-600 text-sm">
                          {item.score.toLocaleString()}
                        </span>
                        <div className="text-[10px] text-[#A0A4A8]">{formatTimeAgo(item.createdAt)}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Client Activities Feed */}
        <Card
          title="Nhật Ký Tương Tác Thời Gian Thực"
          subtitle="Dòng sự kiện hoạt động của người dùng trên toàn bộ client"
          action={
            <span className="text-xs bg-[#5D5FEF]/10 text-[#5D5FEF] px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Live Events
            </span>
          }
        >
          <div className="space-y-3 mt-2 max-h-[380px] overflow-y-auto pr-1">
            {(summary?.recentActivities || []).map((act) => {
              const isGame = act.type === 'game_play';
              const isTool = act.type === 'tool_use';
              const isScore = act.type === 'score';

              return (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-[#FAFBFC] border border-[#F4F5F7] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isScore
                          ? 'bg-amber-100 text-amber-600'
                          : isGame
                          ? 'bg-blue-100 text-blue-600'
                          : isTool
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      {isScore ? (
                        <Trophy className="w-4 h-4" />
                      ) : isGame ? (
                        <Gamepad2 className="w-4 h-4" />
                      ) : isTool ? (
                        <Wrench className="w-4 h-4" />
                      ) : (
                        <Compass className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-[#151D48]">
                        {act.userName || 'Khách vãng lai'}
                        <span className="font-normal text-[#737791]">
                          {isScore
                            ? ` vừa đạt `
                            : isGame
                            ? ` vừa chơi game `
                            : isTool
                            ? ` vừa dùng công cụ `
                            : ` đã xem `}
                        </span>
                        <span className="font-semibold text-[#5D5FEF]">{act.targetTitle}</span>
                        {isScore && act.score ? (
                          <span className="font-bold text-amber-600 ml-1">({act.score} điểm)</span>
                        ) : null}
                      </div>
                      <span className="text-[10px] text-[#A0A4A8]">{formatTimeAgo(act.createdAt)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
