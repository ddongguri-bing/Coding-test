// 지도개발팀에서 근무하는 제이지는 지도에서 도시 이름을 검색하면 해당 도시와 관련된 맛집 게시물들을 데이터베이스에서 읽어 보여주는 서비스를 개발하고 있다.
// 이 프로그램의 테스팅 업무를 담당하고 있는 어피치는 서비스를 오픈하기 전 각 로직에 대한 성능 측정을 수행하였는데,
// 제이지가 작성한 부분 중 데이터베이스에서 게시물을 가져오는 부분의 실행시간이 너무 오래 걸린다는 것을 알게 되었다.
// 어피치는 제이지에게 해당 로직을 개선하라고 닦달하기 시작하였고,
// 제이지는 DB 캐시를 적용하여 성능 개선을 시도하고 있지만 캐시 크기를 얼마로 해야 효율적인지 몰라 난감한 상황이다.

// 어피치에게 시달리는 제이지를 도와, DB 캐시를 적용할 때 캐시 크기에 따른 실행시간 측정 프로그램을 작성하시오.

// 입력 형식
// 캐시 크기(cacheSize)와 도시이름 배열(cities)을 입력받는다.
// cacheSize는 정수이며, 범위는 0 ≦ cacheSize ≦ 30 이다.
// cities는 도시 이름으로 이뤄진 문자열 배열로, 최대 도시 수는 100,000개이다.
// 각 도시 이름은 공백, 숫자, 특수문자 등이 없는 영문자로 구성되며, 대소문자 구분을 하지 않는다.
// 도시 이름은 최대 20자로 이루어져 있다.

// 출력 형식
// 입력된 도시이름 배열을 순서대로 처리할 때, "총 실행시간"을 출력한다.

// 조건
// 캐시 교체 알고리즘은 LRU(Least Recently Used)를 사용한다.
// cache hit일 경우 실행시간은 1이다.
// cache miss일 경우 실행시간은 5이다.

function solution(cacheSize, cities) {
  let queue = [];
  let runtime = 0;

  for (let i = 0; i < cities.length; i++) {
    if (cacheSize === 0) return cities.length * 5;
    const target = cities[i].toLowerCase();
    if (queue.length >= cacheSize) {
      if (queue.includes(target)) {
        queue = queue.filter((el) => el !== target);
        queue.push(target);
        runtime += 1;
      } else {
        queue.shift();
        queue.push(target);
        runtime += 5;
      }
    } else {
      if (queue.includes(target)) {
        queue = queue.filter((el) => el !== target);
        queue.push(target);
        runtime += 1;
      } else {
        queue.push(target);
        runtime += 5;
      }
    }
  }

  return runtime;
}

function refactorSolution(cacheSize, cities) {
  // 만약 cacheSize가 0이라면 바로 cities 길이에 5를 곱하여 반환
  if (cacheSize === 0) return cities.length * 5;

  // cache를 순서를 기억하는 Map으로 선언
  let cache = new Map();
  // 실행시간을 저장할 runtime 변수 선언 및 초기화
  let runtime = 0;

  for (const city of cities) {
    // cities 배열 안에 요소는 대소문자가 섞여있으므로 전부 소문자로 변환
    const target = city.toLowerCase();

    // 만약 cache Map에 타겟 요소가 있다면
    if (cache.has(target)) {
      // cache hit이므로 runtime에 + 1
      runtime += 1;
      // 해당 요소를 삭제(최신화 하기 위함)
      cache.delete(target);
    } else {
      // 만약 cache Map에 타겟 요소가 없다면
      // cache miss이므로 runtime에 + 5
      runtime += 5;

      // 만약 cache Map의 크기가 cacheSize보다 크거나 같다면
      if (cache.size >= cacheSize) {
        // 제일 처음 삽입된 값을 찾아서 삭제
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }
    }

    // cache hit이든 cache miss이든 최근에 사용된 요소를 추가(최신화)
    cache.set(target), true;
  }

  // 총 실행시간 반환
  return runtime;
}

console.log(refactorSolution(2, ["a", "b", "a", "c", "d", "a"])); // 22
console.log(
  refactorSolution(3, [
    "Jeju",
    "Pangyo",
    "Seoul",
    "NewYork",
    "LA",
    "Jeju",
    "Pangyo",
    "Seoul",
    "NewYork",
    "LA",
  ])
); // 50
console.log(
  solution(3, [
    "Jeju",
    "Pangyo",
    "Seoul",
    "Jeju",
    "Pangyo",
    "Seoul",
    "Jeju",
    "Pangyo",
    "Seoul",
  ])
); // 21
console.log(
  solution(2, [
    "Jeju",
    "Pangyo",
    "Seoul",
    "NewYork",
    "LA",
    "SanFrancisco",
    "Seoul",
    "Rome",
    "Paris",
    "Jeju",
    "NewYork",
    "Rome",
  ])
); // 60
console.log(
  solution(5, [
    "Jeju",
    "Pangyo",
    "Seoul",
    "NewYork",
    "LA",
    "SanFrancisco",
    "Seoul",
    "Rome",
    "Paris",
    "Jeju",
    "NewYork",
    "Rome",
  ])
); // 52
console.log(solution(2, ["Jeju", "Pangyo", "NewYork", "newyork"])); // 16
console.log(solution(0, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA"])); // 25
