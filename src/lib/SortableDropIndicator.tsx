import type {TDndEdge} from './types';

export default function SortableDropIndicator({edge, gap}: {edge: TDndEdge; gap: string}) {
  const edgeClassMap = {
    bottom: 'edge-bottom',
    top: 'edge-top',
  };
  const edgeClass = edgeClassMap[edge as keyof typeof edgeClassMap];
  let className = '';
  if (edge === 'bottom') {
    className = 'bottom-[calc(-0.65_*_(var(--sortable-drop-indicator-gap, 0px)))]';
  } else if (edge === 'top') {
    className = 'top-[calc(-0.65_*_(var(--sortable-drop-indicator-gap, 0px)))]';
  }
  return (
    <div
      className={`mf__sortable-drop-indicator absolute right-0 left-1 z-10 box-border h-1 bg-blue-600 ${className}`}
      // @ts-expect-error css var
      style={{'--sortable-drop-indicator-gap': gap}}
    />
  );
}
