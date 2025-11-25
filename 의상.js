function solution(clothes) {
  let clothesMap = new Map();

  for (let [_, type] of clothes) {
    if (clothesMap.has(type))
      clothesMap.set(type, clothesMap.get(type) + 1); // set(key, value)
    else clothesMap.set(type, 1);
  }

  let combination = 1;
  for (let count of clothesMap.values()) {
    // 의상의 개수 + 해당 종류의 의상을 안 입는 경우(1)
    combination *= count + 1;
  }

  return combination - 1; // 1은 모든 것을 안 입는 경우
}

console.log(
  solution([
    ["yellow_hat", "headgear"],
    ["blue_sunglasses", "eyewear"],
    ["green_turban", "headgear"],
  ])
); // 5
console.log(
  solution([
    ["crow_mask", "face"],
    ["blue_sunglasses", "face"],
    ["smoky_makeup", "face"],
  ])
); // 3
