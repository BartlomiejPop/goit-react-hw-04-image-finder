import styles from './ImageGallery.module.css';

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
