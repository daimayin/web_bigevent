$(function () {
    let layer = layui.layer
    let form = layui.form
    initCate()
    // 初始化富文本编辑器
    initEditor()
    // 获取文章类别渲染选择框
    function initCate() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败')
                }
                let htmlstr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面的按钮绑定点击事件处理函数
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    // 监听coverFile的cahnge事件，获取用户选择的文件列表
    $('#coverFile').on('change', function (e) {
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 定义文章的发布状态
    let art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })

    // 为表单绑定submit提交事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData($('#form-pub')[0])
        // 将文章的发布状态存到fd中
        fd.append('state', art_state)

        // 将封面裁剪过后的图片输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将文件对象存到fd中
                fd.append('cover_img',blob)
                // 发起ajax请求发布文章
                publishArticle(fd)
            })
    })
    // 发起ajax函数
    function publishArticle(fd){
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:fd,
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('发布失败')
                }
                layer.msg('发布成功')
                // 发布成功跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }

})