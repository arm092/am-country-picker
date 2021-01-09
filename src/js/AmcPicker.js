import $ from "jquery";
import countries from "./data";
import defaults from "./defaults";
import withFlagView from "./../views/with_flag.mustache";
import withoutFlagView from "./../views/without_flag.mustache";
import "./polyfills";

"use strict";

export default class AmcPicker {
    /**
     *
     * @param {undefined|Object} options
     */
    constructor(options = undefined) {

        this._callback = undefined;

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
                this.defaults[key] = options[key];
            }
        });
    }
}