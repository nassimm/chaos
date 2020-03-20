const recipesAreAvailable = recipeItems => {
  const { ringsInStash, amuletsInStash, commonItemsInStash } = recipeItems;
  return (
    commonItemsInStash.every(item => item.items.length > 0) &&
    ringsInStash.items.length > 1 &&
    amuletsInStash.items.length > 0
  );
};

module.exports = {
  recipesAreAvailable
};
