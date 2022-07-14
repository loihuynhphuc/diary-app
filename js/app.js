var $= document.querySelector.bind(document);
var $$= document.querySelectorAll.bind(document);
var boxContent = document.getElementById("box-content");


if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}
function ready(){

   
    //Button list active
        linksActive();
         // toggle button
    var searchToggle = $(".search__icon");
    searchToggle.addEventListener("click",searchOpen);
    // swicth toggle change background
    var buttonSwicth = $("input[name='input_swicth']");
    buttonSwicth.addEventListener("click",changeBackground);
    // render diary
    var buttonDiary = $("#Libary");
    buttonDiary.addEventListener("click",showDiaryStart);
    
    //  click button wirte
    var buttonWrite = $("#Write");
    buttonWrite.addEventListener('click',showWritePlayOut);
    // click button new icon
    renderLibary();
    // click button home
    var buttonHome = $("#home");
    buttonHome.addEventListener("click",showPageHome)
 
}

// show page home 
function showPageHome(){
    if(this.className==="links__link active"){
        
    }
}



// Show page write
function showWritePlayOut(e){
    var dateNowDiary = new Date().toLocaleDateString();
        if(this.className==="links__link active"){
            boxContent.innerHTML=`<div class="diary">
            <div class="diary__content">
                   <div class="diary__content-header">
                       <h2 class="diary__content-introduce">Hãy viết kế hoạch của bạn nào</h2>
                       <span class="diary__content-date">${dateNowDiary}</span>
                       <div class="status hide-on-mobile-tablet">
                           <input type="checkbox" title="Trạng thái công việc của bạn" class="diary__content-status"></input>
                       </div>
                   </div>
                   <label for="title" class="diary__title">Tiêu đề: <input type="text" name="Title" class="form__control"></label>
                   <label for="Subtitle" class="diary__subtitle">Ghi chú: <input type="text" name="Subtitle" class="form__control-sub"></label>
                   <textarea name="" id="diary__content-textarea" cols="30" rows="20"></textarea> 
                 <div class="box-btn" onclick="getContentNewDiary('${dateNowDiary}')"> <i class="fa-solid fa-circle-plus btn-new__icon" ></i>
               </div`
        }
}
   // handle add new diary
  function getContentNewDiary(dateNowDiary){
       var complete="";
       var dateNowDiar =dateNowDiary;
       var dataDiaryNew={

       }
       var buttonAddDiary = $(".btn-new__icon")
    if(buttonAddDiary){   
        var form__control = $(".form__control");
        var form__controlSub = $(".form__control-sub");
        var diaryContent = $("#diary__content-textarea");
        var completeStatus = $(".diary__content-status");
        if(completeStatus.checked){
            complete = "complete";
            
        }else if(!completeStatus.checked){
            complete = " ";
        }
        dataDiaryNew.Title = form__control.value;
        dataDiaryNew.Subtitle = form__controlSub.value;
        dataDiaryNew.diaryContent = diaryContent.value;
        dataDiaryNew.complete = complete;
        dataDiaryNew.Date = dateNowDiar;
    }
  
    createApiLiabry(dataDiaryNew);

}
// create post diary
function  createApiLiabry(data){
    var urlLiary = "http://localhost:3000/Diary";
        fetch(urlLiary,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(data)
            })
            
            .then(response=>response.json())
            .then( getDataDiary(renderDiary));
            renderLibary();
    }
    

// get Data Libary
function getLibary(){
    return new Promise(function(resolve,reject){
    var urlLiary = "http://localhost:3000/Diary";
            if(urlLiary.startsWith("http://localhost:3000/Diary")){
                fetch(urlLiary).then(response=>response.json()).then(dataResponse=>resolve(dataResponse));
            }else{
                reject("lỗi rồi");
            }
    })
}
function renderLibary(){
    getLibary()
    .then(dataLibary => {
        var libaryContai = $(".libary"); 
       var htmlLibary= dataLibary.map(function(dataLi){
            return ` <div class="libary__box" id="libary__box-${dataLi.id}">
            <div class="libary__box-infor">
                <i class="fa-solid fa-trash-can" onclick="removeApiLiabry(${dataLi.id})"></i>
                <span class="libary__box-infor__time" >${dataLi.Date}</span>
                <span class="libary__box-infor__color ${dataLi.complete} "></span>
            </div>
            <div class="libary-content">
                <h2 class="libary-content__title">${dataLi.Title}</h2>
                <p class="libary-content__note">
                   ${dataLi.diaryContent}
                </p>
            </div>
        </div>`
        })
        libaryContai.innerHTML = htmlLibary.join(" ");
    })
    .catch(error => console.log(error));
}
// remove libary
function removeApiLiabry(idLibary){
var urlLiary = "http://localhost:3000/Diary";
    fetch(urlLiary +"/"+idLibary,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        .then(response=>response.json())
        .then(function(){
            var boxLibary = $("#libary__box-"+idLibary);
            if( boxLibary){
                boxLibary.remove();
            }
        })
}


//show libary
function showDiaryStart(dataDiary){
        
        if(this.className ==="links__link active"){
           getDataDiary(renderDiary);
        }
}
// render diary
function renderDiary(dataDiary){
  var htmlDataDiary=  dataDiary.map(function(dataDiar,index){
        return `   <div class="page-diary">
        <div class="page-diary__infor">
            <div class="page-diary__infor-important ${dataDiar.complete}"></div>
            <i class="page-diary__infor-date">${dataDiar.Date}</i>
        </div>
        <div class="page-diary__content">
            <h2 class="page-diary__content-title">${dataDiar.Title}</h2>
            <h3 class="page-diary__content-subtitle">${dataDiar.Subtitle}</h3>
            <div class="diary-content">
              ${dataDiar.diaryContent}
            </div>
        </div>
    </div>`
    })
    boxContent.innerHTML = htmlDataDiary.join(" ");
}

// change backgground
function changeBackground(){
    let mainBackground = $("main");
    let circelThree = $(".circel-three");
    let circelOne = $(".circel-one");
    if(this.checked){
        circelOne.classList.add("change");
        circelThree.style.background="black";
        mainBackground.style.background="linear-gradient(to right top,#000000,#000000)";
    }else{
        circelOne.classList.remove("change");
        circelThree.style.background="linear-gradient(to right bottom,rgba(255,255,255,0.7),rgba(255,255,255,0.3))";
        mainBackground.style.background="linear-gradient(to right top,#65dfc9,#6cdbeb)";
    }

}
function linksActive(){
    // links dashboard
    var links= document.querySelectorAll(".links__link");
    for(let i = 0 ; i < links.length; i++){
        links[i].onclick = function(){
            let j= 0;
            while(j < links.length){
                links[j++].className = "links__link";
            }
            links[i].className = "links__link active";
        }
    }
   
}

// open button search
function searchOpen(){
    var inputSearch = $(".search__control");
    this.parentElement.classList.toggle("open");
    inputSearch.focus();
}
// get data from json-sever
function getDataDiary(callback){
    var data2=[];
    var urlDiary ="http://localhost:3000/Diary";
    fetch(urlDiary)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

