function chkChg (){
    console.log("this: ", this);
}
var qType = '';
var crtTab = 'privacy';
//var sfaType = '';
$('select[name=slWrapperSelect]').change(function (){
  qType = $(this).val();
  console.log('qType:', qType);
  if (qType == 'multi-choice') {
    $('#privacyMCA, #prReqBtn').addClass('d-block');
    $('#privacySFA').removeClass('d-block');
    $('#prReqBtn').addClass('mg-l-10');
  } else if (qType == 'short-form') {
    $('#privacyMCA').removeClass('d-block');
    $('#privacySFA, #prReqBtn').addClass('d-block');
    $('#prReqBtn').addClass('mg-l-10');
    $('#privacyMCA .input-group.mg-t-10').remove();
    $('#slWrapper2 option:eq(0)').prop("selected", true);
  } else if (qType == 'short-form-auto') {
    $('#privacyMCA').removeClass('d-block');
    $('#privacySFA, #prReqBtn').addClass('d-block');
    $('#qIp').addClass('d-none');
    $('#prReqBtn').removeClass('mg-l-10');
    $('#slWrapper2 option:eq(0)').prop("selected", true);
  } else if (qType == 's-multi-choice') {
    $('#surveyMCA, #suReqBtn').addClass('d-block');
    $('#surveySFA').removeClass('d-block');
    $('#suReqBtn').addClass('mg-l-10');
  } else if (qType == 's-short-form') {
    $('#surveyMCA').removeClass('d-block');
    $('#surveySFA, #suReqBtn').addClass('d-block');
    $('#suReqBtn').addClass('mg-l-10');
    $('#surveyMCA .input-group.mg-t-10').remove();
    $('#slWrapper4 option:eq(0)').prop("selected", true);
  }
   else if (qType == '') {
    $('#privacyMCA, #privacySFA, #prReqBtn, #surveyMCA, #surveySFA, #suReqBtn').removeClass('d-block');
    $('#privacyMCA .input-group.mg-t-10').remove();
    $('#surveyMCA .input-group.mg-t-10').remove();
  }
  if (crtTab == 'privacy') {
    $('#prReqBtn').val(qType);
    $('#qIp, #mcIp0').val('');
  } else if (crtTab == 'survey') {
    $('#suReqBtn').val(qType);
    $('#qIpS, #mcIpS0').val('');
  }
  
});

// $('select[name="sfaSelect"]').change(function(){
//   sfaType = $('select[name="sfaSelect"]').val();
//   $('select[name="sfaSelect"]').val(sfaType);
// });

var delCnt = 1;

$('button[name=regBtn]').on('click', function(){
  var crtTab = $(this).val();
  var pushId = ['#privacyMCA', '#surveyMCA'];
  delCnt = $('#groupRelative>div').length;
  var delCntS = $('#groupRelativeS>div').length;
  
  var addHtml = '<div id=addNum'+delCnt+' class="input-group mg-t-10 reset"><div class="input-group-prepend"><span class="input-group-text"><i class="icon tx-16 lh-0 op-6"></i>'+(delCnt+1)+'</span></div><input id="mcIp'+delCnt+'" type="text" class="form-control" placeholder="선택 답안을 입력해 주세요."><button onclick="rmvThis(this)" name="minusIp" type="submit" class="btn btn-outline-light mg-l-10"><i class="icon ion-minus tx-14 "></i></button></div>';
  var addHtmlS = '<div id=addNumS'+delCntS+' class="input-group mg-t-10 reset"><div class="input-group-prepend"><span class="input-group-text"><i class="icon tx-16 lh-0 op-6"></i>'+(delCntS+1)+'</span></div><input id="mcIpS'+delCntS+'" type="text" class="form-control" placeholder="선택 답안을 입력해 주세요."><button onclick="rmvThis(this)" name="minusIp" type="submit" class="btn btn-outline-light mg-l-10"><i class="icon ion-minus tx-14 "></i></button></div>';


  console.log('crtTab:',crtTab);
  if(crtTab == 'privacy') {
    console.log('pushId:', pushId[0]);
    $(pushId[0]+' #groupRelative').append(addHtml);
  } else if (crtTab == 'survey'){
    console.log('test survey');
    $(pushId[1]+' #groupRelativeS').append(addHtmlS)
  }
  ++delCnt;
});


