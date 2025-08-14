// 문제 설명
// 스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다.
// 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

// 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
// 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
// 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
// 노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때,
// 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

function solution(genres, plays) {
  let answer = [];
  // 장르별 노래의 고유번호와 재생 횟수를 저장할 오브젝트
  const genresObj = {};
  // 장르별 누적 재생 횟수를 저장할 오브젝트
  const playsObj = {};

  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i];
    let play = plays[i];

    if (!(genre in genresObj)) {
      genresObj[genre] = [];
      playsObj[genre] = 0;
    }

    genresObj[genre].push([i, play]);
    playsObj[genre] += play;
    // 위 과정을 반복하면 아래처럼 오브젝트가 완성
    // genresObj -> { classic : [[0, 500], [2, 150], [3, 800]], pop : [[1, 600], [4, 2500]] }
    // playsObj -> { classic : 1450, pop : 3100 }
  }

  // 장르별 누적 재생 횟수가 저장되어 있는 playsObj의 key 값으로 누적 재생 횟수를 > 내림차순 정렬 <
  // 정렬을 완료하면 누적 재생 횟수가 많은 장르 -> 누적 재생 횟수가 적은 장르 순서로 정렬이 완료
  let sortedGenres = Object.keys(playsObj).sort((a, b) => {
    return playsObj[b] - playsObj[a];
  });

  for (const genre of sortedGenres) {
    // 누적 재생 횟수가 많은 장르부터 해당 장르에 삽입된 노래들을 정렬
    let sortedSongs = genresObj[genre].sort((a, b) => {
      // 만약 노래 재생 횟수가 같다면 고유번호가 낮은 순, 즉 오름차순 정렬 | 다르다면 재생 횟수가 많은 순, 즉 내림차순 정렬
      return a[1] === b[1] ? a[0] - b[0] : b[1] - a[1];
    });

    // 정렬을 완료하면, 아래와 같이 sortedSongs 배열이 완성
    // sortedSongs(pop) -> [[4, 2500], [1, 600]] | sortedSongs(classic) -> [[3, 800], [0, 500], [2, 150]]
    // 해당 배열에서 상위 두 개의 배열만 slice 하여 고유 번호만 answer에 push
    answer.push(...sortedSongs.slice(0, 2).map((song) => song[0]));
  }

  return answer;
}

console.log(
  solution(
    ["classic", "pop", "classic", "classic", "pop"],
    [500, 600, 150, 800, 2500]
  )
); // [4, 1, 3, 0]
