// js part 
// 1- setting box 
// check if there 's color in local storage 
let mainColors= localStorage.getItem('color_option');
let seetingBox=document.querySelector('.setting-box');
let icon= document.querySelector('.icon-img');
let landingPage=document.querySelector('.landing-page');
let bulletDisplay=document.querySelector('.nav-bullets');;
let backGroundOption=true;
//variable control interval function
let backGroundInterval;
const bulletOptins=document.querySelectorAll('.testing-option span');
// get array of images 
let arrayOfImgs=["llanding1.jpeg","landing6.jpg","landing8.jpg","landing4.jpeg","landing5.jpg"];

let bulletLocalItem=localStorage.getItem("bullets-option");
let backGroundLocalStorage=localStorage.getItem('background_option');
// handle active state 
function handleActiveState(ev){
    // Remove active class from All childrens
    let removeActive=ev.target.parentElement.querySelectorAll('.active');
    removeActive.forEach(element => {

    element.classList.remove("active");      
    });
      // add active class on the element i pressed on 
    ev.target.classList.add('active');
}
icon.addEventListener('click', ()=> {
    seetingBox.classList.toggle("open");
}
)


if (mainColors != null ){
    // the main idea with local storage that if we refresh the page the color will still the same 
    document.documentElement.style.setProperty('--main-color',localStorage.getItem('color_option'));

    // check for active class 
    document.querySelectorAll('.colors-list li').forEach( element => {
        element.classList.remove('active');
        // add activ class  if data-color == local storage color
        if (element.dataset.color === mainColors){
            element.classList.add('active');
        }
    }); 

}
// check if there 's random background item in local storage

if (backGroundLocalStorage != null){
   // very important note ==> the backgroundlocalstorge string value not boolen !!!! 
    if (backGroundLocalStorage === "true"){
    backGroundOption=true;
    }
    else {
        backGroundOption=false;  
    }
    // remove active class from all spans
    document.querySelectorAll('.random-backgrounds span').forEach (element => {
        element.classList.remove("active");
        if (backGroundLocalStorage === "true"){
            document.querySelector(".random-backgrounds span.yes").classList.add("active");
            
        }
        else {
            document.querySelector(".random-backgrounds span.No").classList.add("active"); 
        
        }
    });
}  

if (bulletLocalItem != null ){
    bulletOptins.forEach ( option => {
        option.classList.remove("active");
    });
    if (bulletLocalItem === "block"){
        bulletDisplay.style.display='block';
        document.querySelector('.testing-option .yes').classList.add('active');
    }
    else {
        bulletDisplay.style.display='none';
        document.querySelector('.testing-option .No').classList.add('active');
    }
}

///////////////////////////////////////////////////////////////////////
// 2- switch colors
const colorsElements=document.querySelectorAll('.colors-list li');
// loop on the li elemnts to get color of it and assign this color to the root  
colorsElements.forEach( li => {
    
    li.addEventListener('click',(e)=> {
        //console.log(e.target.dataset.color);
        
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        // set color in local storage 
        localStorage.setItem('color_option',e.target.dataset.color);
        // Remove active class from All childrens
        handleActiveState(e);
        // add active class on the element i pressed on 
        e.target.classList.add('active');
    });
});
///////////////////////////////////////////////////////////////////////
// 3- switch background
const backGroundImages=document.querySelectorAll('.random-backgrounds span');
// loop on the li elemnts to get color of it and assign this color to the root  
backGroundImages.forEach( span => {
    
    span.addEventListener('click',(e)=> {
        // Remove active class from All childrens
        let removeActive=e.target.parentElement.querySelectorAll('.active');
        handleActiveState(e);
        if (e.target.dataset.background === 'yes'){
            backGroundOption=true;
            randomizedIMages ();
            localStorage.setItem("background_option",true);        
        }
        else {
            backGroundOption=false;
            // clear interval means stop the loading 
            clearInterval(backGroundInterval);
            localStorage.setItem("background_option",false); 
        }
    });
});
///////////////////////////////////////////////////////////////////////
// 4- Random background logic 