$('input[name^=certi-chk]').change(function(){
  var keyVal = $(this).val();
  console.log('tab:', crtTab);

  if (keyVal == 'GA' && crtTab == 'privacy') {
    $('#relativeBox .certi-file').addClass('d-block');
  } else if(keyVal == 'GA' && crtTab == 'survey') {
    $('#relativeBox2 .certi-file').addClass('d-block');
  } else {
    $('.certi-file').removeClass('d-block');
  }

});

$('select[name=sfaSelect]').change(function(){
  var crtVal = $('#prReqBtn').val();
  var reqAddVal = new Array();
  
  reqAddVal.push(crtVal);
  reqAddVal.push($(this).val());
  
  console.log('reqAddVal: ', reqAddVal);
  $('#prReqBtn').val(reqAddVal);
});

function rmvThis (req){
  var delElId = req.parentNode.id;
  var primStr = delElId.replace(/[0-9]/g,"");
  var startNum = delElId.replace(/[^0-9]/g,"");
  if (crtTab == 'privacy'){
    var reLeng = $('#groupRelative>div').length;
  } else if (crtTab == 'survey') {
    var reLeng = $('#groupRelativeS>div').length;
  }
  

  req.parentNode.remove();

  // mc-num reset
  for(var j=startNum; j<reLeng; j++ ){
    $('#'+primStr+j+' .input-group-text').text(j);
  }  

  // id reset
  $('[id^=addNum]').attr('id','');
  $('[id^=mcIp]').attr('id','');
  $('[id^=addNum] .input-group-text').text(' ');
  
  for( var i=0; i<reLeng; i++ ){
    // console.log('i=',i)
    if (crtTab == 'privacy'){
      $('#groupRelative>div:nth-child('+(i+1)+')').attr('id','addNum'+i);
      $('#addNum'+i+' input').attr('id','mcIp'+i);
    } else if (crtTab == 'survey') {
      $('#groupRelativeS>div:nth-child('+(i+1)+')').attr('id','addNumS'+i);
      $('#addNumS'+i+' input').attr('id','mcIpS'+i);
    }
    
  }


  
  --delCnt;
}

