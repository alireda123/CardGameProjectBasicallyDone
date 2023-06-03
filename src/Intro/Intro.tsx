import { motion } from "framer-motion";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import "../styles.css";
import { useState } from "react";
export default function Intro({ props }) {
  const [Name, setName] = useState("");
  const { intro, onIntroChange } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <motion.div className="introscreen">
      <input
        onChange={handleChange}
        className="bg-white-500"
        placeholder="Name"
      />
      <button onClick={() => onIntroChange(intro)} className="proceedButton">
        Proceed to game
      </button>
    </motion.div>
  );
}
