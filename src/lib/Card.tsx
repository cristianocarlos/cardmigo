import {attachClosestEdge, extractClosestEdge} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {draggable, dropTargetForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {useEffect, useRef, useState} from 'react';
import invariant from 'tiny-invariant';

import DropIndicator from './DropIndicator';

import type {TCardmigoData, TCardmigoItemRenderer, TDndCardData, TDndEdge} from './types';

type TCardmigoCardProps<GData extends TCardmigoData<GData>> = {
  data: GData;
  hasCustomHandle?: boolean;
  index?: number;
  itemRenderer: TCardmigoItemRenderer<GData>;
  keyPath?: string;
  level: number;
  readOnly?: boolean;
  sibilingsLength: number;
};

export default function Card<GData extends TCardmigoData<GData>>(props: TCardmigoCardProps<GData>) {
  const {data, hasCustomHandle, index, itemRenderer, keyPath, level, readOnly, sibilingsLength} = props;

  const refHtmlCardDiv = useRef<HTMLDivElement>(null);
  const refHtmlHandleDiv = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false); // create a state for dragging
  const [closestEdge, setClosestEdge] = useState<null | TDndEdge>(null);

  const isLevelZero = level === 0;

  const dataId = data.id;
  const canDrag = !isLevelZero && sibilingsLength > 1;

  useEffect(() => {
    const htmlCardElement = refHtmlCardDiv.current;
    const htmlHandleElement = refHtmlHandleDiv.current;

    invariant(htmlCardElement); // Ensure the cardmigo element exists

    return combine(
      draggable({
        canDrag: () => canDrag,
        dragHandle: htmlHandleElement || undefined,
        element: htmlCardElement, // Attach the cardmigo element to draggable
        getInitialData: (): TDndCardData => ({
          cardId: dataId,
          cardKeyPath: keyPath,
          cardParentId: data.sortable_parent_id,
          type: 'cardmigo',
        }), // Attach cardmigo data to a draggable item when dragging starts
        onDragStart: () => setIsDragging(true), // set isDragging to true when dragging starts
        onDrop: () => setIsDragging(false), // set isDragging to false when dragging ends
      }),
      dropTargetForElements({
        element: htmlCardElement,
        getData: ({element, input}) => {
          // To attach cardmigo data to a drop target
          const closestEdgeData: TDndCardData = {
            cardId: dataId,
            cardKeyPath: keyPath,
            cardParentId: data.sortable_parent_id,
            type: 'cardmigo',
          };
          // Attaches the closest edge (top or bottom) to the data object
          // This data will be used to determine where to drop cardmigo relative
          // to the target cardmigo.
          return attachClosestEdge(closestEdgeData, {
            allowedEdges: ['top', 'bottom'],
            element,
            input,
          });
        },
        getIsSticky: () => true, // To make a drop target 'sticky'
        // TODA ESSA LOGICA é só para o indicador
        onDrag: (args) => {
          // Continuously update the closest edge while dragging over the drop zone
          if (args.source.data.cardParentId === data.sortable_parent_id) {
            if (args.source.data.cardId !== dataId) {
              setClosestEdge(extractClosestEdge(args.self.data));
            }
          }
        },
        onDragEnter: (args) => {
          // Update the closest edge when a draggable item enters the drop zone
          if (args.source.data.cardParentId === data.sortable_parent_id) {
            if (args.source.data.cardId !== dataId) {
              setClosestEdge(extractClosestEdge(args.self.data));
            }
          }
        },
        onDragLeave: () => {
          // Reset the closest edge when the draggable item leaves the drop zone
          setClosestEdge(null);
        },
        onDrop: () => {
          // Reset the closest edge when the draggable item is dropped
          setClosestEdge(null);
        },
      }),
    );
  }, [canDrag, dataId, data.sortable_parent_id, keyPath]);

  const nextSibilingsLength = data.items?.length || 0;

  return (
    <div
      className={`flex flex-col gap-2 ${level > 1 ? 'ml-8' : ''} ${isDragging ? 'opacity-50' : ''} ${isLevelZero ? '' : 'relative'}`}
      ref={refHtmlCardDiv}
    >
      {level === 0 ? undefined : (
        <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-lg max-sm:p-4">
          {hasCustomHandle || readOnly ? null : (
            <div className={`cursor-grab ${canDrag ? '' : 'cursor-default! opacity-50'}`} ref={refHtmlHandleDiv}>
              <svg
                aria-hidden="true"
                className="lucide lucide-move"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2v20"></path>
                <path d="m15 19-3 3-3-3"></path>
                <path d="m19 9 3 3-3 3"></path>
                <path d="M2 12h20"></path>
                <path d="m5 9-3 3 3 3"></path>
                <path d="m9 5 3-3 3 3"></path>
              </svg>
            </div>
          )}
          <div className="flex-1">
            {itemRenderer({
              data,
              index: index || 0,
              refHtmlHandleDiv: hasCustomHandle && !readOnly ? refHtmlHandleDiv : undefined,
            })}
          </div>
        </div>
      )}
      {data.items?.map((itemData, itemIndex) => {
        return (
          <Card
            data={itemData}
            hasCustomHandle={hasCustomHandle}
            index={itemIndex}
            itemRenderer={itemRenderer}
            key={itemData.id}
            keyPath={(keyPath ? keyPath + '.' : '') + 'items.' + itemIndex}
            level={level + 1}
            readOnly={readOnly}
            sibilingsLength={nextSibilingsLength}
          />
        );
      })}
      {/* render the DropIndicator if there's a closest edge */}
      {closestEdge && level !== 0 ? <DropIndicator edge={closestEdge} gap="8px" /> : undefined}
    </div>
  );
}
