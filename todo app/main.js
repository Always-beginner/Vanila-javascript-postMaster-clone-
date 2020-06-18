// todo list example 

let addTaskInput = document.getElementById('addtaskinput');
let addTaskBtn = document.getElementById('addtaskbtn');
let deleteAll = document.getElementById('deleteallbtn');
addTaskBtn.addEventListener('click', addTaskEvent);
fetchData();
function addTaskEvent() {
    addTaskInputValue = addTaskInput.value;
    if (addTaskInputValue != '') {
        let webTask = localStorage.getItem('todoList');
        if (webTask == null) {
            taskObj = [];
        }
        else {
            taskObj = JSON.parse(webTask);
        }
        taskObj.push(addTaskInputValue);

        localStorage.setItem('todoList', JSON.stringify(taskObj));
        fetchData();
        // $('#success').alert()

    }
    else {
        // $('#failure').show();
    }
}
function fetchData() {
    let data = localStorage.getItem('todoList');
    let showData = document.getElementById('addedtasklist');
    let html = '';

    JSON.parse(data).forEach((item, index) => {
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${item}</td>
                    <td><button type="button" onclick="editTask(${index})"   class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" onclick="deleteTask(${index})"  class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });
    showData.innerHTML = html;
    addTaskInput.value = '';
}
function editTask(index) {

    deleteAll.disabled = true;
    let data = localStorage.getItem('todoList');
    let textObj = JSON.parse(data)
    addTaskInput.value = textObj[index];
    let saveTaskBtn = document.getElementById('savetaskbtn');
    let saveIndex = document.getElementById('saveindex');
    saveIndex.value = index;
    addTaskBtn.style.display = 'none';
    saveTaskBtn.style.display = 'block';
}

let saveTaskBtn = document.getElementById('savetaskbtn');
saveTaskBtn.addEventListener('click', saveTaskEvent)

function saveTaskEvent() {
    let data = localStorage.getItem('todoList');
    let textObj = JSON.parse(data)
    let saveIndex = document.getElementById('saveindex').value;
    textObj[saveIndex] = addTaskInput.value;
    localStorage.setItem('todoList', JSON.stringify(textObj));
    fetchData();
    addTaskBtn.style.display = 'block';
    saveTaskBtn.style.display = 'none';
    addTaskInput.value = '';
    deleteAll.disabled = false;
}


function deleteTask(index) {
    let data = localStorage.getItem('todoList');
    let textObj = JSON.parse(data);
    textObj.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(textObj));
    fetchData();
}
deleteAll.addEventListener('click', deleteAllEvent)

function deleteAllEvent() {
    let webTask = localStorage.getItem('todoList');
    if (webTask == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(webTask);
        taskObj = [];
        localStorage.setItem("todoList", JSON.stringify(taskObj));
        // addTaskBtn.style.display = 'block';
        // saveTaskBtn.style.display = 'none';
        fetchData();
    }
    // localStorage.clear();
    // fetchData();
}
let searchTextBox = document.getElementById('searchtextbox');

searchTextBox.addEventListener('input', searchTextEvent);

function searchTextEvent() {
    let trList = document.querySelectorAll('tr');
    Array.from(trList).forEach((item)=>{
        let searchText = item.getElementsByTagName('td')[0].innerText;
        let searchTextBoxVal = searchTextBox.value;
        let re = new RegExp(searchTextBoxVal,'gi');
        if(searchText.match(re)){
            item.style.display = 'table-row';
        }
        else{
            item.style.display = 'none';
        }
    })
}