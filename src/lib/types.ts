// null = primeiro level da árvore de itens
// number = filhos
// undefined = board
import type {TKeysOfType} from '@/types/helper';
import type {CSSProperties, ReactElement, RefObject} from 'react';

type TDndDropEffect = 'copy' | 'link' | 'move';

type TDndCardRecord = {
  data: TDndCardData;
  dropEffect: TDndDropEffect;
  element: HTMLElement;
  isActiveDueToStickiness: boolean;
};

export type TDndHandleDropParams = {
  location: {
    current: {dropTargets: Array<TDndCardRecord>};
    initial: {dropTargets: Array<TDndCardRecord>};
  };
  source: {data: TDndCardData};
};

export type TCardListSectionProps<T> = Pick<TCardListProps<T>, 'idKey' | 'rowClassNameFn' | 'rowRenderer' | 'rows'> & {
  rowHeight: NonNullable<TCardListProps<T>['rowHeight']>;
  visibleCount?: number;
};

export type TCardListProps<T> = {
  className?: string;
  idKey: TKeysOfType<T, number | string>; // Tem que ser uma coluna existente, somente dos tipos numero ou string
  rowClassNameFn?: (data: T) => string | undefined;
  rowHeight?: number;
  rowRenderer: (data: T, index: number) => ReactElement;
  rows: Array<T>;
  style?: CSSProperties;
};

/******
 */
type TDndParentId = null | number | undefined;
export type TDndEdge = 'bottom' | 'left' | 'right' | 'top';
export type TDndCardData = {
  cardId?: number;
  cardKeyPath?: string;
  cardParentId: TDndParentId;
  type: string;
};

export type TSortableItems<GData> = {items: Array<GData>};
export type TSortableCardData<GData> = {
  id: number;
  items?: TSortableItems<GData>['items'];
  sortable_parent_id?: TDndParentId;
};
type TSortableItemRendererData<GData> = {
  data: GData;
  index: number;
  refHtmlHandleDiv?: RefObject<HTMLDivElement | null>;
};
export type TSortableItemRenderer<GData> = (itemData: TSortableItemRendererData<GData>) => ReactElement;
export type TSortableDragEndHandler<GData> = (reorderedItems: TSortableItems<GData>) => void;
export type TSortableBoardProps<GData> = {
  handleDragEnd?: TSortableDragEndHandler<GData>;
  hasCustomHandle?: boolean;
  itemRenderer: TSortableItemRenderer<GData>;
  readOnly?: boolean;
  rows: TSortableItems<GData>['items'];
};
export type TSortableCardProps<GData extends TSortableCardData<GData>> = {
  data: GData;
  hasCustomHandle?: boolean;
  index?: number;
  itemRenderer: TSortableItemRenderer<GData>;
  keyPath?: string;
  level: number;
  readOnly?: boolean;
  sibilingsLength: number;
};