var reqCnt = 0;
function reqAdd(req) {
  var reqType = req.value;
  var reqArr = reqType.split(',');

  
  var mcaTtl = $('#qIp').val();
  var sfaTtl = $('#qIpS').val();
  var pTabQType = $('#slWrapper select').val();
  var sTabQType = $('#slWrapper3 select').val();
  
  console.log('reqType: ', reqType);

  if (qType == 'multi-choice' || qType == 'short-form') {
    var qNum = $('#collapseOne .card-block').length +1;
    var mcaPreviewA = '<div id="q'+(qNum - 1)+'" class="card-block" name="'+qType+'"><div class="col-md-12 mg-y-10"><div class="list-group pd-b-20"><div class="list-group-item"><div class="media justify-content-center align-items-center"><div class="media-body"><h6 class="tx-inverse mg-0"><span class="pre-ttl-num">'+qNum+'.&nbsp;</span>'+mcaTtl+'</h6></div><i onclick="qRmvReq('+"'q"+(qNum - 1)+"'"+');" class="icon ion-ios-close-empty tx-28 mg-l-20 question-set"></i></div></div>';
  } else if (qType == 's-multi-choice' || qType == 's-short-form') {
    var qNum = $('#collapseOneS .card-block').length +1;
    var mcaPreviewA = '<div id="q'+(qNum - 1)+'" class="card-block" name="'+qType+'"><div class="col-md-12 mg-y-10"><div class="list-group pd-b-20"><div class="list-group-item"><div class="media justify-content-center align-items-center"><div class="media-body"><h6 class="tx-inverse mg-0"><span class="pre-ttl-num">'+qNum+'.&nbsp;</span>'+sfaTtl+'</h6></div><i onclick="qRmvReq('+"'q"+(qNum - 1)+"'"+');" class="icon ion-ios-close-empty tx-28 mg-l-20 question-set"></i></div></div>';
  }
  
  var mcaPreviewB = '';
  var mcaPreviewC = '</div></div></div>';

  if ((pTabQType =='' && crtTab=='privacy') || (sTabQType =='' && crtTab =='survey') ){
    alert('질문 유형을 선택해주세요.');
    return false;
  }

  if ( (pTabQType == 'multi-choice' || pTabQType == 'short-form') && mcaTtl == '') {
    alert('질문 내용을 입력해주세요');
    return false;
  }

  if ( (sTabQType == 's-multi-choice' || sTabQType == 's-short-form') && sfaTtl == '') {
    alert('질문 내용을 입력해주세요');
    return false;
  }


  if(qType == 'multi-choice' || qType == 's-multi-choice'){

    switch (qType) {
      case 'multi-choice':
        var reqMCALength = $('#groupRelative input').length;
        for (var i=0; i<reqMCALength; i++){
          if($('#mcIp'+i).val() == ''){
            alert('선택 답안을 입력해주세요');
            return false;
          }
          mcaPreviewB += '<div class="list-group-item pd-y-6"><div class="media"><div class="media-body"><label class="rdiobox"><input name="question-radio'+(reqCnt+1)+'" value="'+(i+1)+'" type="radio"><span>'+$('#mcIp'+i).val()+'</span></label></div></div></div>';
        }
        break;
      case 's-multi-choice':
        var reqMCALength = $('#groupRelativeS input').length;
        for (var i=0; i<reqMCALength; i++){
          if($('#mcIpS'+i).val() == ''){
            alert('선택 답안을 입력해주세요');
            return false;
          }
          mcaPreviewB += '<div class="list-group-item pd-y-6"><div class="media"><div class="media-body"><label class="rdiobox"><input name="question-radio'+(reqCnt+1)+'" value="'+(i+1)+'" type="radio"><span>'+$('#mcIpS'+i).val()+'</span></label></div></div></div>';
        }
        break;
    }
//  console.log('reqMCAArr: ', reqMCAArr);
//  console.log('reqMCALength: ', reqMCALength);


  } else if (qType == 'short-form' || qType == 's-short-form') {
    switch(qType){
      case 'short-form':
        var sfaType = $('select[name="sfaSelect"]').val();
        break;
      case 's-short-form':
        var sfaType = $('select[name="sfaSelectS"]').val();
        break;
    }
    
    console.log('sfaType: ',sfaType);
    //  sfaPhone   sfaAddr  sfaJumin  sfaEmail  sfaDate sfaFile sfaTxt

    switch(sfaType){
      case '' :
        alert('응답유형을 선택해주세요.');
        return false;
      case 'sfaPhone':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><i class="fa fa-phone tx-16 lh-0 op-6"></i></div></div><input name="sf-phone'+(reqCnt+1)+'" id="phoneMask" type="text" class="form-control" placeholder="010-1234-1234" value=""></div></div></div></div>';
        break;
      case 'sfaAddr':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><input name="sf-addr'+(reqCnt+1)+'" id="" class="form-control" type="text" placeholder="주소를 입력해 주세요" value=""></div></div></div></div>';
        break;
      case 'sfaJumin':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><input id="" class="form-control mg-x-10" name="sf-juminFt'+(reqCnt+1)+'" maxlength="6" oninput="numMax(this);" type="number" value="" placeholder="890123"><input id="" class="form-control mg-x-10" name="sf-juminBk'+(reqCnt+1)+'" maxlength="7" oninput="numMax(this);" type="password" value="" placeholder="1234567"></div></div></div></div>';
        break;
      case 'sfaEmail':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><input name="sf-email'+(reqCnt+1)+'" id="" class="form-control" type="text" placeholder="development@enmad.com" value=""></div></div></div></div>';
        break;
      case 'sfaDate':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><i class="fa fa-calendar tx-16 lh-0 op-6"></i></div></div><input name="sf-date'+(reqCnt+1)+'" id="dateMask" type="text" class="form-control" placeholder="YYYY/MM/DD"></div></div></div></div>';
        break;
      case 'sfaFile':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group wd-md-50p mg-0-auto"><div class="custom-file"><input type="file"  id="sfaFile" name="sf-file'+(reqCnt+1)+'" class="custom-file-input"><label class="custom-file-label">파일을 선택해주세요.</label></div></div></div></div></div>';
        break;
      case 'sfaTxt':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><input name="sf-txt'+(reqCnt+1)+'" id="" class="form-control" type="text" placeholder="답안을 입력해 주세요" value=""></div></div></div></div>';
        break;
      case 'sfaName':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><input name="sf-name'+(reqCnt+1)+'" id="" class="form-control" type="text" placeholder="이름을 입력해 주세요" value=""></div></div></div></div>';
    }
  }
  console.log("mcaPreviewA= ", mcaPreviewA);
  console.log("mcaPreviewB= ", mcaPreviewB);
  if (qType == 'multi-choice' || qType == 'short-form') {
    $('#preview').css('display','block');
    $('#collapseOne').append(mcaPreviewA+mcaPreviewB+mcaPreviewC);
  } else if (qType == 's-multi-choice' || qType == 's-short-form') {
    $('#previewS').css('display','block');
    $('#collapseOneS').append(mcaPreviewA+mcaPreviewB+mcaPreviewC);
  }
  
  

  if(qType == 'short-form' && sfaType == 'sfaPhone' ){
    $('#phoneMask').mask('999-9999-9999');
  } else if (qType == 'short-form' && sfaType == 'sfaDate') {
    $('#dateMask').mask('9999/99/99');
  }


  //question reset
  $('select[name=slWrapperSelect], select[name=sfaSelect], #qIp, #qIpS, #mcIp0, #mcIpS0').val('');
  $('#privacyMCA, #privacySFA, #surveyMCA, #surveySFA').removeClass('d-block');
  $('#prReqBtn, #suReqBtn').addClass('d-none');
  $('#groupRelative .reset, #groupRelativeS .reset').remove();
  

  ++reqCnt;

  /*
  if(reqArr[0] =='multi-choice' && reqArr[1] == null){

  }
  


/*
  주관식 골라놓고 유형선택 없을때
  if(reqArr[0] =='short-form' && reqArr[1] == null){
    alert('응답유형을 선택해주세요.');
    return false;
    
  }
    switch(reqArr[0]) {
      case 'short-form':
          if(){

          }
          break;
  }
*/
  // if(reqArr[0] =='short-form' && reqArr[1] == null){
  //     alert('응답유형을 선택해주세요.');
  //     return false;
  //   } else if(reqArr[0] == 'multi-choice' && mcaVal == null){
  //     alert('no dap');
  //     return false;
  //   } else if(reqArr[0] == 'multi-choice'&& mcaVal > 0){
  //     // multi-choice
  //     alert('ok');


  //   } else if(reqArr[0] == 'short-form'){
  //     alert('short-form!');
  //   } else if(reqArr[0] == 'multi-multi-choice'){
  //     alert('multi-multi-choice!');
  //   } else if(reqArr[0] == 'short-form-auto'){
  //     alert('short-form-auto!');
  //   }

}

