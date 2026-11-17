import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Tag,
  UserPlus,
  Download,
} from 'lucide-react';
import { useDashboard } from '../../application/hooks';
import { Card, StatCard, Button, ProgressBar } from '../components/ui';
import { VisitorInsightsChart } from '../components/charts/VisitorInsightsChart';
import { TotalRevenueChart } from '../components/charts/TotalRevenueChart';
import { CustomerSatisfactionChart } from '../components/charts/CustomerSatisfactionChart';
import { TargetVsRealityChart } from '../components/charts/TargetVsRealityChart';
import { WorldSalesMap } from '../components/charts/WorldSalesMap';
import { VolumeVsServiceChart } from '../components/charts/VolumeVsServiceChart';

export const DashboardPage: React.FC = () => {
  const { metrics, loading } = useDashboard();

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-96 text-sm text-[#737791]">
        Đang tải dữ liệu dashboard...
      </div>
    );
  }

  const today = metrics?.todaySales || {
    totalSales: 1000,
    salesChange: 0.5,
    totalOrders: 300,
    ordersChange: -0.5,
    productSold: 5,
    productSoldChange: 1.2,
    newCustomers: 8,
    newCustomersChange: 0.5,
  };

  return (
    <div className="space-y-6">
      {/* Today's Sales Section */}
      <Card
        title="Today's Sales"
        subtitle="Sales Summary"
        action={
          <Button variant="export" icon={<Download className="w-4 h-4 text-[#737791]" />}>
            Export
          </Button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          <StatCard
            variant="pink"
            icon={<TrendingUp className="w-5 h-5" />}
            value={`$${today.totalSales}k`}
            title="Total Sales"
            change={`${today.salesChange > 0 ? '+' : ''}${today.salesChange}%`}
          />
          <StatCard
            variant="orange"
            icon={<ShoppingBag className="w-5 h-5" />}
            value={today.totalOrders}
            title="Total Order"
            change={`${today.ordersChange > 0 ? '+' : ''}${today.ordersChange}%`}
          />
          <StatCard
            variant="green"
            icon={<Tag className="w-5 h-5" />}
            value={today.productSold}
            title="Product Sold"
            change={`${today.productSoldChange > 0 ? '+' : ''}${today.productSoldChange}%`}
          />
          <StatCard
            variant="purple"
            icon={<UserPlus className="w-5 h-5" />}
            value={today.newCustomers}
            title="New Customers"
            change={`${today.newCustomersChange > 0 ? '+' : ''}${today.newCustomersChange}%`}
          />
        </div>
      </Card>

      {/* Row 2: Visitor Insights & Total Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Visitor Insights">
          <VisitorInsightsChart data={metrics?.visitorInsights} />
        </Card>
        <Card title="Total Revenue">
          <TotalRevenueChart data={metrics?.totalRevenue} />
        </Card>
      </div>

      {/* Row 3: Customer Satisfaction & Target vs Reality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Customer Satisfaction">
          <CustomerSatisfactionChart data={metrics?.customerSatisfaction} />
        </Card>
        <Card title="Target vs Reality">
          <TargetVsRealityChart data={metrics?.targetVsReality} />
        </Card>
      </div>

      {/* Row 4: Top Products, World Sales & Volume vs Service */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Top Products">
          <div className="space-y-4 mt-2">
            {(metrics?.topProducts || []).map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex justify-between items-center text-xs font-semibold text-[#151D48] mb-1.5">
                    <span>{p.name}</span>
                    <span className="text-[#737791] font-normal">{p.salesCount} sales</span>
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

        <Card title="Sales Mapping by Country">
          <WorldSalesMap data={metrics?.worldSalesMap} />
        </Card>

        <Card title="Volume vs Service Level">
          <VolumeVsServiceChart data={metrics?.volumeVsService || { volume: 1135, service: 635 }} />
        </Card>
      </div>
    </div>
  );
};
