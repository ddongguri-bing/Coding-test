class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return top;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent][1] <= this.heap[index][1]) break;

      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];

      index = parent;
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.heap[left][1] < this.heap[smallest][1])
        smallest = left;
      if (right < length && this.heap[right][1] < this.heap[smallest][1])
        smallest = right;
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];

      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

// 요청된 작업들 중에서 처리시간이 가장 짧은 작업부터 처리하면 평균 대기 시간이 최소가 된다
function solution(jobs) {
  // jobs = [요청 시간, 처리 시간]
  // jobs 매개변수로 들어오는 작업들은 정렬이 되어있지 않기 때문에 요청 시간을 기준으로 오름차순 정렬 수행
  // 시간이 흐를 때 어떤 작업이 이미 도착했는지 확인하기 위해 정렬해둬야 한다
  jobs.sort((a, b) => a[0] - b[0]);

  const heap = new MinHeap(); // 처리시간 기반으로 최소 힙 만들기

  let time = 0; // 현재 시간
  let idx = 0; // jobs 배열에서 아직 힙에 못 넣은 인덱스
  let total = 0; // 총 대기 + 처리 시간
  let count = jobs.length; // 전체 작업 수

  // 현재 시간보다 먼저 요청된 작업들만 힙에 넣고, 이 힙은 처리시간이 짧은 순으로 정렬돼야 함
  // 모든 job을 처리하면서도 힙도 비어있을 때까지 계속 반복
  while (idx < jobs.length || !heap.isEmpty()) {
    // 현재 시간 이하로 요청된 job을 모두 힙에 넣기
    while (idx < jobs.length && jobs[idx][0] <= time) {
      heap.push(jobs[idx]);
      idx++; // 다음 job 확인
    }

    // 힙에 작업이 있다면 -> 가장 처리시간 짧은 작업 꺼내기
    if (!heap.isEmpty()) {
      // 힙에서 처리 시간이 가장 짧은 작업을 꺼냄
      // 그 작업을 처리하면 time에 처리시간을 더하고 총 걸린 시간 = 처리 완료 시점 - 요청 시간을 total에 누적
      const [start, duration] = heap.pop(); // 가장 짧은 duration 가진 job 꺼냄
      time += duration; // 작업 처리 -> 시간 증가
      total += time - start; // 요청부터 완료까지 걸린 시간 누적
    } else time = jobs[idx][0];
    // 만약 힙이 비어 있는데 아직 처리하지 않은 요청이 남아있으면 CPU는 놀고 있는 상태니까 다음 작업의 요청 시간까지 time을 점프
    // 힙에 비어있다는건 아직 time 이하 요청이 없음
    // 다음 job의 요청시간까지 time을 점프
  }

  // 평균 시간 = 총합 / 작업 개수
  return Math.floor(total / count);
}

console.log(
  solution([
    [0, 3],
    [1, 9],
    [3, 5],
  ])
); // 8
console.log(
  solution([
    [7, 8],
    [3, 5],
    [9, 6],
  ])
); // 9
