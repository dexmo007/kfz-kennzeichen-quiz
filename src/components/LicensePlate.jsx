import styles from './LicensePlate.module.css';
import EuroStars from '../assets/European_stars.svg';

export default function LicensePlate(props) {
  return (
    <div classList={{ [styles.plate]: true, [props.class]: !!props.class }}>
      <div class={styles.prefix}>
        <img class={styles.stars} src={EuroStars} alt="euro stars" />
        <span class={styles.country}>D</span>
      </div>
      <div class={styles['letter-container']}>
        <span class={styles.city}>{props.city.abbr}</span>
        <span class={styles.middle}>{props.middle}</span>
        <span>{props.end}</span>
      </div>
    </div>
  );
}
