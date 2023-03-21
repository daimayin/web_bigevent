$(function(){
    let layer = layui.layer

    initArtCateList()
    // 文章列表初始化
    function initArtCateList(){
        $.ajax({
            method:"GET",
            url:'/my/article/cates',
            success:function(res){
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
        let data = $(this).serialize()
        console.log(data);
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
})