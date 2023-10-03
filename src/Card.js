import React from "react";


/** Card: simple presentation component to render a single card
 *
 * Props:
 * - card: an object {code, image, images, value, suit}
 *
 * CardApp -> Card
 */

function Card({ card }) {

  return (
    <div className="m-2">
      <img src={card.image} width="100px" alt="card" />
    </div>
  );
}

export default Card;
