(function (global) {
    var app = global.app = global.app || {};

    coa_settingViewModel = kendo.data.ObservableObject.extend({
        imageClick: "",
        imageSrc_cover: "",
        imageSrc_user: "",
        newImage: "",
        to_userName: "",
        fontSize: 16,
        fontSize_demo: "16px",
        fontSize_time: "",
        isNoti: localStorage.getItem("isNoti"),
        selectNoti: function () {
            var that = app.coa_settingService.viewModel;
            var index = this.current().index();
            var isNoti;
            app.application.showLoading();
            if (index == 0) {
                isNoti = "ON";
                app.loginService.viewModel.subscribeNoti();
            }
            if (index == 1) {
                isNoti = "OFF";
                app.loginService.viewModel.unsubscribeNoti();
            }
            

            console.log("isNoti : " + isNoti);
            console.log("localStorage.isNoti : " + localStorage.getItem("isNoti"));

        },
        selectFont: function () {
            var that = app.coa_settingService.viewModel;
            var index = this.current().index();
            var fontSize;

            if (index == 0) fontSize = 14;
            if (index == 1) fontSize = 16;
            if (index == 2) fontSize = 18;
            that.set("fontSize", fontSize);
            that.set("fontSize_demo", fontSize + "px");
        },
        selectMax: 100,
        loadData: function () {
            var times = (new Date()).getTime();
            this.set("to_userName", localStorage.getItem("USERNAME"));
            this.set("imageSrc_cover", localStorage.getItem("PROFILE_COVER") + "?" + times);
            this.set("imageSrc_user", localStorage.getItem("PROFILE_IMG") + "?" + times);
            localStorage.setItem("PROFILE_COVER", localStorage.getItem("PROFILE_COVER") + "?" + times);
            localStorage.setItem("PROFILE_IMG", localStorage.getItem("PROFILE_IMG") + "?" + times);
            console.log(this.imageSrc_cover);
            console.log(this.imageSrc_user);

            app.coa_settingService.viewModel.setButtonNoti();
        },
        setButtonNoti: function () {
            if (localStorage.getItem("isNoti") == "ON") {
                $("#ul_selectNoti").kendoMobileButtonGroup({
                    index: 0
                });
                console.log("localStorage.getItem(isNoti) == ON");
            }
            if (localStorage.getItem("isNoti") == "OFF") {
                $("#ul_selectNoti").kendoMobileButtonGroup({
                    index: 1
                });
                console.log("localStorage.getItem(isNoti) == OFF");
            }
        },
        onSuccess: function (imageURI) {
            console.log('==================onSuccess');
            var that = app.coa_settingService.viewModel;
            var options = new FileUploadOptions();
            var imageSize = localStorage.getItem("imageSize");
            var imageSize_new = 0;

            window.resolveLocalFileSystemURI(imageURI, function (fileEntry) {
                fileEntry.file(function (fileObj) {
                    imageSize_new = fileObj.size;
                    console.log('imageSize_new :: ' + imageSize_new + ':: imageSize :: ' + imageSize + ':: imageSize_new / 1024::' + imageSize_new / 1024);
                    if (imageSize_new / 1024 > imageSize) {
                        app.application.hideLoading();
                        app.coa_boxService.viewModel.setWarning(1, 'Maximum file size must be less than ' + imageSize + ' KB.');
                    } else {

                        that.newImage = imageURI;

                        options.fileKey = "file";
                        if (that.imageClick == "PHOTO") {
                            options.fileName = localStorage.getItem("USER_ID") + '.png';
                        } else {
                            options.fileName = localStorage.getItem("USER_ID") + '_cover.png';
                        }
                        options.mimeType = "image/jpeg";
                        options.httpMethod = "POST";
                        options.chunkedMode = false;
                        options.headers = {
                            Connection: "close"
                        }

                        //var params = new Object();
                        //var params = {};
                        //params.value1 = "test";
                        //params.value2 = "param";


                        //options.params = params;






                        var ft = new FileTransfer();
                        ft.upload(imageURI, encodeURI(app.configService.fileServiceUrl + "api/FileUpload"), that.win, that.fail, options);
                    }
                });
            });

        },
        onFail: function (message) {
            app.application.hideLoading();
            if (message != "Selection cancelled." && message != "null data from photo library" && message != "no image selected") {
                app.coa_boxService.viewModel.setWarning(1, message);
            }
        },
        onChooseLibrary: function (e) {
            console.log('===================onChooseLibrary');
            var that = app.coa_settingService.viewModel;
            var img = e.context;
            that.set('imageClick', img);
            //alert('Choose ' + img + ' from Library');
            app.application.showLoading();
            navigator.camera.getPicture(that.onSuccess, that.onFail, {
                quality: 10,
                //targetWidth: 100,
                //targetHeight: 100,
                correctOrientation: false,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            });
        },

        uploadPhoto: function (imageURI) {

        },

        win: function (r) {
            var that = app.coa_settingService.viewModel;
            console.log("=========================win");
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            app.application.hideLoading();
            app.coa_boxService.viewModel.setComplete('Success');

            if (that.imageClick == "PHOTO") {

            } else {

            }
            if (that.imageClick == "PHOTO") {
                d = new Date();
                d = d.getTime();
                localStorage.setItem("uTime", d);
                var iname = ("" + localStorage.getItem("PROFILE_IMG")).split("/");
                iname = iname[iname.length - 1];
                //set newname
                var newGetname = ("" + localStorage.getItem("PROFILE_IMG")).replace(iname, localStorage.getItem("USER_ID") + ".png");
                localStorage.setItem("PROFILE_IMG", newGetname);
                //show newname
                that.set("imageSrc_user", localStorage.getItem("PROFILE_IMG") + '?' + localStorage.getItem("uTime"));
                console.log('imageSrc_user: ' + localStorage.getItem("PROFILE_IMG") + '?' + localStorage.getItem("uTime"));

            } else {
                d = new Date();
                d = d.getTime();
                localStorage.setItem("uTime", d);
                var iname = ("" + localStorage.getItem("PROFILE_COVER")).split("/");
                iname = iname[iname.length - 1];
                //set newname
                var newGetname = ("" + localStorage.getItem("PROFILE_COVER")).replace(iname, localStorage.getItem("USER_ID") + "_cover.png");
                localStorage.setItem("PROFILE_COVER", newGetname);
                //show newname
                that.set("imageSrc_cover", localStorage.getItem("PROFILE_COVER") + '?' + localStorage.getItem("uTime"));
                console.log('imageSrc_cover: ' + localStorage.getItem("PROFILE_COVER") + '?' + localStorage.getItem("uTime"));
            }
        },

        fail: function (error) {
            app.application.hideLoading();
            app.coa_boxService.viewModel.setWarning(1, 'Can not upload.');
            console.log(error.exception);
        },
        onDelete: function (e) {
            app.application.showLoading();
            var that = app.coa_settingService.viewModel;
            var pType = "";
            if (e.context == "PHOTO") {
                pType = "IMAGE";
            } else {
                pType = "COVER";
            }
            //call service setDefault_image
            var dataValue = {
                "DELETE_TYPE": pType,
                "TOKEN": localStorage.getItem("TOKEN"),
                "USER_ID": localStorage.getItem("USER_ID"),
                "VERSION": localStorage.getItem("VERSION")
            };
            $.ajax({
                beforeSend: app.loginService.viewModel.checkOnline,
                url: app.configService.serviceUrl + "api/SetDefaultImage",
                type: "POST",
                data: JSON.stringify(dataValue),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function (response) {
                    app.application.hideLoading();
                    if (response.RESPONSE_CODE == "0000") {
                        if (e.context == "PHOTO") {
                            d = new Date();
                            d = d.getTime();
                            localStorage.setItem("uTime", d);
                            var iname = ("" + localStorage.getItem("PROFILE_IMG")).split("/");
                            iname = iname[iname.length - 1];
                            //set newname
                            var newGetname = ("" + localStorage.getItem("PROFILE_IMG")).replace(localStorage.getItem("USER_ID") + ".png", "user_image.png");
                            localStorage.setItem("PROFILE_IMG", newGetname);
                            //show newname
                            that.set("imageSrc_user", localStorage.getItem("PROFILE_IMG") + '?' + localStorage.getItem("uTime"));
                            console.log('imageSrc_user: ' + localStorage.getItem("PROFILE_IMG") + '?' + localStorage.getItem("uTime"));
                        } else {
                            d = new Date();
                            d = d.getTime();
                            localStorage.setItem("uTime", d);
                            var iname = ("" + localStorage.getItem("PROFILE_COVER")).split("/");
                            iname = iname[iname.length - 1];
                            //set newname
                            var newGetname = ("" + localStorage.getItem("PROFILE_COVER")).replace(localStorage.getItem("USER_ID") + "_cover.png", "cover_image.png");
                            localStorage.setItem("PROFILE_COVER", newGetname);
                            //show newname
                            that.set("imageSrc_cover", localStorage.getItem("PROFILE_COVER") + '?' + localStorage.getItem("uTime"));
                            console.log('imageSrc_cover: ' + localStorage.getItem("PROFILE_COVER") + '?' + localStorage.getItem("uTime"));
                        }

                        app.coa_boxService.viewModel.setComplete('success');

                    } else {
                        app.coa_boxService.viewModel.setWarning(1, response.RESPONSE_MSG);
                    }
                },
                error: function (xhr, error) {
                    app.application.hideLoading();
                    console.log(error + ' :code[' + xhr.status + '] ' + xhr.statusText + ' :: ' + xhr.responseText);
                    app.coa_boxService.viewModel.setWarning(xhr.status, xhr.responseText);
                }
            });


        }
        //----------------------------------------- end viewModel -----------------------------------------

    });

    app.coa_settingService = {
        init: function () {

        },
        show: function () {
            app.coa_settingService.viewModel.set("fontSize_demo", 16 + "px");
            app.coa_settingService.viewModel.loadData();



        },
        hide: function () {

        },
        viewModel: new coa_settingViewModel()
    }


})(window);