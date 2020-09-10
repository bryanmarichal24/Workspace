//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productList = {};
const maxRating = 5;

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesWrapper").innerHTML = htmlContentToAppend;
    }
}

function showProductComments(array){
    let htmlContentToAppend = "";

    for(let i=0;i<array.length;i++){
        let comments = array[i];
        let score = comments.score;
        let stars = "";

        for (let u = 1; u <= maxRating; u++) {
            if (u <= score) {
                stars += '<i class="fa fa-star checked"></i>';
            } else {
                stars += '<i class="fa fa-star"></i>';
            }
        }

        htmlContentToAppend +=`
        <div >
            <div class="d-block mb-4 h-100">
                <h4>${comments.user}${" "}${stars}</h4>
                <p>${comments.dateTime}</p>
                <p>${comments.description}</p>
            </div>
        </div>
        `
        document.getElementById("productComments").innerHTML = htmlContentToAppend;
    }
}

function relatedProducts(relatedProductsarray){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
   
        if(resultObj.status === "ok"){
            array = resultObj.data;

            let html="";

            for(let i=0;i<relatedProductsarray.length;i++){
                let relatedPosition = relatedProductsarray[i];
                let relacionados = array[relatedPosition];
                html +=`
                <div class= "col-lg-3 col-md-4 col-6">
                    <div class="row">
                        <img class="img-fluid p-2" src="${relacionados.imgSrc}">
                    </div>
                    <div  class="row p-2">
                        <h4>`+relacionados.name+`</h4>
                        <p>${relacionados.description}</p>
                    </div>
                </div>
                `
            }
            document.getElementById("relatedProductsContainer").innerHTML =html;
        }
    })
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if(resultObj.status === "ok"){
            productscomments = resultObj.data;
            showProductComments(productscomments);
            commentRating(productscomments);
        }
    })
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            // completar la funcion mostrando la informacion en el html de Products-info
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.cost;
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            relatedProducts(product.relatedProducts);
        }
    })
});