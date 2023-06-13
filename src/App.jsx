import { createSignal } from 'solid-js';
import styles from './App.module.css';
import { getRandomLicensePlate } from './lib/engine';
import LicensePlate from './components/LicensePlate.jsx';

function App() {
  const [licensePlate, setLicensePlate] = createSignal(getRandomLicensePlate());
  return (
    <div class={styles.App}>
      <LicensePlate {...licensePlate()} />
      <button onClick={() => setLicensePlate(getRandomLicensePlate())}>
        Generate new
      </button>
    </div>
  );
}

export default App;
