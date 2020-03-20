const showItemClass = itemClass => 'Show\r\n\tRarity Rare\r\n\tItemLevel >= 60\r\n\tItemLevel < 70\r\n\tClass "' +itemClass + '"\r\n\tSetFontSize 45\r\n\tSetTextColor 50 130 165 255\r\n\tSetBorderColor 50 130 165 255\r\n\tSetBackgroundColor 255 125 255 255\r\n\r\nShow\r\n\tRarity Rare\r\n\tClass "' +itemClass + '"\r\n\tSetFontSize 45\r\n\tSetTextColor 50 130 165 255\r\n\tItemLevel >= 60\r\n\tSetBorderColor 50 130 165 255\r\n\tSetBackgroundColor 255 255 125 255\r\n\r\n'

const itemCountToLootFilter = itemCount => {
  let filterAdds = '';
  if (itemCount.ringsInStash.count < 10) {
    filterAdds = filterAdds + showItemClass(itemCount.ringsInStash.itemClass)
  }
  if (itemCount.amuletsInStash.count < 5) {
    filterAdds = filterAdds + showItemClass(itemCount.amuletsInStash.itemClass)
  }
  if (itemCount.ringsInStash.count >= 10 && itemCount.amuletsInStash.count >= 5) {
    filterAdds = filterAdds + itemCount.itemCount.filter(item => item.count < 10).map(item => showItemClass(item.itemClass)).join('\r\n')
  }
  return filterAdds;
};

module.exports = {
  itemCountToLootFilter
};
