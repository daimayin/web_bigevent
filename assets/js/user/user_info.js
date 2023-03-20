$(function(){
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称必须在1~6个字符之间'
            }
        }
    })

    initUserInfo()

    // 初始化用户基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 表单重置
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    // 表单提交
    $('#btnRevise').on('click',function(e){
        e.preventDefault()
        let data = form.val('formUserInfo')
        // console.log(data);
        if(data.nickname===""||data.email===""){
            return 
        }
        
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:data,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('提交成功')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})