function solution(graph, start) {
  // 그래프를 객체 형태로 인접 리스트로 표현하기 위한 adjList 선언
  const adjList = {}; // 인접 리스트

  // 그래프를 순환하면서 해당 노드와 인접한 노드를 객체 형태로 저장
  graph.forEach(([u, v]) => {
    if (!adjList[u]) adjList[u] = [];
    adjList[u].push(v);
  });

  // 재귀로 dfs를 설계
  function dfs(node, visited, result) {
    // 매개변수로 전달된 node를 visited 변수에 추가
    visited.add(node);
    // 매개변수로 전달된 node를 result 변수에 추가
    result.push(node);
    // 인접 리스트의 노드들을 순환하면서 인접한 노드들을 확인
    (adjList[node] || []).forEach((neighbor) => {
      // 만약 방문한 노드들을 저장하는 visited 변수에 인접한 노드가 없다면 해당 노드를 매개변수로 전달하여 dfs 호출
      if (!visited.has(neighbor)) {
        dfs(neighbor, visited, result);
      }
    });
  }

  // 방문한 노드들을 저장하는 visited 변수 정의(방문 처리)
  const visited = new Set();
  // 방문한 순서대로 결과를 저장할 result 변수 정의(방문 순서 저장)
  const result = [];
  // 첫 노드를 매개변수로 dfs 호출
  dfs(start, visited, result);

  return result;
}

console.log(
  solution(
    [
      ["A", "B"],
      ["B", "C"],
      ["C", "D"],
      ["D", "E"],
    ],
    "A"
  )
); // ['A', 'B', 'C', 'D', 'E']
console.log(
  solution(
    [
      ["A", "B"],
      ["A", "C"],
      ["B", "D"],
      ["B", "E"],
      ["C", "F"],
      ["E", "F"],
    ],
    "A"
  )
); // ['A', 'B', 'D', 'E', 'F', 'C']
