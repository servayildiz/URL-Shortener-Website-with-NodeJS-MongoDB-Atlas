(function ($) {
    "use strict";
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

        // Worldwide Sales Chart
        var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
        var myChart1 = new Chart(ctx1, {
            type: "bar",
            data: {
                labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
                datasets: [{
                        label: "USA",
                        data: [15, 30, 55, 65, 60, 80, 95],
                        backgroundColor: "rgb(207, 87, 255)"
                    },
                    {
                        label: "UK",
                        data: [8, 35, 40, 60, 70, 55, 75],
                        backgroundColor: "rgba(0, 156, 255, .5)"
                    },
                    {
                        label: "AU",
                        data: [12, 25, 45, 55, 65, 70, 60],
                        backgroundColor: "rgb(255, 168, 236)"
                    }
                ]
                },
            options: {
                responsive: true
            }
        });
    
    
        // Salse & Revenue Chart
        var ctx2 = $("#salse-revenue").get(0).getContext("2d");
        var myChart2 = new Chart(ctx2, {
            type: "line",
            data: {
                labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
                datasets: [{
                        label: "Salse",
                        data: [15, 30, 55, 45, 70, 65, 85],
                        backgroundColor: "rgb(0, 42, 255)",
                        fill: true
                    },
                    {
                        label: "Revenue",
                        data: [99, 135, 170, 130, 190, 180, 270],
                        backgroundColor: "rgba(0, 156, 255, .3)",
                        fill: true
                    }
                ]
                },
            options: {
                responsive: true
            }
        });
        
    
    
        // Single Line Chart
        var ctx3 = $("#line-chart").get(0).getContext("2d");
        var myChart3 = new Chart(ctx3, {
            type: "line",
            data: {
                labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
                datasets: [{
                    label: "Salse",
                    fill: false,
                    backgroundColor: "rgba(0, 156, 255, .3)",
                    data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
                }]
            },
            options: {
                responsive: true
            }
        });
    
    
        // Single Bar Chart
        var ctx4 = $("#bar-chart").get(0).getContext("2d");
        var myChart4 = new Chart(ctx4, {
            type: "bar",
            data: {
                labels: ["Italy", "France", "Spain", "USA", "Argentina"],
                datasets: [{
                    backgroundColor: [
                        "rgb(59, 68, 255)",
                        "rgb(207, 87, 255)",
                        "rgb(255, 168, 236)",
                        "rgba(0, 156, 255, .4)",
                        "rgb(211, 191, 255)"
                    ],
                    data: [55, 49, 44, 24, 15]
                }]
            },
            options: {
                responsive: true
            }
        });
    
    
        // Pie Chart
        var ctx5 = $("#pie-chart").get(0).getContext("2d");
        var myChart5 = new Chart(ctx5, {
            type: "pie",
            data: {
                labels: ["Italy", "France", "Spain", "USA", "Argentina"],
                datasets: [{
                    backgroundColor: [
                        "rgba(0, 156, 255, .7)",
                        "rgba(0, 156, 255, .6)",
                        "rgba(0, 156, 255, .5)",
                        "rgba(0, 156, 255, .4)",
                        "rgba(0, 156, 255, .3)"
                    ],
                    data: [55, 49, 44, 24, 15]
                }]
            },
            options: {
                responsive: true
            }
        });
    
    
        // Doughnut Chart
        var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
        var myChart6 = new Chart(ctx6, {
            type: "doughnut",
            data: {
                labels: ["Italy", "France", "Spain", "USA", "Argentina"],
                datasets: [{
                    backgroundColor: [
                        "rgb(229, 158, 255)",
                        "rgb(255, 153, 219)",
                        "rgb(199, 203, 255)",
                        "rgb(255, 199, 252)",
                        "rgb(249, 232, 255)"
                    ],
                    data: [55, 49, 44, 24, 15]
                }]
            },
            options: {
                responsive: true
            }
        });
    
})(jQuery);

