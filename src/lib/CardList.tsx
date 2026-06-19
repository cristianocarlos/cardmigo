import YiiLang from '@/utils/yii-lang';

import type {TKeysOfType} from '@/types/helper';
import type {CSSProperties, ReactElement} from 'react';

export function rowInactiveClassNameHof<T>(statusKey: keyof T, inactiveValue: boolean | number | string) {
  return (data: T) => {
    return data[statusKey] === inactiveValue ? 'opacity-50' : undefined;
  };
}

export type TCardListProps<T> = {
  className?: string;
  idKey: TKeysOfType<T, number | string>; // Tem que ser uma coluna existente, somente dos tipos numero ou string
  rowClassNameFn?: (data: T) => string | undefined;
  rowHeight?: number;
  rowRenderer: (data: T, index: number) => ReactElement;
  rows: Array<T>;
  style?: CSSProperties;
};

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
