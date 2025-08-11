// Queue 구현부
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

  // 이 문제에서는 큐의 크기를 알아야 한다
  size() {
    return this.rear - this.front;
  }
}

function solution(N, K) {
  const queue = new Queue();

  for (let i = 1; i <= N; i++) {
    queue.push(i);
  }

  // queue에 요소가 하나 남을 때까지 반복
  while (queue.size() > 1) {
    // K번째 요소를 찾기 위해 앞에서부터 제거하고 뒤에 추가
    for (let i = 0; i < K - 1; i++) {
      queue.push(queue.pop());
    }
    queue.pop();
  }
  return queue.pop();
}

console.log(solution(5, 2)); // 3
