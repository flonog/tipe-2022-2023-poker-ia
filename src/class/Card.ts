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

	public calculateInt(){
		let base : number = 0;
		switch(this._value){
			case Value.Ace:
				base = base ^ 2**0;
				break;

			case Value.King:
				base = base ^ 2**1;
				break;

			case Value.Queen:
				base = base ^ 2**2;
				break;

			case Value.Ten:
				base = base ^ 2**3;
				break;

			case Value.Nine:
				base = base ^ 2**4;
				break;

			case Value.Eight:
				base = base ^ 2**5;
				break;

			case Value.Seven:
				base = base ^ 2**6;
				break;

			case Value.Six:
				base = base ^ 2**7;
				break;
			
			case Value.Five:
				base = base ^ 2**8;
				break;

			case Value.Four:
				base = base ^ 2**9;
				break;

			case Value.Three:
				base = base ^ 2**10;
				break;
			
			case Value.Two:
				base = base ^ 2**11;
				break;

			default:
				base = 0;
				break;
		}

		switch(this._color){
			case Color.Club:
				base = base ^ 2**12;
				break;
			case Color.Heart:
				base = base ^ 2**13;
				break;
			case Color.Diamond:
				base = base ^ 2**14;
				break;
			case Color.Spade:
				base = base ^ 2**15;
				break;
			default:
				base = 0;
				break;
		}

		return base;
	}

	public static ParseCard(id : string) : Card {
		return new Card(<Color> id[1], <Value> id[0]);
	}

	public static None : Card = new Card(Color.None, Value.None);

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