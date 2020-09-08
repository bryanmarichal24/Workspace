//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productList = {};

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

/*function showRelatedProducts(relatedProductsArray) {
    getJSONData(PRODUCT_INFO_LIST).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productList = resultObj.data;

            let htmlRelatedproducts = "";

            for (let i = 0; i < relatedProductsArray.length; i++) {
                let relatedProductPosition = relatedProductsArray[i];
                let relatedproduct = productList[relatedProductPosition];

                htmlRelatedproducts += `
                <div class= "col-lg-3 col-md-4 col-6 border">
                    <div id="relatedproductImg" class= "row">
                        <img class="img-fluid p-2" src="`+relatedproduct.images[0]+`">                                              
                    </div>                   
                    <div "relatedproductInfo" class= "row p-2">
                    <p>`+ relatedproduct.name + `</p> 
                    <p>`+ relatedproduct.description + `</p>
                    </div>
                    <div class= "row p-2">
                    <a href="products-info.html">Ver</a>
                    </div>                     
                </div>`
            }
            document.getElementById("relatedroductsContainer").innerHTML = htmlRelatedproducts;
        }
    })
}*/

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
            //showRelatedGames(product.relatedProducts);
        }
    })
});