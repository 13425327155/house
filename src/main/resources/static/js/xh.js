;
(function(global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("Page requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    function xh_Page(options) {
        this.el = options.el;
        this.nums = options.nums; //数据总条数
        this.counts = options.counts || 10; //每页数据条数
        this.parent = document.querySelector(this.el);
        this.parent.classList.add('xh-page-elem-field-root');
        this.parentNode = document.createElement('div');
        this.parent.appendChild(this.parentNode);
        this.defaultPage = Number(options.defaultPage) || 1;
        this.last = this.nums % this.counts;
        this.pages = parseInt(this.nums / this.counts);
        this.jumpToOrder = !!options.jumpToOrder; // 是否显示跳转到指定页
        this.showNowAndAll = !!options.showNowAndAll; // 显示当前第几页，共几页
        this.showHeadFoot = !!options.showHeadFoot;
        //this.head = options.head || '首页';
        //this.foot = options.foot || '尾页';

        this.prev = '<i class="fa fa-angle-left"></i>';
        this.next = '<i class="fa fa-angle-right"></i>';

        this.headfoot = [];
        if (this.last != 0) {
            this.pages++;
        }
        this.div = options.div || 'div';
        this.domList = [];
        this.showDomList = [];
        var that = this;

        function noop() {
            if (options.clickEvent && typeof options.clickEvent == 'function') {
                options.clickEvent(that.currect);
            }
        }
        this.clickEvent = noop;
        this.init();
    }

    xh_Page.prototype = {
        init: function() {
            this.createDom();
            this.showDom();
            // 监听当前页的数字变化
            this.watcherCurrect();
            this.addDom();
            this.reanderHeadFoot();
            this.jumpToOrderPage();
            this.showNowAndAllPage();
        },
        showNowAndAllPage: function() {
            if (this.showNowAndAll) {
                var pagesbox = document.createElement('div');
                var allPages = document.createElement('div');
                //var currectPage = document.createElement('div');
                var line = document.createElement('div');
                pagesbox.classList.add('xh-pagesbox');
                allPages.classList.add('xh-allPages');
                //currectPage.classList.add('xh-currectPage');
                //line.classList.add('xh-line');
                //currectPage.innerText = this.currect;
                allPages.innerHTML = '<span class="xh-total">共 ' + this.pages + ' 页</span>';
                //line.innerText = '/';
                //pagesbox.appendChild(currectPage);
                pagesbox.appendChild(line);
                pagesbox.appendChild(allPages);
                this.parent.appendChild(pagesbox);
                this.showNowAndAllPageDom = {
                    pagesbox: pagesbox,
                    allPages: allPages,
                    // currectPage: currectPage,
                    line: line
                };
            }
        },
        jumpToOrderPage: function() {
            if (this.jumpToOrder) {
                var toPage = document.createElement('div');
                var inputBox = document.createElement('div');
                var input = document.createElement('input');
                // var showInputVal = document.createElement('div');
                toPage.classList.add('xh-toPage');
                inputBox.classList.add('xh-inputBox');
                input.classList.add('xh-inputborder');
                input.type = 'text';
                input.value = this.currect;
                // showInputVal.innerText = this.currect;
                // showInputVal.classList.add('show-val');
                this.addEventForInput(input);
                inputBox.appendChild(input);
                // inputBox.appendChild(showInputVal);
                toPage.appendChild(inputBox);
                this.parent.appendChild(toPage);
                this.jumpToOrderPageDom = {
                    toPage: toPage,
                    input: input,
                    inputBox: inputBox
                };
            }
        },
        addEventForInput: function(input, showInputVal) {
            var that = this;
            // input.addEventListener('input', function(e) {
            // 	var value = e.target.value;
            // 	showInputVal.innerText = value;

            // })
            input.addEventListener('change', function(e) {
                var value = e.target.value;
                if (value > that.pages) {
                    value = that.pages;
                } else if (value < 1) {
                    value = 1;
                }
                that.currect = value;
                this.value = value;
                // showInputVal.innerText = value;
            })
        },
        updateCurrectAndOrderBox: function(val) {
            if (this.jumpToOrder) {
                this.jumpToOrderPageDom.input.value = val;
            }
            if (this.showNowAndAll) {
                //this.showNowAndAllPageDom.currectPage.innerText = val;
            }
        },
        reanderHeadFoot: function() {
            if (!this.showHeadFoot) {
                return;
            }
            var div = this.div;
            //var head = document.createElement(div);
            //var foot = document.createElement(div);
            //head.innerHTML = this.head;
            //head.classList.add('xh-item');
            //head.classList.add('xh-head');
            //foot.innerHTML = this.foot;
            //foot.classList.add('xh-item');
            //foot.classList.add('xh-foot');
            //this.headfoot.push(head);
            //this.headfoot.push(foot);
            //this.parentNode.insertBefore(head, this.parentNode.firstChild);
            //this.parentNode.appendChild(foot);
            //this.addEventHeadFoot();
            //this.headFootDisable();
        },
        headFootDisable: function() {
            if (this.currect === 1) {
                this.headfoot[0].classList.add('xh-item-disable');
            } else if (this.currect === this.pages) {
                this.headfoot[1].classList.add('xh-item-disable');
            }
        },
        addEventHeadFoot: function() {
            var that = this;
            this.headfoot[0].addEventListener('click', function() {
                if (that.currect != 1) {
                    that.currect = 1;
                }
            });
            this.headfoot[1].addEventListener('click', function() {
                if (that.currect != that.pages) {
                    that.currect = that.pages;
                }
            });
        },
        createDom: function() {
            var div = this.div;
            var domList = this.domList;
            var prev = document.createElement(div);
            var next = document.createElement(div);
            prev.innerHTML = this.prev;
            prev.classList.add('xh-item');
            next.innerHTML = this.next;
            next.classList.add('xh-item');
            domList[0] = prev;
            var pages = this.pages;
            for (var i = 0; i < pages; i++) {
                var item = document.createElement(div);
                item.classList.add('xh-item');
                item.innerHTML = i + 1;
                domList[i + 1] = item;
            }
            domList.push(next);
            return domList;
        },
        showDom: function() {
            var domList = this.domList;
            var len = domList.length;
            var list = this.showDomList;
            var defaultPage = this.defaultPage;
            if (len <= 12) {
                for (var i = 0; i < len; i++) {
                    list[i] = domList[i];
                }
            } else {
                var offset = defaultPage - 6 < 0 ? 0 : defaultPage - 6;
                var cha = this.pages - defaultPage;
                if (cha < 5) {
                    offset = this.pages - 10;
                }
                list[0] = domList[0];
                for (var i = 1; i < 8; i++) {
                    list[i] = domList[i + offset];
                }
                list[i] = domList[len - 1];
            }
            return list;
        },
        addDom: function() {
            this.parentNode.classList.add('xh-page-elem-field');
            this.addAndRemoveClass();
            this.addEvent();
            var fgDom = document.createDocumentFragment();
            var showDomList = this.showDomList;
            var len = showDomList.length;
            for (var i = 0; i < len; i++) {
                fgDom.appendChild(showDomList[i]);
            }
            this.parentNode.appendChild(fgDom);
        },
        addEvent: function() {
            var domList = this.domList;
            var len = domList.length;
            for (var i = 0; i < len; i++) {
                domList[i].addEventListener('click', this.jump.bind(domList[i], this));
            }
        },
        jump: function jump(p) {
            var thispage = this.innerHTML;
            if ((thispage == p.prev && p.currect == 1) ||
                (thispage == p.next && p.currect == p.pages) ||
                (thispage == p.currect)) {
                return;
            }
            if (thispage == p.prev && p.currect > 1) {
                p.currect--;
            } else if (thispage == p.next && p.currect < p.pages) {
                p.currect++;
            } else if (thispage != p.prev && thispage != p.next) {
                p.currect = Number(thispage);
            }
        },
        addAndRemoveClass: function() {
            var domList = this.domList;
            if (this.currect === 1) {
                domList[0].classList.add('xh-item-disable');
            } else if (this.currect === this.pages) {
                domList[domList.length - 1].classList.add('xh-item-disable');
            }
            domList[this.currect].classList.add('xh-active');
        },
        activeCurrectItem: function(val) {
            var domList = this.domList;
            domList[val].classList.add('xh-active');
            domList[0].classList.remove('xh-item-disable');
            domList[domList.length - 1].classList.remove('xh-item-disable');
            /*if (this.showHeadFoot) {
                this.headfoot[0].classList.remove('xh-item-disable');
                this.headfoot[1].classList.remove('xh-item-disable');
            }*/
            if (val == 1) {
                // 第一页就显示禁止的图标
                domList[0].classList.add('xh-item-disable');
                if (this.showHeadFoot) {
                    this.headfoot[0].classList.add('xh-item-disable');
                }
            } else if (val == this.pages) {
                // 最后一页就显示禁止的图标
                domList[domList.length - 1].classList.add('xh-item-disable');
                /*if (this.showHeadFoot) {
                    this.headfoot[1].classList.add('xh-item-disable');
                }*/
            }
        },
        moveDom: function(val, oneDomNumber) {
            var domList = this.domList;
            var showDomList = this.showDomList;
            var cha = val - oneDomNumber;
            var moves = 0;
            if (cha > 5) {
                moves = cha - 5; //首部移除几个
                // 最后一个元素后面还有几个元素
                var showlastnum = Number(showDomList[showDomList.length - 2].innerHTML);
                var afters = this.pages - showlastnum;
                // console.log(afters, moves)
                if (afters > 0 && moves > 0) {
                    // 需要移动的dom数量，并且是存在这么多数量
                    var howmany = Math.min(afters, moves);
                    for (var i = 0; i < howmany; i++) {
                        showDomList.splice(showDomList.length - 1, 0, domList[showlastnum + i + 1]);
                        this.parentNode.insertBefore(domList[showlastnum + i + 1], showDomList[showDomList.length - 1]);
                        this.parentNode.removeChild(showDomList[i + 1]);
                    }
                    showDomList.splice(1, howmany);
                }
            }
            if (cha <= 5 && oneDomNumber != 1) {
                if (val <= 5) {
                    moves = oneDomNumber - 1;
                } else {
                    moves = 5 - cha;
                }
                // 移动几个dom
                var howmany = moves;
                for (var i = 0; i < howmany; i++) {
                    this.parentNode.insertBefore(domList[oneDomNumber - i - 1], showDomList[1]);
                    this.parentNode.removeChild(showDomList[showDomList.length - 2 - i]);
                    showDomList.splice(1, 0, domList[oneDomNumber - i - 1]);
                }
                showDomList.splice(showDomList.length - 1 - howmany, howmany);
                // console.log('往前移动' + moves);
            }
            oneDomNumber = Number(showDomList[1].innerHTML);
            return oneDomNumber;
        },
        watcherCurrect: function() {
            var val = this.defaultPage;
            var domList = this.domList;
            var showDomList = this.showDomList;
            var oneDomNumber = Number(showDomList[1].innerHTML);
            Object.defineProperty(this, 'currect', {
                enumerable: true,
                configrable: false,
                set: function(v) {
                    domList[val].classList.remove('xh-active');
                    val = v;
                    // 更新输入框中的值，当前第几页的值
                    this.updateCurrectAndOrderBox(val);
                    // 更新pages的dom，不变的保留，改变的添加和删除，没有直接更新覆盖，重用了相同的dom
                    oneDomNumber = this.moveDom(val, oneDomNumber);
                    // 当前选择页激活
                    this.activeCurrectItem(val);
                    // 执行用户自定义事件
                    this.clickEvent(val);
                },
                get: function() {
                    return val;
                }
            })
        }
    }
    xh_Page.prototype.constructor = xh_Page;
    if (typeof noGlobal === "undefined") {
        window.xh_Page = xh_Page;
    }
    return xh_Page;
})



