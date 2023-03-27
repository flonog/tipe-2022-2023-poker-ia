import { readFileSync } from "fs";
import { Game, GamePart } from "./Game";
import { Card } from "./Card";
import { Player, PlayerAction } from "./Player";

let temp : Map<string, string[][]> = new Map<string, string[][]>();

export class FileParser{
	public static async ConvertFileToArray(path : string, cached : boolean = true) : Promise<string[][]>{
		if(cached && temp.has(path)){
			return temp.get(path) ?? [];
		}
		let data = await readFileSync(path);
		if(data == undefined){
			throw "Data undefined";
		}
		var array = data.toString().split("\n");
		var new_array : string[][] = [];
		array.forEach((val, index) => {
			if(val.trim().length == 0)
				return;
			new_array[index] = val.split(" ").filter((val) => val == '' ? null : val);
		});
		if(cached) temp.set(path, new_array);
		return new_array;
	}

	public static async ParseGame(path : string) : Promise<Game[]>{
		let gameList : Game[] = [];
		let value = await this.ConvertFileToArray(path);
		for(let i = 0; i < value.length; i++){
			let data = value[i] ?? [];
			let roster = await this.ParseRosterFile(path.replace("hdb", "hroster"), parseInt(data[0] ?? "-1"));
			let game = new Game();
			game.timestamp = parseInt(data[0] ?? "-1");
			game.dealer = parseInt(data[1] ?? "-1");
			game.hand = parseInt(data[2] ?? "-1");
			game.playerCount = parseInt(data[3] ?? "-1");
			game.gamePart = GamePart.ParseFromStringArray(data.slice(4, 8));
			game.board = Card.ParseFromStringArray(data.slice(9, 14));
			game.playerList = roster;
			gameList.push(game);
		}
		return gameList;
	}

	private static async ParsePlayerRoundFile(path : string, timestamp : number, playerNameList : string[]) : Promise<Player[]>{
		let playerList : Player[] = [];
		for(let i = 0; i < playerNameList.length; i++){
			let player : Player = new Player();
			let value = await this.ConvertFileToArray(path.replace("/hroster", "/pdb/pdb." + playerNameList[i]), false);
			let round = value.find((val) => parseInt(val[1] ?? "0") == timestamp);
			if(round == undefined){
				continue;
			}
			player.name = playerNameList[i] ?? "null";
			player.timestamp = timestamp;
			player.bid = parseInt(round[9] ?? "-1");
			player.bankroll = parseInt(round[8] ?? "-1");
			player.winnings = parseInt(round[10] ?? "-1");
			player.cards = Card.ParseFromStringArray(round.slice(11));
			player.actions = PlayerAction.ParseStringArray(round.slice(4, 7));

			playerList.push(player);
		}

		return playerList;
	}

	private static async ParseRosterFile(path : string, timestamp : number) : Promise<Player[]>{
		let value = await this.ConvertFileToArray(path);
		let roster = value.find((val) => parseInt(val[0] ?? "0") == timestamp);
		let playerList = roster?.slice(2);
		return await this.ParsePlayerRoundFile(path, timestamp, playerList ?? []);
	}

	public static ParseDir(path : string){

	}
}