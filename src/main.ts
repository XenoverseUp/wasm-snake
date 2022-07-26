import * as w4 from "./wasm4";
import { Snake } from "./Snake"
import { Point } from "./Point"
import { Fruit } from "./Fruit"
import { GRID_SIZE } from "./constants";

let snake: Snake = new Snake()
const fruit: Fruit = new Fruit()
let frame = 0
let frameDirection: Point = snake.direction
let prevState: u8

const slowness = 10

function reset(): void {
    snake = new Snake()
    fruit.update(snake)
}


function input(): void {
    const gamepad = load<u8>(w4.GAMEPAD1)
    const justPressed = gamepad & (gamepad ^ prevState)

    if (justPressed & w4.BUTTON_UP) {
        snake.up(frameDirection)
    }
    if (justPressed & w4.BUTTON_DOWN) {
        snake.down(frameDirection)
    }
    if (justPressed & w4.BUTTON_LEFT) {
        snake.left(frameDirection)
    }
    if (justPressed & w4.BUTTON_RIGHT) {
        snake.right(frameDirection)
    }

    prevState = gamepad
}


export function start(): void {
    store<u32>(w4.PALETTE, 0xfbf7f3, 0 * sizeof<u32>())
    store<u32>(w4.PALETTE, 0xe5b083, 1 * sizeof<u32>())
    store<u32>(w4.PALETTE, 0x426e5d, 2 * sizeof<u32>())
    store<u32>(w4.PALETTE, 0x20283d, 3 * sizeof<u32>())
}

export function update(): void {
    frame++
    input()

    if (frame % slowness == 0) {
        snake.update()
        frameDirection = snake.direction

        if (snake.isDead()) {
            reset()
        }

        if (snake.body[0] == fruit.position) {
            let tail = snake.body[snake.body.length - 1]
            snake.body.push(new Point(tail.x, tail.y))
            fruit.update(snake)
        }
    }

    snake.draw()
    store<u16>(w4.DRAW_COLORS, 0x4320)
    w4.blit(Fruit.sprite, fruit.position.x * GRID_SIZE, fruit.position.y * GRID_SIZE, Fruit.width, Fruit.height, w4.BLIT_2BPP)
}
