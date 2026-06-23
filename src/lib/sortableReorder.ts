import {reorder} from '@atlaskit/pragmatic-drag-and-drop/reorder';
import {produce as immerProduce} from 'immer';

import {immerGetValueIn, immerMutatorSetValueIn} from '@/utils/immerHelper';

type TDndReorder<G> = {
  finishIndex: number;
  items: G;
  keyPath?: string;
  startIndex: number;
};

export default function sortableReorder<G>(params: TDndReorder<G>) {
  const {finishIndex, items, keyPath, startIndex} = params;

  const reorderedItems = immerProduce(items, (proxyItems) => {
    // Call the reorder function to get a new array
    // of cards with the moved card's new position
    const newItems = reorder({
      finishIndex,
      list: immerGetValueIn(proxyItems, keyPath || ''),
      startIndex,
    });
    immerMutatorSetValueIn(proxyItems, keyPath || '', newItems);
  });
  return reorderedItems;
}
