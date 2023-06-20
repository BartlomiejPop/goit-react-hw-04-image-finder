export const ImageGallery = ({ images, modal }) => {
  return (
    <ul className="gallery">
      {images.map(image => (
        <li key={image.id} className="gallery-item">
          {' '}
          <img
            src={image.webformatURL}
            alt={image.id}
            onClick={e => modal(e.target)}
          />
        </li>
      ))}
    </ul>
  );
};
