import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Tag,
  UserPlus,
  Download,
  Users,
  Activity,
  Gamepad2,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { useDashboard, useAnalytics } from '../../application/hooks';
import { useLanguage } from '../../application/LanguageContext';
import { Card, StatCard, Button, ProgressBar } from '../components/ui';
import { VisitorInsightsChart } from '../components/charts/VisitorInsightsChart';
import { TotalRevenueChart } from '../components/charts/TotalRevenueChart';
import { CustomerSatisfactionChart } from '../components/charts/CustomerSatisfactionChart';
import { TargetVsRealityChart } from '../components/charts/TargetVsRealityChart';
import { WorldSalesMap } from '../components/charts/WorldSalesMap';
import { VolumeVsServiceChart } from '../components/charts/VolumeVsServiceChart';

interface DashboardPageProps {
  onNavigateTab?: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateTab }) => {
  const { metrics, loading } = useDashboard();
  const { summary } = useAnalytics(10000);
  const { t, language } = useLanguage();

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-96 text-sm text-[#737791]">
        {t('loading')}
      </div>
    );
  }

  const rawMetrics = (metrics?.todaySales as any)?.metrics;
  const todaySalesVal = rawMetrics ? rawMetrics.find((m: any) => m.title?.includes('Sales'))?.value || '$1k' : '$1k';
  const todaySalesChange = rawMetrics ? rawMetrics.find((m: any) => m.title?.includes('Sales'))?.change || '+8%' : '+8%';

  const totalOrdersVal = rawMetrics ? rawMetrics.find((m: any) => m.title?.includes('Order'))?.value || '300' : '300';
  const totalOrdersChange = rawMetrics ? rawMetrics.find((m: any) => m.title?.includes('Order'))?.change || '+5%' : '+5%';

  const productSoldVal = rawMetrics ? rawMetrics.find((m: any) => m.title?.includes('Product'))?.value || '5' : '5';
  const productSoldChange = rawMetrics ? rawMetrics.find((m: any) => m.title?.includes('Product'))?.change || '+1.2%' : '+1.2%';

  const newCustomersVal = rawMetrics ? rawMetrics.find((m: any) => m.title?.includes('Customer'))?.value || '8' : '8';
  const newCustomersChange = rawMetrics ? rawMetrics.find((m: any) => m.title?.includes('Customer'))?.change || '0.5%' : '0.5%';

  const maxGamePlays = Math.max(1, ...(summary?.topGames.map(g => g.playCount) || [1]));

  return (
    <div className="space-y-6">
      {/* Real-time Client & User Analytics Banner */}
      <div className="bg-gradient-to-r from-[#5D5FEF] via-[#7577F3] to-[#884DFF] rounded-2xl p-5 text-white shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t('clientPulse')}
            </span>
            <span className="text-white/80 text-xs">· {t('pulseSubtitle')}</span>
          </div>
          <h2 className="text-lg font-bold">{t('pulseTitle')}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-2.5 border border-white/10">
            <Users className="w-4 h-4 text-purple-200" />
            <div>
              <div className="text-[10px] text-white/70">{t('totalUsersStat')}</div>
              <div className="text-sm font-bold">{summary?.totalUsers || 0} user</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-2.5 border border-white/10">
            <Activity className="w-4 h-4 text-emerald-300" />
            <div>
              <div className="text-[10px] text-white/70">{t('onlineUsersStat')}</div>
              <div className="text-sm font-bold flex items-center gap-1">
                <span className="text-emerald-300">●</span> {summary?.onlineUsers || 0} online
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-2.5 border border-white/10">
            <Gamepad2 className="w-4 h-4 text-amber-300" />
            <div>
              <div className="text-[10px] text-white/70">{t('gamePlaysStat')}</div>
              <div className="text-sm font-bold">{summary?.totalGamePlays || 0} {language === 'vi' ? 'lượt' : 'plays'}</div>
            </div>
          </div>

          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('analytics')}
              className="bg-white text-[#5D5FEF] font-bold px-4 py-2 rounded-xl shadow-md hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs shrink-0 cursor-pointer"
            >
              {t('viewAnalyticsBtn')}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Today's Sales Section */}
      <Card
        title={t('todaySales')}
        subtitle={t('salesSummary')}
        action={
          <Button variant="export" icon={<Download className="w-4 h-4 text-[#737791]" />}>
            {t('export')}
          </Button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          <StatCard
            variant="pink"
            icon={<TrendingUp className="w-5 h-5" />}
            value={todaySalesVal}
            title={t('totalSales')}
            change={todaySalesChange}
          />
          <StatCard
            variant="orange"
            icon={<ShoppingBag className="w-5 h-5" />}
            value={totalOrdersVal}
            title={t('totalOrders')}
            change={totalOrdersChange}
          />
          <StatCard
            variant="green"
            icon={<Tag className="w-5 h-5" />}
            value={productSoldVal}
            title={t('productSold')}
            change={productSoldChange}
          />
          <StatCard
            variant="purple"
            icon={<UserPlus className="w-5 h-5" />}
            value={newCustomersVal}
            title={t('newCustomers')}
            change={newCustomersChange}
          />
        </div>
      </Card>

      {/* Client Analytics Highlights: Top Games, Top Tools, Top Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Games Preview */}
        <Card
          title={t('topPlayedGames')}
          subtitle={t('minigameSubtitle')}
          action={
            onNavigateTab && (
              <button
                onClick={() => onNavigateTab('analytics')}
                className="text-xs text-[#5D5FEF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {t('viewDetails')} <ArrowRight className="w-3 h-3" />
              </button>
            )
          }
        >
          <div className="space-y-3 mt-2">
            {(summary?.topGames.slice(0, 4) || []).map((game, idx) => {
              const pct = Math.round((game.playCount / maxGamePlays) * 100);
              const colors = ['#5D5FEF', '#FF8900', '#00E096', '#FF5B5B'];
              const color = colors[idx % colors.length];

              return (
                <div key={game.id} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#151D48]">
                      #{idx + 1} {game.title}
                    </span>
                    <span className="text-[#737791] font-medium">{game.playCount} {language === 'vi' ? 'lượt' : 'plays'}</span>
                  </div>
                  <ProgressBar value={pct} color={color} height="h-1.5" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Tools Preview */}
        <Card
          title={t('topTools')}
          subtitle={t('toolSubtitle')}
          action={
            onNavigateTab && (
              <button
                onClick={() => onNavigateTab('analytics')}
                className="text-xs text-[#5D5FEF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {t('viewDetails')} <ArrowRight className="w-3 h-3" />
              </button>
            )
          }
        >
          <div className="space-y-3 mt-2">
            {(summary?.topTools.slice(0, 4) || []).map((tool, idx) => {
              const maxToolCount = Math.max(1, ...(summary?.topTools.map(t => t.usageCount) || [1]));
              const pct = Math.round((tool.usageCount / maxToolCount) * 100);
              const colors = ['#00E096', '#5D5FEF', '#FF8900', '#884DFF'];
              const color = colors[idx % colors.length];

              return (
                <div key={tool.id} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#151D48]">
                      #{idx + 1} {tool.title}
                    </span>
                    <span className="text-[#737791] font-medium">{tool.usageCount} {language === 'vi' ? 'lần' : 'times'}</span>
                  </div>
                  <ProgressBar value={pct} color={color} height="h-1.5" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top High Scores Preview */}
        <Card
          title={t('topScores')}
          subtitle={t('scoreSubtitle')}
          action={
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Trophy className="w-3 h-3" /> Top Rank
            </div>
          }
        >
          <div className="space-y-2 mt-2">
            {(summary?.topScores.slice(0, 4) || []).map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-xl bg-[#FAFBFC] border border-[#F4F5F7] text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white shadow-2xs flex items-center justify-center font-bold text-[10px] text-[#737791]">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </span>
                  <div>
                    <div className="font-semibold text-[#151D48] leading-tight">{item.playerName}</div>
                    <div className="text-[10px] text-[#5D5FEF]">{item.gameTitle}</div>
                  </div>
                </div>
                <div className="font-bold text-emerald-600 text-xs">
                  {item.score.toLocaleString()} {language === 'vi' ? 'đ' : 'pts'}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 2: Visitor Insights & Total Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('visitorInsights')}>
          <VisitorInsightsChart data={metrics?.visitorInsights} />
        </Card>
        <Card title={t('totalRevenue')}>
          <TotalRevenueChart data={metrics?.totalRevenue} />
        </Card>
      </div>

      {/* Row 3: Customer Satisfaction & Target vs Reality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('customerSatisfaction')}>
          <CustomerSatisfactionChart data={metrics?.customerSatisfaction} />
        </Card>
        <Card title={t('targetVsReality')}>
          <TargetVsRealityChart data={metrics?.targetVsReality} />
        </Card>
      </div>

      {/* Row 4: Top Products, World Sales & Volume vs Service */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title={t('topProducts')}>
          <div className="space-y-4 mt-2">
            {(metrics?.topProducts || []).map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex justify-between items-center text-xs font-semibold text-[#151D48] mb-1.5">
                    <span>{p.name}</span>
                    <span className="text-[#737791] font-normal">{p.salesCount} {language === 'vi' ? 'đã bán' : 'sales'}</span>
                  </div>
                  <ProgressBar value={p.popularity} color={p.color} height="h-1.5" />
                </div>
                <div
                  className="px-2 py-0.5 rounded text-[11px] font-bold"
                  style={{ backgroundColor: `${p.color}20`, color: p.color }}
                >
                  {p.popularity}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t('salesMapping')}>
          <WorldSalesMap data={metrics?.worldSalesMap} />
        </Card>

        <Card title={t('volumeVsService')}>
          <VolumeVsServiceChart data={metrics?.volumeVsService || { volume: 1135, service: 635 }} />
        </Card>
      </div>
    </div>
  );
};
