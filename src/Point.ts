export class Point {
	constructor(
		public x: i32,
		public y: i32
	) { }

	@operator("==")
	static equals(a: Point, b: Point): bool {
		return (a.x == b.x && a.y == b.y)
	}

	@operator("!=")
	static nequals(a: Point, b: Point): bool {
		return !(a.x == b.x && a.y == b.y)
	}
}