;
(function($) {
    //$.xh_setCookie('xh', '测试123', 1, '/xhdemo');
    //alert($.xh_getCookie('xh'));
    $.extend({
        xh_setCookie: function(name, value, time, path) {
            var cdata = name + "=" + value;
            if (time) {
                var d = new Date();
                d.setHours(d.getHours() + time);
                cdata += "; expires=" + d.toGMTString();
            }
            cdata += path ? ("; path=" + path) : "";
            document.cookie = cdata;
        },
        xh_getCookie: function(name) {
            var cname = name + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(cname) == 0) {
                    return c.substring(cname.length, c.length);
                }
            }
            return "";
        }
    })

    $.fn.extend({
        xh_alert: function(isshow) {
            $(this).click(function() {
                if (isshow == 'show') {
                    $(this).show(200);
                } else if (isshow == 'hide') {
                    $(this).hide(200);
                }
            });
        },
        xh_prompt: function(prompt, text, time) {
            $('.xh_prompt').remove();
            var h = '<div class="xh_prompt"><div class="xh_prompt_box">';
            if (prompt == 'success') {
                if (text == '' || text == null || text == undefined) {
                    console.log('提示信息不能为空');
                    return;
                } else {
                    h += text + '</div></div>';
                    $('body').prepend(h);
                    $('.xh_prompt').find('.xh_prompt_box').addClass('xh-prompt-success');
                    $('.xh_prompt').show(200);
                    if (time != '' && time != null && time != undefined) {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, time);
                    } else {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, 1500);
                    }
                }
            } else if (prompt == 'warm') {
                if (text == '' || text == null || text == undefined) {
                    console.log('提示信息不能为空');
                    return;
                } else {
                    h += text + '</div></div>';
                    $('body').prepend(h);
                    $('.xh_prompt').find('.xh_prompt_box').addClass('xh-prompt-warm');
                    $('.xh_prompt').show(200);
                    if (time != '' && time != null && time != undefined) {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, time);
                    } else {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, 1500);
                    }
                }
            } else if (prompt == 'danger') {
                if (text == '' || text == null || text == undefined) {
                    console.log('提示信息不能为空');
                    return;
                } else {
                    h += text + '</div></div>';
                    $('body').prepend(h);
                    $('.xh_prompt').find('.xh_prompt_box').addClass('xh-prompt-danger');
                    $('.xh_prompt').show(200);
                    if (time != '' && time != null && time != undefined) {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, time);
                    } else {
                        setTimeout(function() {
                            $('.xh_prompt').hide(200);
                        }, 1500);
                    }
                }
            }
        },
        xh_bload: function(text, isload = true) {
            if (text != '') {
                if (isload == true) {
                    $(this).xh_disabled(isload);
                    var h = text;
                    if ($(this).attr('xh-bload') == 'true') {
                        h += ' <i class="fa fa-circle-o-notch fa-spin"></i>';
                    }
                    $(this).html(h);
                } else {
                    $(this).xh_disabled(isload);
                    var h = text;
                    $(this).html(h);
                }
            } else {
                console.log('请填写提示信息');
            }
        },
        xh_disabled: function(isdis) {
            if (isdis == true) {
                $(this).attr("disabled", "true");
                $(this).addClass('xh-disabled');
            } else {
                $(this).removeAttr("disabled");
                $(this).removeClass('xh-disabled');
            }
        },
        xh_modal: function(isshow) {
            var thismodal = $(this);
            if (isshow == 'show') {
                $(this).show(200);
                var dragging = false;
                var iX, iY;
                thismodal.find(".xh-modal-title").bind("mousedown", function() {
                    thismodal.find(".xh-modal-content").mousedown(function(e) {
                        dragging = true;
                        iX = e.clientX - this.offsetLeft;
                        iY = e.clientY - this.offsetTop;
                        this.setCapture && this.setCapture();
                        return false;
                    })

                });

                thismodal.find(".xh-modal-content").bind("mousemove", function(e) {
                    if (dragging) {
                        var e = e || window.event;
                        var oX = e.clientX - iX;
                        var oY = e.clientY - iY;
                        var max_width = thismodal.width();
                        var max_height = thismodal.height();
                        var box_width = thismodal.find('.xh-modal-content').width();
                        var box_height = thismodal.find('.xh-modal-content').height();
                        oX = oX < 0 ? 0 : oX;
                        oX = oX > max_width - box_width ? max_width - box_width : oX;
                        oY = oY < 0 ? 0 : oY;
                        oY = oY > max_height - box_height ? max_height - box_height : oY;
                        thismodal.find(".xh-modal-content").css({
                            "margin": "0",
                            "left": oX + "px",
                            "top": oY + "px"
                        });
                        return false;
                    }
                })

                thismodal.find(".xh-modal-content").bind("mouseup", function(e) {
                    dragging = false;
                    //thismodal.find(".xh-motent")[0].releaseCapture();
                    e.cancelBubble = true;
                    $(this).unbind("mousedown"); // 清除事件
                })
            } else if (isshow == 'hide') {
                thismodal.hide(200);
            }

            thismodal.find('.xh-close').click(function() {
                var attr = $(this).attr('xh-modal');
                if (attr == 'close') {
                    thismodal.hide(200);
                }
            });
        },
        xh_setprogress: function(perce, color) {
            var id = $(this).attr('xh-setprogress');
            $(id).find('.xh-progress-bar').animate({ width: perce }, 400);
            color != null && color != undefined && color != '' ? $(id).find('.xh-progress-bar').addClass(color) : '';
            $(id).find('.xh-progress-text').text(perce);
        },
        xh_get_selected: function(type) {
            var t = '';
            switch (type) {
                case 'text':
                    var ismultiple = $(this).attr('multiple');
                    if (ismultiple == 'multiple') {
                        $(this).find('option').each(function() {
                            var isselected = $(this).attr('selected');
                            if (isselected == 'selected') {
                                t += $(this).text() + ',';
                            }
                        })
                        t = xh_remove_lastcomma(t);
                    } else {
                        $(this).find('option').each(function() {
                            var isselected = $(this).attr('selected');
                            if (isselected == 'selected') {
                                t = $(this).text();
                            }
                        })
                    }
                    break;
                case 'val':
                    var ismultiple = $(this).attr('multiple');
                    if (ismultiple == 'multiple') {
                        $(this).find('option').each(function() {
                            var isselected = $(this).attr('selected');
                            if (isselected == 'selected') {
                                t += $(this).val() + ',';
                            }
                        })
                        t = xh_remove_lastcomma(t);
                    } else {
                        $(this).find('option').each(function() {
                            var isselected = $(this).attr('selected');
                            if (isselected == 'selected') {
                                t = $(this).val();
                            }
                        })
                    }
                    break;
            }
            return t;
        }

    });
})(jQuery);



