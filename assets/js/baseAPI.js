// 注意：每次调用$.get() $.post() $.ajax()的时候，
// 会先调用$.ajaxPrefilter 这个函数
// 在这个函数中可以拿到ajax提供的对象
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);
})