'use client';

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {/* Home */}
      <Link
        href="/"
        className="flex items-center gap-1 text-secondary hover:text-primary transition-colors"
      >
        <HomeIcon className="h-4 w-4" />
        <span>Catálogo</span>
      </Link>

      {/* Items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-secondary hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-primary font-medium' : 'text-secondary'}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}


