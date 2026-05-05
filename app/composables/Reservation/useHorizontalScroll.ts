// composables/useHorizontalScroll.ts
export function useHorizontalScroll() {
  const monthStripRef = ref<HTMLElement | null>(null);
  const dayStripRef = ref<HTMLElement | null>(null);

  function centerStripItem(
    strip: HTMLElement | null,
    attr: string,
    value: string,
  ) {
    if (!strip || !value) return;
    const el = strip.querySelector<HTMLElement>(`[${attr}="${value}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }

  function onDayStripWheel(e: WheelEvent) {
    const el = dayStripRef.value;
    if (!el) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    el.scrollBy({ left: e.deltaY });
  }

  return {
    monthStripRef,
    dayStripRef,
    centerStripItem,
    onDayStripWheel,
  };
}
