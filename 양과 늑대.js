// 문제 설명
// 2진 트리 모양 초원의 각 노드에 늑대와 양이 한 마리씩 놓여 있습니다.
// 이 초원의 루트 노드에서 출발하여 각 노드를 돌아다니며 양을 모으려 합니다.
// 각 노드를 방문할 때 마다 해당 노드에 있던 양과 늑대가 당신을 따라오게 됩니다.
// 이때, 늑대는 양을 잡아먹을 기회를 노리고 있으며, 당신이 모은 양의 수보다 늑대의 수가 같거나 더 많아지면 바로 모든 양을 잡아먹어 버립니다.
// 당신은 중간에 양이 늑대에게 잡아먹히지 않도록 하면서 최대한 많은 수의 양을 모아서 다시 루트 노드로 돌아오려 합니다.
// 각 노드에 있는 양 또는 늑대에 대한 정보가 담긴 배열 info, 2진 트리의 각 노드들의 연결 관계를 담은 2차원 배열 edges가 매개변수로 주어질 때,
// 문제에 제시된 조건에 따라 각 노드를 방문하면서 모을 수 있는 양은 최대 몇 마리인지 return 하도록 solution 함수를 완성해주세요.

// 1. 현재 방문한 node의 인접 노드가 전부 방문 대상
// 2. 최적의 해
// 위 두 가지 조건이 나오면 BFS 알고리즘!

// BFS는 Queue를 사용하기 때문에 Queue를 구현
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

// tree 생성 함수
function buildTree(info, edges) {
  // info의 길이만큼 배열을 생성
  const tree = Array.from({ length: info.length }, () => []);
  // edges는 [부모 노드, 자식 노드]로 구성되어 있으므로 tree의 부모 노드 index번째에 자식 노드를 push
  for (const [from, to] of edges) tree[from].push(to);
  return tree;
}

function solution(info, edges) {
  const tree = buildTree(info, edges);
  // 최대 양의 수를 저장할 변수
  let maxSheep = 0;

  const q = new Queue();
  // [현재 노드, 양의 수(루트 노드는 무조건 양이므로 1), 늑대의 수, 방문한 노드 집합]
  q.push([0, 1, 0, new Set()]);

  while (!q.isEmpty()) {
    // 큐에서 상태 가져오기
    const [current, sheepCount, wolfCount, visited] = q.pop();
    // 최대 양의 수 업데이트
    maxSheep = Math.max(maxSheep, sheepCount);
    // 현재 노드를 기준으로 자식 노드를 visited 변수에 추가
    for (const next of tree[current]) visited.add(next);

    // visited에 들어있는 변수를 돌면서 양의 수와 늑대 수를 구함
    for (const next of visited) {
      if (info[next]) {
        // 늑대인 경우
        // 단, 늑대의 수가 양의 수보다 같거나 많아지면 안되므로 조건 추가
        if (sheepCount != wolfCount + 1) {
          const newVisited = new Set(visited);
          newVisited.delete(next);
          q.push([next, sheepCount, wolfCount + 1, newVisited]);
        }
      } else {
        // 양인 경우
        const newVisited = new Set(visited);
        newVisited.delete(next);
        q.push([next, sheepCount + 1, wolfCount, newVisited]);
      }
    }
  }

  return maxSheep;
}

console.log(
  solution(
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [
      [0, 1],
      [1, 2],
      [1, 4],
      [0, 8],
      [8, 7],
      [9, 10],
      [9, 11],
      [4, 3],
      [6, 5],
      [4, 6],
      [8, 9],
    ]
  )
); // 5
console.log(
  solution(
    [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
    [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 5],
      [2, 6],
      [3, 7],
      [4, 8],
      [6, 9],
      [9, 10],
    ]
  )
); // 5
