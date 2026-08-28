import { useState } from "react";

import { roleplayData } from "../data/roleplay";
import Logo from "../components/Logo";

function Roleplay({ players, onBack }) {
  const [currentRoleplay, setCurrentRoleplay] =
    useState(null);

  const [usedRoles, setUsedRoles] = useState([]);

  const getRoleplay = () => {
    let available = roleplayData.filter(
      (item) => !usedRoles.includes(item.id)
    );

    if (available.length === 0) {
      setUsedRoles([]);
      available = roleplayData;
    }

    const randomIndex = Math.floor(
      Math.random() * available.length
    );

    return available[randomIndex];
  };

  const revealRoleplay = () => {
    const roleplay = getRoleplay();

    if (!roleplay) return;

    setCurrentRoleplay(roleplay);

    setUsedRoles((previous) => [
      ...previous,
      roleplay.id,
    ]);
  };

  return (
    <main className="roleplay-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="roleplay-container">
        <div className="game-topbar">
          <Logo />

          <button
            className="back-button"
            onClick={onBack}
          >
            ← BACK
          </button>
        </div>

        {!currentRoleplay ? (
          <div className="roleplay-intro">
            <div className="game-meta">
              <span>ROLEPLAY</span>
              <span>•</span>
              <span>
                {players.playerOne} ×{" "}
                {players.playerTwo}
              </span>
            </div>

            <div className="roleplay-heading">
              <span className="turn-small">
                STEP INTO A DIFFERENT WORLD
              </span>

              <h1>
                Ready to
                <br />
                <span>play?</span>
              </h1>

              <p>
                Let the game choose a scenario for both
                of you.
              </p>
            </div>

            <button
              className="roleplay-start"
              onClick={revealRoleplay}
            >
              <span>REVEAL ROLEPLAY</span>
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="roleplay-result">
            <div className="roleplay-result-header">
              <span className="turn-small">
                YOUR ROLEPLAY
              </span>

              <h1>{currentRoleplay.title}</h1>
            </div>

            <div className="roles-grid">
              <div className="role-box">
                <span className="role-label">
                  {players.playerOne}
                </span>

                <strong>
                  {currentRoleplay.playerOneRole}
                </strong>
              </div>

              <div className="role-box">
                <span className="role-label">
                  {players.playerTwo}
                </span>

                <strong>
                  {currentRoleplay.playerTwoRole}
                </strong>
              </div>
            </div>

            <div className="scenario-box">
              <span className="section-label">
                SCENARIO
              </span>

              <p>
                {currentRoleplay.scenario}
              </p>
            </div>

            <div className="instructions-box">
              <span className="section-label">
                HOW TO PLAY
              </span>

              <p>
                {currentRoleplay.instructions}
              </p>
            </div>

            <div className="roleplay-actions">
              <button
                className="another-button"
                onClick={revealRoleplay}
              >
                <span>TRY ANOTHER</span>
                <span>↻</span>
              </button>

              <button
                className="finish-button"
                onClick={onBack}
              >
                <span>BACK TO CATEGORIES</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Roleplay;