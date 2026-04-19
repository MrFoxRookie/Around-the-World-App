export default function ImagePopup(props) {
  const { name, link } = props;
  return (
    <div className="popup__card-container">
      <img className="popup__card-image" src={link} alt={name} />
      <p className="popup__card-title">{name}</p>
    </div>
  );
}
