function go2path(path){
    location.href=path+'.html';
}

function tooltipMmt() {
    
    $('html').click(function(e) {
        if($(e.target).hasClass("t-area")) {
            $('#tooltip').addClass('d-block');
        } else {
            $('#tooltip').removeClass('d-block');
        }
    });
}

function numMax(e) {
    if(e.value.length > e.maxLength){
        e.value = e.value.slice(0, e.maxLength);
    }
}

// 2023-02-24 하다가 퇴근.. checked 가져와야해
function checkedCheck (e){
    // console.log($(e).attr('id'));
    var eID = $(e).attr('id');
    var privacyRow = $('#privacyTbl tbody input:checked').length;
    var surveyRow = $('#surveyTbl tbody input:checked').length;
    
    console.log('eID: ', eID);

    switch (eID) {
        case '' :
            console.log('no id');
            alert('unknown error');
        return false;

        case 'privacyCkDown' :

            if(privacyRow) {
                // load this data to download
                alert('다운로드 되었습니다(test)');
            } else if(!privacyRow){
                alert('다운로드할 항목을 체크해주세요');
            }

            break;

        case 'surveyCkDown' :
            if(surveyRow) {
                // load this data to download
                alert('다운로드 되었습니다(test)');
            } else if(!surveyRow){
                alert('다운로드할 항목을 체크해주세요');
            }

            break;

        case 'privacyDownAll' :

            if(confirm('전체 자료를 다운 받으시겠습니까?')){
                alert('전체 자료를 받았습니다(test)')
                //받는코드
            } else {
                alert('취소됐습니다.');
            }
            break;

        case 'surveyDownAll' :

            if(confirm('전체 자료를 다운 받으시겠습니까?')){
                alert('전체 자료를 받았습니다(test)')
                //받는코드
            } else {
                alert('취소됐습니다.');
            }
            break;

        case 'privacyCkDel' :        
            if(privacyRow) {
                if(confirm('선택 항목이 삭제됩니다. 계속 하시겠습니까?')){
                    alert('해당 항목이 삭제 되었습니다(test)');
                } else {
                    alert('취소됐습니다.');
                }
            } else if(!privacyRow){
                alert('다운로드할 항목을 체크해주세요');
            }

        case 'surveyCkDel' :
            if(surveyRow) {
                if(confirm('선택 항목이 삭제됩니다. 계속 하시겠습니까?')){
                    alert('해당 항목이 삭제 되었습니다(test)');
                } else {
                    alert('취소됐습니다.');
                }
            } else if(!surveyRow){
                alert('다운로드할 항목을 체크해주세요');
            }
    }
}

