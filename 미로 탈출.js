// 문제 설명
// 1 x 1 크기의 칸들로 이루어진 직사각형 격자 형태의 미로에서 탈출하려고 합니다.
// 각 칸은 통로 또는 벽으로 구성되어 있으며, 벽으로 된 칸은 지나갈 수 없고 통로로 된 칸으로만 이동할 수 있습니다.
// 통로들 중 한 칸에는 미로를 빠져나가는 문이 있는데, 이 문은 레버를 당겨서만 열 수 있습니다.
// 레버 또한 통로들 중 한 칸에 있습니다.
// 따라서, 출발 지점에서 먼저 레버가 있는 칸으로 이동하여 레버를 당긴 후 미로를 빠져나가는 문이 있는 칸으로 이동하면 됩니다.
// 이때 아직 레버를 당기지 않았더라도 출구가 있는 칸을 지나갈 수 있습니다.
// 미로에서 한 칸을 이동하는데 1초가 걸린다고 할 때, 최대한 빠르게 미로를 빠져나가는데 걸리는 시간을 구하려 합니다.

// 미로를 나타낸 문자열 배열 maps가 매개변수로 주어질 때, 미로를 탈출하는데 필요한 최소 시간을 return 하는 solution 함수를 완성해주세요.
// 만약, 탈출할 수 없다면 -1을 return 해주세요.

// 너비 우선 탐색(BFS) : 시작점으로부터 가까운 정점을 먼저 방문하고 멀리 떨어져 있는 정점을 나중에 방문하는 순회 방법

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

// 이동 가능한 좌표인지 판단하는 함수
// maps의 index가 0 이하인 경우가 없기 때문에 ny, nx가 0보다 작으면 불가능
// maps[ny][nx]가 X이면 벽이기 때문에 이동 불가능
function isValidMove(ny, nx, n, m, maps) {
  return 0 <= ny && ny < n && 0 <= nx && nx < m && maps[ny][nx] !== "X";
}

// 방문한 적이 없으면 큐에 넣고 방문 여부 표시
function appendToQueue(ny, nx, k, time, visited, q) {
  if (!visited[ny][nx][k]) {
    visited[ny][nx][k] = true;
    q.push([ny, nx, k, time + 1]);
  }
}

function solution(maps) {
  const n = maps.length; // y축 최대
  const m = maps[0].length; // x축 최대
  const visited = Array.from(Array(n), () =>
    Array(m)
      .fill(false)
      .map(() => Array(2).fill(false))
  );

  // 위아래(y축), 좌우(x축) 이동 방향
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];
  const q = new Queue();
  let endY = -1;
  let endX = -1;

  // maps 배열을 돌면서 시작점과 끝점의 좌표를 저장
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 시작점인 경우 그 노드부터 시작이므로 visited[i][j][0]을 true로 변경
      if (maps[i][j] === "S") {
        q.push([i, j, 0, 0]);
        visited[i][j][0] = true;
      }
      // 끝점인 경우, 해당 죄표를 endY, endX에 저장
      if (maps[i][j] === "E") {
        endY = i;
        endX = j;
      }
    }
  }

  // 큐가 빌 때까지 반복
  while (!q.isEmpty()) {
    // 현재 큐에 들어와있는 내용을 pop
    const [y, x, k, time] = q.pop();

    // 만약 현재 큐에 들어와있는 y좌표와 x좌표가 끝점 좌표와 같고, 레버를 당긴 상태(k === 1)이라면 (소요)시간을 반환
    if (y === endY && x === endX && k === 1) return time;

    // 현재 큐에 들어와있는 좌표를 기준으로 상하좌우로 이동한 뒤
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      // 상하좌우로 이동한 좌표가 이동 가능한 좌표인지 확인 후
      if (!isValidMove(ny, nx, n, m, maps)) continue;

      // 이동한 좌표가 레버라면 k에 1을 넣어서 큐에 push, 아니라면 이동한 좌표와 매개변수를 큐에 push
      if (maps[ny][nx] === "L") appendToQueue(ny, nx, 1, time, visited, q);
      else appendToQueue(ny, nx, k, time, visited, q);
    }
  }

  // 도착지점을 찾지 못한 경우
  return -1;
}

console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"])); //16
console.log(solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"])); // -1
