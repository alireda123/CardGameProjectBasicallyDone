import React, { useState, useEffect, useRef, useReducer } from "react";
import { motion } from "framer-motion";
import { Images } from "../public/CardImages";
import "./tailwind.css";
import "./styles.css";
import Image from "./helpers/Image";
import reducer from "./helpers/Reducer";

const Basecode = () => {
  interface CardState {
    image: string;
    mappingID: number;
    flipped: boolean;
  }
  const [tries, setTries] = useState(0);
  const [tempCard, setTempCard] = useState<CardState | null>(null);
  const [cards, cardsDispatch] = useReducer(reducer, Images);
  const [permanentlyFlippedCards, setPermanentlyFlippedCards] = useState<
    number[]
  >([]);

  function changeCards(cardImage: CardState) {
    cardsDispatch({ type: "flipCard", payload: cardImage });
  }

  function checkIfEqual(card1: CardState, card2: CardState) {
    const payload = { image1: card1.image, image2: card2.image };
    if (card1.image !== card2.image) {
      cardsDispatch({ type: "checkIfCardsAreSame", payload });
      setTries((tries) => tries + 1);
      return;
    }

    setPermanentlyFlippedCards((permanentlyFlippedCards) =>
      permanentlyFlippedCards.concat(card1.mappingID, card2.mappingID)
    );
  }

  const setCards1and2 = (cardImage: CardState) => {
    if (permanentlyFlippedCards.some((item) => item === cardImage.mappingID))
      return;

    if (tempCard === null) {
      setTempCard(cardImage);
      changeCards(cardImage);
      return;
    }
    if (cardImage.mappingID === tempCard.mappingID) {
      cardsDispatch({ type: "resetCard", payload: cardImage.mappingID });
      return;
    }
    setTempCard(null);
    changeCards(cardImage);
    checkIfEqual(tempCard, cardImage);
  };

  return (
    <>
      <p className="triesCounter">{tries}</p>
      <motion.div
        animate={{ scale: [0.5, 1] }}
        transition={{ duration: 1 }}
        className="CardContainer "
      >
        {cards &&
          tries < 10 &&
          cards.map((item) => (
            <motion.div
              className=""
              animate={item.flipped ? { rotateY: 180 } : null}
              transition={{ duration: 0.1 }}
              key={item.mappingID}
            >
              <button onClick={() => setCards1and2(item)}>
                <>
                  {item.flipped ? (
                    <Image image="https://images.pexels.com/photos/3894157/pexels-photo-3894157.jpeg?auto=compress&cs=tinysrgb&w=1600" />
                  ) : (
                    <Image image={item.image} />
                  )}
                </>
              </button>
            </motion.div>
          ))}
        {tries >= 10 && (
          <motion.div
            animate={{ scale: [0.5, 1] }}
            transition={{ duration: 1 }}
            className="lostContainer"
          >
            <h1 className="">youve lost</h1>
            <button>Restart</button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Basecode;
