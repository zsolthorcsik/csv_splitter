// shared/js/common.js

function addToDataList(item, listId, dataList) {
    let list = document.getElementById(listId);
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerText = item;
    list.appendChild(listItem);
    dataList.push(item);
}
