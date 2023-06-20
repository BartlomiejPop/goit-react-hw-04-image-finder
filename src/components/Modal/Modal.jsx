import styles from './Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true,
    };
  }

  componentDidMount() {
    this.setState({ isOpen: true });
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    if (e.target.nodeName === 'DIV' || e.key === 'Escape') {
      this.setState({ isOpen: false });
    }
  };

  render = () => {
    if (this.state.isOpen === false) {
      console.log('false');
      return;
    }
    return (
      <div
        className={styles.Overlay}
        onClick={e => this.closeModal(e)}
        onKeyDown={e => this.closeModal(e.key)}
      >
        <div className={styles.Modal}>
          <img src={this.props.image[0]} alt={this.props.image[1]} />
        </div>
      </div>
    );
  };
}
