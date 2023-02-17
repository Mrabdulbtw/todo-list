//[{"id": 3456,"content":"hi"}]

function getstorage() {
    return JSON.parse(localStorage.getItem(`value`) || `[]`)

}
getstorage().forEach(element => {

    creatEL(element.id, element.content)
});



function creatEL(id, content) {
    let todolistEl = document.querySelector(`.todolist`)
    let listEl = document.createElement(`li`)
    listEl.className = `list`
    listEl.innerHTML = ` <div class="list-text">${content}</div>
    <ion-icon name="trash-outline" class="remove"></ion-icon>`
    todolistEl.append(listEl)
    const remove = listEl.querySelector(`.remove`)
    remove.addEventListener(`click`, () => {
        deleteing(listEl, id)
    })

}


const addbtnEl = document.querySelector(`.add-btn`)
const textEl = document.querySelector(`.text`)


let textvalue;
addbtnEl.addEventListener(`click`, addf)
function addf() {
    textvalue = textEl.value.trim()
    if (textvalue.length > 0) {
        add()
    }
}


function add() {

    let storge = getstorage()
    let myvalue = {
        id: Math.floor(Math.random() * 100000),
        content: textvalue
    }
    creatEL(myvalue.id, myvalue.content)
    storge.push(myvalue)
    setvalue(storge)
    lengthf()
    textEl.value = ``

}

function setvalue(storge) {
    localStorage.setItem(`value`, JSON.stringify(storge))
}

function deleteing(liEl, id) {

    let storge = getstorage()
    const storageva = storge.filter((data) => data.id !== id)
    setvalue(storageva);
    liEl.remove()
    lengthf()

}


lengthf()

function lengthf() {
    console.log(getstorage().length);
    document.querySelector(`span`).innerHTML = getstorage().length == 0 ? 'no' : getstorage().length
    if (getstorage().length > 0) {
        let todolistEl = document.querySelector(`.todolist`)
        todolistEl.style = `margin-top: 10px;`
    }

}

document.querySelector(`.btn-all`).addEventListener(`click`, deletall)

function deletall() {
    if (getstorage().length > 0) {
        if (confirm(`Are you sure`)) {
            let remove = getstorage().splice()
            console.log(remove);
            setvalue(remove);
            document.querySelector(`.todolist`).innerHTML = ``
            lengthf()
        }
    }
}

document.addEventListener(`keyup`, (e) => {
    if (e.key === 'Enter') {
        addf()
    }
})