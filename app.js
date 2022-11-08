const display = document.querySelector('#submit');
const add = document.querySelector('#add');
var flag = false;

const getElements = () =>{

    if(flag == false){
        fetch('http://localhost:8002/result')
        .then((response) => response.json())
        .then( (data) => {
            for(let i=0;i<data.length;i++){
                const newDiv = document.createElement("div");
                const name = document.createElement("span");
                const value = document.createElement("span");
    
                name.textContent = `${data[i].id}.  ${data[i].name}`        
                value.textContent = `${data[i].value} PLN`
                name.classList.add('name');
                value.classList.add('value')
                newDiv.classList.add('div');
    
                newDiv.appendChild(name);
                newDiv.appendChild(value);
                const contentSpace = document.querySelector('#content');
                document.body.insertBefore(newDiv,contentSpace);
                flag = true;
            }
        });
        }
}

const addElemet = ()=>{
    const name = document.querySelector('#insertName').value;
    const value = document.querySelector('#insertValue').value;
    var data = {name : name, value : value};
    fetch('http://localhost:8002/add',{
       method:'POST',
       headers:{
           'Content-type':'application/json'
       },
       body: JSON.stringify(data),
    })
}

add.addEventListener('click',addElemet);
display.addEventListener('click',getElements)

