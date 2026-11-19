import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProducts } from '../../application/hooks';
import { useLanguage } from '../../application/LanguageContext';
import { Card, Button, Table, Badge, Modal, Input, Select } from '../components/ui';
import { Product } from '../../domain/entities';

export const ProductsPage: React.FC = () => {
  const { products, loading, addProduct } = useProducts();
  const { t, language } = useLanguage();
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
      header: t('colProduct'),
      accessor: (row: Product) => (
        <div>
          <div className="font-bold text-[#151D48] text-sm">{row.name}</div>
          <div className="text-[11px] text-[#737791]">SKU: {row.sku}</div>
        </div>
      ),
    },
    {
      header: t('colCategory'),
      accessor: (row: Product) => <span className="text-xs text-[#737791]">{row.category}</span>,
    },
    {
      header: t('colPrice'),
      accessor: (row: Product) => <span className="font-bold text-[#151D48]">${row.price.toFixed(2)}</span>,
    },
    {
      header: t('colStock'),
      accessor: (row: Product) => (
        <span>
          {row.stock} {language === 'vi' ? 'trong kho' : 'in stock'}
        </span>
      ),
    },
    {
      header: t('status'),
      accessor: (row: Product) => {
        const isOk = row.status === 'In Stock';
        const isLow = row.status === 'Low Stock';
        return (
          <Badge variant={isOk ? 'success' : isLow ? 'warning' : 'danger'}>
            {isOk
              ? (language === 'vi' ? 'Còn hàng' : 'In Stock')
              : isLow
              ? (language === 'vi' ? 'Sắp hết' : 'Low Stock')
              : (language === 'vi' ? 'Hết hàng' : 'Out of Stock')}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title={t('productsTitle')}
        subtitle={`${products.length} ${t('productsSub')}`}
        action={
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            {t('addProductBtn')}
          </Button>
        }
      >
        {loading && products.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#737791]">{t('loading')}</div>
        ) : (
          <Table columns={columns} data={products} keyExtractor={p => p.id} />
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('modalAddProduct')}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('productNameLabel')}
            placeholder="Wireless Earbuds Pro"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <Select
            label={t('categoryLabel')}
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
              label={t('priceLabel')}
              type="number"
              step="0.01"
              placeholder="79.99"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              required
            />
            <Input
              label={t('stockLabel')}
              type="number"
              placeholder="50"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-[#EFF1F6]">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('save')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};