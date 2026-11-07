import Matter from 'matter-js';

type ItemBody = Matter.Body & { el: HTMLElement; w: number; h: number };
type MouseWithHandlers = Matter.Mouse & Record<'mousemove' | 'mousedown' | 'mouseup' | 'mousewheel', EventListener>;

export type PhysicsPile = {
  setRunning: (on: boolean) => void;
  resize: () => void;
  destroy: () => void;
};

const WALL = 400;

export function createPhysicsPile(pile: HTMLElement, itemSelector: string): PhysicsPile {
  const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;
  const engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
  let walls: Matter.Body[] = [];
  let mouse: MouseWithHandlers | null = null;
  let running = false;
  let raf = 0;

  const buildWalls = () => {
    if (walls.length) Composite.remove(engine.world, walls);
    const { clientWidth: w, clientHeight: h } = pile;
    walls = [
      Bodies.rectangle(w / 2, h + WALL / 2, w + WALL * 2, WALL, { isStatic: true }),
      Bodies.rectangle(-WALL / 2, h / 2 - 1000, WALL, h + 2000, { isStatic: true }),
      Bodies.rectangle(w + WALL / 2, h / 2 - 1000, WALL, h + 2000, { isStatic: true }),
    ];
    Composite.add(engine.world, walls);
  };

  buildWalls();
  const width = pile.clientWidth;
  const nodes = Array.from(pile.querySelectorAll<HTMLElement>(itemSelector)).filter((el) => el.offsetWidth > 0);
  const items = nodes.map((el, i) => {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const body = Bodies.rectangle(
      w / 2 + Math.random() * Math.max(1, width - w),
      -h - i * 55 - Math.random() * 80,
      w,
      h,
      {
        chamfer: { radius: h / 2 },
        restitution: 0.35,
        friction: 0.5,
        frictionAir: 0.012,
        angle: (Math.random() - 0.5) * 0.8,
      },
    ) as ItemBody;
    return Object.assign(body, { el, w, h });
  });
  Composite.add(engine.world, items);

  if (window.matchMedia('(pointer: fine)').matches) {
    mouse = Mouse.create(pile) as MouseWithHandlers;
    for (const type of ['mousewheel', 'DOMMouseScroll', 'wheel']) pile.removeEventListener(type, mouse.mousewheel);
    Composite.add(engine.world, MouseConstraint.create(engine, { mouse }));
  }

  const tick = () => {
    Engine.update(engine, 1000 / 60);
    for (const b of items) {
      b.el.style.transform = `translate(${b.position.x - b.w / 2}px, ${b.position.y - b.h / 2}px) rotate(${b.angle}rad)`;
    }
    raf = running ? requestAnimationFrame(tick) : 0;
  };

  return {
    setRunning(on) {
      if (on === running) return;
      running = on;
      if (on) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    },
    resize() {
      buildWalls();
      const w = pile.clientWidth;
      for (const b of items) {
        if (b.position.x > w - b.w / 2) Body.setPosition(b, { x: w - b.w / 2, y: b.position.y - 40 });
      }
    },
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      if (mouse) {
        pile.removeEventListener('mousemove', mouse.mousemove);
        pile.removeEventListener('mousedown', mouse.mousedown);
        pile.removeEventListener('mouseup', mouse.mouseup);
        pile.removeEventListener('touchmove', mouse.mousemove);
        pile.removeEventListener('touchstart', mouse.mousedown);
        pile.removeEventListener('touchend', mouse.mouseup);
      }
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      for (const b of items) b.el.style.transform = '';
    },
  };
}
