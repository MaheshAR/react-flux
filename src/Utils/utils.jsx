import $ from 'jquery'; 

class Utils{
    apicall(url, method, data, callback){
        $.ajax({
            type: method,
            url: url,
            data: data
        })
        .done(function(data){
            callback(data);
        })
        .fail(function(data){
            callback(data);
        });
    }

    setUserInfo(userInfo){
        window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    getUserInfo(){
        return JSON.parse(window.sessionStorage.getItem("userInfo"));
    }
}

export default new Utils()