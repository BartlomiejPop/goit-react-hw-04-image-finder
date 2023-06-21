import styles from './Button.module.css';
import propTypes from 'prop-types';
export const Button = loadMore => {
  return (
    <button className={styles.Button} onClick={() => loadMore.onClick()}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: propTypes.object,
};
