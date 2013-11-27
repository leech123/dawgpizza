//document ready function
$(function(){
    renderPizza(com.dawgpizza.menu.pizzas, $('.pizzas-order-template'), $('.order-list'));
    //renderDrink(com.dawgpizza.menu.drinks, $('.drinks-template'), $('.container'));
    //renderDessert(com.dawgpizza.menu.desserts, $('.desserts-template'), $('.container'));
    
    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };

        //push the new item on to the items array
        cart.items.push(newCartItem);

        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $('.cart-order-template'), $('.cart-container'));
    });

    $('.place-order').click(function(){
        
        //TODO: validate the cart to make sure all the required
        //properties have been filled out, and that the 
        //total order is greater than $20 (see homework 
        //instructions) 

        postCart(cart, $('.cart-form'));
    });

}); //doc ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>

function renderCart(cart, template, container) {
    var item;
    var idx
    
    //empty the container of whatever is there currently
    container.empty();
    

    // $.each(cart, function() {
    //     item = template.clone();
    //     item.find('.size').html(this.size);
        
    //     item.removeClass('template');
    //     container.append(item);
    // });

    //for each item in the cart...
    for (idx = 0; idx < cart.items.length; ++idx) {
        item = cart.items[idx];

        //TODO: code to render the cart item

        container.append(item.name);

    } //for each cart item

    
    //TODO: code to render sub-total price of the cart
    //the tax amount (see instructions), 
    //and the grand total

} //renderCart()

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();

} //postCart()



function renderPizza(entries, template, menuBook) {
    var instance;
    var type;

    $.each(entries, function(){
        instance = template.clone();
        instance.find('.name').html(this.name);
        instance.find('.description').html(this.description);
        instance.find('.price-small').html(this.prices[0]);
        instance.find('.price-medium').html(this.prices[1]);
        instance.find('.price-large').html(this.prices[2]);

        instance.removeClass('template');
        menuBook.append(instance);
    });
}

function renderDrink(entries, template, menuBook) {
    var instance;
    var type;
    var stringDrink = "Drink:";
    menuBook.append(stringDrink);

    $.each(entries, function(){
        instance = template.clone();
        instance.find('.name').html(this.name);
        instance.find('.price').html(this.price);

        instance.removeClass('template');
        menuBook.append(instance);
    });
}

function renderDessert(entries, template, menuBook) {
    var instance;
    var type;
    var stringDessert = "Dessert:";
    menuBook.append(stringDessert);

    $.each(entries, function(){
        instance = template.clone();
        instance.find('.name').html(this.name);
        instance.find('.price').html(this.price);

        instance.removeClass('template');
        menuBook.append(instance);
    });
}