function xh_alert_load(start, text) {
    $('.xh-alert-load').remove();
    text = text == undefined || text == null ? '' : text;
    var h = '<div class="xh-alert-load"><div class="xh-alert-box">';
    h += '<i class="fa fa-spinner fa-spin"></i> ' + text + '</div></div>';
    $('body').prepend(h);
    if (start == 'show') {
        $('.xh-alert-load').show(200);
    } else if (start == 'hide') {
        $('.xh-alert-load').hide(200);
    } else {
        return;
    }
}

$(function() {

    xh_iframe(); // 页面高度初始化
    $('.xh-nav-child-down').parent('li').addClass("xh-nav-down-parent");
    $('.xh-nav-child-tdown').parent('li').addClass("xh-nav-down-parent");

    xh_uplist(); // 菜单栏初始化

    xh_select(); // 下拉菜单初始化

    xh_init_file(); // 上传按钮初始化

    xh_preview_file(); // 预览文件插件初始化

    $("body").on("mouseenter", ".xh-nav", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        $(xh_nav_id).addClass('xh-nav-manu');
        $(xh_nav_id).slideDown(200);
    });

    $("body").on("mouseleave", ".xh-nav", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        $(xh_nav_id).addClass('xh-nav-manu');
        $(xh_nav_id).stop().slideUp(200);
    });

    $("body").on("click", ".xh-nav", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        $(xh_nav_id).addClass('xh-nav-manu');
        $(xh_nav_id).show(200);
    });

    $("body").on("click", ".xh-nav-down", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        $('.xh-nav-child-down').parent('li').slideUp(200);
        $('.xh-nav-child-tdown').parent('li').slideUp(200);
        $(xh_nav_id).parent('li').slideToggle(200);
    });

    $("body").on("click", ".xh-nav-tdown", function() {
        var xh_nav_id = $(this).attr('xh-nav-id');
        $('.xh-nav-child-tdown').parent('li').slideUp(200);
        $(xh_nav_id).parent('li').slideToggle(200);
    });

    $('#xh-isopen').click(function() {
        var d = $(this).data('isopen');
        if (d == 1 || d == undefined) {
            $(".xh-menu").animate({ width: '0px' });
            $(".xh-menu").animate({ border: '0px' });
            $('.xh-context').animate({ left: '0px' });
            $('.xh-menu ul li').animate({ padding: '0' });
            $('.xh-menu').addClass('xh-ellipsis');
            $('.xh-menu-all').animate({ padding: '0' });
            $(this).data("isopen", "2");
        } else {
            $('.xh-menu').animate({ width: '235px' });
            $('.xh-context').animate({ left: '235px' });
            $('.xh-menu ul li').animate({ padding: '10px 10px 10px 20px' });
            $('.xh-menu').removeClass('xh-ellipsis');
            $('.xh-menu-all').animate({ padding: '10px 10px 10px 20px' });
            $(this).data("isopen", "1");
        }
    });

    $("body").on("click", ".xh-menu-all", function() {
        $('.xh-menu').attr('style', 'width:240px');
        $('.xh-context').attr('style', 'left:240px');
        $('.xh-menu ul li').attr('style', 'padding:10px 10px 10px 20px');
        $('.xh-menu').removeClass('xh-ellipsis');
        $('#xh-isopen').data("isopen", "1");
        //$('#xh-isopen').addClass('xh-p-events');
        var s = $('.xh-menu-all').attr('xh-show-id');
        $(s).show(400);
    });

    $("body").on("click", "#xh-back", function() {
        $('.xh-menu').attr('style', 'width:240px');
        $('.xh-context').attr('style', 'left:240px');
        $('.xh-menu ul li').attr('style', 'padding:10px 10px 10px 20px');
        $('.xh-menu').removeClass('xh-ellipsis');
        $('#xh-isopen').data("isopen", "1");
        //$('#xh-isopen').removeClass('xh-p-events');
        var s = $('.xh-menu-all').attr('xh-show-id');
        $(s).hide(400);
    });

    $('.xh-href').click(function() {
        var xh_href = $(this).attr('xh-href');
        if (xh_href != '') {
            $('.xh-text').find('iframe').css('display', 'none');
            $('#xh-menubar').find('li').removeClass("xh-tactive");
            var t_name = $(this).text();
            var bhegit = $(window).height();
            var text_hegit = bhegit * 1 - 120;
            var h = '<li xh-id="' + xh_href + '" >' + t_name + '<b class="fa fa-close"></b></li>';
            var ir = '<iframe src="' + xh_href + '" class="xh-iframe" style="height: ' + text_hegit + 'px"></iframe>';
            var a;
            $('.xh-iframe').each(function() {
                var d = $(this).attr('src');
                if (d == xh_href) {
                    a = 1;
                    $(this).css('display', 'block');
                }
            });
            if (a != 1) {
                $('.xh-text').append(ir);
                $('#xh-menubar').append(h);
            }
            $('#xh-menubar li').each(function() {
                var td = $(this).attr('xh-id');
                if (td == xh_href) {
                    $(this).addClass('xh-tactive');
                }
            });
            xh_uplist();
        }

    });

    $("body").on("click", "#xh-menubar li", function() {
        var t = $(this).attr('xh-id');
        $('#xh-menubar li').each(function() {
            var td = $(this).attr('xh-id');
            if (td == t) {
                $('#xh-menubar').find('li').removeClass("xh-tactive");
                $(this).addClass('xh-tactive');
            }
        });
        $('.xh-iframe').each(function() {
            var d = $(this).attr('src');
            if (d == t) {
                $('.xh-iframe').css('display', 'none');
                $(this).show();
            }
        });
        xh_uplist();
    });

    $("body").on("click", "#xh-menubar li .fa-close", function() {
        var obj = this;
        var t = $(this).parent('li').attr('xh-id');
        $('.xh-iframe').each(function() {
            var d = $(this).attr('src');
            if (d == t) {
                $(obj).parent('li').remove();
                $(this).remove();
                $('.xh-iframe').css('display', 'none');
                $('.xh-iframe:last').css('display', 'block')
            }
        });
        $('#xh-menubar').find('li').removeClass("xh-tactive");
        $('#xh-menubar li:last').addClass('xh-tactive');
        xh_uplist();
    });

    $("body").on("click", ".xh-alert-close", function() {
        $(this).parent('.xh-alert').hide(200);
    });

    $('#xh-refresh').click(function() {
        $(this).addClass('fa-spin');
        var obj = this;
        $('.xh-iframe').each(function() {
            if (!$(this).is(":hidden")) {
                var self = this;
                setTimeout(function() {
                    $(self).attr('src', $(self).attr('src'));
                    $(obj).removeClass('fa-spin');
                }, 400);
            }
        });
    });

    $("body").on("click", "#xh-menulist", function() {
        $('#xh-menu-list').slideToggle(200);
    });
    $("body").on("click", "#xh-menu-list li .fa-close", function() {
        var obj = this;
        var t = $(this).parent('li').attr('xh-href');
        $('.xh-iframe').each(function() {
            var d = $(this).attr('src');
            if (d == t) {
                $(obj).parent('li').remove();
                $(this).remove();
                $('.xh-iframe').css('display', 'none');
                $('.xh-iframe:last').css('display', 'block')
            }
        });
        $('#xh-menubar li').each(function() {
            var td = $(this).attr('xh-id');
            if (td == t) {
                $(this).remove();
            }
        });
        $('#xh-menubar').find('li').removeClass("xh-tactive");
        $('#xh-menubar li:last').addClass('xh-tactive');
        xh_uplist();
    });

    $("body").on("click", "#xh-menu-list li", function() {
        var obj = this;
        var t = $(this).attr('xh-href');
        $('#xh-menubar li').each(function() {
            var td = $(this).attr('xh-id');
            if (td == t) {
                $('#xh-menubar').find('li').removeClass("xh-tactive");
                $(this).addClass('xh-tactive');
            }
        });
        $('.xh-iframe').each(function() {
            var d = $(this).attr('src');
            if (d == t) {
                $('.xh-iframe').css('display', 'none');
                $(this).show();
            }
        });
        xh_uplist();
    });

    $(document).bind("click", function(e) {　　　　　　
        var target = $(e.target);　　　　　　
        if (target.closest(".xh-select").length == 0) {　
            $(".xh-selext-text").slideUp(200);　　　　　　
        }　　　　　　　　　　
    })

    $('body').on('click', '.xh-dropdown-toggle', function() {
        var isdisabled = $(this).parent('.xh-select').siblings('.xh-selectpicker').attr('disabled');
        if (isdisabled != 'disabled') {
            var display = $(this).siblings('.xh-selext-text').css('display');
            if (display == 'none') {
                $(this).siblings('.xh-selext-text').slideDown(200);
            } else {
                $(this).siblings('.xh-selext-text').slideUp(200);
            }
        }
    })

    $('body').on('click', '#xh-fullscreen', function() {

        if ($(this).hasClass('fa-expand')) {
            $(this).addClass('fa-compress');
            $(this).removeClass('fa-expand');
            xh_fullscreen();
        } else {
            $(this).addClass('fa-expand');
            $(this).removeClass('fa-compress');
            xh_exitFullscreen();
        }

    })

})

