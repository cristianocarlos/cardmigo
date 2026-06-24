import {useCallback, useState} from 'react';

import Card from './Card';
import useDrop from './useDrop';

import type {TCardmigoData, TCardmigoItemRenderer, TCardmigoItemsTree} from './types';

type TCardmigoBoardProps<GData extends TCardmigoData<GData>> = {
  handleDragEnd?: (reorderedItems: TCardmigoItemsTree<GData>) => void;
  hasCustomHandle?: boolean;
  itemRenderer: TCardmigoItemRenderer<GData>;
  readOnly?: boolean;
  rows: Array<GData>;
};

export default function Board<GData extends TCardmigoData<GData>>(props: TCardmigoBoardProps<GData>) {
  const {handleDragEnd, hasCustomHandle, itemRenderer, readOnly, rows} = props;

  const [items, setItems] = useState<TCardmigoItemsTree<GData>>({items: rows});

  const handleCustomDrop = useCallback(
    (reorderedItemsTree: TCardmigoItemsTree<GData>) => {
      handleDragEnd?.(reorderedItemsTree);
    },
    [handleDragEnd],
  );

  useDrop({handleCustomDrop, items, setItems});

  return (
    <Card
      data={{id: Infinity, items: items.items, sortable_parent_id: Infinity} as GData}
      hasCustomHandle={hasCustomHandle}
      itemRenderer={itemRenderer}
      level={0}
      readOnly={readOnly}
      sibilingsLength={items.items.length}
    />
  );
}
