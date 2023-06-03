import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Images } from "../../public/CardImages";
import "../tailwind.css";
import "../styles.css";
import Image from "../helpers/Image";

const Basecode = () => {
  interface CardState {
    image: string;
    mappingID: number;
    flipped: boolean;
  }
  const [tempCard, setTempCard] = useState<CardState | null>(null);
  const [Cards, setCards] = useState<CardState[]>(Images);
  const [permanentlyFlippedCards, setPermanentlyFlippedCards] = useState<
    CardState[]
  >([]);

  function changeCards(cardImage: CardState) {
    setCards((prevstate) =>
      prevstate.map((item) =>
        item.mappingID === cardImage.mappingID
          ? { ...item, flipped: false }
          : { ...item }
      )
    );
  }

  function checkIfEqual(card1: CardState, card2: CardState) {
    if (card1.image !== card2.image) {
      setCards((prevState) =>
        prevState.map((item) =>
          item.image === card1.image || item.image === card2.image
            ? { ...item, flipped: true }
            : { ...item }
        )
      );
      return;
    }
    setPermanentlyFlippedCards([...permanentlyFlippedCards, card1, card2]);
  }

  const setCards1and2 = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cardImage: CardState
  ) => {
    e.preventDefault();
    if (
      permanentlyFlippedCards.some(
        (item) => item.mappingID === cardImage.mappingID
      )
    ) {
      return;
    }
    if (tempCard === null) {
      setTempCard(cardImage);
      changeCards(cardImage);
      return;
    }
    setTempCard(null);
    changeCards(cardImage);
    checkIfEqual(tempCard, cardImage);
  };

  return (
    <motion.div
      animate={{ scale: [0.5, 1] }}
      transition={{ duration: 1 }}
      className="CardContainer "
    >
      {Cards &&
        Cards.map((item) => (
          <motion.div
            className=""
            animate={item.flipped ? { rotateY: 180 } : null}
            transition={{ duration: 0.1 }}
            key={item.mappingID}
          >
            <button onClick={(e) => setCards1and2(e, item)}>
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
    </motion.div>
  );
};

export default Basecode;
