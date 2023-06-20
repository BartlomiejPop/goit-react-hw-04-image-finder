import * as basicLightbox from 'basiclightbox';
import React, { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
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
      this.setState({ images: response.data.hits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
      // this.loading();
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
          this.setState({ images: response.data.hits, phrase: phrase });
        });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
      // this.loading();
    }
  }

  loadMore = () => {
    try {
      this.setState({ isLoading: true });
      // this.loading();
      this.setState({ page: this.state.page + 1 });
      axios
        .get(
          `https://pixabay.com/api/?q=${this.state.phrase}&page=${
            this.state.page + 1
          }&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          this.setState(prev => ({
            images: [...prev.images, ...response.data.hits],
          }));
        });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
      // this.loading();
    }
  };

  showModal = image => {
    this.setState({ modal: [image.src, image.alt] });
    setTimeout(() => {
      console.log(this.state.modal[0]);
      const instance = basicLightbox.create(`
    <div class="overlay">
      <div classname="modal">
        <img src=${this.state.modal[0]} alt=${this.state.modal[1]} />
      </div>
    </div>
  `);
      instance.show();
    }, 200);
  };

  render() {
    return (
      <div>
        <>{this.state.isLoading && <Loader />}</>
        <Searchbar onSubmit={this.searchForImages} onChange />
        <>
          {this.state.images.length > 0 && (
            <ImageGallery images={this.state.images} modal={this.showModal} />
          )}
        </>
        <Button onClick={this.loadMore} />
        {/* <Modal image={this.state.modal === [] ? '' : this.state.modal} /> */}
      </div>
    );
  }
}
