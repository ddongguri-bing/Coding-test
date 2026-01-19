function solution(n, k, cmd) {
  const prev = Array(n).fill(null);
  const next = Array(n).fill(null);

  for (let i = 0; i < n; i++) {
    if (i > 0) prev[i] = i - 1;
    if (i < n - 1) next[i] = i + 1;
  }

  const deletedStack = [];
  const result = Array(n).fill("O");

  let current = k;

  for (const command of cmd) {
    const [type, value] = command.split(" ");

    if (type === "U") {
      let move = +value;
      while (move--) current = prev[current];
    } else if (type === "D") {
      let move = +value;
      while (move--) current = next[current];
    } else if (type === "C") {
      deletedStack.push([current, prev[current], next[current]]);
      result[current] = "X";

      if (prev[current] !== null) next[prev[current]] = next[current];
      if (next[current] !== null) prev[next[current]] = prev[current];

      current = next[current] !== null ? next[current] : prev[current];
    } else if (type === "Z") {
      const [idx, p, n] = deletedStack.pop();
      result[idx] = "O";

      if (p !== null) next[p] = idx;
      if (n !== null) prev[n] = idx;
    }
  }
  return result.join("");
}

console.log(
  solution(8, 2, ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"]),
); // "OOOOXOOO"
console.log(
  solution(8, 2, [
    "D 2",
    "C",
    "U 3",
    "C",
    "D 4",
    "C",
    "U 2",
    "Z",
    "Z",
    "U 1",
    "C",
  ]),
); // "OOXOXOOO"
