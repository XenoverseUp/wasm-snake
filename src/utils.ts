import { GRID_LENGTH } from "./constants"

export function rnd(n: i32 = GRID_LENGTH): u16 {
	return u16(Math.floor(Math.random() * n))
}