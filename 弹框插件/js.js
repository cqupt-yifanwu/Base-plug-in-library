$(function(){
	var parentDom = $(".passwordProtect")
	var password = $('#newPassword');
	var reInput = $('#reNewPassword');
	var oldPassword = $('#oldPassword');
	var cyptoguard = $('#cyptoguard'); // ��ɫ��͸����Ļ

	var strExp=new RegExp("^[0-9A-Za-z]{3,12}$");
	

    //��demo����ȫ����css����Ԫ�ؾ��У��޷����ü���ie�������ǵ������Կ���������δ���
	//�̶����λ��
	/*
	function center () {
		var innerHeight = $(document).innerHeight(),
			innerWidth = $(document).innerWidth();
		var domHeight = parentDom.height(),
			domWidth = parentDom.width();
		var top = (innerHeight - domHeight)/2,
			left = (innerWidth - domWidth)/2;
		console.log(top,left);
		parentDom.offset({top: top,left: left});
	};
	center();
	$(window).resize(center);
	*/
	

	//�����޸������
	$('#clickMe').click(function () {
		cyptoguard.css('display', 'inline-block');
		return false;
	});


	// ����֤
	password.blur(function () {
		if(!strExp.test(password.val())){
			alert("����ֻ��Ϊ3��12λ���ֻ�Ӣ����ĸ!");
			password.val('');
			return false;
		}
	});
	reInput.blur(function () {
		if($(this).val() != password.val()){
			alert("��������ͬ��������!");
			$(this).val('');
		}
	});
	$('#protectAnswer').blur(function(){
		if($(this).val() == ''){
			alert("�𰸲���Ϊ�գ�");
		}
	})


   //�رհ�ť
	$('.protectClose').mouseover(function () {
		$(this).css('background', 'url('+'./img/panel_tools2.png'+') no-repeat -16px 1px');
	}).mouseout(function(){
		$(this).css('background', 'url('+'./img/panel_tools1.png'+') no-repeat -16px 1px');
	}).click(function(){
		cyptoguard.css('display', 'none');
	});

	//�ύ��ť
	$('#passwordSubmit').click(function () {
		var oldPasswordValue = oldPassword.val();
		var questionIndex = $('#questionChoose').val()
		var newPassword = password.val();
		var questionAwer = $('#protectAnswer').val();
		var data = {
			"questionIndex":questionIndex,
			"oldPassword":oldPasswordValue,
			"newPassword":newPassword,
			"answer":questionAwer
		};
		if(!strExp.test(password.val())){
			alert("����ֻ��Ϊ3��12λ���ֻ�Ӣ����ĸ!");
			password.val('');
			return false;
		}
		if(reInput.val() != password.val()){
			alert("��������ͬ��������!");
			reInput.val('');
			return false;
		}
		if($('#protectAnswer').val() == ''){
			alert("�𰸲���Ϊ�գ�");
			return false;
		}
		// ajax ��������
		console.log(data);   //console����
		$.ajax({
			url: '',
			type: 'POST',
			dataType: 'json',
			data: data,
			success:function(d){
				if (d) {
					alert("�������������");
					//������������
					oldPassword.val("");
					password.val("");
					reInput.val("");
				}else{
					alert("�޸ĳɹ���");
				}
			}
		});
	});
})