
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function get_binding_group_value(group, __value, checked) {
        const value = new Set();
        for (let i = 0; i < group.length; i += 1) {
            if (group[i].checked)
                value.add(group[i].__value);
        }
        if (!checked) {
            value.delete(__value);
        }
        return Array.from(value);
    }
    function init_binding_group(group) {
        let _inputs;
        return {
            /* push */ p(...inputs) {
                _inputs = inputs;
                _inputs.forEach(input => group.push(input));
            },
            /* remove */ r() {
                _inputs.forEach(input => group.splice(group.indexOf(input), 1));
            }
        };
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value, mounting) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        if (!mounting || value !== undefined) {
            select.selectedIndex = -1; // no option should be selected
        }
    }
    function select_options(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            option.selected = ~value.indexOf(option.__value);
        }
    }
    function select_multiple_value(select) {
        return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                /** #7364  target for <template> may be provided as #document-fragment(11) */
                else
                    this.e = element((target.nodeType === 11 ? 'TEMPLATE' : target.nodeName));
                this.t = target.tagName !== 'TEMPLATE' ? target : target.content;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        const updates = [];
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                // defer updates until all the DOM shuffling is done
                updates.push(() => block.p(child_ctx, dirty));
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        run_all(updates);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\Nested.svelte generated by Svelte v3.59.2 */

    const file$4 = "src\\Nested.svelte";

    function create_fragment$5(ctx) {
    	let p0;
    	let t0;
    	let t1;
    	let t2;
    	let p1;
    	let t3;
    	let t4;
    	let t5;
    	let t6;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text("The answer is ");
    			t1 = text(/*answer*/ ctx[2]);
    			t2 = space();
    			p1 = element("p");
    			t3 = text("Position is at x:");
    			t4 = text(/*x*/ ctx[0]);
    			t5 = text(" y:");
    			t6 = text(/*y*/ ctx[1]);
    			add_location(p0, file$4, 9, 0, 137);
    			add_location(p1, file$4, 11, 0, 170);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t3);
    			append_dev(p1, t4);
    			append_dev(p1, t5);
    			append_dev(p1, t6);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*answer*/ 4) set_data_dev(t1, /*answer*/ ctx[2]);
    			if (dirty & /*x*/ 1) set_data_dev(t4, /*x*/ ctx[0]);
    			if (dirty & /*y*/ 2) set_data_dev(t6, /*y*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nested', slots, []);
    	let { x = 5 } = $$props;
    	let { y = 10 } = $$props;
    	let { answer = 'a mystery' } = $$props;
    	const writable_props = ['x', 'y', 'answer'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nested> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('x' in $$props) $$invalidate(0, x = $$props.x);
    		if ('y' in $$props) $$invalidate(1, y = $$props.y);
    		if ('answer' in $$props) $$invalidate(2, answer = $$props.answer);
    	};

    	$$self.$capture_state = () => ({ x, y, answer });

    	$$self.$inject_state = $$props => {
    		if ('x' in $$props) $$invalidate(0, x = $$props.x);
    		if ('y' in $$props) $$invalidate(1, y = $$props.y);
    		if ('answer' in $$props) $$invalidate(2, answer = $$props.answer);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [x, y, answer];
    }

    class Nested extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { x: 0, y: 1, answer: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nested",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get x() {
    		throw new Error("<Nested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set x(value) {
    		throw new Error("<Nested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get y() {
    		throw new Error("<Nested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set y(value) {
    		throw new Error("<Nested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get answer() {
    		throw new Error("<Nested>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set answer(value) {
    		throw new Error("<Nested>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\PackageInfo.svelte generated by Svelte v3.59.2 */

    const file$3 = "src\\PackageInfo.svelte";

    function create_fragment$4(ctx) {
    	let p;
    	let t0;
    	let code;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let a0;
    	let t7;
    	let t8;
    	let a1;
    	let t9;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("The ");
    			code = element("code");
    			t1 = text(/*name*/ ctx[0]);
    			t2 = text(" package is ");
    			t3 = text(/*speed*/ ctx[2]);
    			t4 = text(" fast. Download version ");
    			t5 = text(/*version*/ ctx[1]);
    			t6 = text(" from\r\n\t");
    			a0 = element("a");
    			t7 = text("npm");
    			t8 = text(" and ");
    			a1 = element("a");
    			t9 = text("learn more here");
    			add_location(code, file$3, 10, 5, 171);
    			attr_dev(a0, "href", /*href*/ ctx[4]);
    			add_location(a0, file$3, 11, 1, 250);
    			attr_dev(a1, "href", /*website*/ ctx[3]);
    			add_location(a1, file$3, 11, 23, 272);
    			add_location(p, file$3, 9, 0, 161);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, code);
    			append_dev(code, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(p, t5);
    			append_dev(p, t6);
    			append_dev(p, a0);
    			append_dev(a0, t7);
    			append_dev(p, t8);
    			append_dev(p, a1);
    			append_dev(a1, t9);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) set_data_dev(t1, /*name*/ ctx[0]);
    			if (dirty & /*speed*/ 4) set_data_dev(t3, /*speed*/ ctx[2]);
    			if (dirty & /*version*/ 2) set_data_dev(t5, /*version*/ ctx[1]);

    			if (dirty & /*href*/ 16) {
    				attr_dev(a0, "href", /*href*/ ctx[4]);
    			}

    			if (dirty & /*website*/ 8) {
    				attr_dev(a1, "href", /*website*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let href;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PackageInfo', slots, []);
    	let { name } = $$props;
    	let { version } = $$props;
    	let { speed } = $$props;
    	let { website } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
    			console.warn("<PackageInfo> was created without expected prop 'name'");
    		}

    		if (version === undefined && !('version' in $$props || $$self.$$.bound[$$self.$$.props['version']])) {
    			console.warn("<PackageInfo> was created without expected prop 'version'");
    		}

    		if (speed === undefined && !('speed' in $$props || $$self.$$.bound[$$self.$$.props['speed']])) {
    			console.warn("<PackageInfo> was created without expected prop 'speed'");
    		}

    		if (website === undefined && !('website' in $$props || $$self.$$.bound[$$self.$$.props['website']])) {
    			console.warn("<PackageInfo> was created without expected prop 'website'");
    		}
    	});

    	const writable_props = ['name', 'version', 'speed', 'website'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PackageInfo> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('version' in $$props) $$invalidate(1, version = $$props.version);
    		if ('speed' in $$props) $$invalidate(2, speed = $$props.speed);
    		if ('website' in $$props) $$invalidate(3, website = $$props.website);
    	};

    	$$self.$capture_state = () => ({ name, version, speed, website, href });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('version' in $$props) $$invalidate(1, version = $$props.version);
    		if ('speed' in $$props) $$invalidate(2, speed = $$props.speed);
    		if ('website' in $$props) $$invalidate(3, website = $$props.website);
    		if ('href' in $$props) $$invalidate(4, href = $$props.href);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*name*/ 1) {
    			$$invalidate(4, href = `https://www.npmjs.com/package/${name}`);
    		}
    	};

    	return [name, version, speed, website, href];
    }

    class PackageInfo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			name: 0,
    			version: 1,
    			speed: 2,
    			website: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PackageInfo",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get name() {
    		throw new Error("<PackageInfo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<PackageInfo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get version() {
    		throw new Error("<PackageInfo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set version(value) {
    		throw new Error("<PackageInfo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get speed() {
    		throw new Error("<PackageInfo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set speed(value) {
    		throw new Error("<PackageInfo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get website() {
    		throw new Error("<PackageInfo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set website(value) {
    		throw new Error("<PackageInfo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Thing.svelte generated by Svelte v3.59.2 */

    const file$2 = "src\\Thing.svelte";

    function create_fragment$3(ctx) {
    	let p;
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(/*emoji*/ ctx[1]);
    			t1 = text(" = ");
    			t2 = text(/*name*/ ctx[0]);
    			add_location(p, file$2, 17, 0, 366);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1) set_data_dev(t2, /*name*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Thing', slots, []);

    	const emojis = {
    		apple: '🍎',
    		banana: '🍌',
    		carrot: '🥕',
    		doughnut: '🍩',
    		egg: '🥚'
    	};

    	let { name } = $$props;

    	// ...but the "emoji" variable is fixed upon initialisation
    	// of the component because it uses `const` instead of `$:`
    	const emoji = emojis[name];

    	$$self.$$.on_mount.push(function () {
    		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
    			console.warn("<Thing> was created without expected prop 'name'");
    		}
    	});

    	const writable_props = ['name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Thing> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({ emojis, name, emoji });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, emoji];
    }

    class Thing extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Thing",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get name() {
    		throw new Error("<Thing>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Thing>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Inner.svelte generated by Svelte v3.59.2 */
    const file$1 = "src\\Inner.svelte";

    function create_fragment$2(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Click to say hello";
    			add_location(button, file$1, 12, 0, 201);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*sayHello*/ ctx[0], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Inner', slots, []);
    	const dispatch = createEventDispatcher();

    	function sayHello() {
    		dispatch('message', { text: 'Hello!' });
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Inner> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		sayHello
    	});

    	return [sayHello];
    }

    class Inner extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Inner",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Outer.svelte generated by Svelte v3.59.2 */

    function create_fragment$1(ctx) {
    	let inner;
    	let current;
    	inner = new Inner({ $$inline: true });
    	inner.$on("message", /*message_handler*/ ctx[0]);

    	const block = {
    		c: function create() {
    			create_component(inner.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(inner, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inner.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inner.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inner, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Outer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Outer> was created with unknown prop '${key}'`);
    	});

    	function message_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$capture_state = () => ({ Inner });
    	return [message_handler];
    }

    class Outer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Outer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier} [start]
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let started = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (started) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            started = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
                // We need to set this to false because callbacks can still happen despite having unsubscribed:
                // Callbacks might already be placed in the queue which doesn't know it should no longer
                // invoke this derived store.
                started = false;
            };
        });
    }

    const time = readable(new Date(), function start(set) {
    	const interval = setInterval(() => {
    		set(new Date());
    	}, 1000);

    	return function stop() {
    		clearInterval(interval);
    	};
    });

    const start = new Date();

    const elapsed = derived(
    	time,
    	($time) => Math.round(($time - start) / 1000)
    );

    /* src\App.svelte generated by Svelte v3.59.2 */

    const { console: console_1 } = globals;

    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[56] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[59] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[56] = list[i];
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[59] = list[i];
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[66] = list[i];
    	return child_ctx;
    }

    function get_each_context_5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[19] = list[i];
    	return child_ctx;
    }

    function get_each_context_6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[71] = list[i];
    	return child_ctx;
    }

    function get_each_context_7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[74] = list[i];
    	child_ctx[76] = i;
    	return child_ctx;
    }

    // (248:0) {#if count > 10}
    function create_if_block_9(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(/*count*/ ctx[2]);
    			t1 = text(" is greater than 10");
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 248, 1, 4600);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*count*/ 4) set_data_dev(t0, /*count*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(248:0) {#if count > 10}",
    		ctx
    	});

    	return block;
    }

    // (254:0) {:else}
    function create_else_block_5(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(/*count*/ ctx[2]);
    			t1 = text(" is between 0 and 10");
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 254, 1, 4702);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*count*/ 4) set_data_dev(t0, /*count*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_5.name,
    		type: "else",
    		source: "(254:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (252:0) {#if count > 10}
    function create_if_block_8(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(/*count*/ ctx[2]);
    			t1 = text(" is greater than 10");
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 252, 1, 4659);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*count*/ 4) set_data_dev(t0, /*count*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(252:0) {#if count > 10}",
    		ctx
    	});

    	return block;
    }

    // (263:0) {:else}
    function create_else_block_4(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(/*count*/ ctx[2]);
    			t1 = text(" is between 5 and 10");
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 263, 1, 4858);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*count*/ 4) set_data_dev(t0, /*count*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_4.name,
    		type: "else",
    		source: "(263:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (261:20) 
    function create_if_block_7(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(/*count*/ ctx[2]);
    			t1 = text(" is less than 5");
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 261, 1, 4819);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*count*/ 4) set_data_dev(t0, /*count*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(261:20) ",
    		ctx
    	});

    	return block;
    }

    // (259:0) {#if count > 10}
    function create_if_block_6(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(/*count*/ ctx[2]);
    			t1 = text(" is greater than 10");
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 259, 1, 4763);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*count*/ 4) set_data_dev(t0, /*count*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(259:0) {#if count > 10}",
    		ctx
    	});

    	return block;
    }

    // (274:0) {:else}
    function create_else_block_3(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Welcome back user";
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 274, 1, 5040);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_3.name,
    		type: "else",
    		source: "(274:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (272:0) {#if !user}
    function create_if_block_5(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Sign in";
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 272, 1, 5016);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(272:0) {#if !user}",
    		ctx
    	});

    	return block;
    }

    // (304:1) {#each colors as color, i}
    function create_each_block_7(ctx) {
    	let button_1;
    	let t_value = /*i*/ ctx[76] + 1 + "";
    	let t;
    	let button_1_aria_current_value;
    	let mounted;
    	let dispose;

    	function click_handler_2() {
    		return /*click_handler_2*/ ctx[37](/*color*/ ctx[74]);
    	}

    	const block = {
    		c: function create() {
    			button_1 = element("button");
    			t = text(t_value);
    			attr_dev(button_1, "class", "colors svelte-15nhzpn");
    			attr_dev(button_1, "aria-current", button_1_aria_current_value = /*selected*/ ctx[3] === /*color*/ ctx[74]);
    			attr_dev(button_1, "aria-label", /*color*/ ctx[74]);
    			set_style(button_1, "background", /*color*/ ctx[74]);
    			add_location(button_1, file, 304, 2, 5565);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button_1, anchor);
    			append_dev(button_1, t);

    			if (!mounted) {
    				dispose = listen_dev(button_1, "click", click_handler_2, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*selected, questions*/ 1073741832 && button_1_aria_current_value !== (button_1_aria_current_value = /*selected*/ ctx[3] === /*color*/ ctx[74])) {
    				attr_dev(button_1, "aria-current", button_1_aria_current_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button_1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_7.name,
    		type: "each",
    		source: "(304:1) {#each colors as color, i}",
    		ctx
    	});

    	return block;
    }

    // (320:0) {#each things as thing (thing.id)}
    function create_each_block_6(key_1, ctx) {
    	let first;
    	let thing;
    	let current;

    	thing = new Thing({
    			props: { name: /*thing*/ ctx[71].name },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(thing.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(thing, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const thing_changes = {};
    			if (dirty[0] & /*things*/ 16) thing_changes.name = /*thing*/ ctx[71].name;
    			thing.$set(thing_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(thing.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(thing.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(thing, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_6.name,
    		type: "each",
    		source: "(320:0) {#each things as thing (thing.id)}",
    		ctx
    	});

    	return block;
    }

    // (329:0) {#each users as user (user.id)}
    function create_each_block_5(key_1, ctx) {
    	let div;
    	let h3;
    	let t_value = /*user*/ ctx[19].name + "";
    	let t;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			t = text(t_value);
    			attr_dev(h3, "class", "svelte-15nhzpn");
    			add_location(h3, file, 329, 6, 6108);
    			attr_dev(div, "class", "svelte-15nhzpn");
    			add_location(div, file, 329, 1, 6103);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(h3, t);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*users*/ 32 && t_value !== (t_value = /*user*/ ctx[19].name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_5.name,
    		type: "each",
    		source: "(329:0) {#each users as user (user.id)}",
    		ctx
    	});

    	return block;
    }

    // (397:0) {:else}
    function create_else_block_2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "You must opt in to continue. If you're not\n\t\tpaying, you're the product.";
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 397, 1, 7374);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(397:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (392:0) {#if yes}
    function create_if_block_4(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Thank you. We will bombard your inbox and sell\n\t\tyour personal details.";
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 392, 1, 7281);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(392:0) {#if yes}",
    		ctx
    	});

    	return block;
    }

    // (415:2) {#each questions as question}
    function create_each_block_4(ctx) {
    	let option;
    	let t0_value = /*question*/ ctx[66].text + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t0 = text(t0_value);
    			t1 = space();
    			option.__value = /*question*/ ctx[66];
    			option.value = option.__value;
    			attr_dev(option, "class", "svelte-15nhzpn");
    			add_location(option, file, 415, 3, 7717);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t0);
    			append_dev(option, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(415:2) {#each questions as question}",
    		ctx
    	});

    	return block;
    }

    // (439:0) {#each [1, 2, 3] as number}
    function create_each_block_3(ctx) {
    	let label;
    	let input;
    	let t0;
    	let t1;
    	let t2;
    	let t3_value = (/*number*/ ctx[59] === 1 ? 'scoop' : 'scoops') + "";
    	let t3;
    	let binding_group;
    	let mounted;
    	let dispose;
    	binding_group = init_binding_group(/*$$binding_groups*/ ctx[49][0]);

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(/*number*/ ctx[59]);
    			t2 = space();
    			t3 = text(t3_value);
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "name", "scoops");
    			input.__value = /*number*/ ctx[59];
    			input.value = input.__value;
    			attr_dev(input, "class", "svelte-15nhzpn");
    			add_location(input, file, 440, 2, 8059);
    			attr_dev(label, "class", "svelte-15nhzpn");
    			add_location(label, file, 439, 1, 8049);
    			binding_group.p(input);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = input.__value === /*scoops*/ ctx[12];
    			append_dev(label, t0);
    			append_dev(label, t1);
    			append_dev(label, t2);
    			append_dev(label, t3);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[48]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*scoops*/ 4096) {
    				input.checked = input.__value === /*scoops*/ ctx[12];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			binding_group.r();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(439:0) {#each [1, 2, 3] as number}",
    		ctx
    	});

    	return block;
    }

    // (454:0) {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
    function create_each_block_2(ctx) {
    	let label;
    	let input;
    	let t0;
    	let t1;
    	let binding_group;
    	let mounted;
    	let dispose;
    	binding_group = init_binding_group(/*$$binding_groups*/ ctx[49][1]);

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(/*flavour*/ ctx[56]);
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "name", "flavours");
    			input.__value = /*flavour*/ ctx[56];
    			input.value = input.__value;
    			attr_dev(input, "class", "svelte-15nhzpn");
    			add_location(input, file, 455, 2, 8321);
    			attr_dev(label, "class", "svelte-15nhzpn");
    			add_location(label, file, 454, 1, 8311);
    			binding_group.p(input);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = ~(/*flavours*/ ctx[13] || []).indexOf(input.__value);
    			append_dev(label, t0);
    			append_dev(label, t1);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler_1*/ ctx[50]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*flavours*/ 8192) {
    				input.checked = ~(/*flavours*/ ctx[13] || []).indexOf(input.__value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			binding_group.r();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(454:0) {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}",
    		ctx
    	});

    	return block;
    }

    // (471:0) {:else}
    function create_else_block_1(ctx) {
    	let p;
    	let t0;
    	let t1;
    	let t2;
    	let t3_value = (/*scoops*/ ctx[12] === 1 ? 'scoop' : 'scoops') + "";
    	let t3;
    	let t4;
    	let t5_value = /*formatter*/ ctx[32].format(/*flavours*/ ctx[13]) + "";
    	let t5;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("You ordered ");
    			t1 = text(/*scoops*/ ctx[12]);
    			t2 = space();
    			t3 = text(t3_value);
    			t4 = text("\n\t\tof ");
    			t5 = text(t5_value);
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 471, 1, 8610);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(p, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*scoops*/ 4096) set_data_dev(t1, /*scoops*/ ctx[12]);
    			if (dirty[0] & /*scoops*/ 4096 && t3_value !== (t3_value = (/*scoops*/ ctx[12] === 1 ? 'scoop' : 'scoops') + "")) set_data_dev(t3, t3_value);
    			if (dirty[0] & /*flavours*/ 8192 && t5_value !== (t5_value = /*formatter*/ ctx[32].format(/*flavours*/ ctx[13]) + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(471:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (469:35) 
    function create_if_block_3(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Can't order more flavours than scoops!";
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 469, 1, 8555);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(469:35) ",
    		ctx
    	});

    	return block;
    }

    // (467:0) {#if flavours.length === 0}
    function create_if_block_2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Please select at least one flavour";
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 467, 1, 8476);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(467:0) {#if flavours.length === 0}",
    		ctx
    	});

    	return block;
    }

    // (482:0) {#each [1, 2, 3] as number}
    function create_each_block_1(ctx) {
    	let label;
    	let input;
    	let t0;
    	let t1;
    	let t2;
    	let t3_value = (/*number*/ ctx[59] === 1 ? 'scoop' : 'scoops') + "";
    	let t3;
    	let binding_group;
    	let mounted;
    	let dispose;
    	binding_group = init_binding_group(/*$$binding_groups*/ ctx[49][0]);

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(/*number*/ ctx[59]);
    			t2 = space();
    			t3 = text(t3_value);
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "name", "scoops");
    			input.__value = /*number*/ ctx[59];
    			input.value = input.__value;
    			attr_dev(input, "class", "svelte-15nhzpn");
    			add_location(input, file, 483, 2, 8812);
    			attr_dev(label, "class", "svelte-15nhzpn");
    			add_location(label, file, 482, 1, 8802);
    			binding_group.p(input);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = input.__value === /*scoops*/ ctx[12];
    			append_dev(label, t0);
    			append_dev(label, t1);
    			append_dev(label, t2);
    			append_dev(label, t3);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler_2*/ ctx[51]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*scoops*/ 4096) {
    				input.checked = input.__value === /*scoops*/ ctx[12];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			binding_group.r();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(482:0) {#each [1, 2, 3] as number}",
    		ctx
    	});

    	return block;
    }

    // (498:1) {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
    function create_each_block(ctx) {
    	let option;
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(/*flavour*/ ctx[56]);
    			option.__value = /*flavour*/ ctx[56];
    			option.value = option.__value;
    			attr_dev(option, "class", "svelte-15nhzpn");
    			add_location(option, file, 498, 2, 9106);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(498:1) {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}",
    		ctx
    	});

    	return block;
    }

    // (507:0) {:else}
    function create_else_block(ctx) {
    	let p;
    	let t0;
    	let t1;
    	let t2;
    	let t3_value = (/*scoops*/ ctx[12] === 1 ? 'scoop' : 'scoops') + "";
    	let t3;
    	let t4;
    	let t5_value = /*formatter*/ ctx[32].format(/*flavours*/ ctx[13]) + "";
    	let t5;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("You ordered ");
    			t1 = text(/*scoops*/ ctx[12]);
    			t2 = space();
    			t3 = text(t3_value);
    			t4 = text("\n\t\tof ");
    			t5 = text(t5_value);
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 507, 1, 9316);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(p, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*scoops*/ 4096) set_data_dev(t1, /*scoops*/ ctx[12]);
    			if (dirty[0] & /*scoops*/ 4096 && t3_value !== (t3_value = (/*scoops*/ ctx[12] === 1 ? 'scoop' : 'scoops') + "")) set_data_dev(t3, t3_value);
    			if (dirty[0] & /*flavours*/ 8192 && t5_value !== (t5_value = /*formatter*/ ctx[32].format(/*flavours*/ ctx[13]) + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(507:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (505:35) 
    function create_if_block_1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Can't order more flavours than scoops!";
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 505, 1, 9261);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(505:35) ",
    		ctx
    	});

    	return block;
    }

    // (503:0) {#if flavours.length === 0}
    function create_if_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Please select at least one flavour";
    			attr_dev(p, "class", "svelte-15nhzpn");
    			add_location(p, file, 503, 1, 9182);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(503:0) {#if flavours.length === 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div1;
    	let div0;
    	let a0;
    	let t1;
    	let a1;
    	let t3;
    	let div8;
    	let h3;
    	let t5;
    	let hr0;
    	let t6;
    	let h40;
    	let t8;
    	let p0;
    	let t9;
    	let t10_value = /*formatter2*/ ctx[34].format(/*$time*/ ctx[17]) + "";
    	let t10;
    	let p1;
    	let p2;
    	let t11;
    	let t12;
    	let t13;
    	let t14_value = (/*$elapsed*/ ctx[18] === 1 ? 'second' : 'seconds') + "";
    	let t14;
    	let t15;
    	let hr1;
    	let t16;
    	let h41;
    	let t18;
    	let p3;
    	let t19;
    	let html_tag;
    	let t20;
    	let hr2;
    	let t21;
    	let h42;
    	let t23;
    	let button0;
    	let t24;
    	let t25;
    	let t26;
    	let t27_value = (/*count*/ ctx[2] === 1 ? 'time' : 'times') + "";
    	let t27;
    	let t28;
    	let t29;
    	let t30;
    	let t31;
    	let hr3;
    	let t32;
    	let h43;
    	let t34;
    	let button1;
    	let t36;
    	let t37;
    	let hr4;
    	let t38;
    	let h44;
    	let t40;
    	let button2;
    	let t42;
    	let button3;
    	let t44;
    	let p4;
    	let t45;
    	let t46;
    	let p5;
    	let t47;
    	let t48;
    	let t49;
    	let t50;
    	let hr5;
    	let t51;
    	let h45;
    	let t53;
    	let nested0;
    	let t54;
    	let nested1;
    	let t55;
    	let packageinfo;
    	let t56;
    	let hr6;
    	let t57;
    	let h46;
    	let t59;
    	let button4;
    	let t61;
    	let p6;
    	let t62_value = /*numbers*/ ctx[1].join(' + ') + "";
    	let t62;
    	let t63;
    	let t64;
    	let t65;
    	let hr7;
    	let t66;
    	let h47;
    	let t68;
    	let div2;
    	let t69;
    	let hr8;
    	let t70;
    	let h48;
    	let t72;
    	let button5;
    	let t74;
    	let each_blocks_6 = [];
    	let each1_lookup = new Map();
    	let t75;
    	let hr9;
    	let t76;
    	let h49;
    	let t78;
    	let button6;
    	let t80;
    	let each_blocks_5 = [];
    	let each2_lookup = new Map();
    	let t81;
    	let hr10;
    	let t82;
    	let h410;
    	let t84;
    	let div5;
    	let div3;
    	let t85;
    	let t86_value = /*m*/ ctx[6].x + "";
    	let t86;
    	let t87;
    	let t88_value = /*m*/ ctx[6].y + "";
    	let t88;
    	let t89;
    	let div4;
    	let t90;
    	let t91_value = /*m*/ ctx[6].x + "";
    	let t91;
    	let t92;
    	let t93_value = /*m*/ ctx[6].y + "";
    	let t93;
    	let t94;
    	let hr11;
    	let t95;
    	let h411;
    	let t97;
    	let button7;
    	let t99;
    	let inner;
    	let t100;
    	let outer;
    	let t101;
    	let hr12;
    	let t102;
    	let h412;
    	let t104;
    	let div6;
    	let p7;
    	let input0;
    	let t105;
    	let p8;
    	let t106;
    	let t107;
    	let t108;
    	let t109;
    	let hr13;
    	let t110;
    	let h413;
    	let t112;
    	let div7;
    	let label0;
    	let input1;
    	let t113;
    	let input2;
    	let t114;
    	let label1;
    	let input3;
    	let t115;
    	let input4;
    	let t116;
    	let p9;
    	let t117;
    	let t118;
    	let t119;
    	let t120;
    	let t121_value = /*a*/ ctx[8] + /*b*/ ctx[9] + "";
    	let t121;
    	let t122;
    	let hr14;
    	let t123;
    	let h414;
    	let t125;
    	let label2;
    	let input5;
    	let t126;
    	let t127;
    	let t128;
    	let button8;
    	let t129;
    	let button8_disabled_value;
    	let t130;
    	let hr15;
    	let t131;
    	let h415;
    	let t133;
    	let h2;
    	let t135;
    	let form;
    	let select0;
    	let t136;
    	let input6;
    	let t137;
    	let button9;
    	let t138;
    	let button9_disabled_value;
    	let t139;
    	let p10;
    	let t140;

    	let t141_value = (/*selected*/ ctx[3]
    	? /*selected*/ ctx[3].id
    	: '[waiting...]') + "";

    	let t141;
    	let t142;
    	let hr16;
    	let t143;
    	let h416;
    	let t145;
    	let h417;
    	let t147;
    	let t148;
    	let h418;
    	let t150;
    	let t151;
    	let t152;
    	let hr17;
    	let t153;
    	let h419;
    	let t155;
    	let h420;
    	let t157;
    	let t158;
    	let h421;
    	let t160;
    	let select1;
    	let t161;
    	let t162;
    	let hr18;
    	let t163;
    	let h422;
    	let t165;
    	let textarea;
    	let t166;
    	let hr19;
    	let t167;
    	let h423;
    	let t169;
    	let p11;
    	let img;
    	let img_src_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*count*/ ctx[2] > 10 && create_if_block_9(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*count*/ ctx[2] > 10) return create_if_block_8;
    		return create_else_block_5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block1 = current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (/*count*/ ctx[2] > 10) return create_if_block_6;
    		if (/*count*/ ctx[2] < 5) return create_if_block_7;
    		return create_else_block_4;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block2 = current_block_type_1(ctx);

    	function select_block_type_2(ctx, dirty) {
    		if (!/*user*/ ctx[19]) return create_if_block_5;
    		return create_else_block_3;
    	}

    	let current_block_type_2 = select_block_type_2(ctx);
    	let if_block3 = current_block_type_2(ctx);

    	nested0 = new Nested({
    			props: { answer: 42, x: 0, y: 0 },
    			$$inline: true
    		});

    	nested1 = new Nested({ $$inline: true });
    	const packageinfo_spread_levels = [/*pkg*/ ctx[25]];
    	let packageinfo_props = {};

    	for (let i = 0; i < packageinfo_spread_levels.length; i += 1) {
    		packageinfo_props = assign(packageinfo_props, packageinfo_spread_levels[i]);
    	}

    	packageinfo = new PackageInfo({ props: packageinfo_props, $$inline: true });
    	let each_value_7 = /*colors*/ ctx[26];
    	validate_each_argument(each_value_7);
    	let each_blocks_7 = [];

    	for (let i = 0; i < each_value_7.length; i += 1) {
    		each_blocks_7[i] = create_each_block_7(get_each_context_7(ctx, each_value_7, i));
    	}

    	let each_value_6 = /*things*/ ctx[4];
    	validate_each_argument(each_value_6);
    	const get_key = ctx => /*thing*/ ctx[71].id;
    	validate_each_keys(ctx, each_value_6, get_each_context_6, get_key);

    	for (let i = 0; i < each_value_6.length; i += 1) {
    		let child_ctx = get_each_context_6(ctx, each_value_6, i);
    		let key = get_key(child_ctx);
    		each1_lookup.set(key, each_blocks_6[i] = create_each_block_6(key, child_ctx));
    	}

    	let each_value_5 = /*users*/ ctx[5];
    	validate_each_argument(each_value_5);
    	const get_key_1 = ctx => /*user*/ ctx[19].id;
    	validate_each_keys(ctx, each_value_5, get_each_context_5, get_key_1);

    	for (let i = 0; i < each_value_5.length; i += 1) {
    		let child_ctx = get_each_context_5(ctx, each_value_5, i);
    		let key = get_key_1(child_ctx);
    		each2_lookup.set(key, each_blocks_5[i] = create_each_block_5(key, child_ctx));
    	}

    	inner = new Inner({ $$inline: true });
    	inner.$on("message", handleMessage);
    	outer = new Outer({ $$inline: true });
    	outer.$on("message", handleMessageOuter);

    	function select_block_type_3(ctx, dirty) {
    		if (/*yes*/ ctx[10]) return create_if_block_4;
    		return create_else_block_2;
    	}

    	let current_block_type_3 = select_block_type_3(ctx);
    	let if_block4 = current_block_type_3(ctx);
    	let each_value_4 = /*questions*/ ctx[30];
    	validate_each_argument(each_value_4);
    	let each_blocks_4 = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks_4[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	let each_value_3 = [1, 2, 3];
    	validate_each_argument(each_value_3);
    	let each_blocks_3 = [];

    	for (let i = 0; i < 3; i += 1) {
    		each_blocks_3[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	let each_value_2 = ['cookies and cream', 'mint choc chip', 'raspberry ripple'];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < 3; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	function select_block_type_4(ctx, dirty) {
    		if (/*flavours*/ ctx[13].length === 0) return create_if_block_2;
    		if (/*flavours*/ ctx[13].length > /*scoops*/ ctx[12]) return create_if_block_3;
    		return create_else_block_1;
    	}

    	let current_block_type_4 = select_block_type_4(ctx);
    	let if_block5 = current_block_type_4(ctx);
    	let each_value_1 = [1, 2, 3];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < 3; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = ['cookies and cream', 'mint choc chip', 'raspberry ripple'];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < 3; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	function select_block_type_5(ctx, dirty) {
    		if (/*flavours*/ ctx[13].length === 0) return create_if_block;
    		if (/*flavours*/ ctx[13].length > /*scoops*/ ctx[12]) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type_5 = select_block_type_5(ctx);
    	let if_block6 = current_block_type_5(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "Totaro Home";
    			t1 = text(" | ");
    			a1 = element("a");
    			a1.textContent = "The Lab";
    			t3 = space();
    			div8 = element("div");
    			h3 = element("h3");
    			h3.textContent = "This is the place where I test basics of Svelte framework";
    			t5 = space();
    			hr0 = element("hr");
    			t6 = space();
    			h40 = element("h4");
    			h40.textContent = "Derived store";
    			t8 = space();
    			p0 = element("p");
    			t9 = text("The time is ");
    			t10 = text(t10_value);
    			p1 = element("p");
    			p2 = element("p");
    			t11 = text("This page has been open for\n\t");
    			t12 = text(/*$elapsed*/ ctx[18]);
    			t13 = space();
    			t14 = text(t14_value);
    			t15 = space();
    			hr1 = element("hr");
    			t16 = space();
    			h41 = element("h4");
    			h41.textContent = "HTML tags";
    			t18 = space();
    			p3 = element("p");
    			t19 = text("This is a paragraph. ");
    			html_tag = new HtmlTag(false);
    			t20 = space();
    			hr2 = element("hr");
    			t21 = space();
    			h42 = element("h4");
    			h42.textContent = "On:click counter plus if-else";
    			t23 = space();
    			button0 = element("button");
    			t24 = text("Clicked ");
    			t25 = text(/*count*/ ctx[2]);
    			t26 = space();
    			t27 = text(t27_value);
    			t28 = space();
    			if (if_block0) if_block0.c();
    			t29 = space();
    			if_block1.c();
    			t30 = space();
    			if_block2.c();
    			t31 = space();
    			hr3 = element("hr");
    			t32 = space();
    			h43 = element("h4");
    			h43.textContent = "On:click Sign in user if-else";
    			t34 = space();
    			button1 = element("button");
    			button1.textContent = "Sign in";
    			t36 = space();
    			if_block3.c();
    			t37 = space();
    			hr4 = element("hr");
    			t38 = space();
    			h44 = element("h4");
    			h44.textContent = "Increment/Decrement";
    			t40 = space();
    			button2 = element("button");
    			button2.textContent = "Increment";
    			t42 = space();
    			button3 = element("button");
    			button3.textContent = "Decrement";
    			t44 = space();
    			p4 = element("p");
    			t45 = text(/*counter*/ ctx[0]);
    			t46 = space();
    			p5 = element("p");
    			t47 = text(/*counter*/ ctx[0]);
    			t48 = text(" doubled is ");
    			t49 = text(/*doubled*/ ctx[16]);
    			t50 = space();
    			hr5 = element("hr");
    			t51 = space();
    			h45 = element("h4");
    			h45.textContent = "Nested components and Props";
    			t53 = space();
    			create_component(nested0.$$.fragment);
    			t54 = space();
    			create_component(nested1.$$.fragment);
    			t55 = space();
    			create_component(packageinfo.$$.fragment);
    			t56 = space();
    			hr6 = element("hr");
    			t57 = space();
    			h46 = element("h4");
    			h46.textContent = "Updating Array";
    			t59 = space();
    			button4 = element("button");
    			button4.textContent = "Add a number";
    			t61 = space();
    			p6 = element("p");
    			t62 = text(t62_value);
    			t63 = text(" = ");
    			t64 = text(/*sum*/ ctx[15]);
    			t65 = space();
    			hr7 = element("hr");
    			t66 = space();
    			h47 = element("h4");
    			h47.textContent = "Each logic";
    			t68 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks_7.length; i += 1) {
    				each_blocks_7[i].c();
    			}

    			t69 = space();
    			hr8 = element("hr");
    			t70 = space();
    			h48 = element("h4");
    			h48.textContent = "Array slice method with each logic (imported component)";
    			t72 = space();
    			button5 = element("button");
    			button5.textContent = "Remove first thing";
    			t74 = space();

    			for (let i = 0; i < each_blocks_6.length; i += 1) {
    				each_blocks_6[i].c();
    			}

    			t75 = space();
    			hr9 = element("hr");
    			t76 = space();
    			h49 = element("h4");
    			h49.textContent = "Array slice method with each logic";
    			t78 = space();
    			button6 = element("button");
    			button6.textContent = "Remove first name";
    			t80 = space();

    			for (let i = 0; i < each_blocks_5.length; i += 1) {
    				each_blocks_5[i].c();
    			}

    			t81 = space();
    			hr10 = element("hr");
    			t82 = space();
    			h410 = element("h4");
    			h410.textContent = "Mouse event";
    			t84 = space();
    			div5 = element("div");
    			div3 = element("div");
    			t85 = text("The pointer is at ");
    			t86 = text(t86_value);
    			t87 = text(" x ");
    			t88 = text(t88_value);
    			t89 = space();
    			div4 = element("div");
    			t90 = text("The pointer inline is at ");
    			t91 = text(t91_value);
    			t92 = text(" x ");
    			t93 = text(t93_value);
    			t94 = space();
    			hr11 = element("hr");
    			t95 = space();
    			h411 = element("h4");
    			h411.textContent = "Event modifiers, Component events, event forwarding";
    			t97 = space();
    			button7 = element("button");
    			button7.textContent = "Click me";
    			t99 = space();
    			create_component(inner.$$.fragment);
    			t100 = space();
    			create_component(outer.$$.fragment);
    			t101 = space();
    			hr12 = element("hr");
    			t102 = space();
    			h412 = element("h4");
    			h412.textContent = "Text input binding";
    			t104 = space();
    			div6 = element("div");
    			p7 = element("p");
    			input0 = element("input");
    			t105 = space();
    			p8 = element("p");
    			t106 = text("Hello ");
    			t107 = text(/*word*/ ctx[7]);
    			t108 = text("!");
    			t109 = space();
    			hr13 = element("hr");
    			t110 = space();
    			h413 = element("h4");
    			h413.textContent = "Numeric input binding";
    			t112 = space();
    			div7 = element("div");
    			label0 = element("label");
    			input1 = element("input");
    			t113 = space();
    			input2 = element("input");
    			t114 = space();
    			label1 = element("label");
    			input3 = element("input");
    			t115 = space();
    			input4 = element("input");
    			t116 = space();
    			p9 = element("p");
    			t117 = text(/*a*/ ctx[8]);
    			t118 = text(" + ");
    			t119 = text(/*b*/ ctx[9]);
    			t120 = text(" = ");
    			t121 = text(t121_value);
    			t122 = space();
    			hr14 = element("hr");
    			t123 = space();
    			h414 = element("h4");
    			h414.textContent = "Numeric input binding";
    			t125 = space();
    			label2 = element("label");
    			input5 = element("input");
    			t126 = text("\n\tYes! Send me regular email spam");
    			t127 = space();
    			if_block4.c();
    			t128 = space();
    			button8 = element("button");
    			t129 = text("Subscribe");
    			t130 = space();
    			hr15 = element("hr");
    			t131 = space();
    			h415 = element("h4");
    			h415.textContent = "Select binding";
    			t133 = space();
    			h2 = element("h2");
    			h2.textContent = "Insecurity questions";
    			t135 = space();
    			form = element("form");
    			select0 = element("select");

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				each_blocks_4[i].c();
    			}

    			t136 = space();
    			input6 = element("input");
    			t137 = space();
    			button9 = element("button");
    			t138 = text("Submit");
    			t139 = space();
    			p10 = element("p");
    			t140 = text("selected question ");
    			t141 = text(t141_value);
    			t142 = space();
    			hr16 = element("hr");
    			t143 = space();
    			h416 = element("h4");
    			h416.textContent = "Group binding";
    			t145 = space();
    			h417 = element("h4");
    			h417.textContent = "Size";
    			t147 = space();

    			for (let i = 0; i < 3; i += 1) {
    				each_blocks_3[i].c();
    			}

    			t148 = space();
    			h418 = element("h4");
    			h418.textContent = "Flavours";
    			t150 = space();

    			for (let i = 0; i < 3; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t151 = space();
    			if_block5.c();
    			t152 = space();
    			hr17 = element("hr");
    			t153 = space();
    			h419 = element("h4");
    			h419.textContent = "Select multiple binding";
    			t155 = space();
    			h420 = element("h4");
    			h420.textContent = "Size";
    			t157 = space();

    			for (let i = 0; i < 3; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t158 = space();
    			h421 = element("h4");
    			h421.textContent = "Flavours";
    			t160 = space();
    			select1 = element("select");

    			for (let i = 0; i < 3; i += 1) {
    				each_blocks[i].c();
    			}

    			t161 = space();
    			if_block6.c();
    			t162 = space();
    			hr18 = element("hr");
    			t163 = space();
    			h422 = element("h4");
    			h422.textContent = "Textarea input binding";
    			t165 = space();
    			textarea = element("textarea");
    			t166 = space();
    			hr19 = element("hr");
    			t167 = space();
    			h423 = element("h4");
    			h423.textContent = "Dynamic attributes (Img)";
    			t169 = space();
    			p11 = element("p");
    			img = element("img");
    			attr_dev(a0, "href", "https://totaro.github.io/");
    			attr_dev(a0, "class", "svelte-15nhzpn");
    			add_location(a0, file, 215, 27, 3993);
    			attr_dev(a1, "href", "https://totaro.github.io/lab/");
    			attr_dev(a1, "class", "svelte-15nhzpn");
    			add_location(a1, file, 215, 81, 4047);
    			attr_dev(div0, "class", "top-bar-links svelte-15nhzpn");
    			add_location(div0, file, 215, 0, 3966);
    			attr_dev(div1, "class", "app-top-bar svelte-15nhzpn");
    			add_location(div1, file, 214, 0, 3940);
    			attr_dev(h3, "class", "svelte-15nhzpn");
    			add_location(h3, file, 222, 0, 4138);
    			attr_dev(hr0, "class", "svelte-15nhzpn");
    			add_location(hr0, file, 223, 0, 4205);
    			attr_dev(h40, "class", "svelte-15nhzpn");
    			add_location(h40, file, 224, 0, 4210);
    			attr_dev(p0, "class", "svelte-15nhzpn");
    			add_location(p0, file, 225, 0, 4233);
    			attr_dev(p1, "class", "svelte-15nhzpn");
    			add_location(p1, file, 225, 41, 4274);
    			attr_dev(p2, "class", "svelte-15nhzpn");
    			add_location(p2, file, 227, 0, 4279);
    			attr_dev(hr1, "class", "svelte-15nhzpn");
    			add_location(hr1, file, 233, 0, 4371);
    			attr_dev(h41, "class", "svelte-15nhzpn");
    			add_location(h41, file, 236, 0, 4378);
    			html_tag.a = null;
    			attr_dev(p3, "class", "svelte-15nhzpn");
    			add_location(p3, file, 237, 0, 4397);
    			attr_dev(hr2, "class", "svelte-15nhzpn");
    			add_location(hr2, file, 238, 0, 4443);
    			attr_dev(h42, "class", "svelte-15nhzpn");
    			add_location(h42, file, 239, 0, 4448);
    			attr_dev(button0, "class", "svelte-15nhzpn");
    			add_location(button0, file, 242, 0, 4489);
    			attr_dev(hr3, "class", "svelte-15nhzpn");
    			add_location(hr3, file, 266, 0, 4900);
    			attr_dev(h43, "class", "svelte-15nhzpn");
    			add_location(h43, file, 268, 0, 4906);
    			attr_dev(button1, "class", "svelte-15nhzpn");
    			add_location(button1, file, 269, 0, 4945);
    			attr_dev(hr4, "class", "svelte-15nhzpn");
    			add_location(hr4, file, 277, 0, 5072);
    			attr_dev(h44, "class", "svelte-15nhzpn");
    			add_location(h44, file, 279, 0, 5078);
    			attr_dev(button2, "class", "svelte-15nhzpn");
    			add_location(button2, file, 280, 0, 5107);
    			attr_dev(button3, "class", "svelte-15nhzpn");
    			add_location(button3, file, 281, 0, 5164);
    			attr_dev(p4, "class", "svelte-15nhzpn");
    			add_location(p4, file, 282, 0, 5212);
    			attr_dev(p5, "class", "svelte-15nhzpn");
    			add_location(p5, file, 283, 0, 5229);
    			attr_dev(hr5, "class", "svelte-15nhzpn");
    			add_location(hr5, file, 285, 0, 5268);
    			attr_dev(h45, "class", "svelte-15nhzpn");
    			add_location(h45, file, 286, 0, 5273);
    			attr_dev(hr6, "class", "svelte-15nhzpn");
    			add_location(hr6, file, 291, 0, 5381);
    			attr_dev(h46, "class", "svelte-15nhzpn");
    			add_location(h46, file, 293, 0, 5387);
    			attr_dev(button4, "class", "svelte-15nhzpn");
    			add_location(button4, file, 295, 0, 5412);
    			attr_dev(p6, "class", "svelte-15nhzpn");
    			add_location(p6, file, 298, 0, 5466);
    			attr_dev(hr7, "class", "svelte-15nhzpn");
    			add_location(hr7, file, 300, 0, 5504);
    			attr_dev(h47, "class", "svelte-15nhzpn");
    			add_location(h47, file, 301, 0, 5509);
    			attr_dev(div2, "class", "svelte-15nhzpn");
    			add_location(div2, file, 302, 0, 5529);
    			attr_dev(hr8, "class", "svelte-15nhzpn");
    			add_location(hr8, file, 313, 0, 5752);
    			attr_dev(h48, "class", "svelte-15nhzpn");
    			add_location(h48, file, 314, 0, 5757);
    			attr_dev(button5, "class", "svelte-15nhzpn");
    			add_location(button5, file, 315, 0, 5823);
    			attr_dev(hr9, "class", "svelte-15nhzpn");
    			add_location(hr9, file, 323, 0, 5958);
    			attr_dev(h49, "class", "svelte-15nhzpn");
    			add_location(h49, file, 324, 0, 5963);
    			attr_dev(button6, "class", "svelte-15nhzpn");
    			add_location(button6, file, 325, 0, 6008);
    			attr_dev(hr10, "class", "svelte-15nhzpn");
    			add_location(hr10, file, 334, 0, 6149);
    			attr_dev(h410, "class", "svelte-15nhzpn");
    			add_location(h410, file, 335, 0, 6154);
    			attr_dev(div3, "class", "mouse svelte-15nhzpn");
    			add_location(div3, file, 338, 0, 6198);
    			attr_dev(div4, "class", "mouse svelte-15nhzpn");
    			add_location(div4, file, 342, 0, 6287);
    			attr_dev(div5, "class", "divgrid svelte-15nhzpn");
    			add_location(div5, file, 337, 0, 6176);
    			attr_dev(hr11, "class", "svelte-15nhzpn");
    			add_location(hr11, file, 352, 0, 6432);
    			attr_dev(h411, "class", "svelte-15nhzpn");
    			add_location(h411, file, 354, 0, 6438);
    			attr_dev(button7, "class", "svelte-15nhzpn");
    			add_location(button7, file, 355, 0, 6499);
    			attr_dev(hr12, "class", "svelte-15nhzpn");
    			add_location(hr12, file, 363, 0, 6649);
    			attr_dev(h412, "class", "svelte-15nhzpn");
    			add_location(h412, file, 364, 0, 6654);
    			attr_dev(input0, "class", "svelte-15nhzpn");
    			add_location(input0, file, 365, 42, 6724);
    			attr_dev(p7, "class", "svelte-15nhzpn");
    			add_location(p7, file, 365, 39, 6721);
    			attr_dev(p8, "class", "svelte-15nhzpn");
    			add_location(p8, file, 367, 0, 6755);
    			attr_dev(div6, "class", "divgrid svelte-15nhzpn");
    			set_style(div6, "width", "50%");
    			add_location(div6, file, 365, 0, 6682);
    			attr_dev(hr13, "class", "svelte-15nhzpn");
    			add_location(hr13, file, 369, 0, 6783);
    			attr_dev(h413, "class", "svelte-15nhzpn");
    			add_location(h413, file, 370, 0, 6788);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "min", "0");
    			attr_dev(input1, "max", "10");
    			attr_dev(input1, "class", "svelte-15nhzpn");
    			add_location(input1, file, 373, 1, 6850);
    			attr_dev(input2, "type", "range");
    			attr_dev(input2, "min", "0");
    			attr_dev(input2, "max", "10");
    			attr_dev(input2, "class", "svelte-15nhzpn");
    			add_location(input2, file, 374, 1, 6907);
    			attr_dev(label0, "class", "svelte-15nhzpn");
    			add_location(label0, file, 372, 0, 6841);
    			attr_dev(input3, "type", "number");
    			attr_dev(input3, "min", "0");
    			attr_dev(input3, "max", "10");
    			attr_dev(input3, "class", "svelte-15nhzpn");
    			add_location(input3, file, 378, 1, 6981);
    			attr_dev(input4, "type", "range");
    			attr_dev(input4, "min", "0");
    			attr_dev(input4, "max", "10");
    			attr_dev(input4, "class", "svelte-15nhzpn");
    			add_location(input4, file, 379, 1, 7038);
    			attr_dev(label1, "class", "svelte-15nhzpn");
    			add_location(label1, file, 377, 0, 6972);
    			attr_dev(div7, "class", "divgrid svelte-15nhzpn");
    			add_location(div7, file, 371, 0, 6819);
    			attr_dev(p9, "class", "svelte-15nhzpn");
    			add_location(p9, file, 382, 0, 7109);
    			attr_dev(hr14, "class", "svelte-15nhzpn");
    			add_location(hr14, file, 384, 0, 7137);
    			attr_dev(h414, "class", "svelte-15nhzpn");
    			add_location(h414, file, 385, 0, 7142);
    			attr_dev(input5, "type", "checkbox");
    			attr_dev(input5, "class", "svelte-15nhzpn");
    			add_location(input5, file, 387, 1, 7182);
    			attr_dev(label2, "class", "svelte-15nhzpn");
    			add_location(label2, file, 386, 0, 7173);
    			button8.disabled = button8_disabled_value = !/*yes*/ ctx[10];
    			attr_dev(button8, "class", "svelte-15nhzpn");
    			add_location(button8, file, 403, 0, 7466);
    			attr_dev(hr15, "class", "svelte-15nhzpn");
    			add_location(hr15, file, 405, 0, 7510);
    			attr_dev(h415, "class", "svelte-15nhzpn");
    			add_location(h415, file, 406, 0, 7515);
    			attr_dev(h2, "class", "svelte-15nhzpn");
    			add_location(h2, file, 407, 0, 7539);
    			attr_dev(select0, "class", "svelte-15nhzpn");
    			add_location(select0, file, 410, 1, 7618);
    			attr_dev(input6, "class", "svelte-15nhzpn");
    			add_location(input6, file, 421, 1, 7799);
    			button9.disabled = button9_disabled_value = !/*answer*/ ctx[11];
    			attr_dev(button9, "type", "submit");
    			attr_dev(button9, "class", "svelte-15nhzpn");
    			add_location(button9, file, 423, 1, 7831);
    			attr_dev(form, "class", "svelte-15nhzpn");
    			add_location(form, file, 409, 0, 7570);
    			attr_dev(p10, "class", "svelte-15nhzpn");
    			add_location(p10, file, 428, 0, 7902);
    			attr_dev(hr16, "class", "svelte-15nhzpn");
    			add_location(hr16, file, 434, 0, 7977);
    			attr_dev(h416, "class", "svelte-15nhzpn");
    			add_location(h416, file, 435, 0, 7982);
    			attr_dev(h417, "class", "svelte-15nhzpn");
    			add_location(h417, file, 436, 0, 8005);
    			attr_dev(h418, "class", "svelte-15nhzpn");
    			add_location(h418, file, 451, 0, 8212);
    			attr_dev(hr17, "class", "svelte-15nhzpn");
    			add_location(hr17, file, 477, 0, 8720);
    			attr_dev(h419, "class", "svelte-15nhzpn");
    			add_location(h419, file, 478, 0, 8725);
    			attr_dev(h420, "class", "svelte-15nhzpn");
    			add_location(h420, file, 479, 0, 8758);
    			attr_dev(h421, "class", "svelte-15nhzpn");
    			add_location(h421, file, 494, 0, 8965);
    			select1.multiple = true;
    			attr_dev(select1, "class", "svelte-15nhzpn");
    			if (/*flavours*/ ctx[13] === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[52].call(select1));
    			add_location(select1, file, 496, 0, 8984);
    			attr_dev(hr18, "class", "svelte-15nhzpn");
    			add_location(hr18, file, 513, 0, 9426);
    			attr_dev(h422, "class", "svelte-15nhzpn");
    			add_location(h422, file, 514, 0, 9431);
    			textarea.value = /*text*/ ctx[14];
    			attr_dev(textarea, "class", "svelte-15nhzpn");
    			add_location(textarea, file, 515, 0, 9463);
    			attr_dev(hr19, "class", "svelte-15nhzpn");
    			add_location(hr19, file, 520, 0, 9519);
    			attr_dev(h423, "class", "svelte-15nhzpn");
    			add_location(h423, file, 521, 0, 9524);
    			if (!src_url_equal(img.src, img_src_value = /*src*/ ctx[20])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*src*/ ctx[20]);
    			attr_dev(img, "class", "svelte-15nhzpn");
    			add_location(img, file, 522, 3, 9561);
    			attr_dev(p11, "class", "svelte-15nhzpn");
    			add_location(p11, file, 522, 0, 9558);
    			attr_dev(div8, "class", "content svelte-15nhzpn");
    			add_location(div8, file, 221, 0, 4116);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(div0, t1);
    			append_dev(div0, a1);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div8, anchor);
    			append_dev(div8, h3);
    			append_dev(div8, t5);
    			append_dev(div8, hr0);
    			append_dev(div8, t6);
    			append_dev(div8, h40);
    			append_dev(div8, t8);
    			append_dev(div8, p0);
    			append_dev(p0, t9);
    			append_dev(p0, t10);
    			append_dev(div8, p1);
    			append_dev(div8, p2);
    			append_dev(p2, t11);
    			append_dev(p2, t12);
    			append_dev(p2, t13);
    			append_dev(p2, t14);
    			append_dev(div8, t15);
    			append_dev(div8, hr1);
    			append_dev(div8, t16);
    			append_dev(div8, h41);
    			append_dev(div8, t18);
    			append_dev(div8, p3);
    			append_dev(p3, t19);
    			html_tag.m(/*strongtxt*/ ctx[21], p3);
    			append_dev(div8, t20);
    			append_dev(div8, hr2);
    			append_dev(div8, t21);
    			append_dev(div8, h42);
    			append_dev(div8, t23);
    			append_dev(div8, button0);
    			append_dev(button0, t24);
    			append_dev(button0, t25);
    			append_dev(button0, t26);
    			append_dev(button0, t27);
    			append_dev(div8, t28);
    			if (if_block0) if_block0.m(div8, null);
    			append_dev(div8, t29);
    			if_block1.m(div8, null);
    			append_dev(div8, t30);
    			if_block2.m(div8, null);
    			append_dev(div8, t31);
    			append_dev(div8, hr3);
    			append_dev(div8, t32);
    			append_dev(div8, h43);
    			append_dev(div8, t34);
    			append_dev(div8, button1);
    			append_dev(div8, t36);
    			if_block3.m(div8, null);
    			append_dev(div8, t37);
    			append_dev(div8, hr4);
    			append_dev(div8, t38);
    			append_dev(div8, h44);
    			append_dev(div8, t40);
    			append_dev(div8, button2);
    			append_dev(div8, t42);
    			append_dev(div8, button3);
    			append_dev(div8, t44);
    			append_dev(div8, p4);
    			append_dev(p4, t45);
    			append_dev(div8, t46);
    			append_dev(div8, p5);
    			append_dev(p5, t47);
    			append_dev(p5, t48);
    			append_dev(p5, t49);
    			append_dev(div8, t50);
    			append_dev(div8, hr5);
    			append_dev(div8, t51);
    			append_dev(div8, h45);
    			append_dev(div8, t53);
    			mount_component(nested0, div8, null);
    			append_dev(div8, t54);
    			mount_component(nested1, div8, null);
    			append_dev(div8, t55);
    			mount_component(packageinfo, div8, null);
    			append_dev(div8, t56);
    			append_dev(div8, hr6);
    			append_dev(div8, t57);
    			append_dev(div8, h46);
    			append_dev(div8, t59);
    			append_dev(div8, button4);
    			append_dev(div8, t61);
    			append_dev(div8, p6);
    			append_dev(p6, t62);
    			append_dev(p6, t63);
    			append_dev(p6, t64);
    			append_dev(div8, t65);
    			append_dev(div8, hr7);
    			append_dev(div8, t66);
    			append_dev(div8, h47);
    			append_dev(div8, t68);
    			append_dev(div8, div2);

    			for (let i = 0; i < each_blocks_7.length; i += 1) {
    				if (each_blocks_7[i]) {
    					each_blocks_7[i].m(div2, null);
    				}
    			}

    			append_dev(div8, t69);
    			append_dev(div8, hr8);
    			append_dev(div8, t70);
    			append_dev(div8, h48);
    			append_dev(div8, t72);
    			append_dev(div8, button5);
    			append_dev(div8, t74);

    			for (let i = 0; i < each_blocks_6.length; i += 1) {
    				if (each_blocks_6[i]) {
    					each_blocks_6[i].m(div8, null);
    				}
    			}

    			append_dev(div8, t75);
    			append_dev(div8, hr9);
    			append_dev(div8, t76);
    			append_dev(div8, h49);
    			append_dev(div8, t78);
    			append_dev(div8, button6);
    			append_dev(div8, t80);

    			for (let i = 0; i < each_blocks_5.length; i += 1) {
    				if (each_blocks_5[i]) {
    					each_blocks_5[i].m(div8, null);
    				}
    			}

    			append_dev(div8, t81);
    			append_dev(div8, hr10);
    			append_dev(div8, t82);
    			append_dev(div8, h410);
    			append_dev(div8, t84);
    			append_dev(div8, div5);
    			append_dev(div5, div3);
    			append_dev(div3, t85);
    			append_dev(div3, t86);
    			append_dev(div3, t87);
    			append_dev(div3, t88);
    			append_dev(div5, t89);
    			append_dev(div5, div4);
    			append_dev(div4, t90);
    			append_dev(div4, t91);
    			append_dev(div4, t92);
    			append_dev(div4, t93);
    			append_dev(div8, t94);
    			append_dev(div8, hr11);
    			append_dev(div8, t95);
    			append_dev(div8, h411);
    			append_dev(div8, t97);
    			append_dev(div8, button7);
    			append_dev(div8, t99);
    			mount_component(inner, div8, null);
    			append_dev(div8, t100);
    			mount_component(outer, div8, null);
    			append_dev(div8, t101);
    			append_dev(div8, hr12);
    			append_dev(div8, t102);
    			append_dev(div8, h412);
    			append_dev(div8, t104);
    			append_dev(div8, div6);
    			append_dev(div6, p7);
    			append_dev(p7, input0);
    			set_input_value(input0, /*word*/ ctx[7]);
    			append_dev(div6, t105);
    			append_dev(div6, p8);
    			append_dev(p8, t106);
    			append_dev(p8, t107);
    			append_dev(p8, t108);
    			append_dev(div8, t109);
    			append_dev(div8, hr13);
    			append_dev(div8, t110);
    			append_dev(div8, h413);
    			append_dev(div8, t112);
    			append_dev(div8, div7);
    			append_dev(div7, label0);
    			append_dev(label0, input1);
    			set_input_value(input1, /*a*/ ctx[8]);
    			append_dev(label0, t113);
    			append_dev(label0, input2);
    			set_input_value(input2, /*a*/ ctx[8]);
    			append_dev(div7, t114);
    			append_dev(div7, label1);
    			append_dev(label1, input3);
    			set_input_value(input3, /*b*/ ctx[9]);
    			append_dev(label1, t115);
    			append_dev(label1, input4);
    			set_input_value(input4, /*b*/ ctx[9]);
    			append_dev(div8, t116);
    			append_dev(div8, p9);
    			append_dev(p9, t117);
    			append_dev(p9, t118);
    			append_dev(p9, t119);
    			append_dev(p9, t120);
    			append_dev(p9, t121);
    			append_dev(div8, t122);
    			append_dev(div8, hr14);
    			append_dev(div8, t123);
    			append_dev(div8, h414);
    			append_dev(div8, t125);
    			append_dev(div8, label2);
    			append_dev(label2, input5);
    			input5.checked = /*yes*/ ctx[10];
    			append_dev(label2, t126);
    			append_dev(div8, t127);
    			if_block4.m(div8, null);
    			append_dev(div8, t128);
    			append_dev(div8, button8);
    			append_dev(button8, t129);
    			append_dev(div8, t130);
    			append_dev(div8, hr15);
    			append_dev(div8, t131);
    			append_dev(div8, h415);
    			append_dev(div8, t133);
    			append_dev(div8, h2);
    			append_dev(div8, t135);
    			append_dev(div8, form);
    			append_dev(form, select0);

    			for (let i = 0; i < each_blocks_4.length; i += 1) {
    				if (each_blocks_4[i]) {
    					each_blocks_4[i].m(select0, null);
    				}
    			}

    			select_option(select0, /*selected*/ ctx[3]);
    			append_dev(form, t136);
    			append_dev(form, input6);
    			set_input_value(input6, /*answer*/ ctx[11]);
    			append_dev(form, t137);
    			append_dev(form, button9);
    			append_dev(button9, t138);
    			append_dev(div8, t139);
    			append_dev(div8, p10);
    			append_dev(p10, t140);
    			append_dev(p10, t141);
    			append_dev(div8, t142);
    			append_dev(div8, hr16);
    			append_dev(div8, t143);
    			append_dev(div8, h416);
    			append_dev(div8, t145);
    			append_dev(div8, h417);
    			append_dev(div8, t147);

    			for (let i = 0; i < 3; i += 1) {
    				if (each_blocks_3[i]) {
    					each_blocks_3[i].m(div8, null);
    				}
    			}

    			append_dev(div8, t148);
    			append_dev(div8, h418);
    			append_dev(div8, t150);

    			for (let i = 0; i < 3; i += 1) {
    				if (each_blocks_2[i]) {
    					each_blocks_2[i].m(div8, null);
    				}
    			}

    			append_dev(div8, t151);
    			if_block5.m(div8, null);
    			append_dev(div8, t152);
    			append_dev(div8, hr17);
    			append_dev(div8, t153);
    			append_dev(div8, h419);
    			append_dev(div8, t155);
    			append_dev(div8, h420);
    			append_dev(div8, t157);

    			for (let i = 0; i < 3; i += 1) {
    				if (each_blocks_1[i]) {
    					each_blocks_1[i].m(div8, null);
    				}
    			}

    			append_dev(div8, t158);
    			append_dev(div8, h421);
    			append_dev(div8, t160);
    			append_dev(div8, select1);

    			for (let i = 0; i < 3; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(select1, null);
    				}
    			}

    			select_options(select1, /*flavours*/ ctx[13]);
    			append_dev(div8, t161);
    			if_block6.m(div8, null);
    			append_dev(div8, t162);
    			append_dev(div8, hr18);
    			append_dev(div8, t163);
    			append_dev(div8, h422);
    			append_dev(div8, t165);
    			append_dev(div8, textarea);
    			append_dev(div8, t166);
    			append_dev(div8, hr19);
    			append_dev(div8, t167);
    			append_dev(div8, h423);
    			append_dev(div8, t169);
    			append_dev(div8, p11);
    			append_dev(p11, img);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*increment0*/ ctx[22], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler*/ ctx[35], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_1*/ ctx[36], false, false, false, false),
    					listen_dev(button3, "click", /*decrement*/ ctx[23], false, false, false, false),
    					listen_dev(button4, "click", /*addNumber*/ ctx[24], false, false, false, false),
    					listen_dev(button5, "click", /*handleClick*/ ctx[27], false, false, false, false),
    					listen_dev(button6, "click", /*handleClick2*/ ctx[28], false, false, false, false),
    					listen_dev(div3, "pointermove", /*handleMove*/ ctx[29], false, false, false, false),
    					listen_dev(div4, "pointermove", /*pointermove_handler*/ ctx[38], false, false, false, false),
    					listen_dev(button7, "click", /*click_handler_3*/ ctx[39], { once: true }, false, false, false),
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[40]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[41]),
    					listen_dev(input2, "change", /*input2_change_input_handler*/ ctx[42]),
    					listen_dev(input2, "input", /*input2_change_input_handler*/ ctx[42]),
    					listen_dev(input3, "input", /*input3_input_handler*/ ctx[43]),
    					listen_dev(input4, "change", /*input4_change_input_handler*/ ctx[44]),
    					listen_dev(input4, "input", /*input4_change_input_handler*/ ctx[44]),
    					listen_dev(input5, "change", /*input5_change_handler*/ ctx[45]),
    					listen_dev(select0, "change", /*change_handler*/ ctx[46], false, false, false, false),
    					listen_dev(input6, "input", /*input6_input_handler*/ ctx[47]),
    					listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[31]), false, true, false, false),
    					listen_dev(select1, "change", /*select1_change_handler*/ ctx[52]),
    					listen_dev(textarea, "keydown", /*handleKeydown*/ ctx[33], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty[0] & /*$time*/ 131072) && t10_value !== (t10_value = /*formatter2*/ ctx[34].format(/*$time*/ ctx[17]) + "")) set_data_dev(t10, t10_value);
    			if (!current || dirty[0] & /*$elapsed*/ 262144) set_data_dev(t12, /*$elapsed*/ ctx[18]);
    			if ((!current || dirty[0] & /*$elapsed*/ 262144) && t14_value !== (t14_value = (/*$elapsed*/ ctx[18] === 1 ? 'second' : 'seconds') + "")) set_data_dev(t14, t14_value);
    			if (!current || dirty[0] & /*count*/ 4) set_data_dev(t25, /*count*/ ctx[2]);
    			if ((!current || dirty[0] & /*count*/ 4) && t27_value !== (t27_value = (/*count*/ ctx[2] === 1 ? 'time' : 'times') + "")) set_data_dev(t27, t27_value);

    			if (/*count*/ ctx[2] > 10) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_9(ctx);
    					if_block0.c();
    					if_block0.m(div8, t29);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div8, t30);
    				}
    			}

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type_1(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(div8, t31);
    				}
    			}

    			if (current_block_type_2 !== (current_block_type_2 = select_block_type_2(ctx))) {
    				if_block3.d(1);
    				if_block3 = current_block_type_2(ctx);

    				if (if_block3) {
    					if_block3.c();
    					if_block3.m(div8, t37);
    				}
    			}

    			if (!current || dirty[0] & /*counter*/ 1) set_data_dev(t45, /*counter*/ ctx[0]);
    			if (!current || dirty[0] & /*counter*/ 1) set_data_dev(t47, /*counter*/ ctx[0]);
    			if (!current || dirty[0] & /*doubled*/ 65536) set_data_dev(t49, /*doubled*/ ctx[16]);

    			const packageinfo_changes = (dirty[0] & /*pkg*/ 33554432)
    			? get_spread_update(packageinfo_spread_levels, [get_spread_object(/*pkg*/ ctx[25])])
    			: {};

    			packageinfo.$set(packageinfo_changes);
    			if ((!current || dirty[0] & /*numbers*/ 2) && t62_value !== (t62_value = /*numbers*/ ctx[1].join(' + ') + "")) set_data_dev(t62, t62_value);
    			if (!current || dirty[0] & /*sum*/ 32768) set_data_dev(t64, /*sum*/ ctx[15]);

    			if (dirty[0] & /*selected, colors*/ 67108872) {
    				each_value_7 = /*colors*/ ctx[26];
    				validate_each_argument(each_value_7);
    				let i;

    				for (i = 0; i < each_value_7.length; i += 1) {
    					const child_ctx = get_each_context_7(ctx, each_value_7, i);

    					if (each_blocks_7[i]) {
    						each_blocks_7[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_7[i] = create_each_block_7(child_ctx);
    						each_blocks_7[i].c();
    						each_blocks_7[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks_7.length; i += 1) {
    					each_blocks_7[i].d(1);
    				}

    				each_blocks_7.length = each_value_7.length;
    			}

    			if (dirty[0] & /*things*/ 16) {
    				each_value_6 = /*things*/ ctx[4];
    				validate_each_argument(each_value_6);
    				group_outros();
    				validate_each_keys(ctx, each_value_6, get_each_context_6, get_key);
    				each_blocks_6 = update_keyed_each(each_blocks_6, dirty, get_key, 1, ctx, each_value_6, each1_lookup, div8, outro_and_destroy_block, create_each_block_6, t75, get_each_context_6);
    				check_outros();
    			}

    			if (dirty[0] & /*users*/ 32) {
    				each_value_5 = /*users*/ ctx[5];
    				validate_each_argument(each_value_5);
    				validate_each_keys(ctx, each_value_5, get_each_context_5, get_key_1);
    				each_blocks_5 = update_keyed_each(each_blocks_5, dirty, get_key_1, 1, ctx, each_value_5, each2_lookup, div8, destroy_block, create_each_block_5, t81, get_each_context_5);
    			}

    			if ((!current || dirty[0] & /*m*/ 64) && t86_value !== (t86_value = /*m*/ ctx[6].x + "")) set_data_dev(t86, t86_value);
    			if ((!current || dirty[0] & /*m*/ 64) && t88_value !== (t88_value = /*m*/ ctx[6].y + "")) set_data_dev(t88, t88_value);
    			if ((!current || dirty[0] & /*m*/ 64) && t91_value !== (t91_value = /*m*/ ctx[6].x + "")) set_data_dev(t91, t91_value);
    			if ((!current || dirty[0] & /*m*/ 64) && t93_value !== (t93_value = /*m*/ ctx[6].y + "")) set_data_dev(t93, t93_value);

    			if (dirty[0] & /*word*/ 128 && input0.value !== /*word*/ ctx[7]) {
    				set_input_value(input0, /*word*/ ctx[7]);
    			}

    			if (!current || dirty[0] & /*word*/ 128) set_data_dev(t107, /*word*/ ctx[7]);

    			if (dirty[0] & /*a*/ 256 && to_number(input1.value) !== /*a*/ ctx[8]) {
    				set_input_value(input1, /*a*/ ctx[8]);
    			}

    			if (dirty[0] & /*a*/ 256) {
    				set_input_value(input2, /*a*/ ctx[8]);
    			}

    			if (dirty[0] & /*b*/ 512 && to_number(input3.value) !== /*b*/ ctx[9]) {
    				set_input_value(input3, /*b*/ ctx[9]);
    			}

    			if (dirty[0] & /*b*/ 512) {
    				set_input_value(input4, /*b*/ ctx[9]);
    			}

    			if (!current || dirty[0] & /*a*/ 256) set_data_dev(t117, /*a*/ ctx[8]);
    			if (!current || dirty[0] & /*b*/ 512) set_data_dev(t119, /*b*/ ctx[9]);
    			if ((!current || dirty[0] & /*a, b*/ 768) && t121_value !== (t121_value = /*a*/ ctx[8] + /*b*/ ctx[9] + "")) set_data_dev(t121, t121_value);

    			if (dirty[0] & /*yes*/ 1024) {
    				input5.checked = /*yes*/ ctx[10];
    			}

    			if (current_block_type_3 !== (current_block_type_3 = select_block_type_3(ctx))) {
    				if_block4.d(1);
    				if_block4 = current_block_type_3(ctx);

    				if (if_block4) {
    					if_block4.c();
    					if_block4.m(div8, t128);
    				}
    			}

    			if (!current || dirty[0] & /*yes*/ 1024 && button8_disabled_value !== (button8_disabled_value = !/*yes*/ ctx[10])) {
    				prop_dev(button8, "disabled", button8_disabled_value);
    			}

    			if (dirty[0] & /*questions*/ 1073741824) {
    				each_value_4 = /*questions*/ ctx[30];
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks_4[i]) {
    						each_blocks_4[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_4[i] = create_each_block_4(child_ctx);
    						each_blocks_4[i].c();
    						each_blocks_4[i].m(select0, null);
    					}
    				}

    				for (; i < each_blocks_4.length; i += 1) {
    					each_blocks_4[i].d(1);
    				}

    				each_blocks_4.length = each_value_4.length;
    			}

    			if (!current || dirty[0] & /*selected, questions*/ 1073741832) {
    				select_option(select0, /*selected*/ ctx[3]);
    			}

    			if (dirty[0] & /*answer*/ 2048 && input6.value !== /*answer*/ ctx[11]) {
    				set_input_value(input6, /*answer*/ ctx[11]);
    			}

    			if (!current || dirty[0] & /*answer*/ 2048 && button9_disabled_value !== (button9_disabled_value = !/*answer*/ ctx[11])) {
    				prop_dev(button9, "disabled", button9_disabled_value);
    			}

    			if ((!current || dirty[0] & /*selected*/ 8) && t141_value !== (t141_value = (/*selected*/ ctx[3]
    			? /*selected*/ ctx[3].id
    			: '[waiting...]') + "")) set_data_dev(t141, t141_value);

    			if (dirty[0] & /*scoops*/ 4096) {
    				each_value_3 = [1, 2, 3];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < 3; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks_3[i]) {
    						each_blocks_3[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_3[i] = create_each_block_3(child_ctx);
    						each_blocks_3[i].c();
    						each_blocks_3[i].m(div8, t148);
    					}
    				}

    				for (; i < 3; i += 1) {
    					each_blocks_3[i].d(1);
    				}
    			}

    			if (dirty[0] & /*flavours*/ 8192) {
    				each_value_2 = ['cookies and cream', 'mint choc chip', 'raspberry ripple'];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < 3; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(div8, t151);
    					}
    				}

    				for (; i < 3; i += 1) {
    					each_blocks_2[i].d(1);
    				}
    			}

    			if (current_block_type_4 === (current_block_type_4 = select_block_type_4(ctx)) && if_block5) {
    				if_block5.p(ctx, dirty);
    			} else {
    				if_block5.d(1);
    				if_block5 = current_block_type_4(ctx);

    				if (if_block5) {
    					if_block5.c();
    					if_block5.m(div8, t152);
    				}
    			}

    			if (dirty[0] & /*scoops*/ 4096) {
    				each_value_1 = [1, 2, 3];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < 3; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div8, t158);
    					}
    				}

    				for (; i < 3; i += 1) {
    					each_blocks_1[i].d(1);
    				}
    			}

    			if (dirty[0] & /*flavours*/ 8192) {
    				select_options(select1, /*flavours*/ ctx[13]);
    			}

    			if (current_block_type_5 === (current_block_type_5 = select_block_type_5(ctx)) && if_block6) {
    				if_block6.p(ctx, dirty);
    			} else {
    				if_block6.d(1);
    				if_block6 = current_block_type_5(ctx);

    				if (if_block6) {
    					if_block6.c();
    					if_block6.m(div8, t162);
    				}
    			}

    			if (!current || dirty[0] & /*text*/ 16384) {
    				prop_dev(textarea, "value", /*text*/ ctx[14]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nested0.$$.fragment, local);
    			transition_in(nested1.$$.fragment, local);
    			transition_in(packageinfo.$$.fragment, local);

    			for (let i = 0; i < each_value_6.length; i += 1) {
    				transition_in(each_blocks_6[i]);
    			}

    			transition_in(inner.$$.fragment, local);
    			transition_in(outer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nested0.$$.fragment, local);
    			transition_out(nested1.$$.fragment, local);
    			transition_out(packageinfo.$$.fragment, local);

    			for (let i = 0; i < each_blocks_6.length; i += 1) {
    				transition_out(each_blocks_6[i]);
    			}

    			transition_out(inner.$$.fragment, local);
    			transition_out(outer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div8);
    			if (if_block0) if_block0.d();
    			if_block1.d();
    			if_block2.d();
    			if_block3.d();
    			destroy_component(nested0);
    			destroy_component(nested1);
    			destroy_component(packageinfo);
    			destroy_each(each_blocks_7, detaching);

    			for (let i = 0; i < each_blocks_6.length; i += 1) {
    				each_blocks_6[i].d();
    			}

    			for (let i = 0; i < each_blocks_5.length; i += 1) {
    				each_blocks_5[i].d();
    			}

    			destroy_component(inner);
    			destroy_component(outer);
    			if_block4.d();
    			destroy_each(each_blocks_4, detaching);
    			destroy_each(each_blocks_3, detaching);
    			destroy_each(each_blocks_2, detaching);
    			if_block5.d();
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			if_block6.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function handleMessage(event) {
    	alert(event.detail.text);
    }

    function handleMessageOuter(event) {
    	alert(event.detail.text);
    }

    function instance($$self, $$props, $$invalidate) {
    	let doubled;
    	let sum;
    	let $time;
    	let $elapsed;
    	validate_store(time, 'time');
    	component_subscribe($$self, time, $$value => $$invalidate(17, $time = $$value));
    	validate_store(elapsed, 'elapsed');
    	component_subscribe($$self, elapsed, $$value => $$invalidate(18, $elapsed = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let name = 'SvelteWorld';
    	let src = 'images/needle.jpg';
    	let button = '<button>button text</button>';
    	let strongtxt = 'and some <strong>Strong</strong> text';
    	let count = 0;

    	function increment0() {
    		$$invalidate(2, count += 1);
    	}

    	let counter = 0;

    	function increment() {
    		$$invalidate(0, counter += 1);
    	}

    	function decrement() {
    		$$invalidate(0, counter -= 1);
    	}

    	// -------------------------
    	let numbers = [1, 2, 3, 4];

    	function addNumber() {
    		// numbers.push(numbers.length + 1);
    		$$invalidate(1, numbers = [...numbers, numbers.length + 1]);
    	}

    	const pkg = {
    		name: 'svelte',
    		speed: 'blazing',
    		version: 4,
    		website: 'https://svelte.dev'
    	};

    	// -------------------------
    	let user = null;

    	// -------------------------
    	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    	let selected = colors[0];

    	let things = [
    		{ id: 1, name: 'apple' },
    		{ id: 2, name: 'banana' },
    		{ id: 3, name: 'carrot' },
    		{ id: 4, name: 'doughnut' },
    		{ id: 5, name: 'egg' }
    	];

    	function handleClick() {
    		$$invalidate(4, things = things.slice(1));
    	}

    	let users = [
    		{ name: 'Ed', id: crypto.randomUUID() },
    		{ name: 'Tom', id: crypto.randomUUID() },
    		{ name: 'Kim', id: crypto.randomUUID() },
    		{ name: 'Dave', id: crypto.randomUUID() },
    		{ name: 'Mel', id: crypto.randomUUID() }
    	];

    	function handleClick2() {
    		$$invalidate(5, users = users.slice(1));
    	}

    	// ------------------------------
    	let m = { x: 0, y: 0 };

    	function handleMove(event) {
    		$$invalidate(6, m.x = event.clientX, m);
    		$$invalidate(6, m.y = event.clientY, m);
    	}

    	// ------------------------
    	let word = 'world';

    	// ------------------------
    	let a = 1;

    	let b = 2;

    	// -----------------------
    	let yes = false;

    	// -----------------------
    	let questions = [
    		{
    			id: 1,
    			text: `Where did you go to school?`
    		},
    		{
    			id: 2,
    			text: `What is your mother's name?`
    		},
    		{
    			id: 3,
    			text: `What is another personal fact that an attacker could easily find with Google?`
    		}
    	];
    	let answer = '';

    	function handleSubmit() {
    		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
    	}

    	// ------------------------------
    	let scoops = 1;

    	let flavours = [];
    	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    	let text = `Select some text and hit the tab key to toggle uppercase`;

    	async function handleKeydown(event) {
    		if (event.key !== 'Tab') return;
    		event.preventDefault();
    		const { selectionStart, selectionEnd, value } = this;
    		const selection = value.slice(selectionStart, selectionEnd);

    		const replacement = (/[a-z]/).test(selection)
    		? selection.toUpperCase()
    		: selection.toLowerCase();

    		$$invalidate(14, text = value.slice(0, selectionStart) + replacement + value.slice(selectionEnd));

    		// this has no effect, because the DOM hasn't updated yet
    		await tick();

    		this.selectionStart = selectionStart;
    		this.selectionEnd = selectionEnd;
    	}

    	const formatter2 = new Intl.DateTimeFormat('en',
    	{
    			hour12: true,
    			hour: 'numeric',
    			minute: '2-digit',
    			second: '2-digit'
    		});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[], []];
    	const click_handler = () => $$invalidate(19, user = !user);
    	const click_handler_1 = () => $$invalidate(0, counter += 1);
    	const click_handler_2 = color => $$invalidate(3, selected = color);

    	const pointermove_handler = e => {
    		$$invalidate(6, m = { x: e.clientX, y: e.clientY });
    	};

    	const click_handler_3 = () => alert('clicked');

    	function input0_input_handler() {
    		word = this.value;
    		$$invalidate(7, word);
    	}

    	function input1_input_handler() {
    		a = to_number(this.value);
    		$$invalidate(8, a);
    	}

    	function input2_change_input_handler() {
    		a = to_number(this.value);
    		$$invalidate(8, a);
    	}

    	function input3_input_handler() {
    		b = to_number(this.value);
    		$$invalidate(9, b);
    	}

    	function input4_change_input_handler() {
    		b = to_number(this.value);
    		$$invalidate(9, b);
    	}

    	function input5_change_handler() {
    		yes = this.checked;
    		$$invalidate(10, yes);
    	}

    	const change_handler = () => $$invalidate(11, answer = '');

    	function input6_input_handler() {
    		answer = this.value;
    		$$invalidate(11, answer);
    	}

    	function input_change_handler() {
    		scoops = this.__value;
    		$$invalidate(12, scoops);
    	}

    	function input_change_handler_1() {
    		flavours = get_binding_group_value($$binding_groups[1], this.__value, this.checked);
    		$$invalidate(13, flavours);
    	}

    	function input_change_handler_2() {
    		scoops = this.__value;
    		$$invalidate(12, scoops);
    	}

    	function select1_change_handler() {
    		flavours = select_multiple_value(this);
    		$$invalidate(13, flavours);
    	}

    	$$self.$capture_state = () => ({
    		Nested,
    		name,
    		src,
    		button,
    		strongtxt,
    		count,
    		increment0,
    		counter,
    		increment,
    		decrement,
    		numbers,
    		addNumber,
    		PackageInfo,
    		pkg,
    		user,
    		colors,
    		selected,
    		Thing,
    		things,
    		handleClick,
    		users,
    		handleClick2,
    		m,
    		handleMove,
    		Inner,
    		handleMessage,
    		Outer,
    		handleMessageOuter,
    		word,
    		a,
    		b,
    		yes,
    		questions,
    		answer,
    		handleSubmit,
    		scoops,
    		flavours,
    		formatter,
    		tick,
    		text,
    		handleKeydown,
    		time,
    		elapsed,
    		formatter2,
    		sum,
    		doubled,
    		$time,
    		$elapsed
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) name = $$props.name;
    		if ('src' in $$props) $$invalidate(20, src = $$props.src);
    		if ('button' in $$props) button = $$props.button;
    		if ('strongtxt' in $$props) $$invalidate(21, strongtxt = $$props.strongtxt);
    		if ('count' in $$props) $$invalidate(2, count = $$props.count);
    		if ('counter' in $$props) $$invalidate(0, counter = $$props.counter);
    		if ('numbers' in $$props) $$invalidate(1, numbers = $$props.numbers);
    		if ('user' in $$props) $$invalidate(19, user = $$props.user);
    		if ('selected' in $$props) $$invalidate(3, selected = $$props.selected);
    		if ('things' in $$props) $$invalidate(4, things = $$props.things);
    		if ('users' in $$props) $$invalidate(5, users = $$props.users);
    		if ('m' in $$props) $$invalidate(6, m = $$props.m);
    		if ('word' in $$props) $$invalidate(7, word = $$props.word);
    		if ('a' in $$props) $$invalidate(8, a = $$props.a);
    		if ('b' in $$props) $$invalidate(9, b = $$props.b);
    		if ('yes' in $$props) $$invalidate(10, yes = $$props.yes);
    		if ('questions' in $$props) $$invalidate(30, questions = $$props.questions);
    		if ('answer' in $$props) $$invalidate(11, answer = $$props.answer);
    		if ('scoops' in $$props) $$invalidate(12, scoops = $$props.scoops);
    		if ('flavours' in $$props) $$invalidate(13, flavours = $$props.flavours);
    		if ('text' in $$props) $$invalidate(14, text = $$props.text);
    		if ('sum' in $$props) $$invalidate(15, sum = $$props.sum);
    		if ('doubled' in $$props) $$invalidate(16, doubled = $$props.doubled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*counter*/ 1) {
    			if (counter >= 10) {
    				alert('count is dangerously high!');
    				$$invalidate(0, counter = 0);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*counter*/ 1) {
    			$$invalidate(16, doubled = counter * 2);
    		}

    		if ($$self.$$.dirty[0] & /*counter*/ 1) {
    			{
    				console.log(`the count is ${counter}`);
    				console.log(`this will also be logged whenever count changes`);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*numbers*/ 2) {
    			$$invalidate(15, sum = numbers.reduce((total, currentNumber) => total + currentNumber, 0));
    		}
    	};

    	return [
    		counter,
    		numbers,
    		count,
    		selected,
    		things,
    		users,
    		m,
    		word,
    		a,
    		b,
    		yes,
    		answer,
    		scoops,
    		flavours,
    		text,
    		sum,
    		doubled,
    		$time,
    		$elapsed,
    		user,
    		src,
    		strongtxt,
    		increment0,
    		decrement,
    		addNumber,
    		pkg,
    		colors,
    		handleClick,
    		handleClick2,
    		handleMove,
    		questions,
    		handleSubmit,
    		formatter,
    		handleKeydown,
    		formatter2,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		pointermove_handler,
    		click_handler_3,
    		input0_input_handler,
    		input1_input_handler,
    		input2_change_input_handler,
    		input3_input_handler,
    		input4_change_input_handler,
    		input5_change_handler,
    		change_handler,
    		input6_input_handler,
    		input_change_handler,
    		$$binding_groups,
    		input_change_handler_1,
    		input_change_handler_2,
    		select1_change_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
