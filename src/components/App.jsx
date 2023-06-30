import styles from '../styles.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

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
        changeImages(response.data.hits);
        changeIsLoading(false);
      } catch (error) {
        changeError(error);
      }
    };
    fetchData();
  }, [phrase]);

  const searchForImages = phrase => {
    try {
      changeIsLoading(true);
      axios
        .get(
          `https://pixabay.com/api/?q=${phrase}&page=1&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          if (response.data.hits.length < 12) {
            changeShowButton(false);
          } else {
            changeShowButton(true);
          }
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
      changeIsLoading(true);
      changePage(prev => prev + 1);
      axios
        .get(
          `https://pixabay.com/api/?q=${phrase}&page=${
            page + 1
          }&key=37582699-55c82cc3a73d61bfb82f2913b&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          if (response.data.hits.length < 12) {
            changeShowButton(false);
          }
          changeImages(prev => [...prev, ...response.data.hits]);
          changeIsLoading(false);
        });
    } catch (error) {
      changeError(error);
    }
  };

  const showModal = image => {
    const photo = images.filter(el => el.webformatURL === image.src);
    changeModal([photo[0].largeImageURL, image.alt]);
    changeModalOpen(true);
  };

  const closeModal = e => {
    if (e.target.nodeName === 'DIV' || e === 'Escape') {
      changeModalOpen(false);
    }
  };

  return (
    <div className={styles.App}>
      {error && <p>{error}</p>}
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
