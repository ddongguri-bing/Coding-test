// ROR 게임은 두 팀으로 나누어서 진행하며, 상대 팀 진영을 먼저 파괴하면 이기는 게임입니다.
// 따라서, 각 팀은 상대 팀 진영에 최대한 빨리 도착하는 것이 유리합니다.

// 지금부터 당신은 한 팀의 팀원이 되어 게임을 진행하려고 합니다.
// 다음은 5 x 5 크기의 맵에, 당신의 캐릭터가 (행: 1, 열: 1) 위치에 있고, 상대 팀 진영은 (행: 5, 열: 5) 위치에 있는 경우의 예시입니다.

// 위 그림에서 검은색 부분은 벽으로 막혀있어 갈 수 없는 길이며, 흰색 부분은 갈 수 있는 길입니다.
// 캐릭터가 움직일 때는 동, 서, 남, 북 방향으로 한 칸씩 이동하며, 게임 맵을 벗어난 길은 갈 수 없습니다.
// 아래 예시는 캐릭터가 상대 팀 진영으로 가는 두 가지 방법을 나타내고 있습니다.

// 첫 번째 방법은 11개의 칸을 지나서 상대 팀 진영에 도착했습니다.
// 두 번째 방법은 15개의 칸을 지나서 상대팀 진영에 도착했습니다.

// 위 예시에서는 첫 번째 방법보다 더 빠르게 상대팀 진영에 도착하는 방법은 없으므로, 이 방법이 상대 팀 진영으로 가는 가장 빠른 방법입니다.

// 만약, 상대 팀이 자신의 팀 진영 주위에 벽을 세워두었다면 상대 팀 진영에 도착하지 못할 수도 있습니다.
// 예를 들어, 다음과 같은 경우에 당신의 캐릭터는 상대 팀 진영에 도착할 수 없습니다.

// 게임 맵의 상태 maps가 매개변수로 주어질 때, 캐릭터가 상대 팀 진영에 도착하기 위해서 지나가야 하는 칸의 개수의 최솟값을 return 하도록 solution 함수를 완성해주세요.
// 단, 상대 팀 진영에 도착할 수 없을 때는 -1을 return 해주세요.
class Queue {
  items = [];
  front = 0;
  rear = 0;

  first() {
    return this.items[this.front];
  }

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

function solution(maps) {
  // 이동할 수 있는 방향을 나타내는 move 배열을 [dx, dy] 형태로 선언
  const move = [
    [-1, 0], // 좌
    [0, -1], // 상
    [0, 1], // 하
    [1, 0], // 우
  ];

  // 세로축
  const n = maps.length;
  // 가로축
  const m = maps[0].length;

  // 거리를 저장하는 배열 dist를 -1로 초기화(최단거리 저장)
  const dist = Array.from({ length: n }, () => Array(m).fill(-1)); // 각 노드의 방문 여부 표시(-1은 방문 전 노드)

  function bfs(start) {
    const q = new Queue();
    q.push(start);
    dist[start[0]][start[1]] = 1; // 시작 노드를 방문 처리

    // 큐가 빌 때까지 반복
    while (!q.isEmpty()) {
      const here = q.pop(); // 현재 노드를 반환

      // 상하좌우 4방향을 확인
      for (const [dx, dy] of move) {
        const row = here[0] + dx;
        const column = here[1] + dy;

        // 만약 맵의 영역을 벗어난다면 continue
        if (row < 0 || row >= n || column < 0 || column >= m) continue;

        // 만약 해당 노드가 0(벽)이라면 continue
        if (maps[row][column] === 0) continue;

        // 만약 해당 노드에 아직 방문하지 않았다면
        if (dist[row][column] === -1) {
          // 큐에 다음 노드를 push
          q.push([row, column]);
          // 다음 노드를 방문처리
          dist[row][column] = dist[here[0]][here[1]] + 1;
        }
      }
    }

    return dist;
  }

  bfs([0, 0]);

  // 만약 도착이 불가능하다면 -1 반환
  return dist[n - 1][m - 1];
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
