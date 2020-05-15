const initTodoList = [{
     "title": "Действия с заметкой:",
     "todo": [{
         "todoItemContent": "сохранить изменения",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "отменить редактирование (необходимо подтверждение)",
         "todoItemComplited": false
       },
       {
         "todoItemContent": "удалить (необходимо подтверждение)",
         "todoItemComplited": false
       },
       {
         "todoItemContent": "отменить внесенное изменение",
         "todoItemComplited": false
       },
       {
         "todoItemContent": "повторить отмененное изменение",
         "todoItemComplited": false
       }
     ]
   },
   {
     "title": "Действия с пунктами Todo:",
     "todo": [{
         "todoItemContent": "добавить",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "удалить",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "отредактировать текст",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "отметить как выполненный",
         "todoItemComplited": true
       }
     ]
   },
   {
     "title": "Действия на главной:",
     "todo": [{
         "todoItemContent": "перейти к созданию новой заметки",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "перейти к изменению",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "удалить (необходимо подтверждение)",
         "todoItemComplited": false
       }
     ]
   },
   {
     "title": "Требования к функционалу:",
     "todo": [{
         "todoItemContent": "Все действия на сайте должны происходить без перезагрузки страницы.",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "Подтверждение действий (удалить заметку) выполняется с помощью диалогового окна.",
         "todoItemComplited": false
       },
       {
         "todoItemContent": "Интерфейс должен отвечать требованиям usability.",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "После перезагрузки страницы состояние списка заметок должно сохраняться.",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "Можно пренебречь несоответствием редактирования текста с помощью кнопок отменить/повторить и аналогичным действиям с помощью комбинацияй клавиш (Ctrl+Z, Command+Z, etc.)",
         "todoItemComplited": false
       }
     ]
   },
   {
     "title": "Технические требования:",
     "todo": [{
         "todoItemContent": "Диалоговые окна должны быть реализованы без использования \"alert\", \"prompt\" и \"confirm\".",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "В качестве языка разработки допускается использовать JavaScript или TypeScript.",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "В качестве сборщика, если это необходимо, используйте Webpack.",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "Верстка должна быть выполнена без использования UI библиотек (например Vuetify).",
         "todoItemComplited": true
       },
       {
         "todoItemContent": "Адаптивность не обязательна, но приветствуется.",
         "todoItemComplited": false
       },
       {
         "todoItemContent": "Логика приложения должна быть разбита на разумное количество самодостаточных Vue-компонентов.",
         "todoItemComplited": true
       }
     ]
   }
 ]
export default initTodoList