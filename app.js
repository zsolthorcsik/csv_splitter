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

function populateOriginalList() {
    let list = document.getElementById('originalList');
    list.innerHTML = '';
    originalData.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerText = item;

        let hammerHandler = new Hammer(listItem);

        hammerHandler.on('panmove', function(e) {
            let percentage = Math.min(Math.max(e.deltaX / window.innerWidth, -0.5), 0.5);
            if (percentage < 0) {
                listItem.style.backgroundColor = `rgba(0, 123, 255, ${Math.abs(percentage * 2)})`; // Bootstrap primary color
            } else {
                listItem.style.backgroundColor = `rgba(0, 123, 255, ${percentage * 2})`; // Bootstrap primary color
            }
        });

        hammerHandler.on('swipeleft', function() {
            addToDataList(item, 'leftList', leftData);
            listItem.remove();
        });

        hammerHandler.on('swiperight', function() {
            addToDataList(item, 'rightList', rightData);
            listItem.remove();
        });

        list.appendChild(listItem);
    });
    document.getElementById('selectionArea').style.display = 'flex';
}

function addToDataList(item, listId, data) {
    data.push(item);
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerText = item;
    document.getElementById(listId).appendChild(listItem);
}

document.getElementById('downloadLeft').addEventListener('click', function() {
    downloadCSV(leftData, 'left.csv');
});

document.getElementById('downloadRight').addEventListener('click', function() {
    downloadCSV(rightData, 'right.csv');
});

function downloadCSV(data, filename) {
    let csvContent = data.join('\n');
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

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

