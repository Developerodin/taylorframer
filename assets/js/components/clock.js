export function initNyClock(root = document) {
  const el = root.querySelector("#ny-time");
  if (!el) return;

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const tick = () => {
    el.textContent = formatter.format(new Date());
  };

  tick();
  window.setInterval(tick, 1000);
}
