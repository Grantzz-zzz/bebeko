import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Heart, LockKeyhole, PartyPopper, Sparkles } from 'lucide-react';
import React, { useMemo, useState } from 'react';

const PASSCODE = [0, 5, 2, 9, 0, 4];

// CUSTOMIZE LETTER: change these lines for your birthday message.
const letterLines = [
  'Happy birthday. I made this little digital letter because a plain greeting felt too small for someone who deserves color, motion, and a whole tiny celebration.',
  'I hope this year gives you the soft kind of happiness: the one that shows up in calm days, funny moments, good people, and memories that stay bright.',
  'You are appreciated more than these words can carry. Today is yours, and I hope it feels full of love from the first second to the last.'
];

// CUSTOMIZE PHOTOS: put image files in /public/memories/ and set image: '/memories/your-file.jpg'.
const memories = [
  {
    title: 'First Page',
    caption: 'Put your first favorite photo here later.',
    image: '',
    color: 'card-blue'
  },
  {
    title: 'Sweet Moment',
    caption: 'A space for a memory that still makes you smile.',
    image: '',
    color: 'card-pink'
  },
  {
    title: 'Bright Day',
    caption: 'For the little moments that felt bigger than they looked.',
    image: '',
    color: 'card-yellow'
  },
  {
    title: 'Soft Laugh',
    caption: 'A page for the kind of joy that keeps echoing.',
    image: '',
    color: 'card-mint'
  }
];

