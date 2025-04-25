// 명령어가 매개변수 dirs로 주어질 때, 게임 캐릭터가 처음 걸어본 길의 길이를 구하여 return 하는 solution 함수를 완성해 주세요.

// 문제에서 주어진 좌표평면을 벗어나는지 확인
const isValid = (nx, ny) => {
  return nx >= -5 && nx <= 5 && ny >= -5 && ny <= 5;
};

// 명령어를 통한 좌표 이동
const moveLocation = (x, y, dir) => {
  switch (dir) {
    case "U":
      return [x, y + 1];
    case "D":
      return [x, y - 1];
    case "L":
      return [x - 1, y];
    case "R":
      return [x + 1, y];
  }
};

function solution(dirs) {
  // 초기 좌표 설정
  let x = 0;
  let y = 0;

  // 중복된 경로(좌표)를 없애기 위해 Set 객체 생성
  const visited = new Set();

  // 각 명령어를 반복
  for (const dir of dirs) {
    // 좌표 이동 함수를 통해 새로운 좌표를 받아옴
    let [nx, ny] = moveLocation(x, y, dir);

    // 만약 이동한 좌표가 주어진 좌표평면을 벗어난다면 해당 좌표는 무시
    if (!isValid(nx, ny)) continue;

    // 이동한 경로를 Set 객체에 추가(x, y에서 nx, ny)
    // 단, 좌표 이동에는 방향성이 없기 때문에 (x ,y) -> (nx, ny) | (nx, ny) -> (x, y) 둘 다 Set 객체에 추가
    visited.add(`${x}${y}${nx}${ny}`);
    visited.add(`${nx}${ny}${x}${y}`);

    // 처음 좌표를 이동한 좌표로 변경(구조 분해 할당)
    [x, y] = [nx, ny];
  }

  // (x ,y) -> (nx, ny) | (nx, ny) -> (x, y)는 같은 경로이므로 2로 나누어 출력
  return visited.size / 2;
}

console.log(solution("ULURRDLLU")); // 7
console.log(solution("LULLLLLLU")); // 7
