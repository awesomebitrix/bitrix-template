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
* =FUNCTIONS
***************************************************************
**/

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


	/**
	***************************************************************
	* =CALLBACK
	***************************************************************
	**/

	// Выводим на экран форму заказа обратного звонка
	$('.callback-trigger').on('click', function(e) {
		e.preventDefault();
		showCallback();
	});

	// Перезагрузка капчи
	$('.captcha__refresh').on('click', function(e) {
		e.preventDefault();
		$('.captcha__img').attr('src', '/bitrix/templates/main/qucikCapthca/imagebuilder.php');
	});

	// Крестик: по нажатию закрываем форму
	$('.callback__close').on('click', function() {
		closeCallback();
	});

	/* Вызов функции отправки почтового сообщения обратного звонка*/
	$('.callback').on('submit', function(e) {
		e.preventDefault();
		sendCallbackEmail($(this));
	});

	// закрытие маленького всплывающего окна
	$('.confirm-order__btn').on('click', function() {
		$('.confirm-order').fadeOut(400);
	});

	/**
	***************************************************************
	* =ФОРМА ОБРАТНОГО ЗВОНКА
	***************************************************************
	**/

	// Функция вывода на экран формы заказа обратного звонка
	function showCallback() {
		$('.callback__error').text('');
		$('.callback-form-wrapper').fadeIn(300);
	}

	// Функция для скрытия формы заказа обратного звонка
	function closeCallback() {
		$('.callback-form-wrapper').fadeOut(300);
	}

	// Функция отправки email-сообщения: Обратный звонок
	function sendCallbackEmail(mailForm) {
		$.ajax({
			type: 'POST',
			data: mailForm.serialize(),
			url: mailForm.attr('action'),
			dataType: 'html',
			success: function(status) {
				if(status === 'field_error') {
					$('.callback__error').text('Заполните обязательные поля!');
					return false;
				} else if(status === 'captcha_error') {
						$('.callback__error').text('Капча введена неверно!');
						return false;
				} else {
					closeCallback();
					$('.confirm-order').delay(300).fadeIn();
				}
			}
		});
	}
});