import {extractClosestEdge} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import {getReorderDestinationIndex} from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import {monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {useCallback, useEffect} from 'react';

import reorder from './reorder';

import type {TDndHandleDropParams} from './types';

type TUseSortableDropParams<GItems> = {
  handleCustomDrop: (reorderedItems: GItems) => void;
  items: GItems;
  setItems: (reorderedItems: GItems) => void;
};

export default function useDrop<G>({handleCustomDrop, items, setItems}: TUseSortableDropParams<G>) {
  // Function to handle drop events
  const handleDrop = useCallback(
    ({location, source}: TDndHandleDropParams) => {
      if (location.current.dropTargets.length < 2) return;

      const draggedData = source.data;
      const dropTargetData = location.current.dropTargets.find((dropTarget) => {
        return dropTarget.data.cardParentId === draggedData.cardParentId;
      })?.data;

      if (!dropTargetData) return;
      if (draggedData.cardId === dropTargetData.cardId) return;

      const draggedPath = draggedData.cardKeyPath;
      const draggedParentPath = draggedPath?.substring(0, draggedPath.lastIndexOf('.'));
      const draggedIndex = Number(draggedPath?.substring(draggedPath.lastIndexOf('.') + 1));
      //
      const dropTargetPath = dropTargetData.cardKeyPath || '';
      const dropTargetIndex = Number(dropTargetPath.substring(dropTargetPath.lastIndexOf('.') + 1));
      const dropTargetClosestEdge = extractClosestEdge(dropTargetData);

      // Calculate the destination index for the cardmigo to be reordered within the same section
      const destinationIndex = getReorderDestinationIndex({
        axis: 'vertical',
        closestEdgeOfTarget: dropTargetClosestEdge,
        indexOfTarget: dropTargetIndex,
        startIndex: draggedIndex,
      });

      const reorderedItems = reorder<G>({
        finishIndex: destinationIndex,
        items,
        keyPath: draggedParentPath,
        startIndex: draggedIndex,
      });
      setItems(reorderedItems);
      handleCustomDrop(reorderedItems);
    },
    [handleCustomDrop, items, setItems],
  );

  // setup the monitor
  useEffect(() => {
    // @ts-expect-error @atlaskit/pragmatic-drag-and-drop
    return monitorForElements({onDrop: handleDrop});
  }, [handleDrop]);
}
