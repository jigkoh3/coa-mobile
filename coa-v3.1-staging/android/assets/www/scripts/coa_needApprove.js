(function (global) {
    var app = global.app = global.app || {};

    coa_needApprove = kendo.data.ObservableObject.extend({
        priority_select: "",
        dataApproveDetail: null,
        dataApprove: [],
        needApprove_M: [],

        dataVisible: [],
        dataFileName: [],

        fontSize: [],
        SLA: [],
        toUserName: "",
        submittedImage: "",

        _pageSize: app.configService.pageSize,
        listPage: 0,
        isNeedApprove: false,
        isEndless: false,

        txFilter: "",
        maxLengthCheck: function (object) {
            if (object.value.length > object.maxLength)
                object.value = object.value.slice(0, object.maxLength);
        },
        checkNumberOnly: function (e) {
            //console.log(($('#input_amt').val() + "").length);
            if (($('#input_amt').val() + "").length >= 9) {
                e.preventDefault();
                return false;
            }
            var key = e.which || e.keyCode;
            if (!(key >= 48 && key <= 57)) {
                e.preventDefault();
                return false;
            }

            return false;
            //app.coa_needApproveService.viewModel.checkNumberOnly
        },
        createUI: function () {
            console.log('createUI');
            var that = app.coa_needApproveService.viewModel;

            that.needApprove_M = new kendo.data.DataSource({
                transport: {
                    read: function (operation) {
                        console.log('=============read=createUI================');
                        that.isNeedApprove = true;
                        //alert('DataSource :: needApprove_M :: reading...');
                        //app.application.showLoading();
                        var dataValue = {
                            "TRAN_TYPE": "N",
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
                                //console.log("response.RESULTS :: " + JSON.stringify(response.RESULTS));
                                if (response.RESPONSE_CODE == "0000") {
                                    operation.success(response.RESULTS);

                                    that.dataApprove.data(that.needApprove_M.data());
                                    //that.fill_150();
                                    app.updateBadgeService.viewModel.setBadge("needApprove_badge", that.dataApprove.total());
                                    if (response.RESULTS.length > 0) {
                                        $("#ul_needApprove").show();
                                        app.coa_needApproveService.viewModel.needApprove_setDataSource();

                                        var toUserName_add = "";
                                        if (response.RESULTS[0].TO_USER_LNAME != null)
                                            toUserName_add = response.RESULTS[0].TO_USER_FNAME + " " + response.RESULTS[0].TO_USER_LNAME.substring(0, 1) + ".";
                                        that.set("toUserName", toUserName_add);
                                        //alert(toUserName_add);
                                    } else {
                                        $("#ul_needApprove").hide();
                                        $("#div_needApprove_noItem").show();
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
            $("#ul_needApprove").kendoMobileListView({
                dataSource: that.needApprove_M,
                autoBind: false,
                template: $("#inform-template").text(),
                filterable: {
                    field: "TEXT_SEARCH_ALL",
                    operator: "contains"
                },
                pullToRefresh: true,
                click: app.coa_needApproveService.viewModel.approveDetail
            });
        },
        selectPriority: function (e) {
            var index = this.current().index();
            if (index == 0) index = "";
            if (index == 1) index = "H";
            if (index == 2) index = "M";
            if (index == 3) index = "L";

            //---------reset load more----------
            app.coa_needApproveService.viewModel._pageSize = app.configService.pageSize;
            $('#div_n_more').hide();
            $("#div_needApprove_noItem").hide();

            app.coa_needApproveService.viewModel.isEndless = false;
            app.coa_needApproveService.viewModel.priority_select = index;
            app.coa_needApproveService.viewModel.loadData();
            $("#div_needApprove_scroller").data("kendoMobileScroller").reset();            

            app.coa_needApproveService.viewModel.clearSearch();
        },
        clearSearch: function () {
            var listview = $("#ul_needApprove").data('kendoMobileListView');
            listview.dataSource.filter({});
            $('input[type=search]').val('');
        },
        setDataSource_listView: function () {
            //var that = app.coa_needApproveService.viewModel;
            ////$("#ul_needApprove").data("kendoMobileListView").setDataSource(this.dataApprove);
            //if (app.coa_needApproveService.viewModel.dataApprove.total() == 0) {
            //    that.needApprove_M.data([]);
            //} else {
            //    that.needApprove_M.data(that.dataApprove.view());
            //}

        },
        showHide_search: function () {
            var total = app.coa_needApproveService.viewModel.dataApprove.total();
            if (total == 0) {
                $("#ul_needApprove").hide();
                //$("#div_needApprove_noItem").show();
                $(".km-filter-form").hide();
            } else {
                $("#ul_needApprove").show();
                //$("#div_needApprove_noItem").hide();
                //$(".km-filter-form").show();
            }
        },
        onReasonSelect: function (e) {
            var that = app.coa_needApproveService.viewModel;
            var dataItem = this.dataItem(e.item.index());
            if (dataItem.REASON_CD == "") {
                that.dataApproveDetail.RETURN_REASON_CD = "";
                that.dataApproveDetail.RETURN_REASON_DESC = "";
            } else {
                that.dataApproveDetail.RETURN_REASON_CD = dataItem.REASON_CD;
                that.dataApproveDetail.RETURN_REASON_DESC = dataItem.REASON_DESC;
            }
            console.log("event :: select (" + that.dataApproveDetail.RETURN_REASON_CD + " : " + that.dataApproveDetail.RETURN_REASON_DESC + ")");
            //console.log(e.dataItem);
        },
        checkAMT: function (AMT) {
            var check = true;
            app.application.showLoading();

            if (AMT != null && AMT != "") {
                if (!(/^[0-9]+$/.test(AMT))) {
                    app.application.hideLoading();
                    app.coa_boxService.viewModel.setWarning(1, 'Description#2 must be only number.');
                    console.log('!(/^[0-9]+$/.test(that.dataApproveDetail.RETURN_AMT))Description#2 must be only number.');
                    check = false;
                }
            }
            return check;
        },
        onApprove: function () {
            app.coa_boxService.viewModel.hideConfirm();


            var that = app.coa_needApproveService.viewModel;

            //reset dropdown
            var dropdownlist = $("#dw_reason").data("kendoDropDownList");

            dropdownlist.select(dropdownlist.ul.children().eq(0));


            that.dataApproveDetail.PROCESSED_FLG = "APPROVED";
            that.dataApproveDetail.PROCESSED_ACCESS_TYPE = "MOBILE";
            that.dataApproveDetail.RETURN_REASON_CD = "";
            that.dataApproveDetail.RETURN_REASON_DESC = "";
            //that.dataApproveDetail.PROCESSED_FLG = "WAIT";
            //console.log(JSON.stringify(that.dataApproveDetail));

            console.log('that.checkAMT(that.dataApproveDetail.RETURN_AMT)::::::' + that.checkAMT(that.dataApproveDetail.RETURN_AMT));
            if (that.checkAMT(that.dataApproveDetail.RETURN_AMT)) {


                var dataValue = {
                    "SELECTED_ITEM": that.dataApproveDetail,
                    "TOKEN": localStorage.getItem("TOKEN"),
                    "USER_ID": localStorage.getItem("USER_ID"),
                    "VERSION": localStorage.getItem("VERSION")
                };
                //console.log(that.dataApproveDetail);
                $.ajax({
                    beforeSend: app.loginService.viewModel.checkOnline,
                    url: app.configService.serviceUrl + "api/SetApproveResult",
                    type: "POST",
                    data: JSON.stringify(dataValue),
                    dataType: "json",
                    contentType: 'application/json; charset=UTF-8',
                    success: function (response) {

                        app.application.hideLoading();
                        //console.log(JSON.stringify(response));
                        if (response.RESPONSE_CODE == "0000") {
                            //that.dataInform.data(response.RESULTS);
                            //operation.success(response.RESULTS);
                            app.coa_boxService.viewModel.setComplete('APPROVED');
                            location = "#tbs-needApprove";
                            //if (typeof (navigator.app) !== "undefined") {
                            //    navigator.app.backHistory();
                            //} else {
                            //    window.history.back();
                            //}
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
            }

        },
        onReject: function () {
            app.coa_boxService.viewModel.hideConfirm();
            var that = app.coa_needApproveService.viewModel;
            //console.log(that.dataApproveDetail.RETURN_REASON_CD);
            //if (that.dataApproveDetail.RETURN_REASON_CD != null && that.dataApproveDetail.RETURN_REASON_CD != "") {
            console.log("send");
            that.dataApproveDetail.PROCESSED_FLG = "REJECTED";
            that.dataApproveDetail.PROCESSED_ACCESS_TYPE = "MOBILE";


            console.log('that.checkAMT(that.dataApproveDetail.RETURN_AMT)::::::' + that.checkAMT(that.dataApproveDetail.RETURN_AMT));
            if (that.checkAMT(that.dataApproveDetail.RETURN_AMT)) {
                var dataValue = {
                    "SELECTED_ITEM": that.dataApproveDetail,
                    "TOKEN": localStorage.getItem("TOKEN"),
                    "USER_ID": localStorage.getItem("USER_ID"),
                    "VERSION": localStorage.getItem("VERSION")
                };
                //console.log(that.dataApproveDetail);
                $.ajax({
                    beforeSend: app.loginService.viewModel.checkOnline,
                    url: app.configService.serviceUrl + "api/SetApproveResult",
                    type: "POST",
                    data: JSON.stringify(dataValue),
                    dataType: "json",
                    contentType: 'application/json; charset=UTF-8',
                    success: function (response) {
                        app.application.hideLoading();
                        //console.log(JSON.stringify(response));
                        if (response.RESPONSE_CODE == "0000") {
                            //that.dataInform.data(response.RESULTS);
                            //operation.success(response.RESULTS);
                            app.coa_boxService.viewModel.setComplete('REJECTED');
                            location = "#tbs-needApprove";
                            //if (typeof (navigator.app) !== "undefined") {
                            //    navigator.app.backHistory();
                            //} else {
                            //    window.history.back();
                            //}
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
            }

            //} else {
            //app.coa_boxService.viewModel.setWarning(200,"กรุณาระบุ Reason");
            //console.log("warning");

            //}

        },
        IsJson: function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
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
        showDetail: function (e) {
            e.view.scroller.reset();
            var that = app.coa_needApproveService.viewModel;
            if (that.get("dataApproveDetail") == null) {
                var that = app.coa_needApproveService.viewModel;
                var dataItem = JSON.parse(localStorage.getItem('dataApproveDetail'));
                that.set("dataApproveDetail", dataItem);
                that.set("fontSize", {
                    "header": app.coa_settingService.viewModel.fontSize + 6 + "px",
                    "dateTime": app.coa_settingService.viewModel.fontSize - 2 + "px",
                    "detail": app.coa_settingService.viewModel.fontSize + "px"
                });
                //console.log(that.get("dataApproveDetail"));


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
                if (that.IsJson(dataItem.REJECT_REASON_CD)) {
                    dataSource = dataItem.REJECT_REASON_CD;
                } else {
                    dataSource = "[]";
                }
                //console.log(dataSource);
                $("#dw_reason").kendoDropDownList({
                    dataTextField: "REASON_DESC",
                    dataValueField: "REASON_CD",
                    dataSource: JSON.parse(dataSource),
                    select: that.onReasonSelect,
                    optionLabel: "Select Reason...",
                    value: '',
                });

                that.set('submittedImage', app.configService.imageUrl + '' + dataItem.PROFILE_IMAGE_NAME + '?' + localStorage.getItem("uTime"));
                //location = '#tbs-inform';
            }
        },
        approveDetail: function (e) {
            var that = app.coa_needApproveService.viewModel;
            var dataItem = e.dataItem;
            var dataSource;
            // console.log(JSON.stringify(dataItem));
            //console.log(dataItem.REJECT_REASON_CD);
            //console.log(JSON.parse(dataItem.REJECT_REASON_CD));
            if (typeof e.dataItem === "undefined") {
            } else {

                that.set('dataVisible', {
                    file1: that.checkV(dataItem.ATTACHED_FILE_NAME1),
                    file2: that.checkV(dataItem.ATTACHED_FILE_NAME2),
                    file3: that.checkV(dataItem.ATTACHED_FILE_NAME3)
                });
                that.set('dataFileName', {
                    fileName1: that.checkF(dataItem.ATTACHED_FILE_NAME1, "N_FileIcon1"),
                    fileName2: that.checkF(dataItem.ATTACHED_FILE_NAME2, "N_FileIcon2"),
                    fileName3: that.checkF(dataItem.ATTACHED_FILE_NAME3, "N_FileIcon3")
                });

                console.log(JSON.stringify(that.dataVisible));
                if (that.dataVisible.file1 || that.dataVisible.file2 || that.dataVisible.file3) {
                    $('.div_allFile').show();
                } else {
                    $('.div_allFile').hide();
                }

                if (that.IsJson(dataItem.REJECT_REASON_CD)) {
                    dataSource = dataItem.REJECT_REASON_CD;
                } else {
                    dataSource = "[]";
                }
                //console.log(dataSource);
                $("#dw_reason").kendoDropDownList({
                    dataTextField: "REASON_DESC",
                    dataValueField: "REASON_CD",
                    dataSource: JSON.parse(dataSource),
                    select: that.onReasonSelect,
                    optionLabel: "Select Reason...",
                    value: '',
                });


                var start = moment(dataItem.SLA_START_DT, "YYYY-MM-DD HH:mm:ss").calendar();
                var end = moment(dataItem.SLA_END_DT, "YYYY-MM-DD HH:mm:ss").calendar();

                that.set("SLA", {
                    "start": start,
                    "end": end
                });

                that.set("dataApproveDetail", dataItem);
                that.set("fontSize", {
                    "header": app.coa_settingService.viewModel.fontSize + 6 + "px",
                    "dateTime": app.coa_settingService.viewModel.fontSize - 2 + "px",
                    "detail": app.coa_settingService.viewModel.fontSize + "px"
                });

                that.set('submittedImage', app.configService.imageUrl + '' + dataItem.PROFILE_IMAGE_NAME + '?' + localStorage.getItem("uTime"));


                //console.log(that.get("dataApproveDetail"));
                localStorage.setItem("dataApproveDetail", JSON.stringify(that.get("dataApproveDetail")));

                that.setWidth();

                location = "#needApprove_detail";
            }
        },
        setWidth: function () {
            $(".k-dropdown").css("width", $(window).width() - 120);
            $("#input_amt").css("width", $(window).width() - 130);

            $(".amt_ios").css("width", $(window).width() - 130);
            $(".amt_android").css("width", $(window).width() - 130);

            $("#input_desc1").css("width", $(window).width() - 130);
            console.log($(window).width());
        },
        fill_150: function () {
            var that = app.coa_needApproveService.viewModel;
            var winH = $(window).height();
            var totalR = that.needApprove_M.total();
            var maxForScroll = Math.round(winH / 100);
            var rowFill = (maxForScroll - totalR) - 1;

            that.isEndless = true;

            if (totalR != 0) {
                $('#div_n_more').show();
                that.needApprove_M.pageSize(app.configService.pageSize);
                console.log('::::::::::::::::winH:' + winH + ':::::::::::totalR:' + totalR + '::::::::::::::::maxForScroll:' + maxForScroll + '::::::::::::::Math.round(rowFill * 150)::' + Math.round(rowFill * 150));
                if (totalR > maxForScroll) {
                    //$('.div_150i').hide();
                } else {
                    if (totalR != 0) {
                        //$('.div_150i').show();
                        //$('.div_150i').css("height", Math.round(rowFill * 100));
                    } else {
                        //$('.div_150i').hide();
                        //$('#div_n_more').hide();
                    }
                }
            } else {
                //$('#div_n_more').hide();
                
            }
        },
        loadData: function () {
            
            app.application.showLoading();
            var that = app.coa_needApproveService.viewModel;
            var dataValue = {
                "TRAN_TYPE": "N",
                "TOKEN": localStorage.getItem("TOKEN"),
                "USER_ID": localStorage.getItem("USER_ID"),
                "VERSION": localStorage.getItem("VERSION")
            };
            that.dataApprove = new kendo.data.DataSource({
                transport: {
                    read: function (operation) {
                        console.log('=============read=loadData================');
                        $.ajax({
                            beforeSend: app.loginService.viewModel.checkOnline,
                            url: app.configService.serviceUrl + "api/GetApprovalTransaction",
                            type: "POST",
                            data: JSON.stringify(dataValue),
                            dataType: "json",
                            contentType: 'application/json; charset=UTF-8',
                            success: function (response) {
                                app.application.hideLoading();
                                //console.log("loadData :: response.RESULTS :: " + JSON.stringify(response.RESULTS));
                                if (response.RESPONSE_CODE == "0000") {
                                    //that.dataInform.data(response.RESULTS);
                                    operation.success(response.RESULTS);

                                    app.updateBadgeService.viewModel.setBadge("needApprove_badge", that.dataApprove.total());
                                    console.log('that.dataApprove.total():: ' + that.dataApprove.total());
                                    //that.fill_150();
                                    if (response.RESULTS.length > 0) {
                                        
                                        $("#ul_needApprove").show();
                                        app.coa_needApproveService.viewModel.needApprove_setDataSource();

                                        var toUserName_add = "";
                                        if (response.RESULTS[0].TO_USER_LNAME != null)
                                            toUserName_add = response.RESULTS[0].TO_USER_FNAME + " " + response.RESULTS[0].TO_USER_LNAME.substring(0, 1) + ".";
                                        that.set("toUserName", toUserName_add);
                                        //alert(toUserName_add);

                                    } else {
                                        $('#div_n_more').hide();
                                        $("#ul_needApprove").hide();
                                        $("#div_needApprove_noItem").show();
                                        $(".km-filter-form").hide();
                                    }
                                } else {
                                    app.coa_boxService.viewModel.setWarning(1, response.RESPONSE_MSG);
                                }
                            },
                            error: function (xhr, error) {
                                app.application.hideLoading();
                                console.log("ajax :: service fail! ::");
                                console.log(error + ' ' + xhr.status + ' ' + xhr.statusText + ' :: ' + xhr.responseText);
                                app.coa_boxService.viewModel.setWarning(xhr.status, xhr.responseText);
                            }
                        });

                    }
                }
            });
            console.log('=============that.isNeedApprove::'+that.isNeedApprove);
            if (that.isNeedApprove) {
                that.dataApprove.read();
            }

        },
        needApprove_setDataSource: function () {
            var that = app.coa_needApproveService.viewModel;
            if (that.priority_select != null && that.priority_select != "") {
                that.dataApprove.filter(
                    {
                        field: "PRIORITY_FLG",
                        operator: "eq",
                        value: that.priority_select
                    });

                that.needApprove_M.data(that.dataApprove.view());
                //console.log(kendo.stringify(that.dataApprove.data()));
                $("#ul_needApprove").data("kendoMobileListView").setDataSource(that.needApprove_M);
            } else {
                //$("#ul_needApprove").data("kendoMobileListView").setDataSource([]);
                //console.log(kendo.stringify(that.dataApprove));
                that.needApprove_M.data(that.dataApprove.data());
                //console.log(kendo.stringify(that.dataApprove.data()));
                $("#ul_needApprove").data("kendoMobileListView").setDataSource(that.needApprove_M);
            }

            console.log('dataApprove.total :: ' + that.dataApprove.total() + 'needApprove_M.total :: ' + that.needApprove_M.total());
            if (that.needApprove_M.total() == 0) {
                console.log('------if------------------------------------------------');
                $('.div_150i').hide();
                $("#div_needApprove_noItem").show();
                $('#div_n_more').hide();
            } else {
                console.log('------else------------------------------------------------');
                $("#div_needApprove_noItem").hide();
                $('#div_n_more').show();
            }


            app.coa_needApproveService.viewModel._pageSize = app.configService.pageSize;

            that.fill_150();
            that.showHide_search();
        }
        //----------------------------------------- end viewModel -----------------------------------------
    });

    app.coa_needApproveService = {
        init: function () {
            var checkPage = true;
            app.coa_needApproveService.viewModel.createUI();
            var that = app.coa_needApproveService.viewModel;
            var scroller = $("#div_needApprove_scroller").data("kendoMobileScroller");
            scroller.bind("scroll", function (e) {

                if (e.scrollTop <= 10) {
                    var total = app.coa_needApproveService.viewModel.dataApprove.total();
                    if (total == 0) {
                        $("#ul_needApprove").hide();
                        //$("#div_needApprove_noItem").show();
                        $(".km-filter-form").hide();
                    } else {
                        $("#ul_needApprove").show();
                        //$("#div_needApprove_noItem").hide();
                        $(".km-filter-form").show();
                    }

                    $("#div_show_noneFilter_needApprove").hide();
                } else {
                    $(".km-filter-form").hide();
                    $("#div_show_noneFilter_needApprove").show();

                }
                ////console.log(e.scrollTop);

                var divH = $("#div_needApprove_scroller").data("kendoMobileScroller").scrollHeight();
                var winH = $(window).height();
                var tt = that.needApprove_M.total();
                var maxForScroll = Math.round((winH - 210) / 120);
                var nowH = (e.scrollTop + Math.round(maxForScroll * 120));

                //var nowH = (e.scrollTop + 400);
                //console.log('maxForScroll::' + maxForScroll + '::isEndless::' + that.isEndless + '::_pageSize::' + that._pageSize + '::tt::' + tt + '::winH::' + winH + '::divH::' + divH + '::nowH::' + nowH + '::');
                if (nowH >= that.listPage) {
                    that.listPage = nowH;
                    //console.log('==================scroll===================');
                } else {
                    that.listPage = 0;
                    if (nowH > divH && that.isEndless) {
                        that.isEndless = false;
                        app.application.showLoading();
                        console.log('==================pullpullpullpull===================');
                        //alert('more');
                        setTimeout(function () {
                            app.application.hideLoading();
                            that.isEndless = true;
                            if (tt > that._pageSize) {
                                console.log('==================more more===================');
                                that.needApprove_M.pageSize(that._pageSize += app.configService.pageSize);
                            } else {
                                that.isEndless = false;
                                console.log('==================hidehidehide===================');
                                $('#div_n_more').hide();
                            }
                        }, 3000);
                    }

                }

            });

        },
        show: function () {

            $(".km-filter-form").hide();
            $("#div_show_noneFilter_needApprove").hide();
            $('#div_n_more').hide();

            //----------------------------กำหนด ความสูง ทุกครั้งที่เปลี่ยนหน้าจอ 
            window.onresize = function (event) {
                $("#div_needApprove_scroller").css('height', $(window).height() - 140);
                //$("#mapJob_content").kendoMobileScroller();
                app.coa_needApproveService.viewModel.setWidth();
                app.coa_needApproveService.viewModel.fill_150();

                $("#div_needApprove_scroller").data("div_needApprove_detail_view").reset();
            };
            $("#div_needApprove_scroller").css("height", $(window).height() - 140); // กำหนดค่าเริ่มต้น ความสูง

            //app.coa_needApproveService.viewModel.listPage = true;
            app.coa_needApproveService.viewModel._pageSize = app.configService.pageSize;
            app.coa_needApproveService.viewModel.isEndless = false;

            app.updateBadgeService.viewModel.loadData_badgeInform();
            app.coa_needApproveService.viewModel.loadData();

            app.coa_needApproveService.viewModel.clearSearch();

            $("#div_needApprove_scroller").data("kendoMobileScroller").reset();

            var tabstrip = app.application.view().footer.find(".km-tabstrip").data("kendoMobileTabStrip");
            tabstrip.switchTo("#tbs-needApprove"); //activate "bar" tab

        },
        hide: function () {

        },
        viewModel: new coa_needApprove()
    }


})(window);