function xh_fullscreen() {
    elem = document.body;
    if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.requestFullScreen) {
        elem.requestFullscreen();
    } else {
        //浏览器不支持全屏API或已被禁用
        alert('您的浏览器不支持全屏API或已被禁用');
    }
}

function xh_exitFullscreen() {
    var elem = document;
    if (elem.webkitCancelFullScreen) {
        elem.webkitCancelFullScreen();
    } else if (elem.mozCancelFullScreen) {
        elem.mozCancelFullScreen();
    } else if (elem.cancelFullScreen) {
        elem.cancelFullScreen();
    } else if (elem.exitFullscreen) {
        elem.exitFullscreen();
    } else {
        //浏览器不支持全屏API或已被禁用
        alert('您的浏览器不支持全屏API或已被禁用');
    }
}

function xh_uplist() {
    var lh = '<ul id="xh-menu-list">';
    var i = 1;
    $('#xh-menubar li').each(function() {
        var d = $(this).attr('xh-id');
        var szclass = $(this).hasClass('xh-tactive') ? "xh-lactive" : '';
        if (i == 1) {
            var h = $(this).html();
            lh += '<li class="xh-href ' + szclass + '" xh-href="' + d + '">' + h + '</li>';
        } else {
            var name = $(this).text();
            lh += '<li class="xh-href ' + szclass + '" xh-href="' + d + '">' + name + ' <b class="fa fa-close"></b></li>';
        }
        i++;
    });
    lh += '</ul>';
    $('#xh-menulist').html(lh);
}


