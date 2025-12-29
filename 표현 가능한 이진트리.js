// 포화 이진트리 길이로 맞추는 함수
function makeFullBinaryTree(binary) {
  let len = binary.length;
  let h = 1;

  while ((1 << h) - 1 < len) h++;

  const full_len = (1 << h) - 1;
  return binary.padStart(full_len, "0");
}

// 재귀를 이용한 트리 검증 함수
function isValidTree(binary) {
  const mid = Math.floor(binary.length / 2);
  const root = binary[mid];

  if (binary.length === 1) return true;

  const left = binary.slice(0, mid);
  const right = binary.slice(mid + 1);

  if (root === "0") {
    if (left.includes("1") || right.includes("1")) return false;
  }

  return isValidTree(left) && isValidTree(right);
}

function solution(numbers) {
  const answer = [];

  for (const num of numbers) {
    const binary = num.toString(2);
    const full_binary = makeFullBinaryTree(binary);
    answer.push(isValidTree(full_binary) ? 1 : 0);
  }

  return answer;
}

console.log(solution([7, 42, 5])); // [1, 1, 0]
console.log(solution([63, 111, 95])); // [1, 1, 0]
