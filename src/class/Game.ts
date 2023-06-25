import { Card } from "./Card";
import { Player } from "./Player";

export class Game{
	public playerList : Player[] = [];
	public dealer : number = 0;
	public timestamp : number = 0;
	public hand : number = 0;
	public playerCount : number = 0;
	public gamePart : GamePart[] = [];
	public board : Card[] = [];

	public static CleanGameArray(game : Game[]){
		return game.filter((value) => {
			return value.board.length == 5 && value.playerCount == 4
		})
	}
}

export class GamePart{
	public gameType : GamePartType = GamePartType.Flop;
	public playerCount : number = 0;
	public totalBid : number = 0;

	public static ParseFromStringArray(table : string[]) : GamePart[]{
		let gamePartArray : GamePart[] = [];
		// if(table == undefined){
		// 	return [];
		// }
		for(let i = 0 ; i < 4; i++){
			let gamePart = new GamePart();
			gamePart.gameType = (<GamePartType> i);
			let info = table[i]?.split("/");
			if(info == undefined){
				throw "Argument invalide";
			}
			gamePart.playerCount = parseInt(info[0] ?? "-1");
			gamePart.totalBid = parseInt(info[1] ?? "-1");
			gamePartArray.push(gamePart);
		}
		return gamePartArray;
	}
}

export enum GamePartType{
	Preflop = 0,
	Flop = 1,
	Turn = 2,
	River = 3,
	Showdown = 4
}