function CelebrationBackground() {
  const bursts = useMemo(
    () =>
      Array.from({ length: 11 }, (_, index) => ({
        id: index,
        left: `${8 + Math.random() * 84}%`,
        top: `${8 + Math.random() * 72}%`,
        delay: Math.random() * 3.2,
        color: ['#f472b6', '#60a5fa', '#facc15', '#34d399', '#a78bfa', '#fb7185'][index % 6]
      })),
    []
  );

  const confetti = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5,
        color: ['#f472b6', '#60a5fa', '#facc15', '#34d399', '#a78bfa', '#fb7185'][index % 6]
      })),
    []
  );

  return (
    <div className="celebration-bg" aria-hidden="true">
      <div className="color-field field-blue" />
      <div className="color-field field-pink" />
      <div className="color-field field-yellow" />
      <div className="color-field field-mint" />
      <div className="color-field field-purple" />
      {bursts.map((burst) => (
        <motion.div
          key={burst.id}
          className="firework"
          style={{ left: burst.left, top: burst.top }}
          animate={{ scale: [0.2, 1, 1.35], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, delay: burst.delay, repeat: Infinity, repeatDelay: 2.4, ease: 'easeOut' }}
        >
          {Array.from({ length: 10 }).map((_, ray) => (
            <span key={ray} style={{ rotate: `${ray * 36}deg`, backgroundColor: burst.color }} />
          ))}
        </motion.div>
      ))}
      {confetti.map((piece) => (
        <motion.span
          key={piece.id}
          className="confetti"
          style={{ left: piece.left, backgroundColor: piece.color }}
          animate={{ y: ['-12vh', '112vh'], rotate: [0, 180, 360], opacity: [0, 1, 1, 0] }}
          transition={{ duration: piece.duration, delay: piece.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

function NumberDial({ value, index, onChange }) {
  const update = (next) => onChange(index, (next + 10) % 10);

  return (
    <div
      className="number-dial"
      onWheel={(event) => {
        event.preventDefault();
        update(value + (event.deltaY > 0 ? 1 : -1));
      }}
    >
      <button type="button" className="dial-btn" onClick={() => update(value - 1)} aria-label={`Decrease digit ${index + 1}`}>
        <ChevronUp size={14} />
      </button>
      <motion.span
        key={`${index}-${value}`}
        className="dial-number"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.22 }}
      >
        {value}
      </motion.span>
      <button type="button" className="dial-btn" onClick={() => update(value + 1)} aria-label={`Increase digit ${index + 1}`}>
        <ChevronDown size={14} />
      </button>
    </div>
  );
}

function LockScreen({ onUnlock }) {
  const [digits, setDigits] = useState([0, 0, 0, 0, 0, 0]);
  const [error, setError] = useState(false);

  const setDigit = (index, value) => {
    setDigits((current) => current.map((digit, digitIndex) => (digitIndex === index ? value : digit)));
    setError(false);
  };

  const unlock = () => {
    if (digits.every((digit, index) => digit === PASSCODE[index])) {
      onUnlock();
      return;
    }

    setError(true);
    window.setTimeout(() => setError(false), 520);
  };

  return (
    <motion.main
      className="screen lock-screen"
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <CelebrationBackground />
      <motion.section
        className="simple-lock"
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="lock-badge"
          animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <LockKeyhole size={42} />
        </motion.div>
        <motion.div
          className="number-lock"
          animate={error ? { x: [-10, 10, -7, 7, 0] } : { x: 0 }}
          transition={{ duration: 0.38 }}
        >
          {digits.map((digit, index) => (
            <NumberDial key={index} value={digit} index={index} onChange={setDigit} />
          ))}
        </motion.div>
        <motion.button type="button" className="unlock-btn" whileTap={{ scale: 0.95 }} onClick={unlock}>
          Unlock
        </motion.button>
      </motion.section>
    </motion.main>
  );
}

function LetterScreen({ onNext }) {
  return (
    <motion.main
      className="screen letter-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <CelebrationBackground />
      <motion.article
        className="letter-card"
        initial={{ opacity: 0, y: 60, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="letter-top">
          <span className="stamp">
            <Heart size={20} />
          </span>
          <p>Birthday message</p>
        </div>
        <h1>Your birthday letter</h1>
        <div className="letter-body">
          {letterLines.map((line, index) => (
            <motion.p
              key={line}
              initial={{ y: 14 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 + index * 0.12 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.button type="button" className="next-btn" whileTap={{ scale: 0.96 }} onClick={onNext}>
          See memories
        </motion.button>
      </motion.article>
    </motion.main>
  );
}

function MemoryCarousel({ onReplay }) {
  const [active, setActive] = useState(0);
  const rotate = (direction) => setActive((current) => (current + direction + memories.length) % memories.length);

  return (
    <motion.main
      className="screen memory-screen"
      initial={false}
      animate={{ x: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <CelebrationBackground />
      <section className="memory-wrap">
        <motion.div className="memory-heading" initial={false} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
          <PartyPopper size={34} />
          <h1>Memory carousel</h1>
          <p>Swap these cards with real photos later. The frame stays stable for portrait, square, or landscape images.</p>
        </motion.div>

        <div className="carousel-stage">
          {memories.map((memory, index) => {
            const offset = ((index - active + memories.length + 2) % memories.length) - 2;
            const focused = offset === 0;

            return (
              <motion.article
                key={memory.title}
                className={`memory-card ${memory.color}`}
                animate={{
                  x: offset * 155,
                  y: focused ? 0 : 34,
                  rotate: offset * 6,
                  scale: focused ? 1 : 0.82,
                  opacity: Math.abs(offset) > 2 ? 0 : focused ? 1 : 0.58,
                  zIndex: 10 - Math.abs(offset)
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="memory-photo">
                  {memory.image ? <img src={memory.image} alt={memory.title} /> : <Sparkles size={38} />}
                </div>
                <div className="memory-copy">
                  <h2>{memory.title}</h2>
                  <p>{memory.caption}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="carousel-controls">
          <button type="button" onClick={() => rotate(-1)} aria-label="Previous memory">
            <ChevronLeft size={22} />
          </button>
          <div className="memory-dots">
            {memories.map((memory, index) => (
              <button
                key={memory.title}
                type="button"
                className={active === index ? 'active' : ''}
                onClick={() => setActive(index)}
                aria-label={`Show ${memory.title}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => rotate(1)} aria-label="Next memory">
            <ChevronRight size={22} />
          </button>
        </div>

        <button type="button" className="replay-btn" onClick={onReplay}>
          Back to lock
        </button>
      </section>
    </motion.main>
  );
}

export default function App() {
  const [step, setStep] = useState(() => {
    const preview = new URLSearchParams(window.location.search).get('step');
    return preview === 'letter' || preview === 'memory' ? preview : 'lock';
  });

  return (
    <AnimatePresence mode="wait">
      {step === 'lock' && <LockScreen key="lock" onUnlock={() => setStep('letter')} />}
      {step === 'letter' && <LetterScreen key="letter" onNext={() => setStep('memory')} />}
      {step === 'memory' && <MemoryCarousel key="memory" onReplay={() => setStep('lock')} />}
    </AnimatePresence>
  );
}
