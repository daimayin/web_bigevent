$(function(){
    // 调用getUserInfo获取用户信息
    getUserInfo()

    let layer = layui.layer
    // 提示用户是否推出登录
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            // 清空本地token
            localStorage.removeItem('token')
            // 条转到登录页面
            location.href='/login.html'

            // 关闭confirm询问框
            layer.close(index);
          });
    })
})


// 获取用户基本信息函数
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:"/my/userinfo",
        // headers:{
        //     Authorization:localStorage.getItem('token')||""
        // },
        success:function(res){
           if(res.status!==0){return layui.layer.msg('获取用户信息失败')}
        //    调用renderAvatar渲染用户的头像
           renderAvatar(res.data)
        }
    })
}
// 渲染用户的头像
function renderAvatar(user){
    let name = user.nickname||user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(user.user_pic!==null){
        // 设置用户头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        // 设置文字头像
        $('.layui-nav-img').hide()
        let a = name[0].toUpperCase()
        $('.text-avatar').html(a).show()
    }
}