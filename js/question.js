function chkChg (){
    console.log("this: ", this);
}
var qType = '';
//var sfaType = '';
$('select[name=slWrapperSelect]').change(function testASDF(){
  qType = $('select[name=slWrapperSelect]').val();
  console.log('qType:', qType);
  if (qType == 'multi-choice') {
    $('#qIp').removeClass('d-none');
    $('#privacyMCA').addClass('d-block');
    $('#prReqBtn').addClass('d-block');
    $('#privacySFA').removeClass('d-block');
    $('#prReqBtn').addClass('mg-l-10');
  } else if (qType == 'short-form') {
    $('#qIp').removeClass('d-none');
    $('#privacyMCA').removeClass('d-block');
    $('#privacySFA').addClass('d-block');
    $('#prReqBtn').addClass('d-block');
    $('#prReqBtn').addClass('mg-l-10');
    $('#privacyMCA .input-group.mg-t-10').remove();
    $('#slWrapper2 option:eq(0)').prop("selected", true);
  } else if (qType == '') {
    $('#qIp').removeClass('d-none');
    $('#privacyMCA').removeClass('d-block');
    $('#privacySFA').removeClass('d-block');
    $('#prReqBtn').removeClass('d-block');
    $('#privacyMCA .input-group.mg-t-10').remove();
  } else if (qType == 'short-form-auto') {
    $('#privacyMCA').removeClass('d-block');
    $('#privacySFA').addClass('d-block');
    $('#prReqBtn').addClass('d-block');
    $('#qIp').addClass('d-none');
    $('#prReqBtn').removeClass('mg-l-10');
    $('#slWrapper2 option:eq(0)').prop("selected", true);
  }
  $('#prReqBtn').val(qType);
});

// $('select[name="sfaSelect"]').change(function(){
//   sfaType = $('select[name="sfaSelect"]').val();
//   $('select[name="sfaSelect"]').val(sfaType);
// });

var delCnt = 1;
$('button[name=regBtn]').on('click', function(){
  var crtTab = $(this).val();
  var pushId = ['#privacyMCA', ''];
  delCnt = $('#groupRelative>div').length;
  var addHtml = '<div id=addNum'+delCnt+' class="input-group mg-t-10 reset"><div class="input-group-prepend"><span class="input-group-text"><i class="icon tx-16 lh-0 op-6"></i>No</span></div><input id="mcIp'+delCnt+'" type="text" class="form-control" placeholder="선택 답안을 입력해 주세요."><button onclick="rmvThis(this)" name="minusIp" type="submit" class="btn btn-outline-light mg-l-10"><i class="icon ion-minus tx-14 "></i></button></div>';

  console.log('crtTab:',crtTab);
  if(crtTab == 'privacy') {
    console.log('pushId:', pushId[0]);
    $(pushId[0]+' #groupRelative').append(addHtml);
  } else if (crtTab == 'survey'){
    console.log('test survey');
  }
  ++delCnt;
});
$('input[name=certi-chk]').change(function(){
  if($(this).val()=='univCert'){
    $('#relativeBox .certi-file').addClass('d-block');
  } else {
    $('#relativeBox .certi-file').removeClass('d-block');
  }
});

$('select[name=sfaSelect]').change(function(){
  // console.log('value: ',$(this).val());
  var crtVal = $('#prReqBtn').val();
  var reqAddVal = new Array();
  
  reqAddVal.push(crtVal);
  reqAddVal.push($(this).val());
  
  console.log('reqAddVal: ', reqAddVal);
  $('#prReqBtn').val(reqAddVal);
});

function rmvThis (req){
  req.parentNode.remove();

  // id reset
  $('[id^=addNum]').attr('id','');
  $('[id^=mcIp]').attr('id','');

  console.log('groupRelative>div length: ', $('#groupRelative>div').length);
  var reLeng = $('#groupRelative>div').length;
  for( var i=0; i<reLeng; i++ ){
    console.log('i=',i)
    $('#groupRelative>div:nth-child('+(i+1)+')').attr('id','addNum'+i);
    $('#addNum'+i+' input').attr('id','mcIp'+i);
  }


  
  --delCnt;
}

