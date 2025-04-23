const xCoordinate = document.querySelectorAll("[name=xCoord]");

class InvalidValues extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidValues"
    }
}

// функция для единственного выбора checkbox-а
// обработчик события onchange. на любое изменение будет вызвана функция
// будем проходиться по всем чекбоксам. допустим первый чекбокс отмечен, тогда у него выполняется условие
// this.checked=true
// и при этом мы наблюдаем, что таких отмеченных чекбоксов больше, чем один. Тогда устанавливаем текущий чекбокс на false
for (let i = 0; i < xCoordinate.length; i++) {
    xCoordinate[i].onchange = function () {
        if (this.checked && document.querySelectorAll("[name=xCoord]:checked").length > 1) {
            this.checked = false;
        }
    };
}

function validateValues(values) {
    let xCoords = document.querySelectorAll('input[name="xCoord"]:checked');
    if (xCoords.length === 0) {
        throw new InvalidValues("Не введена координата X");
    }
    if (!values.yCoord) {
        throw new InvalidValues("Не введена координата Y");
    } else if (isNaN(parseFloat(values.yCoord)) || parseFloat(values.yCoord) > 3 || parseFloat(values.yCoord) < -3) {
        throw new InvalidValues("Вы ввели некорректное значение координаты Y. Введите число в диапазоне от -3 до 3.");
    }

    if (!values.rParam) {
        throw new InvalidValues("Не введен параметр R");
    }
}

document.getElementById("coordinatesForm").addEventListener("submit", processingForm);

function processingForm(event) {
    event.preventDefault();
    let form = document.getElementById("coordinatesForm");
    let formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    try {
        validateValues(values);
        fetch("/fcgi-bin/app.jar?" + new URLSearchParams(formData).toString(), {method: "GET"})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function (answer) {
                try {
                    var table = document.getElementById("results").getElementsByTagName("tbody")[0];
                    var newRow = table.insertRow(); // Вставляем новую строку
                    let resCell = newRow.insertCell(0); // Результат
                    newRow.insertCell(1).textContent = answer.x; // X
                    newRow.insertCell(2).textContent = answer.y; // Y
                    newRow.insertCell(3).textContent = answer.r; // R
                    newRow.insertCell(4).textContent = answer.time; // Время попытки
                    newRow.insertCell(5).textContent = answer.proccestime; // Время обработки

                    let textResult = answer.result === "true" ? "YES" : "NO";
                    resCell.textContent = textResult;
                    saveTable();
                } catch (e) {
                    console.error("Ошибка разбора JSON: ", e);
                }
            })
    } catch (error) {
        alert(error.message);
    }
}

function saveTable() {
    const tableData = [];
    document.querySelectorAll('#results tbody tr').forEach(row => {
        const rowData = [];
        row.querySelectorAll('td').forEach(cell => {
            rowData.push(cell.textContent);
        });
        tableData.push(rowData);
    });
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

function loadTable() {
    const tableData = JSON.parse(localStorage.getItem('tableData'));
    if (tableData) {
        const tbody = document.querySelector('#results tbody');
        tableData.forEach(rowData => {
            const newRow = tbody.insertRow();
            rowData.forEach(cellData => {
                const newCell = newRow.insertCell();
                newCell.textContent = cellData;
            });
        });
    }
}

window.onload = loadTable;
