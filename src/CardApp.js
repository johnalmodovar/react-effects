import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./CardApp.css";

const BASE_URL = "https://deckofcardsapi.com/api/deck";


/** CardApp Component: App that fetchs a deck of cards and draws the cards
 *
 * State:
 * - deck: {data, isLoading}
 * - card: array of card objects [card, card, ...]
 *
 * App -> CardApp -> Card
 */

function CardApp() {
  const [deck, setDeck] = useState({ data: null, isLoading: true });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    /** fetchDeck: fetchs the Deck of Cards API for a new shuffled deck
     *
     * Sets the state for a deck.
     */
    async function fetchDeck() {
      const response = await fetch(`${BASE_URL}/new/shuffle`);
      const deckData = await response.json();
      setDeck({ data: deckData, isLoading: false });
    }
    fetchDeck();
  }, []);


  /** drawCard: fetchs the Deck of Cards API for a single card and adds
   * it to the state
   */
  async function drawCard() {
    const response = await fetch(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);
    const cardData = await response.json();

    setCards(c => (
      [...c, cardData.cards[0]]
    ));
  }

  if (deck.isLoading) return <h1>Loading Deck...</h1>;

  if (cards.length === 52) alert("OUT OF CARDS");

  return (
    <>
      {cards.length < 52 &&
        <button
          className="btn btn-dark mb-4"
          onClick={drawCard} >
          Draw a Card!
        </button>}
      <div className="CardApp">
        {cards.map(c => (
          <Card key={c.code} card={c} />
        ))}
      </div>
    </>
  );
}

export default CardApp;
