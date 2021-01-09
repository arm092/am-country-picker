import countries from "./data";
import defaults from "./defaults";
import view from "./../views/without_flag.mustache";

"use strict";

if (typeof window.jQuery !== 'undefined') {
    (function ($) {
        $.fn.amcPicker = function (options = undefined) {
            this.each(function () {
                let $this = $(this),
                    picker = new AmcPicker($this[0], options);
            })
        }
    })(jQuery);
}

export default class AmcPicker {
    /**
     *
     * @param  {HTMLElement} el
     * @param {undefined|Object} options
     */
    constructor(el, options = undefined) {
        /**
         * A copy of the defaults object so that state is not
         * mutated with new instances.
         *
         * @type {*}
         */
        this.defaults = Object.assign({}, defaults);

        if (typeof options === "object") {
            this._setDefaults(options);
        }

        this.picker = el;
        this.language = document.querySelector('html').getAttribute('lang') || 'en';
        this.render();

    }

    /**
     * Sets default options based on developer-supplied parameters
     *
     * @param options
     * @private
     */
    _setDefaults(options) {
        const keys = Object.keys(options);
        keys.forEach(key => {
            if (this.defaults.hasOwnProperty(key)) {
                if (key === 'exclude') {
                    options[key] = options[key].map(el => el.toUpperCase());
                }
                this.defaults[key] = options[key];
            }
        });
    }

    /**
     * Render country picker
     * Append countries list to select
     */
    render() {
        let localCountries = countries.hasOwnProperty(this.language) ? countries[this.language] : countries.en,
            html = ``;
        for (const countryCode in localCountries) {
            if (localCountries.hasOwnProperty(countryCode)) {
                if (!this.defaults.exclude.includes(countryCode))
                    html += view({
                        countryCode,
                        countryName: localCountries[countryCode]
                    })
            }
        }
        this.picker.innerHTML = html;
    }
}