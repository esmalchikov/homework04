$(document).ready(function () {
  $("form").submit(function (event) {
    var formData = {
      query: $("#ip").val(),// Получаем значение из поля ввода
    };
	
  var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address"; //url для запроса
	var token = "f70d338e339968d8c96f318e46e1093880769ba6"; //Токен

    $.ajax({ //Вызов AJAX-запроса
      type: "POST", // Тип метода запроса как требует dadate в документации
      url: url, //Полный URL запрос без добавления query    
      data: JSON.stringify(formData), //Передаем данные в формет JSON
      dataType: "json", //указывает тип данных - JSON
      contentType: "application/json", //указываем, что передаем JSON
          
      beforeSend: function(xhr) { //Метод используемый для установки заголовка Authorization с токеном
                  xhr.setRequestHeader("Authorization", "Token "+ token) // Заголовок Authorization устанавливается с токеном
            },
      
    }).done(function (result) { //функция done вызывается, когда запрос завершен успешно
        if (result && result.location) {
          console.log("Результат:", result); //результат запроса выводится в консоль
        } else {
            console.error("Не удалось получить данные:", result);
          } 
	}).fail(function (xhr, status, error) { //Обработка ошибки
     console.error('Ошибка:', status, error);
     console.error('Ответ сервера:', xhr.responseText); //Выводим ответ сервера для анализа 
  });
    event.preventDefault(); //предотвращение стандартного поведения события submit
  });
});