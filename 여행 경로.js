function solution(tickets) {
  const start = "ICN";

  // 출발지와 목적지를 그래프 형태로 변환
  const adjacency_list = {};
  tickets.forEach(([dep, dest], idx) => {
    if (!adjacency_list[dep]) adjacency_list[dep] = [];
    adjacency_list[dep].push({ to: dest, idx });
  });

  // 목적지가 2개 이상이라면 사전순으로 정렬
  for (const dep in adjacency_list) {
    adjacency_list[dep].sort((a, b) => a.to.localeCompare(b.to));
  }

  // 티켓 사용 여부를 저장할 used 변수 선언 및 할당
  const used = Array(tickets.length).fill(false);

  // 여행 경로를 저장할 answer 변수 선언 및 초기화
  const answer = [];

  // dfs
  function dfs(current_airport, used_tickets_count) {
    // 우선 현재 공항에 있기 때문에 경로를 기록(정답 배열에 푸시)
    answer.push(current_airport);

    // 종료 조건 : 사용한 티켓의 수와 전체 티켓 수가 같으면 dfs 종료
    if (used_tickets_count === tickets.length) return true;

    // 다음 방문할 목적지가 있다면 불러오고, 없다면 빈 배열
    const next_airport = adjacency_list[current_airport] || [];

    // 방문할 목적지 목록을 순회하면서
    for (const { to, idx } of next_airport) {
      // 방문하지 않은 목적지를 기준으로 경로 탐색
      if (!used[idx]) {
        // 우선 해당 티켓을 사용 처리
        used[idx] = true;
        // dfs 재귀한 뒤 성공하면 재귀 종료
        if (dfs(to, used_tickets_count + 1)) return true;
        // 만약 dfs 재귀를 통과하지 못하면 티켓 사용을 취소 처리
        used[idx] = false;
      }
    }

    // dfs 재귀를 했음에도 아예 실패하는 경우, 현재 경로를 제거
    answer.pop();

    // 상위 재귀로 되돌아감
    return false;
  }

  // dfs(현재 공항, 사용한 티켓 수)로 dfs 시작
  dfs(start, 0);

  return answer;
}

console.log(
  solution([
    ["ICN", "JFK"],
    ["HND", "IAD"],
    ["JFK", "HND"],
  ])
); // ["ICN", "JFK", "HND", "IAD"]

console.log(
  solution([
    ["ICN", "SFO"],
    ["ICN", "ATL"],
    ["SFO", "ATL"],
    ["ATL", "ICN"],
    ["ATL", "SFO"],
  ])
); // ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]
