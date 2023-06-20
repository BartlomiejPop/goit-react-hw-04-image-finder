import styles from './Button.module.css';
export const Button = loadMore => {
  return (
    <button className={styles.Button} onClick={() => loadMore.onClick()}>
      Load more
    </button>
  );
};
