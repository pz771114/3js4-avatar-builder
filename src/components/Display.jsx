import React from "react";
import { create } from "zustand";

const useMeals = create(() => ({
  papaBear: "large porridge-pot",
  mamaBear: "middle-size porridge pot",
  littleBear: "A little, small, wee pot",
}));

const Display = () => {
  const names = useMeals((state) => Object.keys(state));
  return <div>Display names: {names.join(", ")}</div>;
};

export default Display;
