import styles from './Loader.module.css';
import { Audio } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div class={styles.loaderBg}>
      <div class={styles.loader}>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    </div>
  );
};
