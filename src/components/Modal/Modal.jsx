import styles from './Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  // async componentDidMount() {
  //   this.setState({ isOpen: true });
  //   document.addEventListener('keydown', this.closeModal);
  // }

  // componentWillUnmount() {
  //   this.setState({ isOpen: true });
  //   document.removeEventListener('keydown', this.closeModal);
  // }

  // closeModal = e => {
  //   if (e.target.nodeName === 'DIV' || e.key === 'Escape') {
  //     this.setState({ isOpen: false });
  //   }
  // };

  render = () => {
    return (
      this.state.isOpen === true && (
        <div
          className={styles.Overlay}
          onClick={e => this.props.closeModal(e)}
          onKeyDown={e => this.props.closeModal(e.key)}
        >
          <div className={styles.Modal}>
            <img src={this.props.image[0]} alt={this.props.image[1]} />
          </div>
        </div>
      )
    );
  };
}