function randomizedIMages (){
    if ( backGroundOption === true){
        backGroundInterval=setInterval(() => {
            // get random random number between  0---->4  
            let RandomNumber=Math.floor(Math.random()* arrayOfImgs.length);
            //console.log(RandomNumber);
            // change background image url
            landingPage.style.backgroundImage=`url(${arrayOfImgs[RandomNumber]})`;  
        },5000)
    }
}
////////////////////////////////////////////////////////////////////////////
// 5- controll skill progress 
let ourSkills=document.querySelector(".skills");
window.onscroll=function(){
    // calculate the height of scrolling
    let skillsOffsetTop=ourSkills.offsetTop;
    // get outerheight 
    let outHeight=ourSkills.offsetHeight;
    // window height 
    let windowHeight=this.innerHeight;
    // window scroll top 
    let windowScrollTop=this.scrollY;
    
    if (windowScrollTop+1 > (skillsOffsetTop + outHeight - windowHeight)){
            let allSkills= document.querySelectorAll('.skill-box .skill-progress span');
            allSkills.forEach( skill => {
                skill.style.width=skill.dataset.progress;
            });
    }

}
/////////////////////////////////////////////////////////////
// 6- create pop-box
let ourGallery = document.querySelectorAll(".gallery img"); 
ourGallery.forEach( img => {
    img.addEventListener('click',(e) => {
    // create overlay 
    let overlay = document.createElement("div");
    overlay.className="popup-overlay";
    //Append overlay to the body 
    document.body.appendChild(overlay);
    // create pop-up 
    let popUp=document.createElement("div");
    popUp.className='popup-box';
    if (img.alt != null){
        // create heading 
        let imageHeading =document.createElement("h3");
        let imgText=document.createTextNode(img.alt);
        // append text to the heading 
        imageHeading.appendChild(imgText);
        imageHeading.style.marginBottom="13px";
        // append the heading to the popup 
        popUp.appendChild(imageHeading);
    }
    
    // create image 
    let popUpImage=document.createElement("img");
    // set image source 
    popUpImage.src=img.src;
    popUp.appendChild(popUpImage);
    // add popup image to popup box 
    document.body.appendChild(popUp);
      // create The close span 
    let closeButton=document.createElement("span");
    let closeButtonText=document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className="close-button";
    // add close button to popUp 
    popUp.appendChild(closeButton);

    });
        
});
//////////////////////////////////////////////////////////////
// 7- create close button 
document.addEventListener('click',function(e){
        if (e.target.className == "close-button"){
            // Remove current popup 
            e.target.parentNode.remove();
            document.querySelector(".popup-overlay").remove();
        }
});
////////////////////////////////////////////////////////////////
// 8- controll tool-tip 
// select all bullets 
const navBullets = document.querySelectorAll('.nav-bullets .bullet');

navBullets.forEach (bullet => {
    
    bullet.addEventListener('click', (e)=> {
        document.querySelector(e.target.dataset.section).scrollIntoView(
            {
                behavior:"smooth"
            }
        );
    });
});
////////////////////////////////////////////////////////////////
// 9- testing options and controll bullets 
bulletOptins.forEach (bulletOption => {
    bulletOption.addEventListener('click',(e)=> {
        if (e.target.dataset.display == 'No'){
            
            bulletDisplay.style.display='none'; 
            localStorage.setItem("bullets-option","none");         
        }
        else {
            bulletDisplay.style.display='block';
            localStorage.setItem("bullets-option","block"); 
        }
        handleActiveState(e);
    });
});
///////////////////////////////////////////////
// 10- Reset button 
document.querySelector(".reset").onclick= function (){
    // clean local storage 
    localStorage.removeItem('bullets-option');
    localStorage.removeItem('color_option');
    localStorage.removeItem('background_option');

    // load the website 
    window.location.reload();
}
//////////////////////////////////////////////////////
// activate toggle menue 
let toggleBtn=document.querySelector('.toogle');
let links=document.querySelector('.links');
toggleBtn.onclick=function(e){
    e.stopPropagation();
    this.classList.toggle('menue-active');
    links.classList.toggle('open');  
    
}
/////////////////////////////////////////////////
// close menue if i click any where in the window
document.addEventListener('click',function(e){
    if (e.target !=toggleBtn && e.target != links){
          // check if menue is open 
        
        if (links.classList.contains('open')){
        
        toggleBtn.classList.toggle('menue-active');
        links.classList.toggle('open');
        }
    }
});
// stop propagation on meneu
links.onclick=function(e){
    e.stopPropagation();
}; 