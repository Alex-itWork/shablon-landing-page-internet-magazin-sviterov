$(document).ready(function(){
    if($(window).width() > 740) {
        $('.easyzoom').easyZoom();
    }

    $('.banners-slides').bxSlider({
        adaptiveHeight: true,
        nextSelector: '.banners-slider__next',
        prevSelector: '.banners-slider__prev',
        auto: true,
        pause: 10000,
        speed: 1000,
        nextText: ' ',
        prevText: ' ',
        onSliderLoad: function () {
            $(".banners .bx-pager.bx-default-pager").remove();
        }
    });

    $('.shop-photo-slides').bxSlider({
        nextSelector: '.shop-photo__next',
        prevSelector: '.shop-photo__prev',
        nextText: ' ',
        prevText: ' ',
        onSliderLoad: function () {
            $(".shop .bx-pager.bx-default-pager").remove();
        }
    });

    $('.popup-gallery-slides').bxSlider({
        nextSelector: '.popup-gallery__next',
        prevSelector: '.popup-gallery__prev',
        nextText: ' ',
        prevText: ' ',
        onSliderLoad: function () {
            $(".popup-gallery .bx-pager.bx-default-pager").remove();
        }
    });

    if($(window).width() <= 740) {
        $('.sets-list').bxSlider({
            pagerCustom: '.sets-control',
            nextText: ' ',
            prevText: ' ',
            onSliderLoad: function () {
                $(".sets .bx-pager.bx-default-pager").remove();
            }
        });
    }

    var sliders = $('.popup-product-slider'), mode = 'horizontal';
    if($(window).width() <= 740) {
        mode = 'vertical';
    }
    for(var f = 0; f < sliders.length; f++) {
        (function(){
            var z = f, length = sliders.eq(z).find('.popup-product-control__link').length;
            sliders.eq(z).find('.popup-product-slides').bxSlider({
                mode: 'fade',
                pagerCustom: sliders.eq(z).find('.popup-product-control'),
                nextText: ' ',
                prevText: ' ',
                onSlideBefore: function(){
                    if(length > 4) {
                        slider.goToNextSlide();
                    }
                },
                adaptiveHeight: true,
                onSliderLoad: function () {
                    $(".popup .bx-pager.bx-default-pager").remove();
                }
            });

            if(length > 4) {
                var slider = sliders.eq(z).find('.popup-product-control').bxSlider({
                    mode: mode,
                    nextText: ' ',
                    prevText: ' ',
                    minSlides: 4,
                    maxSlides: 4,
                    moveSlides: 1,
                    onSliderLoad: function () {
                        $(".p-prod-left .bx-pager.bx-default-pager").remove();
                    }
                });
            }

        })();
    }

    $('.nav__btn').on('click', function(e){
        e.stopPropagation();
        var block = $(this).parent();
        $('body').off('click');
        if(block.hasClass('open')) {
            block.removeClass('open');
        } else {
            block.addClass('open');
            $('body').on('click', function(){
                block.removeClass('open');
            });

        }
    });

    $('.nav').on('click', function(e){
        e.stopPropagation();
    });

    $('.scroll-btn').on('click', function(e){
        var id = $(this).data('href'), offset = 66;
        if(id.indexOf('catalog') && $(window).width() > 740) {
            offset = -30;
        } else if(id.indexOf('catalog') && $(window).width() <= 740) {
            offset = 10;
        }
        $('.page-wrap').stop().animate({ scrollTop: $(id).offset().top - offset + $('.page-wrap').scrollTop()}, 1000);
        e.preventDefault();
    });

    $('.products__btn').on('click', function(){
        var blocks = $(this).parents('.catalog').find('.products-line:not(.open)');
        blocks.eq(0).addClass('open').slideDown();
        if(blocks.length == 1) {
            $(this).slideUp();
            $('body').addClass('.no-scroll');
            console.log(blocks);
        }
    });

    $('.popup').on('click', '.count__minus', function(){
        var field = $(this).parent().find('input');
        if(field.val() == 1) {
            return;
        }
        field.val(field.val() - 1);
        var prices = $('.basket-item'), sum = 0;
        for(var j = 0; j < prices.length; j++) {
            sum += +prices.eq(j).find('.basket-item__price').text().replace('руб.', '').replace(/ /g, '') * +prices.eq(j).find('.count__field').val();
        }
        $('.popup-basket__title i').text(numberFormat(sum + ''));
        $('.p-o-form__price i').text(numberFormat(Math.floor((sum + 500) * 0.95) + ''));
$('.zzz').val(~~sum);
        var sumn = 0, counts = $('.count__field');
        for(var k = 0; k < counts.length; k++) {
            sumn += +counts.eq(k).val();
        }

        $('.popup-basket__title em, .w-basket__count').text(sumn);
    });

    $('.popup').on('click', '.count__plus', function(){
        var field = $(this).parent().find('input');
        field.val(+field.val() + 1);
        var prices = $('.basket-item'), sum = 0;
        for(var j = 0; j < prices.length; j++) {
            sum += +prices.eq(j).find('.basket-item__price').text().replace('руб.', '').replace(/ /g, '') * +prices.eq(j).find('.count__field').val();
        }
        $('.popup-basket__title i').text(numberFormat(sum + ''));
        $('.p-o-form__price i').text(numberFormat(Math.floor((sum + 500) * 0.95) + ''));
$('.zzz').val(~~sum);
        var sumn = 0, counts = $('.count__field');
        for(var k = 0; k < counts.length; k++) {
            sumn += +counts.eq(k).val();
        }

        $('.popup-basket__title em, .w-basket__count').text(sumn);
    });

    $('.page-wrap').on('click', '.w-b-i__delete', function(){
        var index = $(this).parent().index();
        var array = JSON.parse(localStorage['prodKus']);
        array.splice(index, 1);
        localStorage['prodKus'] = JSON.stringify(array);
        initProducts();
        if($('.w-basket-item').length == 0) {
            $('.w-basket-wr').addClass('null');
        }
    });

    $('.popup').on('click', '.basket-item__delete', function(){
        var index = $(this).parent().index();
        var array = JSON.parse(localStorage['prodKus']);
        array.splice(index, 1);
        localStorage['prodKus'] = JSON.stringify(array);
        initProducts();
        if($('.basket-item').length == 0) {
            $('.popup-basket__order').css('display', 'none');
            $('.w-basket-wr').addClass('null');
        }

        var sumn = 0, counts = $('.count__field');
        for(var k = 0; k < counts.length; k++) {
            sumn += +counts.eq(k).val();
        }
        $('.popup-basket__title em').text(sumn);
    });

    $('.popup').on('click', '.basket-select', function(){
        $(this).toggleClass('open');
    });

    $('.popup').on('click', '.basket-select__size:not(.active)', function(){
        $(this).parents('.basket-select').find('.basket-select__size.active').text($(this).text());
    });

    $('.popup').on('click', '.basket-select__color:not(.active)', function(){
        $(this).parents('.basket-select')
            .find('.basket-select__color.active')
            .removeClass().addClass($(this).attr('class')).addClass('active');
    });

    $('.p-prod__size, .p-prod__color, .p-colors__color').on('click', function(e){
        e.stopPropagation();
        $(this).parent().find('*').removeClass('active');
        $(this).addClass('active');
    });


    function popupOpen(elem, popup){
        $(elem).on('click', function (e) {
            e.preventDefault();
            $('.overlay').css('left', '0').fadeIn(400,
                function () {
                if($(window).width() <= 740 && $(popup).hasClass('popup-product')) {
                    $('.popup-close-fix__title').text($(popup).find('.p-prod__title').text());
                    $('.popup-close-fix').css('display', 'block').animate({opacity: 1}, 200);
                }
                    $(popup).css({'position': 'relative', 'left': '0'}).css('display', 'block').animate({opacity: 1}, 200, function(){
                        if($(window).width() > 740 && $(popup).hasClass('popup-product')) {
                            $(popup).find('.bx-wrapper:first-child .bx-viewport').height($(popup).find('.bx-wrapper:first-child .bx-viewport img:first-child').height())
                        }
                    });
                });
            return false;
        });
    }

    popupOpen('.phone__btn, .header__callback, .manager__btn', '.popup-callback');
    popupOpen('.shipping__btn', '.popup-calk');
    popupOpen('.steps__btn', '.popup-question');
    popupOpen('.steps-video', '.popup-video');
    popupOpen('.w-basket__btn', '.popup-order');
    popupOpen('.w-basket-btn', '.popup-basket');
    popupOpen('.shop__link', '.popup-shops');
    popupOpen('.banner', '.popup-gallery');



    var products, sets;
    if($(window).width() <= 740) {
        products = $('.product__photo, .product__btn');
        sets = $('.set');
        for(var i = 0; i < products.length; i++) {
            popupOpen(products.eq(i), products.eq(i).parent().find('.product__btn').data('popup'));
            popupOpen(sets.eq(i), sets.eq(i).find('.set__order').data('popup'));

        }
    } else {
        products = $('.product__btn');
        sets = $('.set__order, .set-photo');
        var productsPh = $('.product__photo');
        for(var i = 0; i < products.length; i++) {
            popupOpen(products.eq(i), products.eq(i).data('popup'));
            popupOpen(sets.eq(i), sets.eq(i).parents('.set').find('.set__order').data('popup'));
            popupOpen(productsPh.eq(i), productsPh.eq(i).parent().find('.product__btn').data('popup'));
        }
    }

    $('.popup, .popup-close-fix').on('click', function(e){
        e.stopPropagation();
    });

    $('.popup__close, .overlay, .popup-basket__return, .popup-close-fix__btn').click(function () {
        $('.popup-close-fix')
            .animate({opacity: 0}, 200,
                function () {
                    $(this).css('display', 'none');
                }
            );

        $('.popup:visible')
            .animate({opacity: 0}, 200,
                function () {
                    $(this).css('display', 'none');
                    $('.overlay').fadeOut(200);
                }
            );
    });

    $('.popup-products_1 .p-prod__size-table').on('click', function (e) {
        e.preventDefault();
        $('.overlay-sup').fadeIn(400, function () {$('.popup-size_men').css('display', 'block').animate({opacity: 1}, 200);});
        return false;
    });

    $('.popup-products_2 .p-prod__size-table').on('click', function (e) {
        e.preventDefault();
        $('.overlay-sup').fadeIn(400, function () {$('.popup-size_women').css('display', 'block').animate({opacity: 1}, 200);});
        return false;
    });

    $('.popup-products_3 .p-prod__size-table').on('click', function (e) {
        e.preventDefault();
        $('.overlay-sup').fadeIn(400, function () {$('.popup-size_child').css('display', 'block').animate({opacity: 1}, 200);});
        return false;
    });

    $('.popup-product_22 .p-prod__size-table, .popup-product_23 .p-prod__size-table, .popup-product_24 .p-prod__size-table').on('click', function (e) {
        e.preventDefault();
        $('.overlay-sup').fadeIn(400, function () {
            $('.popup-size_men').css('display', 'block').animate({opacity: 1}, 200);
            $('.popup-size_women').css('display', 'block').animate({opacity: 1}, 200);
            $('.popup-size_child').css('display', 'block').animate({opacity: 1}, 200);
        });
        return false;
    });

    $('.p-prod-links li:first-child a').on('click', function (e) {
        e.preventDefault();
        $('.overlay-sup').fadeIn(400, function () {$('.popup-care').css('display', 'block').animate({opacity: 1}, 200);});
        return false;
    });

    $('.p-prod__shipping-btn').on('click', function (e) {
        e.preventDefault();
        $('.overlay-sup').fadeIn(400, function () {$('.popup-shipping').css('display', 'block').animate({opacity: 1}, 200);});
        return false;
    });

    $('.popup-size__close, .overlay-sup').click(function (e) {
        e.stopPropagation();
        $('.overlay-sup .popup')
            .animate({opacity: 0}, 200,
                function () {
                    $(this).css('display', 'none');
                    $('.overlay-sup').fadeOut(400);
                }
            );
    });

    function numberFormat(str) {
        var result = '';
        if(str.length / 3 <= 1) {
            return str;
        }
        for(var i = 0; i < str.length / 3; i++) {
            if(i == 0) {
                result = str.slice(-3, str.length);
            } else {
                result = str.slice(-3 * (i + 1), -3 * i) + ' ' + result;
            }
        }
        return result;
    }

    if(localStorage['prodKus']) {
        initProducts();
    }

    function basketOpen(block, notOpen) {

        $('.popup-close-fix').animate({opacity: 0}, 200, function () {$(this).css('display', 'none');});
        if(!localStorage['prodKus']) {
            localStorage['prodKus'] = JSON.stringify([]);
        }
        var array = JSON.parse(localStorage['prodKus']);
        if(block.hasClass('popup-product_set')) {
            array.push({
                'sets': 'true',
                'popup': block.data('index'),
                'alias': block.find('.p-prod__title').text(),
                'index': block.find('.p-prod__index').text(),
                'size_first': block.find('.p-prod__size.active').eq(0).text(),
                'size_second': block.find('.p-prod__size.active').eq(1).text(),
                'size_third': block.find('.p-prod__size.active').eq(2).text(),
                'price': block.find('.p-prod__price').text(),
                'img': block.find('.p-prod-left img').eq(0).attr('src')
            });
        } else {
            array.push({
                'popup': block.data('index'),
                'alias': block.find('.p-prod__title').text(),
                'index': block.find('.p-prod__index').text(),
                'size': block.find('.p-prod__size.active').text(),
                'price': block.find('.p-prod__price').text(),
                'img': block.find('.p-prod-left img').eq(0).attr('src')
            });
        }

        localStorage['prodKus'] = JSON.stringify(array);
        initProducts();

        var sumn = 0, counts = $('.count__field');
        for(var k = 0; k < counts.length; k++) {
            sumn += +counts.eq(k).val();
        }

        $('.popup-basket__title em').text(sumn);

        if(notOpen) {
            return;
        }

        $('.popup-product:visible').animate({opacity: 0}, 200,
            function () {
                $(this).css('display', 'none');
                $('.popup-basket').css({'position': 'relative', 'left': '0'}).css('display', 'block').animate({opacity: 1}, 200);
            });
    }

    $('.p-prod__click').on('click', function(){
        var block = $(this).parents('.popup-product');
        basketOpen(block, 'true');

        $('.popup-product:visible').animate({opacity: 0}, 200,
            function () {
                $(this).css('display', 'none');
                $('.popup-click').css({'position': 'relative', 'left': '0'}).css('display', 'block').animate({opacity: 1}, 200);
            });
    });

    $('.p-prod__btn').on('click', function(){
        var block = $(this).parents('.popup-product');
        basketOpen(block);

    });

    $('.popup-basket__order').on('click', function(){
        $('.popup-basket').animate({opacity: 0}, 200,
            function () {
                $(this).css('display', 'none');
                $('.popup-order').css({'position': 'relative', 'left': '0'}).css('display', 'block').animate({opacity: 1}, 200);
            });
    });

    function initProducts() {
        var list = JSON.parse(localStorage['prodKus']);
        $('.w-basket-item').detach();
        $('.basket-item').detach();
        $('.w-basket__count').text('0');
        for(var j = 0; list.length > j; j++) {
            $('.w-basket__count').text(list.length);
            $('.w-basket-wr').removeClass('null');
            $('.popup-basket__order').css('display', 'inline-block');
            if(list[j].sets) {
                $('.w-basket-list').append(
                    '<div class="w-basket-item">' +
                    '<span class="w-b-i__delete"></span>' +
                    '<p class="w-b-i__title">' + list[j].alias + '</p>' +
                    '<i class="w-b-i__size"></i>' +
                    '<span class="w-b-i__price">' + list[j].price + '</span>' +
                    '</div>');
            } else {
                $('.w-basket-list').append(
                    '<div class="w-basket-item">' +
                    '<span class="w-b-i__delete"></span>' +
                    '<p class="w-b-i__title">' + list[j].alias + '</p>' +
                    '<i class="w-b-i__size">' + list[j].size + '</i>' +
                    '<span class="w-b-i__price">' + list[j].price + '</span>' +
                    '</div>');
            }

            var stringi;
            if(list[j].sets) {
                stringi = '<div class="basket-item spacer">' +
                    '            <img src="' + list[j].img + '" alt="фото">'+
                    '                <div class="basket-item-desc">' +
                    '                    <p class="basket-item__title">' + list[j].alias + '</p>' +
                    '                    <p class="basket-item__index">' + list[j].index + '</p>' +
                    '                </div><!--basket-item-desc-->' +
                    '                <div class="count-wr">' +
                    '                    <span class="count-wr__title">Количество:</span>' +
                    '                    <div class="count">' +
                    '                        <input type="text" name="count" class="count__field" value="1" disabled>' +
                    '                        <span class="count__minus"></span>' +
                    '                        <span class="count__plus"></span>' +
                    '                    </div><!--count-->' +
                    '                </div><!--count-wr-->' +
                    '               <div class="basket-selects">'+
                    '                <div class="basket-select">' +
                    '                    <span class="basket-select__title">Женский свитер:</span>' +
                    '                    <i class="basket-select__size active">' + list[j].size_first + '</i>' +
                    '                    <div class="basket-select-sizes">' +
                    '                        <i class="basket-select__size">xs</i>' +
                    '                        <i class="basket-select__size">s</i>' +
                    '                        <i class="basket-select__size">M</i>' +
                    '                        <i class="basket-select__size">L</i>' +
                    '                        <i class="basket-select__size">XL</i>' +
                    '                        <i class="basket-select__size">XXL</i>' +
                    '                    </div><!--basket-select-sizes-->' +
                    '                </div><!--basket-select-->' +
                    '                <div class="basket-select">' +
                    '                    <span class="basket-select__title">Мужской свитер:</span>' +
                    '                    <i class="basket-select__size active">' + list[j].size_second + '</i>' +
                    '                    <div class="basket-select-sizes">' +
                    '                        <i class="basket-select__size">xs</i>' +
                    '                        <i class="basket-select__size">s</i>' +
                    '                        <i class="basket-select__size">M</i>' +
                    '                        <i class="basket-select__size">L</i>' +
                    '                        <i class="basket-select__size">XL</i>' +
                    '                        <i class="basket-select__size">XXL</i>' +
                    '                    </div><!--basket-select-sizes-->' +
                    '                </div><!--basket-select-->' +
                    '                <div class="basket-select">' +
                    '                    <span class="basket-select__title">Детский свитер:</span>' +
                    '                    <i class="basket-select__size active">' + list[j].size_third + '</i>' +
                    '                    <div class="basket-select-sizes">' +
                    '                        <i class="basket-select__size">xs</i>' +
                    '                        <i class="basket-select__size">s</i>' +
                    '                        <i class="basket-select__size">M</i>' +
                    '                        <i class="basket-select__size">L</i>' +
                    '                        <i class="basket-select__size">XL</i>' +
                    '                        <i class="basket-select__size">XXL</i>' +
                    '                    </div><!--basket-select-sizes-->' +
                    '                </div><!--basket-select-->' +
                    '               </div>' +
                    '                <span class="basket-item__price">' + list[j].price + '</span>' +
                    '                <span class="basket-item__delete"></span>' +
                    '            </div><!--basket-item-->';
            } else {
                stringi = '<div class="basket-item spacer">' +
                    '            <img src="' + list[j].img + '" alt="фото">'+
                    '                <div class="basket-item-desc">' +
                    '                    <p class="basket-item__title">' + list[j].alias + '</p>' +
                    '                    <p class="basket-item__index">' + list[j].index + '</p>' +
                    '                </div><!--basket-item-desc-->' +
                    '                <div class="count-wr">' +
                    '                    <span class="count-wr__title">Количество:</span>' +
                    '                    <div class="count">' +
                    '                        <input type="text" name="count" class="count__field" value="1" disabled>' +
                    '                        <span class="count__minus"></span>' +
                    '                        <span class="count__plus"></span>' +
                    '                    </div><!--count-->' +
                    '                </div><!--count-wr-->' +
                    '               <div class="basket-selects">'+
                    '                <div class="basket-select">' +
                    '                    <span class="basket-select__title">Размер:</span>' +
                    '                    <i class="basket-select__size active">' + list[j].size + '</i>' +
                    '                    <div class="basket-select-sizes">' +
                    '                        <i class="basket-select__size">xs</i>' +
                    '                        <i class="basket-select__size">s</i>' +
                    '                        <i class="basket-select__size">M</i>' +
                    '                        <i class="basket-select__size">L</i>' +
                    '                        <i class="basket-select__size">XL</i>' +
                    '                        <i class="basket-select__size">XXL</i>' +
                    '                    </div><!--basket-select-sizes-->' +
                    '                </div><!--basket-select-->' +
                    '               </div>' +
                    '                <span class="basket-item__price">' + list[j].price + '</span>' +
                    '                <span class="basket-item__delete"></span>' +
                    '            </div><!--basket-item-->';
            }
            $('.basket').append(stringi);
        }

        var prices = $('.basket-item__price'), sum = 0;
        for(var k = 0; k < prices.length; k++) {
            sum += +prices.eq(k).text().replace('руб.', '').replace(/ /g, '');
        }
        $('.popup-basket__title i').text(numberFormat(sum + ''));
        $('.p-o-form__price i').text(numberFormat(Math.floor((sum + 0)) + ''));
$('.zzz').val(~~sum);
    }


    var h_hght = 10;
    var top = $('.page-wrap').scrollTop();
    var scroll = $('.scroll-block');

    if (top < h_hght) {
        scroll.removeClass('scr-scr');
    } else {
        scroll.addClass('scr-scr');
    }

    $('.page-wrap').scroll(function(){
        top = $(this).scrollTop();

        if (top < h_hght) {
            scroll.removeClass('scr-scr');
        } else {
            scroll.addClass('scr-scr');
        }
    });

    $('.faq-item__title, .faq-item__icon').on('click', function(){
        $(this).parent().toggleClass('open');
    });

    $('input[id=code]').focusout(function(){
        var block = $(this);
        if(block.val() != '') {
            if(block.val().toLowerCase() == 'kosenko' || block.val().toLowerCase() == 'friday'){
                block.removeClass('error');
            } else {
                block.addClass('error');
                return;

            }

        }
        sumFormat();
    });

//    $('form').submit(function(e){
//
//		if($('.oo.p-o-f-select__item.w-173px.active').attr('data-kassa')!="yakassa"){e.preventDefault();}else{$('.qqwee').val($('.zzz').val());}
//
//
//        if($(this).hasClass('p-o-form')) {
//            var block = $(this);
//            if(block.find('input[id=code]').val() != '') {
//                if(block.find('input[id=code]').val().toLowerCase() == 'kosenko' || block.find('input[id=code]').val().toLowerCase() == 'friday'){
//                    block.find('input[id=code]').removeClass('error');
//                    sumFormat();
//                } else {
//                    block.find('input[id=code]').addClass('error');
//                    return;
//
//                }
//
//            }
//
//            block.find('input[name=pay]').val(block.find('.p-o-f-select_pay .active').text());
//            block.find('input[name=shipping]').val(block.find('.p-o-f-select_shipping .active').text());
//            block.find('input[name=result]').val(block.find('.p-o-form__price em').text());
//            block.find('input[name=description]').val(block.find('.cities-descs__desc.active').text());
//            var array = JSON.parse(localStorage['prodKus']), str = '', bItems = $('.basket-item');
//            for(var j = 0; j < array.length; j++) {
//                if(array[j].sets) {
//                    str += array[j].alias + '\r\n';
//                    str += 'Стоимость: ' + array[j].price + '\r\n';
//                    str += 'Женский свитер: ' + bItems.eq(j).find('.basket-select__size.active').eq(0).text() + '\r\n';
//                    str += 'Мужской свитер: ' + bItems.eq(j).find('.basket-select__size.active').eq(1).text() + '\r\n';
//                    str += 'Детский свитер: ' + bItems.eq(j).find('.basket-select__size.active').eq(2).text() + '\r\n';
//                    str += array[j].index + '\r\n';
//                    str += array[j].color + '\r\n';
//                    str += 'Кол-во: ' + bItems.eq(j).find('.count__field').val() + '\r\n\r\n';
//                } else {
//                    str += array[j].alias + '\r\n';
//                    str += 'Стоимость: ' + array[j].price + '\r\n';
//                    str += 'Размер: ' + bItems.eq(j).find('.basket-select__size.active').text() + '\r\n';
//                    str += array[j].index + '\r\n';
//                    str += array[j].color + '\r\n';
//                    str += 'Кол-во: ' + bItems.eq(j).find('.count__field').val() + '\r\n\r\n';
//                }
//            }
//            block.find('textarea[name=products]').val(str);
//
//        }
//		$.fn.serializeObject = function() {
//				var o = {};
//				var a = this.serializeArray();
//				$.each(a, function() {
//					if (o[this.name]) {
//						if (!o[this.name].push) {
//							o[this.name] = [o[this.name]];
//						}
//						o[this.name].push(this.value || '');
//					} else {
//						o[this.name] = this.value || '';
//					}
//				});
//				return o;
//			};
//		var data_n = $(this).serialize();
//		var data_n_obj = $(this).serializeObject();
//
//        $.ajax({
//            url: $(this).attr('action'),
//            type: 'POST',
//            data: data_n,
//            success: function (data, textStatus, jqXHR) {
//				// if(data_n_obj.pay == "Оплата картой") {
//				//
//				// 	var ammo = parseFloat(data_n_obj.result.replace(/\s*/g,''));
//				//
//				// 	window.location.href = '/pay.php?p_id=' + data + '&mail=' + data_n_obj.email_client + '&amount=' + ammo;
//				//
//				// 	return true;
//				//
//				// }
//
//                $('.popup-close-fix')
//                    .animate({opacity: 0}, 200,
//                        function () {
//                            $(this).css('display', 'none');
//                        }
//                    );
//
//                $('.popup:visible')
//                    .animate({opacity: 0}, 200,
//                        function () {
//                            $(this).css('display', 'none');
//                            $('.popup-thank').css({'position': 'relative', 'left': '0'}).css('display', 'block').animate({opacity: 1}, 200);
//                        }
//                    );
//
//                localStorage['prodKus'] = JSON.stringify([]);
//                $('.w-basket-wr').addClass('null');
//                initProducts();
//            }
//        });
//		$('.popup-close-fix')
//          .animate({opacity: 0}, 200,
//            function () {
//                $(this).css('display', 'none');
//            }
//        );
//
//        $('.popup:visible')
//          .animate({opacity: 0}, 200,
//            function () {
//                $(this).css('display', 'none');
//                $('.popup-thank').css({'position': 'relative', 'left': '0'}).css('display', 'block').animate({opacity: 1}, 200);
//            }
//        );
//
//        localStorage['prodKus'] = JSON.stringify([]);
//        $('.w-basket-wr').addClass('null');
//        initProducts();
//
//    });

    $('.p-o-form__field[name=city]').keyup(function(){
        var val = $(this).val(), str = '', bool = false;
        if(val == '') {
            return;
        }
        for(var j = 0; j < city.length; j++) {
            if(city[j].id.toLowerCase().indexOf(val.toLowerCase()) != -1) {
                str += '<span class="cities__city">' + city[j].id + '</span>';
                bool = true;
            }
        }


        if(bool) {
            $('.cities').css('display', 'block').html(str);
        } else {
            $('.cities').css('display', 'none').html('');
        }
    }).focusout(function(){
        var val = $(this).val();
        for(var j = 0; j < city.length; j++) {
            if(city[j].id.toLowerCase() == val.toLowerCase()) {
                if(city[j].select) {
                    $('.cities-descs').css('display', 'block').html('' +
                        '<span class="cities-descs__desc active">' + city[j].selectFirst + '</span>\n' +
                        '<span class="cities-descs__desc">' + city[j].selectSecond + '</span>' +
                        '');

                    if(+($('.p-o-form__price i').text().replace(/ /g, '')) > 4000) {
                        $('.p-o-f-select__price i').text('0');
                    } else {
                        $('.p-o-f-select__price i').text('300');
                    }
                } else {
                    $('.p-o-f-select__price i').text('500');
                    $('.cities-descs').css('display', 'none').html('');
                }
            }
        }

        sumFormat();
    });

    $('.p-o-form-label_city').on('click', '.cities__city', function(){
        $(this).parents('label').find('input').val($(this).text());
        $('.cities').css('display', 'none');
    });

    $('.p-o-f-select__item').on('click', function(e){
        e.stopPropagation();
        $(this).parent().find('*').removeClass('active');
        $(this).addClass('active');
        sumFormat();
    });

    function sumFormat(){
        var sum = $('.popup-basket__title i').text();
        var mnj = 1;
        if($('.p-o-f-select_shipping .p-o-f-select__item.active').index() == 1) {
            $('.p-o-f-select__price i').text('0');
        } else {
            var val = $('.p-o-form__field[name=city]').val();
            if($('input[name=city]').val() == '') {
                $('.p-o-f-select__price i').text('0');
            } else {
                $('.p-o-f-select__price i').text('500');
            }
            for(var j = 0; j < city.length; j++) {
                if(city[j].id.toLowerCase() == val.toLowerCase()) {
                    if(city[j].select) {
                        if($('.cities-descs__desc.active').index() == 1) {
                            $('.p-o-f-select__price i').text('500');
                        } else {
                            if(+($('.p-o-form__price i').text().replace(/ /g, '')) > 4000) {
                                $('.p-o-f-select__price i').text('0');
                            } else {
                                $('.p-o-f-select__price i').text('300');
                            }
                        }
                    } else {
                        $('.p-o-f-select__price i').text('500');
                    }
                }
            }
        }
        if($('.p-o-f-select_pay .p-o-f-select__item.active').index() == 0) {
            if($('input[id=code]').val().toLowerCase() == 'kosenko') {
                mnj = 0.9;
            } else if($('input[id=code]').val().toLowerCase() == 'friday') {
                mnj = 0.70;
            } else {
                mnj = 0.95;
            }
        } else {
            if($('input[id=code]').val().toLowerCase() == 'kosenko') {
                mnj = 0.9;
            } else if($('input[id=code]').val().toLowerCase() == 'friday') {
                mnj = 0.70;
            }
        }
        sum = (+sum.replace(/ /g, '') + +$('.p-o-f-select__price i').text()) * mnj;
        $('.p-o-form__price i').text(numberFormat(Math.floor(sum) + ''));
		$('.zzz').val(~~sum);
    }

    $('.p-o-form').on('click', '.cities-descs__desc', function(e){
        e.stopPropagation();
        $(this).parent().find('*').removeClass('active');
        $(this).addClass('active');
        if($(this).index() == 1) {
            $('.p-o-f-select__price i').text('500');
        } else {
            if(+($('.p-o-form__price i').text().replace(/ /g, '')) > 4000) {
                $('.p-o-f-select__price i').text('0');
            } else {
                $('.p-o-f-select__price i').text('300');
            }
        }
        sumFormat();
    });

    setTimeout(function(){
        var popups = $('.popup:visible');
        for(var j = 0; j < popups.length; j++) {
            if(popups.eq(j).css('opacity') == 0) {
                popups.eq(j).css({'position': 'relative', 'left': '0', 'display': 'none'});
            }
        }
    }, 4000);
});