function xh_iframe() {
    var bhegit = $(window).height();
    var text_hegit = bhegit * 1 - 50;
    $('.xh-menu').attr('style', 'height:' + text_hegit + "px");
    $('.xh-context').attr('style', 'height:' + text_hegit + "px");
    $('.xh-context').find('iframe').attr('style', 'height:' + (text_hegit * 1 - 70) + "px");
    $('.xh-text').attr('style', 'height:' + (text_hegit * 1 - 40) + "px");
}

function xh_winchang(option) {
    var obj = this;
    this.el = option.el;
    this.clickel = option.clickel;

    $("body").off("click").on("click", obj.clickel, function() {
        // isfd 1 放大 2 缩小
        var isfd = $(this).data('isfd');
        if (isfd == 2) {
            $(obj.el).removeClass("xh-wchang-fd");
            $(obj.clickel).addClass('fa-window-maximize');
            $(obj.clickel).removeClass('fa-window-restore');
            var style = $(this).data('style');
            $(obj.el).attr('style', '');
            style != undefined ? $(obj.el).attr('style', style) : '';
            $(this).data('isfd', 1);
        } else {
            $(obj.el).addClass("xh-wchang-fd");
            var style = $(obj.el).attr('style');
            $(this).data('style', style);
            $(obj.el).attr('style', '');
            $(obj.el).css({ 'width': '100%', 'margin': '0px' });
            $(obj.clickel).removeClass('fa-window-maximize');
            $(obj.clickel).addClass('fa-window-restore');
            $(this).data('isfd', 2);
        }

    })
}

