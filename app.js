
const task = document.querySelector("#task");
const listofelemennt = document.querySelector("#listOfElement");
const addtask = document.querySelector("#add-task");

"strict mode";

let data = JSON.parse(localStorage.getItem("data"));
console.log(data)
if(!data){
    data=[];
}else{
    showTaskList(data)
}
function add() {
    if (task.value === "") {
        return;
    } else {

        let newEle = { item: "", status: "pending" };
        newEle.item = task.value;
        data.push(newEle);
        console.log(data);
        showTaskList(data);
        task.value = "";
        
    }
    
}

function showTaskList(output = []) {
    localStorage.setItem("data",JSON.stringify(data))
    let allEle = document.createElement("div");

    for (let i = 0; i < output.length; i++) {
        let ele = document.createElement("div");
        ele.className = "task-list";

        let taskNameEle = document.createElement("div");
        taskNameEle.className = "task-child";
        taskNameEle.appendChild(document.createTextNode(output[i].item));

        ele.appendChild(taskNameEle);

        let statusChildEle = document.createElement("div");
        statusChildEle.className = "status-child";

        let statusEle = document.createElement("span");
        statusEle.className = output[i].status;
        statusEle.appendChild(document.createTextNode(output[i].status));

        statusChildEle.appendChild(statusEle);

        let button1 = "";
        if (output[i].status == "pending") {
            button1 = document.createElement("button");
            button1.textContent = "Completed";
            button1.className = "buttons"
            button1.addEventListener("click", function () {
                console.log(i);
                completeTask(i);
            });
        }
        output[i].status == "pending" && statusChildEle.appendChild(button1);

        let button2 = document.createElement("i");
        button2.innerHTML = `<i class="fa-solid fa-x"></i>`
        button2.addEventListener("click", function () {
            console.log(i);
            deleteTask(i);
        });

        statusChildEle.appendChild(button2);
        ele.appendChild(statusChildEle);

        allEle.appendChild(ele);
    }

    listofelemennt.textContent = "";
    listofelemennt.appendChild(allEle);
}

function completeTask(i) {
    data[i].status = "complete";
    console.log(data[i]);
    showTaskList(data);
}

function deleteTask(i) {
    data.splice(i, 1);
    showTaskList(data);
}

function filterTaskList(status) {
    return function () {
        let output = data.filter(function (x) {
            return status == "all" || x.status == status;
        });
        console.log(output);
        showTaskList(output);
        if (status == "pending") {
            document.querySelector(".all-list").classList.remove('active');
            document.querySelector(".pending-list").classList.add('active');
            document.querySelector(".complete-list").classList.remove('active');

        } else if (status == "complete") {
            document.querySelector(".all-list").classList.remove('active');
            document.querySelector(".pending-list").classList.remove('active');
            document.querySelector(".complete-list").classList.add('active');
        }
        else {
            document.querySelector(".all-list").classList.add('active');
            document.querySelector(".pending-list").classList.remove('active');
            document.querySelector(".complete-list").classList.remove('active');
        }
    };
}
addtask.addEventListener("click", add);


// saving todos to local storage
// function saveToLocalSd(todo) {
//     // check if task is already there or not
//     let todos = JSON.parse(localStorage.getItem("todos"));
//     if (!todos) {
//         todos = [];
//     }
//     todos.push(todo);
//     localStorage.setItem("todos", JSON.stringify(todos));
//     console.log(todos)
//     showTaskList(todos);
// }
