$(document).ready(function(){
    $('.btn').click(function(){
        const val=$(this).attr('data-filter');
        if(val =='all'){
            $('.filt').show('1000');
        }else{
            $('.filt').not('.'+val).hide('1000');
            $('.filt').filter('.'+val).show('1000');
        }
    })
    //classlit
    $('.btn').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
})


$('.nav li a').on('click', function(){
    $('.nav li a').removeClass('active');
    $(this).addClass('active');
})
// var selector = '.nav li a';

// $(selector).on('click', function(){
//     $(selector).removeClass('active');
//     $(this).addClass('active');
// });

