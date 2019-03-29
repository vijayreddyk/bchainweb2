
$("#role a").click(function() {
	e.preventDefault();
    $('a').removeClass('active');
    $(this).addClass("active");
});