import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCenter,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { RootState } from 'src/store/rootReducer';
import {
  getWidgetById,
  assignWidgetToSlot,
} from 'src/store/reducer/dashboardWidgets.slice';
import WidgetCard from './WidgetCard';
import EmptyWidgetCard from './EmptyWidgetCard';
import WidgetSelectionModal from './WidgetSelectionModal';
import SortableSlot from './SortableSlot';

const defaultSlots = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6'];

const WidgetSlotGrid: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const allWidgets = useSelector(
    (s: RootState) => s.dashboardWidget.allWidgets
  );
  const slotMapping = useSelector(
    (s: RootState) => s.dashboardWidget.slotMapping
  );

  const order = defaultSlots;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const from = String(active.id);
    const to = String(over.id);

    const wa = slotMapping[from];
    const wb = slotMapping[to];

    dispatch(assignWidgetToSlot({ slotId: from, widgetId: wb || '' }));
    dispatch(assignWidgetToSlot({ slotId: to, widgetId: wa || '' }));
  };

  return (
    <>
      <div className="h-full overflow-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {/* Items list must match the DOM order of SortableSlots */}
          <SortableContext items={order} strategy={rectSortingStrategy}>
            <div className="grid h-full gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-[1fr]">
              {order.map((slotId) => {
                const widgetId = slotMapping[slotId];
                const widget = getWidgetById(allWidgets, widgetId || '');
                return (
                  <SortableSlot key={slotId} id={slotId}>
                    {(handle) => (
                      <div className="h-full min-h-[160px]">
                        {widget ? (
                          <WidgetCard
                            widget={widget}
                            slotId={slotId}
                            dragHandle={handle}
                            onRemove={(id) =>
                              dispatch(
                                assignWidgetToSlot({ slotId: id, widgetId: '' })
                              )
                            }
                          />
                        ) : (
                          <EmptyWidgetCard
                            slotId={slotId}
                            onClick={setSelectedSlotId}
                          />
                        )}
                      </div>
                    )}
                  </SortableSlot>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <WidgetSelectionModal
        visible={!!selectedSlotId}
        slotId={selectedSlotId}
        onClose={() => setSelectedSlotId(null)}
      />
    </>
  );
};

export default WidgetSlotGrid;
