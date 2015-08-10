$(document).ready(function(){
    $('nav.main a').click(function(e){
        e.preventDefault();
        console.log(e);
        var section = $(this).data('link');
        $('html, body').animate({
            scrollTop: ($('.'+ section).offset().top) - 55
         }, 500);
    });
    
    $('a[rel="external"]').click(function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        window.open(url);
    });
    
    $('.close a').click(function(e){
       e.preventDefault();
       $(this).closest('.news-headline').slideUp(300);
    });
});