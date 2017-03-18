var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {

        j(":text[readonly]").css("color", "#4CD0F7").css("font-weight", "bold").css("text-align", "center");
        j("#pickContact").find(":text[readonly]").css("text-align", "left");

        FastClick.attach(document.body);

        app.SetStorage();

        app.receivedEvent('deviceready');

        j("#accelerometer").find(":text").addClass('center');
        j("#status").addClass('center');
        j("#status").addClass('center');
        j("#status").addClass('center');


        j(document).on("pagebeforehide", "#accelerometer", function() {
            app.StopAccelerometer();
        });

        j(document).on("pagebeforeshow", "#battery", function() {
            app.GetBatteryInfo();
        });

        j(document).on("pagebeforehide", "#compass", function() {
            app.StopCompass();
        });

        j(document).on("pageshow", "#vibration", function() {
            j("#btnStartVibration").removeAttr("disabled");
            j("#btnStopVibration").attr("disabled", "disabled");
        });

        j(document).on("pagebeforehide", "#vibration", function() {
            app.StopVibration();
        });

        j(document).on("pageshow", "#statusbar", function() {
            j("#colorHex").val("");
            if (StatusBar.isVisible) {
                j("#btnShowHide").html("HIDE");
            } else {
                j("#btnShowHide").html("SHOW");
            }
        });

        j(document).on("pageshow", "#camera", function() {
            j("#image").css("display", "none");
            j("#videoCam").each(function() {
                this.pause()
            });
            j("#videoCam").css("display", "none");
            j("#videoCam").attr("src", "");
            app.GetConfigCamera();
        });

        j(document).on("pagebeforehide", "#cfgcamera", function() {
            j("#image").css("display", "none");
            j("#videoCam").each(function() {
                this.pause()
            });
            j("#videoCam").css("display", "none");
            j("#videoCam").attr("src", "");
            app.SetConfigCamera();
        });

        j(document).on("pagebeforehide", "#camera", function() {
            j("#image").css("display", "none");
            j("#videoCam").each(function() {
                this.pause()
            });
            j("#videoCam").css("display", "none");
            j("#videoCam").attr("src", "");
        });
       
        //INAPPBROWSER
        j(document).on("pageshow", "#inappbrowser", function() {
            app.GetConfigInappbrowser();
        });

        j(document).on("pagebeforehide", "#cfginappbrowser", function() {
            app.SetConfigInappbrowser();
        });

        //MEDIA_CAPTURE
        j(document).on("pagebeforeshow", "#capture", function() {
            j("#divDetailCapture").hide();
        });

        j(document).on("pageshow", "#capture", function() {
            app.GetMediaCapture();
        });

        j(document).on("pagebeforehide", "#cfgCapture", function() {
            app.SetMediaCapture();
        });

        //GEOLOCATION
        j(document).on("pagebeforeshow", "#geolocation", function() {
            app.GetCurrentLocation(0);
        });

        j(document).on("pagebeforehide", "#geolocation", function() {
            app.ClearWatchGeolocation();
        });

        j(document).on("pagebeforeshow", "#geolocationDet", function() {
            app.GetCurrentLocation(1);
        });

        j(document).on("pagebeforehide", "#geolocationDet", function() {
            app.ClearWatchGeolocation();
        });

        j(document).on("pagebeforehide", "#cfggeo", function() {
            app.SetConfigGeolocation();
        });

        //DEVICE
        j(document).on("pagebeforeshow", "#deviceInfo", function() {
            app.GetInfoDevice();
        });

        j("#imgHome").on("click", function() {
            j("#menu").panel("open");
        });

        StatusBar.backgroundColorByHexString("#27A1C5");
        StatusBar.show();
        j("#btnShowHide").html("HIDE");

        j(document).on("pagebeforeshow", "#searchContacts", function() {
           
            var flag_search = localStorage.getItem("flag_search");
            if(flag_search == 1)
            {
                j.mobile.changePage("#contacts", {});
            }
        });
    },

    SetStorage: function() {


        //BATTERY
        var status_plugged = localStorage.getItem("status_plugged");
        if ((status_plugged === null) || (status_plugged.length === 0)) {
            localStorage.setItem("status_plugged", 0);
        }

        //ACCELEROMETER
        var watchIDAcc = localStorage.getItem("watchIDAcc");
        if ((watchIDAcc === null) || (watchIDAcc.length === 0)) {
            localStorage.setItem("watchIDAcc", "");
        }

        //COMPASS
        var watchIDCompass = localStorage.getItem("watchIDCompass");
        if ((watchIDCompass === null) || (watchIDCompass.length === 0)) {
            localStorage.setItem("watchIDCompass", "");
        }


        var typeConn = localStorage.getItem("typeConn");
        if ((typeConn === null) || (typeConn.length === 0)) {
            localStorage.setItem("typeConn", "");
        }

        //CAMERA:
        var quality = localStorage.getItem("quality");
        if ((quality === null) || (quality.length === 0)) {
            localStorage.setItem("quality", "50");
        }

        var destinationType = localStorage.getItem("destinationType");
        if ((destinationType === null) || (destinationType.length === 0)) {
            localStorage.setItem("destinationType", "1");
        }

        var allowEdit = localStorage.getItem("allowEdit");
        if ((allowEdit === null) || (allowEdit.length === 0)) {
            localStorage.setItem("allowEdit", "true");
        }

        var encodingType = localStorage.getItem("encodingType");
        if ((encodingType === null) || (encodingType.length === 0)) {
            localStorage.setItem("encodingType", "0");
        }

        var correctOrientation = localStorage.getItem("correctOrientation");
        if ((correctOrientation === null) || (correctOrientation.length === 0)) {
            localStorage.setItem("correctOrientation", "true");
        }

        var saveToPhotoAlbum = localStorage.getItem("saveToPhotoAlbum");
        if ((saveToPhotoAlbum === null) || (saveToPhotoAlbum.length === 0)) {
            localStorage.setItem("saveToPhotoAlbum", "true");
        }

        var cameraDirection = localStorage.getItem("cameraDirection");
        if ((cameraDirection === null) || (cameraDirection.length === 0)) {
            localStorage.setItem("cameraDirection", "0");
        }

        var mediaType = localStorage.getItem("mediaType");
        if ((mediaType === null) || (mediaType.length === 0)) {
            localStorage.setItem("mediaType", "0");
        }

        var keymap = localStorage.getItem("keymap");
        if ((keymap === null) || (keymap.length === 0)) {
            localStorage.setItem("keymap", "");
        }

        //inappbrowser
        var location = localStorage.getItem("location");
        if ((location === null) || (location.length === 0)) {
            localStorage.setItem("location", "yes");
        }

        var hidden = localStorage.getItem("hidden");
        if ((hidden === null) || (hidden.length === 0)) {
            localStorage.setItem("hidden", "no");
        }

        var clearcache = localStorage.getItem("clearcache");
        if ((clearcache === null) || (clearcache.length === 0)) {
            localStorage.setItem("clearcache", "yes");
        }

        var clearsessioncache = localStorage.getItem("clearsessioncache");
        if ((clearsessioncache === null) || (clearsessioncache.length === 0)) {
            localStorage.setItem("clearsessioncache", "yes");
        }

        var zoom = localStorage.getItem("zoom");
        if ((zoom === null) || (zoom.length === 0)) {
            localStorage.setItem("zoom", "yes");
        }

        var hardwareback = localStorage.getItem("hardwareback");
        if ((hardwareback === null) || (hardwareback.length === 0)) {
            localStorage.setItem("hardwareback", "yes");
        }

        var mediaPlaybackRequiresUserAction = localStorage.getItem("mediaPlaybackRequiresUserAction");
        if ((mediaPlaybackRequiresUserAction === null) || (mediaPlaybackRequiresUserAction.length === 0)) {
            localStorage.setItem("mediaPlaybackRequiresUserAction", "yes");
        }

        var target = localStorage.getItem("target");
        if ((target === null) || (target.length === 0)) {
            localStorage.setItem("target", "_self");
        }

        //Media Capture:
        var limitAudio = localStorage.getItem("limitAudio");
        if ((limitAudio === null) || (limitAudio.length === 0)) {
            localStorage.setItem("limitAudio", "1");
        }

        var durationAudio = localStorage.getItem("durationAudio");
        if ((durationAudio === null) || (durationAudio.length === 0)) {
            localStorage.setItem("durationAudio", "10");
        }

        var limitImage = localStorage.getItem("limitImage");
        if ((limitImage === null) || (limitImage.length === 0)) {
            localStorage.setItem("limitImage", "1");
        }

        var limitVideo = localStorage.getItem("limitVideo");
        if ((limitVideo === null) || (limitVideo.length === 0)) {
            localStorage.setItem("limitVideo", "1");
        }

        var durationVideo = localStorage.getItem("durationVideo");
        if ((durationVideo === null) || (durationVideo.length === 0)) {
            localStorage.setItem("durationVideo", "3");
        }

        //Geolocation;
        var maximumAge = localStorage.getItem("maximumAge");
        if ((maximumAge === null) || (maximumAge.length === 0)) {
            localStorage.setItem("maximumAge", "3000");
        }

        var timeout = localStorage.getItem("timeout");
        if ((timeout === null) || (timeout.length === 0)) {
            localStorage.setItem("timeout", "5000");
        }

        var enableHighAccuracy = localStorage.getItem("enableHighAccuracy");
        if ((enableHighAccuracy === null) || (enableHighAccuracy.length === 0)) {
            localStorage.setItem("enableHighAccuracy", "true");
        }

        var flag_search = localStorage.getItem("flag_search");
        if ((flag_search === null) || (flag_search.length === 0)) {
            localStorage.setItem("flag_search", 0);
        }
    },


    receivedEvent: function(id) {
        app.GetBatteryInfo();
    },

    //DIALOGS - cordova-plugin-dialogs
    Alert: function() {

        function onCallback() {
            alert("Simple alert.");
        }

        navigator.notification.alert("Custom alert.", onCallback, "Title", "Ok");
    },

    Confirm: function() {

        function onConfirm(buttonIndex) {
            alert('You selected button: ' + buttonIndex);
        }

        navigator.notification.confirm(
            'Do you want to continue?',
            onConfirm,
            'Title', ['Ok', 'Cancel']
        );
    },

    Prompt: function() {

        function onPrompt(results) {

            navigator.notification.alert("Value: " + results.input1 + "\nOption: " + results.buttonIndex, null, "Information", "Ok");
        }

        navigator.notification.prompt(
            'Enter name Name:',
            onPrompt,
            'Title', ['Ok', 'Cancel'],
            'Anderson'
        );
    },

    Beep: function() {
        navigator.notification.beep(3);
    },


    //battery
    GetBatteryInfo: function() {

        function onBatteryStatus(status) {

            if (status.level > 20) {
                setGood(status.level);
            }

            if (status.isPlugged) {
                j("#plugged").removeClass();
                j("#plugged").addClass('battery-info plugged');
                j("#plugged").text('YES');

                if (localStorage.getItem("status_plugged") == 0) {
                    function onCallback() {
                        localStorage.setItem("status_plugged", 1);
                    }
                    navigator.notification.alert("Plugged Device.", onCallback, "Information", "Ok");
                }
            } else {
                j("#plugged").removeClass();
                j("#plugged").addClass('battery-info unplugged');
                j("#plugged").text('NO');
                localStorage.setItem("status_plugged", 0);
            }
        }


        function onBatteryLow(status) {
            setLow(status.level);
        }

        function onBatteryCritical(status) {
            setCritical(status.level);
        }



        window.addEventListener("batterystatus", onBatteryStatus, true);
        window.addEventListener("batterylow", onBatteryLow, true);
        window.addEventListener("batterycritical", onBatteryCritical, true);

        function setLow(p_status) {
            j("#level").text(p_status + "%");
            j("#level").removeClass();
            j("#level").addClass('battery-info low');
            j("#status").removeClass();
            j("#status").text("LOW");
            j("#status").addClass('battery-info low');
        }

        function setCritical(p_status) {
            j("#level").text(p_status + "%");
            j("#level").removeClass();
            j("#level").addClass('battery-info critical');
            j("#status").removeClass();
            j("#status").text("CRITICAL");
            j("#status").addClass('battery-info critical');
        }

        function setGood(p_status) {
            j("#level").text(p_status + "%");
            j("#level").removeClass();
            j("#level").addClass('battery-info');
            j("#status").removeClass();
            j("#status").text("GOOD");
            j("#status").addClass('battery-info');
        }

    },

    //Accelerometer
    StartAccelerometer: function() {

        app.ClearFieldsAcc();

        function onSuccess(acceleration) {
            j("#accx").val(acceleration.x);
            j("#accy").val(acceleration.y);
            j("#accz").val(acceleration.z);
            j("#acct").val(acceleration.timestamp);
        }

        function onError(error) {
            navigator.notification.alert("Code: " + error.code + "\nMessage:" + error.message, null, "Error", "Ok");
        }


        function onPrompt(results) {

            if (results.buttonIndex == 1) {
                var p_frequency = parseInt(results.input1, 10);

                if (p_frequency) {

                    j.mobile.changePage("#accelerometer", {});

                    var options = {
                        frequency: p_frequency
                    };
                    var watchIDAcc = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
                    localStorage.setItem("watchIDAcc", watchIDAcc);

                } else {
                    function onCallback() {}
                    navigator.notification.alert("Invalid value or null value.", onCallback, "Atention", "Ok");
                    localStorage.setItem("watchIDAcc", "");
                }
            }
        }

        navigator.notification.prompt(
            'Enter frequency for Accelerometer:',
            onPrompt,
            'Accelerometer', ['Ok', 'Cancel'],
            ''
        );
    },

    StopAccelerometer: function() {

        var watchIDAcc = localStorage.getItem("watchIDAcc");
        if (watchIDAcc) {
            navigator.accelerometer.clearWatch(watchIDAcc);

            function onCallback() {}

            navigator.notification.alert("Acceleration will be stopped.", onCallback, "Atention", "Ok");
            app.ClearFieldsAcc();
        }
    },

    ClearFieldsAcc: function() {
        j("#accx").val("");
        j("#accy").val("");
        j("#accz").val("");
        j("#acct").val("");
    },

    //Compass
    StartCompass: function() {

        app.ClearFieldsCompass();

        function onSuccess(heading) {
            j("#magneticHeading").val(heading.magneticHeading);
            j("#trueHeading").val(heading.trueHeading);
            j("#headingAccuracy").val(heading.headingAccuracy);
            j("#timestamp").val(heading.timestamp);
        }

        function onError(error) {
            navigator.notification.alert("Code: " + error.code + "\nMessage:" + error.message, null, "Error", "Ok");
        }

        function onPrompt(results) {

            if (results.buttonIndex == 1) {
                var p_frequency = parseInt(results.input1, 10);

                if (p_frequency) {

                    j.mobile.changePage("#compass", {});

                    var options = {
                        frequency: p_frequency
                    };
                    var watchIDCompass = navigator.compass.watchHeading(onSuccess, onError, options);
                    localStorage.setItem("watchIDCompass", watchIDCompass);

                } else {
                    function onCallback() {}
                    navigator.notification.alert("Invalid value or null value.", onCallback, "Atention", "Ok");
                    localStorage.setItem("watchIDCompass", "");
                }
            }
        }

        navigator.notification.prompt(
            'Enter frequency for Compass:',
            onPrompt,
            'Compass', ['Ok', 'Cancel'],
            ''
        );
    },

    StopCompass: function() {

        var watchIDCompass = localStorage.getItem("watchIDCompass");
        if (watchIDCompass) {
            navigator.compass.clearWatch(watchIDCompass);

            function onCallback() {}

            navigator.notification.alert("Compass will be stopped.", onCallback, "Atention", "Ok");
            app.ClearFieldsCompass();
        }
    },

    ClearFieldsCompass: function() {
        j("#accx").val("");
        j("#accy").val("");
        j("#accz").val("");
        j("#acct").val("");
    },

    //Network
    GetCurrentConnection: function() {

        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';
        navigator.notification.alert(states[networkState], null, "Information", "Ok");
    },


    StartVibration: function() {
        j("#btnStartVibration").attr("disabled", "disabled");
        j("#btnStopVibration").removeAttr("disabled");
        navigator.vibrate(60000);
    },

    StopVibration: function() {
        j("#btnStopVibration").attr("disabled", "disabled");
        j("#btnStartVibration").removeAttr("disabled");
        navigator.notification.cancelVibration();
    },

    //CAMERA:
    Capture: function() {

        j("#image").css("display", "none");

        var quality = localStorage.getItem("quality");
        var destinationType = localStorage.getItem("destinationType");
        var allowEdit = localStorage.getItem("allowEdit");
        var encodingType = localStorage.getItem("encodingType");
        var correctOrientation = localStorage.getItem("correctOrientation");
        var saveToPhotoAlbum = localStorage.getItem("saveToPhotoAlbum");
        var cameraDirection = localStorage.getItem("cameraDirection");

        if (allowEdit == "true") {
            allowEdit = true;
        } else {
            allowEdit = false;
        }

        if (correctOrientation == "true") {
            correctOrientation = true;
        } else {
            correctOrientation = false;
        }

        if (saveToPhotoAlbum == "true") {
            saveToPhotoAlbum = true;
        } else {
            saveToPhotoAlbum = false;
        }

        var options = {
            quality: parseInt(quality),
            destinationType: parseInt(destinationType),
            allowEdit: allowEdit,
            encodingType: parseInt(encodingType),
            correctOrientation: correctOrientation,
            saveToPhotoAlbum: saveToPhotoAlbum,
            cameraDirection: parseInt(cameraDirection),
            targetWidth: 285,
            targetHeight: 400
                //mediaType:Camera.MediaType.PICTURE,
                //sourceType:navigator.camera.PictureSourceType.CAMERA
        };

        navigator.camera.getPicture(onSuccess, onFail, options);

        function onSuccess(p_image) {

            j("#image").css("display", "block");

            if (destinationType == 1) {
                j("#image").attr("src", p_image);
            } else {
                //DATA_URL   
            }
        }

        function onFail(message) {
            navigator.notification.alert("Error: " + message, null, "Error", "Ok");
        }

        //app.ClearCamera();
    },

    Select: function() {

        j("#image").css("display", "none");
        j("#videoCam").css("display", "none");

        var mediaType = parseInt(localStorage.getItem("mediaType"));

        var options = {
            mediaType: mediaType,
            targetWidth: 285,
            targetHeight: 400,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        };

        navigator.camera.getPicture(onSuccess, onFail, options);

        function onSuccess(p_image) {

            //j("#div_cam").css("text-align","center").hide().show();

            if (mediaType == 0) {
                j("#div_cam").css("text-align", "center");
                j("#image").css("display", "block");
                j("#image").attr("src", p_image);
            } else {
                j("#div_cam").css("text-align", "center");
                j("#videoCam").css("display", "block");
                j("#videoCam").attr("src", p_image);
            }
        }

        function onFail(error) {
            navigator.notification.alert("Code: " + error.code + "\nMessage:" + error.message, null, "Error", "Ok");
        }
    },


    GetConfigCamera: function() {
        var quality = parseInt(localStorage.getItem("quality"));
        var destinationType = localStorage.getItem("destinationType");
        var allowEdit = localStorage.getItem("allowEdit");
        var encodingType = localStorage.getItem("encodingType");
        var mediaType = localStorage.getItem("mediaType");
        var correctOrientation = localStorage.getItem("correctOrientation");
        var saveToPhotoAlbum = localStorage.getItem("saveToPhotoAlbum");
        var cameraDirection = localStorage.getItem("cameraDirection");
        j("#quality").attr("value", quality);
        j("#destinationType").val(destinationType);
        j("#allowEdit").val(allowEdit);
        j("#encodingType").val(encodingType);
        j("#mediaType").val(mediaType);
        j("#correctOrientation").val(correctOrientation);
        j("#saveToPhotoAlbum").val(saveToPhotoAlbum);
        j("#cameraDirection").val(cameraDirection);
    },

    SetConfigCamera: function() {

        localStorage.setItem("quality", j("#quality").val());
        localStorage.setItem("destinationType", j("#destinationType").val());
        localStorage.setItem("allowEdit", j("#allowEdit").val());
        localStorage.setItem("encodingType", j("#encodingType").val());
        localStorage.setItem("mediaType", j("#mediaType").val());
        localStorage.setItem("correctOrientation", j("#correctOrientation").val());
        localStorage.setItem("saveToPhotoAlbum", j("#saveToPhotoAlbum").val());
        localStorage.setItem("cameraDirection", j("#cameraDirection").val());
    },

    ClearCamera: function() {

        navigator.camera.cleanup(onSuccess, onFail);

        function onSuccess() {}

        function onFail(error) {
            navigator.notification.alert("Code: " + error.code + "\nMessage:" + error.message, null, "Error", "Ok");
        }
    },

    //STATUSBAR
    SetColorName: function() {
        var color = j("#cmbColorName").val();
        StatusBar.backgroundColorByName(color);
    },

    SetColorHex: function() {

        function ValidHexColor(p_color) {
            var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(p_color);
            return isOk;
        }

        var color = j("#colorHex").val();

        if (ValidHexColor(color)) {
            StatusBar.backgroundColorByHexString(color);
        } else {
            navigator.notification.alert("Invalid hex color.", null, "Atention", "Ok");
            j("#colorHex").val("");
        }

    },

    ShowHideStatusBar: function() {

        if (StatusBar.isVisible) {
            j("#btnShowHide").html("SHOW");
            StatusBar.hide();
        } else {
            j("#btnShowHide").html("HIDE");
            StatusBar.show();
        }
    },

    ShowSplash: function() {
        navigator.splashscreen.show();
        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 3000);
    },

    //CONTACTS
    PickContact: function(){

        navigator.contacts.pickContact(function(contact){

            if(contact.displayName !== null)
            {
                j("#displayNamePick").val(contact.displayName);
            }
            
            if(contact.phoneNumbers !== null)
            {
                j("#phoneNumberPick").val(contact.phoneNumbers[0].value);
            }
            
            if(contact.emails !== null)
            {
                j("#emailPick").val(contact.emails[0].value);
            }

            j.mobile.changePage("#pickContact", {});

        },function(err){
            navigator.notification.alert('Code: ' + err.code + '\n' + 'Message: ' + err.message, null, "Error", "Ok");
        });
    },

    
    FetchContact : function(){
        
        function onSuccess(contacts) {
            if(contacts.length > 0)
            {
               j("#titleSearch").empty();
               j("#titleSearch").text("Fetch Contacts"); 
               app.ListContacts(contacts);
               j.mobile.changePage("#searchContacts", {});
               localStorage.setItem("flag_search", 1); 
            }
            else
            {
                navigator.notification.alert("No contact was found.", null, "Information", "Ok");
            }
        };

        function onError(error) {
            navigator.notification.alert("Code: " + error.code + "\nMessage: " + error.message, null, "Error", "Ok");
        };

        var options = new ContactFindOptions();
        options.multiple = true;
        options.desiredFields = [
            navigator.contacts.fieldType.id,
            navigator.contacts.fieldType.displayName,
            navigator.contacts.fieldType.emails,
            navigator.contacts.fieldType.familyName,
            navigator.contacts.fieldType.givenName,
            navigator.contacts.fieldType.name,
            navigator.contacts.fieldType.phoneNumbers
        ];
        
        options.hasPhoneNumber = true;
        var fields  = [
            navigator.contacts.fieldType.id,
            navigator.contacts.fieldType.displayName,
            navigator.contacts.fieldType.emails,
            navigator.contacts.fieldType.familyName,
            navigator.contacts.fieldType.givenName,
            navigator.contacts.fieldType.name,
            navigator.contacts.fieldType.phoneNumbers
        ];
        
        localStorage.setItem("flag_search", 0);
        navigator.contacts.find(fields, onSuccess, onError, options);
    },

    SearchContact : function(p_name){
        
        function onSuccess(contacts) 
        {
            if(contacts.length > 0)
            {
               j("#titleSearch").empty();
               j("#titleSearch").text("Search Contacts"); 
               app.ListContacts(contacts);    
               j.mobile.changePage("#searchContacts", {});
               localStorage.setItem("flag_search", 1);
            }
            else
            {
                navigator.notification.alert("No contact was found.", null, "Information", "Ok");
            }
        };

        function onError(error) {
            navigator.notification.alert("Code: " + error.code + "\nMessage: " + error.message, null, "Error", "Ok");
        };

        var options = new ContactFindOptions();
        options.multiple = true;
        options.desiredFields = [
            navigator.contacts.fieldType.id,
            navigator.contacts.fieldType.displayName,
            navigator.contacts.fieldType.emails,
            navigator.contacts.fieldType.familyName,
            navigator.contacts.fieldType.givenName,
            navigator.contacts.fieldType.name,
            navigator.contacts.fieldType.phoneNumbers
        ];
        
        options.hasPhoneNumber = true;
        var fields  = [
            navigator.contacts.fieldType.id,
            navigator.contacts.fieldType.displayName,
            navigator.contacts.fieldType.emails,
            navigator.contacts.fieldType.familyName,
            navigator.contacts.fieldType.givenName,
            navigator.contacts.fieldType.name,
            navigator.contacts.fieldType.phoneNumbers
        ];
        
        function onPrompt(results) {
            
            if (results.buttonIndex == 1) {
                if(results.input1){
                    options.filter = results.input1;
                    localStorage.setItem("flag_search", 0);
                    navigator.contacts.find(fields, onSuccess, onError, options);
                }
                else{
                    navigator.notification.alert("Name for search is empty.", null, "Attention", "Ok");
                }
            }
        }

        navigator.notification.prompt(
            'Enter Name for search:',
            onPrompt,
            'Search Contact', ['Ok', 'Cancel'],
            ''
        );
    },

    ListContacts : function(contacts){

        var i = 0;
        navigator.notification.alert('Found: ' + contacts.length + ' contacts.', null, "Information", "Ok");
        j.mobile.changePage("#searchContacts", {});   
        j('tbody').empty();
        var line_tr = "";
        var id = "";

        j.each(contacts, function (key, value) {

            line_tr = "<tr>";
            line_tr = line_tr + "<td class='hide'>" + value.id + "</td>";
            line_tr = line_tr + "<td>" + value.displayName + "</td>";
            line_tr = line_tr + "<td>" + value.phoneNumbers[0].value  + "</td>";
            line_tr = line_tr + "<td><a href='#'><img src='img/delete.ico' class='img-delete-contact'></a></td>";
            line_tr = line_tr + "</tr>";

            j('#tbContacts > tbody').append(line_tr);

            j("tbody > tr").bind("mouseover", function ()
            {
                id = j(this).find("td:eq(0)").text();
            });
        });

        j("tbody > tr").find("td:eq(3)").bind("click", function ()
        {
            app.DeleteContact(id);
        });

        j('#tbContacts').table("refresh");
    },


    DeleteContact : function(p_id){

        function onConfirm(buttonIndex) 
        {
            if(buttonIndex == 1)
            {
                j('tbody').empty();
                function onSuccess(contact) 
                {
                    if(contact.length > 0)
                    {
                        function onSuccess() {
                            navigator.notification.alert("Contact deleted successfully.", null, "Information", "Ok");
                            j.mobile.changePage("#contacts", {});
                        };

                        function onError(error) {
                            navigator.notification.alert("Error: " + error.code + "\nMessage: " + error.message, null, "Information", "Ok");
                        };

                        var contact_remove = contact.pop();
                        contact_remove.remove(onSuccess, onError);
                    }
                    else
                    {
                        navigator.notification.alert("No contact was delete.", null, "Information", "Ok");
                    }
                };

                function onError(error) 
                {
                    navigator.notification.alert("Code: " + error.code + "\nMessage: " + error.message, null, "Error", "Ok");
                };

                var options = new ContactFindOptions();
                options.filter = p_id;
                options.multiple = true;
                options.desiredFields = [
                    navigator.contacts.fieldType.id,
                    navigator.contacts.fieldType.displayName,
                    navigator.contacts.fieldType.emails,
                    navigator.contacts.fieldType.familyName,
                    navigator.contacts.fieldType.givenName,
                    navigator.contacts.fieldType.name,
                    navigator.contacts.fieldType.phoneNumbers
                ];
                
                options.hasPhoneNumber = true;
                var fields  = [
                    navigator.contacts.fieldType.id,
                    navigator.contacts.fieldType.displayName,
                    navigator.contacts.fieldType.emails,
                    navigator.contacts.fieldType.familyName,
                    navigator.contacts.fieldType.givenName,
                    navigator.contacts.fieldType.name,
                    navigator.contacts.fieldType.phoneNumbers
                ];
                
                navigator.contacts.find(fields, onSuccess, onError, options);
            }
        }

        navigator.notification.confirm(
            'Do you want delete this contact?',
            onConfirm,
            'Title', ['Ok', 'Cancel']
        );
    },


    SaveContact : function(){

        function onSuccess(contact) {
            navigator.notification.alert("Save Success.", null, "Information", "Ok");
            app.ClearFieldSaveContact();
        };

        function onError(contactError) {
            navigator.notification.alert("Error: " + contactError.code + "\nMessage: " + contactError.message, null, "Information", "Ok");
        };
        
        var fname = j("#fname").val();
        var lname = j("#lname").val();
        var phone = j("#phoneNumber").val();
        var email = j("#email").val();
    
        var contact = navigator.contacts.create();
        contact.displayName = fname;
        contact.nickname = fname;

        var name = new ContactName();
        name.givenName = fname;
        name.familyName = lname;
        contact.name = name;

        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField("Home",phone,true);

        function ValidateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        var emails = [];
        emails[0] = new ContactField("Home",email,true);

        contact.phoneNumbers = phoneNumbers;
        contact.emails = emails; 

        if(fname)
        {
            if(phone)
            {
                if(email)
                {
                    if(ValidateEmail(email))
                    {
                         contact.save(onSuccess,onError);
                    }
                    else
                    {
                        navigator.notification.alert("Email is invalid.", null, "Attention", "Ok");
                    }
                }
                else
                {
                    contact.save(onSuccess,onError);
                }
            }
            else
            {
                navigator.notification.alert("Phone Number is empty.", null, "Attention", "Ok");
            }
        }
        else
        {
            navigator.notification.alert("First Name is empty.", null, "Attention", "Ok");
        }
    },

    ClearFieldSaveContact:function(){
        j("#fname").val("");
        j("#lname").val("");
        j("#phoneNumber").val("");
        j("#email").val("");
    },

    /*********************************************************************************************************/


    GetGlobalization: function(op) {

        function errorCallback(error) {
            navigator.notification.alert('Code: ' + error.code + '\n' + 'Message: ' + error.message, null, "Information", "Ok");
        }

        switch (op) {
            case 1:
                navigator.globalization.getPreferredLanguage(
                    function(language) {
                        navigator.notification.alert('Language: ' + language.value + '\n', null, "Information", "Ok");
                    },
                    errorCallback);
                break;
            case 2:
                navigator.globalization.getLocaleName(
                    function(locale) {
                        navigator.notification.alert('Locale: ' + locale.value, null, "Information", "Ok");
                    },
                    errorCallback
                );
                break;
            case 3:
                navigator.globalization.dateToString(
                    new Date(),
                    function(date) {
                        navigator.notification.alert('Date: ' + date.value, null, "Information", "Ok");
                    },
                    errorCallback, {
                        formatLength: 'short',
                        selector: 'date and time'
                    }
                );
                break;
            case 4:
                navigator.globalization.getCurrencyPattern(
                    'USD',
                    function(pattern) {
                        navigator.notification.alert('Pattern: ' + pattern.pattern + '\n' +
                            'Code: ' + pattern.code + '\n' +
                            'Fraction: ' + pattern.fraction + '\n' +
                            'Rounding: ' + pattern.rounding + '\n' +
                            'Decimal: ' + pattern.decimal + '\n' +
                            'Grouping: ' + pattern.grouping, null, "Information", "Ok");

                    },
                    errorCallback
                );
                break;
            case 5:
                navigator.globalization.getDateNames(
                    function(names) {
                        for (var i = 0; i < names.value.length; i++) {
                            navigator.notification.alert('Month: ' + names.value[i], null, "Information", "Ok");
                        }
                    },
                    errorCallback, {
                        type: 'wide',
                        item: 'months'
                    }
                );
                break;
            case 6:
                navigator.globalization.getDatePattern(
                    function(date) {
                        navigator.notification.alert('Pattern: ' + date.pattern, null, "Information", "Ok");
                    },
                    errorCallback, {
                        formatLength: 'short',
                        selector: 'date and time'
                    }
                );
                break;
            case 7:
                navigator.globalization.getFirstDayOfWeek(
                    function(day) {
                        navigator.notification.alert('Day: ' + day.value, null, "Information", "Ok");
                    },
                    errorCallback
                );
                break;
            case 8:
                navigator.globalization.getNumberPattern(
                    function(pattern) {
                        navigator.notification.alert('Pattern: ' + pattern.pattern + '\n' +
                            'Symbol: ' + pattern.symbol + '\n' +
                            'Fraction: ' + pattern.fraction + '\n' +
                            'Rounding: ' + pattern.rounding + '\n' +
                            'Positive: ' + pattern.positive + '\n' +
                            'Negative: ' + pattern.negative + '\n' +
                            'Decimal: ' + pattern.decimal + '\n' +
                            'Grouping: ' + pattern.grouping, null, "Information", "Ok");
                    },
                    errorCallback, {
                        type: 'decimal'
                    }
                );
                break;
            case 9:
                navigator.globalization.isDayLightSavingsTime(
                    new Date(),
                    function(date) {
                        navigator.notification.alert('isDayLightSavingsTime: ' + date.dst, null, "Information", "Ok");
                    },
                    errorCallback
                );
                break;
            case 10:
                navigator.globalization.numberToString(
                    3.1415926,
                    function(number) {
                        navigator.notification.alert('Number: ' + number.value, null, "Information", "Ok");
                    },
                    errorCallback, {
                        type: 'decimal'
                    }
                );
                break;
            case 11:
                navigator.globalization.stringToDate(
                    '9/25/2012',
                    function(date) {
                        navigator.notification.alert('Month:' + date.month + ' Day:' + date.day + ' Year:' + date.year + '\n', null, "Information", "Ok");
                    },
                    errorCallback, {
                        selector: 'date'
                    }
                );
                break;
            case 12:
                navigator.globalization.stringToNumber(
                    '1234.56',
                    function(number) {
                        navigator.notification.alert('Number: ' + number.value, null, "Information", "Ok");
                    },
                    errorCallback, {
                        type: 'decimal'
                    }
                );
                break;
            default:
                console.log("Invalid.")
                break;
        }
    },

    /*********************************************************************************************************/

    //GEOLOCATION

    TestConn: function() {

        if (navigator.connection.type == Connection.NONE) {
            return false;
        } else {
            return true;
        }
    },

    GetCurrentLocation: function(option) {

        function onSuccess(position) {

            j("#map").css("display", "block");
            app.SetDetailsLocation(position);

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var latLong = new google.maps.LatLng(latitude, longitude);

            var options = {
                center: latLong,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            var map = new google.maps.Map(document.getElementById("map"), options);

            var marker = new google.maps.Marker({

                position: latLong,
                map: map,
                title: "My Location"
            });
        }

        function onError(error) {
            navigator.notification.alert('Error:' + error.code + "\nDescription:" + error.message, null, "Error", "Ok");
        }

        if (app.TestConn()) {
            app.GetConfigGeolocation();

            var maximumAge = parseInt(j("#maximumAge").val());
            var timeout = parseInt(j("#timeout").val());
            var enableHighAccuracy = j("#enableHighAccuracy").val();

            var options_watch = {
                maximumAge: maximumAge,
                timeout: timeout,
                enableHighAccuracy: enableHighAccuracy
            };

            if (option == 0) {
                j.mobile.changePage("#geolocation", {});
            }

            var watchGeoID = navigator.geolocation.watchPosition(onSuccess, onError, options_watch);
            localStorage.setItem("watchGeoID", watchGeoID);
        } else {
            navigator.notification.alert('No network connection.', null, "Attention", "Ok");
        }
    },

    ClearWatchGeolocation: function() {

        var watchGeoID = localStorage.getItem("watchGeoID");
        navigator.geolocation.clearWatch(watchGeoID);
    },

    GetConfigGeolocation: function() {

        var maximumAge = localStorage.getItem("maximumAge");
        var timeout = localStorage.getItem("timeout");
        var enableHighAccuracy = localStorage.getItem("enableHighAccuracy");
        j("#maximumAge").val(maximumAge);
        j("#timeout").val(timeout);
        j("#enableHighAccuracy").val(enableHighAccuracy);
    },

    SetConfigGeolocation: function() {

        localStorage.setItem("maximumAge", j("#maximumAge").val());
        localStorage.setItem("timeout", j("#timeout").val());
        localStorage.setItem("enableHighAccuracy", j("#enableHighAccuracy").val());
    },

    SetDetailsLocation: function(position) {

        j("#latitudeGeo").val(position.coords.latitude);
        j("#longitudeGeo").val(position.coords.longitude);
        j("#altitudeGeo").val(position.coords.altitude);
        j("#accuracyGeo").val(position.coords.accuracy);
        j("#altitudeaccuracyGeo").val(position.coords.altitudeAccuracy);
        j("#headingGeo").val(position.coords.heading);
        j("#speedGeo").val(position.coords.speed);
        j("#timestampGeo").val(position.timestamp);
    },

    /*
      StartCurrentLocation : function(){

        var key = app.GetKeyMap();
        alert(key);
        if (key != ""){
            j("#keymap").val(key);
            j.mobile.changePage("#geolocation", {});   
            app.GetCurrentLocation();
        }
        else
        {
            key = prompt("Enter your key:");
            if(key){
                j("#keymap").val(key);
                localStorage.setItem("keymap",key);
                j.mobile.changePage("#geolocation", {});   
                app.GetCurrentLocation();
            }else{

                var opcao = confirm("Do you want create a key for Google Maps?");
                if(opcao == true)
                {
                    app.CreateKeyGoogle();
                }
            }
        }
    },

    CreateKeyGoogle : function(){

        var inAppBrowserRef = undefined;

        function showHelp(url) {

            var target = "_self";
            var options = "location=no,hidden=yes,clearcache=no,clearsessioncache=yes,zoom=no,hardwareback=yes,mediaPlaybackRequiresUserAction=yes";
            inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);

            with (inAppBrowserRef) {

                addEventListener('loadstart', loadStartCallBack);
                addEventListener('loadstop', loadStopCallBack);
                addEventListener('loaderror', loadErrorCallBack);
            }
        }

        function loadStartCallBack() {
            $('#status-message').text("Loading Please Wait ...");
        }

        function loadStopCallBack() {

            if (inAppBrowserRef != undefined) {
                inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;" });
                $('#status-message').text("");
                inAppBrowserRef.show();
            }
        }

        function loadErrorCallBack(params) {

            $('#status-message').text("");
            var scriptErrorMesssage =
               "alert('Sorry we cannot open that page. Message from the server is : "
               + params.message + "');"

            inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);
            inAppBrowserRef.close();
            inAppBrowserRef = undefined;
        }

        function executeScriptCallBack(params) {

            if (params[0] == null) {

                $('#status-message').text(
                   "Sorry we couldn't open that page. Message from the server is : '"
                   + params.message + "'");
            }
        }

        showHelp("http://127.0.0.1/");
    },

    GetKeyMap:function(){
        var keymap = localStorage.getItem("keymap");
        j("#keymap").val(keymap);
        return keymap;
    },

    ClearKeyMap : function(){

        var result = confirm("Deseja excluir essa chave?");
        if(result == true){
            j("#keymap").val("");
            localStorage.setItem("keymap", "");
            navigator.notification.alert('Chave excluída com sucesso.', null, "Information", "Ok");
            j.mobile.changePage("#home", {});   
        }
    },
    */

    /********************************************************************************************************************/

    OpenIntroPage: function() {

        var inAppBrowserRef = undefined;

        var location = j("#location").val();
        var hidden = j("#hidden").val();
        var clearcache = j("#clearcache").val();
        var clearsessioncache = j("#clearsessioncache").val();
        var zoom = j("#zoom").val();
        var hardwareback = j("#hardwareback").val();
        var mediaPlaybackRequiresUserAction = j("#mediaPlaybackRequiresUserAction").val();
        var target = j("#target").val();
        var options = "location=" + location + ",hidden=" + hidden + ",clearcache=" + clearcache + ",clearsessioncache=" + clearsessioncache + ",zoom=" + zoom + ",hardwareback=" + hardwareback + ",mediaPlaybackRequiresUserAction=" + mediaPlaybackRequiresUserAction;

        function showHelp(url) {

            inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);

            with(inAppBrowserRef) {

                addEventListener('loadstart', loadStartCallBack);
                addEventListener('loadstop', loadStopCallBack);
                addEventListener('loaderror', loadErrorCallBack);
            }
        }

        function loadStartCallBack() {
            $('#status-message').text("Loading Please Wait ...");
        }

        function loadStopCallBack() {

            if (inAppBrowserRef != undefined) {
                inAppBrowserRef.insertCSS({
                    code: "body{font-size: 25px;"
                });
                $('#status-message').text("");
                inAppBrowserRef.show();
            }
        }

        function loadErrorCallBack(params) {

            $('#status-message').text("");
            var scriptErrorMesssage =
                "alert('Sorry we cannot open that page. Message from the server is : " + params.message + "');"

            inAppBrowserRef.executeScript({
                code: scriptErrorMesssage
            }, executeScriptCallBack);
            inAppBrowserRef.close();
            inAppBrowserRef = undefined;
        }

        if (app.TestConn()) {
            showHelp("http://phonegap.com/");
        } else {
            navigator.notification.alert('No network connection.', null, "Attention", "Ok");
        }
    },

    GetConfigInappbrowser: function() {

        var location = localStorage.getItem("location");
        var hidden = localStorage.getItem("hidden");
        var clearcache = localStorage.getItem("clearcache");
        var clearsessioncache = localStorage.getItem("clearsessioncache");
        var zoom = localStorage.getItem("zoom");
        var hardwareback = localStorage.getItem("hardwareback");
        var mediaPlaybackRequiresUserAction = localStorage.getItem("mediaPlaybackRequiresUserAction");
        var target = localStorage.getItem("target");
        j("#location").val(location);
        j("#hidden").val(hidden);
        j("#clearcache").val(clearcache);
        j("#clearsessioncache").val(clearsessioncache);
        j("#zoom").val(zoom);
        j("#hardwareback").val(hardwareback);
        j("#mediaPlaybackRequiresUserAction").val(mediaPlaybackRequiresUserAction);
        j("#target").val(target);
    },

    SetConfigInappbrowser: function() {

        localStorage.setItem("location", j("#location").val());
        localStorage.setItem("hidden", j("#hidden").val());
        localStorage.setItem("clearcache", j("#clearcache").val());
        localStorage.setItem("clearsessioncache", j("#clearsessioncache").val());
        localStorage.setItem("zoom", j("#zoom").val());
        localStorage.setItem("hardwareback", j("#hardwareback").val());
        localStorage.setItem("mediaPlaybackRequiresUserAction", j("#mediaPlaybackRequiresUserAction").val());
        localStorage.setItem("target", j("#target").val());
    },

    //MediaCapture
    GetMediaCapture: function() {

        var limitAudio = localStorage.getItem("limitAudio");
        var durationAudio = localStorage.getItem("durationAudio");
        var limitImage = localStorage.getItem("limitImage");
        var limitVideo = localStorage.getItem("limitVideo");
        var durationVideo = localStorage.getItem("durationVideo");
        j("#limitAudio").attr("value", limitAudio);
        j("#durationAudio").val(durationAudio);
        j("#limitImage").val(limitImage);
        j("#limitVideo").val(limitVideo);
        j("#durationVideo").val(durationVideo);
    },

    SetMediaCapture: function() {

        localStorage.setItem("limitAudio", j("#limitAudio").val());
        localStorage.setItem("durationAudio", j("#durationAudio").val());
        localStorage.setItem("limitImage", j("#limitImage").val());
        localStorage.setItem("limitVideo", j("#limitVideo").val());
        localStorage.setItem("durationVideo", j("#durationVideo").val());
    },

    CaptureImage: function() {

        var captureSuccess = function(mediaFiles) {
            app.SetCaptureDetails(mediaFiles);
        };

        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Error');
        };

        var limitImage = parseInt(j("#limitImage").val());
        var options = {
            limit: limitImage
        };
        navigator.device.capture.captureImage(captureSuccess, captureError, options);
    },

    CaptureVideo: function() {

        var captureSuccess = function(mediaFiles) {
            app.SetCaptureDetails(mediaFiles);
        };

        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Error');
        };

        var limitVideo = parseInt(j("#limitVideo").val());
        var durationVideo = parseInt(j("#durationVideo").val());

        var options = {
            limit: limitVideo,
            duration: durationVideo
        };

        var options = null;

        navigator.device.capture.captureVideo(captureSuccess, captureError, options);
    },

    CaptureAudio: function() {

        var captureSuccess = function(mediaFiles) {
            app.SetCaptureDetails(mediaFiles);
        };

        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Error');
        };

        var limitAudio = parseInt(j("#limitAudio").val());
        var durationAudio = parseInt(j("#durationAudio").val());

        var options = {
            limit: limitAudio,
            duration: durationAudio
        };

        navigator.device.capture.captureAudio(captureSuccess, captureError, options);
    },

    SetCaptureDetails: function(mediaFiles) {
        j("#divDetailCapture").show();
        j("#filename").text(mediaFiles[0].name);
        j("#fullpath").text(mediaFiles[0].fullPath);
        j("#type").text(mediaFiles[0].type);
        var dateMod = new Date(mediaFiles[0].lastModifiedDate);
        j("#lastdate").text(dateMod.getMonth() + "/" + dateMod.getDate() + "/" + dateMod.getFullYear() + " " + dateMod.getHours() + ":" + dateMod.getMinutes());
        j("#size").text(Math.round(mediaFiles[0].size / 1024) + " KB");
    },

    GetInfoDevice: function() {

        j("#versioncordova").val(device.cordova);
        j("#model").val(device.model);
        j("#platform").val(device.platform);
        j("#uuid").val(device.uuid);
        j("#osv").val(device.version);
        j("#manufacture").val(device.manufacturer);
        j("#isvirtual").val(device.isVirtual);
        j("#serialnumber").val(device.serial);
    },


    GetMessage: function(op) {

        var message = "";

        if (op == 1) {
            message = "Example with the use of Media's plugin will be developed on version future this application.";
        } else if (op == 2) {
            message = "Example with the use of File's plugin will be developed on version future this application.";
        } else {
            message = "Example with the use of File Transfer's plugin will be developed on version future this application.";

        }

        navigator.notification.alert(message, null, "Information", "Ok");
    },




};