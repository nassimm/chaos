const showItemClass = itemClass => 'Show\r\n\tRarity Rare\r\n\tItemLevel >= 60\r\n\tItemLevel < 75\r\n\tClass "' +itemClass + '"\r\n\tSetFontSize 45\r\n\tSetTextColor 50 130 165 255\r\n\tSetBorderColor 50 130 165 255\r\n\tSetBackgroundColor 255 125 255 255\r\n\r\nShow\r\n\tRarity Rare\r\n\tClass "' +itemClass + '"\r\n\tSetFontSize 45\r\n\tSetTextColor 50 130 165 255\r\n\tItemLevel >= 60\r\n\tSetBorderColor 50 130 165 255\r\n\tSetBackgroundColor 255 255 125 255\r\n\r\n'

const itemCountToLootFilter = ({ringsInStash,amuletsInStash, commonItemsInStash }) => {
  let filterAdds = '';
  if (ringsInStash.count < 10) {
    filterAdds = filterAdds + showItemClass(ringsInStash.itemClass)
  }
  if (amuletsInStash.count < 5) {
    filterAdds = filterAdds + showItemClass(amuletsInStash.itemClass)
  }
  if (ringsInStash.count >= 10 && amuletsInStash.count >= 5) {    
    filterAdds = filterAdds + commonItemsInStash.filter(item => item.count < 5).map(item => showItemClass(item.itemClass)).join('\r\n')
  }
  return filterAdds;
};

module.exports = {
  itemCountToLootFilter
};
