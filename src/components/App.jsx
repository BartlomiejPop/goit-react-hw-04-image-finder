import styles from '../styles.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

// export class App extends Component {
//   constructor() {
//     super();
//     this.searchForImages = this.searchForImages.bind(this);
//   }

//   state = {
//     phrase: '',
//     images: [],
//     page: 1,
//     isLoading: true,
//     error: null,
//     modal: [],
//     modalOpen: false,
//     showButton: true,
//   };
export const App = () => {
  const [phrase, changePhrase] = useState('');
  const [images, changeImages] = useState([]);
  const [page, changePage] = useState(1);
  const [isLoading, changeIsLoading] = useState(true);
  const [error, changeError] = useState(null);
  const [modal, changeModal] = useState([]);
  const [modalOpen, changeModalOpen] = useState(false);
  const [showButton, changeShowButton] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${phrase}&page=1&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
        );
        //  this.setState({ images: response.data.hits, isLoading: false });
        console.log(response);
        changeImages(response.data.hits);
        changeIsLoading(false);
      } catch (error) {
        changeError(error);
      }
    };
    fetchData();
  }, []);

  const searchForImages = phrase => {
    try {
      // this.setState({ isLoading: true });
      changeIsLoading(true);
      axios
        .get(
          `https://pixabay.com/api/?q=${phrase}&page=1&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          if (response.data.hits.length === 12) {
            // this.setState({ showButton: true });
            changeShowButton(true);
          }
          // this.setState({
          //   images: response.data.hits,
          //   phrase: phrase,
          //   isLoading: false,
          // });
          changeImages(response.data.hits);
          changePhrase(phrase);
          changeIsLoading(false);
        });
    } catch (error) {
      changeError(error);
    }
  };

  const loadMore = () => {
    try {
      // this.setState({ isLoading: true, page: this.state.page + 1 });
      changeIsLoading(true);
      changePage(prev => prev + 1);
      axios
        .get(
          `https://pixabay.com/api/?q=${phrase}&page=${
            page + 1
          }&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          console.log(response.data.hits);
          if (response.data.hits.length < 12) {
            // this.setState({ showButton: false });
            changeShowButton(false);
          }
          // this.setState(prev => ({
          //   images: [...prev.images, ...response.data.hits],
          //   isLoading: false,
          // }));
          changeImages(prev => [...prev, ...response.data.hits]);
          changeIsLoading(false);
        });
    } catch (error) {
      // this.setState({ error });
      changeError(error);
    }
  };

  const showModal = image => {
    const photo = images.filter(el => el.webformatURL === image.src);
    // this.setState({
    //   modal: [photo[0].largeImageURL, image.alt],
    //   modalOpen: true,
    // });
    changeModal([photo[0].largeImageURL, image.alt]);
    changeModalOpen(true);
  };

  const closeModal = e => {
    console.log(e);
    if (e.target.nodeName === 'DIV' || e === 'Escape') {
      // this.setState({ modalOpen: false });
      changeModalOpen(false);
    }
  };

  return (
    <div className={styles.App}>
      <>{isLoading && <Loader />}</>
      <Searchbar onSubmit={searchForImages} />
      <>
        {images.length > 0 && (
          <ImageGallery
            images={images}
            modal={showModal}
            openModal={modalOpen}
          />
        )}
      </>
      {showButton === true && <Button onClick={loadMore} />}
      <>
        {modalOpen === true && (
          <Modal image={modal} isOpen={modalOpen} closeModal={closeModal} />
        )}
      </>
    </div>
  );
};
