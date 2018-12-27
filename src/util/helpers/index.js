import $ from 'jquery'
import axios from '../constants/axios'

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (err) { }
}


export const getTokenMiddleware = store => {
    return next => {
        return action => {
            axios.interceptors.request.use(req => {
                if (req.url.includes('themoviedb') === false) {
                    let apiToken = store.getState().auth.apiToken
                    req.headers.common['Api-Token'] = apiToken
                    return req
                }
                return req
            },
                error => Promise.reject(error)
            )

            const result = next(action)

            return result
        }
    }
}

export const loadJs = () => {
    // ------------------------------------------------------- //
    // Tooltips init
    // ------------------------------------------------------ //    

    $('[data-toggle="tooltip"]').tooltip()

    // ------------------------------------------------------- //
    // Material Inputs
    // ------------------------------------------------------ //

    let materialInputs = $('input.input-material');

    // activate labels for prefilled values
    materialInputs.filter(function () { return $(this).val() !== ""; }).siblings('.label-material').addClass('active');

    // move label on focus
    materialInputs.on('focus', function () {
        $(this).siblings('.label-material').addClass('active');
    });

    // remove/keep label on blur
    materialInputs.on('blur', function () {
        $(this).siblings('.label-material').removeClass('active');

        if ($(this).val() !== '') {
            $(this).siblings('.label-material').addClass('active');
        } else {
            $(this).siblings('.label-material').removeClass('active');
        }
    });

    // ------------------------------------------------------- //
    // Footer 
    // ------------------------------------------------------ //   

    let pageContent = $('.page-content');

    $(document).on('sidebarChanged', function () {
        adjustFooter();
    });

    $(window).on('resize', function () {
        adjustFooter();
    })

    function adjustFooter() {
        var footerBlockHeight = $('.footer__block').outerHeight();
        pageContent.css('padding-bottom', footerBlockHeight + 'px');
    }

    // ------------------------------------------------------- //
    // Adding fade effect to dropdowns
    // ------------------------------------------------------ //
    $('.dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(100).addClass('active');
    });
    $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(100).removeClass('active');
    });


    // ------------------------------------------------------- //
    // Sidebar Functionality
    // ------------------------------------------------------ //
    $('.sidebar-toggle').on('click', function () {
        $(this).toggleClass('active');

        $('#sidebar').toggleClass('shrinked');
        $('.page-content').toggleClass('active');
        $(document).trigger('sidebarChanged');

        if ($('.sidebar-toggle').hasClass('active')) {
            $('.navbar-brand .brand-sm').addClass('visible');
            $('.navbar-brand .brand-big').removeClass('visible');
            $(this).find('i').attr('class', 'fa fa-long-arrow-right');
        } else {
            $('.navbar-brand .brand-sm').removeClass('visible');
            $('.navbar-brand .brand-big').addClass('visible');
            $(this).find('i').attr('class', 'fa fa-long-arrow-left');
        }
    });
}

export const getYear = (date, parentheses = true) => {
    if (date !== "" && date !== isNaN) {
        let d = new Date(date)
        if (parentheses) {
            return `(${d.getFullYear()})`
        }
        return d.getFullYear()
    }
    return ''
}

export const checkType = type => {
    switch (parseInt(type)) {
        case 0:
            return 'Movie'
        case 1:
            return 'TV'
        case 2:
            return 'Mixed'
        default:
            break
    }
}

export const checkStatus = status => {
    switch (parseInt(status)) {
        case 0:
            return 'Inactive'
        case 1:
            return 'Active'
        default:
            break
    }
}