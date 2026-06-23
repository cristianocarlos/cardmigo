import {useCallback, useState} from 'react';

import SortableCard from './SortableCard';
import useSortableDrop from './useSortableDrop';

import type {TSortableBoardProps, TSortableCardData, TSortableItems} from './types';

export default function SortableBoard<GData extends TSortableCardData<GData>>(props: TSortableBoardProps<GData>) {
  const {handleDragEnd, hasCustomHandle, itemRenderer, readOnly, rows} = props;

  const [items, setItems] = useState<TSortableItems<GData>>({items: rows});

  const handleCustomDrop = useCallback(
    (reorderedItems: TSortableItems<GData>) => {
      handleDragEnd?.(reorderedItems);
    },
    [handleDragEnd],
  );

  useSortableDrop({handleCustomDrop, items, setItems});

  return (
    <div className="mf__sortable-board">
      <SortableCard
        data={{id: Infinity, items: items.items, sortable_parent_id: Infinity} as GData}
        hasCustomHandle={hasCustomHandle}
        itemRenderer={itemRenderer}
        level={0}
        readOnly={readOnly}
        sibilingsLength={items.items.length}
      />
    </div>
  );
}
