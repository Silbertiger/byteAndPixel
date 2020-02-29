import { GameState } from "../GameState";
import { Position } from "../viewModel/Position";
import { isAdjacent, firstStep } from "../viewModel/utils/map";
import { Action } from "./Action";
import { monsterAtPosition } from "../viewModel/utils/monster";

export class MonsterMoveAction extends Action {
  monsterId: number;
  position: Position

  doAction() {
    const monster = GameState.monsters[this.monsterId];

    if (monster.actionPoints <= 0)
        return;

    const delta = firstStep(monster.position, this.position);
    const targetPosition =  monster.position.add(delta);

    if (this.canEnter(targetPosition)) {
      monster.position = targetPosition;
      monster.actionPoints -= 1;
    }

  }

  canEnter(position: Position): boolean {
    const containsSlime = GameState.map.tiles[position.x][position.y].slimed;
    const containsMonster = monsterAtPosition(position) != -1;
    return !containsSlime && !containsMonster;
  }

  constructor(monsterId: number, position: Position) {
    super();
    this.monsterId = monsterId;
    this.position = position;
  }
}
