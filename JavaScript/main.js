let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let tbody = document.getElementById("tbody");

let mood = 'Create';
let tmp;

// Get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#219EBC";
    } else {
        total.innerHTML = '';
        total.style.background = "#8ECAE6";
    }
}

// Initialize or load dataPro
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

// Create product
create.onclick = function (event) {
    event.preventDefault();  // Prevent form submission and page reload
    
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };
    if(mood == 'Create'){
        if(newPro.count > 1){
            for(let i = 0 ; i < newPro.count ; i++){
                dataPro.push(newPro);
            };
        }else{
            dataPro.push(newPro);
        };
    } else{
        dataPro[tmp] = newPro;
        mood = 'Create';
        create.innerHTML = "صـنــع";
        count.style.display = "inline-block";
    };
    
    
    // Save to localStorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    
    clearData();
    showData();
}

// Clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    if (total.innerHTML == '') {
        total.style.backgroundColor = "#8ECAE6";
    }
}

// Read and display data
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
        </tr>`;
    }
    tbody.innerHTML = table;
    
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">حذف الكل (${dataPro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
    getTotal();
}

showData();

// Delete a single product
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// Delete all products
function deleteAll() {
    localStorage.clear();
    dataPro = [];  // Reset dataPro to an empty array
    showData();
}

// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataPro[i].category;
    create.innerHTML = "تـحــديـث"
    mood = 'تـحــديـث'
    tmp = i;
    scroll({
        top:0
    });
    // create.innerHTML = "Update";

};

// search
let searchMood = "title";
function getSearchMood(id){
    let search = document.getElementById("search");
    if(id == "searchTitle"){
        searchMood = "title";
        search.setAttribute("placeholder","البحث بالعنوان");
    }else{
        searchMood = "category";
        search.setAttribute("placeholder","البحث بالصنف");
    };
    search.focus();
};

function searchData(value){

    let table = '';
    if (searchMood == "title"){
        for(let i = 0; i < dataPro.length;i++){
            if(dataPro[i].title.includes(value)){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
                    </tr>`; 
            };
        }
    }else{
        for(let i = 0; i < dataPro.length;i++){
            if(dataPro[i].category.includes(value)){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
                    </tr>`; 
            };
        }
    }
    tbody.innerHTML = table;
}