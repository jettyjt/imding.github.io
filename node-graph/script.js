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

    // create instance of FloApp
    fl = new Flo();
    fl.render(appContainer);

    run.onclick = () => {
        FBP.define('network', function (F) {

            F.init('add', 'x');
            F.init('add', 'y');
            F.init('mul', 'y');
    
            F.connect('add', 'output', 'mul', 'x');
    
            F.end('mul', 'output');
    
        }).go({
            'add.x': 1,
            'add.y': 2,
            'mul.y': 3
        }, function (err, result) {
            if (err) {
                alert(err);
            } else {
                console.log(result.port); // mul.output
                console.log(result.output); // 9
                console.log(result.interval); // execution time
                console.log(result.profile);
            }
        });
    };
}

class Flo {
    constructor() {
        this.default = {
            toolbox: {
                pos: { x: 0, y: 0 },
                scl: { x: 150, y: 350 },
            },
            workspace: {
                pos: { x: 0, y: 0 },
                scl: { x: 500, y: 350 },
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
            },
            link: {
                stroke: 'skyblue',
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

    render(root) {
        this.root = root;
        this.newToolbox({ pos: { x: 20, y: 120 } });
        this.newWorkspace({ pos: { x: 170, y: 120 } });
    }

    newToolbox(cf) {
        cf = Object.assign(this.default.toolbox, cf || {});

        const tb = {
            root: newElement('div', { id: 'UI-TB' }),
            nodes: [],
            compData: [
                {
                    name: 'number',
                    inPorts: ['a'],
                    outPorts: ['b'],
                    body: function (a, output) {
                        output(null, a);
                    },
                },
                {
                    name: 'add',
                    inPorts: ['a', 'b'],
                    outPorts: ['a + b'],
                    body: function (a, b, output) {
                        output(null, a + b);
                    }
                },
                {
                    name: 'mul',
                    inPorts: ['a', 'b'],
                    outPorts: 'a * b',
                    body: function (a, b, output) {
                        output(null, a * b);
                    }
                },
            ],
        };

        this.root.appendChild(tb.root);
        
        tb.compData.forEach(cd => {
            FBP.component(cd);

            const node = {
                resident: newElement('div', { className: 'UI-TBN', textContent: cd.name }),
                addToWorkspace: () => {
                    this.newNode({
                        pos: relCursor(this.activeWorkspace.root),
                    });
                },
            };

            tb.nodes.push(node);
        });
        
        sCss(tb.root, { visibility: 'hidden' });
        
        this.toolbox = tb;
    }

    newWorkspace(cf) {
        cf = Object.assign(this.default.workspace, cf || {});

        const
            id = uid(),
            ws = {
                root: newElement('div', { id: `WS-${id}`, className: 'UI-WS', textContent: `WS-${id}` }),
                links: newSVG('svg'),
                graph: { nodes: [], links: [], }
            };

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

        sCss(ws.links, {
            left: `${cf.pos.x}px`,
            top: `${cf.pos.y}px`,
        });

        ws.root.onmouseenter = () => this.activeWorkspace = ws;
        ws.root.onmouseleave = () => this.activeWorkspace = this.activeNode = null;

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
            else this.newNode({ pos: relCursor(ws.root) });
        };

        ws.root.onmousemove = () => {
            // animate active node with cursor
            if (this.activeNode) {
                sCss(this.activeNode.root, {
                    left: `${Math.min(
                        gCss(ws.root).width - gCss(this.activeNode.root).width - cf.pad,    // max dx
                        Math.max(cf.pad /* min dx */, relCursor(ws.root).x - this.activeNode.offset.x)
                    )}px`,
                    top: `${Math.min(
                        gCss(ws.root).height - gCss(this.activeNode.root).height - cf.pad,  // max dy
                        Math.max(cf.pad /* min dy */, relCursor(ws.root).y - this.activeNode.offset.y)
                    )}px`,
                });

                this.activeNode.links.forEach(link => link.update());
            }

            else if (this.activeLink) this.activeLink.update();
        };

        this.root.appendChild(ws.root);
        this.root.appendChild(ws.links);
        this.workspace.push(ws);
    }

    newNode(cf) {       // refactor into the newWorkspace method ***
        cf = Object.assign(this.default.node, cf || {});

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
                newPort: cf => {
                    cf = Object.assign(this.default.port, cf || {});

                    const port = {
                        owner: node,
                        dir: cf.dir,
                        link: null,
                        root: newElement('div', { className: 'portRoot' }),
                        socket: newElement('div', { className: 'portSocket' }),
                        type: newElement('div', { className: 'portType', textContent: cf.type || 'any' }),
                        name: newElement('div', { className: 'portName', textContent: cf.name || cf.dir }),
                    };

                    node[port.dir].appendChild(port.root);

                    // append socket and name in different order depending on port direction
                    port.root.appendChild(port.socket);
                    if (port.dir === 'output') port.root.insertBefore(port.name, port.socket);
                    else port.root.appendChild(port.name);

                    sCss(port.socket, {
                        margin: `0 ${port.dir === 'output' ? cf.r : 0}px 0 ${port.dir === 'input' ? cf.r : 0}px`,
                        width: `${cf.r * 2}px`,
                        height: `${cf.r * 2}px`,
                        backgroundColor: this.default.workspace.fill,
                    });

                    sCss(port.name, {
                        margin: `0 ${port.dir === 'output' ? cf.r : 0}px 0 ${port.dir === 'input' ? cf.r : 0}px`,
                    });

                    const
                        portWidth = gCss(port.socket).width + gCss(port.name).width + cf.r * 2 + cf.r * 4,
                        nodeWidth = gCss(node.body).width;

                    sCss(port.root, {
                        width: `${port.dir === 'input' ? portWidth : portWidth < nodeWidth ? nodeWidth : portWidth}px`,
                    });

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
                                this.activeLink.connect(port);
                            }
                        }

                        // else if the clicked port has no link
                        else if (!port.link) {
                            // create a new link
                            this.activePort = port;
                            this.newLink();
                            port.link = this.activeLink;
                            node.links.push(this.activeLink);
                        }

                        // otherwise, pluck the link
                        else {
                            console.log(`plucked a link from ${port.owner.head.textContent}`);
                            port.link[port.dir === 'input' ? 'end' : 'start'] = null;
                            this.activeLink = port.link;
                            port.link = null;
                        }
                    };
                },
            };

        // append elements to document so they have computed CSS values for further calculation
        node.root.appendChild(node.head);
        node.root.appendChild(node.body);
        node.body.appendChild(node.input);
        node.body.appendChild(newElement('hr'));
        node.body.appendChild(node.output);
        if (this.activeWorkspace.root) this.activeWorkspace.root.appendChild(node.root);
        else throw new Error('adding a new node requires an active workspace.');

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
        node.newPort({ dir: 'input', type: 'number', name: 'a' });
        node.newPort({ dir: 'input', type: 'number', name: 'b' });
        node.newPort({ dir: 'output', type: 'number', name: 'a + b' });

        // trim the x & y scale of the following elements
        // order of arguments is important
        trimScale(node.input, node.output, node.body, node.head);

        // calculate x & y scale of the node root element
        const
            fixedWidth = gCss(node.head).width,
            fixedHeight = gCss(node.head).height + gCss(node.body).height;

        sCss(node.root, {
            width: `${fixedWidth}px`,
            height: `${fixedHeight}px`,
            left: `${cf.pos.x - fixedWidth / 2}px`,
            top: `${cf.pos.y - fixedHeight / 2}px`,
        });

        node.head.onmouseup = () => this.activeNode = null;
        node.head.onmousedown = () => {
            this.activeNode = node;
            this.activeNode.offset = relCursor(node.root);
        };

        this.activeWorkspace.graph.nodes.push(node);

        console.log(`created ${node.head.textContent} in ${this.activeWorkspace.root.id}`);
    }

    newLink(cf) {
        cf = Object.assign(this.default.link, cf || {});

        const link = {
            svg: newSVG('path', { id: uid('L') }),
            start: this.activePort.dir === 'output' ? this.activePort : null,
            end: this.activePort.dir === 'input' ? this.activePort : null,
            update: () => {
                const
                    p1 = link.start ? relPos(link.start.socket, this.activeWorkspace.root, 'cog') : relCursor(this.activeWorkspace.root),
                    p2 = link.end ? relPos(link.end.socket, this.activeWorkspace.root, 'cog') : relCursor(this.activeWorkspace.root),
                    // add control points ***
                    c1 = p1,
                    c2 = p2;

                sAttr(link.svg, { d: `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}` });
            },
            connect: port => {
                // port.link is used to prevent multiple connections to the same port
                port.link = link;
                link[link.start ? 'end' : 'start'] = port;
                link.update();
                this.activeLink = null;
                console.log(`-> contection established: ${link.start.name.textContent} -> ${link.end.name.textContent}`);
            },
        };

        sAttr(link.svg, cf);

        this.activeWorkspace.links.appendChild(link.svg);
        this.activeLink = link;

        console.log(`created a link on ${this.activePort.owner.head.textContent}`);
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

            if (Array.from(document.documentElement.getElementsByTagName('*')).some(el => el.id == rs)) return this.uid(prefix);
            return rs;
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