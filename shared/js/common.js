// shared/js/common.js

function addToDataList(item, listId, dataList) {
    let list = document.getElementById(listId);
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerText = item;
    list.appendChild(listItem);
    dataList.push(item);
}


/* Function that populates the list that will be split in two.  */
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

// Function to download a CSV file
function downloadCSV(data, filename) {
    let csvContent = data.join('\n');
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Adding element to the selected list
function addToDataList(item, listId, data) {
    data.push(item);
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerText = item;
    document.getElementById(listId).appendChild(listItem);
}