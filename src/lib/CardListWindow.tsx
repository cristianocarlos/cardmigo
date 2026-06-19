import CardList from './CardList';

import type {TCardListProps} from './CardList';

export default function CardListWindow<T>(props: Omit<TCardListProps<T>, 'className' | 'style'>) {
  const {idKey, rowClassNameFn, rowHeight, rowRenderer, rows} = props;
  return (
    <CardList
      className="mf__card-list-window"
      idKey={idKey}
      rowClassNameFn={rowClassNameFn}
      rowHeight={rowHeight}
      rowRenderer={rowRenderer}
      rows={rows}
    />
  );
}
