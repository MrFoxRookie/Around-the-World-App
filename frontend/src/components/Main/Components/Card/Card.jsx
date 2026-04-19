import ImagePopup from "../../Popup/Image/ImagePopup";

export default function Card(props) {
  const { card, currentUser, onOpenPopup, onCardLike, onCardDelete } = props;
  const { name, link, likes } = card;

  const isLiked = likes.includes(currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() =>
          onOpenPopup({
            children: <ImagePopup name={name} link={link} />,
          })
        }
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