function xh_slider(option) {
    var slider = false;
    var isyz = false;
    this.el = option.el;
    var startX;
    var box = '<div class="xh-slider-box"><div class="xh-slider-bar"></div>'
    box += '<div class="xh-slider-move"><i class="fa fa-angle-double-right"></i></div>';
    box += '<div class="xh-silder-text">拖动滑块验证</div></div>';
    box += '</div>';
    $(this.el).append(box);

    $("body").on("mousedown", ".xh-slider-move", function(e) {
        slider = true;
        iX = e.clientX - this.offsetLeft;
    });

    $("body").on("mousemove", ".xh-slider-move", function(e) {
        if (slider) {
            var oX = e.clientX - iX;
            var max_width = $(this).parent('.xh-slider-box').width();
            var slider_width = $(this).width();
            oX = oX < 0 ? 0 : oX;
            oX = oX > max_width - slider_width ? max_width - slider_width : oX;
            $(this).css({ 'left': oX + 'px' });
            $(this).siblings('.xh-slider-bar').css('width', oX + 'px');
            if (oX >= (max_width - slider_width)) {
                var i = '<i class="fa fa-check"></i>';
                $(this).addClass("xh-slider-success");
                $(this).html(i);
                $(this).siblings('.xh-silder-text').text('验证成功');
                isyz = true;
                xh_slider_unbind(this);
                option.success('success');
            }
        }

    })

    $("body").on("mouseup", ".xh-slider-move", function() {
        if (isyz) {
            xh_slider_unbind(this);
        } else {
            var i = '<i class="fa fa-angle-double-right"></i>';
            $(this).html(i);
            $(this).removeClass("xh-slider-success");
            $(this).css({ 'left': '0px' });
            $(this).siblings('.xh-slider-bar').css('width', '0px');
        }
        slider = false;
        $(this).off("mousedown"); // 清除事件

    });

    $("body").on("mouseleave", ".xh-slider-move", function() {
        if (isyz) {
            xh_slider_unbind(this);
        } else {
            var i = '<i class="fa fa-angle-double-right"></i>';
            $(this).html(i);
            $(this).removeClass("xh-slider-success");
            $(this).css({ 'left': '0px' });
            $(this).siblings('.xh-slider-bar').css('width', '0px');
        }
        slider = false;
        $(this).off("mousedown"); // 清除事件

    });

    $("body").on("touchstart", ".xh-slider-move", function(e) {
        slider = true;
        startX = e.originalEvent.changedTouches[0].pageX;
    });

    $("body").on("touchmove", ".xh-slider-move", function(e) {
        if (slider) {
            var oX = e.originalEvent.changedTouches[0].pageX - startX;
            var max_width = $(this).parent('.xh-slider-box').width();
            var slider_width = $(this).width();
            oX = oX < 0 ? 0 : oX;
            oX = oX > max_width - slider_width ? max_width - slider_width : oX;
            $(this).css({ 'left': oX + 'px' });
            $(this).siblings('.xh-slider-bar').css('width', oX + 'px');
            if (oX >= (max_width - slider_width)) {
                var i = '<i class="fa fa-check"></i>';
                $(this).addClass("xh-slider-success");
                $(this).html(i);
                $(this).siblings('.xh-silder-text').text('验证成功');
                isyz = true;
                xh_slider_unbind(this);
                option.success('success');
            }
        }

    })

    $("body").on("touchend", ".xh-slider-move", function() {
        if (isyz) {
            xh_slider_unbind(this);
        } else {
            var i = '<i class="fa fa-angle-double-right"></i>';
            $(this).html(i);
            $(this).removeClass("xh-slider-success");
            $(this).css({ 'left': '0px' });
            $(this).siblings('.xh-slider-bar').css('width', '0px');
        }
        slider = false;
        $(this).off("touchend"); // 清除事件
    });


}

function xh_slider_unbind(obj) {
    $("body").unbind("mousemove");
    $("body").unbind("mouseup");
    $("body").unbind("mousedown");
    $("body").unbind("touchstart");
    $("body").unbind("touchmove");
    $("body").unbind("touchend");
}

