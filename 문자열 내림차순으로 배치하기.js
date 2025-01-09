// 문제 설명
// 문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.
// s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.

// 제한 사항
// str은 길이 1 이상인 문자열입니다.

// 과거 풀이
// function solution(s) {
//   const alphabetString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

//   let tempArray = [];
//   let answer = "";

//   for (let str of s) {
//     for (let i = 0; i < alphabetString.length; i++) {
//       if (str === alphabetString[i]) {
//         tempArray.push(i);
//       }
//     }
//   }

//   for (let i = 0; i < tempArray.length; i++) {
//     for (let j = 0; j < tempArray.length; j++) {
//       if (tempArray[j] < tempArray[j + 1]) {
//         let temp = tempArray[j];
//         tempArray[j] = tempArray[j + 1];
//         tempArray[j + 1] = temp;
//       }
//     }
//   }

//   for (let num of tempArray) {
//     for (let i = 0; i < alphabetString.length; i++) {
//       if (num === i) {
//         answer += alphabetString[i];
//       }
//     }
//   }

//   return answer;
// }

function solution(s) {
  return s
    .split("")
    .map((char) => char.codePointAt(0))
    .sort((a, b) => b - a)
    .map((num) => String.fromCodePoint(num))
    .join("");

  // 남의 풀이
  // 문자열은 기본적으로 이터러블 객체이기 때문에 각 문자 하나하나가 개별 요소로 배열에 담김
  // 이터러블 객체 -> 반복이 가능한 객체
  // 공백이 없는 문자열의 경우 split('')과 같은 결과를 출력
  // return [...s]
  //   .map((char) => char.codePointAt(0))
  //   .sort((a, b) => b - a)
  //   .map((num) => String.fromCodePoint(num))
  //   .join("");
}

console.log(solution("Zbcdefg")); // gfedcbZ
