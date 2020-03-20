const { rings, amulets, secondary } = require('../data/item-types.js');
const getItemsWithBaseFromList = (items, baseList) => items.filter(item => baseList.some(baseName => item.typeLine.includes(baseName)));
const stashTabToItemCount = stashTabItems => {
  const itemsWithCorrectProperties = stashTabItems.filter(item => item.ilvl >= 60 && item.identified === false);  
  const commonItemsInStash = secondary.map(itemType => ({items: getItemsWithBaseFromList(itemsWithCorrectProperties, itemType.items), itemClass: itemType.itemClass})).map(t => ({...t, count: t.items.length}))
  const ringsInStash = {items: getItemsWithBaseFromList(itemsWithCorrectProperties, rings.items), itemClass: rings.itemClass, count: getItemsWithBaseFromList(itemsWithCorrectProperties, rings.items).length}
  const amuletsInStash = {items: getItemsWithBaseFromList(itemsWithCorrectProperties, amulets.items), itemClass: amulets.itemClass, count: getItemsWithBaseFromList(itemsWithCorrectProperties, amulets.items).length}
  return { commonItemsInStash, ringsInStash, amuletsInStash };
};

module.exports = {
  stashTabToItemCount
};
