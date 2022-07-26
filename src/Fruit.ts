import { Point } from "./Point"
import { Snake } from "./Snake"
import { rnd } from "./utils"

export class Fruit {
	public position: Point

	constructor() {
		this.position = new Point(rnd(), rnd())
	}

	static width: u8 = 8
	static height: u8 = 8
	static fruitFlags: u8 = 1
	static sprite: usize = memory.data<u8>([
		0x00,
		0xa0,
		0x02,
		0x00,
		0x0e,
		0xf0,
		0x36,
		0x5c,
		0xd6,
		0x57,
		0xd5,
		0x57,
		0x35,
		0x5c,
		0x0f,
		0xf0
	])

	update(snake: Snake): void {
		do {
			this.position = new Point(rnd(), rnd())
		} while (snake << this.position)
	}
}