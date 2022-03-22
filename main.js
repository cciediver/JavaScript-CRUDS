// Calling Inputs

let title = document.getElementById('prtitle');
let price = document.getElementById('price');
let taxs = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('titlesearch');


let mood = "Create ";  
let temp;  // will act as temp glopal variable 

// console.log(title,price,taxs,ads,discount , total,count,category);




// Get Total - Function

function getTotal(){

    // console.log('Working ...');
    if(price.value !=''){
        let result = (+price.value + +taxs.value + +ads.value) - +discount.value;  // it is consider input as string and to solve the issue add +
        total.innerHTML = result;
        total.style.background = 'green';
    } else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}


// Creat New Product - Function 

let datapro ;

if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product);
    
} else{
    datapro = [];
}

submit.onclick=function(){
    let productData ={
        title: title.value.toLowerCase(),
        price: price.value,
        taxs: taxs.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
}

if(title.value !=''
&& price.value !=''
&& count.value < 100
&& category.value ){
if(mood === 'Create'){
    if(productData.count > 1){
        for(i=0 ; i<productData.count; i++){
            datapro.push(productData);
        }
    } else {
        datapro.push(productData);
    }
} else {
    datapro[temp] = productData;
    mood = 'Create';
    submit.innerHTML='Create';
    count.style.display = 'block';

}
clearData();
}

localStorage.setItem('product' , JSON.stringify(datapro));


datashow();
// console.log(datapro);
}

// Save Data to Local Storage - Function
// Clear Inputs Data - Function

function clearData(){

    title.value = '';
    price.value = '';
    taxs.value ='';
    ads.value ='';
    discount.value = '';
    total.innerHTML = '';
    count.value='';
    category.value ='';
}
// Read Data and show it - Function 

function datashow(){
    let table = '';
    for(i=0; i<datapro.length ; i++){

        table += `
            <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxs}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td> 
                <td><button onclick="dataUpdate(${i})">Update </button></td> 
                <td><button onclick="elementDelete(${i})">Delete</button> </td>
                  
            </tr>
        `
      
    }

    document.getElementById('tbody').innerHTML = table;

    // Checking if array is not empty 

    let btndelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
        btndelete.innerHTML = ` <button > Delete All (${datapro.length}) </button>`; // if yes , will create button
    }else{
        btndelete.innerHTML = '';
    }
    getTotal();
 

}

datashow();


// Multi Creation data - Function 


// Update Product - Function
function dataUpdate(i){
    console.log(i);
    title.value =datapro[i].title ;
    price.value = datapro[i].price;
    taxs.value = datapro[i].taxs;
    ads.value =datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display ='none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = "Update";
    temp = i;
    scroll({
        top:0,
        behavior: "smooth",
    });

}
// Delete Product - Function

function elementDelete(x){
    
    datapro.splice(x,1);
    localStorage.product = JSON.stringify(datapro);
    datashow();
    console.log(x);

}


// Delete All Items

function deletAll(){
   localStorage.clear(); 
   datapro.splice(0); // will delete all if I didn't detrmine the end 
   datashow();


}
// Search Product - Function 

let searchMood = 'title';

function getsearchMood(id){

  

    if(id == 'bytitle'){

        searchMood = 'title';
        // search.placeholder = 'Search By Title'; // To enhance code will use one line for both 

    } else{

        searchMood ='category';
        // search.placeholder = 'Search By Category'; // To enhance code will use one line for both 

    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    datashow();
    

    // console.log(id);
    // console.log(searchMood);
}



function dataSearch(value){
    
    let table ='';

    for(let i=0 ; i<datapro.length;i++){
    if(searchMood == 'title'){

        // for(let i=0 ; i<datapro.length;i++){   // To enhance code will use one line for both 
            if(datapro[i].title.includes(value.toLowerCase())){

                table += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxs}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td> 
                <td><button onclick="dataUpdate(${i})">Update </button></td> 
                <td><button onclick="elementDelete(${i})">Delete</button> </td>
                  
            </tr>
        `
            }
           
        // }




    }else{

        // for(let i=0 ; i<datapro.length;i++){  // To enhance code will use one line for both 
            if(datapro[i].category.includes(value.toLowerCase())){

                table += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxs}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td> 
                <td><button onclick="dataUpdate(${i})">Update </button></td> 
                <td><button onclick="elementDelete(${i})">Delete</button> </td>
                  
            </tr>
        `
            }


        // }


    }
}
        // console.log(value);

        document.getElementById('tbody').innerHTML = table;


}



console.table(dataUpdate);







// Clean Data verify - Function 