// glo fn

let reqType = '';

function loginModal (msg){
    // showing modal with effect
    // e.preventDefault();

    var effect = $(this).attr('data-effect');
    $('#loginModal').addClass(effect);
    $('#loginModal').modal('show');
    $('#loginModalCopy').text(msg);
};

function devIng(){
    loginModal('개발중인 페이지 혹은 개발중인 기능 입니다.');
    // alert('개발중인 페이지 혹은 개발중인 기능 입니다.');
}

// ▼ 입력 Input 초기화 추가해야대여 2023-02-07
function findAcc(type){
    var findPwInputList  = [$('#comId').val(),$('#comName').val(),$('#mngName').val(),$('#mngTel').val(),$('#hintIp').val()];
    var pwInput = [$('#comId'), $('#comName'), $('#mngName'), $('#mngTel'), $('#hintIp')];
    console.log('findPwInputList: ', findPwInputList);
    for( var i=0; i<findPwInputList.length; i++){
        if (findPwInputList[i] !== ''){
            pwInput[i].val('');
        }
    }
    var effect2 = $(this).attr('data-effect');
    $('#findAccDiv').addClass(effect2);
    $('#findAccDiv').modal('show');
    if(type == 'pw'){
        reqType = 'pw';
        $('#passHint').removeClass('d-none');
        $('#idRow').removeClass('d-none');
    } else if(type == 'id' && $('#passHint.d-none').length == 0){
        reqType = 'id';
        $('#passHint').addClass('d-none');
        $('#idRow').addClass('d-none');
    }else if(type == 'id'){
        reqType = 'id';   
    }
    return;
}


function alertShow(msg) {
    $('#sucAlert .alert-msg').text(msg);
    $('#sucAlert').removeClass('op-0');
    $('#sucAlert').addClass('op-8-force');
}

function alertNone(){
    $('#sucAlert').removeClass('op-8-force');
    $('#sucAlert').addClass('op-0');
}

function passChk(){
    var curPass = $('input[name=crnt-password]').val();
    var chgPass = $('input[name=new-password]').val();
    var chgPassChk = $('input[name=chk-new-password]').val();
console.log('test');
    //temp valid
    if (curPass.length!=0 && (chgPass==chgPassChk)){
        $('#passModal').removeClass('show');
        $('.modal-backdrop').remove();
        alertShow();
    }else{
        console.log('currnet length', curPass.length);
        console.log('chgPass', chgPass);
        console.log('chgPassChk', chgPassChk);
    }
}
function openQrImg(){
    var popup = window.open('img/qrimg.png', 'qrcode', 'width=300px,height=300px,scrollbars=yes,top=100%, left=100%');
}

function openCertMngmt(){
    var popup = window.open('certMngmt.html', 'cert management', 'width=800px,height=600px,scrollbars=yes,top=100%, left=100%');
}

function openSendView() {
    var popup = window.open('sendView.html', 'send management', 'width=1024px,height=768px,scrollbars=yes,top=100%, left=100%');
}
function openResendView() {
    var popup = window.open('resendView.html', 'send management', 'width=578px,height=768px,scrollbars=yes,top=100%, left=100%');
}
function openCreAcc() {
    var popup = window.open('createAccount.html', 'create account', 'width=570px,height=780px,scrollbars=yes,top=100%, left=100%');
}
function openAuth() {
    var popup = window.open('phoneAuth.html', 'check phone auth', 'width=330px,height=440px,scrollbars=yes,top=100%, left=100%');
}

function openCustSch() {
    var popup = window.open('customer_serch.html', 'check phone auth', 'width=800px,height=640px,scrollbars=yes,top=100%, left=100%');
}



function findAcReq(){
    var findIdInputList = [$('#comName').val(),$('#mngName').val(),$('#mngTel').val()];
    var findPwInputList  = [$('#comId').val(),$('#comName').val(),$('#mngName').val(),$('#mngTel').val(),$('#hintIp').val()];
    var reqData = [];
    if(reqType == 'id'){
        reqData = findIdInputList;
    }else if (reqType == 'pw'){
        reqData = findPwInputList;
    }
    var rst = reqData.filter( i=>i.length !== 0 )
    console.log('rst.length= ', rst.length);
    console.log('reqData.length= ', reqData.length);
    // ▼ empty req temp script
    if(rst.length == reqData.length){
        $('#findAccDiv').removeClass('show');
        $('.modal-backdrop').remove();
        alert('요청이 완료되었습니다.\n관리자가 확인 후 연락드릴 에정입니다.');
        location.reload();
    } else {
        alert('모든 항목을 입력해주세요.');
    }
}


$('#chgPass').on('click', function(){
    $('#passModal').modal('show');
});

$('#chargeInfo').on('click', function(){
    $('#chargeModal').modal('show');
});

$('#privacyExcelUp, #surveyExcelUp').on('click', function(){
    $('#excelUpload').modal('show');
});

function modalOpen (modalId, modTtl, modCopy){
    $('#'+modalId).modal('show');
    $('#modalTtl').text(modTtl);
    $('#modalCopy').text(modCopy);
}

function spinerModal (delId){
    $('body').prepend('<div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>');
    $('body').append('<div class="modal-backdrop fade show"></div>');
    $('#saveEvtMd').removeClass('show');
    $('#'+delId).remove();
    setTimeout(function(){
        alert('complete!');
        location.reload();
    },1000);
}

