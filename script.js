const $tableContainer = document.querySelector('#table_container');

// table 생성
const $table = document.createElement('table');

// thead, tbody
const $thead = document.createElement('thead');
const $tbody = document.createElement('tbody');


// tr, th, td
let $row1 = document.createElement('tr');
const $thFirst = document.createElement('th');
$thFirst.textContent = '';
let $thA = document.createElement('th');
$thA.textContent = 'A';
$thA.classList.add('col1');
let $thB = document.createElement('th');
$thB.textContent = 'B';
$thB.classList.add('col2');
let $thC = document.createElement('th');
$thC.textContent = 'C';
$thC.classList.add('col3');
let $thD = document.createElement('th');
$thD.textContent = 'D';
$thD.classList.add('col4');
let $thE = document.createElement('th');
$thE.textContent = 'E';
$thE.classList.add('col5');
let $thF = document.createElement('th');
$thF.textContent = 'F';
$thF.classList.add('col6');
let $thG = document.createElement('th');
$thG.textContent = 'G';
$thG.classList.add('col7');
let $thH = document.createElement('th');
$thH.textContent = 'H';
$thH.classList.add('col8');
let $thI = document.createElement('th');
$thI.textContent = 'I';
$thI.classList.add('col9');

$row1.appendChild($thFirst);
$row1.appendChild($thA);
$row1.appendChild($thB);
$row1.appendChild($thC);
$row1.appendChild($thD);
$row1.appendChild($thE);
$row1.appendChild($thF);
$row1.appendChild($thG);
$row1.appendChild($thH);
$row1.appendChild($thI);

$thead.appendChild($row1);

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

    const $tdInput = document.createElement('input')
    $td.addEventListener('click', () => {
      // i 번째 행, A 번째 열 focus 처리
      
      // console.log(i, j, clickedRow, clickedCol);
      // 이전의 r, c -> focus 취소
      const $prevClickedRow = document.querySelector(`.row${clickedRow}`);
      if (clickedRow !== 0) $prevClickedRow.classList.remove('focus');
      // console.log($prevClickedRow);

      const $prevClickedCol = document.querySelector(`.col${clickedCol}`);
      if (clickedCol !== 0) $prevClickedCol.classList.remove('focus');
      // console.log($prevClickedCol);

      // i 번째 열 들고오기
      const $clickedRow = document.querySelector(`.row${i}`);
      $clickedRow.classList.add('focus');
      
      const $clickedCol = document.querySelector(`.col${j}`)
      $clickedCol.classList.add('focus');

      clickedRow = i;
      clickedCol = j;

      // 상단 cell text 바꾸기
      const $cellText = document.querySelector('#cell');
      // console.log($cellText);

      const colName = $clickedCol.textContent;
      // console.log(colName);
      $cellText.textContent = `Cell: ${colName}${i}`

    })
    $td.append($tdInput);

    $row.appendChild($td);

  }

  $tbody.appendChild($row);
}


$table.appendChild($thead);
$table.appendChild($tbody);
$tableContainer.appendChild($table);
