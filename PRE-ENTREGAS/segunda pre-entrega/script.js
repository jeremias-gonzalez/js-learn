// CASO ECOMMERCE
// DENTRO DE LA CARPETA DATA, HAY UN ARCHIVO products.js QUE PODEMOS UTILIZAR PARA EL DESARROLLO DE NUESTRA PREENTREGA
// 1) Tomar dos categorías de productos que deseen incorporar en su tienda y filtrar de entre todos los productos aquellos que cumplan con la categoría.
// 2) Mediante un alert, saludar al usuario y darles la bienvenida a su ecommerce.
// 3) Mediante un alert, visualizar las categorías de productos disponibles.
// 4) Mediante un prompt, mostrar la lista de productos disponibles ordenados de manera A-Z y preguntar qué producto quiere comprar.
// 5) Con el valor obtenido del punto 4, se deberá buscar el producto deseado y mediante un confirm, mostrar el nombre, descripción y precio del producto. Se deberá preguntar al usuario si se desea completar la compra. En caso de que no se encuentre el producto, se deberá dar la chance de ingresarlo nuevamente.
// 6) Con el valor obtenido del punto 5), se deberá visualizar un alert que agradezca la compra con una supuesta fecha de entrega -usando date-, en el caso de que la acepte, si la cancela, se agradecerá la interacción.



const categories = ["men's clothing", "women's clothing"];
const WELCOME_MESSAGE = "Welcome to our Shop!";
const THANKS_MESSAGE = "Thank you for visiting us!";

function filterProductsForCategories(products, categories) {
    const filteredProducts = products.filter(product => categories.includes(product.category));
    alert("Products filtered by category.");
    return filteredProducts;
}

function orderProductsName(products) {
    const sortedProducts = products.sort((a, b) => a.title.localeCompare(b.title));
    alert("Products sorted by name.");
    return sortedProducts;
}

function showProducts(orderProducts) {
    const productDetails = orderProducts.map((product, index) => `${index + 1})- ${product.title}`).join('\n');
    alert("Products displayed.");
    alert(productDetails);
}

function calculateDeliveryDate(workingDays) {
    let deliveryDate = new Date();
    while (workingDays > 0) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
            workingDays--;
        }
    }
    alert("Delivery date calculated.");
    return deliveryDate;
}

function chooseProduct(messageProducts, productsOrdered) {
    let productFound = false;
    let chosenProduct;

    do {
        chosenProduct = prompt(`Here are the available products, with home delivery in 5 working days:\nCHOOSE THE PRODUCT NUMBER\n${messageProducts}`);

        if (chosenProduct === null) {
            const userResponse = confirm("Are you sure you want to exit?");
            if (userResponse) {
                alert(THANKS_MESSAGE);
                return null;
            }
        } else {
            const selectedProductNumber = parseInt(chosenProduct);
            if (selectedProductNumber > 0 && selectedProductNumber <= productsOrdered.length) {
                const selectedProduct = productsOrdered[selectedProductNumber - 1];
                alert(`Selected product: ${selectedProduct.title}`);
                return selectedProduct;
            } else {
                const userResponse = confirm("The selected product number is not valid. Do you want to try again?");
                if (!userResponse) {
                    alert(THANKS_MESSAGE);
                    return null;
                }
            }
        }
    } while (!productFound);
}

function confirmPurchase(selectedProduct) {
    const purchaseConfirmation = confirm(`Name: ${selectedProduct.title}\nDescription: ${selectedProduct.description}\nPrice: $${selectedProduct.price}\nDo you want to complete the purchase?`);
    if (purchaseConfirmation) {
        const deliveryDate = calculateDeliveryDate(5);
        alert(`Thank you for your purchase! The estimated delivery date is ${deliveryDate.toLocaleDateString()}.`);
    } else {
        alert(THANKS_MESSAGE);
    }
}

// dinamica 
const products = [
    { category: "men's clothing", title: "Shirt 1", description: "A nice shirt", price: 20 },
    { category: "women's clothing", title: "Dress 1", description: "A beautiful dress", price: 40 },
    { category: "men's clothing", title: "Shirt 2", description: "Another nice shirt", price: 25 },
    { category: "women's clothing", title: "Dress 2", description: "Another beautiful dress", price: 45 }
];
alert(WELCOME_MESSAGE);
alert(`Below you will find:\n1- Men's Clothing\n2- Women's Clothing`);
const filteredProducts = filterProductsForCategories(products, categories);
const orderedProducts = orderProductsName(filteredProducts);
const messageProducts = showProducts(orderedProducts);
const selectedProduct = chooseProduct(messageProducts, orderedProducts);

if (selectedProduct) {
    confirmPurchase(selectedProduct);
}
