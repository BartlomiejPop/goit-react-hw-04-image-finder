import styles from '../styles.module.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  constructor() {
    super();
    this.searchForImages = this.searchForImages.bind(this);
    // this.loadMore = this.loadMore.bind(this);
  }

  state = {
    phrase: '',
    images: [],
    page: 1,
    isLoading: true,
    error: null,
    modal: [],
    modalOpen: false,
    showButton: true,
  };

  // loading = () => {
  //   this.setState(prev => ({ isLoading: !prev.isLoading }));
  //   console.log(this.state.isLoading);
  // };

  async componentDidMount() {
    try {
      // this.loading();
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.phrase}&page=1&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({ images: response.data.hits, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }
  // async componentDidUpdate() {
  //   const response = await axios.get(
  //     `https://pixabay.com/api/?q=${this.state.phrase}&page=1&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
  //   );
  //   // console.log(this.images);
  // }

  searchForImages(phrase) {
    try {
      this.setState({ isLoading: true });
      // this.loading();
      axios
        .get(
          `https://pixabay.com/api/?q=${phrase}&page=1&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          if (response.data.hits.length === 12) {
            this.setState({ showButton: true });
          }
          this.setState({
            images: response.data.hits,
            phrase: phrase,
            isLoading: false,
          });
        });
    } catch (error) {
      this.setState({ error });
    }
  }

  loadMore = () => {
    try {
      this.setState({ isLoading: true, page: this.state.page + 1 });
      // this.loading();
      axios
        .get(
          `https://pixabay.com/api/?q=${this.state.phrase}&page=${
            this.state.page + 1
          }&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          console.log(response.data.hits);
          if (response.data.hits.length < 12) {
            this.setState({ showButton: false });
          }
          this.setState(prev => ({
            images: [...prev.images, ...response.data.hits],
            isLoading: false,
          }));
        });
    } catch (error) {
      this.setState({ error });
    }

    // this.loading();
  };

  showModal = image => {
    const photo = this.state.images.filter(el => el.webformatURL === image.src);
    this.setState({
      modal: [photo[0].largeImageURL, image.alt],
      modalOpen: true,
    });
  };

  closeModal = e => {
    if (e.target.nodeName === 'DIV' || e.key === 'Escape') {
      this.setState({ modalOpen: false });
    }
  };

  render = () => {
    return (
      <div className={styles.App}>
        <>{this.state.isLoading && <Loader />}</>
        <Searchbar onSubmit={this.searchForImages} onChange />
        <>
          {this.state.images.length > 0 && (
            <ImageGallery
              images={this.state.images}
              modal={this.showModal}
              openModal={this.openModal}
            />
          )}
        </>
        {this.state.showButton === true && <Button onClick={this.loadMore} />}
        <>
          {this.state.modalOpen === true && (
            <Modal
              image={this.state.modal}
              isOpen={this.state.modalOpen}
              closeModal={this.closeModal}
            />
          )}
        </>
      </div>
    );
  };
}
