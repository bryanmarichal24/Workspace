var productArray =[];

function showListOfProducts(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                        </div>
                        <div>
                        <p>` + product.description + `</p>
                        <h4>` + product.currency +" " + product.cost +`</h4> 
                        </div>
                    </div>
                 </div>
             </div>
             `
        }
    
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){ //funcion general para ordenar
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) //compara si el criterio es igual a "AZ"
    {
        result = array.sort(function(a, b) { //hace un sort de forma ascendente
            if ( a.cost < b.cost ){ return -1; } //a es menor que b
            if ( a.cost > b.cost ){ return 1; } //a es mayor que b
            return 0; //a y b son iguales
        });
    }else if (criteria === ORDER_DESC_BY_COST){ //compara si el criterio es igual de "ZA"
        result = array.sort(function(a, b) { //hace un sort de forma descendete, invierte el orden
            if ( a.cost > b.cost ){ return -1; } // a es mayor que b (AB)
            if ( a.cost < b.cost ){ return 1; } //a es menos que b (BA)
            return 0; //a y b son iguales
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){ //compara si el criterio es igual a "Cant." Es una lista numerica en forma descendente
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); //pasa el String a numero con parseInt para que ordene bien y los guarda en una variable
            let bCount = parseInt(b.soldCount); //pasa el String a numero con parseInt para que ordene bien y los guarda en una variable
            //orden descendente
            if ( aCount > bCount ){ return -1; } //a es mayor que b (AB)
            if ( aCount < bCount ){ return 1; } //a es menor que b (BA)
            return 0; //a y b son iguales
        });
    }
    
    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
    
    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }
    
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    
    //Muestro las categorías ordenadas
    showListOfProducts();
}
    
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productArray = resultObj.data;
            //Muestro las categorías ordenadas
            showListOfProducts(productArray);
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });
    
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
    
        minCount = undefined;
        maxCount = undefined;
    
        showListOfProducts();
    });
    
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
    
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
    
        showListOfProducts();
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////

/*document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productArray = resultObj.data;
            //Muestro las categorías ordenadas
            showListOfProducts(productArray);
        }
    });
});*/