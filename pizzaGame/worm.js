class Worm {
    constructor() {
        this.wormBody = [new Tile(13, 10), new Tile(13, 11), new Tile(13, 12)];
        // 현재 방향
        this.dir = 'ArrowUp';
        // 다음 진행 방향
        this.dirNext = 'ArrowUp';
    }

    renderWorm() {
        this.wormBody.forEach((item) => {
            item.renderTile();
        });
    }

    collisionCheck(wormHead) {
        // 테두리
        const leftEdge = (wormHead.col === 0);
        const topEdge = (wormHead.row === 0);
        const rightEdge = (wormHead.col === tileWidth - 1);
        const bottomEdge = (wormHead.row === tileHeight - 1);

        // 게임 테두리에 충돌 체크
        const collisionEdge = leftEdge || topEdge || rightEdge || bottomEdge

        // 몸과 충돌 했는지
        let collisionBody;
        this.wormBody.forEach((item) => {
            if(wormHead.collisionCheck(item)) {
                collisionBody = true
            }
        })
        return collisionEdge || collisionBody

    }

    moveWorm() {
        // 현재 머리
        const head = this.wormBody[0];
        
        // 이동 후에 다른 새로운 머리
        let newHead;

        // 다음 방향으로 지렁이가 움직인다.
        this.dir = this.dirNext;

        if(this.dir === "ArrowRight") {
            newHead = new Tile(head.col + 1, head.row)
        }else if(this.dir === 'ArrowDown') {
            newHead = new Tile(head.col, head.row + 1)
        }else if(this.dir === 'ArrowLeft') {
            newHead = new Tile(head.col - 1, head.row)
        }else if(this.dir === 'ArrowUp') {
            newHead = new Tile(head.col, head.row - 1)
        }

        if(this.collisionCheck(newHead)) {
            renderOver();
        }

        this.wormBody.unshift(newHead);

        if(newHead.collisionCheck(pizza.pos)) {
            ctxBg.clearRect(0, 0, cWidth, cHeight);
            pizza.randomPizza();
        }


        this.wormBody.pop()
    }

    // 사용자의 입력에 따라 지렁이의 방향 결정
    checkDirection(dirKey) {
        if(this.dir === 'ArrowRight' && dirKey === "ArrowLeft"){
            return;
        }else if(this.dir === 'ArrowUp' && dirKey === 'ArrowDown'){
            return;
        }else if(this.dir === 'ArrowDown' && dirKey === 'ArrowUp'){
            return;
        }else if(this.dir === 'ArrowLeft' && dirKey === 'ArrowRight'){
            return;
        }

        this.dirNext = dirKey;
    }
}