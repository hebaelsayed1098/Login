var emailInput = document.getElementById("Email");
var passInput = document.getElementById("Password");
var nameInput = document.getElementById("userName");
var signText = document.getElementById("sign");
var loginBtn = document.getElementById("loginBtn");
var container = document.getElementById("container");
var group = document.getElementById("group");
var nav = document.getElementById("navbar");
var message = document.getElementById("welcomeMess");
var mes = document.getElementById("mesg");
var users ;
if(localStorage.getItem('users')){
    users = JSON.parse(localStorage.getItem('users'));
    for(var i =0  ;i <users.length ;i++){
        console.log(users[i].email);
        console.log(users[i].passInput);
    }
  }
  else{
    users =[];
  }
function login(){

    if(loginBtn.innerText == "Sign Up"){
        var user ={
            userName : nameInput.value,
            email : emailInput.value,
            passInput:passInput.value
         }
         var check = checkEmail(users,user.email);

         if(check){
            invalidData(check);
         }
         else{
            var res = testRegx(emailInput.value);
            if(res){
         users.push(user);
         localStorage.setItem('users' , JSON.stringify(users) );
         mes.classList.remove("d-none");
         mes.classList.add("text-success");
         mes.textContent = "Success"; 
            }
            else{
                invalidData("Email should be valid EX : heba123@gmail.com");  
            } 
    }
}
    else{
        var users_storage = JSON.parse(localStorage.getItem('users'));
        console.log(users_storage);
        var name= checkifexist(users_storage , emailInput.value , passInput.value);
       if(name){
        nav.classList.remove("d-none");
        container.classList.add("d-none");
        message.classList.remove("d-none");
        message.textContent = "Welcome " + name;
       }
       else{
        invalidData("check mail or password");
        
       }    
    }
   
}
function signUp(){
    mes.classList.add("d-none");
    clear();
    if((signText.innerText ) == "Sign Up"){
        nameInput.classList.remove("d-none");
        signText.innerText = "SignIn";
        loginBtn.innerHTML = "Sign Up";
    }
    else{
        nameInput.classList.add("d-none");
        signText.innerText = "Sign Up";  
        loginBtn.innerHTML = "Login";
    }
}


  function logout(){
    message.classList.add("d-none");
    container.classList.remove("d-none");
    nav.classList.add("d-none");
    clear();
  }
 function clear(){
    nameInput.value="";
    emailInput.value="";
    passInput.value="";
 }
 function checkifexist(arr , email , pass){
for(var i =0  ;i <arr.length ;i++){
if(arr[i].email == email && arr[i].passInput == pass ){
    return arr[i].userName;
}
}
}
function invalidData(mess){
    mes.classList.remove("d-none");
    mes.classList.add("text-danger");
    mes.textContent = mess;
}
function checkEmail(arr, email){
    for(var i =0  ;i <arr.length ;i++){
        if(arr[i].email == email ){
            console.log("exist");
            return "email already exists";
        }
}
}
function testRegx(txt){
    var regx = /^[A-z]{3,7}[1-9]{2,5}@[a-z]{3,6}.com/ ;
    if(regx.test(txt)){
        return true;
    }
    else{
        return false;
    }
}
