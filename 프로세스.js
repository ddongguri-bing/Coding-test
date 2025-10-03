// 문제 설명
// 운영체제의 역할 중 하나는 컴퓨터 시스템의 자원을 효율적으로 관리하는 것입니다.
// 이 문제에서는 운영체제가 다음 규칙에 따라 프로세스를 관리할 경우 특정 프로세스가 몇 번째로 실행되는지 알아내면 됩니다.

// 1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
// 2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
// 3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
//   3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다.
// 예를 들어 프로세스 4개 [A, B, C, D]가 순서대로 실행 대기 큐에 들어있고, 우선순위가 [2, 1, 3, 2]라면 [C, D, A, B] 순으로 실행하게 됩니다.

// 현재 실행 대기 큐(Queue)에 있는 프로세스의 중요도가 순서대로 담긴 배열 priorities와,
// 몇 번째로 실행되는지 알고싶은 프로세스의 위치를 알려주는 location이 매개변수로 주어질 때,
// 해당 프로세스가 몇 번째로 실행되는지 return 하도록 solution 함수를 작성해주세요.

// function solution(priorities, location) {
//   // 프로세스를 담을 queue
//   const queue = [];
//   // 프로세스의 인덱스와 우선순위를 담을 processOrder
//   let processOrder = {};

//   // 우선순위 배열을 돌면서 인덱스를 key로 하고, 우선순위 배열의 요소들을 객체에 저장
//   for (let i = 0; i < priorities.length; i++) {
//     processOrder[i] = priorities[i];
//   }

//   // 우선순위 객체를 배열로 변환한 뒤
//   const processOrderArray = Object.entries(processOrder);

//   // 해당 배열을 순환하면서 queue에 삽입
//   for (const array of processOrderArray) {
//     queue.push(array);
//   }

//   // loction에 위치하는 프로세스가 몇 번째로 실행되는지 담을 nth 변수
//   let nth = 0;

//   // queue의 길이가 0이 될 때까지 반복하면서
//   while (queue.length > 0) {
//     // 만약 우선순위가 가장 높은 프로세스가 빠져나갔을 때를 대비하여 highPriority를 다시 계산
//     let highPriority = Math.max(...queue.map((element) => element[1]));
//     // queue의 제일 앞 요소를 꺼냄
//     const firstElemnt = queue.shift();

//     // 만약 queue의 제일 앞 요소의 우선순위가 highPriority보다 작다면 다시 queue에 넣고
//     if (firstElemnt[1] < highPriority) {
//       queue.push(firstElemnt);
//     } else {
//       // 제일 앞 요소의 우선순위가 highPrioiry와 같다면 nth(실행된 횟수)를 증가
//       nth++;
//       // 만약 제일 앞 요소의 인덱스가 location과 같다면 nth를 반환
//       if (Number(firstElemnt[0]) === location) return nth;
//     }
//   }
// }

// 조금 더 깔끔하게 코드 수정
function solution(priorities, location) {
  const queue = [];

  for (let i = 0; i < priorities.length; i++) {
    queue.push([i, priorities[i]]);
  }

  let nth = 0;

  while (queue.length > 0) {
    let highPriority = Math.max(...queue.map((element) => element[1]));
    const firstElemnt = queue.shift();

    if (firstElemnt[1] < highPriority) {
      queue.push(firstElemnt);
    } else {
      nth++;
      if (firstElemnt[0] === location) return nth;
    }
  }
}

console.log(solution([2, 1, 3, 2], 2)); // 1
console.log(solution([1, 1, 9, 1, 1, 1], 0)); // 5
