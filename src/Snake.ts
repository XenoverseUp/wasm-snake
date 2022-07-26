import * as w4 from "./wasm4"
import { Point } from "./Point"
import { GRID_LENGTH, GRID_SIZE } from "./constants"

export class Snake {
	body: Array<Point> = [
		new Point(2, 0),
		new Point(1, 0),
		new Point(0, 0)
	]

	head: Point = this.body[0]

	direction: Point = new Point(1, 0)

	draw(): void {
		store<u16>(w4.DRAW_COLORS, 0x0043)
		this.body.forEach(piece => w4.rect(piece.x * GRID_SIZE, piece.y * GRID_SIZE, GRID_SIZE, GRID_SIZE))

		store<u16>(w4.DRAW_COLORS, 0x0004)
		w4.rect(this.head.x * GRID_SIZE, this.head.y * GRID_SIZE, GRID_SIZE, GRID_SIZE)
	}

	update(): void {
		let body = this.body

		for (let i = body.length - 1; i > 0; i--) {
			unchecked(body[i].x = body[i - 1].x)
			unchecked(body[i].y = body[i - 1].y)
		}

		body[0].x = (body[0].x + this.direction.x) % GRID_LENGTH
		body[0].y = (body[0].y + this.direction.y) % GRID_LENGTH

		if (body[0].x < 0) {
			body[0].x = GRID_LENGTH - 1
		}
		if (body[0].y < 0) {
			body[0].y = GRID_LENGTH - 1
		}
	}

	isDead(): bool {
		return this <= this.head
	}

	up(frameDirection: Point): void {
		if (frameDirection != new Point(0, 1)) { this.direction = new Point(0, -1) }
	}

	down(frameDirection: Point): void {
		if (frameDirection != new Point(0, -1)) { this.direction = new Point(0, 1) }
	}

	left(frameDirection: Point): void {
		if (frameDirection != new Point(1, 0)) { this.direction = new Point(-1, 0) }
	}

	right(frameDirection: Point): void {
		if (frameDirection != new Point(-1, 0)) { this.direction = new Point(1, 0) }
	}

	@operator("<<")
	static contains(s: Snake, p: Point): bool {
		for (let i = 0; i < s.body.length; i++) {
			if (s.body[i] == p) {
				return true
			}
		}

		return false
	}


	@operator("<=")
	static containsInBody(s: Snake, p: Point): bool {
		let isOverlapping: bool = false

		for (let i = 1; i < s.body.length; i++) {
			if (s.body[i] == p) {
				isOverlapping = true
				break
			}
		}

		return isOverlapping
	}
}

