/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
        return true;
    } else {
        return false;
    }
}

/**
 * Создает новый tr для таблицы со списком cookie
 *
 * @param name - имя cookie
 * @param value - значение cookie
 */
function createCookieTr(name, value) {
    var newCookie = document.cookie = '' + name + '=' + value;

    var tableProp = getCookies();

    for (var propi in tableProp) {
        listTable.innerHTML += '<tr>' + '<th>' + propi + '</th>' + '<th>' + tableProp[propi] + '</th>' + '<th>' + '<button>' + '</button>' + '</th>' +'</tr>';
    }

}

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

listTable.onclick = function(event) {

};

function deleteCookie(name) {
    document.cookie = '' + name + '=' + ';expires='+new Date(0);
}

window.addEventListener('load', function () {
    var tableProp = getCookies();

    for (var propi in tableProp) {
        listTable.innerHTML += '<tr>' + '<th>' + propi + '</th>' + '<th>' + tableProp[propi] + '</th>' + '<th>' + '<button>' + 'удалить' + '</button>' + '</th>' +'</tr>';
    }
});

filterNameInput.addEventListener('keyup', function () {
    let value = this.value.trim();
    listTable.innerHTML = '';

    var tableProp = getCookies();

    for (var propi in tableProp) {
        if (isMatching(propi, value) || isMatching(tableProp[propi], value)) {
            listTable.innerHTML += '<tr>' + '<th>' + propi + '</th>' + '<th>' + tableProp[propi] + '</th>' + '</tr>';
        }
    }
});

addButton.addEventListener('click', () => {
    let value1 = addNameInput.value.trim();
    let value2 = addValueInput.value.trim();
    listTable.innerHTML = '';

    if (value1 !== '' && value2 !== '') {
        createCookieTr(value1, value2);
    }

});

listTable.addEventListener('click', (e) => {
    var target = e.target;

    if (target.tagName != 'BUTTON') {
        return;
    }
    listTable.innerHTML = '';

    e.target.parentNode.hidden = !e.target.parentNode.hidden;

});

