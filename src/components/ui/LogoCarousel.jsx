import { useEffect, useRef } from 'react';

export default function LogoCarousel({ items }) {
  const track = useRef(null);
  const group = useRef(null);
  const state = useRef({ x: 0, width: 0, drag: null, resumeAt: 0 });
  const count = items?.length ?? 0;
  const logos = count ? Array.from({ length: Math.ceil(8 / count) }, () => items).flat() : [];
  const paint = () => {
    const s = state.current;
    if (!s.width || !track.current) return;
    s.x = ((s.x % s.width) + s.width) % s.width;
    track.current.style.transform = `translateX(${-s.width - s.x}px)`;
  };
  useEffect(() => {
    if (!count) return undefined;
    const s = state.current;
    const measure = () => {
      const old = s.width;
      s.width = group.current.getBoundingClientRect().width;
      if (old) s.x = s.x / old * s.width;
      paint();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(group.current);
    measure();
    let frame, previous;
    const tick = (time) => {
      const delta = previous === undefined ? 0 : Math.min(time - previous, 50);
      previous = time;
      if (!document.hidden && !s.drag && time >= s.resumeAt) {
        s.x += delta * 0.036;
        paint();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); s.drag = null; };
  }, [count]);
  const advance = (direction) => {
    const card = group.current?.firstElementChild;
    if (!card) return;
    state.current.x += direction * (card.getBoundingClientRect().width + parseFloat(getComputedStyle(group.current).columnGap));
    state.current.resumeAt = performance.now();
    paint();
  };
  const release = (event) => {
    if (state.current.drag?.id !== event.pointerId) return;
    state.current.drag = null;
    state.current.resumeAt = performance.now();
    event.currentTarget.style.cursor = 'grab';
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  if (!count) return null;
  const renderGroup = (copy) => (
    <ul ref={copy === 1 ? group : undefined} aria-hidden={copy !== 1 || undefined} className="flex shrink-0 items-center gap-4 pr-4 menu:gap-6 menu:pr-6">
      {logos.map((item, index) => (
        <li key={`${item.id}-${index}`} className="h-24 w-40 shrink-0 menu:h-32 menu:w-64">
          {item.logo ? <div className="flex size-full items-center justify-center overflow-hidden rounded-lg" style={{ backgroundColor: item.fondo ?? '#ffffff' }}>
            <img src={item.logo} alt={item.name} draggable={false} fetchPriority="low" className="pointer-events-none max-h-full max-w-full object-contain" />
          </div> : <span className="grid size-full place-items-center rounded-lg border border-dashed border-line-strong bg-bg p-2 text-center text-xs text-fg-mute">{item.name}</span>}
        </li>
      ))}
    </ul>
  );
  return <div>
    <div role="region" aria-label="Empresas que confían en nosotros. Deslizá o arrastrá para recorrer los logos; también podés usar las flechas del teclado." tabIndex={0}
      className="cursor-grab touch-pan-y select-none overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      onKeyDown={(event) => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); advance(event.key === 'ArrowRight' ? 1 : -1); } }}
      onPointerDown={(event) => { if (!event.isPrimary || event.button !== 0) return; state.current.drag = { id: event.pointerId, x: event.clientX }; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.style.cursor = 'grabbing'; }}
      onPointerMove={(event) => { const drag = state.current.drag; if (!drag || drag.id !== event.pointerId) return; state.current.x -= event.clientX - drag.x; drag.x = event.clientX; paint(); }}
      onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}>
      <div ref={track} className="flex w-max will-change-transform">{renderGroup(0)}{renderGroup(1)}{renderGroup(2)}</div>
    </div>
  </div>;
}
