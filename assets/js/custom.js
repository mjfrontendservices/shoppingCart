$(function () {

    // go to cart

    $('.shopping-cart').click(function () {
        window.location.href = "cart.html";
    })

    // go to home

    $('.home').click(function () {
        window.location.href = "index.html";
    })

    // the cart array in local storage
    let cartArray = JSON.parse(localStorage.getItem("cart"));
    // if no cart array, create a cart array
    if (!cartArray) { cartArray = [] }
    // price array
    let totalPriceArray = [];

    var holder;
    $.getJSON('assets/json/item.json', (data) => {
        holder = data;
        displayProducts();
    })
    // static products
    function displayProducts() {
        for (allData = 0; allData < holder.length; allData++) {
            $('.owl-carousel').append(`
                <div class="owl-carousel-item">
                    <div class="carousel-img">
                        <img src="${holder[allData].img}" alt="">
                    </div>
                    <div class="caption">
                        <h3>${holder[allData].pname}</h3>
                        <p>Php ${holder[allData].price}</p>
                        <button class="addToCart"
                            product-id="${holder[allData].id}"
                            data-picture="${holder[allData].img}"
                            data-name="${holder[allData].pname}"
                            data-price="${holder[allData].price}"
                            data-id="${holder[allData].pname}">
                            <i class="fa fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            `)
        }
        $('.addToCart').click(function () {
            let pimage = $(this).attr("data-picture");
            let pname = $(this).attr("data-name");
            let pprice = $(this).attr("data-price");
            let product = {
                productImage: pimage,
                productName: pname,
                productPrice: pprice
            }
            cartArray.push(product)
            localStorage.setItem('cart', JSON.stringify(cartArray));
            addedToCartFunction()
            cartCounter()
        })
        $('.owl-carousel').owlCarousel();
    }

    function addedToCartFunction() {
        for (added = 0; added < cartArray.length; added++) {
            $('.itemList').append(`
                <div class="cart-item">
                    <div class="cart-img">
                        <img src="${cartArray[added].productImage}" alt="">
                    </div>
                    <div class="cart-pname">
                        <h2>${cartArray[added].productName}</h2>
                    </div>
                    <div class="cart-price">
                        <p>Php ${cartArray[added].productPrice}</p>
                    </div>
                    <div class="cart-delete">
                        <i delete-data-id="${cartArray[added].productName}" class="fa fa-trash-o deleteItem"></i>
                    </div>
                </div>
            `)
        }
        $('.deleteItem').click(function () {
            let bye = $(this).attr('delete-data-id');
            // cart page
            let mustDelete = cartArray.findIndex(del => del.productName === `${bye}`);
            cartArray.splice(mustDelete, 1);
            localStorage.setItem('cart', JSON.stringify(cartArray));
            cartCounter()
            window.location.reload();
        })
    }
    addedToCartFunction()

    // display counter
    function cartCounter() {
        $('.cart-count .count').text(cartArray.length);
        if (cartArray.length > 1) {
            $('.itemNumber').text(`${cartArray.length} items`);
        } else {
            $('.itemNumber').text(`${cartArray.length} item`);
        }
    }
    cartCounter()
    function priceArrays() {
        for (x = 0; x < cartArray.length; x++) {
            totalPriceArray.push(parseInt(cartArray[x].productPrice))
            let totalPrice = totalPriceArray.reduce((a, b) => a + b, 0);
            $('.totalPrice').text(totalPrice);
        }
    }
    priceArrays()

    // delete button
    function deleteAll() {
        $('.deleteAll').click(function () {
            localStorage.removeItem("cart");
            window.location.reload();
        })
    }
    deleteAll();
})