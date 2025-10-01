'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface AccordionItem {
  id: string;
  title: string;
  content?: string;
  children?: AccordionItem[];
}

interface NestedAccordionProps {
  readonly items: AccordionItem[];
  readonly level?: number;
  readonly className?: string;
}

export default function NestedAccordion({ 
  items, 
  level = 0, 
  className = '' 
}: NestedAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const isOpen = (itemId: string) => openItems.has(itemId);

  const getIndentClass = (level: number) => {
    const baseIndent = level * 16; // 16px por nivel
    return `ml-${Math.min(baseIndent, 64)}`; // Máximo 64px de indentación
  };

  const getLevelColors = (level: number) => {
    const colors = [
      'bg-card text-primary hover:bg-subtle border border-gray-200', // Nivel 0 - Blanco con borde
      'bg-card text-primary hover:bg-subtle', // Nivel 1 - Blanco
      'bg-subtle text-primary hover:bg-gray-100', // Nivel 2 - Gris muy claro
      'bg-card text-primary hover:bg-subtle', // Nivel 3 - Blanco
    ];
    return colors[level % colors.length];
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="overflow-hidden">
          <button
            onClick={() => toggleItem(item.id)}
            className={`
              w-full px-4 py-3 text-left transition-colors duration-200
              ${getLevelColors(level)}
              ${getIndentClass(level)}
              flex items-center justify-between
              ${level > 0 ? 'border-l-4 border-l-gray-500' : ''}
            `}
          >
            <span className="font-medium flex-1">
              {item.title}
            </span>
            {item.children && item.children.length > 0 && (
              <div className="ml-2 flex-shrink-0">
                {isOpen(item.id) ? (
                  <ChevronDownIcon className="h-5 w-5" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5" />
                )}
              </div>
            )}
          </button>
          
          {item.content && (
            <div className="px-4 py-3 bg-subtle text-secondary text-sm">
              {item.content}
            </div>
          )}
          
          {item.children && item.children.length > 0 && isOpen(item.id) && (
            <div>
              <NestedAccordion 
                items={item.children} 
                level={level + 1}
                className="p-2"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
