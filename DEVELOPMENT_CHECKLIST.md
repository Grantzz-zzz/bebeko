# Birthday Website Development Checklist

## Structure Plan

- `src/main.jsx`: React entry point.
- `src/App.jsx`: Page flow, lockscreen, birthday passcode UI, letter page, carousel, and editable memory data.
- `src/styles.css`: Tailwind imports, cinematic theme utilities, glassmorphism, cake lock styling, particles, carousel visuals, and responsive rules.
- `tailwind.config.js`: Soft pastel-blue design tokens.

## Page 1: Birthday Lockscreen

- Animated ambient background with aurora layers, glow, and floating particles.
- Custom 6-digit passcode system using `052904`.
- Scroll-wheel number lock with six independent digit tumblers.
- Mouse wheel and up/down controls for each number.
- Wrong passcode shake animation.
- Correct passcode blur/dissolve transition into the letter page.
- Layout keeps future personal images separate from the lock animation system.

## Page 2: Letter And Memories

- Open digital letter popup styled like a two-page book.
- Left page contains the emotional letter content.
- Right page contains memory/photo popup pages inside the letter itself.
- Animated memory pages use perspective depth, side-card layering, and focused captions.
- Adaptive memory cards can use either a watercolor fallback or a future image URL.
- Image framing uses `object-fit: cover` so portrait, landscape, and square memories can be inserted safely.
- Carousel controls and pagination dots.

## Reusable Systems

- `AmbientBackground`: shared cinematic atmosphere.
- `ScrollLock`: reusable scroll-wheel lock UI.
- `NumberWheel`: reusable digit tumbler.
- `MemoryCarousel`: reusable carousel shell.
- `MemoryBookPage`: memory page carousel embedded in the letter.
- `memories` array: main customization point for future photos and captions.

## Animation System

- Framer Motion used for page transitions, shake, floating idle motion, 3D carousel movement, and fade-up text.
- CSS handles glass reflections, ripple effects, soft glows, and decorative atmospheric layers.
- Easing favors `cubic-bezier(0.16, 1, 0.3, 1)` for cinematic movement.

## Styling System

- Palette: powder blue, icy cyan, baby blue, lavender-blue, frosted white, muted silver, deep night.
- Glassmorphism: translucent surfaces, backdrop blur, glowing borders, inset highlights.
- Responsive constraints: stable button sizing, adaptive carousel width, mobile-friendly panels.

## Future Customization

- Add personal photos by setting `image` in each object in the `memories` array inside `src/App.jsx`.
- Keep `gradient` as fallback for loading states or memories without photos.
- Update birthday letter text inside `LetterPage`.
- Update passcode by changing `PASSCODE` in `src/App.jsx`.
