import { useMemo, useState } from "react";

import { foreplayData } from "../data/foreplay";
import { oralData } from "../data/oral";
import { penetrationData } from "../data/penetration";

import Logo from "../components/Logo";

const categoryData = {
  foreplay: foreplayData,
  oral: oralData,
  penetration: penetrationData,
};

function Game({ players, category, onBack }) {
  const data = categoryData[category];

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [choice, setChoice] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [round, setRound] = useState(1);

  const [usedItems, setUsedItems] = useState({
    truth: [],
    dare: [],
  });

  const playersList = useMemo(
    () => [players.playerOne, players.playerTwo],
    [players]
  );

  const currentPlayerName = playersList[currentPlayer];

  const getRandomItem = (type) => {
    if (!data?.[type]?.length) {
      return null;
    }

    let availableItems = data[type].filter(
      (item) => !usedItems[type].includes(item.id)
    );

    /*
      If every item in this category has been used,
      reset that particular pool so the game can continue.
    */
    if (availableItems.length === 0) {
      setUsedItems((previous) => ({
        ...previous,
        [type]: [],
      }));

      availableItems = data[type];
    }

    const randomIndex = Math.floor(
      Math.random() * availableItems.length
    );

    return availableItems[randomIndex];
  };

  const handleChoice = (type) => {
    const item = getRandomItem(type);

    if (!item) return;

    setChoice(type);
    setCurrentItem(item);

    setUsedItems((previous) => ({
      ...previous,
      [type]: [...previous[type], item.id],
    }));
  };

  const handleDone = () => {
    setChoice(null);
    setCurrentItem(null);

    setCurrentPlayer((previous) =>
      previous === 0 ? 1 : 0
    );

    setRound((previous) => previous + 1);
  };

  const handleRestart = () => {
    setCurrentPlayer(0);
    setChoice(null);
    setCurrentItem(null);
    setRound(1);

    setUsedItems({
      truth: [],
      dare: [],
    });
  };

  if (!data) {
    return null;
  }

  return (
    <main className="game-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="game-container">
        <div className="game-topbar">
          <Logo />

          <button
            className="back-button"
            onClick={onBack}
          >
            ← BACK
          </button>
        </div>

        <div className="game-content">
          <div className="game-meta">
            <span>{category}</span>
            <span>•</span>
            <span>ROUND {round}</span>
          </div>

          {!choice && (
            <>
              <div className="turn-heading">
                <span className="turn-small">
                  {currentPlayerName}'S TURN
                </span>

                <h1>
                  Choose your
                  <br />
                  <span>challenge.</span>
                </h1>

                <p>
                  Truth or dare?
                </p>
              </div>

              <div className="choice-grid">
                <button
                  className="choice-card truth-card"
                  onClick={() => handleChoice("truth")}
                >
                  <span className="choice-symbol">
                    ?
                  </span>

                  <span className="choice-title">
                    Truth
                  </span>

                  <span className="choice-description">
                    Answer honestly.
                  </span>

                  <span className="choice-arrow">
                    →
                  </span>
                </button>

                <button
                  className="choice-card dare-card"
                  onClick={() => handleChoice("dare")}
                >
                  <span className="choice-symbol">
                    !
                  </span>

                  <span className="choice-title">
                    Dare
                  </span>

                  <span className="choice-description">
                    Take the challenge.
                  </span>

                  <span className="choice-arrow">
                    →
                  </span>
                </button>
              </div>
            </>
          )}

          {choice && currentItem && (
            <div className="challenge-section">
              <div className="challenge-label">
                {choice === "truth"
                  ? "TRUTH"
                  : "DARE"}
              </div>

              <div className="challenge-card">
                <span className="challenge-player">
                  {currentPlayerName}
                </span>

                <p>{currentItem.text}</p>
              </div>

              <button
                className="done-button"
                onClick={handleDone}
              >
                <span>DONE</span>
                <span>→</span>
              </button>
            </div>
          )}

          <div className="game-footer">
            <button
              className="restart-button"
              onClick={handleRestart}
            >
              RESTART GAME
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Game;