function chgIconArrow(){
  if ($('#collapseOne').hasClass('show') == true) {
    $('#chgIconArrow').removeClass('ion-ios-arrow-down');
    $('#chgIconArrow').addClass('ion-ios-arrow-up');
  } else {
    $('#chgIconArrow').addClass('ion-ios-arrow-down');
    $('#chgIconArrow').removeClass('ion-ios-arrow-up');
  }
  
}

function modEvt() {
  qType = 'event-detail';
  /*
  변경 전과 비교해서 똑같으면 {
  alert('변경내용이 없습니다.');
  return false;
  } 안똑같으면 저장,
  비교대상 : 1.이벤트 옵션, 2.문항 (변경/삭제)
  */
  saveEvt();
  

}

function saveEvt() {
  // null valid
  console.log('qtype:',qType);
  if ( (qType == '' || qType == 'multi-choice' || qType == 'short-form') && $('#collapseOne .card-block').length == 0){
    alert('적용된 문항이 없습니다.');
    return false;
  } else if ( (qType == '' || qType == 's-multi-choice' || qType == 's-short-form') && $('#collapseOneS .card-block').length == 0){
    alert('적용된 문항이 없습니다.');
    return false;
  }
  
  spinerModal();

  // result

  if (qType == 'event-detail'){
    var evtType = '.br-pagebody';
  } else {
    var tabVal = $('#createNewEvt>div>ul>li.nav-item a.active').attr('value');
    console.log('tabVal : ', tabVal);
    switch(tabVal) {
      case 'privacy':
        var evtType = '#tabPrivacy';
        break;
      case 'survey':
        var evtType = '#tabSurvey';
        break;
    }
  }
  var evtRst = new Object();
  var qLeng = $(evtType+' div[id^=q]').length;

  console.log('test qLeng: ', qLeng);
  console.log('test evtType: ', evtType);

  evtRst['crtTab'] = crtTab;
  evtRst['eventName'] = $(evtType+' input[name="eventName"]').val();
  evtRst['eventDescript'] = $(evtType+' textarea[name="eventDescript"]').val();
  evtRst['eventDateSt'] = $(evtType+' input[name="eventDateSt"]').val();
  evtRst['eventDateEd'] = $(evtType+' input[name="eventDateEd"]').val();
  evtRst['eventCert'] = $(evtType+' input[name="certi-chk"]:checked').val();
  evtRst['eventStatus'] = $(evtType+' input[name="evt-stat"]:checked').val();
  evtRst['qrUse'] = $(evtType+' input[name="qrUse"]:checked').val();
  evtRst['questionInfo'] = {};
  
  
  for(var i=0; i<qLeng; i++){
    var ipName = $('#q'+i+' input').attr('name');
    var divisKey = ipName.replace(/[0-9]/g,"");
    var rLeng = $(evtType+' #q'+i+' input[name='+ipName+']').length;
    
    evtRst['questionInfo']['q'+i] = {};
    // evtRst['questionInfo']['q'+i]['type'] = divisKey;
    evtRst['questionInfo']['q'+i]['qTtl'] = $(evtType+' #q'+i+' h6').text();
    switch (divisKey) {
      case 'question-radio':
        evtRst['questionInfo']['q'+i]['qType'] = 'MC';
        for(var j=0; j<rLeng; j++){
          evtRst['questionInfo']['q'+i]['aList'+(j+1)] = $(evtType+' #q'+i+' .rdiobox').eq(j).text();
        }
        break;
      case 'sf-phone':
        evtRst['questionInfo']['q'+i]['qType'] = 'SAA';
        evtRst['questionInfo']['q'+i]['dtType'] = 'CU';
        break;
      case 'sf-addr':
        evtRst['questionInfo']['q'+i]['qType'] = 'SA';
        evtRst['questionInfo']['q'+i]['dtType'] = 'AD';
        break;
      case 'sf-txt':
        evtRst['questionInfo']['q'+i]['qType'] = 'SA';
        evtRst['questionInfo']['q'+i]['dtType'] = 'GE';
        break;
      case 'sf-email':
        evtRst['questionInfo']['q'+i]['qType'] = 'SA';
        evtRst['questionInfo']['q'+i]['dtType'] = 'EM';
        break;
      case 'sf-date':
        evtRst['questionInfo']['q'+i]['qType'] = 'SAA';
        evtRst['questionInfo']['q'+i]['dtType'] = 'DE';
        break;
      case 'sf-juminFt':
        evtRst['questionInfo']['q'+i]['qType'] = 'SAA';
        evtRst['questionInfo']['q'+i]['dtType'] = 'SO';
        break;
      case 'sf-file':
        evtRst['questionInfo']['q'+i]['qType'] = 'SAA';
        evtRst['questionInfo']['q'+i]['dtType'] = 'FE';
        break;
      case 'sf-name':
        evtRst['questionInfo']['q'+i]['qType'] = 'SAA';
        evtRst['questionInfo']['q'+i]['dtType'] = 'NE';
        break;
    }
  }

  console.log('evtRst: ', evtRst);

  
  //alert(JSON.stringify(evtRst));

  //fin
  /*
  setTimeout(function(){
    alert('saved!');
    location.href='qvey_event.html';
  },1000);
  */
}


