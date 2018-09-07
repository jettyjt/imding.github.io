loading();

function loading() {
    if (document.body) init();
    else window.requestAnimationFrame(loading);
}

function init() {
    // add utility functions to window object
    Object.assign(window, new Utility());

    // display app container
    sCss(appContainer, { visibility: 'visible' });

    // create instance of Flo
    fl = new Flo();

    fl.init(appContainer);

    run.onclick = () => fl.evaluate();
}

class Flo {
    constructor() {
        this.default = {
            workspace: {
                pos: { x: 0, y: 0 },
                scl: { x: 600, y: 350 },
                pad: 10,
                fill: '#303030',
            },
            node: {
                pos: { x: 0, y: 0 },
                br: 8,      // border radius
                hs: 30,     // head size
                hp: 6,      // head padding
                hfill: 'skyblue',
                bfill: 'lightcyan',
            },
            port: {
                r: 4,
                inputMinWidth: 30,
                inputMaxWidth: 120,
                selectWidth: 55,
                editable: false,
            },
            link: {
                stroke: 'plum',
                strokeWidth: '4',
                strokeLinecap: 'round',
                strokeOpacity: '0.8'
            },
            error: {
                link: 'indianred',
            }
        };

        this.root;
        this.toolbox;
        this.workspace = [];

        this.activeWorkspace;
        this.activeNode;
        this.activePort;
        this.activeLink;
    }

    // ================================== //
    // class method for initiating the UI //
    // ================================== //

    init(root) {
        this.root = root;
        this.newWorkspace({ pos: { x: 25, y: 90 } });
        this.newToolbox();
    }

    // ====================================== //
    // class method for evaluating the graphs //
    // ====================================== //

    evaluate() {
        console.clear();

        this.workspace.forEach(ws => {
            // filter linked nodes
            const linkedNodes = ws.graph.nodes.filter(n => n.links.length);

            // define components
            linkedNodes.forEach(ln => {
                const nodeInfo = {
                    name: ln.name,
                    inPorts: ln.ports.input.map(ip => camelize(ip.name)),
                    outPorts: Array(ln.ports.output.length).fill('result'),
                    body: ln.eval,
                };

                FBP.component(nodeInfo);
            });

            // ensure graph has only one scheculer
            let scheduler = linkedNodes.filter(n => n.name.startsWith('scheduler'));
            if (scheduler.length !== 1) throw new Error('make sure there is exactly one linked scheduler in the graph.');
            else scheduler = scheduler[0];

            let initValues = {};

            // define network
            FBP.define('network', function (F) {
                const schedulerLinkedNodes = scheduler.ports.input.filter(ip => ip.link).map(ip => ip.link.start.owner);

                schedulerLinkedNodes.forEach(sln => {
                    const
                        // filter unlinked input ports on nodes directly linked to the scheduler
                        unlinkedInputPorts = sln.ports.input.filter(ip => !ip.link),
                        // filter linked input ports...
                        linkedInputPorts = sln.ports.input.filter(ip => ip.link),
                        // filter linked output ports...
                        linkedOutputPorts = sln.ports.output.filter(op => op.link);

                    unlinkedInputPorts.forEach(uip => {
                        // throw error if unlinked input port is not editable
                        if (!uip.editable) throw new Error(`the ${uip.owner.name} node failed to evaluate: the ${uip.name.textContent} port requires an input`);

                        // set value depending on input element type
                        let value = uip.input.tagName === 'INPUT' ? uip.input.value : Boolean(uip.input.selectedIndex);

                        // need better validation of user input value ***
                        value =
                            uip.type === 'number' ? Number(value) :
                                uip.type === 'string' ? String(value) :
                                    uip.type === 'boolean' ? Boolean(value) :
                                        uip.type === 'array' ? (new Function('return [' + value + '];')()) :
                                            JSON.parse(value);

                        // F.init(nodeName, portName)
                        F.init(uip.owner.name, uip.name);
                        // store initial values
                        initValues[`${uip.owner.name}.${uip.name}`] = value;
                    });

                    // F.connect(fromNode, fromPort, toNode, toPort)
                    linkedOutputPorts.forEach(lop => F.connect(sln.name, lop.name, scheduler.name, camelize(lop.link.end.label.textContent)));

                    // recursive function to process upstream nodes ***

                });

                // always end with the scheduler node
                F.end(scheduler.name, 'result');
                
            }).go(initValues, function (err, result) {
                if (err) alert(err);
                else console.log(`!! evaluation took ${Math.round(result.interval)}ms, it returned ${result.output == undefined ? 'nothing' : result.output}`);
            });
        });
    }

