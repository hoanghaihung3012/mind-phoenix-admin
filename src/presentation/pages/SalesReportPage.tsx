import React from 'react';
import { useSalesReport } from '../../application/hooks';
import { Card, Table, Badge } from '../components/ui';
import { SalesReportRow } from '../../domain/entities';

export const SalesReportPage: React.FC = () => {
  const { reports, loading } = useSalesReport();

  const columns = [
    {
      header: 'Period',
      accessor: (row: SalesReportRow) => <span className="font-bold text-[#151D48]">{row.period}</span>,
    },
    {
      header: 'Region',
      accessor: (row: SalesReportRow) => row.region,
    },
    {
      header: 'Channel',
      accessor: (row: SalesReportRow) => <Badge variant="neutral">{row.channel}</Badge>,
    },
    {
      header: 'Gross Revenue',
      accessor: (row: SalesReportRow) => `$${row.grossRevenue.toLocaleString()}`,
    },
    {
      header: 'Discounts',
      accessor: (row: SalesReportRow) => `-$${row.discounts.toLocaleString()}`,
      className: 'text-[#FA5A7D]',
    },
    {
      header: 'Net Revenue',
      accessor: (row: SalesReportRow) => (
        <span className="font-bold text-[#151D48]">${row.netRevenue.toLocaleString()}</span>
      ),
    },
    {
      header: 'COGS',
      accessor: (row: SalesReportRow) => `$${row.costOfGoods.toLocaleString()}`,
    },
    {
      header: 'Gross Profit',
      accessor: (row: SalesReportRow) => (
        <span className="font-bold text-[#3CD856]">${row.grossProfit.toLocaleString()}</span>
      ),
    },
    {
      header: 'Margin %',
      accessor: (row: SalesReportRow) => (
        <span className="font-bold text-[#5D5FEF]">{row.margin}%</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title="Financial Sales Reports"
        subtitle="Revenue breakdown, gross margins, and channels"
      >
        {loading && reports.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#737791]">Đang tải báo cáo tài chính...</div>
        ) : (
          <Table columns={columns} data={reports} keyExtractor={r => r.id} />
        )}
      </Card>
    </div>
  );
};
