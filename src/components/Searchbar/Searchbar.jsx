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
      <header className="searchbar">
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(this.state.value);
          }}
        >
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            onChange={e => this.changeValue(e.target.value)}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            //   onSubmit={onSubmit}
          />
        </form>
      </header>
    );
  }
}