    // ====================================== //
    // class method for creating the tool box //
    // ====================================== //

    newToolbox() {
        const tb = {
            root: newElement('div', { id: 'UI-TB' }),
            nodes: [],
            nodeData: [{
                name: 'scheduler',
                ports: {
                    in: [{
                        name: 'A',
                        type: 'Execute',
                    }],
                    out: [{
                        name: 'result',
                        type: 'Execute',
                    }],
                },
                ext: { in: true, out: false },
                eval: function (A, result) {
                    result(null, A);
                },
            }, {
                name: 'add',
                ports: {
                    in: [{
                        name: 'A',
                        type: 'number',
                        editable: true,
                    }, {
                        name: 'B',
                        type: 'number',
                        editable: true,
                    }],
                    out: [{
                        name: 'result',
                        label: 'A + B',
                        type: 'number',
                    }],
                },
                ext: { in: false, out: false },
                eval: function (A, B, result) {
                    result(null, A + B);
                },
            }, {
                name: 'log',
                ports: {
                    in: [{
                        name: 'Message',
                        type: 'string',
                        editable: true,
                    }],
                    out: [{
                        name: 'result',
                        label: 'Run',
                        type: 'execute',
                    }],
                },
                ext: { in: false, out: false },
                eval: function (Message, result) {
                    result(null, console.log(Message));
                },
            }, {
                name: 'alert',
                ports: {
                    in: [{
                        name: 'Message',
                        type: 'string',
                        editable: true,
                    }],
                    out: [{
                        name: 'result',
                        label: 'Run',
                        type: 'execute',
                    }],
                },
                ext: { in: false, out: false },
                eval: function (Message, result) {
                    result(null, alert(Message));
                },
            }],

            // ================================= //
            // toolbox method for showing itself //
            // ================================= //

            show: () => {
                console.log(`showing toolbox in ${this.activeWorkspace.root.id}`);
                this.activeWorkspace.root.appendChild(tb.root);
                sCss(tb.root, {
                    visibility: 'visible',
                    left: `${relCursor(this.activeWorkspace.root).x - gCss(tb.root).width / 2}px`,
                    top: `${relCursor(this.activeWorkspace.root).y - gCss(tb.root).height / 2}px`,
                });
                tb.visible = true;
            },

            // ================================ //
            // toolbox method for hiding itself //
            // ================================ //

            hide: () => {
                this.root.appendChild(tb.root);
                sCss(tb.root, { visibility: 'hidden' });
                tb.visible = false;
            },
        };

        this.root.appendChild(tb.root);

        tb.hide();

        tb.root.onmouseleave = () => tb.hide();

        tb.nodeData.forEach(nd => {
            const node = {
                resident: newElement('div', { className: 'UI-TBN', textContent: nd.name }),
                addToWorkspace: () => this.activeWorkspace.newNode(Object.assign({ pos: relCursor(this.activeWorkspace.root) }, nd)),
            };

            node.resident.onclick = () => {
                tb.hide();
                node.addToWorkspace();
            };

            tb.root.appendChild(node.resident);
            tb.nodes.push(node);
        });

        this.toolbox = tb;
    }

    // ========================================= //
    // class method for creating a new workspace //
    // ========================================= //

