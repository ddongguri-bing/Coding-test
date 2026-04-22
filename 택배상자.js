function solution(order) {
  let order_idx = 0;
  const sub_conveyor = [];

  let answer = 0;

  for (let i = 0; i < order.length; i++) {
    if (i + 1 === order[order_idx]) {
      answer++;
      order_idx++;
    } else {
      sub_conveyor.push(i + 1);
    }

    while (
      sub_conveyor.length > 0 &&
      sub_conveyor[sub_conveyor.length - 1] === order[order_idx]
    ) {
      sub_conveyor.pop();
      answer++;
      order_idx++;
    }
  }

  return answer;
}

console.log(solution([4, 3, 1, 2, 5])); // 2
console.log(solution([5, 4, 3, 2, 1])); // 5
