'use strict';
const {  switchMapTo, filter, map, pluck, startWith, withLatestFrom, tap, distinctUntilChanged} = require('rxjs/operators');
const { writeFile } = require('fs');
const robot = require('robotjs');

const { usedFilter, RELOAD_LOOT_FILTER_KEY, FILL_INVENTORY_KEY } = require('./helpers/constants');
const { stashTabToItemCount } = require('./helpers/stash-tab-to-item-count');
const { itemCountToLootFilter } = require('./helpers/item-count-to-loot-filter');
const { clickStashPosition, clickPosition } = require('./helpers/click-stash-position');
const { areRecipeAvailable } = require('./helpers/are-recipe-available');
const { keyPresses$ } = require('./helpers/key-presses');
const { lootFilterFile$, logChanges$, lastLineOfLog$, stash$ } = require('./helpers/async-sources');

let availableRecipeItems;

// Making loot filter and recipe list
logChanges$
  .pipe(
    switchMapTo(lastLineOfLog$),
    filter(lastLine => lastLine.includes('You have entered')),
    startWith('Initial trigger'),
    switchMapTo(stash$),
    pluck('data', 'items'),
    map(stashTabToItemCount),
    tap(count => {
      availableRecipeItems = count;
      if (areRecipeAvailable(availableRecipeItems)) console.log('Recipes are available');
    }),
    map(itemCountToLootFilter),
    withLatestFrom(lootFilterFile$),
    map(([adds, filter]) => adds + filter),
    distinctUntilChanged()
  )
  .subscribe(filterData => {
    console.log('New lootfilter available, press your reload key');
    writeFile(usedFilter, filterData, err => console.log('ERR', err));
  });

// Handling filling inventory
keyPresses$.pipe(filter(press => press.keycode === FILL_INVENTORY_KEY)).subscribe(() => {
  const { ringsInStash, amuletsInStash } = availableRecipeItems;
  if (areRecipeAvailable(availableRecipeItems)) {
    const commonItemsToClick = availableRecipeItems.itemCount.reduce(
      (acc, itemType) => [...acc, itemType.items.shift()],
      []
    );
    const itemsToClick = [
      ...commonItemsToClick,
      ringsInStash.items.shift(),
      ringsInStash.items.shift(),
      amuletsInStash.items.shift()
    ];
    itemsToClick.forEach(item => clickStashPosition(item.x, item.y));
  } else {
    const missingCommonItems = availableRecipeItems.itemCount
      .filter(itemType => itemType.items.length === 0)
      .map(type => type.itemClass)
      .join(', ');
    console.log('no recipe available, missing ' + missingCommonItems);
    if (ringsInStash.items.length < 2) console.log('missing rings');
    if (amuletsInStash.items.length < 1) console.log('missing amulets');
  }
});

// Handling reload loot filter
keyPresses$.pipe(filter(prss => prss.keycode === RELOAD_LOOT_FILTER_KEY)).subscribe(async () => {
  robot.keyTap('escape');
  await clickPosition(1.2, 0.65); // options
  await clickPosition(0.29, 0.86); // ui
  await clickPosition(0.55, 0.35); // scrollbar
  await clickPosition(0.55, 0.35); // scrollbar
  await clickPosition(0.55, 0.35); // scrollbar
  await clickPosition(0.51, 0.37); // reload
  setTimeout(() => robot.keyTap('escape'), 50);
});
