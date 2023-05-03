// link url auto paste

$('#linkIn').on('click', function(){
    var crtTxtareaVal = $('#sendCont').val();
    // console.log('crtTxtareaVal: ', crtTxtareaVal);
    const thisEvtURL = 'https://test.url.kr';

    if(crtTxtareaVal == ''){
        $('#sendCont').val(thisEvtURL);
    } else {
        $('#sendCont').val(crtTxtareaVal+thisEvtURL);
    }
});


// send type; request or direct set toggle btn

$('#sendNow, #sendRsv').on('click', function(){
    $('#sendNow').toggleClass("active");
    $('#sendRsv').toggleClass("active");

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();
    var hr=now.getHours();//시간
    var min=now.getMinutes();

    var today = String(year)+'-'+String(month)+'-'+String(date);

    var sDate = $('#datepickerNoOfMonths');
    var sTime = $('#reqTime');

    if($('#sendNow').hasClass('active')){
        sDate.val(today);
        sTime.val(String(hr)+":"+String(min));
    } else if ($('#sendRsv').hasClass('active')){
        sDate.val('');
        sTime.val('');
        sDate.focus();
    }
});



// string length calculation

$('textarea#sendCont').on("keyup", function(){
    /*
    var sendContVal = $(this).val().length;
    const getByteLengthOfString = function(s,b,i,c){
        for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
        return b;
    };
    var totalTxt = $(this).val();
    var crtTxt = totalTxt.substring(sendContVal-1, sendContVal);
    $('#printLength').text(sendContVal);
    */

    maxLengthCheck('sendCont', 1000);
    $('#printLength').text(byteCheck($('#sendCont')));

});


// max Length Check mms contents

function maxLengthCheck(id, maxLength){
    var obj = $("#"+id);
    if(maxLength == null) {
        maxLength = obj.attr("maxLength") != null ? obj.attr("maxLength") : 1000;
    }
    
    if(Number(byteCheck(obj)) > Number(maxLength)) {
        alert("입력가능문자수를 초과하였습니다.\n(영문, 숫자, 일반 특수문자 : " + maxLength + " / 한글, 한자, 기타 특수문자 : " + parseInt(maxLength/2, 10) + ").");
        obj.focus();
        return false;
    } else {
        return true;
   }
}
function byteCheck(el){
    var codeByte = 0;
    for (var idx = 0; idx < el.val().length; idx++) {
        var oneChar = escape(el.val().charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
}



// excel copy and paste to view table
/*
$(document).ready(function () {
    $('td input').on('paste', null, function(e){
        $txt = $(this);
        console.log('$txt', $txt);
        setTimeout(function () {
            var sValues = $txt.val().split(/\s+/);
                console.log('sValues: ', sValues);
            var crtRowIdx = $txt.parent().parent().index();
                console.log('crtRowIdx: ', crtRowIdx);
            var crtColIdx = $txt.parent().index();
                console.log('crtColIdx: ', crtColIdx);

            var totRows = $('#sendTbl tbody tr').length;
                console.log('totRows: ', totRows);
            var totCols = $('#sendTbl thead th').length;
                console.log('totCols: ', totCols);
            var cnt = 0;
            for (var i=crtColIdx; i<totCols; i++ ){
                if (i!= crtColIdx)
                    if (i!= crtColIdx)
                        crtRowIdx=0;
                for (var j=crtRowIdx; j<totRows; j++){
                    var sValue = sValues[cnt];
                    var sIp = $('#sendTbl tbody tr').eq(j).find('td').eq(i).find('input');
                    sIp.val(sValue);
                    cnt++;
                    console.log('i:', i);
                    console.log('j:', j);
                }
            }
            console.log('fin');
        });
    });
});
*/

// replace Charactor
$('select[name="repCharOp"]').on("change", function(){
    let aplyVal = $(this).val();
    const previewTa = $('#sendCont');
    var crntTaVal = previewTa.val();

    previewTa.val(crntTaVal+aplyVal);
});

// reg-type select
$('input[name="reg-type"]').on("change", function(){
    // console.log('val: ', $(this).val());
    var regType = $(this).val();
    if(regType == 'total'){
        $('#sendTbl').css('display', 'none');
        $('#uploadRow').css('display', 'flex');
        $('#delDupNumRow').css('display','none');
    } else if (regType == 'ip-direct'){
        $('#sendTbl').css('display', 'block');
        $('#uploadRow').css('display', 'none');
        $('#delDupNumRow').css('display','flex');
    }
});

// submit
var totRst = new Object();
var sendTbls = new Object();
$('#gotoListBtn').on('click', function(){  
    // console.log('sendViewRst', Object.keys(sendViewRst));

    totRst['regType'] = $('.reg-type-wrap input[name="reg-type"]').val();
    totRst['sendTtl'] = $('#sendTtl').val();
    totRst['sendCont'] = new Object();
    totRst['reqDate'] = $('#datepickerNoOfMonths').val()+' '+$('#reqTime').val();
    totRst['reqNum'] = $('#reqNum').val();
    totRst['reqType'] = $('#sendBtn button.active').val();
    // console.log('testRegTypeVal: ', testRegTypeVal);

    
    if($('#delDuplicateNum').is(':checked')) {
        totRst['delDuplicateNum'] = 'checked';
    } else {
        totRst['delDuplicateNum'] = '';
    }

    var contTemp = $('#sendCont').val();
    for(var i=0; i<$('#sendTbl input[name="recPhone"]').length; i++){
        if($('#sendTbl input[name="recPhone"]').eq(i).val() !== '') {
            sendTbls[i] = new Object();
            sendTbls[i]['recPhone'] = $('#sendTbl tbody tr').eq(i).children('td').eq(0).children('input').val();
            sendTbls[i]['repChar01'] = $('#sendTbl tbody tr').eq(i).children('td').eq(1).children('input').val();
            sendTbls[i]['repChar02'] = $('#sendTbl tbody tr').eq(i).children('td').eq(2).children('input').val();
            sendTbls[i]['repChar03'] = $('#sendTbl tbody tr').eq(i).children('td').eq(3).children('input').val();
            sendTbls[i]['contTxt'] = contTemp.replace(/({대치문자1}|{대치문자2}|{대치문자3})/g, function(word){
                switch(word){
                    case "{대치문자1}" : return sendTbls[i]['repChar01'];
                    case "{대치문자2}" : return sendTbls[i]['repChar02'];
                    case "{대치문자3}" : return sendTbls[i]['repChar03'];
                }
            });
            
        }
    }
    totRst['sendCont'] = sendTbls;
    console.log('totRst : ', totRst);
    
console.log('chk: ', $('input[name="reg-type"]:checked').val());


    if (Object.keys(sendTbls) == '' && $('input[name="reg-type"]:checked').val() == 'ip-direct'){
        alert('적용된 항목이 없습니다.');
        return false;
    }
});