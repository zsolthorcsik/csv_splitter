// text_splitter/app.js

let originalData = [];
let leftData = [];
let rightData = [];

document.getElementById('textList').addEventListener('input', function() {
    const list = document.getElementById('textList').value;
    originalData = list.split(',').map(item => item.trim());
    populateOriginalList();
});

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

// Use this method from the shared/js/common.js file
function addToDataList(item, listId, dataList) {
    let list = document.getElementById(listId);
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerText = item;
    list.appendChild(listItem);
    dataList.push(item);
}

document.getElementById('swipeRight').addEventListener('click', function() {
    let item = originalData.shift();
    addToDataList(item, 'rightList', rightData);
    populateOriginalList();
});

document.getElementById('swipeLeft').addEventListener('click', function() {
    let item = originalData.shift();
    addToDataList(item, 'leftList', leftData);
    populateOriginalList();
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

// Add keyboard controls
document.body.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight') {
        document.getElementById('swipeRight').click();
    }
    if (e.key === 'ArrowLeft') {
        document.getElementById('swipeLeft').click();
    }
});
