import styles from './ImageGallery.module.css';
import propTypes from 'prop-types';
export const ImageGallery = ({ images, modal }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(image => (
        <li key={image.id} className={styles.ImageGalleryItem}>
          <img
            className={styles.ImageGalleryItemImage}
            src={image.webformatURL}
            alt={image.id}
            onClick={e => modal(e.target)}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: propTypes.array,
  modal: propTypes.func,
};
