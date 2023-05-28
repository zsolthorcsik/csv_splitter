// text_splitter/app.js

let originalData = [];
let leftData = [];
let rightData = [];

document.getElementById('textList').addEventListener('input', function() {
    const list = document.getElementById('textList').value;
    originalData = list.split(',').map(item => item.trim());
    populateOriginalList();
});


/*
function populateOriginalList() {
    let list = document.getElementById('originalList');
    list.innerHTML = '';
    originalData.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'draggable');
        listItem.innerText = item;
        list.appendChild(listItem);
    });
    document.getElementById('selectionArea').style.display = 'flex';
}
*/


document.getElementById('downloadLeft').addEventListener('click', function() {
    downloadCSV(leftData, 'left.csv');
});

document.getElementById('downloadRight').addEventListener('click', function() {
    downloadCSV(rightData, 'right.csv');
});




document.getElementById('downloadLeft').addEventListener('click', function() {
    let textFile = new Blob([leftData.join('\n')], { type: 'text/plain' });
    let downloadLink = document.createElement('a');
    downloadLink.download = 'left.txt';
    downloadLink.href = window.URL.createObjectURL(textFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
});

document.getElementById('downloadRight').addEventListener('click', function() {
    let textFile = new Blob([rightData.join('\n')], { type: 'text/plain' });
    let downloadLink = document.createElement('a');
    downloadLink.download = 'right.txt';
    downloadLink.href = window.URL.createObjectURL(textFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
});


window.addEventListener('keydown', function(e) {
    console.log(e.key);
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
  
  