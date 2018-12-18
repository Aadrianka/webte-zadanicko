$(function () {
	var $menu = $("#menu");

	var createMenuItem = function (menuData) {
			var item = $("<li>", {
				class: menuData.id
			}).append($("<a>", {
				href: menuData.href,
				html: (menuData.children ? menuData.name+" "+('<span><img id=expand src="expand.png" /></span>') : menuData.name)
			}));
			if (menuData.children) {
				var subList = $("<ul>");
				$.each(menuData.children, function () {
					subList.append(createMenuItem(this));
				});
				item.append(subList);
			}
			return item;
			
		};

	$.each(menuItems.items, function () {
		$menu.append(
			createMenuItem(this)
		);
	});
	
});

/*
-----ZDROJE-----
Menu
	https://stackoverflow.com/questions/19003285/creating-a-menu-from-json
*/