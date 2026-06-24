import type {TDndEdge} from './types';

export default function DropIndicator({edge, gap}: {edge: TDndEdge; gap: string}) {
  let className = '';
  if (edge === 'top') {
    className = 'top-[calc(-0.65*(var(--sortable-drop-indicator-gap,0px)))]';
  } else if (edge === 'bottom') {
    className = 'bottom-[calc(-0.65*(var(--sortable-drop-indicator-gap,0px)))]';
  }
  return (
    <div
      className={`pointer-events-none absolute right-0 left-1 z-10 box-border h-[2px] bg-blue-600 ${className}`}
      // @ts-expect-error css var
      style={{'--sortable-drop-indicator-gap': gap}}
    >
      <div className="absolute top-[-2px] -left-2 h-[6px] w-[6px] rounded-full border-2 border-blue-600" />
    </div>
  );
}
