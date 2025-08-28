function find(parents, x) {
  // x가 자기자신이라면 x를 return
  if (parents[x] === x) return x;
  // 그렇지 않다면 x의 부모를 찾아서 parents[x]에 저장
  parents[x] = find(parents, parents[x]); // 재귀를 통해 루트 노드를 find
  return parents[x];
}

function union(parents, x, y) {
  const root1 = find(parents, x);
  const root2 = find(parents, y);
  parents[root2] = root1;
}

function solution(k, operations) {
  const parents = Array.from({ length: k }, (_, i) => i);
  let setCount = k;

  for (const op of operations) {
    if (op[0] === "u") union(parents, op[1], op[2]);
    else if (op[0] === "f") find(parents, op[1]);
    setCount = new Set(Array.from({ length: k }, (_, i) => find(parents, i)))
      .size;
  }

  return setCount;
}

console.log(solution(3, [["u", 0, 1], ["u", 1, 2], [["f", 2]]])); // 1
console.log(solution(4, [["u", 0, 1], ["u", 2, 3], [["f", 0]]])); // 2
