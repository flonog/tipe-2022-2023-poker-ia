import { readFile } from "fs";

export class FileParser{

	public static ConvertFileToArray(path : string) : Promise<string[][]>{
		return new Promise( (resolve, reject) =>{
			readFile(path, (err, data) => {
				if(err){
					reject(err);
				}
				var array = data.toString().split("\n");
				var new_array : string[][] = [];
				array.forEach((val, index) => {
					new_array[index] = val.split(" ").filter((val) => val == '' ? null : val);
				});
				resolve(new_array);
			});
		})
	}

	public static ParseGameFile(path : string){

	}

	public static ParsePlayerRoundFile(path : string){

	}

	public static ParseRosterFile(path : string){

	}

	public static ParseDir(path : string){

	}
}