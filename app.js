let currentid = 1002;
const icons = {
    delete: `<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-bookmark-x-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm2.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293 6.854 5.146z"/>
  </svg>`,
    ok: `<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-bookmark-check-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm6.854 5.854a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
</svg>`,
    less: `<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-bookmark-dash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm2 6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"/>
</svg>`
 

}
let tasklist = [];

const entrada = document.querySelector(".entrada");
const taskUlList = document.querySelector(".task-list");


const runOk = ({classN, idN}) => {
    document.querySelector(`#${classN}-${idN}`).style.display = 'none';
    document.querySelector(`#imgl-${idN}`).style.display = 'block';
    document.querySelector(`#txt-${idN}`).style.textDecoration = 'line-through';
};


const runLess = ({classN, idN}) => {
    document.querySelector(`#${classN}-${idN}`).style.display = 'none';
    document.querySelector(`#imgo-${idN}`).style.display = 'block';
    document.querySelector(`#txt-${idN}`).style.textDecoration = 'none';
};


const runDelete = ({classN, idN}) => {
    tasklist = tasklist.filter(({id, taskname}) => id !== Number(idN));
    document.querySelector(`#lis-${idN}`).remove();
    if(tasklist.length < 1) printTask({id:0, taskname:'NO HAY DATOS'});
};


taskUlList.addEventListener('click', e => {
    if (e.target.parentNode && e.target.parentNode.id) 
    {
        const data = {classN: e.target.parentElement.id.slice(0, 4), idN:e.target.parentElement.id.slice(5)};
        switch (data.classN) 
        {
            case 'imgo': return runOk(data);
            case 'imgl': return runLess(data);
            case 'imgd': return runDelete(data);
        }
    }
});

const gettask = ({id,task}) => id==0? `<span class="text-task" id="txt-${id}">${task}</span>`:(`

    <span class="text-task" id="txt-${id}">${task}</span>
    <span class="img" id="imgl-${id}">
        <span class="esc"></span>
        ${icons.less}
    </span>
    <span class="img" id="imgo-${id}">
        <span class="esc" ></span>
        ${icons.ok}
    </span>
    <span class="img" id="imgd-${id}">
       <span class="esc"></span>
        ${icons.delete}
    </span>`);


const printTask = ({id, taskname})=>{
    const el = document.createElement("li");
        el.className = "list-group-item" + ((id === 0 && tasklist.length<1)?' bg-dark text-white': '');
        el.id = `lis-${id}`
        el.innerHTML = gettask({id: id, task: taskname});
        taskUlList.appendChild(el);
};


const saveTask = task => {
        if(tasklist.length<1)taskUlList.innerHTML = "";
        tasklist.push({ id: ++currentid, taskname: task });
        printTask({id: currentid, taskname: task});
};



document.querySelector(".btn-task").addEventListener('click', e => {
    e.preventDefault();
    if (entrada.value && entrada.value.replaceAll(" ", "")) saveTask(entrada.value);
    entrada.value = "";
})


document.addEventListener('DOMContentLoaded', ()=>{
    return (tasklist.forEach((data)=>printTask(data)) ,printTask({id:0,taskname:'NO EXISTEN DATOS'}));
});