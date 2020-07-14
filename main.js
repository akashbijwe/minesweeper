let grid = $("#grid");
ROWS = 10;
COLUMNS = 10;
createGrid(ROWS, COLUMNS);
var clickAudio = document.getElementById("click");
var endAudio = document.getElementById("end");
var gotitAudio = document.getElementById("gotitAudio");

function createGrid(rows, columns) {
  grid.empty();
  for (let i = 0; i < rows; i++) {
    let newRow = $('<div>').addClass('row');
    for (let j = 0; j < columns; j++) {
      let newCol = $('<div>')
        .addClass('col hide')
        .attr('data-row', i)
        .attr('data-col', j);

      if (Math.random() < 0.1) {
        newCol.removeClass('hide').addClass('mine');
      }
      newRow.append(newCol);
    }
    grid.append(newRow);
  }
}

function gameOver(flag) {
  if (flag) {
    $(".result").fadeIn().text("You won!");
  } else {
    $(".result").fadeIn().text("You lost!");
  }
  setTimeout(function () {
    $(".result").hide();
  }, 2000);
  createGrid(ROWS, COLUMNS);
}

function openBlock(row, col) {
  console.log(row, col);
  let count = 0;
  let seenMine = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // if (i >= ROWS || j >= COLUMNS || j < 0 || i < 0) continue;
      // console.log($(".col[data-row=" + (row + i) + "][data-col=" + (col + j) + "]"));

      if ($(".col[data-row=" + (row + i) + "][data-col=" + (col + j) + "]").hasClass('mine')) {
        count++;
        seenMine.push(row + i, col + j);
      }
    }
  }


  count == 0 ? count = undefined : count = count;
  $(".col.hide[data-row=" + row + "][data-col=" + col + "]").removeClass('hide').text(count);
  if (count > 0) {
    gotitAudio.play();
  } else {
    clickAudio.play();
  }
  if (!$(grid).is(':has(.hide)')) {
    gameOver(true);
    createGrid(ROWS, COLUMNS);
  }

}


$(grid).on("click", '.col', function () {
  if ($(this).hasClass('mine')) {
    $('.mine').addClass('visiblemine');
    setTimeout(function () {
      gameOver(false);
      endAudio.play();
    }, 100);
  }
  else {
    openBlock($(this).data('row'), $(this).data('col'))
  }
})