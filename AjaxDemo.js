let XMLHttpRequest = require ("xmlhttprequest").XMLHttpRequest;
function makeAJAXCall(methodType, url,callback,async = true,data=null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log("State Changed Called. Read State: "+
                    xhr.readyState+" Status:"+xhr.status);

        if(xhr.readyState === 4){
            if(xhr.status === 200 || xhr.status === 201 ){
                callback(xhr.responseText);
            }
            else if (xhr.status >= 400){
                console.log("Handle 400 Client Error or 500 Server Error");
            }
        }
    }

    xhr.open(methodType, url, async);

    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else xhr.send();
    console.log(methodType+" request send to the server");
    
}

const getURL = "http://localhost:3000/employees/1"
function getUserDetails(data){
    console.log("Get user Data: "+data)
}

makeAJAXCall("GET",getURL,getUserDetails,true);

const deleteURL = "http://localhost:3000/employees/4"
function deleteUser(data){
    console.log(" user Deleted: "+data)
}

makeAJAXCall("DELETE",deleteURL,deleteUser,true);

const postURL = "http://localhost:3000/employees/"
const empData = {"id":5,"name" : "Avinash", "salary": "35000"};
function addUser(data){
    console.log(" user Added: "+data)
}

makeAJAXCall("POST",postURL,addUser,true, empData);

