loading();

function loading() {
    if (document.body) init();
    else setTimeout(loading, 500);
}

function init() {
    // add utility functions to window object
    Object.assign(window, new Utility());

    // display app container
    sCss(document.body, { visibility: 'visible' });

    const nodesData = [
        ['Day 1', [
            'Introduction',
            //  what are web applications & how to build one
            //  the browser & web languages
            //  inspect element

            '>> HTML Basics',
            //  build/clone a web page
            //  add text, links, images and shapes

            '>> CSS Basics',
            //  size: width, height, border, padding, box-sizing
            //  position: margin, absolute, relative, left, top
            //  appearance: color & images
            //  id & class selectors

            '>> CSS Intermediate',
            //  the vw & vh unit
            //  calc() function
            //  multiple selectors
        ]],
        ['>> Day 2', [
            'Game UI',
            //  guided project: build the UI of the game without any functionality

            '>> Logic Flow',
            //  unplugged: how to build it
            //  make flowchart for the burger game

            '>> JS Basics',
            //  variables & functions
            //  arithmetic operators
            //  sandbox: dynamic greeting message

            '>> Handling Events',
            //  unplugged: reaction game
            //  sandbox: listener & handlers
            //  guided project: clicker game
        ]],
        ['>> Day 3', [
            'The DOM',
            //  sandbox: the querySelector & querySelectorAll functions

            '>> JS Styling',
            //  sandbox: .style syntax
            //  guided project: pacman controller

            '>> The Array',
            //  guide project: light bulb on & off - toggling light & adding more lights

            '>> Using Loops',
            //  for loop
            //  forEach function
        ]],
        ['>> Day 4', [
            'JS Intermediate',
            //  scope

            '>> Game Mechanics',
            //  guided project to 

            '>> CSS Animation',
            //  animation property in CSS
            //  animation events in JS
        ]],
        ['>> Day 5', [
            'Customisation',
            '>> Test & Debug',
            '>> Tournament',
            '>> Presentation',
        ]],
    ];

    const cardsData = {
        introduction: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Welcome and set expectations.' },
                    { type: 'p', html: 'Intro to the [web languages::https://youtu.be/gT0Lh1eYk78].' },
                    { type: 'p', html: 'Look under the hood of a popular [web game::http://slither.io] using [em::inspect element].' },
                    { type: 'p', html: 'Set up [em::user accounts] on the platform.' },
                    { type: 'p', html: 'Explain [em::projects] & [em::sandbox] modes.' },
                ],
            }],
        }],
        htmlBasics: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'In sandbox mode, clone the popular [Google page::http://www.google.com].' },
                    { type: 'p', html: 'Achieve the HTML part of this [sandbox::https://app-staging.bsd.education/sandbox/DsDXJbE1].' },
                    { type: 'p', html: 'Quiz the class on terminologies such as [em::elements], [em::tags], [em::attributes] & [em::content].' },
                    { type: 'p', html: 'Demonstrate how [samp::id] & [samp::class] names can help manage HTML elements, involve [em::minimal CSS] here.' },
                    { type: 'p', html: 'Challenge the class to [em::debug] broken HTML code.' },
                ],
            }],
        }],
        cssBasics: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Break the role of CSS down into 3 categories: [em::size], [em::position] & [em::appearance].' },
                    { type: 'p', html: 'Continue with the Google clone [sandbox::https://app-staging.bsd.education/sandbox/DsDXJbE1] and faithfully reproduce the original by [em::adding CSS].' },
                ],
            }],
        }, {
            title: 'Size',
            sections: [{
                content: [
                    { type: 'p', html: 'Use [samp::width] & [samp::height] to change the size of images, point out the technique to maintain [em::aspect ratio].' },
                    { type: 'p', html: 'Use [samp::max-] & [samp::min-] to clamp sizing values.' },
                    { type: 'p', html: 'The [samp::border] property is another property that will change the size of elements, point out how it can be split into [samp::-width], [samp::-color] & [samp::-style].' },
                    { type: 'p', html: 'Use the [samp::margin] & [samp::padding] to add space outside/inside of elements, expand on the [em::4 values] format.' },
                    { type: 'p', html: 'Explain how the [samp::box-sizing] property affects element sizing.' },
                ],
            }],
        }, {
            title: 'Position',
            sections: [{
                content: [
                    { type: 'p', html: 'The [samp::position] property must be set to [samp::absolute] or [samp::relative] before [samp::left], [samp::right], [samp::top] & [samp::bottom] properties are available.' },
                    { type: 'p', html: 'Use [samp::absolute] & [samp::relative] on nested elements for [em::more control].' },
                    { type: 'p', html: 'Use [samp::flex] techniques to perfectly fit multiple elements into a [samp::<div>].' },
                ],
            }],
        }, {
            title: 'Appearance',
            sections: [{
                content: [
                    { type: 'p', html: 'Text related properties such as [samp::color], [samp::font-family], [samp::font-size] & [samp::text-align].' },
                    { type: 'p', html: 'The [samp::background] & related properties: [samp::-color], [samp::-image], [samp::-repeat], [samp::-position] & [samp::-size].' },
                    { type: 'p', html: 'Explain alpha values used in the [samp::rgba] syntax.' },
                    { type: 'p', html: '[samp::border-radius], [samp::opacity] & [samp::outline].' },
                ],
            }],
        }],
        cssIntermediate: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Explain how the [samp::vw] & [samp::vh] units work.' },
                    { type: 'p', html: 'Teach how to work with the [samp::calc] function in CSS.' },
                    { type: 'p', html: 'Apply a single CSS rule using [em::multiple selectors].' },
                ],
            }],
        }],
        gameUi: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Start the [guided project::#][sup::wip] to build the burger game interface.' },
                ],
            }],
        }],
        logicFlow: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Introduce the concept of [em::flowchart].' },
                    { type: 'p', html: '[u::Hands-on]: make the flowchart for the burger game.' },
                ],
            }],
        }],
        jsBasics: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Teach [em::variables] & [em::functions] using this [sandbox::https://app-staging.bsd.education/sandbox/JUaYsStN].' },
                    { type: 'p', html: 'Explain [em::arithmetic operators].' },
                    { type: 'p', html: 'Demonstrate the [samp::return] syntax.' },
                ],
            }],
        }],
        handlingEvents: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Introduce the concept of [em::events], [em::listeners] & [em::handlers].' },
                    { type: 'p', html: '[u::Unplugged]: react to this [sandbox::https://app-staging.bsd.education/sandbox/f6jrgMR1].' },
                    { type: 'p', html: 'For [em::mouse events], walkthrough creating the [clicker game::https://app-staging.bsd.education/sandbox/vyzy5j93] with the class.' },
                    { type: 'p', html: 'For [em::keyboard events], walkthrough creating the [Pac-man sandbox::https://app-staging.bsd.education/sandbox/SRsSW8UC] with the class.' },
                ],
            }],
        }],
        theDom: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Explain the concept of [em::runtime].' },
                    { type: 'p', html: 'Teach how to add/remove elements from a page using this [sandbox::https://app-staging.bsd.education/sandbox/9Ari2mQ2].' },
                    { type: 'p', html: 'Create composite elements such as a light bulb in this [sandbox::https://app-staging.bsd.education/sandbox/hnqigHcB].' },
                ],
            }],
        }],
        jsStyling: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Introduce the [em::2 techniques] of styling elements using JS.' },
                    { type: 'p', html: '[em::Technique 1]: define CSS rules beforehand and assgin the corresponding [em::id/class] name to newly create elements, which is what the class did in the light bulb exercise.' },
                    { type: 'code', code: 'var el = document.createElement("div");\nel.className = "circle";' },
                    { type: 'p', html: '[em::Technique 2]: directly modify the [samp::style] object of HTMl element in JS, be sure to remove the [samp::"-"] symbol and [em::camelise] the CSS property names, as in the [Pac-man sandbox::https://app-staging.bsd.education/sandbox/SRsSW8UC].' },
                    { type: 'code', code: 'circle.style.backgroundColor = "red";' },
                    { type: 'p', html: 'Pose a [challenge::#][sup::wip] for the class to style a page using JS only.' },
                ],
            }],
        }],
        theArray: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Introduce the concept of [em::arrays].' },
                    { type: 'p', html: 'Provide [em::good example] of an array, i.e. the array represents a category of which each item is a member.' },
                    { type: 'code', code: 'var fruits = ["apple", "orange", "kiwi"];' },
                    { type: 'p', html: 'A [em::bad example] of array:' },
                    { type: 'code', code: 'var things = [42, "car", false]' },
                    { type: 'p', html: 'Teach the class how to work with arrays using the [samp::length], [samp::push], [samp::unshift], [samp::pop] & [samp::shift] methods using this [sandbox::#][sup::wip].' },
                ],
            }],
        }],
        usingLoops: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Introduce [scenarios::#][sup::wip] where it is impractical without loops.' },
                    { type: 'p', html: 'Explain how the [samp::while] loop works using this [sandbox::#][sup::wip].' },
                ],
            }],
        }],
        jsIntermediate: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Explain the concept of [em::scope].' },
                    { type: 'p', html: 'Function [em::arguments] & [em::return] syntax.' },
                ],
            }],
        }],
        cssAnimation: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: 'Introduce the [samp::@keyframes] rule & [samp::animation] property in CSS.' },
                    { type: 'p', html: 'Demonstrate how they [em::work together].' },
                    { type: 'p', html: '.' },
                ],
            }],
        }],
        customisation: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: '.' },
                    { type: 'p', html: '.' },
                ],
            }],
        }],
        testDebug: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: '.' },
                    { type: 'p', html: '.' },
                ],
            }],
        }],
        tournament: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: '.' },
                    { type: 'p', html: '.' },
                ],
            }],
        }],
        presentation: [{
            title: 'Lesson Outline',
            sections: [{
                content: [
                    { type: 'p', html: '.' },
                    { type: 'p', html: '.' },
                ],
            }],
        }],
    };

    pl = new Pipeline(Root);
    pl.render(nodesData, cardsData);
}