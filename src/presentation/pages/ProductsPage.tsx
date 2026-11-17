import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProducts } from '../../application/hooks';
import { Card, Button, Table, Badge, Modal, Input, Select } from '../components/ui';
import { Product } from '../../domain/entities';

export const ProductsPage: React.FC = () => {
  const { products, loading, addProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'Electronics',
    sku: '',
    price: '',
    stock: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    await addProduct({
      name: form.name,
      category: form.category,
      sku: form.sku || `SKU-${Date.now().toString().slice(-4)}`,
      price: parseFloat(form.price),
      stock: parseInt(form.stock || '10', 10),
      rating: 4.8,
      salesCount: 0,
      popularity: 75,
      status: 'In Stock',
      color: '#5D5FEF',
    });

    setIsModalOpen(false);
    setForm({ name: '', category: 'Electronics', sku: '', price: '', stock: '' });
  };

  const columns = [
    {
      header: 'Product Name',
      accessor: (row: Product) => (
        <div>
          <div className="font-bold text-[#151D48] text-sm">{row.name}</div>
          <div className="text-[11px] text-[#737791]">SKU: {row.sku}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: (row: Product) => <span className="text-xs text-[#737791]">{row.category}</span>,
    },
    {
      header: 'Price',
      accessor: (row: Product) => <span className="font-bold text-[#151D48]">${row.price.toFixed(2)}</span>,
    },
    {
      header: 'Stock',
      accessor: (row: Product) => <span>{row.stock} in stock</span>,
    },
    {
      header: 'Status',
      accessor: (row: Product) => (
        <Badge variant={row.status === 'In Stock' ? 'success' : row.status === 'Low Stock' ? 'warning' : 'danger'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title="Products Catalog"
        subtitle={`Total ${products.length} products listed`}
        action={
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Product
          </Button>
        }
      >
        {loading && products.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#737791]">Đang tải danh sách sản phẩm...</div>
        ) : (
          <Table columns={columns} data={products} keyExtractor={p => p.id} />
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            placeholder="Wireless Earbuds Pro"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <Select
            label="Category"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            options={[
              { value: 'Electronics', label: 'Electronics' },
              { value: 'Education', label: 'Education & Games' },
              { value: 'Clothing', label: 'Clothing' },
              { value: 'Accessories', label: 'Accessories' },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              type="number"
              step="0.01"
              placeholder="79.99"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              required
            />
            <Input
              label="Initial Stock"
              type="number"
              placeholder="50"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-[#EFF1F6]">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Thêm Sản Phẩm
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
