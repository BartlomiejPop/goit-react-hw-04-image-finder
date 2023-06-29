import styles from './Searchbar.module.css';
import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  changeValue = value => {
    this.setState({ value: value });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form
          className={styles.SearchForm}
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(this.state.value);
          }}
        >
          <button type="submit" className={styles.SearchFormButton}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            onChange={e => this.changeValue(e.target.value)}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
