const fs = require("fs");
const input = fs.readFileSync("1766.txt").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map((e) => Number(e));
const info = input.slice(1).map((i) => i.split(" ").map((e) => Number(e)));

const graph = Array.from({ length: n + 1 }, () => []);
const indegree = Array(n + 1).fill(0);

for (const [a, b] of info) {
  graph[a].push(b);
  indegree[b]++;
}

class MinHeap {
  constructor() {
    this.h = [];
  }

  push(v) {
    this.h.push(v);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }

  pop() {
    if (this.h.length === 1) return this.h.pop();
    const top = this.h[0];
    this.h[0] = this.h.pop();

    let i = 0;
    while (true) {
      let l = i * 2 + 1,
        r = i * 2 + 2,
        smallest = i;
      if (l < this.h.length && this.h[l] < this.h[smallest]) smallest = l;
      if (r < this.h.length && this.h[r] < this.h[smallest]) smallest = r;
      if (smallest === i) break;
      [this.h[i], this.h[smallest]] = [this.h[smallest], this.h[i]];
      i = smallest;
    }

    return top;
  }

  size() {
    return this.h.length;
  }
}

const heap = new MinHeap();

for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) heap.push(i);
}

const answer = [];

while (heap.size() !== 0) {
  const cur = heap.pop();
  answer.push(cur);

  for (const next of graph[cur]) {
    indegree[next]--;
    if (indegree[next] === 0) heap.push(next);
  }
}

console.log(answer.join(" "));
