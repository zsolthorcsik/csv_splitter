let originalData = [];
let leftData = [];
let rightData = [];

document.getElementById('csvFile').addEventListener('change', function(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        let contents = e.target.result;
        originalData = contents.split('\n').map(row => row.split(',')[0]);
        populateOriginalList();
    };
    reader.readAsText(file);
});



document.getElementById('downloadLeft').addEventListener('click', function() {
    downloadCSV(leftData, 'left.csv');
});

document.getElementById('downloadRight').addEventListener('click', function() {
    downloadCSV(rightData, 'right.csv');
});



window.addEventListener('keydown', function(e) {
  
  let list = document.getElementById('originalList');
  if (list.childNodes.length === 0) return;
  let currentItem = list.childNodes[0];
  let item = currentItem.innerText;

  if (e.key === 'ArrowLeft') {
      addToDataList(item, 'leftList', leftData);
      currentItem.remove();
  } else if (e.key === 'ArrowRight') {
      addToDataList(item, 'rightList', rightData);
      currentItem.remove();
  }
});

