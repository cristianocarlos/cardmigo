import YiiLang from '@/utils/yii-lang';

import type {TCardListProps} from '@/lib/types';

export function rowInactiveClassNameHof<T>(statusKey: keyof T, inactiveValue: boolean | number | string) {
  return (data: T) => {
    return data[statusKey] === inactiveValue ? 'opacity-50' : undefined;
  };
}

export default function CardList<T>(props: TCardListProps<T>) {
  const {className, idKey, rowClassNameFn, rowHeight, rowRenderer, rows, style} = props;
  const rowsCount = rows.length;
  return (
    <div className={className} style={style}>
      {rowsCount === 0 ? (
        <div className="agg--message-smooth">{YiiLang.cardmigo('textNotFound')}</div>
      ) : (
        <div className="card-list">
          {rows.map((rowData, index) => {
            const rowClassName = rowClassNameFn?.(rowData) || '';
            return (
              <div
                className={`card-list__item ${rowClassName}`}
                key={rowData[idKey] as number | string}
                style={rowHeight ? {height: rowHeight} : undefined}
              >
                {rowRenderer(rowData, index)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
