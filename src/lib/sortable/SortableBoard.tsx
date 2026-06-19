import {useCallback, useState} from 'react';

import SortableCard from './SortableCard';
import useSortableDrop from './useSortableDrop';

import type {TDndCardProps} from './SortableCard';
import type {TDataCard} from './types';

type TDndBoardSortableItems<GData> = {items: Array<GData>};

export type IPDndBoard<GData extends TDataCard<GData>> = Pick<
  TDndCardProps<GData>,
  'hasCustomHandle' | 'itemRenderer'
> & {
  handleDragEnd?: (reorderedItems: TDndBoardSortableItems<GData>) => void;
  readOnly?: boolean;
  rows: Array<GData>;
};

export default function SortableBoard<GData extends TDataCard<GData>>(props: IPDndBoard<GData>) {
  const {handleDragEnd, hasCustomHandle, itemRenderer, readOnly, rows} = props;

  const [items, setItems] = useState<TDndBoardSortableItems<GData>>({items: rows});

  const handleCustomDrop = useCallback(
    (reorderedItems: TDndBoardSortableItems<GData>) => {
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
