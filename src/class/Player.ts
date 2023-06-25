import { Card } from "./Card";
import { GamePartType } from "./Game";

export class Player{
	public name : string = "";
	public timestamp : number = 0;
	public bankroll : number = 0;
	public bid : number = 0; // mise
	public winnings : number = 0;
	public cards : Card[] = [];
	public actions : PlayerAction[] = [];

	public getAgressivityFactor(gamePartType : GamePartType = GamePartType.Flop){
		let agressivity = 0;
		for(let i = 0; i <= (<number> gamePartType); i++){
			let actions = this.actions[i]?.actions ?? [];
			for(let j = 0 ; j < actions.length; j++){
				if(actions[j] == ActionType.Raise){
					agressivity++;
				}
			}
		}
		return agressivity;
	}

	public hasWon = false;
}

export class PlayerAction{
	public gamePartType : GamePartType = GamePartType.Flop;
	public actions : ActionType[] = [];

	public static ParseStringArray(value : string[]){
		let actions : PlayerAction[] = [];
		for(let i = 0; i < 4; i++){
			let newAction = new PlayerAction();
			newAction.gamePartType = (<GamePartType> i);
			for(let j = 0; j < (value[i] ?? []).length; j++){
				switch((value[i] ?? "")[j]){
					case "B":
						newAction.actions.push(ActionType.Blind);
						break;
					case "f":
						newAction.actions.push(ActionType.Fold);
						break;
					case "c":
						newAction.actions.push(ActionType.Call);
						break;
					case "k":
						newAction.actions.push(ActionType.Check);
						break;
					case "r":
						newAction.actions.push(ActionType.Raise);
						break;
					case "b":
						newAction.actions.push(ActionType.Bid);
						break;
					case "-":
						newAction.actions.push(ActionType.Out);
						break;
					default:
						newAction.actions.push(ActionType.None);
						break;
				}
			}
			actions.push(newAction);
		}
		return actions;
	}
}

export enum ActionType {
	Blind,
	Call,
	Raise,
	Fold,
	Check,
	Bid,
	Out,
	None
}