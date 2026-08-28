import { useState } from "react";

import Landing from "./pages/Landing";
import CategorySelection from "./pages/CategorySelection";
import Game from "./pages/Game";
import Roleplay from "./pages/Roleplay";

import "./App.css";

function App() {
  const [screen, setScreen] = useState("landing");

  const [players, setPlayers] = useState({
    playerOne: "",
    playerTwo: "",
  });

  const [category, setCategory] = useState(null);

  const handleStart = (playerData) => {
    setPlayers(playerData);
    setScreen("categories");
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);

    if (selectedCategory === "roleplay") {
      setScreen("roleplay");
      return;
    }

    setScreen("game");
  };

  const handleBackToCategories = () => {
    setScreen("categories");
  };

  const handleRestart = () => {
    setPlayers({
      playerOne: "",
      playerTwo: "",
    });

    setCategory(null);
    setScreen("landing");
  };

  if (screen === "landing") {
    return <Landing onStart={handleStart} />;
  }

  if (screen === "categories") {
    return (
      <CategorySelection
        players={players}
        onSelectCategory={handleCategorySelect}
        onRestart={handleRestart}
      />
    );
  }

  if (screen === "roleplay") {
    return (
      <Roleplay
        players={players}
        onBack={handleBackToCategories}
      />
    );
  }

  if (screen === "game") {
    return (
      <Game
        players={players}
        category={category}
        onBack={handleBackToCategories}
      />
    );
  }

  return null;
}

export default App;