    newWorkspace(cf) {
        cf = Object.assign(Object.assign({}, this.default.workspace), cf || {});

        const
            id = uid(),
            ws = {
                root: newElement('div', { id: `WS-${id}`, className: 'UI-WS', textContent: `WS-${id}` }),
                links: newSVG('svg'),
                graph: { nodes: [], links: [], },

                // ======================================== //
                // workspace method for createing new nodes //
                // ======================================== //

                newNode: cf => {
                    cf = Object.assign(Object.assign({}, this.default.node), cf || {});

                    const
                        id = uid(),
                        node = {
                            root: newElement('div', { id: `NR-${id}`, className: 'nodeRoot' }),
                            head: newElement('div', { id: `NH-${id}`, className: 'nodeHead', textContent: cf.name || `node-${id}` }),
                            body: newElement('div', { id: `NB-${id}`, className: 'nodeBody' }),
                            input: newElement('div', { className: 'nodeInput' }),
                            output: newElement('div', { className: 'nodeOutput' }),
                            ports: { input: [], output: [] },
                            links: [],
                            name: `${camelize(cf.name)}-${id}`,
                            eval: cf.eval,

                            // ================================== //
                            // node method for creating new ports //
                            // ================================== //

                            newPort: cf => {
                                cf = Object.assign(Object.assign({}, this.default.port), cf || {});

                                const port = {
                                    owner: node,
                                    name: cf.name,
                                    dir: cf.dir,
                                    type: cf.type,
                                    editable: cf.editable,
                                    link: null,
                                    root: newElement('div', { className: 'portRoot' }),
                                    socket: newElement('div', { className: 'portSocket' }),
                                    // type: newElement('div', { className: 'portType', textContent: `(${cf.type || 'any'})` }),
                                    label: newElement('div', { className: 'portName', textContent: cf.label || cf.name || cf.dir }),
                                    resize: () => {
                                        const
                                            portWidth = gCss(port.socket).width + gCss(port.label).width + cf.r * 2 + (cf.editable ? gCss(port.input).width : 0) + cf.r * 4,
                                            nodeWidth = gCss(node.body).width;

                                        sCss(port.root, { width: `${port.dir === 'input' ? portWidth : portWidth < nodeWidth ? nodeWidth : portWidth}px` });

                                        const newWidth = Math.max(node.minWidth, elarr(node.root.querySelectorAll('.portRoot')).maxWidth);

                                        sCss(node.root, { width: `${newWidth}px` });
                                        node.ports.output.forEach(p => sCss(p.root, { marginLeft: `${newWidth - gCss(p.root).width}px` }));
                                        node.links.forEach(l => l.update());
                                    },
                                };

                                // append port root to input or output section depending on port direction
                                node[port.dir].appendChild(port.root);
                                port.root.appendChild(port.socket);

                                // append socket and name in different order depending on port direction
                                if (port.dir === 'output') port.root.insertBefore(port.label, port.socket);
                                else port.root.appendChild(port.label);

                                // add
                                node.ports[port.dir].push(port);

                                sCss(port.socket, {
                                    margin: `0 ${port.dir === 'output' ? cf.r : 0}px 0 ${port.dir === 'input' ? cf.r : 0}px`,
                                    width: `${cf.r * 2}px`,
                                    height: `${cf.r * 2}px`,
                                    backgroundColor: this.default.workspace.fill,
                                });

                                sCss(port.label, { margin: `0 ${port.dir === 'output' ? cf.r : 0}px 0 ${port.dir === 'input' ? cf.r : 0}px` });

                                // create and append input field if the port is editable
                                if (cf.editable) {
                                    const isBool = /boolean/.test(cf.type);

                                    if (isBool) {
                                        const
                                            falseOpt = newElement('option', { value: 0, text: 'false' }),
                                            trueOpt = newElement('option', { value: 1, text: 'true' });

                                        port.input = newElement('select', { className: 'portInput' });
                                        port.input.add(falseOpt);
                                        port.input.add(trueOpt);
                                    }

                                    else port.input = newElement('input', { className: 'portInput' });

                                    port.root.appendChild(port.input);

                                    port.input.oninput = () => {
                                        if (isBool) return;

                                        // create new ruler element
                                        const ruler = newElement('span', { textContent: port.input.value.replace(/\s/g, '_') });

                                        // make sure ruler element has the same font family ans size as the input field
                                        sCss(ruler, {
                                            fontFamily: gCss(port.input).fontFamily,
                                            fontSize: gCss(port.input).fontSize,
                                        });

                                        this.root.appendChild(ruler);       // add ruler element to page to get measurement

                                        // set the size of the input field with upper & lower boundaries
                                        sCss(port.input, { width: `${Math.min(cf.inputMaxWidth, Math.max(cf.inputMinWidth, gCss(ruler).width + 2))}px` });

                                        this.root.removeChild(ruler);       // remove ruler

                                        port.resize();      // resize the root element that contains the socket, name & input field
                                    };

                                    sCss(port.input, {
                                        margin: `0 0 0 ${cf.r}px`,
                                        width: `${isBool ? cf.selectWidth : cf.inputMinWidth}px`,
                                        height: `${gCss(port.label).height}px`,
                                    });
                                }

                                port.resize();

                                // when a port is clicked
                                port.socket.onclick = () => {
                                    // if a link has already been created
                                    if (this.activeLink) {
                                        const
                                            linkedPort = this.activeLink.start || this.activeLink.end,
                                            targetPort = port,
                                            // check if the port belongs to the same node
                                            sameNode = linkedPort.owner === targetPort.owner,
                                            // check if the clicked port is of the same direction ( out -> out or in -> in)
                                            sameDir = linkedPort.dir === targetPort.dir;

                                        if (sameNode || sameDir || port.link /* port already has a link */) {
                                            sAttr(this.activeLink.svg, { stroke: this.default.error.link });
                                            setTimeout(() => sAttr(this.activeLink.svg, { stroke: this.default.link.stroke }), 250);
                                            console.warn(sameNode ?
                                                'connection can only be made between 2 nodes' : sameDir ?
                                                    'connection can only be made between input & output ports' :
                                                    'only one link is allowed per port'
                                            );
                                        }

                                        else {
                                            // establish connection
                                            node.links.push(this.activeLink);
                                            console.log(port);
                                            this.activeLink.connect(port);
                                        }
                                    }

                                    // else if the clicked port has no link
                                    else if (!port.link) {
                                        // create a new link
                                        this.activePort = port;
                                        ws.newLink();
                                        port.link = this.activeLink;
                                        node.links.push(this.activeLink);
                                    }

                                    // otherwise, pluck the link
                                    else {
                                        console.log(`plucked a link from ${port.owner.head.textContent}`);
                                        rifa(port.link, port.owner.links);
                                        port.link[port.dir === 'input' ? 'end' : 'start'] = null;
                                        if (port.editable) {
                                            port.input.disabled = false;
                                            sCss(port.input, { opacity: 1 });
                                        }
                                        this.activeLink = port.link;
                                        port.link = null;
                                    }
                                };
                            },
                        };

                    // assemble node & append to workspace so...
                    // it has computed CSS values for further calculation
                    node.root.appendChild(node.head);
                    node.root.appendChild(node.body);
                    node.body.appendChild(node.input);
                    node.body.appendChild(newElement('hr'));
                    node.body.appendChild(node.output);
                    ws.root.appendChild(node.root);

                    sCss(node.head, {
                        padding: `${cf.hp}px ${cf.hp * 2}px ${cf.hp / 2}px ${cf.hp * 2}px`,
                        borderRadius: `${cf.br}px ${cf.br}px 0 0`,
                        backgroundColor: cf.hfill,
                    });

                    sCss(node.body, {
                        padding: `${cf.br / 2}px 0 ${cf.br}px 0`,
                        borderRadius: `0 0 ${cf.br}px ${cf.br}px`,
                        backgroundColor: cf.bfill,
                    });

                    // attach ports only after styling the body
                    cf.ports.in.forEach(pcf => node.newPort(Object.assign({ dir: 'input' }, pcf)));
                    cf.ports.out.forEach(pcf => node.newPort(Object.assign({ dir: 'output' }, pcf)));

                    // trim the x & y scale of the following elements
                    // order of arguments is important
                    // trimScale(node.input, node.output, node.body, node.head);

                    // calculate scale of the node root element
                    node.minWidth = gCss(node.head).width;
                    const fixedHeight = gCss(node.head).height + gCss(node.body).height;

                    sCss(node.root, {
                        // width is omitted because it will be set by adding a new port
                        // and every node has at least one port
                        height: `${fixedHeight}px`,
                        left: `${cf.pos.x - node.minWidth / 2}px`,
                        top: `${cf.pos.y - fixedHeight / 2}px`,
                    });

                    node.head.onmouseup = () => {
                        sCss(node.root, {
                            zIndex: 'initial',
                            opacity: 'initial',
                        });
                        this.activeNode = null;
                    };
                    node.head.onmousedown = () => {
                        sCss(node.root, {
                            zIndex: 1,
                            opacity: 0.8,
                        });
                        this.activeNode = node;
                        this.activeNode.offset = relCursor(node.root);
                    };

                    ws.graph.nodes.push(node);

                    console.log(`created ${node.name} in ${ws.root.id}`);
                },

                // ======================================= //
                // workspace method for creating new links //
                // ======================================= //

                newLink: cf => {
                    cf = Object.assign(Object.assign({}, this.default.link), cf || {});

                    const link = {
                        svg: newSVG('path', { id: uid('L') }),
                        start: this.activePort.dir === 'output' ? this.activePort : null,
                        end: this.activePort.dir === 'input' ? this.activePort : null,
                        update: () => {
                            const
                                p1 = link.start ? relPos(link.start.socket, ws.root, 'cog') : relCursor(ws.root),
                                p2 = link.end ? relPos(link.end.socket, ws.root, 'cog') : relCursor(ws.root),
                                // add control points ***
                                c1 = p1,
                                c2 = p2;

                            sAttr(link.svg, { d: `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}` });
                        },
                        connect: port => {
                            // port.link is used to prevent multiple connections to the same port
                            port.link = link;
                            if (port.editable) {
                                port.input.disabled = true;
                                sCss(port.input, { opacity: 0 });
                            }
                            link[link.start ? 'end' : 'start'] = port;
                            link.update();
                            this.activeLink = null;
                            console.log(`-> contection established: ${link.start.name.textContent} -> ${link.end.name.textContent}`);
                        },
                    };

                    sAttr(link.svg, cf);

                    ws.links.appendChild(link.svg);
                    this.activeLink = link;

                    console.log(`created a link on ${this.activePort.owner.head.textContent}`);
                },
            };

        ws.root.appendChild(ws.links);
        this.root.appendChild(ws.root);
        this.workspace.push(ws);

        sCss(ws.root, {
            width: `${cf.scl.x}px`,
            height: `${cf.scl.y}px`,
            left: `${cf.pos.x}px`,
            top: `${cf.pos.y}px`,
            backgroundColor: cf.fill,
        });

        sAttr(ws.links, {
            id: `LNK-${id}`,
            class: 'UI-LINKS',
            width: cf.scl.x,
            height: cf.scl.y,
            viewBox: `0 0 ${cf.scl.x} ${cf.scl.y}`,
        });

        ws.root.onmouseenter = () => {
            this.activeWorkspace = ws;
            console.log(`${ws.root.id} became the active workspace`);
        };
        ws.root.onmouseleave = () => {
            console.log(`${ws.root.id} is no longer the active workspace`);
            this.activeWorkspace = this.activeNode = null;
        };

        ws.root.oncontextmenu = () => {
            event.preventDefault();

            if (this.activeLink) {
                const port = (this.activeLink.start || this.activeLink.end);
                console.log(`-> discarded link from ${port.owner.head.textContent}`);
                port.link = null;
                rifa(this.activeLink, port.owner.links);
                ws.links.removeChild(this.activeLink.svg);
                this.activeLink = null;
            }
            else if (!this.toolbox.visible && event.target === ws.root) this.toolbox.show();
        };

        ws.root.onmousemove = () => {
            // animate active node with cursor
            if (this.activeNode) {
                sCss(this.activeNode.root, {
                    left: `${Math.round(Math.min(
                        gCss(ws.root).width - gCss(this.activeNode.root).width - cf.pad,    // max dx
                        Math.max(cf.pad /* min dx */, relCursor(ws.root).x - this.activeNode.offset.x)
                    ))}px`,
                    top: `${Math.round(Math.min(
                        gCss(ws.root).height - gCss(this.activeNode.root).height - cf.pad,  // max dy
                        Math.max(cf.pad /* min dy */, relCursor(ws.root).y - this.activeNode.offset.y)
                    ))}px`,
                });

                this.activeNode.links.forEach(link => link.update());
            }

            else if (this.activeLink) this.activeLink.update();
        };
    }
}

