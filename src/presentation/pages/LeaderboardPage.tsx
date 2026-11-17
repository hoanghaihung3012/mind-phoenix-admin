import React from 'react';
import { Medal } from 'lucide-react';
import { useLeaderboard } from '../../application/hooks';
import { Card, Table, Avatar, Badge, ProgressBar } from '../components/ui';
import { LeaderboardUser } from '../../domain/entities';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard, loading } = useLeaderboard();

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="font-bold text-[#737791] text-sm">#{rank}</span>;
  };

  const columns = [
    {
      header: 'Rank',
      accessor: (row: LeaderboardUser) => (
        <div className="flex items-center justify-center w-8">{getRankBadge(row.rank)}</div>
      ),
      className: 'w-16 text-center',
    },
    {
      header: 'Sales Representative',
      accessor: (row: LeaderboardUser) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={row.name} size="md" />
          <div>
            <div className="font-bold text-[#151D48] text-sm">{row.name}</div>
            <div className="text-[11px] text-[#737791]">{row.role}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Deals Closed',
      accessor: (row: LeaderboardUser) => <span className="font-semibold">{row.dealsClosed} deals</span>,
    },
    {
      header: 'Total Revenue',
      accessor: (row: LeaderboardUser) => (
        <span className="font-bold text-[#151D48]">${row.totalRevenue.toLocaleString()}</span>
      ),
    },
    {
      header: 'Quota Target',
      accessor: (row: LeaderboardUser) => (
        <div className="w-36">
          <div className="flex justify-between text-xs mb-1 font-semibold">
            <span>{row.targetAchievement}%</span>
          </div>
          <ProgressBar
            value={row.targetAchievement}
            color={row.targetAchievement >= 100 ? '#3CD856' : '#FFA800'}
            height="h-1.5"
          />
        </div>
      ),
    },
    {
      header: 'Performance',
      accessor: (row: LeaderboardUser) => (
        <Badge
          variant={
            row.status === 'Top Performer'
              ? 'success'
              : row.status === 'Achieved'
              ? 'info'
              : row.status === 'On Track'
              ? 'warning'
              : 'danger'
          }
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title="Sales Team Leaderboard"
        subtitle="Rankings and quarterly targets"
        action={
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5D5FEF] bg-[#F4F5FF] px-3 py-1.5 rounded-xl">
            <Medal className="w-4 h-4" />
            <span>Q3 2026 Rankings</span>
          </div>
        }
      >
        {loading && leaderboard.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#737791]">Đang tải bảng xếp hạng...</div>
        ) : (
          <Table columns={columns} data={leaderboard} keyExtractor={l => l.id} />
        )}
      </Card>
    </div>
  );
};
