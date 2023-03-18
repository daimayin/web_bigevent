$(function(){
    //点击 “去注册账号” 的连接
    $('#link_reg').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })
    // 点击 “去登录” 的连接
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    // 自定义校验
    form.verify({
        // 密码长度校验
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        // 密码重复校验
        repwd:function(value){
            let pwd = $('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })

    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        uname = $('#form_reg [name=username]').val()
        upwd = $('#form_reg [name=password]').val()
        $.post('/api/reguser',{username:uname,password:upwd},(res)=>{
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $('#link_login').click()
        })
    })

    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:"POST",
            // 获取表单数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 保存登录成功后的token字段 进行后续的身份验证
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })
})