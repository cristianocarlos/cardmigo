import CardList from './CardList';

import type {TCardListSectionProps} from './types';

export default function CardListSection<T>(props: TCardListSectionProps<T>) {
  const {idKey, rowClassNameFn, rowHeight, rowRenderer, rows, visibleCount} = props;
  let maxHeight: number | undefined = undefined;
  if (visibleCount && rows.length > visibleCount) {
    maxHeight = rowHeight * visibleCount + rowHeight / 2;
  }
  return (
    <CardList
      idKey={idKey}
      rowClassNameFn={rowClassNameFn}
      rowHeight={rowHeight}
      rowRenderer={rowRenderer}
      rows={rows}
      style={maxHeight ? {maxHeight, overflow: 'auto'} : undefined}
    />
  );
}
