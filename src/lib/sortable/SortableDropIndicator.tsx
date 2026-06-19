import type {TDndEdge} from './types';

export default function SortableDropIndicator({edge, gap}: {edge: TDndEdge; gap: string}) {
  const edgeClassMap = {
    bottom: 'edge-bottom',
    top: 'edge-top',
  };
  const edgeClass = edgeClassMap[edge as keyof typeof edgeClassMap];
  return (
    <div
      className={`mf__sortable-drop-indicator ${edgeClass}`}
      // @ts-expect-error css var
      style={{'--sortable-drop-indicator-gap': gap}}
    />
  );
}
