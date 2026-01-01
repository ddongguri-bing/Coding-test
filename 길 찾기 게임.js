// 이진 트리 삽입 함수
function insert(parent, child) {
  if (child.x < parent.x) {
    if (!parent.left) parent.left = child;
    else insert(parent.left, child);
  } else {
    if (!parent.right) parent.right = child;
    else insert(parent.right, child);
  }
}

function solution(nodeinfo) {
  // 노드에 번호를 붙이고 노드 구조 정리
  const nodes = nodeinfo.map(([x, y], i) => ({
    x,
    y,
    index: i + 1,
    left: null,
    right: null,
  }));

  // 정렬
  nodes.sort((a, b) => {
    if (b.y !== a.y) return b.y - a.y;
    return a.x - b.x;
  });

  // 루트 노드 설정
  const root_node = nodes[0];

  // 노드들을 트리에 삽입
  for (let i = 1; i < nodes.length; i++) {
    insert(root_node, nodes[i]);
  }

  // 전위순회 / 후위순회 결과를 저장할 배열
  const preorder_result = [];
  const postorder_result = [];

  // 전위순회 함수
  const preorder = (node) => {
    if (!node) return;
    preorder_result.push(node.index);
    preorder(node.left);
    preorder(node.right);
  };

  // 후위순회 함수
  const postorder = (node) => {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    postorder_result.push(node.index);
  };

  // 전위순회 / 후위순회 실행
  preorder(root_node);
  postorder(root_node);

  // 결과 반환
  return [preorder_result, postorder_result];
}

console.log(
  solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
  ])
); // [[7,4,6,9,1,8,5,2,3],[9,6,5,8,1,4,3,2,7]]