var reqCnt = 0;
function reqAdd(req) {
  var reqType = req.value;
  var reqArr = reqType.split(',');

  var qNum = $('#collapseOne .card-block').length +1;
  console.log('qNum: ', qNum);

  // console.log('reqArr[0]: ',reqArr[0]);

  var mcaTtl = $('#qIp').val();
  var mcaPreviewA = '<div id="q'+reqCnt+'" class="card-block" name="'+qType+'"><div class="col-md-12 mg-y-10"><div class="list-group pd-b-20"><div class="list-group-item"><div class="media justify-content-center align-items-center"><div class="media-body"><h6 class="tx-inverse mg-0"><span class="pre-ttl-num">'+qNum+'.&nbsp;</span>'+mcaTtl+'</h6></div><i onclick="qRmvReq('+"'q"+(qNum - 1)+"'"+');" class="icon ion-ios-close-empty tx-28 mg-l-20 question-set"></i></div></div>';
  var mcaPreviewB = '';
  var mcaPreviewC = '</div></div></div>';
  var mcaVal = $('#mcIp0').val();
  console.log('mcaTtl:', mcaTtl);


  if (mcaTtl == '') {
    alert('질문을 입력해주세요');
    return false;
  }


  if(qType == 'multi-choice'){
// 객관식 선택시 문항 개수 취합, 빈값 체크, 배치

  var reqMCALength = $('[id^=mcIp]').length;
  var reqMCAArr = new Array;
  var reqSFType = $('select[name="sfaSelect"]').val();

  reqMCAArr += $('[id^=mcIp]').val();

  console.log('reqMCAArr: ', reqMCAArr);
  console.log('reqMCALength: ', reqMCALength);

  for (var i=0; i<reqMCALength; i++){
    if($('#mcIp'+i).val() == ''){
      alert('선택 답안을 입력해주세요');
      return false;
    }
    mcaPreviewB += '<div class="list-group-item pd-y-6"><div class="media"><div class="media-body"><label class="rdiobox"><input name="question-radio'+(reqCnt+1)+'" value="'+(i+1)+'" type="radio"><span>'+$('#mcIp'+i).val()+'</span></label></div></div></div>';
  }

  } else if (qType == 'short-form') {
    var sfaType = $('select[name="sfaSelect"]').val();

    //  sfaPhone   sfaAddr  sfaJumin  sfaEmail  sfaDate sfaFile sfaTxt

    switch(sfaType){
      case '' :
        alert('응답유형을 선택해주세요.');
        return false;
      case 'sfaPhone':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><i class="fa fa-phone tx-16 lh-0 op-6"></i></div></div><input name="sf-phone'+(reqCnt+1)+'" id="phoneMask" type="text" class="form-control" placeholder="010-1234-1234" value=""></div></div></div></div>';
        break;
      case 'sfaAddr':
        mcaPreviewB += '';
        break;
      case 'sfaJumin':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><input id="" class="form-control mg-x-10" name="sf-juminFt'+(reqCnt+1)+'" maxlength="6" oninput="numMax(this);" type="number" value="" placeholder="890123"><input id="" class="form-control mg-x-10" name="sf-juminBk'+(reqCnt+1)+'" maxlength="7" oninput="numMax(this);" type="password" value="" placeholder="1234567"></div></div></div></div>';
        break;
      case 'sfaEmail':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><input name="sf-email'+(reqCnt+1)+'" id="" class="form-control" type="text" placeholder="development@enmad.com" value=""></div></div></div></div>';
        break;
      case 'sfaDate':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><i class="fa fa-calendar tx-16 lh-0 op-6"></i></div></div><input name="sf-email'+(reqCnt+1)+'" id="dateMask" type="text" class="form-control" placeholder="YYYY/MM/DD"></div></div></div></div>';
        break;
      case 'sfaFile':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14 mg-0-auto"><div class="media"><div class="media-body"><div class="input-group"><input type="file" name="sf-file'+(reqCnt+1)+'" id="sfaFile" class="inputfile" multiple><label for="sfaFile" class="if-outline if-outline-dark"><i class="icon ion-ios-upload-outline tx-24"></i><span>파일을 선택해주세요</span></label></div></div></div></div>';
        break;
      case 'sfaTxt':
        mcaPreviewB += '<div name='+sfaType+' class="list-group-item pd-y-14"><div class="media"><div class="media-body"><div class="input-group"><input name="sf-txt'+(reqCnt+1)+'" id="" class="form-control" type="text" placeholder="답안을 입력해 주세요" value=""></div></div></div></div>';
        break;
    }
  }



  console.log(mcaPreviewB);
  $('#preview').css('display','block');
  $('#collapseOne').append(mcaPreviewA+mcaPreviewB+mcaPreviewC);

  if(qType == 'short-form' && sfaType == 'sfaPhone' ){
    $('#phoneMask').mask('999-9999-9999');
  } else if (qType == 'short-form' && sfaType == 'sfaDate') {
    $('#dateMask').mask('9999/99/99');
  }


  //question reset
  $('select[name=slWrapperSelect]').val('');
  $('#qIp').val('');
  $('#mcIp0').val('');
  $('#privacyMCA').removeClass('d-block');
  $('#prReqBtn').addClass('d-none');
  $('#privacySFA').removeClass('d-block');
  $('#groupRelative .reset').remove();
  

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


function saveEvt() {
  console.log('card-block: ', $('#collapseOne .card-block').length);
  
  if ($('#collapseOne .card-block').length == 0){
    alert('적용된 문항이 없습니다.');
    return false;
  }
  $('body').prepend('<div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>');
  $('body').append('<div class="modal-backdrop fade show"></div>');
  $('#saveEvtMd').removeClass('show');

  setTimeout(function(){
    alert('saved!');
    location.href='qvey_event.html';
  },1000);
}


var delId = '';
function qRmvReq(reqDelId) {
  delId = reqDelId;
  $('#delConfirmMd').modal('show');
}

function qRmvReqDel() {
  console.log('delId: ', delId);
  $('#'+delId).remove();
  $('#delConfirmMd').removeClass('show');
  $('.modal-backdrop').remove();
  $('.pre-ttl-num').text('');

  // .card-block id reset
  $('.card-block').attr('id','');
  var reLeng = $('#collapseOne>div').length;
  for( var i=0; i<reLeng; i++ ){
    console.log('i=',i)
    $('#collapseOne>div:nth-child('+(i+1)+')').attr('id','q'+i);
    $('#q'+i+' i.icon').attr('onclick','qRmvReq("q'+i+'")');
    $('#q'+i+' span.pre-ttl-num').text((i+1)+'. ');
  }


  
  --reqCnt;
}

$('#go2List').on('click', function(){
  $('#go2ListMd').modal('show');
});

$('#saveEvt').on('click', function(){
  $('#saveEvtMd').modal('show');
});



