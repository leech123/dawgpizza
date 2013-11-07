$(function(){
	render(com.dawgpizza.menu.drinks, $('.drinks-template'), $('.menu-bookk'));
});



function render(entries, template, menuBook) {
	var instance;
	var type;
	menuBook.empty();    

	$.each(entries, function(){
		instance = template.clone();
		instance.find('.name').html(this.name);
		instance.find('.description').html(this.description);
		instance.find('.price').html(this.price);
		instance.removeClass('template');
		menuBook.append(instance);
	});
}