var delId = '';
function qRmvReq(reqDelId) {
  delId = reqDelId;
  $('#delConfirmMd').modal('show');
}

function delIdReset(){
  delId = '';
}

function qRmvReqDel() {
  console.log('delId: ', delId);
  $('#'+delId).remove();
  $('#delConfirmMd').removeClass('show');
  $('.modal-backdrop').remove();
  $('.pre-ttl-num').text('');

  // .card-block id reset
  $('.card-block').attr('id','');
  if(crtTab == 'privacy') {
    var reLeng = $('#collapseOne>div').length;
  } else if (crtTab == 'survey'){
    var reLeng = $('#collapseOneS>div').length;
  }
  
  for( var i=0; i<reLeng; i++ ){
    console.log('i=',i)
    if(crtTab == 'privacy') {
      $('#collapseOne>div:nth-child('+(i+1)+')').attr('id','q'+i);
    } else if (crtTab == 'survey'){
      $('#collapseOneS>div:nth-child('+(i+1)+')').attr('id','q'+i);
    }
    
    $('#q'+i+' i.icon').attr('onclick','qRmvReq("q'+i+'")');
    $('#q'+i+' span.pre-ttl-num').text((i+1)+'. ');
  }


  
  --reqCnt;
}

/*
function openConfirmMd(modalId, e){
  $('#'+modalId).modal('show');
  $('#movTabBtn').attr('onclick','resetEvt("'+e+'")');
}
*/

