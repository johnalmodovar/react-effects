import React, { useState,useEffect } from "react";
import Card from "./Card";

const baseURL = "https://deckofcardsapi.com/api/deck";

function CardApp() {
  const [deck, setDeck] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchDeck() {
      const response = await fetch(`${baseURL}/new/`);
      const deckData = await response.json();
      setDeck(deckData);
    }
    fetchDeck();
  }, []);


  async function drawCard (evt) {
    const response = await fetch(`${baseURL}/${deck.deck_id}/draw/?count=1`);
    const cardData = await response.json();

    setCards(c => (
      [...c, cardData.cards[0]]
    ));
  }

  return (
    <>
      <button onClick={drawCard}>Draw</button>
      <div>
        {cards.map(c => (
          <Card card={c} />
        ))}
      </div>
    </>
  )
}

export default CardApp;

/*
2 API calls:
- one to grab a new deck
  -useEffect one time to get deck once after page renders
- one to draw the cards
  -might just be attached to a event handler


 */