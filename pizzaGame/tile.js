class Tile {
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.posX = this.col * tileSize;
        this.posY = this.row * tileSize;
    }

    renderTile(bg = 'green') {
        ctx.fillStyle = bg;
        ctx.fillRect(this.posX , this.posY, tileSize, tileSize);
    }

    renderImg(bg = './img/pizza.png') {
        const image = new Image(tileSize, tileSize);
        image.src = bg;
        image.addEventListener('load', () => {
            ctxBg.drawImage(image, this.posX, this.posY, tileSize, tileSize)
        })
    }

    // 충돌을 체크 하는 함수
    collisionCheck(target) {
        return this.col === target.col && this.row === target.row
    }
}