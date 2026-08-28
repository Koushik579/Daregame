import { useState } from "react";
import Logo from "../components/Logo";

function Landing({ onStart }) {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const canStart =
    playerOne.trim().length > 0 &&
    playerTwo.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canStart) return;

    onStart({
      playerOne: playerOne.trim(),
      playerTwo: playerTwo.trim(),
    });
  };

  return (
    <main className="landing-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="landing-container">
        <Logo />

        <div className="hero">
          <div className="eyebrow">
            JUST THE TWO OF YOU
          </div>

          <h1>
            How well do
            <br />
            <span>you know</span> each other?
          </h1>

          <p>
            Two players. One game. No audience.
            Choose your names and let the night begin.
          </p>
        </div>

        <form
          className="players-form"
          onSubmit={handleSubmit}
        >
          <div className="player-field">
            <label htmlFor="player-one">
              PLAYER ONE
            </label>

            <input
              id="player-one"
              type="text"
              placeholder="Enter name"
              value={playerOne}
              onChange={(event) =>
                setPlayerOne(event.target.value)
              }
              maxLength={24}
              autoComplete="off"
            />
          </div>

          <div className="versus">
            <span>×</span>
          </div>

          <div className="player-field">
            <label htmlFor="player-two">
              PLAYER TWO
            </label>

            <input
              id="player-two"
              type="text"
              placeholder="Enter name"
              value={playerTwo}
              onChange={(event) =>
                setPlayerTwo(event.target.value)
              }
              maxLength={24}
              autoComplete="off"
            />
          </div>

          <button
            className="start-button"
            type="submit"
            disabled={!canStart}
          >
            <span>START THE GAME</span>
            <span className="button-arrow">→</span>
          </button>
        </form>

        <div className="privacy-note">
          TWO PLAYERS · PRIVATE GAME
        </div>
      </section>
    </main>
  );
}

export default Landing;