class Utility {
    constructor() {
        // unique id
        this.uid = prefix => {
            // non-zero random scalar
            const nzrs = () => Math.random() || this.nzrs();

            // random string
            const rs = `${prefix ? `${prefix}-` : ''}${nzrs().toString(36).slice(-3)}`;

            if (Array.from(document.documentElement.getElementsByTagName('*')).some(el => prefix ? el.id == rs : el.id.endsWith(`-${rs}`))) return this.uid(prefix);
            return rs;
        };

        // element array queries
        this.elarr = arr => {
            arr = Array.from(arr);
            if (!Array.isArray(arr)) throw new Error('the elarr method expects and array like object');

            return {
                get maxWidth() {
                    return Math.max(...arr.map(el => gCss(el).width));
                },
            };
        };

        // flatten array
        this.flarr = arr => {
            return {
                get shallow() { return arr.reduce((acc, val) => acc.concat(val), []); },
                get deep() { return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flarr(val)) : acc.concat(val), []); },
            };
        };

        // get item from array
        this.gifa = (arr, i) => i < 0 ? arr[arr.length + i] : arr[i];

        // remove item from array
        this.rifa = (item, arr) => arr.splice(arr.indexOf(item), 1);

        // set & get attribute
        this.sAttr = (el, details) => Object.entries(details).forEach(entry => el.setAttribute(entry[0].replace(/([A-Z])/g, '-$1').toLowerCase(), entry[1].toString()));
        this.gAttr = el => {
            return new Proxy(
                {
                    get x() { return parseFloat(el.getAttribute('x')); },
                    get y() { return parseFloat(el.getAttribute('y')); },
                    get width() { return parseFloat(el.getAttribute('width')) || el.getBBox().width; },
                    get height() { return parseFloat(el.getAttribute('height')) || el.getBBox().height; },
                }, {
                    get: (o, attr) => attr in o ? o[attr] : el.getAttribute(attr),
                }
            );
        };

        // set & get css style
        this.sCss = (el, details) => Object.entries(details).forEach(entry => el.style[entry[0]] = entry[1]);
        this.gCss = el => {
            const
                cs = window.getComputedStyle(el),
                val = p => cs.getPropertyValue(p),
                box = el => el.getBoundingClientRect();

            return new Proxy(
                {
                    get width() { return (parseFloat(val('width')) || box(el).width); },
                    get height() { return (parseFloat(val('height')) || box(el).height); },
                    get left() { return (parseFloat(val('left')) || box(el).left); },
                    get top() { return (parseFloat(val('top')) || box(el).top); },
                }, {
                    get: (o, p) => p in o ? o[p] : val(p.replace(/([A-Z])/g, '-$1'.toLowerCase())),
                }
            );
        };

        // relative cursor position
        this.relCursor = (ref, cf) => {
            if (ref && ref.nodeType != 1) throw new Error('the relCursor method expects an HTML element as argument');

            const refBox = (ref || document.body).getBoundingClientRect();

            let pos = {
                x: event.clientX - refBox.left + window.scrollX,
                y: event.clientY - refBox.top + window.scrollY,
            };

            return this.applyConfig(pos, cf, refBox);
        };

        // relative element position
        this.relPos = (el, ref, cf) => {
            const
                elBox = el.getBoundingClientRect(),
                refBox = ref.getBoundingClientRect();

            let pos = {
                x: elBox.left - refBox.left + window.scrollX,
                y: elBox.top - refBox.top + window.scrollY,
            };

            return this.applyConfig(pos, cf, elBox);
        };

        // apply general configurations for 2D vector
        this.applyConfig = (v2, cf, ref) => {
            if (/cog/.test(cf)) {
                if (!ref) throw new Error('a reference bounding box is required to calculate centre of gravity.');
                v2.x += ref.width / 2;
                v2.y += ref.height / 2;
            }

            if (/round/.test(cf)) {
                v2.x = Math.round(v2.x);
                v2.y = Math.round(v2.y);
            }

            if (/abs/.test(cf)) {
                v2.x = Math.abs(v2.x);
                v2.y = Math.abs(v2.y);
            }

            return v2;
        };

        // new svg element
        this.newSVG = type => document.createElementNS('http://www.w3.org/2000/svg', type);

        // new element
        this.newElement = (type, attr) => {
            const el = document.createElement(type);
            Object.assign(el, attr);
            return el;
        };

        // convert string to camel case
        this.camelize = str => {
            if (!/\s/.test(str.trim())) return str;
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        };

        // make width & height integer
        this.trimScale = (...o) => {
            if (o.length === 1) o = o[0];
            Object.values(o).forEach(el => {
                if (el.nodeType === 1) this.sCss(el, {
                    width: `${Math.ceil(this.gCss(el).width)}px`,
                    height: `${Math.ceil(this.gCss(el).height)}px`,
                });
            });
        };
    }
}