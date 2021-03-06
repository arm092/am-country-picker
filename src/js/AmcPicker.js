/*
 * Am-Country-Picker v1.0.3
 * https://github.com/arm092/am-country-picker
 * Licensed under the MIT license
 *
 * Author: Arman Khachatryan
 */

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
            return this;
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
     * Async loading countries list
     *
     * @returns {Promise<void>}
     */
    async setCountries() {
        if (typeof window.amCountries !== 'undefined') {
            this.countries = window.amCountries;
        } else {
            const {default: countries} = await import("./data");
            this.countries = countries;
        }
    }

    /**
     * Render country picker
     * Append countries list to select
     */
    render() {
        const _this = this;
        this.setCountries()
            .then(() => {
                let localCountries = _this.countries.hasOwnProperty(_this.language) ? _this.countries[_this.language] : _this.countries.en,
                    html = ``;
                for (const countryCode in localCountries) {
                    if (localCountries.hasOwnProperty(countryCode)) {
                        if (!_this.defaults.exclude.includes(countryCode))
                            html += view({
                                countryCode,
                                countryName: localCountries[countryCode]
                            })
                    }
                }
                _this.picker.innerHTML = html;
                _this.picker.classList.add('amc-loaded');
            });
    }
}