const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName'); 
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// elemanları yükleme
loadItems();

// kayıt ettiklerimin hepsini çağırıyorum.
eventListeners();

function eventListeners(){
    // submit event
    form.addEventListener('submit', addNewItem);

    // bir eleman silme
    taskList.addEventListener('click', deleteItem);

    // tüm elemanları silme
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems(){

    items = getItemsFromLS();

    items.forEach(function(item){
        createItem(item);
    });
}

// local storage dan eleman çekme
function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// local storage a eleman ekleme
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items)); // köşeli parantezler ile ekledim.
}

// local storage dan eleman silme
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item, index){
        if(item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text){
     // li tag ini oluşturdum.
     const li = document.createElement('li');
     li.className = 'list-group-item list-group-item-secondary';
     li.appendChild(document.createTextNode(text));

     // a tag ini oluşturdum.
     const a = document.createElement('a');
     a.classList = 'delete-item float-right';
     a.setAttribute('href', '#');
     a.innerHTML = '<i class = "fas fa-times"></i>';

     // li ile a tag ini ilişkilendirdim.
     li.appendChild(a);

     // ul ile li tag ini ilişkilendirdim.
     taskList.appendChild(li);
}

// eleman ekleme
function addNewItem(e){
    if(input.value === ''){
        alert('Lütfen içerik giriniz.');
    }else{

        // eleman yaratma
        createItem(input.value);

        // local storage a kaydetme
        setItemToLS(input.value);

        // input girdikten sonra kutunun içindeki alanı boşalttım.
        input.value = '';
    }

    e.preventDefault();
}

// eleman silme
function deleteItem(e){
    if(e.target.className === 'fas fa-times'){
        if(confirm('Emin misiniz?')){    
            e.target.parentElement.parentElement.remove();

            // local storage dan silme
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    

    e.preventDefault();
}

// tüm elemanları silme
function deleteAllItems(e){
   if(confirm('Emin misiniz?')){
     taskList.innerHTML = ''; // listedekilerin hepsini boş içeriğe eşitleyeceği için hepsini silmiş olur.

     while(taskList.firstChild){
         taskList.removeChild(taskList.firstChild);
     }

    localStorage.clear();
   }

    e.preventDefault();
}