/* Общие стили */
body, html {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
}

.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
}

header {
    background-color: #f8f8f8;
    padding: 10px 0;
    text-align: center;
}

.block1, .block2, .block3 {
    padding: 20px 0;
}

.heading {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

.top-text {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 20px;
}

.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #ff0000;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
}

.person1 {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.block2-left, .block2-right {
    flex: 1;
    padding: 10px;
}

.block2-left img, .block2-right img {
    max-width: 100%;
    height: auto;
}

.sale {
    display: flex;
    justify-content: space-between;
    background-color: #f8f8f8;
    padding: 20px;
    margin-bottom: 20px;
}

.sale-left, .sale-right {
    flex: 1;
    text-align: center;
}

.panel {
    text-align: center;
    margin-bottom: 20px;
}

.panel img {
    max-width: 100%;
    height: auto;
}

.price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff0000;
}

.oldPrice {
    text-decoration: line-through;
    color: #888;
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 768px) {
    .heading {
        font-size: 1.5rem;
    }

    .top-text {
        font-size: 1rem;
    }

    .button {
        width: 100%;
        padding: 15px;
    }

    .person1 {
        flex-direction: column;
    }

    .block2-left, .block2-right {
        flex: none;
        width: 100%;
    }

    .sale {
        flex-direction: column;
    }

    .sale-left, .sale-right {
        margin-bottom: 10px;
    }

    .panel {
        margin-bottom: 10px;
    }

    .price {
        font-size: 1.2rem;
    }
}

/* Фиксация сайта в мобильных версиях только вверх и вниз */
@media (max-width: 768px) {
    body, html {
        overflow-y: auto;
        overflow-x: hidden;
    }

    .wrapper {
        overflow-y: auto;
        overflow-x: hidden;
    }
}