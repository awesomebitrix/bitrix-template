$(document).ready(function() {

/**
***************************************************************
* =PAGE LOAD
***************************************************************
**/

	// Находим ширину экрана
	var screenWidth = $(document).width() + scrollWidth()

/**
***************************************************************
* =USABILLITY
***************************************************************
**/


// Перезагрузка капчи
$('.captcha__refresh').on('click', function(e) {
	e.preventDefault();
	$('.captcha__img').attr('src', 'qucikCapthca/imagebuilder.php');
});

/* Вызов функции отправки почтового сообщения обратного звонка*/
$('.modal__callback').on('submit', function(e) {
	e.preventDefault();
	sendCallbackEmail($(this));
});


/**
***************************************************************
* =FUNCTIONS
***************************************************************
**/

	// Функция отправки email-сообщения: Обратный звонок
	function sendCallbackEmail(mailForm) {
		$.ajax({
			type: 'POST',
			data: mailForm.serialize(),
			url: mailForm.attr('action'),
			dataType: 'html',
			success: function(status) {
				if(status === 'field_error') {
					$('.modal__error').text('Заполните обязательные поля!');
					return false;
				} else if(status === 'captcha_error') {
					$('.modal__error').text('Капча введена неверно!');
					return false;
				} else {
					// Close modal window
					$('#myModal').modal('hide');
					$('.modal-confirm').modal('show');
				}
			}
		});
	}

// Функция определения плосы прокрутки
    function scrollWidth() {
	    var div = $('<div>').css({
	        position: "absolute",
	        top: "0px",
	        left: "0px",
	        width: "100px",
	        height: "100px",
	        visibility: "hidden",
	        overflow: "scroll"
	    });

	    $('body').eq(0).append(div);

	    var width = div.get(0).offsetWidth - div.get(0).clientWidth;

	    div.remove();

	    return width;
	}

});