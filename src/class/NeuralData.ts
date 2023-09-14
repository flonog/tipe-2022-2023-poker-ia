import { INeuralNetworkData, INeuralNetworkDatum } from "brain.js/dist/neural-network";
import { Card } from "./Card";
import { Game } from "./Game";

export class NeuralData {

	public factor1: number = 0;
	public factor2: number = 0;
	public factor3: number = 0;
	public hand1: Card = Card.None;
	public hand2: Card = Card.None;
	public board1: Card = Card.None;
	public board2: Card = Card.None;
	public board3: Card = Card.None;
	public win: boolean = false;


	constructor(
		factor1: number,
		factor2: number,
		factor3: number,
		hand1: Card,
		hand2: Card,
		board1: Card,
		board2: Card,
		board3: Card,
		win: boolean
	) {
		this.factor1 = factor1;
		this.factor2 = factor2;
		this.factor3 = factor3;
		this.hand1 = hand1;
		this.hand2 = hand2;
		this.board1 = board1;
		this.board2 = board2;
		this.board3 = board3;
		this.win = win;
	}

	public static ConvertGameArrayToNeuralData(games: Game[]): NeuralData[] {
		let neuralData: NeuralData[] = [];
		let neuralPlayerData: NeuralPlayerData[] = [];
		for (let i = 0; i < games.length; i++) {
			let game = games[i] as Game;
			neuralPlayerData = [];
			for (let j = 0; j < (games[i]?.playerList.length ?? 1); j++) {
				let player = games[i]?.playerList[j];
				if (player == undefined)
					continue;
				if (player.cards.length == 0)
					continue;
				neuralPlayerData.push(new NeuralPlayerData(player.getAgressivityFactor(), player.cards[0] ?? Card.None, player.cards[1] ?? Card.None, player.hasWon || player.winnings > 0));
			}

			for (let j = 0; j < neuralPlayerData.length; j++) {
				neuralData.push(new NeuralData(
					neuralPlayerData[(j + 1) % 4]?.agressivity ?? 0,
					neuralPlayerData[(j + 2) % 4]?.agressivity ?? 0,
					neuralPlayerData[(j + 3) % 4]?.agressivity ?? 0,
					neuralPlayerData[j]?.hand1 ?? Card.None,
					neuralPlayerData[j]?.hand2 ?? Card.None,
					game.board[0] ?? Card.None,
					game.board[1] ?? Card.None,
					game.board[2] ?? Card.None,
					neuralPlayerData[j]?.hasWon ?? false
				));
				console.log(neuralPlayerData[j]?.hasWon)
			}
		}
		return neuralData;
	}

	public ConvertToNeural(): INeuralNetworkDatum<Partial<INeuralNetworkData>, Partial<INeuralNetworkData>> {
		return {
			input: [this.factor1,
				this.factor2,
				this.factor3,
				this.hand1.calculateInt(),
				this.hand2.calculateInt(),
				this.board1.calculateInt(),
				this.board2.calculateInt(),
				this.board3.calculateInt()], 
			output: [this.win ? 1 : 0, this.win ? 0 : 1]
		};
	}
}

class NeuralPlayerData {
	public agressivity: number = 0;
	public hand1: Card = Card.None;
	public hand2: Card = Card.None;
	public hasWon: boolean = false;

	public constructor(agressivity: number, hand1: Card, hand2: Card, hasWon: boolean) {
		this.agressivity = agressivity;
		this.hand1 = hand1;
		this.hand2 = hand2;
		this.hasWon = hasWon;
	}
}