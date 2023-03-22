$(function(){
    let layer = layui.layer
    let form = layui.form
    initArtCateList()
    // 文章列表初始化
    function initArtCateList(){
        $.ajax({
            method:"GET",
            url:'/my/article/cates',
            success:function(res){
                console.log(res);
                let htmlstr = template('tpl-table',res)
                $('tbody').html(htmlstr)
            }
        })
    }
    // 关闭弹出框参数
    let index = null
    // 为添加类别绑定点击事件
    $('#btnAddCate').on('click',function(){
        index = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-add').html()
          });     
    })

    // 通过代理的形式为Addcate绑定submit元素
    $('body').on('submit','#Addcate',function(e){
        e.preventDefault()
        let data = $(this).serialize()+'&Id=40'
        // console.log(data);
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:data,
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg('添加失败')
                }
                layer.msg('添加成功')
                initArtCateList()
                layer.close(index)
            }
        })
    })

    let indexEdit = null
    // 为编辑按钮绑定事件委托
    $('tbody').on('click','#btn-edit',function(){
        indexEdit = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章类别',
            content: $('#dialog-edit').html()
          });
          
          let id = $(this).attr('data-id')
          $.ajax({
              method:'GET',
              url:'/my/article/cates/'+id,
              success:function(res){
                if(res.status!==0){
                    return layer.msg('文章获取失败，请检查网络连接')
                }
                form.val('form-edit', res.data);
              }
          })
    })

// 为修改分类的表单绑定提交事件
    $('body').on('submit','#Editcate',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    console.log(res);
                    return layer.msg('更新数据失败')
                }
                layer.msg('更新数据成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 为删除按钮绑定点击事件
    $('tbody').on('click','#btn-delete',function(){
        let id = $(this).attr('data-id')
        // 提示用户是否删除
        layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:"/my/article/deletecate/"+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index)
                    initArtCateList()
                    
                }
            })
          });
    })
})