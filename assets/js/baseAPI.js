// 注意：每次调用$.get() $.post() $.ajax()的时候，
// 会先调用$.ajaxPrefilter 这个函数
// 在这个函数中可以拿到ajax提供的对象
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);
    if(options.url.indexOf('/my/')!==-1){
        options.headers = {
            Authorization:localStorage.getItem('token')||""
        }
    }
    // ajax无论成功与否，都会调用complete
    options.complete = function(res){
        if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})