(function (global) {
    var app = global.app = global.app || {};

    coa_inform = kendo.data.ObservableObject.extend({
        dataInform: [],
        dataInformDetail: null,
        SLA: [],
        fontSize: [],
        dataVisible: [],
        dataFileName: [],
        submittedImage: "",
        _pageSize: app.configService.pageSize,
        listPage: 0,
        isInform: false,
        isEndless: false,

        defaultFunction: function () {
        },
        createUI: function (e) {
            $("#ul_inform").kendoMobileListView({
                dataSource: this.dataInform,
                template: $("#inform-template").text(),
                filterable: {
                    field: "TEXT_SEARCH_ALL",
                    operator: "contains"
                },
                pullToRefresh: true,
                autoBind: false,
                //endlessScroll: true,
                //loadMore: true,
                virtualViewSize: 500,
                //serverPaging: false,
                click: app.coa_informService.viewModel.informDetail
            });
        },
        setInformViewed: function () {
            app.updateBadgeService.viewModel.setBadge("inform_badge", -1);
            var that = app.coa_informService.viewModel;
            that.dataInformDetail.PROCESSED_ACCESS_TYPE = "MOBILE";
            var dataValue = {
                "SELECTED_ITEM": that.dataInformDetail,
                "TOKEN": localStorage.getItem("TOKEN"),
                "USER_ID": localStorage.getItem("USER_ID"),
                "VERSION": localStorage.getItem("VERSION")
            };

            $.ajax({
                beforeSend: app.loginService.viewModel.checkOnline,
                url: app.configService.serviceUrl + "api/InformViewed",
                type: "POST",
                data: JSON.stringify(dataValue),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function (response) {
                    app.application.hideLoading();
                    console.log(JSON.stringify(response.RESULTS));
                    if (response.RESPONSE_CODE == "0000") {
                        //that.dataInform.data(response.RESULTS);
                        //operation.success(response.RESULTS);
                    } else {
                        app.coa_boxService.viewModel.setWarning(1, response.RESPONSE_MSG);
                    }
                },
                error: function (xhr, error) {
                    app.application.hideLoading();
                    console.log("ERROR : ajax :: service fail! ::");
                    console.log(xhr.status + ' ' + xhr.statusText + ' :: ' + xhr.responseText);
                    app.coa_boxService.viewModel.setWarning(xhr.status, xhr.responseText);
                }
            });
        },
        checkV: function (fileName) {
            if (fileName != null) {
                return true;
            } else {
                return false
            }
        },
        checkF: function (fileName, id) {
            if (fileName !== null) {
                var arr = fileName.split("/");
                var fName = arr[arr.length - 1];
                if (fName.search(".doc") >= 0) {
                    $("#" + id).attr('src', 'images/icon_doc44.png');
                } else if (fName.search(".pdf") >= 0) {
                    $("#" + id).attr('src', 'images/icon_pdf44.png');
                } else if (fName.search(".xls") >= 0) {
                    $("#" + id).attr('src', 'images/icon_xls44.png');
                } else {
                    $("#" + id).attr('src', 'images/none.png');
                }
                return fName;
            } else {
                return "";
            }
        },
        showDetail: function () {
            var that = app.coa_informService.viewModel;
            if (that.get("dataInformDetail") == null) {
                var that = app.coa_informService.viewModel;
                var dataItem = JSON.parse(localStorage.getItem('dataInformDetail'));
                that.set("dataInformDetail", dataItem);
                that.set("fontSize", {
                    "header": app.coa_settingService.viewModel.fontSize + 6 + "px",
                    "dateTime": app.coa_settingService.viewModel.fontSize - 2 + "px",
                    "detail": app.coa_settingService.viewModel.fontSize + "px"
                });
                console.log(that.get("dataInformDetail"));


                that.set('dataVisible', {
                    file1: that.checkV(dataItem.ATTACHED_FILE_NAME1),
                    file2: that.checkV(dataItem.ATTACHED_FILE_NAME2),
                    file3: that.checkV(dataItem.ATTACHED_FILE_NAME3)
                });
                that.set('dataFileName', {
                    fileName1: that.checkF(dataItem.ATTACHED_FILE_NAME1, "I_FileIcon1"),
                    fileName2: that.checkF(dataItem.ATTACHED_FILE_NAME2, "I_FileIcon2"),
                    fileName3: that.checkF(dataItem.ATTACHED_FILE_NAME3, "I_FileIcon3")
                });

                console.log(JSON.stringify(that.dataVisible));
                if (that.dataVisible.file1 || that.dataVisible.file2 || that.dataVisible.file3) {
                    $('.div_allFile').show();
                } else {
                    $('.div_allFile').hide();
                }

                var start = moment(dataItem.CREATED, "YYYY-MM-DD HH:mm:ss").calendar();
                var end = moment(dataItem.SLA_END_DT, "YYYY-MM-DD HH:mm:ss").calendar();

                that.set("SLA", {
                    "start": start,
                    "end": end
                });

                that.set('submittedImage', app.configService.imageUrl + '' + dataItem.PROFILE_IMAGE_NAME + '?' + localStorage.getItem("uTime"));
                //location = '#tbs-inform';
            }
        },
        informDetail: function (e) {
            var that = app.coa_informService.viewModel;
            var dataItem = e.dataItem;
            if (typeof e.dataItem === "undefined") {
            } else {

                that.set("dataInformDetail", e.dataItem);
                that.set("fontSize", {
                    "header": app.coa_settingService.viewModel.fontSize + 6 + "px",
                    "dateTime": app.coa_settingService.viewModel.fontSize - 2 + "px",
                    "detail": app.coa_settingService.viewModel.fontSize + "px"
                });
                console.log(that.get("dataInformDetail"));
                if (e.dataItem.PROCESSED_FLG != "READ") {
                    that.setInformViewed();// call api/InformViewed
                }

                that.set('dataVisible', {
                    file1: that.checkV(dataItem.ATTACHED_FILE_NAME1),
                    file2: that.checkV(dataItem.ATTACHED_FILE_NAME2),
                    file3: that.checkV(dataItem.ATTACHED_FILE_NAME3)
                });
                that.set('dataFileName', {
                    fileName1: that.checkF(dataItem.ATTACHED_FILE_NAME1, "I_FileIcon1"),
                    fileName2: that.checkF(dataItem.ATTACHED_FILE_NAME2, "I_FileIcon2"),
                    fileName3: that.checkF(dataItem.ATTACHED_FILE_NAME3, "I_FileIcon3")
                });
                console.log(JSON.stringify(that.dataVisible));
                if (that.dataVisible.file1 || that.dataVisible.file2 || that.dataVisible.file3) {
                    $('.div_allFile').show();
                } else {
                    $('.div_allFile').hide();
                }

                var start = moment(e.dataItem.CREATED, "YYYY-MM-DD HH:mm:ss").calendar();
                var end = moment(e.dataItem.SLA_END_DT, "YYYY-MM-DD HH:mm:ss").calendar();

                that.set("SLA", {
                    "start": start,
                    "end": end
                });

                that.set('submittedImage', app.configService.imageUrl + '' + dataItem.PROFILE_IMAGE_NAME + '?' + localStorage.getItem("uTime"));

                localStorage.setItem("dataInformDetail", JSON.stringify(that.get("dataInformDetail")));
                console.log(localStorage.getItem('dataInformDetail'));
                app.application.navigate(
                                    '#inform_detail'
                                );
            }
        },
        fill_150: function () {
            var that = app.coa_informService.viewModel;

            var winH = $(window).height();
            //var totalR = that.dataInform.total();
            var totalR = that.dataInform.total();
            var maxForScroll = Math.round(winH / 100);
            var rowFill = (maxForScroll - totalR) - 1;

            that.isEndless = true;

            console.log('fill_150::winH:' + winH + '::totalR:' + totalR + '::maxForScroll:' + maxForScroll + '::Math.round(rowFill * 150)::' + Math.round(rowFill * 150));
            if (totalR > maxForScroll) {
                $('.div_150i').hide();
                $('#div_inform_loadmore').show();
            } else {
                if (totalR != 0) {
                    $('.div_150i').show();
                    $('.div_150i').css("height", Math.round(rowFill * 100));
                } else {
                    $('#div_inform_loadmore').hide();
                    $('.div_150i').hide();
                }
            }
            $("#div_inform_scroller").data("kendoMobileScroller").reset();
        },
        loadData: function () {
            app.application.showLoading();
            var that = app.coa_informService.viewModel;

            var dsSort = [];
            //dsSort.push({ field: "PROCESSED_FLG", dir: "desc" });
            //dsSort.push({ field: "SLA_END_DT", dir: "asc" });
            //dsSort.push({ field: "CREATED", dir: "desc" });
            that.dataInform = new kendo.data.DataSource({
                transport: {
                    read: function (operation) {
                        console.log('=============read=loadData================');
                        var dataValue = {
                            "TRAN_TYPE": "I",
                            "TOKEN": localStorage.getItem("TOKEN"),
                            "USER_ID": localStorage.getItem("USER_ID"),
                            "VERSION": localStorage.getItem("VERSION")
                        };
                        $.ajax({
                            beforeSend: app.loginService.viewModel.checkOnline,
                            url: app.configService.serviceUrl + "api/GetApprovalTransaction",
                            type: "POST",
                            data: JSON.stringify(dataValue),
                            dataType: "json",
                            contentType: 'application/json; charset=UTF-8',
                            success: function (response) {

                                app.application.hideLoading();
                                //console.log(JSON.stringify(response.RESULTS));
                                var countInform = 0;
                                if (response.RESPONSE_CODE == "0000") {
                                    if (response.RESULTS.length <= 0) {
                                        $(".km-filter-form").hide();
                                        $("#div_inform_noItem").show();
                                    } else {
                                        $("#div_inform_noItem").hide();
                                        //$(".km-filter-form").show();

                                    }

                                    $.each(response.RESULTS, function (i, item) {
                                        if (item.PROCESSED_FLG == "WAIT") {
                                            countInform++;
                                        }
                                    });
                                    setTimeout(function () {
                                        app.updateBadgeService.viewModel.setBadge("inform_badge", countInform);
                                    }, 200);

                                    //that.dataInform.data(response.RESULTS);
                                    operation.success(response.RESULTS);
                                    that.fill_150();
                                } else {
                                    app.coa_boxService.viewModel.setWarning(1, response.RESPONSE_MSG);
                                }
                                //$("#div_inform_scroller").data("kendoMobileScroller").reset();
                                $(".km-filter-form").hide();
                                //$("#div_inform_scroller").data("kendoMobileScroller").reset();
                            },
                            error: function (xhr, error) {
                                app.application.hideLoading();
                                console.log("ajax :: service fail! ::");
                                console.log(xhr);
                                console.log(error);
                                app.coa_boxService.viewModel.setWarning(xhr.status, xhr.responseText);
                            }
                        });

                    }
                }
            });
            $("#ul_inform").data("kendoMobileListView").setDataSource(that.dataInform);
            that.dataInform.pageSize(that._pageSize);
            //alert(that._pageSize);
        }
        //----------------------------------------- end viewModel -----------------------------------------

    });

    app.coa_informService = {
        init: function () {
            app.coa_informService.viewModel.createUI();
            var checkScroll = true;
            var that = app.coa_informService.viewModel;

            var scroller = $("#div_inform_scroller").data("kendoMobileScroller");
            scroller.bind("scroll", function (e) {
                if (e.scrollTop <= 10) {
                    var total = app.coa_informService.viewModel.dataInform.total();
                    var valSearch = $('#div_inform_scroller').find('input[type=search]').val();
                    //console.log('valSearch: ' + valSearch);
                    if (total == 0 && valSearch == "") {
                        $(".km-filter-form").hide();
                    } else {
                        $(".km-filter-form").show();
                    }
                    $("#div_show_noneFilter_inform").hide();
                } else {
                    $(".km-filter-form").hide();
                    $("#div_show_noneFilter_inform").show();

                }
                var divH = $("#div_inform_scroller").data("kendoMobileScroller").scrollHeight();
                var winH = $(window).height();
                var tt = that.dataInform.total();
                var maxForScroll = Math.round((winH - 150) / 120);
                var nowH = (e.scrollTop + Math.round(maxForScroll * 120))-20;

                //console.log('maxForScroll::' + maxForScroll + '::isEndless::' + that.isEndless + '::_pageSize::' + that._pageSize + '::tt::' + tt + '::winH::' + winH + '::divH::' + divH + '::nowH::' + nowH + '::');
                if (e.scrollTop >= that.listPage) {
                    that.listPage = e.scrollTop;
                } else {
                    if (nowH > divH && that.isEndless) {
                        that.isEndless = false;
                        //if (tt > that._pageSize) {
                            app.application.showLoading();
                        //}
                        setTimeout(function () {
                            if (tt > that._pageSize) {
                                that.isEndless = true;
                                console.log('=============app.configService.pageSize:::::' + app.configService.pageSize);
                                that.dataInform.pageSize(that._pageSize += app.configService.pageSize);
                            } else {
                                that.isEndless = false;
                                $('#div_inform_loadmore').hide();
                                //console.log('is max total');  
                            }
                            app.application.hideLoading();

                        }, 3000);
                    }
                    that.listPage = 0;
                }
            });
        },
        show: function () {
            $(".km-filter-form").hide();
            $("#div_show_noneFilter_inform").hide();
            $('#div_inform_loadmore').hide();

            var tabstrip = app.application.view().footer.find(".km-tabstrip").data("kendoMobileTabStrip");
            tabstrip.switchTo("#tbs-inform"); //activate "bar" tab


            //----------------------------กำหนด ความสูง ทุกครั้งที่เปลี่ยนหน้าจอ 
            window.onresize = function (event) {
                $("#div_inform_scroller").css('height', $(window).height() - 100);
                //$("#mapJob_content").kendoMobileScroller();
                console.log($(window).height());
                app.coa_informService.viewModel.fill_150();
            };
            $("#div_inform_scroller").css("height", $(window).height() - 100); // กำหนดค่าเริ่มต้น ความสูง

            app.coa_informService.viewModel._pageSize = app.configService.pageSize;
            app.coa_informService.viewModel.listPage = 0;
            app.coa_informService.viewModel.loadData();
            app.coa_informService.viewModel.isInform = true;
            app.coa_informService.viewModel.isEndless = false;

        },
        hide: function () {

        },
        viewModel: new coa_inform()
    }


})(window);