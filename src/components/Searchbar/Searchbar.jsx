import styles from './Searchbar.module.css';
import { useState } from 'react';
import propTypes from 'prop-types';

export const Searchbar = searchForImages => {
  const [value, setValue] = useState('');
  return (
    <header className={styles.Searchbar}>
      <form
        className={styles.SearchForm}
        onSubmit={e => {
          e.preventDefault();
          searchForImages.onSubmit(value);
        }}
      >
        <button type="submit" className={styles.SearchFormButton}>
          <span className="button-label">Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          onChange={e => setValue(e.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  searchForImages: propTypes.object,
};
