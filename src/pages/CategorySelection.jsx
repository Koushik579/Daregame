import Logo from "../components/Logo";
import CategoryCard from "../components/CategoryCard";

function CategorySelection({
  players,
  onSelectCategory,
  onRestart,
}) {
  return (
    <main className="category-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="category-container">
        <div className="category-topbar">
          <Logo />

          <button
            className="back-button"
            onClick={onRestart}
          >
            RESTART
          </button>
        </div>

        <div className="category-header">
          <div className="eyebrow">
            {players.playerOne} × {players.playerTwo}
          </div>

          <h1>
            Choose your
            <br />
            <span>mood.</span>
          </h1>

          <p>
            Where do you want to begin?
          </p>
        </div>

        <div className="category-grid">
          <CategoryCard
            number="01"
            icon="♥"
            title="Foreplay"
            description="Playful truths and dares"
            onClick={() =>
              onSelectCategory("foreplay")
            }
          />

          <CategoryCard
            number="02"
            icon="◆"
            title="Roleplay"
            description="Step into a different character"
            onClick={() =>
              onSelectCategory("roleplay")
            }
          />

          <CategoryCard
            number="03"
            icon="✦"
            title="Oral"
            description="Intimate truths and dares"
            onClick={() =>
              onSelectCategory("oral")
            }
          />

          <CategoryCard
            number="04"
            icon="♠"
            title="Penetration"
            description="Deeper relationship challenges"
            onClick={() =>
              onSelectCategory("penetration")
            }
          />
        </div>
      </section>
    </main>
  );
}

export default CategorySelection;