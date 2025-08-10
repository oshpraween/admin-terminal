import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type DragHandleBindings = {
  attributes: React.HTMLAttributes<any>;
  listeners: any;
  setActivatorNodeRef: (el: HTMLElement | null) => void;
};

type Props = {
  id: string;
  children: React.ReactNode | ((handle: DragHandleBindings) => React.ReactNode);
};

const SortableSlot: React.FC<Props> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const handleBindings: DragHandleBindings = {
    attributes,
    listeners,
    setActivatorNodeRef,
  };

  return (
    <div ref={setNodeRef} style={style} className="h-full">
      {typeof children === 'function' ? children(handleBindings) : children}
    </div>
  );
};

export default SortableSlot;
