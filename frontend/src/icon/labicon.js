// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { UUID } from '@lumino/coreutils';
import { Signal } from '@lumino/signaling';
import React from 'react';
import ReactDOM from 'react-dom';
import badSvgstr from '../../style/debug/bad.svg';
import blankSvgstr from '../../style/debug/blank.svg';
import refreshSvgstr from '../../style/icons/toolbar/refresh.svg';
import { LabIconStyle } from '../style';
import { classes, getReactAttrs } from '../utils';
export class LabIcon {
    /** *********
     * members *
     ***********/
    constructor({ name, svgstr, render, unrender, _loading = false }) {
        this._props = {};
        this._svgReplaced = new Signal(this);
        /**
         * Cache for svg parsing intermediates
         *   - undefined: the cache has not yet been populated
         *   - null: a valid, but empty, value
         */
        this._svgElement = undefined;
        this._svgInnerHTML = undefined;
        this._svgReactAttrs = undefined;
        if (!(name && svgstr)) {
            // sanity check failed
            console.error(`When defining a new LabIcon, name and svgstr must both be non-empty strings. name: ${name}, svgstr: ${svgstr}`);
            return badIcon;
        }
        // currently this needs to be set early, before checks for existing icons
        this._loading = _loading;
        // check to see if this is a redefinition of an existing icon
        if (LabIcon._instances.has(name)) {
            // fetch the existing icon, replace its svg, then return it
            const icon = LabIcon._instances.get(name);
            if (this._loading) {
                // replace the placeholder svg in icon
                icon.svgstr = svgstr;
                this._loading = false;
                return icon;
            }
            else {
                // already loaded icon svg exists; replace it and warn
                if (LabIcon._debug) {
                    console.warn(`Redefining previously loaded icon svgstr. name: ${name}, svgstrOld: ${icon.svgstr}, svgstr: ${svgstr}`);
                }
                icon.svgstr = svgstr;
                return icon;
            }
        }
        this.name = name;
        this.react = this._initReact(name);
        this.svgstr = svgstr;
        // setup custom render/unrender methods, if passed in
        this._initRender({ render, unrender });
        LabIcon._instances.set(this.name, this);
    }
    /** *********
     * statics *
     ***********/
    /**
     * Remove any rendered icon from the element that contains it
     *
     * @param container - a DOM node into which an icon was
     * previously rendered
     *
     * @returns the cleaned container
     */
    static remove(container) {
        // clean up all children
        while (container.firstChild) {
            container.firstChild.remove();
        }
        // remove all classes
        container.className = '';
        return container;
    }
    /**
     * Resolve an icon name or a {name, svgstr} pair into an
     * actual LabIcon.
     *
     * @param icon - either a string with the name of an existing icon
     * or an object with {name: string, svgstr: string} fields.
     *
     * @returns a LabIcon instance
     */
    static resolve({ icon }) {
        if (icon instanceof LabIcon) {
            // icon already is a LabIcon; nothing to do here
            return icon;
        }
        if (typeof icon === 'string') {
            // do a dynamic lookup of existing icon by name
            const resolved = LabIcon._instances.get(icon);
            if (resolved) {
                return resolved;
            }
            // lookup failed
            if (LabIcon._debug) {
                // fail noisily
                console.warn(`Lookup failed for icon, creating loading icon. icon: ${icon}`);
            }
            // no matching icon currently registered, create a new loading icon
            // TODO: find better icon (maybe animate?) for loading icon
            return new LabIcon({ name: icon, svgstr: refreshSvgstr, _loading: true });
        }
        // icon was provided as a non-LabIcon {name, svgstr} pair, communicating
        // an intention to create a new icon
        return new LabIcon(icon);
    }
    /**
     * Resolve an icon name or a {name, svgstr} pair into a DOM element.
     * If icon arg is undefined, the function will fall back to trying to render
     * the icon as a CSS background image, via the iconClass arg.
     * If both icon and iconClass are undefined, this function will return
     * an empty div.
     *
     * @param icon - optional, either a string with the name of an existing icon
     * or an object with {name: string, svgstr: string} fields
     *
     * @param iconClass - optional, if the icon arg is not set, the iconClass arg
     * should be a CSS class associated with an existing CSS background-image
     *
     * @param fallback - DEPRECATED, optional, a LabIcon instance that will
     * be used if neither icon nor iconClass are defined
     *
     * @param props - any additional args are passed though to the element method
     * of the resolved icon on render
     *
     * @returns a DOM node with the resolved icon rendered into it
     */
    static resolveElement(_a) {
        var { icon, iconClass, fallback } = _a, props = __rest(_a, ["icon", "iconClass", "fallback"]);
        if (!Private.isResolvable(icon)) {
            if (!iconClass && fallback) {
                // if neither icon nor iconClass are defined/resolvable, use fallback
                return fallback.element(props);
            }
            // set the icon's class to iconClass plus props.className
            props.className = classes(iconClass, props.className);
            // render icon as css background image, assuming one is set on iconClass
            return Private.blankElement(props);
        }
        return LabIcon.resolve({ icon }).element(props);
    }
    /**
     * Resolve an icon name or a {name, svgstr} pair into a React component.
     * If icon arg is undefined, the function will fall back to trying to render
     * the icon as a CSS background image, via the iconClass arg.
     * If both icon and iconClass are undefined, the returned component
     * will simply render an empty div.
     *
     * @param icon - optional, either a string with the name of an existing icon
     * or an object with {name: string, svgstr: string} fields
     *
     * @param iconClass - optional, if the icon arg is not set, the iconClass arg
     * should be a CSS class associated with an existing CSS background-image
     *
     * @param fallback - DEPRECATED, optional, a LabIcon instance that will
     * be used if neither icon nor iconClass are defined
     *
     * @param props - any additional args are passed though to the React component
     * of the resolved icon on render
     *
     * @returns a React component that will render the resolved icon
     */
    static resolveReact(_a) {
        var { icon, iconClass, fallback } = _a, props = __rest(_a, ["icon", "iconClass", "fallback"]);
        if (!Private.isResolvable(icon)) {
            if (!iconClass && fallback) {
                // if neither icon nor iconClass are defined/resolvable, use fallback
                return React.createElement(fallback.react, Object.assign({}, props));
            }
            // set the icon's class to iconClass plus props.className
            props.className = classes(iconClass, props.className);
            // render icon as css background image, assuming one is set on iconClass
            return React.createElement(Private.blankReact, Object.assign({}, props));
        }
        const resolved = LabIcon.resolve({ icon });
        return React.createElement(resolved.react, Object.assign({}, props));
    }
    /**
     * Resolve a {name, svgstr} pair into an actual svg node.
     */
    static resolveSvg({ name, svgstr }) {
        const svgDoc = new DOMParser().parseFromString(Private.svgstrShim(svgstr), 'image/svg+xml');
        const svgError = svgDoc.querySelector('parsererror');
        // structure of error element varies by browser, search at top level
        if (svgError) {
            // parse failed, svgElement will be an error box
            const errmsg = `SVG HTML was malformed for LabIcon instance.\nname: ${name}, svgstr: ${svgstr}`;
            if (LabIcon._debug) {
                // fail noisily, render the error box
                console.error(errmsg);
                return svgError;
            }
            else {
                // bad svg is always a real error, fail silently but warn
                console.warn(errmsg);
                return null;
            }
        }
        else {
            // parse succeeded
            return svgDoc.documentElement;
        }
    }
    /**
     * Toggle icon debug from off-to-on, or vice-versa.
     *
     * @param debug - optional boolean to force debug on or off
     */
    static toggleDebug(debug) {
        LabIcon._debug = debug !== null && debug !== void 0 ? debug : !LabIcon._debug;
    }
    /**
     * Get a view of this icon that is bound to the specified icon/style props
     *
     * @param optional icon/style props (same as args for .element
     * and .react methods). These will be bound to the resulting view
     *
     * @returns a view of this LabIcon instance
     */
    bindprops(props) {
        const view = Object.create(this);
        view._props = props;
        view.react = view._initReact(view.name + '_bind');
        return view;
    }
    /**
     * Create an icon as a DOM element
     *
     * @param className - a string that will be used as the class
     * of the container element. Overrides any existing class
     *
     * @param container - a preexisting DOM element that
     * will be used as the container for the svg element
     *
     * @param label - text that will be displayed adjacent
     * to the icon
     *
     * @param title - a tooltip for the icon
     *
     * @param tag - if container is not explicitly
     * provided, this tag will be used when creating the container
     *
     * @param stylesheet - optional string naming a builtin icon
     * stylesheet, for example 'menuItem' or `statusBar`. Can also be an
     * object defining a custom icon stylesheet, or a list of builtin
     * stylesheet names and/or custom stylesheet objects. If array,
     * the given stylesheets will be merged.
     *
     *   See @jupyterlab/ui-components/src/style/icon.ts for details
     *
     * @param elementPosition - optional position for the inner svg element
     *
     * @param elementSize - optional size for the inner svg element.
     * Set to 'normal' to get a standard 16px x 16px icon
     *
     * @param ...elementCSS - all additional args are treated as
     * overrides for the CSS props applied to the inner svg element
     *
     * @returns A DOM element that contains an (inline) svg element
     * that displays an icon
     */
    element(props = {}) {
        var _a;
        let _b = Object.assign(Object.assign({}, this._props), props), { className, container, label, title, tag = 'div' } = _b, styleProps = __rest(_b, ["className", "container", "label", "title", "tag"]);
        // check if icon element is already set
        const maybeSvgElement = container === null || container === void 0 ? void 0 : container.firstChild;
        if (((_a = maybeSvgElement === null || maybeSvgElement === void 0 ? void 0 : maybeSvgElement.dataset) === null || _a === void 0 ? void 0 : _a.iconId) === this._uuid) {
            // return the existing icon element
            return maybeSvgElement;
        }
        // ensure that svg html is valid
        if (!this.svgElement) {
            // bail if failing silently, return blank element
            return document.createElement('div');
        }
        let returnSvgElement = true;
        if (container) {
            // take ownership by removing any existing children
            while (container.firstChild) {
                container.firstChild.remove();
            }
        }
        else {
            // create a container if needed
            container = document.createElement(tag);
            returnSvgElement = false;
        }
        if (label != null) {
            container.textContent = label;
        }
        Private.initContainer({ container, className, styleProps, title });
        // add the svg node to the container
        const svgElement = this.svgElement.cloneNode(true);
        container.appendChild(svgElement);
        return returnSvgElement ? svgElement : container;
    }
    render(container, options) {
        var _a;
        let label = (_a = options === null || options === void 0 ? void 0 : options.children) === null || _a === void 0 ? void 0 : _a[0];
        // narrow type of label
        if (typeof label !== 'string') {
            label = undefined;
        }
        this.element(Object.assign({ container,
            label }, options === null || options === void 0 ? void 0 : options.props));
    }
    get svgElement() {
        if (this._svgElement === undefined) {
            this._svgElement = this._initSvg({ uuid: this._uuid });
        }
        return this._svgElement;
    }
    get svgInnerHTML() {
        if (this._svgInnerHTML === undefined) {
            if (this.svgElement === null) {
                // the svg element resolved to null, mark this null too
                this._svgInnerHTML = null;
            }
            else {
                this._svgInnerHTML = this.svgElement.innerHTML;
            }
        }
        return this._svgInnerHTML;
    }
    get svgReactAttrs() {
        if (this._svgReactAttrs === undefined) {
            if (this.svgElement === null) {
                // the svg element resolved to null, mark this null too
                this._svgReactAttrs = null;
            }
            else {
                this._svgReactAttrs = getReactAttrs(this.svgElement, {
                    ignore: ['data-icon-id']
                });
            }
        }
        return this._svgReactAttrs;
    }
    get svgstr() {
        return this._svgstr;
    }
    set svgstr(svgstr) {
        this._svgstr = svgstr;
        // associate a new unique id with this particular svgstr
        const uuid = UUID.uuid4();
        const uuidOld = this._uuid;
        this._uuid = uuid;
        // empty the svg parsing intermediates cache
        this._svgElement = undefined;
        this._svgInnerHTML = undefined;
        this._svgReactAttrs = undefined;
        // update icon elements created using .element method
        document
            .querySelectorAll(`[data-icon-id="${uuidOld}"]`)
            .forEach(oldSvgElement => {
            if (this.svgElement) {
                oldSvgElement.replaceWith(this.svgElement.cloneNode(true));
            }
        });
        // trigger update of icon elements created using other methods
        this._svgReplaced.emit();
    }
    _initReact(displayName) {
        const component = React.forwardRef((props = {}, ref) => {
            const _a = Object.assign(Object.assign({}, this._props), props), { className, container, label, title, tag = 'div' } = _a, styleProps = __rest(_a, ["className", "container", "label", "title", "tag"]);
            // set up component state via useState hook
            const [, setId] = React.useState(this._uuid);
            // subscribe to svg replacement via useEffect hook
            React.useEffect(() => {
                const onSvgReplaced = () => {
                    setId(this._uuid);
                };
                this._svgReplaced.connect(onSvgReplaced);
                // specify cleanup callback as hook return
                return () => {
                    this._svgReplaced.disconnect(onSvgReplaced);
                };
            });
            // make it so that tag can be used as a jsx component
            const Tag = tag;
            // ensure that svg html is valid
            if (!(this.svgInnerHTML && this.svgReactAttrs)) {
                // bail if failing silently
                return React.createElement(React.Fragment, null);
            }
            const svgComponent = (React.createElement("svg", Object.assign({}, this.svgReactAttrs, { dangerouslySetInnerHTML: { __html: this.svgInnerHTML }, ref: ref })));
            if (container) {
                Private.initContainer({ container, className, styleProps, title });
                return (React.createElement(React.Fragment, null,
                    svgComponent,
                    label));
            }
            else {
                return (React.createElement(Tag, { className: classes(className, LabIconStyle.styleClass(styleProps)) },
                    svgComponent,
                    label));
            }
        });
        component.displayName = `LabIcon_${displayName}`;
        return component;
    }
    _initRender({ render, unrender }) {
        if (render) {
            this.render = render;
            if (unrender) {
                this.unrender = unrender;
            }
        }
        else if (unrender) {
            console.warn('In _initRender, ignoring unrender arg since render is undefined');
        }
    }
    _initSvg({ title, uuid } = {}) {
        const svgElement = LabIcon.resolveSvg(this);
        if (!svgElement) {
            // bail on null svg element
            return svgElement;
        }
        if (svgElement.tagName !== 'parsererror') {
            // svgElement is an actual svg node, augment it
            svgElement.dataset.icon = this.name;
            if (uuid) {
                svgElement.dataset.iconId = uuid;
            }
            if (title) {
                Private.setTitleSvg(svgElement, title);
            }
        }
        return svgElement;
    }
}
LabIcon._debug = false;
LabIcon._instances = new Map();
var Private;
(function (Private) {
    function blankElement(_a) {
        var { className = '', container, label, title, tag = 'div' } = _a, styleProps = __rest(_a, ["className", "container", "label", "title", "tag"]);
        if ((container === null || container === void 0 ? void 0 : container.className) === className) {
            // nothing needs doing, return the icon node
            return container;
        }
        if (container) {
            // take ownership by removing any existing children
            while (container.firstChild) {
                container.firstChild.remove();
            }
        }
        else {
            // create a container if needed
            container = document.createElement(tag);
        }
        if (label != null) {
            container.textContent = label;
        }
        Private.initContainer({ container, className, styleProps, title });
        return container;
    }
    Private.blankElement = blankElement;
    Private.blankReact = React.forwardRef((_a, ref) => {
        var { className = '', container, label, title, tag = 'div' } = _a, styleProps = __rest(_a, ["className", "container", "label", "title", "tag"]);
        // make it so that tag can be used as a jsx component
        const Tag = tag;
        if (container) {
            initContainer({ container, className, styleProps, title });
            return React.createElement(React.Fragment, null);
        }
        else {
            // if ref is defined, we create a blank svg node and point ref to it
            return (React.createElement(Tag, { className: classes(className, LabIconStyle.styleClass(styleProps)) },
                ref && blankIcon.react({ ref }),
                label));
        }
    });
    Private.blankReact.displayName = 'BlankReact';
    function initContainer({ container, className, styleProps, title }) {
        if (title != null) {
            container.title = title;
        }
        const styleClass = LabIconStyle.styleClass(styleProps);
        if (className != null) {
            // override the container class with explicitly passed-in class + style class
            const classResolved = classes(className, styleClass);
            container.className = classResolved;
            return classResolved;
        }
        else if (styleClass) {
            // add the style class to the container class
            container.classList.add(styleClass);
            return styleClass;
        }
        else {
            return '';
        }
    }
    Private.initContainer = initContainer;
    function isResolvable(icon) {
        return !!(icon &&
            (typeof icon === 'string' ||
                (icon.name && icon.svgstr)));
    }
    Private.isResolvable = isResolvable;
    function setTitleSvg(svgNode, title) {
        // add a title node to the top level svg node
        const titleNodes = svgNode.getElementsByTagName('title');
        if (titleNodes.length) {
            titleNodes[0].textContent = title;
        }
        else {
            const titleNode = document.createElement('title');
            titleNode.textContent = title;
            svgNode.appendChild(titleNode);
        }
    }
    Private.setTitleSvg = setTitleSvg;
    /**
     * A shim for svgstrs loaded using any loader other than raw-loader.
     * This function assumes that svgstr will look like one of:
     *
     * - the raw contents of an .svg file:
     *   <svg...</svg>
     *
     * - a data URL:
     *   data:[<mediatype>][;base64],<svg...</svg>
     *
     * See https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
     */
    function svgstrShim(svgstr, strict = true) {
        // decode any uri escaping, condense leading/lagging whitespace,
        // then match to raw svg string
        const [, base64, raw] = decodeURIComponent(svgstr)
            .replace(/>\s*\n\s*</g, '><')
            .replace(/\s*\n\s*/g, ' ')
            .match(strict
            ? // match based on data url schema
                /^(?:data:.*?(;base64)?,)?(.*)/
            : // match based on open of svg tag
                /(?:(base64).*)?(<svg.*)/);
        // decode from base64, if needed
        return base64 ? atob(raw) : raw;
    }
    Private.svgstrShim = svgstrShim;
    /**
     * TODO: figure out story for independent Renderers.
     * Base implementation of IRenderer.
     */
    class Renderer {
        constructor(_icon, _rendererOptions) {
            this._icon = _icon;
            this._rendererOptions = _rendererOptions;
        }
        // eslint-disable-next-line
        render(container, options) { }
    }
    Private.Renderer = Renderer;
    /**
     * TODO: figure out story for independent Renderers.
     * Implementation of IRenderer that creates the icon svg node
     * as a DOM element.
     */
    class ElementRenderer extends Renderer {
        render(container, options) {
            var _a, _b;
            let label = (_a = options === null || options === void 0 ? void 0 : options.children) === null || _a === void 0 ? void 0 : _a[0];
            // narrow type of label
            if (typeof label !== 'string') {
                label = undefined;
            }
            this._icon.element(Object.assign(Object.assign({ container,
                label }, (_b = this._rendererOptions) === null || _b === void 0 ? void 0 : _b.props), options === null || options === void 0 ? void 0 : options.props));
        }
    }
    Private.ElementRenderer = ElementRenderer;
    /**
     * TODO: figure out story for independent Renderers.
     * Implementation of IRenderer that creates the icon svg node
     * as a React component.
     */
    class ReactRenderer extends Renderer {
        render(container, options) {
            var _a, _b;
            let label = (_a = options === null || options === void 0 ? void 0 : options.children) === null || _a === void 0 ? void 0 : _a[0];
            // narrow type of label
            if (typeof label !== 'string') {
                label = undefined;
            }
            ReactDOM.render(React.createElement(this._icon.react, Object.assign({ container: container, label: label }, Object.assign(Object.assign({}, (_b = this._rendererOptions) === null || _b === void 0 ? void 0 : _b.props), options === null || options === void 0 ? void 0 : options.props))), container);
        }
        unrender(container) {
            ReactDOM.unmountComponentAtNode(container);
        }
    }
    Private.ReactRenderer = ReactRenderer;
})(Private || (Private = {}));
// need to be at the bottom since constructor depends on Private
export const badIcon = new LabIcon({
    name: 'ui-components:bad',
    svgstr: badSvgstr
});
export const blankIcon = new LabIcon({
    name: 'ui-components:blank',
    svgstr: blankSvgstr
});
//# sourceMappingURL=labicon.js.map