(function (global) {
    var app = global.app = global.app || {};

    coa_history = kendo.data.ObservableObject.extend({
        dataHistory: [],
        dataHistory_M: [],
        dataHistoryDetail: null,
        SLA: [],
        PROCESSED_FLG_COLOR: "",
        PROCESSED_FLG: "APPROVED",
        imageSrc_cover: "",
        imageSrc_user: "",
        to_userName: "",
        submittedImage: "",
        fontSize: [],
        dataVisible: [],
        dataFileName: [],

        _pageSize: app.configService.pageSize,
        listPage: 0,
        isEndless: false,
        isHistory: false,

        createUI: function () {

            console.log('createUI');
            var that = app.coa_historyService.viewModel;

            that.dataHistory_M = new kendo.data.DataSource({
                transport: {
                    read: function (operation) {
                        console.log('==============read=createUI===============');
                        that.isHistory = true;
                        var dataValue = {
                            "TOKEN": localStorage.getItem("TOKEN"),
                            "USER_ID": localStorage.getItem("USER_ID"),
                            "VERSION": localStorage.getItem("VERSION")
                        };
                        //alert('DataSource :: dataHistory_M :: reading...');
                        //app.application.showLoading();
                        $.ajax({
                            beforeSend: app.loginService.viewModel.checkOnline,
                            url: app.configService.serviceUrl + "api/GetHistoriesTransaction",
                            type: "POST",
                            data: JSON.stringify(dataValue),
                            dataType: "json",
                            contentType: 'application/json; charset=UTF-8',
                            success: function (response) {
                                app.application.hideLoading();
                                //console.log("response.RESULTS :: " + JSON.stringify(response.RESULTS));
                                if (response.RESPONSE_CODE == "0000") {
                                    //that.dataInform.data(response.RESULTS);
                                    operation.success(response.RESULTS);
                                    //that.fill_150();
                                    console.log("loadData total :: " + response.RESULTS.length + ":" + that.dataHistory.total());

                                    that.dataHistory.data(that.dataHistory_M.data());
                                    if (response.RESULTS.length > 0) {
                                        $("#div_history_noItem").hide();
                                        app.coa_historyService.viewModel.history_setDataSource();
                                    } else {
                                        $(".km-filter-form").hide();
                                        $("#div_history_noItem").show();
                                    }
                                } else {
                                    app.coa_boxService.viewModel.setWarning(1, response.RESPONSE_MSG);
                                }
                            },
                            error: function (xhr, error) {
                                app.application.hideLoading();
                                console.log("ajax :: service fail! ::");
                                console.log(xhr.status + ' ' + xhr.statusText + ' :: ' + xhr.responseText);

                                app.coa_boxService.viewModel.setWarning(xhr.status, xhr.responseText);
                            }
                        });

                    }
                }
            });
            $("#ul_history").kendoMobileListView({
                dataSource: that.dataHistory_M,
                autoBind: false,
                template: $("#inform-template").text(),
                filterable: {
                    field: "TEXT_SEARCH_ALL",
                    operator: "contains"
                },
                pullToRefresh: true,
                click: app.coa_historyService.viewModel.historyDetail
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
            var that = app.coa_historyService.viewModel;
            if (that.get("dataHistoryDetail") == null) {
                var that = app.coa_historyService.viewModel;
                var dataItem = JSON.parse(localStorage.getItem('dataHistoryDetail'));
                that.set("dataHistoryDetail", dataItem);
                that.set("fontSize", {
                    "header": app.coa_settingService.viewModel.fontSize + 6 + "px",
                    "dateTime": app.coa_settingService.viewModel.fontSize - 2 + "px",
                    "detail": app.coa_settingService.viewModel.fontSize + "px"
                });
                //console.log(that.get("dataHistoryDetail"));


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

                //console.log(JSON.stringify(that.dataVisible));
                if (that.dataVisible.file1 || that.dataVisible.file2 || that.dataVisible.file3) {
                    $('.div_allFile').show();
                } else {
                    $('.div_allFile').hide();
                }

                var start = moment(dataItem.SLA_START_DT, "YYYY-MM-DD HH:mm:ss").calendar();
                var end = moment(dataItem.SLA_END_DT, "YYYY-MM-DD HH:mm:ss").calendar();

                that.set("SLA", {
                    "start": start,
                    "end": end
                });
                that.set('submittedImage', app.configService.imageUrl + '' + dataItem.PROFILE_IMAGE_NAME + '?' + localStorage.getItem("uTime"));
                //location = '#tbs-inform';
            }
        },
        historyDetail: function (e) {

            var that = app.coa_historyService.viewModel;
            var dataItem = e.dataItem;
            var color = "#4c5356";

            that.set("dataHistoryDetail", dataItem);
            that.set("fontSize", {
                "header": app.coa_settingService.viewModel.fontSize + 6 + "px",
                "dateTime": app.coa_settingService.viewModel.fontSize - 2 + "px",
                "detail": app.coa_settingService.viewModel.fontSize + "px"
            });

            that.set('dataVisible', {
                file1: that.checkV(dataItem.ATTACHED_FILE_NAME1),
                file2: that.checkV(dataItem.ATTACHED_FILE_NAME2),
                file3: that.checkV(dataItem.ATTACHED_FILE_NAME3)
            });
            that.set('dataFileName', {
                fileName1: that.checkF(dataItem.ATTACHED_FILE_NAME1, "H_FileIcon1"),
                fileName2: that.checkF(dataItem.ATTACHED_FILE_NAME2, "H_FileIcon2"),
                fileName3: that.checkF(dataItem.ATTACHED_FILE_NAME3, "H_FileIcon3")
            });
            //console.log(JSON.stringify(that.dataVisible));
            if (that.dataVisible.file1 || that.dataVisible.file2 || that.dataVisible.file3) {
                $('.div_allFile').show();
            } else {
                $('.div_allFile').hide();
            }

            if (dataItem.PROCESSED_FLG == "APPROVED") {
                color = "#BFD22B";
            } else if (dataItem.PROCESSED_FLG == "REJECTED") {
                color = "#f00";
            } else {
                color = "#4c5356";
            }
            that.set("PROCESSED_FLG_COLOR", color);
            var start = moment(dataItem.SLA_START_DT, "YYYY-MM-DD HH:mm:ss").calendar();
            var end = moment(dataItem.SLA_END_DT, "YYYY-MM-DD HH:mm:ss").calendar();

            that.set("SLA", {
                "start": start,
                "end": end
            });

            that.set('submittedImage', app.configService.imageUrl + '' + dataItem.PROFILE_IMAGE_NAME + '?' + localStorage.getItem("uTime"));

            localStorage.setItem("dataHistoryDetail", JSON.stringify(that.get("dataHistoryDetail")));
            //console.log(that.get("dataHistoryDetail"));
            location = "#history_detail";
        },
        selectPriority: function (e) {
            var index = this.current().index();
            var that = app.coa_historyService.viewModel;

            if (index == 0) index = "APPROVED";
            if (index == 1) index = "REJECTED";

            //---------reset load more----------
            app.coa_historyService.viewModel._pageSize = app.configService.pageSize;
            that.isEndless = false;

            that.PROCESSED_FLG = index;
            app.coa_historyService.viewModel.loadData();

            $("#div_history_scroller").data("kendoMobileScroller").reset();
            $(".km-filter-form").hide();

            $("#div_show_noneFilter_history").hide();
            $("#div_history_noItem").hide();
            $('#div_history_more').hide();



            that.clearSearch();

            //$("#div_history_scroller").data("kendoMobileScroller").scrollTo(0, 0);
        },
        clearSearch: function () {
            var listview = $("#ul_history").data('kendoMobileListView');
            listview.dataSource.filter({});
            $('input[type=search]').val('');
        },
        fill_150: function () {
            var that = app.coa_historyService.viewModel;
            var winH = $(window).height();
            var totalR = that.dataHistory_M.total();
            var maxForScroll = Math.round(winH / 100) - 2;
            var rowFill = (maxForScroll - totalR) - 1;
            console.log('::::::::::::::::winH:' + winH + ':::::::::::totalR:' + totalR + '::::::::::::::::maxForScroll:' + maxForScroll + '::::::::::::::Math.round(rowFill * 150)::' + Math.round(rowFill * 150));
            if (totalR > maxForScroll) {
                $('.div_150i').hide();
                $('#div_history_more').show();
            } else {

                if (totalR != 0) {
                    $('.div_150i').show();
                    $('.div_150i').css("height", Math.round(rowFill * 100));
                } else {
                    $('.div_150i').hide();
                    $('#div_history_more').hide();
                }
            }
        },
        loadData: function () {
            
            var that = app.coa_historyService.viewModel;

            this.set("to_userName", localStorage.getItem("USERNAME"));
            this.set("imageSrc_cover", localStorage.getItem("PROFILE_COVER") + '?' + localStorage.getItem("uTime"));
            this.set("imageSrc_user", localStorage.getItem("PROFILE_IMG") + '?' + localStorage.getItem("uTime"));

            var dataValue = {
                "TOKEN": localStorage.getItem("TOKEN"),
                "USER_ID": localStorage.getItem("USER_ID"),
                "VERSION": localStorage.getItem("VERSION")
            };
            that.dataHistory = new kendo.data.DataSource({
                transport: {
                    read: function (operation) {
                        console.log('==============read=loadData===============');
                        app.application.showLoading();
                        $.ajax({
                            beforeSend: app.loginService.viewModel.checkOnline,
                            url: app.configService.serviceUrl + "api/GetHistoriesTransaction",
                            type: "POST",
                            data: JSON.stringify(dataValue),
                            dataType: "json",
                            contentType: 'application/json; charset=UTF-8',
                            success: function (response) {
                                //var row = 9;
                                //var l = (row - response.RESULTS.length);
                                //$("#div_history_scroller").css('height', $(window).height() - (300 * l));
                                //$("#div_history_scroller").data("kendoMobileScroller").scrollTo(0, -50);
                                app.application.hideLoading();
                                //console.log("response.RESULTS :: " + JSON.stringify(response.RESULTS));
                                if (response.RESPONSE_CODE == "0000") {
                                    //that.dataInform.data(response.RESULTS);
                                    operation.success(response.RESULTS);


                                    console.log("loadData total :: " + response.RESULTS.length + ":" + that.dataHistory.total());
                                    if (response.RESULTS.length > 0) {
                                        $("#div_history_noItem").hide();
                                        $('#div_history_more').show();
                                        app.coa_historyService.viewModel.history_setDataSource();
                                    } else {
                                        $("#ul_history").hide();
                                        $(".km-filter-form").hide();
                                        $("#div_history_noItem").show();
                                        $('#div_history_more').hide();
                                    }
                                } else {
                                    app.coa_boxService.viewModel.setWarning(1, response.RESPONSE_MSG);
                                }
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
            console.log('=========that.isHistory::' + that.isHistory);
            if (that.isHistory) {
                that.dataHistory.read();
            }
        },
        history_setDataSource: function () {
            var that = app.coa_historyService.viewModel;
            if (that.PROCESSED_FLG != null && that.PROCESSED_FLG != "") {
                that.dataHistory.filter(
                    {
                        field: "PROCESSED_FLG",
                        operator: "eq",
                        value: that.PROCESSED_FLG
                    });

                that.dataHistory_M.data(that.dataHistory.view());
                //console.log(kendo.stringify(that.dataHistory_M.data()));
                $("#ul_history").data("kendoMobileListView").setDataSource(that.dataHistory_M);
            } else {
                //console.log(kendo.stringify(that.dataHistory));
                that.dataHistory_M.data(that.dataHistory.data());
                //console.log(kendo.stringify(that.dataHistory.data()));
                $("#ul_history").data("kendoMobileListView").setDataSource(that.dataHistory_M);
            }

            $(".km-filter-form").hide();
            that.dataHistory_M.pageSize(app.configService.pageSize);
            $("#div_history_scroller").data("kendoMobileScroller").reset();
            that._pageSize = app.configService.pageSize;

            that.fill_150();

            that.showHide_search();
        }, showHide_search: function () {
            var total = app.coa_historyService.viewModel.dataHistory.total();
            console.log("dataHistory.total :: " + total);
            app.coa_historyService.viewModel.isEndless = true;
            if (total == 0) {
                $(".km-filter-form").hide();
                $("#div_history_noItem").show();
                $("#ul_history").hide();
            } else {
                $("#ul_history").show();
                $("#div_history_noItem").hide();
                //$(".km-filter-form").show();
            }
        }
        //----------------------------------------- end viewModel -----------------------------------------

    });

    app.coa_historyService = {
        init: function () {
            var that = app.coa_historyService.viewModel;
            app.coa_historyService.viewModel.createUI();
            var checkScroll = true;


            //-------------------- refresh listview ------------------
            var inputSearch = $('#div_history_scroller').find('input[type=search]');
            inputSearch.blur(function () {
                $("#ul_history").data("kendoMobileListView").refresh();
            });

            var scroller = $("#div_history_scroller").data("kendoMobileScroller");
            scroller.bind("scroll", function (e) {
                if (e.scrollTop <= 10) {
                    var total = app.coa_historyService.viewModel.dataHistory.total();
                    if (total == 0) {
                        $("#ul_history").hide();
                        //$("#div_history_noItem").show();
                        $(".km-filter-form").hide();
                    } else {
                        $("#ul_history").show();
                        $("#div_history_noItem").hide();
                        $(".km-filter-form").show();
                    }

                    $("#div_show_noneFilter_history").hide();
                } else {
                    $(".km-filter-form").hide();
                    $("#div_show_noneFilter_history").show();

                }
                //console.log(e.scrollTop);
                var divH = $("#div_history_scroller").data("kendoMobileScroller").scrollHeight();
                var winH = $(window).height();
                var tt = that.dataHistory_M.total();
                var maxForScroll = Math.round((winH - 380) / 120);

                var nowH = (e.scrollTop + Math.round(maxForScroll * 120));
                //console.log('maxForScroll::' + maxForScroll + '::isEndless::' + that.isEndless + '::_pageSize::' + that._pageSize + '::tt::' + tt + '::winH::' + winH + '::divH::' + divH + '::nowH::' + nowH + '::');

                if (nowH >= that.listPage) {
                    that.listPage = nowH;
                    //console.log('==================scroll===================');
                } else {
                    that.listPage = 0;
                    if (nowH > divH && that.isEndless) {
                        console.log('maxForScroll::' + maxForScroll + ':tttt:' + tt + ':_pageSize:' + that._pageSize + ':::(e.scrollTop + 300):' + (e.scrollTop + 300) + '::that.listPage:' + that.listPage + '::divH:' + divH + '::winH::' + winH);
                        that.isEndless = false;
                        app.application.showLoading();
                        console.log('==================pullpullpullpull===================');
                        //alert('more');
                        setTimeout(function () {
                            app.application.hideLoading();
                            that.isEndless = true;
                            if (tt > that._pageSize) {
                                console.log('==================more more===================');
                                that.dataHistory_M.pageSize(that._pageSize += app.configService.pageSize);
                            } else {
                                that.isEndless = false;
                                console.log('==================hidehidehide===================');
                                $('#div_history_more').hide();
                            }
                        }, 3000);
                    }

                }


            });
        },
        show: function () {
            var that = app.coa_historyService.viewModel;

            $(".km-filter-form").hide();
            $("#div_show_noneFilter_history").hide();
            $('#div_history_more').hide();

            var tabstrip = app.application.view().footer.find(".km-tabstrip").data("kendoMobileTabStrip");
            tabstrip.switchTo("#tbs-history"); //activate "bar" tab


            //----------------------------กำหนด ความสูง ทุกครั้งที่เปลี่ยนหน้าจอ 
            window.onresize = function (event) {
                $("#div_history_scroller").css('height', $(window).height() - 300);
                //$("#mapJob_content").kendoMobileScroller();
                app.coa_historyService.viewModel.fill_150();
            };
            $("#div_history_scroller").css("height", $(window).height() - 300); // กำหนดค่าเริ่มต้น ความสูง


            that.listPage = 0;
            that._pageSize = app.configService.pageSize;
            that.isEndless = false;
            that.loadData();

            that.clearSearch();
        },
        hide: function () {

        },
        viewModel: new coa_history()
    }


})(window);