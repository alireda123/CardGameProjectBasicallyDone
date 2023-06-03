import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Basecode from "./Basecode";
import "./styles.css";
import "./tailwind.css";
import Intro from "./Intro/Intro";

export default function App() {
  let [intro, setIntro] = useState(true);
  function onIntroChange(intro: boolean) {
    setIntro(false);
  }
  return intro ? (
    <Intro props={{ intro, onIntroChange }} />
  ) : (
    <motion.div
      className="App bg-red-500 flex justify-center items-center"
      animate={{ scale: [0.5, 1] }}
      transition={{ duration: 1 }}
    >
      <Basecode />
    </motion.div>
  );
}
