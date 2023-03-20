$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件e
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 监听用户是否选择了图片
    $('#file').on('change', function (e) {
        let filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片')
        }

        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
})