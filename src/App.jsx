import { createSignal, Show } from 'solid-js';
import styles from './App.module.css';
import { getRandomLicensePlate } from './lib/engine';
import * as rng from './lib/rng';
import LicensePlate from './components/LicensePlate.jsx';

function getPlateLength({ city, middle, end }) {
  return city.abbr.length + middle.length + end.length;
}
function charAt({ city, middle, end }, index) {
  let cursor = index;
  if (cursor < city.abbr.length) {
    return city.abbr[cursor];
  }
  cursor -= city.abbr.length;
  if (cursor < middle.length) {
    return middle[cursor];
  }
  cursor -= middle.length;
  return end[cursor];
}
function randomChar(old) {
  if (
    old.charCodeAt(0) >= '0'.charCodeAt(0) &&
    old.charCodeAt(0) <= '9'.charCodeAt(0)
  ) {
    return rng.numeric(1);
  }
  return rng.alpha(1);
}

function App() {
  const [licensePlate, setLicensePlate] = createSignal(getRandomLicensePlate());
  let queue = [];
  let frameRequest;
  let frame = 0;
  let animationResolve;
  function update() {
    let complete = 0;
    let output = '';
    for (let i = 0; i < queue.length; i += 1) {
      const { from, to, start, end } = queue[i];
      let { char } = queue[i];
      if (frame >= end) {
        complete += 1;
        output += to;
        continue;
      }
      if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar(char || to || from);
          queue[i].char = char;
        }
        output += char;
        continue;
      }
      output += from;
    }

    setLicensePlate({
      city: { abbr: output.slice(0, newLicensePlate().city.abbr.length) },
      middle: output.slice(
        newLicensePlate().city.abbr.length,
        newLicensePlate().city.abbr.length + newLicensePlate().middle.length,
      ),
      end: output.slice(
        newLicensePlate().city.abbr.length + newLicensePlate().middle.length,
      ),
    });
    if (complete === queue.length) {
      animationResolve();
      return;
    }
    frameRequest = requestAnimationFrame(update);
    frame += 1;
  }
  const nextPlate = () => {
    const oldPlate = licensePlate();
    setOldLicensePlate(oldPlate);
    const newPlate = getRandomLicensePlate();
    setNewLicensePlate(newPlate);
    const length = Math.max(getPlateLength(oldPlate), getPlateLength(newPlate));
    queue = [];
    for (let i = 0; i < length; i += 1) {
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({
        from: charAt(oldPlate, i) || '',
        to: charAt(newPlate, i) || '',

        start,
        end,
      });
    }
    cancelAnimationFrame(frameRequest);
    frame = 0;
    update();
    return new Promise((resolve) => {
      animationResolve = resolve;
    });
  };

  return (
    <div class={styles.App}>
      <LicensePlate {...licensePlate()} />

      <button onClick={() => nextPlate().then(() => console.log('Resolved'))}>
        Generate new
      </button>
    </div>
  );
}

export default App;
