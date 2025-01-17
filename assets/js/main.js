!(function($) {
    "use strict";

    // Hero typed
    if ($('.typed').length) {
           var typed_strings = $(".typed").data('typed-items');
           typed_strings = typed_strings.split(',')
           new Typed('.typed', {
               strings: typed_strings,
               loop: true,
               waitUntilVisible: true,
               startDelay: 2200,
               typeSpeed: 30,
               backSpeed: 50,
               backDelay: 1500
           });
    }

    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $('#header').outerHeight() - 17;
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                var scrollto = target.offset().top - scrolltoOffset;

                if ($(this).attr("href") == '#header') {
                    scrollto = 0;
                }

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function() {
        if (window.location.hash) {
            var initial_nav = window.location.hash;
            if ($(initial_nav).length) {
                var scrollto = $(initial_nav).offset().top - scrolltoOffset;
                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');
            }
        }
    });

    // Mobile Navigation
    if ($('.nav-menu').length) {
        var $mobile_nav = $('.nav-menu').clone().prop({
            class: 'mobile-nav d-lg-none'
        });

        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
        $('body').append('<div class="mobile-nav-overly"></div>');

        // Toggle mobile navigation visibility
        $(document).on('click', '.mobile-nav-toggle', function () {
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').toggle();
        });

        // Handle dropdown toggle
        $(document).on('click', '.mobile-nav li > a', function (e) {
            var $submenu = $(this).next('.dropdown-menu');
            if ($submenu.length) {
                e.preventDefault(); // Prevent navigation for dropdown parent
                $submenu.slideToggle(300); // Toggle dropdown visibility
                $(this).parent().toggleClass('active');
            }
        });

        // Close mobile nav when clicking outside
        $(document).click(function (e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
            }
        });
    }
    
    $(document).on('click', '.mobile-nav .dropdown > a', function(e) {
        e.preventDefault(); // Prevent link from navigating
        var dropdown = $(this).parent('.dropdown');  // Get the parent <li> with dropdown
        dropdown.toggleClass('active');  // Toggle active class to show/hide the dropdown menu
        
        // Ensure other items shift down when dropdown is active
        if (dropdown.hasClass('active')) {
            dropdown.siblings('li').css('margin-top', '20px'); // Add spacing below the dropdown
        } else {
            dropdown.siblings('li').css('margin-top', ''); // Remove spacing when dropdown is closed
        }

        dropdown.siblings('.dropdown').removeClass('active');  // Close other open dropdowns
    });

    // Header scroll class
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, .mobile-nav');

    $(window).on('scroll', function() {
        var cur_pos = $(this).scrollTop() + 200;

        nav_sections.each(function() {
            var top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                if (cur_pos <= bottom) {
                    main_nav.find('li').removeClass('active');
                }
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
            if (cur_pos < 300) {
                $(".nav-menu ul:first li:first").addClass('active');
            }
        });
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Skills section
    $('.skills-content').waypoint(function() {
        $('.progress .progress-bar').each(function() {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {
        offset: '80%'
    });

    // Porfolio isotope and filter
    $(window).on('load', function() {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function() {
            $("#portfolio-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');

            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
            aos_init();
        });

        // Initiate venobox (lightbox feature used in portofilo)
        $(document).ready(function() {
            $('.venobox').venobox();
        });
    });

    // // Testimonials carousel (uses the Owl Carousel library)
    // $(".testimonials-carousel").owlCarousel({
    //   autoplay: true,
    //   dots: true,
    //   loop: true,
    //   responsive: {
    //     0: {
    //       items: 1
    //     },
    //     768: {
    //       items: 2
    //     },
    //     900: {
    //       items: 3
    //     }
    //   }
    // });

    // // Portfolio details carousel
    
    document.addEventListener("DOMContentLoaded", function() {
      // Initialize Owl Carousel with autoplay disabled
      var owl = $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: false,  // Initially, autoplay is off
        items: 1
      });

      // Set up Intersection Observer to detect when the carousel comes into view
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Start autoplay once the section is in view
            owl.trigger('play.owl.autoplay', [2000]);  // Starts autoplay with 2s delay
            observer.unobserve(entry.target);  // Stop observing once autoplay is triggered
          }
        });
      }, {
        threshold: 0.5  // Start when 50% of the section is visible
      });

      // Observe the carousel section
      const carouselSection = document.querySelector("#pastevents");  // or any other section ID
      observer.observe(carouselSection);
    });
    
   /* $(".portfolio-details-carousel").owlCarousel({
       autoplay: true,
       dots: true,
       loop: true,
       items: 1
     });*/

    // Init AOS
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out-back",
            once: true
        });
    }
    $(window).on('load', function() {
        aos_init();
    });
    
    // //Read More or Less
    // $(document).ready(function() {
    //   $("#toggle").click(function() {
    //     var elem = $("#toggle").text();
    //     if (elem == "Read More") {
    //       //Stuff to do when btn is in the read more state
    //       $("#toggle").text("Read Less");
    //       $("#text").slideToggle("slow");
    //     } else {
    //       //Stuff to do when btn is in the read less state
    //       $("#toggle").text("Read More");
    //       $("#text").slideToggle("slow");
    //     }
    //   });
    // });

})(jQuery);
