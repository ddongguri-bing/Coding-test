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

function solution(numbers, target) {
  let answer = 0;

  const queue = new Queue();

  queue.push([0, 0]);

  while (!queue.isEmpty()) {
    console.log(queue);
    const [sum, idx] = queue.pop();
    if (idx === numbers.length) {
      if (sum === target) answer += 1;
      continue;
    }

    queue.push([sum + numbers[idx], idx + 1]);
    queue.push([sum - numbers[idx], idx + 1]);
  }
  return answer;
}

console.log(solution([1, 1, 1, 1, 1], 3)); // 5
console.log(solution([4, 1, 2, 1], 4)); // 2
