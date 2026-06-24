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

export type TCardmigoData<G> = {id: number; sortable_parent_id?: TDndParentId} & TCardmigoItemsTree<G>;

export type TDndHandleDropParams = {
  location: {
    current: {dropTargets: Array<TDndCardRecord>};
    initial: {dropTargets: Array<TDndCardRecord>};
  };
  source: {data: TDndCardData};
};

export type TCardmigoItemsTree<GData> = {items: Array<GData>};

export type TCardmigoItemRenderer<GData> = (rendererProps: {
  data: GData;
  index: number;
  refHtmlHandleDiv?: RefObject<HTMLDivElement | null>;
}) => ReactElement;
