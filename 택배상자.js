function solution(order) {
  let order_idx = 0;
  const sub_container = [];

  let answer = 0;

  for (let i = 0; i < order.length; i++) {
    if (i + 1 === order[order_idx]) {
      answer++;
      order_idx++;
    } else {
      sub_container.push(i + 1);
    }

    while (
      sub_container.length > 0 &&
      sub_container[sub_container.length - 1] === order[order_idx]
    ) {
      sub_container.pop();
      answer++;
      order_idx++;
    }
  }

  return answer;
}

console.log(solution([4, 3, 1, 2, 5])); // 2
console.log(solution([5, 4, 3, 2, 1])); // 5