function xh_select() {
    $('.xh-selectpicker').each(function() {
        $(this).hide();
        var classname = $(this).attr('class');
        if (classname != undefined) {
            classname = classname.replace('xh-selectpicker', '');
            var width = $(this).attr('xh-select-width');
            width = width != undefined && width != '' && width != 'null' ? width : '';
            var title = $(this).attr('xh-title');
            var isdisabled = $(this).attr('disabled');
            var hdis = isdisabled != 'disabled' ? '' : 'xh-disabled';
            var style = $(this).attr('xh-select-style');
            //console.log(style);
            var classys = '';
            if (style == 'info') {
                classys = 'xh-select-info';
            } else if (style == 'warm') {
                classys = 'xh-select-warm';
            } else if (style == 'success') {
                classys = 'xh-select-success';
            } else if (style == 'danger') {
                classys = 'xh-select-danger';
            }
            //console.log(classys);
            var xh_size = $(this).attr('xh-size');
            var max_height = xh_size * 39;
            var h = '<div class="' + classname + ' xh-select ' + hdis + ' ' + classys + '" style="width:' + width + ';">';
            var bt = '<div class="xh-selext-text" style="height:' + max_height + 'px">';
            var isreal = $(this).attr('xh-real-search');
            bt += isreal == 'true' ? '<div class="xh-boxsearch xh-from-box"><input type="text" class="xh-input"></div>' : '';
            bt += '<ul><li>' + title + '<i class="fa fa-check xh-fright xh-displaynone-im"></i></li>';
            $(this).find('option').each(function() {
                var t = $(this).text();
                if (title == undefined || title == '' || title == 'null') {
                    title = t;
                }
                bt += '<li>' + t + '<i class="fa fa-check xh-fright xh-displaynone-im"></i></li>';
            })
            bt += '</ul></div>';
            h += '<button class="xh-btn xh-dropdown-toggle ' + hdis + '"><span class="xh-fleft xh-dropdown-title">' + title + '</span><span class="xh-caret"><i class="fa fa-caret-down xh-dropdown-ico"></i><span></button>';
            h += bt;
            h += '</div>';
            $(this).before(h);
        }
    })

    $("body").on("input propertychange", ".xh-boxsearch input", function() {
        var t = $(this).val();
        $(this).parent('.xh-boxsearch').siblings('ul').find('li').addClass('xh-displaynone-im');
        if (t != '') {
            $(this).parent('.xh-boxsearch').siblings('ul').find('li').each(function() {
                var opset = $(this).text();
                if (opset.indexOf(t) != -1) {
                    $(this).removeClass('xh-displaynone-im');
                }
            });
        } else {
            $(this).parent('.xh-boxsearch').siblings('ul').find('li').removeClass('xh-displaynone-im');
        }


    })

    $('body').on('click', '.xh-selext-text li', function() {
        var isdisabled = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').attr('disabled');
        var title = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').attr('xh-title');
        if (isdisabled != 'disabled') {
            var isMultiple = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').attr("multiple");
            var xzz = $(this).text();
            var ytitle = $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text();
            var maxnum = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').attr('xh-max-number');
            var yi = $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').data('i');
            if ($(this).find('.fa-check').hasClass('xh-displaynone-im')) {
                var obj = this;
                if (isMultiple == 'multiple') {
                    var newxzz = '';
                    if (maxnum != undefined && !isNaN(parseInt(maxnum)) && maxnum != '' && maxnum != null) {
                        var i = yi == undefined || yi == '' || yi == 'null' ? 0 : yi;
                        $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find('option').each(function() {
                            if (i < parseInt(maxnum)) {
                                $(obj).find('.fa-check').removeClass('xh-displaynone-im');
                                $(obj).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').addClass('xh-xzselect');
                                $(obj).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", true);
                                if ($(this).attr('selected') == 'selected') {
                                    newxzz += $(this).text() + ',';
                                }
                            }
                        })
                        newxzz = xh_remove_lastcomma(newxzz);
                        newxzz = newxzz == '' ? ytitle : newxzz;
                        i++;
                        $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').data('i', i);
                        $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(newxzz);
                    } else {
                        $(this).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').addClass('xh-xzselect');
                        $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", true);
                        $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings(".xh-selectpicker").find('option:selected').each(function() {
                            newxzz += $(this).text() + ',';
                        })
                        newxzz = xh_remove_lastcomma(newxzz);
                        $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(newxzz);
                    }
                } else {
                    $(this).parent('ul').find('.fa-check').addClass('xh-displaynone-im');
                    $(this).find('.fa-check').removeClass('xh-displaynone-im');
                    $(this).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').addClass('xh-xzselect');
                    $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find('option').attr("selected", false);
                    $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", true);
                    $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(xzz);
                }
            } else {
                $(this).find('.fa-check').addClass('xh-displaynone-im');
                if (isMultiple == 'multiple') {
                    var yt = $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text();
                    if (maxnum != undefined && !isNaN(parseInt(maxnum)) && maxnum != '' && maxnum != null) {
                        var j = yi != undefined ? yi - 1 : 0;
                        $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').data('i', j);
                    }
                    if (yt != '') {
                        yt = yt + ',';
                        var arrt = yt.split(',');
                        var newt = '';
                        for (var i = 0; i < arrt.length - 1; i++) {
                            if (arrt[i] != xzz) {
                                newt += arrt[i] + ',';
                            }
                        }
                        newt = xh_remove_lastcomma(newt);
                        if (newt == '') {
                            newt = title;
                            $(this).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').removeClass('xh-xzselect');
                        }
                    }
                    $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", false);
                    $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(newt);
                } else {
                    $(this).parent('ul').parent('.xh-selext-text').siblings('.xh-dropdown-toggle').removeClass('xh-xzselect');
                    $(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').siblings('.xh-selectpicker').find("option:contains('" + xzz + "')").attr("selected", false);
                    $(this).parent('ul').parent('.xh-selext-text').siblings('button').find('.xh-dropdown-title').text(title);
                }
            }
            isMultiple == 'multiple' ? '' : $(this).parent('ul').parent('.xh-selext-text').slideUp(200);
            //alert($(this).parent('ul').parent('.xh-selext-text').parent('.xh-select').html());
        }
    })

}

function xh_remove_lastcomma(str) {
    var reg = /,$/gi;
    str = str.replace(reg, "");
    return str;
}

function xh_file(option) {

}

function xh_init_file() {
    var ismultiple;
    $('.xh-file').each(function() {
        ismultiple = $(this).attr('multiple');
        var title = $(this).attr('xh-title');
        var yh = $(this).prop("outerHTML");
        var id = $(this).attr('id');
        if (ismultiple == 'multiple') {
            var h = '<div class="xh-initfile-multiple-box"><div class="xh-mu-box">' + yh + '<div class="xh-mu-img addmufile"><img src="./public/image/image.png"></div></div><div class="xh-clearfix"></div></div>';
        } else {
            title = title != '' && title != undefined && title != 'null' ? title : '上传文件';
            var h = '<div class="xh-initfile-box xh-input-group"><input type="text" class="xh-input xh-disabled" disabled><span class="xh_xz_filestyle xh-group-btn-input"><label for="' + id + '">' + yh + '<button class="xh-btn"><i class="fa fa-file"></i> ' + title + '</button></label></span></div>';
        }
        $(this).before(h);
        $(this).remove();

        $('body').on('change', '#' + id, function() {
            var file = this.files;
            var fileinfo = "";
            if (ismultiple == 'multiple') {
                for (var i = 0; i < file.length; i++) {
                    var name = file[i]['name'];
                    var size = gettoDecimal(file[i]['size'] / 1024 / 1024);
                    var type = xh_get_suffix(name);
                    fileinfo += '<div class="xh-mu-img">';
                    if (type == 'png' || type == 'jpg' || type == 'jpeg' || type == 'gif') {
                        var url = getObjectURL(file[i]);
                        fileinfo += '<img src="' + url + '"><div class="fileinfo">' + name + ' | ' + size + 'MB</div><div class="fileoperation"><i class="fa fa-trash-o removefile"></i><i class="fa fa-search-plus"></i></div>';
                    }
                    fileinfo += '</div>';
                    $('#' + id).parent('.xh-mu-box').append(fileinfo);
                }
            } else {
                for (var i = 0; i < file.length; i++) {
                    var name = file[i]['name'];
                    var size = gettoDecimal(file[i]['size'] / 1024 / 1024);
                    fileinfo += '文件名称：' + name + ' | 文件大小：' + size + 'MB,';
                }
                fileinfo = xh_remove_lastcomma(fileinfo);
                $(this).parent('label').parent('.xh_xz_filestyle').siblings('input[type=text]').val(fileinfo);
            }
        });

        $('body').on('click', '.removefile', function() {

        })
    });

    // 单个文件点击上传
    $('body').on('click', '.xh-initfile-box button', function() {
        $(this).siblings('input[type=file]').click();
    })

    /*
    $('body').on('change', '.xh-initfile-box input[type=file]', function() {
        var file = this.files;
        var fileinfo = "";
        for (var i = 0; i < file.length; i++) {
            var name = file[i]['name'];
            var size = gettoDecimal(file[i]['size'] / 1024);
            fileinfo += '文件名称：' + name + ' | 文件大小：' + size + 'kb,';
        }
        fileinfo = xh_remove_lastcomma(fileinfo);
        $(this).parent('label').parent('.xh_xz_filestyle').siblings('input[type=text]').val(fileinfo);
    })*/

    // 多个文件点击上传
    $('body').on('click', '.addmufile', function() {
        $(this).siblings('input[type=file]').click();
    });
}

function xh_preview_file() {
    $('.xh-preview-file').each(function() {
        $('#xh-preview-modal').remove();
        var src = $(this).attr('xh-pre-src');
        var type = xh_get_suffix(src);
        var bhegit = $(window).height();
        var groud = $(this).attr('xh-preview-groud');

        $(this).click(function() {
            var ismufile = $(this).attr('xh-mufile');
            var h = '<div id="xh-preview-modal" class="xh-preview-modal"><div class="xh-preview-menu"><sn class="fa fa-close xh-preview-close"></span></div>';
            h += ismufile == 'true' ? '<div class="xh-preview-move"></div><input type="hidden" id="groud" value="' + groud + '" xh-url="' + src + '"><div class="xh-preview-left"><i class="fa fa-chevron-left"></i></div><div class="xh-preview-right"><i class="fa fa-chevron-right"></i></div>' : '';
            h += '<div class="xh-preview-content">';
            var v_h = bhegit - 90;
            if (xh_isimg(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><img src="' + src + '"></div>';
                var a = 1;
            } else if (xh_isvideo(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><video controls autoplay><source src="' + src + '" type="video/mp4"><source src="' + src + '" type="video/ogg">XH框架提醒：您的浏览器不支持 video 属性。</video></div>';
                var a = 1;
            } else if (xh_isword(type) || xh_isexcel(type) || xh_isppt(type)) {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="https://view.officeapps.live.com/op/view.aspx?src=' + src + '"></iframe></div>';
                var a = 1;
            } else {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="' + src + '"></iframe></div>';
                var a = 1;
            }

            h += '</div></div>';
            if (a == 1) {
                $('body').prepend(h);
                $('#xh-preview-modal').show();
            }
        });
    });

    $('body').on('click', '.xh-preview-close', function() {
        $('#xh-preview-modal').hide(200);
        $('#xh-preview-modal').remove();
    })

    $('body').on('click', '.xh-preview-left', function() {
        var groud = $('#groud').val();
        var url = $('#groud').attr('xh-url');
        var arr = [];
        var i = 0;
        var sort = '';
        var bhegit = $(window).height();
        $('.xh-preview-file').each(function() {
            var gsroud = $(this).attr('xh-preview-groud');
            var src = $(this).attr('xh-pre-src');
            if (groud == gsroud) {
                arr.push(src);
                sort = url == src ? i : sort;
                i++;
            }
        });
        //console.log(arr);
        //console.log(sort);
        //console.log(arr[sort]);
        sort = sort == 0 ? i : sort;
        var h = '';
        if (sort > 0) {
            var newsrc = arr[sort - 1];
            var type = xh_get_suffix(arr[sort - 1]);
            var v_h = bhegit - 90;
            if (xh_isimg(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><img src="' + newsrc + '"></div>';
                var b = 1;
            } else if (xh_isvideo(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><video controls autoplay><source src="' + newsrc + '" type="video/mp4"><source src="' + newsrc + '" type="video/ogg">XH框架提醒：您的浏览器不支持 video 属性。</video></div>';
                var b = 1;
            } else if (xh_isword(type) || xh_isexcel(type) || xh_isppt(type)) {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="https://view.officeapps.live.com/op/view.aspx?src=' + newsrc + '"></iframe></div>';
                var b = 1;
            } else {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="' + newsrc + '"></iframe></div>';
                var b = 1;
            }
            if (b == 1) {
                $('#groud').val(groud);
                $('#groud').attr('xh-url', newsrc);
                $('#xh-preview-modal').find('.xh-preview-content').html(h);
            }
        }
    })

    $('body').on('click', '.xh-preview-right', function() {
        var groud = $('#groud').val();
        var url = $('#groud').attr('xh-url');
        var arr = [];
        var i = 0;
        var sort = 0;
        var bhegit = $(window).height();
        $('.xh-preview-file').each(function() {
            var gsroud = $(this).attr('xh-preview-groud');
            var src = $(this).attr('xh-pre-src');
            if (groud == gsroud) {
                arr.push(src);
                sort = url == src ? i : sort;
                i++;
            }
        });
        //console.log(arr);
        //console.log(sort);
        //console.log(arr[sort]);
        var h = '';
        sort = sort == i - 1 ? -1 : sort;
        if (sort < i) {
            var newsrc = arr[sort * 1 + 1];
            var type = xh_get_suffix(newsrc);
            var v_h = bhegit - 90;
            if (xh_isimg(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><img src="' + newsrc + '"></div>';
                var b = 1;
            } else if (xh_isvideo(type)) {
                h += '<div style="max-height:' + v_h + 'px;padding:15px 40px;"><video controls autoplay><source src="' + newsrc + '" type="video/mp4"><source src="' + newsrc + '" type="video/ogg">XH框架提醒：您的浏览器不支持 video 属性。</video></div>';
                var b = 1;
            } else if (xh_isword(type) || xh_isexcel(type) || xh_isppt(type)) {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="https://view.officeapps.live.com/op/view.aspx?src=' + newsrc + '"></iframe></div>';
                var b = 1;
            } else {
                h += '<div style="height:' + v_h + 'px;padding:15px 40px;"><iframe src="' + newsrc + '"></iframe></div>';
                var b = 1;
            }
            if (b == 1) {
                $('#groud').val(groud);
                $('#groud').attr('xh-url', newsrc);
                $('#xh-preview-modal').find('.xh-preview-content').html(h);
            }
        }
    });

    // 移动端手指滑动屏幕
    var pre_slider = false;
    var pdfx;
    $("body").on("touchstart", ".xh-preview-move", function(e) {
        pre_slider = true;
        startX = e.originalEvent.changedTouches[0].pageX;
    });

    $("body").on("touchmove", ".xh-preview-move", function(e) {
        if (pre_slider) {
            var oX = e.originalEvent.changedTouches[0].pageX - startX;
            var max_width = $(window).width();
            //console.log(oX + '--' + max_width);
            if (oX > 0 && Math.abs(oX) > Math.floor(max_width / 4)) { // 向左
                //alert('向左');
                pdfx = 1;
            } else if (oX < 0 && Math.abs(oX) > Math.floor(max_width / 4)) { // 向右
                //alert('向右');
                pdfx = 2;
            }
        }
    })

    $("body").on("touchend", ".xh-preview-move", function() {
        pre_slider = false;
        $(this).off("touchend"); // 清除事件
        if (pdfx == 1) {
            $('.xh-preview-left').click();
        } else if (pdfx == 2) {
            $('.xh-preview-right').click();
        }
    });

}

// 四舍五入保留两位小数
function gettoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        return false;
    }
    result = Math.round(num * 100) / 100;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

// 去掉最后的逗号
function xh_remove_lastcomma(str) {
    var reg = /,$/gi;
    str = str.replace(reg, "");
    return str;
}

// 获取文件后缀名
function xh_get_suffix(file) {
    return file.substr(file.lastIndexOf(".") + 1);
}

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function xh_isimg(type) {
    if (type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'pjpeg' || type == 'gif' || type == 'bmp' || type == 'x-png') {
        return true;
    }
    return false;
}

function xh_isvideo(type) {
    if (type == 'mp4' || type == 'ogg') {
        return true;
    }
    return false;
}

function xh_isword(type) {
    if (type == 'doc' || type == 'docx') {
        return true;
    }
    return false;
}

function xh_isexcel(type) {
    if (type == 'xls' || type == 'xlsx') {
        return true;
    }
    return false;
}

function xh_isppt(type) {
    if (type == 'ppt' || type == 'pptx') {
        return true;
    }
    return false;
}