// reset question case change tab
function resetEvt(e) {

  if(confirm("탭 이동 시 작성하시던 내용이 삭제됩니다.")){
    var eVal = $(e).attr('value');
    if(eVal == 'privacy') {
      $('#tabSurvey').removeClass('active show');
      $('#createNewEvt ul li.nav-item:nth-child(2) a.nav-link').removeClass('active show');
      $('#tabPrivacy').addClass('active show');
      $('#createNewEvt ul li.nav-item:nth-child(1) a.nav-link').addClass('active show');
    } else if(eVal == 'survey') {
      $('#tabPrivacy').removeClass('active show');
      $('#createNewEvt ul li.nav-item:nth-child(1) a.nav-link').removeClass('active show');
      $('#tabSurvey').addClass('active show');
      $('#createNewEvt ul li.nav-item:nth-child(2) a.nav-link').addClass('active show');
    }
    crtTab = $(e).attr('value');
    console.log('crtTab:',  crtTab);
    console.log('this class: ', $(e).attr('class'));
    console.log('asdfsadf');
    if($(e).hasClass('active')){
      console.log('asdfsadf');
      $('#preview, #previewS').css('display','none');
      $('#collapseOne div, #collapseOneS div, #groupRelative .reset, #groupRelativeS .reset, #groupRelativeS .reset').remove();
      $('#privacySFA, #surveySFA, #privacyMCA, #surveyMCA').removeClass('d-block');
      $('select[name=slWrapperSelect], select[name=sfaSelect], input[name=eventName], textarea[name=eventDescript], input[name=eventDateSt], input[name=eventDateEd], #qIp, #qIpS, #mcIp0, #mcIpS0').val('');
      $('input[name=certi-chk]:checked, input[name=qrUse]:checked, input[name=evt-stat]:checked').prop('checked','');
    }
  }
}

