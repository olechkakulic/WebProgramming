<%--<%@ page import="Lab2Web.src.main.java.models.Point"%>--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebLab1</title>
    <meta name="description" content="Моя первая лабораторная по вебу..">
    <link rel="stylesheet" type="text/css" href="style/index.css">
    <link rel="stylesheet" type="text/css" href="style/header.css">
    <link rel="stylesheet" type="text/css" href="style/main.css">
    <link rel="stylesheet" type="text/css" href="style/form.css">
    <script src="index.js" defer type="text/javascript"></script>
    <script src="image.js" defer type="text/javascript"></script>
    <!--    . Наиболее часто используют значение device-width у параметра width,
    которое устанавливает ширину страницы, равную ширине экрана устройства.-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<header class="header">
    <div class="header-logo">
        <img class="header-logo-img" src="images/min1.png" alt="миньон1">
        <p class="header-logo-title"> Loginova Olya </p>
        <img class="header-logo-img" src="images/min2.png" alt="миньон2">
        <p class="header-logo-title"> P3231, var: 662 </p>
        <img class="header-logo-img" src="images/min1.png" alt="миньон1">
    </div>
</header>

<main>
    <div class="main-grid">
        <form id="coordinatesForm" onsubmit="processingForm()" action="${pageContext.request.contextPath}/ControllerServlet" method="post">
            <div class="grid-parametrs">
                <div class="x-form">
                    <label> Выберите координату X:</label>
                    <label> <input type="checkbox" name="xCoord" value="-5">-5</label>
                    <label> <input type="checkbox" name="xCoord" value="-4">-4</label>
                    <label> <input type="checkbox" name="xCoord" value="-3">-3</label>
                    <label> <input type="checkbox" name="xCoord" value="-2">-2</label>
                    <label> <input type="checkbox" name="xCoord" value="-1">-1</label>
                    <label> <input type="checkbox" name="xCoord" value="0">0</label>
                    <label> <input type="checkbox" name="xCoord" value="1">1</label>
                    <label> <input type="checkbox" name="xCoord" value="2">2</label>
                    <label> <input type="checkbox" name="xCoord" value="3">3</label>
                </div>
                <div class="y-form">
                    <label> Выберите координату Y:</label>
                    <label><input type="text" name="yCoord" placeholder="Введите число от -3 до 3"
                                  min="-3" max="3"></label>
                </div>
                <div class="R-form">
                    <label for="rParam">Выберите параметр R:</label>
                    <select id="rParam" name="rParam">
                        <option disabled selected value> -- выберите опцию --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <button class="button-form-send" id="submit-button" type="submit">Отправить</button>
                </div>
                <!--                <div>-->
                <!--                    <button class="button-form-clear" type="submit">очистить значения</button>-->
                <!--                </div>-->
            </div>
        </form>
        <div class="grid-image">
            <canvas id="myCanvas" width="300" height="300"></canvas>
        </div>
        <div class="grid-table">
            <table id="results" class="table">
                <thead id="thead">
                <tr>
                    <th id="resultRow">Результат</th>
                    <th id="xRow">X</th>
                    <th id="yRow">Y</th>
                    <th id="rRow">R</th>
                    <th id="attempttimeRow">Время попытки</th>
                    <th id="proccessingtimeRow">Время исполнения процесса</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</main>

<footer class="footer">
    <!--    <div class="footer-divimage">-->
    <!--        <img src="/images/pngwing.com%20(1).png">-->
    <!--    </div>-->
</footer>

</body>
</html>