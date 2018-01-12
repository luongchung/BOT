const fs = require("fs");
const login = require("facebook-chat-api");
var arr_ID=["a"];
login({email: "chunglv42@wru.vn", password: "Chxhcnvndltdhp1."}, (err, api) => {
    if(err) return console.error(err);
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
	api.setOptions({forceLogin: true, selfListen: false, logLevel: "silent", listenEvents: true});
	api.listen(function callback(err, message)
	{
		//Ví dụ nếu mình set message.body = /Jarvis thì bot sẽ print api.sendMessage = Send bobs n vegena... 
		if(message.body === "sdt") { 
			console.log("FB.com/" + message.threadID + ' - Xin số điện thoại');
			api.sendMessage("SDT: 0903401724", message.threadID); 
			return;
		}
		if(arr_ID.indexOf(message.threadID)==-1)//nếu ko có trong 
		{
			///push id người chát
			arr_ID.push(message.threadID);
			//message.body = tin nhắn bạn send cho bot
			if (message.body){
				console.log("FB.com/" + message.threadID + ' - Message: '+message.body);
				api.sendMessage("Chào bạn! \nĐây là hệ thống trả lời tự động. Hiện tại Chung đang bận, sẽ trả lời bạn sau...\nLiên hệ gấp: 0903401724.\nChúc bạn có một ngày làm việc vui vẻ!", message.threadID);
				return;
			}
		}
	});
});
