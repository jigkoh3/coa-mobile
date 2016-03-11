(function (global) {
    var LoginViewModel,
		app = global.app = global.app || {};


    LoginViewModel = kendo.data.ObservableObject.extend({
        username: "",
        password: "",
        token: "",
        phoneNumber: "",
        connectionType: "...",
        NETWORK_TYPE: "WIFI",
        MOBILE_NO: "",
        OTP: "",
        TOKEN_OTP: "",
        profile: [],
        isNoti: "ON",
        runCheck: null,

        version: app.configService.version,
        checkToken: function () {
            var token = localStorage.getItem("TOKEN");
            console.log(token);
            if (token != null) {
                //app.application.navigate(
                //                    '#tbs-needApprove'
                //                );
                //location = "#tbs-needApprove";// ถ้าเคย Login แล้ว
            }
        },
        subscribeLog: function (ACTION_NAME, ACTION_STATUS, ACTION_MESSAGE) {
            var dataValue = {
                "ACTION_NAME": ACTION_NAME,
                "ACTION_STATUS": ACTION_STATUS,
                "ACTION_MESSAGE": ACTION_MESSAGE,
                "TOKEN": localStorage.getItem("TOKEN"),
                "USER_ID": localStorage.getItem("USER_ID"),
                "VERSION": localStorage.getItem("VERSION")
            };
            $.ajax({
                beforeSend: app.loginService.viewModel.checkOnline,
                url: app.configService.serviceUrl + "api/SubscribeLog",
                type: "POST",
                data: JSON.stringify(dataValue),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function (response) {
                    console.log(JSON.stringify(response));
                    if (response.RESPONSE_CODE == "0000") {
                    
                    } else {
                        
                    }
                },
                error: function (xhr, error) {
                    console.log("ERROR : ajax :: service fail! ::");
                    console.log(xhr.status + ' ' + xhr.statusText + ' :: ' + xhr.responseText);
                    console.log(xhr);
                }
            });
        },

        subscribeNoti: function () {
            console.log("subscribeNoti");
            var PLUGIN_FUNGUS_PUSH = "PluginFungusPushNotification";
            var PLUGIN_ACTION_SUBSCRIBE = "subscribePlugin";
            var PLUGIN_ACTION_UNSUBSCRIBE = "unsubscribePlugin";

            cordova.exec(function () {
                //success
                app.application.hideLoading();

                app.coa_settingService.viewModel.set("isNoti", "ON");
                localStorage.setItem("isNoti", "ON");
                app.coa_settingService.viewModel.setButtonNoti();

                console.log("Subscribing successfully.");
                app.loginService.viewModel.subscribeLog("SUBSCRIBE", "SUCCESS", "");
            }, function (message) {
                //Failed
                app.application.hideLoading();
                console.log("Subscribing failed.");
                console.log(message);

                app.coa_settingService.viewModel.set("isNoti", "OFF");
                localStorage.setItem("isNoti", "OFF");
                app.coa_settingService.viewModel.setButtonNoti();

                app.loginService.viewModel.subscribeLog("SUBSCRIBE", "FAILED", message);
                app.coa_boxService.viewModel.setWarning(1, localStorage.getItem("SUBSCRIBE_ERROR_MSG"));
            }, PLUGIN_FUNGUS_PUSH, PLUGIN_ACTION_SUBSCRIBE, ["" + localStorage.getItem("USER_ID") + ""]);
        },
        unsubscribeNoti: function () {
            console.log("unsubscribeNoti");
            var PLUGIN_FUNGUS_PUSH = "PluginFungusPushNotification";
            var PLUGIN_ACTION_SUBSCRIBE = "subscribePlugin";
            var PLUGIN_ACTION_UNSUBSCRIBE = "unsubscribePlugin";
            cordova.exec(function () {
                //success
                app.application.hideLoading();

                app.coa_settingService.viewModel.set("isNoti", "OFF");
                localStorage.setItem("isNoti", "OFF");
                app.coa_settingService.viewModel.setButtonNoti();

                console.log("UnSubscribing successfully.");
                app.loginService.viewModel.subscribeLog("UNSUBSCRIBE", "SUCCESS", "");
            }, function (message) {
                //Failed
                app.application.hideLoading();
                console.log("UnSubscribing failed.");

                app.coa_settingService.viewModel.set("isNoti", "ON");
                localStorage.setItem("isNoti", "ON");
                app.coa_settingService.viewModel.setButtonNoti();

                console.log(message);
                app.loginService.viewModel.subscribeLog("UNSUBSCRIBE", "FAILED", message);
                app.coa_boxService.viewModel.setWarning(1, localStorage.getItem("SUBSCRIBE_ERROR_MSG"));
            }, PLUGIN_FUNGUS_PUSH, PLUGIN_ACTION_UNSUBSCRIBE, ["" + localStorage.getItem("USER_ID") + ""]);
        },
        newLogin: function () {
            var that = app.loginService.viewModel;
            that.set("OTP", "");
            that.set("TOKEN_OTP", "");
        },
        logout: function () {
            app.coa_boxService.viewModel.hideConfirm();

            var that = app.loginService.viewModel;
            app.application.showLoading();
            var dataValue = {
                "TOKEN": localStorage.getItem("TOKEN"),
                "USER_ID": localStorage.getItem("USER_ID"),
                "VERSION": localStorage.getItem("VERSION")
            };
            //console.log(JSON.stringify(dataValue));
            $.ajax({
                beforeSend: app.loginService.viewModel.checkOnline,
                url: app.configService.serviceUrl + "api/LogOut",
                type: "POST",
                data: JSON.stringify(dataValue),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function (response) {
                    app.application.hideLoading();
                    //console.log(JSON.stringify(response.RESULTS));
                    if (response.RESPONSE_CODE == "0000") {

                        //cr
                        //app.loginService.viewModel.unsubscribeNoti();

                        if (app.coa_informService.viewModel.isInform) {
                            $("#div_inform_scroller").data("kendoMobileScroller").reset();
                        }
                        app.coa_informService.viewModel._pageSize = localStorage.getItem("pageSize");
                        app.coa_needApproveService.viewModel._pageSize = localStorage.getItem("pageSize");
                        app.coa_historyService.viewModel._pageSize = localStorage.getItem("pageSize");

                        console.log('logoutOK');

                        that.newLogin();
                        //localStorage.clear();

                        app.application.navigate(
                                                '#login'
                                            );
                        //location.reload();
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
        onCancelOTP: function () {
            var that = app.loginService.viewModel;
            that.newLogin();
        },
        onNewOTP: function () {
            var that = app.loginService.viewModel;
            that.newLogin();
            that.onLogin();
        },
        onLogin: function () {

            
            var that = app.loginService.viewModel;

            if (that.TOKEN_OTP != "" && that.OTP == "") {
                app.coa_boxService.viewModel.setWarning(1, "OTP is required.");
            } else if (that.username == "") {
                app.coa_boxService.viewModel.setWarning(1, "Username is required.");
            } else if (that.password == "") {
                app.coa_boxService.viewModel.setWarning(1, "Password is required.");
            } else {
                app.application.showLoading();
                var dataValue = {
                    "USERNAME": that.username,
                    "PASSWORD": that.password,
                    "NETWORK_TYPE": that.NETWORK_TYPE,
                    //"NETWORK_TYPE": "WEB",
                    "MOBILE_NO": that.MOBILE_NO,
                    "OTP": that.OTP,
                    "TOKEN_OTP": that.TOKEN_OTP,
                    "USER_ID": "",
                    "VERSION": that.version,
                };

                console.log('dataValue:: ' + JSON.stringify(dataValue));
                $.ajax({
                    beforeSend: app.loginService.viewModel.checkOnline,
                    url: app.configService.authenUrl + "api/Authen",
                    type: "POST",
                    data: JSON.stringify(dataValue),
                    dataType: "json",
                    contentType: 'application/json; charset=UTF-8',
                    success: function (response) {
                        app.application.hideLoading();
                        console.log(JSON.stringify(response));
                        if (response.RESPONSE_CODE == "0000") {

                            if (response.RESULTS.TOKEN_ID == "") {
                                // กรณีต้องกรอก OTP
                                that.TOKEN_OTP = response.RESULTS.TOKEN_OTP;
                                that.set('username', response.RESULTS.USERNAME);
                                that.set('password', response.RESULTS.PASSWORD);
                                app.application.navigate(
                                                '#div_loginOTP'
                                            );
                            } else {
                                // ไม่ต้องใส่ OTP
                                localStorage.setItem("pageSize", response.RESULTS.READ_BUFFER_RECORD);
                                //localStorage.setItem("imageSize", 2048);
                                localStorage.setItem("imageSize", response.RESULTS.IMAGE_MAX_SIZE);

                                app.coa_informService.viewModel._pageSize = response.RESULTS.READ_BUFFER_RECORD;
                                app.coa_needApproveService.viewModel._pageSize = response.RESULTS.READ_BUFFER_RECORD;
                                app.coa_historyService.viewModel._pageSize = response.RESULTS.READ_BUFFER_RECORD;
                                app.configService.pageSize = response.RESULTS.READ_BUFFER_RECORD;

                                localStorage.setItem("uTime", (new Date()).getTime());
                                localStorage.setItem("USERNAME", response.RESULTS.USERNAME);
                                localStorage.setItem("USER_ID", response.RESULTS.USER_ID);
                                localStorage.setItem("TOKEN", response.RESULTS.TOKEN_ID);
                                localStorage.setItem("VERSION", that.version);
                                localStorage.setItem("PROFILE_IMG", app.configService.imageUrl + '' + response.RESULTS.PROFILE_IMAGE);
                                localStorage.setItem("PROFILE_COVER", app.configService.imageUrl + '' + response.RESULTS.PROFILE_COVER);
                                localStorage.setItem("SUBSCRIBE_ERROR_MSG", response.RESULTS.SUBSCRIBE_ERROR_MSG);
                                
                                
                                console.log(response.RESULTS);

                                //cr
                                if (localStorage.getItem("isNoti") == "ON") {
                                    app.loginService.viewModel.subscribeNoti();
                                }
                                


                                app.application.navigate(
                                                '#tbs-needApprove'
                                            );
                            }
                        } else {
                            
                            //location = '#login';
                            if (response.RESPONSE_CODE == "3001") {
                                localStorage.setItem("iosURL", response.RESULTS.IOS_DOWNLOAD_URL);
                                localStorage.setItem("androidURL", response.RESULTS.ANDROID_DOWNLOAD_URL);
                                app.coa_boxService.viewModel.setConfirmAlert(response.RESPONSE_MSG, app.coa_moreService.viewModel.cLink);
                            } else {
                                app.coa_boxService.viewModel.setWarning(1, response.RESPONSE_MSG);
                            }
                            that.newLogin();
                            app.application.navigate(
                                                '#login'
                                            );
                        }
                    },
                    error: function (xhr, error) {
                        app.application.hideLoading();
                        console.log("ERROR : ajax :: service fail! ::");
                        console.log(xhr.status + ' ' + xhr.statusText + ' :: ' + xhr.responseText);
                        console.log(xhr);
                        app.coa_boxService.viewModel.setWarning(xhr.status, xhr.responseText);
                        //location = '#login';
                        that.newLogin();
                        app.application.navigate(
                                            '#login'
                                        );
                    }
                });
            }
        },
        onLogout: function () {
        },
        clearForm: function () {
            var that = this;
            that.set("username", "");
            that.set("password", "");
            that.set("OTP", "");
        },
        checkEnter: function (e) {
            var that = this;
            if (e.keyCode == 13) {
                $(e.target).blur();
                //that.onLogin();
            }
        },
        clearCache: function (userId) {
        },
        checkOnline: function () {
            //document.addEventListener('deviceready', function () {
                var networkState = navigator.connection.type;
                var states = {};
                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.NONE] = 'No network connection';
                states[Connection.CELLULAR] = 'CELLULAR connection';

                if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
                    app.application.hideLoading();
                    //alert('Offline mode.');
                    //return false;
                    console.log('Connection type: ' + networkState);
                } else {
                    console.log('Connection type: ' + networkState);
                }
            //});

            setTimeout(function () {
                $('input[type="search"]').attr('maxlength', '100');
                $('.km-badge').css('font-size', '12px');
            }, 2000);

        },
        onBackKeyDown: function (e) {
            //if (app.application.view().id == "#login") {
            //navigator.notification.confirm(
            //	'Exit Application!', // message

            //	function (buttonIndex) {
            //	    if (buttonIndex == 2) {
            //	        navigator.app.exitApp();
            //	    }
            //	}, // callback to invoke with index of button pressed
            //	'TTSM', // title
            //	'Cancel,Exit' // buttonLabels
            //);
            //}
            e.preventDefault();
            //else {
            //    e.preventDefault();
            //}
        },
        setTmp: function () {
            // ferdinandr
            var that = this;
            that.set("username", ""),
			that.set("password", "");
            that.set("OTP", "");

            that.set("version", that.version);
        },
        checkConnection: function () {
            var that = app.loginService.viewModel;
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.NONE] = 'No network connection';
            if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
                that.set("connectionType", 'Offline mode.');
            } else {
                if (networkState == Connection.WIFI) {
                    that.NETWORK_TYPE = "WIFI";
                } else {
                    that.NETWORK_TYPE = "3G";
                }
                that.set("connectionType", networkState);
            }
            //console.log('connectionType :: ' + networkState);


        }
        /*-------------------------------------------------end viewModel----------------*/
    });

    app.loginService = {
        viewModel: new LoginViewModel(),
        init: function () {
            document.addEventListener('deviceready', function () {
                app.loginService.viewModel.runCheck = setInterval(function () {
                    app.loginService.viewModel.checkConnection();
                }, 1000);
            });

            //app.loginService.viewModel.setTmp();
            console.log('loading Login');
            app.loginService.viewModel.checkToken();
        },
        show: function () {
            var that = app.loginService.viewModel;
            that.set('OTP', '');
            that.set("connectionType", '');

            if (localStorage.getItem("isNoti") == null) {
                localStorage.setItem("isNoti", "ON");
                console.log("localStorage.setItem(isNoti, ON);");
            }
            that.set('isNoti', localStorage.getItem("isNoti"));
            console.log("isNoti : "+localStorage.getItem("isNoti"));
            
        },
        hide: function () {
            clearInterval(app.loginService.viewModel.runCheck);
        },
    };
})(window);
