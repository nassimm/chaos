const activeWin = require('active-win');
const robot = require('robotjs');
const {QUAD_TAB_SPACING, TAB_ORIGIN_X, TAB_ORIGIN_Y, TAB_WIDTH} = require('./constants');
robot.setMouseDelay(50);
robot.setKeyboardDelay(50);

module.exports = {
  clickPosition: async (x, y) => {
    const win = await activeWin();
    const { x: windowPosX, y: windowPosY, height: windowHeight } = win.bounds;
    robot.moveMouse(
      windowPosX + windowHeight * x,
      windowPosY +
        (windowHeight - windowHeight * y)
    ); 
    robot.mouseClick();
  },
  clickStashPosition: async (tabPosX = 0, tabPosY = 0, spacing = QUAD_TAB_SPACING) =>{
    const win = await activeWin();
    const { x: windowPosX, y: windowPosY, height: windowHeight } = win.bounds;
    robot.keyToggle('control', 'down');
    robot.moveMouse(
      windowPosX + windowHeight * TAB_ORIGIN_X + (tabPosX / spacing) * TAB_WIDTH * windowHeight,
      windowPosY +
        (windowHeight - windowHeight * TAB_ORIGIN_Y) +
        (tabPosY / spacing) * TAB_WIDTH * windowHeight
    );
    robot.mouseClick();
    robot.keyToggle('control', 'up');
  }
}