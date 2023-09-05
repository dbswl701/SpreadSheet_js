const $tableContainer = document.querySelector('#table_container');

//다운로드 하이퍼링크에 클릭 이벤트 발생시 saveCSV 함수를 호출하도록 이벤트 리스너를 추가
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('download').addEventListener('click', function(){
    saveCSV('data.csv'); // CSV파일 다운로드 함수 호출
    return false;
  })
});

//CSV 생성 함수
function saveCSV(fileName){
  //CSV 문자열 생성
  let downLink = document.getElementById('download');
  let csv = ''; //CSV최종 문자열을 저장하는 변수
  let rows = document.querySelectorAll("table tr"); // 테이블에서 행 요소들을 모두 선택

  //행단위 루핑
  for (var i = 0; i < rows.length; i++) {
    let cells = rows[i].querySelectorAll("td, th");
    let row = [];
    //행의 셀 값을 배열로 얻기
    cells.forEach(function(cell){
      if (cell.textContent !== '') row.push(cell.textContent);
      // input이 들어있는 내용이라면,
      else row.push(cell.querySelector('input')?.value);
    });
    console.log(i, row.length-1);
    csv += row.join(',') + (i != rows.length-1 ? '\n':''); // 배열을 문자열+줄바꿈으로 변환
  }

  //CSV 파일 저장
  console.log(csv);
  csvFile = new Blob([csv], {type: "text/csv"}); // 생성한 CSV 문자열을 Blob 데이터로 생성
  downLink.href = window.URL.createObjectURL(csvFile); // Blob 데이터를 URL 객체로 감싸 다운로드 하이퍼링크에 붙임.
  downLink.download = fileName; // 인자로 받은 다운로드 파일명을 지정
}

// table 생성
const $table = document.createElement('table');

// thead, tbody
const $thead = document.createElement('thead');
const $tbody = document.createElement('tbody');

// thead tr
const $rowHead = document.createElement('tr');
const $thFirst = document.createElement('th');
$thFirst.textContent = '';
$rowHead.appendChild($thFirst);

// tr td
const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

for (let i = 0; i<9; i++) {
  let $th = document.createElement('th');
  $th.textContent = alpha[i];
  $th.classList.add(`col${i+1}`)
  $rowHead.appendChild($th);
}
$thead.appendChild($rowHead);

// 
let clickedRow=0, clickedCol=0;

for (let i = 1; i <= 9; i++) {
  // tbody
  const $row = document.createElement('tr');

  const $tdFirst = document.createElement('td');
  $tdFirst.textContent = i;
  $tdFirst.classList.add(`first-column`);
  $tdFirst.classList.add(`row${i}`);
  $row.appendChild($tdFirst);

  for (let j = 1; j <= 9; j++) {
    const $td = document.createElement('td');
    $td.classList.add(`col${j}`);
    $td.addEventListener('click', () => {
      // i 번째 행, A 번째 열 focus 처리
      
      // 이전의 r, c -> focus 취소
      const $prevClickedRow = document.querySelector(`.row${clickedRow}`);
      if (clickedRow !== 0) $prevClickedRow.classList.remove('focus');
      const $prevClickedCol = document.querySelector(`.col${clickedCol}`);
      if (clickedCol !== 0) $prevClickedCol.classList.remove('focus');

      // i 번째 열, 행 들고오기
      const $clickedRow = document.querySelector(`.row${i}`);
      $clickedRow.classList.add('focus');
      const $clickedCol = document.querySelector(`.col${j}`)
      $clickedCol.classList.add('focus');

      clickedRow = i; // 이렇게 하면 동작하기는 하는데 왜 동작하는지는 모르겠다. 실행컨텍스트 내용을 더 봐야하나?
      clickedCol = j;

      // 상단 cell text 바꾸기
      const $cellText = document.querySelector('#cell');
      const colName = $clickedCol.textContent;
      $cellText.textContent = `Cell: ${colName}${i}`
    })
    const $tdInput = document.createElement('input'); // 스코프 때문에 const 선언해도 상관없는건 알고있는데 이렇게 선언하는게 효율적인가? 맞나?

    $td.append($tdInput);
    $row.appendChild($td);
  }
  $tbody.appendChild($row);
}

$table.appendChild($thead);
$table.appendChild($tbody);
$tableContainer.appendChild($table);
