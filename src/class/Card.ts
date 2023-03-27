import { GamePart } from "./Game";

export enum Color {
	Spade = "s", // Trèfle
	Heart = "h", // Coeur
	Club = "c", // Pic
	Diamond = "d", // Carreau
	None = "0", 
}

export enum Value {
	Ace = "A",
	King = "K",
	Queen = "Q",
	Jack = "J", // Joker
	Ten = "T",
	Nine = "9",
	Eight = "8",
	Seven = "7",
	Six = "6",
	Five = "5",
	Four = "4",
	Three = "3",
	Two = "2",
	One = "1",
	None = "0"
}

export class Card{
	private _color : Color;
	private _value : Value;

	constructor(color : Color, value : Value){
		this._color = color;
		this._value = value;
	}

	public get color(){
		return this._color;
	}

	public get value(){
		return this._value;
	}

	public ToString() : string {
		return this._value + this._color;
	}

	public static ParseCard(id : string) : Card {
		return new Card(<Color> id[1], <Value> id[0]);
	}

	static ParseFromStringArray(array : string[]): Card[] {
		let cardList : Card[] = [];
		for(let i = 0; i <= array.length; i ++){
			if(array[i] == undefined)
				break;
			cardList.push(this.ParseCard(array[i] ?? "00"));
		}
		return cardList;
	}
	
}