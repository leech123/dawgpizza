$(function(){
	renderPizza(com.dawgpizza.menu.pizzas, $('.pizzas-template'), $('.menu-book'));
	renderDrink(com.dawgpizza.menu.drinks, $('.drinks-template'), $('.menu-book'));
	renderDessert(com.dawgpizza.menu.desserts, $('.desserts-template'), $('.menu-book'));
});



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