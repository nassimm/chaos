const areRecipeAvailable = recipeItems => {
  const { ringsInStash, amuletsInStash } = recipeItems;
  return (
    recipeItems.itemCount.every(item => item.items.length > 0) &&
    ringsInStash.items.length > 1 &&
    amuletsInStash.items.length > 0
  );
};

module.exports = {
  areRecipeAvailable
};
