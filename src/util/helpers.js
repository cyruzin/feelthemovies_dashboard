import $ from 'jquery'

/** 
 * Loads a state from localStorage if it exists.  
 */
export function loadState () {
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

/** 
 * Saves a state to the localStorage.  
 * 
 * @param {Object} state - Redux state.
 */
export function saveState (state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (err) { }
}

/**
 * Receives a raw type and returns a named one.
 * 
 * @param {string} type - Raw recommendation type.
 * @returns {string} Named recommendation type. 
 */
export function checkType (type) {
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

/**
 * Receives a raw status and returns a named one.
 * 
 * @param {string} status - Raw recommendation status.
 * @returns {string} Named recommendation status. 
 */
export function checkStatus (status) {
    switch (parseInt(status)) {
        case 0:
            return 'Inactive'
        case 1:
            return 'Active'
        default:
            break
    }
}

/** 
 * This function is a workaround to make theme works properly.
 * This theme was not made for React.
 */
export function loadJs () {
    /**
     * Tooltips init
     */

    $('[data-toggle="tooltip"]').tooltip()

    /**
     * Material Inputs.
     */

    let materialInputs = $('input.input-material')

    materialInputs.filter(function () { return $(this).val() !== '' })
        .siblings('.label-material').addClass('active')

    materialInputs.on('focus', function () {
        $(this).siblings('.label-material').addClass('active')
    })

    materialInputs.on('blur', function () {
        $(this).siblings('.label-material').removeClass('active')

        if ($(this).val() !== '') {
            $(this).siblings('.label-material').addClass('active')
        } else {
            $(this).siblings('.label-material').removeClass('active')
        }
    })

    /**
     * Footer
     */

    let pageContent = $('.page-content')

    $(document).on('sidebarChanged', function () {
        adjustFooter()
    })

    $(window).on('resize', function () {
        adjustFooter()
    })

    function adjustFooter () {
        var footerBlockHeight = $('.footer__block').outerHeight()
        pageContent.css('padding-bottom', footerBlockHeight + 'px')
    }

    /**
    * Adding fade effect to dropdowns.
    */

    $('.dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true)
            .fadeIn(100).addClass('active')
    })
    $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true)
            .fadeOut(100).removeClass('active')
    })

    /**
     * Sidebar Functionality.
     */

    $('.sidebar-toggle').on('click', function () {
        $(this).toggleClass('active')

        $('#sidebar').toggleClass('shrinked')
        $('.page-content').toggleClass('active')
        $(document).trigger('sidebarChanged')

        if ($('.sidebar-toggle').hasClass('active')) {
            $('.navbar-brand .brand-sm').addClass('visible')
            $('.navbar-brand .brand-big').removeClass('visible')
            $(this).find('i').attr('class', 'fa fa-long-arrow-right')
        } else {
            $('.navbar-brand .brand-sm').removeClass('visible')
            $('.navbar-brand .brand-big').addClass('visible')
            $(this).find('i').attr('class', 'fa fa-long-arrow-left')
        }
    })
}