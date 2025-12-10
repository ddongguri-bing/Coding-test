class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
  }

  pop() {
    return this.items[this.front++];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

const isValidMove = (nx, ny, maxX, maxY, maps) => {
  return 0 <= nx && nx < maxX && 0 <= ny && ny < maxY && maps[ny][nx] === 1;
};

function solution(maps) {
  const maxX = maps[0].length;
  const maxY = maps.length;
  const visited = Array.from(Array(maxY), () => Array(maxX).fill(-1));

  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  const queueForBFS = new Queue();
  const endX = maxX - 1;
  const endY = maxY - 1;

  queueForBFS.push([0, 0]);
  visited[0][0] = 1;

  while (!queueForBFS.isEmpty()) {
    const [currentY, currentX] = queueForBFS.pop();

    for (let i = 0; i < 4; i++) {
      const nx = currentX + dx[i];
      const ny = currentY + dy[i];

      if (!isValidMove(nx, ny, maxX, maxY, maps)) continue;

      if (visited[ny][nx] === -1) {
        queueForBFS.push([ny, nx]);
        visited[ny][nx] = visited[currentY][currentX] + 1;
      }
    }
  }

  console.log(visited);

  return visited[endY][endX];
}

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ])
); // 11

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
  ])
); // -1
