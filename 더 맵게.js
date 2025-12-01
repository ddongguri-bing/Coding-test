// 매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다.
// 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.

// 섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)

// Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.
// Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때,
// 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 작성해주세요.

class MinHeap {
  constructor() {
    this.heap = []; // 힙을 저장할 배열 생성, 배열의 0번 인덱스가 최소값을 가지도록 유지해야 함
  }

  push(value) {
    this.heap.push(value); // 배열의 맨 끝에 새 값을 추가
    this.bubbleUp();
    // 새로 넣은 값의 인덱스를 i라고 할 때 부모 인덱스는 Math.floor((i-1)/2)
    // 부모 값이 현재 값보다 크면 둘을 스왑
    // i를 부모 인덱스로 바꿔서 루프 반복
    // 부모가 더 작거나 루트에 도달하면 멈춤
    // 따라서 힙의 모든 부모자식 관걔가 부모 <= 자식이 되도록 유지
    // 여기서의 시간 복잡도는 O(log n) -> 힙 높이만큼만 이동하기 때문
  }

  pop() {
    // 예외처리 => 원소가 하나라면 바로 꺼내서 반환
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0]; // 현재 힙은 루트노드가 최소값을 가지도록 유지하고 있으니 최소값 저장
    this.heap[0] = this.heap.pop(); // 마지막 원소를 루트로 옮김
    this.bubbleDown(); // 해당 요소를 아래로 내리는 루프
    // 현재 루트 인덱스 i에서 왼쪽 자식 left = i*2+1, 오른쪽 i*2+2 계산
    // 세 값 중 가장 작은 인덱스를 찾음
    // 만약 자식이 더 작다면 스왑하고 i를 그 자식의 인덱스로 바꿔 반복
    // 더 이상 교환할 필요가 없다면 멈춤
    return top; // 원래 최소값을 반환
    // 시간 복잡도는 O(log n)
  }

  // push할 때 새 값은 무조건 배열의 맨 끝에 들어가게 된다
  // 하지만 힙은 항상 부모가 자식보다 작아야 최소힙이 되기 때문에 맨 끝에 있는 요소가 힙의 규칙을 어기면 위로 올려야 함
  //  해당 로직을 bubbleUp이라고 정의
  bubbleUp() {
    let index = this.heap.length - 1; // 새로 들어간 값의 위치(늘 맨 끝)

    while (index > 0) {
      let parent = Math.floor((index - 1) / 2); // 부모의 인덱스
      if (this.heap[parent] <= this.heap[index]) break; // 만약 부모의 값이 자직의 값보다 작거나 같다면 규칙 통과이므로 break

      // 부모의 값이 자식의 값보다 크다면 스왑 -> 구조분해할당
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      // 스왑했다면 현재 삽입된 요소의 인덱스를 부모의 인덱스로 변경
      index = parent;
    }
  }

  // 힙에서 pop을 하면 최소값(루트)를 꺼내게 되고, 마지막 원소를 루트 자리에 집어 넣는다
  // 하지만 힙의 규칙에 의하면 마지막 원소를 적절한 루트 자리가 아니게 된다
  // 따라서 해당 요소를 아래로 내리면서 적절한 자리로 가도록 해야한다
  // 해당 로직을 bubbleDown이라고 한다
  bubbleDown() {
    let index = 0; // 제일 마지막 요소를 루트로 올렸기 때문에 비교를 시작할 인덱스는 루트
    const length = this.heap.length; // 해당 로직은 단순히 위치만 옮기는 것이기 때문에 힙의 길이를 변수에 저장하여 재계산을 줄일 수 있음

    while (true) {
      // 현재 노드의 왼쪽 자식 인덱스를 계산
      let left = index * 2 + 1;
      // 현재 노드의 오른쪽 자신 인덱스를 계산
      let right = index * 2 + 2;
      // 일단 가장 작은 노드는 자기 자신이라고 가정
      let smallest = index;

      // 왼쪽 자식이 존재하고, 왼쪽 자식의 값이 현재 smallest 값보다 작으면 smallest를 왼쪽 자식으로 갱신
      if (left < length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      // 오른쪽 자식이 존재하고, 오른쪽 자식의 값이 현재 smallest 값보다 작으면 smallest를 오른쪽 자식으로 갱신
      if (right < length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }
      // 만약 smallest가 여전히 자기 자신이라면(자식들보다 현재 노드가 더 작거나 자식이 없어서 힙 규칙을 만족하면)
      // 더 이상 요소를 스왑할 필요가 없기 때문에 루프 종료
      if (smallest === index) break;

      // 만약 그게 아니라면 현재 노드와 smallest 위치의 노드를 스왑하여 더 작은 값이 위로 오도록 한다
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      // 스왑 후에는 인덱스를 내려간 위치(smallest)로 업데이트 하여 내려간 자리에서 다시 같은 비교를 반복
      index = smallest;
    }
  }
}

function solution(scoville, K) {
  const heap = new MinHeap();
  scoville.forEach((e) => heap.push(e));

  let count = 0;

  // 힙의 길이가 2보다 작으면 더 이상 음식을 섞지 못하고
  // 가장 맵지 않은 음식의 스코빌 지수가 K보다 크면 문제의 조건을 만족하므로
  // 힙의 길이가 2보다 크거나 같고, 가장 맵지 않은 음식의 스코빌 지수가 K보다 작을 때 루프를 돌도록 함
  while (heap.heap.length >= 2 && heap.heap[0] < K) {
    const first = heap.pop();
    const second = heap.pop();

    const mixed = first + second * 2;
    heap.push(mixed);
    count++;
  }

  // 루프를 다 돈 후 가장 맵지 않은 음식의 스코빌 지수가 K보다 크거나 같으면 count, 즉 섞은 횟수를 반환하고,
  // 루프를 다 돈 후에도 문제의 조건을 만족하지 못한다면 -1을 반환
  return heap.heap[0] >= K ? count : -1;
}

function failedSolution(scoville, K) {
  const mixFoods = (first, second) => first + second * 2;

  let answer = 0;

  scoville.sort((a, b) => b - a);

  // 이 로직은 매 반복마다 O(n log n) * 최대 n번 => O(n^2 log n)
  // n의 최대값이 1,000,000이기 때문에 배열만 가지고 통과 불가
  // 따라서 힙 구현이 필수적
  while (scoville[scoville.length - 1] < K) {
    scoville.sort((a, b) => b - a); // O(n log n)
    if (scoville.length < 2) return -1;

    const first = scoville.pop(); // O(1)
    const second = scoville.pop(); // O(1)

    const mixed = mixFoods(first, second);
    scoville.push(mixed);

    answer++;
  }

  return answer;
}

console.log(solution([1, 2, 3, 9, 10, 12], 7)); // 2
console.log(failedSolution([1, 2, 3, 9, 10, 12], 7)); // 2
