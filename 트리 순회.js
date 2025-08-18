// 전위 순회
function preorder(nodes, idx) {
  if (idx < nodes.length) {
    // 제일 먼저 root node를 출력
    let preorderReturn = `${nodes[idx]} `;
    // 재귀함수를 통해 왼쪽 트리를 출력한 뒤, 오른쪽 트리를 출력
    preorderReturn += preorder(nodes, idx * 2 + 1);
    preorderReturn += preorder(nodes, idx * 2 + 2);
    return preorderReturn;
  }

  // idx >= nodes.length일 때는 빈 문자열 반환
  return "";
}

// 중위 순회
function inorder(nodes, idx) {
  if (idx < nodes.length) {
    let inorderReturn = inorder(nodes, idx * 2 + 1);
    inorderReturn += `${nodes[idx]} `;
    inorderReturn += inorder(nodes, idx * 2 + 2);
    return inorderReturn;
  }

  return "";
}

// 후위 순회
function postorder(nodes, idx) {
  if (idx < nodes.length) {
    let postorderReturn = postorder(nodes, idx * 2 + 1);
    postorderReturn += postorder(nodes, idx * 2 + 2);
    postorderReturn += `${nodes[idx]} `;
    return postorderReturn;
  }

  return "";
}

function solution(nodes) {
  return [
    preorder(nodes, 0).slice(0, -1),
    inorder(nodes, 0).slice(0, -1),
    postorder(nodes, 0).slice(0, -1),
  ];
}

console.log(solution([1, 2, 3, 4, 5, 6, 7]));
// ['1 2 4 5 3 6 7', '4 2 5 1 6 3 7', 4 5 2 6 7 3 1']
