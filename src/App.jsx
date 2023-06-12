import styles from './App.module.css';
import data from './assets/data.json';

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <pre>
          {JSON.stringify(data[0], undefined, 2)}
        </pre>
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
}

export default App;
