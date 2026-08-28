function CategoryCard({
  number,
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button className="category-card" onClick={onClick}>
      <span className="category-number">{number}</span>

      <span className="category-icon">{icon}</span>

      <span className="category-content">
        <span className="category-title">{title}</span>

        <span className="category-description">
          {description}
        </span>
      </span>

      <span className="category-arrow">↗</span>
    </button>
  );
}

export default CategoryCard;