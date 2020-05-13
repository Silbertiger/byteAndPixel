import { GameState } from '../../GameState'
import { Action } from './Action';
import { enemyAction } from '../../viewModel/utils/ai';
import { monsterAtPosition } from 'viewModel/utils/monster';

export class EndTurnAction extends Action {

  protected doAction() {
    GameState.turn += 1;
    
    GameState.monsters.getValues().filter(monster => !monster.friendly).forEach(enemy => {
      while(enemy.actionPoints.current > 0) {
        enemyAction(enemy);
      }
    })

    GameState.monsters.getValues().forEach(monster => {
      if (GameState.turn - monster.lastFight > 2) {
        monster.hitPoints.add(1);
      }
      monster.actionPoints.setToMax();
    });
  }

  canExecute() : boolean {
    return true;
  }

  constructor() {
    super();
  }

}