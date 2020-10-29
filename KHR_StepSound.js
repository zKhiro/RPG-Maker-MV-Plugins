/*:
 * @plugindesc v1.0 Play a SE for each step player do.
 * @author zKhiro
 *
 * @param Sound Names
 * @desc SE name or names that you want to play. You can use multiples SE, just use comma to separete each sound.
 * @default Cursor1
 *
 * @param Volume
 * @desc Volume of the sound.
 * @default 90
 *
 * @param Pitch
 * @desc Pitch of the sound.
 * @default 100
 */
(function() {
  const parameters = PluginManager.parameters('KHR_StepSound');

  const soundNames  = (parameters['Sound Names']  || 'Cursor1').replace(/ /g, '').split(',');
  const volume      = (parameters['Volume']       || 90);
  const pitch       = (parameters['Pitch']        || 100);

  const _Game_Player_update = Game_Player.prototype.update;

  let isFirstMove = true;


  Game_Player.prototype.update = function(playerAction) {
    _Game_Player_update.call(this, playerAction);

    if (this.isMoving() && isFirstMove) {
      isFirstMove = false;

      AudioManager.playSe({
        name: soundNames[Math.floor(Math.random() * soundNames.length)],
        pitch,
        volume,
      });
    } else if(this.isStopping() && !isFirstMove) {
      isFirstMove = true;
    }
  }
})();
