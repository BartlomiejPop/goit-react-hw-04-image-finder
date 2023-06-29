import styles from './Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }
  render = () => {
    return (
      this.state.isOpen === true && (
        <div
          className={styles.Overlay}
          onClick={e => this.props.closeModal(e)}
          onKeyDown={e => this.props.closeModal(e)}
        >
          <div className={styles.Modal}>
            <img src={this.props.image[0]} alt={this.props.image[1]} />
          </div>
        </div>
      )
    );
  };
}
