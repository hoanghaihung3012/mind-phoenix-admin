import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useOrders } from '../../application/hooks';
import { Card, Button, Table, Badge, Avatar, Modal, Input, Select } from '../components/ui';
import { Order } from '../../domain/entities';

export const OrdersPage: React.FC = () => {
  const { orders, loading, addOrder } = useOrders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    totalAmount: '',
    itemsCount: '1',
    paymentMethod: 'Credit Card',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.totalAmount) return;

    await addOrder({
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      totalAmount: parseFloat(form.totalAmount),
      itemsCount: parseInt(form.itemsCount, 10),
      paymentMethod: form.paymentMethod,
      status: 'Processing',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    });

    setIsModalOpen(false);
    setForm({ customerName: '', customerEmail: '', totalAmount: '', itemsCount: '1', paymentMethod: 'Credit Card' });
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="success">Completed</Badge>;
      case 'Processing':
        return <Badge variant="info">Processing</Badge>;
      case 'Pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'Cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const columns = [
    {
      header: 'Order',
      accessor: (row: Order) => (
        <span className="font-bold text-[#5D5FEF]">{row.orderNumber}</span>
      ),
    },
    {
      header: 'Customer',
      accessor: (row: Order) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={row.customerName} size="sm" />
          <div>
            <div className="font-semibold text-[#151D48] text-xs">{row.customerName}</div>
            <div className="text-[11px] text-[#737791]">{row.customerEmail}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Items',
      accessor: (row: Order) => `${row.itemsCount} items`,
    },
    {
      header: 'Total Amount',
      accessor: (row: Order) => (
        <span className="font-bold text-[#151D48]">${row.totalAmount.toFixed(2)}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Order) => getStatusBadge(row.status),
    },
    {
      header: 'Payment',
      accessor: (row: Order) => (
        <span className="text-xs text-[#737791]">{row.paymentMethod}</span>
      ),
    },
    {
      header: 'Date',
      accessor: (row: Order) => (
        <span className="text-xs text-[#737791]">{row.createdAt}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title="Order Management"
        subtitle={`Total ${orders.length} orders recorded in PostgreSQL database`}
        action={
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Create Order
          </Button>
        }
      >
        {loading && orders.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#737791]">Đang tải danh sách đơn hàng...</div>
        ) : (
          <Table columns={columns} data={orders} keyExtractor={o => o.id} />
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Order">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Customer Name"
            placeholder="Nguyen Van A"
            value={form.customerName}
            onChange={e => setForm({ ...form, customerName: e.target.value })}
            required
          />
          <Input
            label="Customer Email"
            type="email"
            placeholder="a@gmail.com"
            value={form.customerEmail}
            onChange={e => setForm({ ...form, customerEmail: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Total Amount ($)"
              type="number"
              step="0.01"
              placeholder="120.00"
              value={form.totalAmount}
              onChange={e => setForm({ ...form, totalAmount: e.target.value })}
              required
            />
            <Input
              label="Items Count"
              type="number"
              min="1"
              value={form.itemsCount}
              onChange={e => setForm({ ...form, itemsCount: e.target.value })}
              required
            />
          </div>
          <Select
            label="Payment Method"
            value={form.paymentMethod}
            onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
            options={[
              { value: 'Credit Card', label: 'Credit Card' },
              { value: 'PayPal', label: 'PayPal' },
              { value: 'Bank Transfer', label: 'Bank Transfer' },
              { value: 'COD', label: 'Cash on Delivery' },
            ]}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-[#EFF1F6]">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Lưu Đơn Hàng
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
