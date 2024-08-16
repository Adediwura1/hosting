 var menuBar=document.querySelector('#menuBar')
 var sideBar=document.querySelector('.sideBar')
 menuBar.addEventListener('click', ()=>{
     sideBar.classList.toggle('active')
 })

 const popUp = document.querySelector('.popUp')
 const popupClose = document.querySelector('.popupClose')

if(popUp){
    popupClose.addEventListener('click', ()=>{
        popUp.classList.add("hidePopup") 
    });
    window.addEventListener('load', ()=>{
     setTimeout(()=>{
        popUp.classList.remove('hidePopup');
     }, 1000);   
    });
}


function storeMe(){
var popupStorage = document.getElementById('popupStorage').value

if(popupStorage === ""){
    alert("input your email")
}
else{
alert('Email Received')
var emailStore = localStorage.setItem('popupStorage', popupStorage);

}


};



function promoStorage(){
var promoEmail = document.getElementById('Text').value;

var promoStore = localStorage.setItem('promoEmail', promoEmail);

if(promoEmail === ""){
    alert('Provide your email')
}

else{
    alert('Email Saved')
}

}