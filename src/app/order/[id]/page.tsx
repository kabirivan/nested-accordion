'use client';

import { useParams } from 'next/navigation';
import { frogsData } from '@/data/frogsData';
import OrderContent from '@/components/OrderContent';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function OrderPage() {
  const params = useParams();
  const orderId = params.id as string;

  // Buscar el orden
  const order = frogsData.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-secondary">Orden no encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: order.name }
        ]}
      />
      <OrderContent order={order} />
    </div>
  );
}

