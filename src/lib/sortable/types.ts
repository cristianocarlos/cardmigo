// null = primeiro level da árvore de itens
// number = filhos
// undefined = board
type TDndParentId = null | number | undefined;

export type TDataCard<G> = {id: number; items?: Array<G>; sortable_parent_id?: TDndParentId};

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

export type TDndHandleDropParams = {
  location: {
    current: {dropTargets: Array<TDndCardRecord>};
    initial: {dropTargets: Array<TDndCardRecord>};
  };
  source: {data: TDndCardData};
};
