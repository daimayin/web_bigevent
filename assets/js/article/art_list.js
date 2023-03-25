$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage;
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    let q = {
        pagenum: 1, //页码值，默认请求第一页的数据
        pagesize: 2, //每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的id
        state: '' //文章的发布状态
    }

    // 获取数据渲染页面
    initTable()
    // 获取文章分类渲染可选框
    initCate()

    // 发送请求获取数据渲染表格
    function initTable() {
        $.ajax({
            method: "GET",
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                let htmlstr = template('tpl-table', res)
                $('tbody').html(htmlstr)
                // 调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        let dt = new Date(date)

        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 时间补零函数
    function padZero(a) {
        return a > 9 ? a : '0' + a
    }

    // 获取文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                let htmlstr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        })
    }

    // 为可选项表单绑定提交事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        // 为查询参数q对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 再次调用此函数渲染表格数据u
        initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用laypage.render（）方法渲染分页结构
        laypage.render({
            elem: 'pageBox', //指定盒子
            count: total, //总数居条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //默认选中的分页
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            // 切换分页触发回调
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 通过代理的形式为删除按钮绑定点击事件
    $('tbody').on('click', '#btn-delete', function () {
        // 获取页面删除按钮的个数
        // let len = $('#btn-delete').length
        let len = $('[id=btn-delete]').length
        console.log(len);
        let id = $(this).attr('data-id')
        layer.confirm('确认删除', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });
    })
})