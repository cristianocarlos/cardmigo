import type {ReactElement, RefObject} from 'react';

// null = primeiro level da árvore de itens
// number = filhos
// undefined = board
type TDndParentId = null | number | undefined;

export type TDndEdge = 'bottom' | 'left' | 'right' | 'top';

export type TDndCardData = {
  cardId?: number;
  cardKeyPath?: string;
  cardParentId: TDndParentId;
  type: string;
};

type TDndDropEffect = 'copy' | 'link' | 'move';

type TDndCardRecord = {
  data: TDndCardData;
  dropEffect: TDndDropEffect;
  element: HTMLElement;
  isActiveDueToStickiness: boolean;
};

export type TCardmigoData<G> = {id: number; items?: TCardmigoItemsTree<G>['items']; sortable_parent_id?: TDndParentId;};

export type TDndHandleDropParams = {
  location: {
    current: {dropTargets: Array<TDndCardRecord>};
    initial: {dropTargets: Array<TDndCardRecord>};
  };
  source: {data: TDndCardData};
};

export type TCardmigoItemsTree<G> = {items: Array<G>};

export type TCardmigoItemRenderer<G> = (rendererProps: {
  data: G;
  index: number;
  refHtmlHandleDiv?: RefObject<HTMLDivElement | null>;
}) => ReactElement;
