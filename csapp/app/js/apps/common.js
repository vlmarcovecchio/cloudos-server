String.prototype.trim = String.prototype.trim || function trim() { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };

CloudOs = {
    json_safe_parse: function (j) {
        return j ? JSON.parse(j) : null;
    },

    login: function (auth_response) {
        sessionStorage.setItem('cloudos_session', auth_response.sessionId);
        CloudOs.set_account(auth_response.account);
    },

    logout: function () {
        sessionStorage.clear();
    },

    account: function () {
        return CloudOs.json_safe_parse(sessionStorage.getItem('cloudos_account'));
    },

    set_account: function (account) {
        sessionStorage.setItem('cloudos_account', JSON.stringify(account));
    }

};

// Temporary TZ list, will be delivered via API in the future

var timeZoneList = [{ id:0,  dfault:false, ioffset:-720, offset:"GMT-12:00", dname:"Etc/GMT+12", lname:"International Date Line West"},
                    { id:1,  dfault:false, ioffset:-660, offset:"GMT-11:00", dname:"Pacific/Samoa", lname:"Midway Island, Samoa"},
                    { id:2,  dfault:false, ioffset:-600, offset:"GMT-10:00", dname:"HST", lname:"Hawaii"},
                    { id:3,  dfault:false, ioffset:-540, offset:"GMT-9:00", dname:"AST", lname:"Alaska"},
                    { id:4,  dfault:false, ioffset:-480, offset:"GMT-8:00", dname:"PST", lname:"Pacific Time (US & Canada)"},
                    { id:5,  dfault:false, ioffset:-420, offset:"GMT-7:00", dname:"MST", lname:"Mountain Time (US & Canada)"},
                    { id:6,  dfault:false, ioffset:-420, offset:"GMT-7:00", dname:"MST", lname:"Chihuahua, La Paz, Mazatlan"},
                    { id:7,  dfault:false, ioffset:-420, offset:"GMT-7:00", dname:"US/Arizona", lname:"Arizona"},
                    { id:8,  dfault:false, ioffset:-360, offset:"GMT-6:00", dname:"CST", lname:"Central Time (US & Canada)"},
                    { id:9,  dfault:false, ioffset:-360, offset:"GMT-6:00", dname:"CST", lname:"Guadalajara, Mexico City, Monterrey"},
                    { id:10, dfault:false, ioffset:-360, offset:"GMT-6:00", dname:"Canada/Saskatchewan", lname:"Saskatchewan"},
                    { id:11, dfault:false, ioffset:-300, offset:"GMT-5:00", dname:"EST", lname:"Eastern Time (US & Canada)"},
                    { id:12, dfault:false, ioffset:-300, offset:"GMT-5:00", dname:"America/Indianapolis", lname:"Indiana (East)"},
                    { id:13, dfault:false, ioffset:-300, offset:"GMT-5:00", dname:"America/Bogota", lname:"Bogota, Lima, Quito"},
                    { id:14, dfault:false, ioffset:-240, offset:"GMT-4:00", dname:"Canada/Atlantic", lname:"Atlantic Time (Canada)"},
                    { id:15, dfault:false, ioffset:-240, offset:"GMT-4:00", dname:"America/Caracas", lname:"Caracas, La Paz"},
                    { id:16, dfault:false, ioffset:-240, offset:"GMT-4:00", dname:"America/Santiago", lname:"Santiago"},
                    { id:17, dfault:false, ioffset:-210, offset:"GMT-3:30", dname:"Canada/Newfoundland", lname:"Newfoundland"},
                    { id:18, dfault:false, ioffset:-180, offset:"GMT-3:00", dname:"BET", lname:"Brasilia"},
                    { id:19, dfault:false, ioffset:-180, offset:"GMT-3:00", dname:"America/Buenos_Aires", lname:"Buenos Aires, Georgetown"},
                    { id:20, dfault:false, ioffset:-180, offset:"GMT-3:00", dname:"America/Godthab", lname:"Greenland"},
                    { id:21, dfault:false, ioffset:-120, offset:"GMT-2:00", dname:"Etc/GMT+2", lname:"Mid-Altantic"},
                    { id:22, dfault:false, ioffset:-60, offset:"GMT-1:00", dname:"Atlantic/Azores", lname:"Azores"},
                    { id:23, dfault:false, ioffset:-60, offset:"GMT-1:00", dname:"Atlantic/Cape_Verde", lname:"Cape Verde"},
                    { id:24, dfault:false, ioffset:0, offset:"GMT", dname:"Africa/Casablanca", lname:"Casablanca, Monrovia"},
                    { id:25, dfault:false, ioffset:0, offset:"GMT", dname:"GB", lname:"GMT: London, Dublin, Lisbon"},
                    { id:26, dfault:false, ioffset:60, offset:"GMT+1:00", dname:"CET", lname:"Central European Time"},
                    { id:27, dfault:false, ioffset:120, offset:"GMT+2:00", dname:"EET", lname:"Eastern European Time"},
                    { id:28, dfault:false, ioffset:120, offset:"GMT+2:00", dname:"CAT", lname:"Harare, Pretoria"},
                    { id:29, dfault:false, ioffset:120, offset:"GMT+2:00", dname:"Israel", lname:"Israel Standard Time"},
                    { id:30, dfault:false, ioffset:180, offset:"GMT+3:00", dname:"Asia/Baghdad", lname:"Baghdad"},
                    { id:31, dfault:false, ioffset:180, offset:"GMT+3:00", dname:"Asia/Kuwait", lname:"Arabia Standard Time"},
                    { id:32, dfault:false, ioffset:180, offset:"GMT+3:00", dname:"Europe/Moscow", lname:"Moscow"},
                    { id:33, dfault:false, ioffset:180, offset:"GMT+3:00", dname:"EAT", lname:"Eastern African Time"},
                    { id:34, dfault:false, ioffset:210, offset:"GMT+3:30", dname:"Iran", lname:"Iran"},
                    { id:35, dfault:false, ioffset:240, offset:"GMT+4:00", dname:"Asia/Dubai", lname:"Dubai, Muscat"},
                    { id:36, dfault:false, ioffset:240, offset:"GMT+4:00", dname:"Asia/Baku", lname:"Baku, Tbilisi, Yerevan"},
                    { id:37, dfault:false, ioffset:270, offset:"GMT+4:30", dname:"Asia/Kabul", lname:"Afganistan"},
                    { id:38, dfault:false, ioffset:300, offset:"GMT+5:00", dname:"Asia/Yekaterinburg", lname:"Ekaterinburg"},
                    { id:39, dfault:false, ioffset:300, offset:"GMT+5:00", dname:"Asia/Karachi", lname:"Islamabad, Karachi, Tashkent"},
                    { id:40, dfault:false, ioffset:330, offset:"GMT+5:30", dname:"IST", lname:"India Standard Time"},
                    { id:41, dfault:false, ioffset:345, offset:"GMT+5:45", dname:"Asia/Katmandu", lname:"Nepal"},
                    { id:42, dfault:false, ioffset:360, offset:"GMT+6:00", dname:"Asia/Almaty", lname:"Almaty, Novosibirsk"},
                    { id:43, dfault:false, ioffset:360, offset:"GMT+6:00", dname:"Asia/Dhaka", lname:"Astana, Dhaka"},
                    { id:44, dfault:false, ioffset:360, offset:"GMT+6:00", dname:"Asia/Colombo", lname:"Sri Lanka"},
                    { id:45, dfault:false, ioffset:390, offset:"GMT+6:30", dname:"Asia/Rangoon", lname:"Rangoon"},
                    { id:46, dfault:false, ioffset:420, offset:"GMT+7:00", dname:"Asia/Bangkok", lname:"Bangkok, Hanoi, Jakarta"},
                    { id:47, dfault:false, ioffset:420, offset:"GMT+7:00", dname:"Asia/Krasnoyarsk", lname:"Krasnoyarsk"},
                    { id:48, dfault:false, ioffset:480, offset:"GMT+8:00", dname:"Asia/Hong_Kong", lname:"Beijing, Hong Kong, Chongquing"},
                    { id:49, dfault:false, ioffset:480, offset:"GMT+8:00", dname:"Asia/Irkutsk", lname:"Irkutsk, Ulaan Bataar"},
                    { id:50, dfault:false, ioffset:480, offset:"GMT+8:00", dname:"Asia/Kuala_Lumpur", lname:"Kuala Lumpur, Singapore"},
                    { id:51, dfault:false, ioffset:480, offset:"GMT+8:00", dname:"Australia/Perth", lname:"Perth"},
                    { id:52, dfault:false, ioffset:480, offset:"GMT+8:00", dname:"Asia/Taipei", lname:"Taipei"},
                    { id:53, dfault:false, ioffset:540, offset:"GMT+9:00", dname:"JST", lname:"Tokyo, Osaka, Sapporo"},
                    { id:54, dfault:false, ioffset:540, offset:"GMT+9:00", dname:"Asia/Yakutsk", lname:"Yakutsk"},
                    { id:55, dfault:false, ioffset:570, offset:"GMT+9:30", dname:"Australia/Adelaide", lname:"Adelaide"},
                    { id:56, dfault:false, ioffset:570, offset:"GMT+9:30", dname:"Australia/Darwin", lname:"Darwin"},
                    { id:57, dfault:false, ioffset:600, offset:"GMT+10:00", dname:"Australia/Brisbane", lname:"Brisbane"},
                    { id:58, dfault:false, ioffset:600, offset:"GMT+10:00", dname:"Australia/Canberra", lname:"Canberra, Melbourne, Sydney"},
                    { id:59, dfault:false, ioffset:600, offset:"GMT+10:00", dname:"Pacific/Guam", lname:"Guam, Port Moresby"},
                    { id:60, dfault:false, ioffset:600, offset:"GMT+10:00", dname:"Australia/Hobart", lname:"Tasmania, Hobart"},
                    { id:61, dfault:false, ioffset:600, offset:"GMT+10:00", dname:"Asia/Vladivostok", lname:"Vladivostok"},
                    { id:62, dfault:false, ioffset:660, offset:"GMT+11:00", dname:"Asia/Magadan", lname:"Magadan, New Caledonia"},
                    { id:63, dfault:false, ioffset:720, offset:"GMT+12:00", dname:"Pacific/Auckland", lname:"Auckland, Wellington"},
                    { id:64, dfault:false, ioffset:720, offset:"GMT+12:00", dname:"Asia/Kamchatka", lname:"Kamchatka"},
                    { id:65, dfault:false, ioffset:720, offset:"GMT+12:00", dname:"Pacific/Fiji", lname:"Fiji"}];
