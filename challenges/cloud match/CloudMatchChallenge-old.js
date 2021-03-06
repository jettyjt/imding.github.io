const ChallengeType = Object.freeze(
    {
        SequentialSelect: 1, // Select a list of cards in order (e.g. "1", "2", "3"), with no extra cards
        GroupSelect: 2, // Select cards (in order or out of order) from multiple categories (e.g. "1", "2", "3" then "a", "b", "c"), with no extra cards
        PairMatch: 3, // Pair match is when there are n pairs exactly and all pairs must be matched (e.g. "duck" -> "animal", "house" -> "building")
        SingleGroupSelect: 4, // Select one group of words, where there are extra words that shouldn't be selected
    }
);

const ContentType = Object.freeze({ text: 1, picture: 2 });

class CloudMatchChallenge {

    constructor(challengeType) {

        this.cards = [];

        this.progressionData = {};

        this.container = null;
        this.messageLabel = null;
        this.outlineDiv = null;

        this.challengeType = challengeType;

        this.requirements = {};

        this.info = {}; // Passed in by user

        this.events = ['win'];
        this.handlers = {};

        this.errors = 0;

        /**                                                                                 **/
        /* The following switch outlines the required information for each type of Challenge */
        /**                                                                                 **/
        switch (this.challengeType) {
            case ChallengeType.SequentialSelect:
                this.requirements.content = ['Array']; // Array of data (e.g. ["1", "2", "3"]), must be in order
                this.requirements.prompt = 'String'; // Message prompting the user to complete a task (e.g. "Select the numbers from lowest to highest")
                break;
            case ChallengeType.GroupSelect:
                this.requirements.categoryContent = [['2D Array']]; // 2D Array containing the content for each category (e.g. [["1", "2", "3"], ["a", "b", "c"]]), categories will be prompted in the order specified in the array
                this.requirements.cardsInOrder = Boolean(); // Boolean indicating whether cards within a category need to be selected sequentially or can be selected in any order until all are selected
                this.requirements.prompts = ['Array']; // Array containing the prompt for each category (e.g. ["Select the numbers from lowest to highest", ...]), the order must correspond to the category it goes with from the category content
                break;
            case ChallengeType.PairMatch:
                this.requirements.pairs = [['2D Array']]; // 2D Array containing a list of the pairs (which are a list of two cards) (e.g. [["duck", "duckling"], ["chicken", "chick"]])
                this.requirements.prompt = 'String'; // Message prompting the user how to match the pairs (e.g. "Match the baby animal with its parent")
                break;
            case ChallengeType.SingleGroupSelect:
                this.requirements.selectableGroup = ['Array']; // Array of data to be selected by the user (e.g. ["cabbage", "carrot", "lettuce"])
                this.requirements.decoyGroup = ['Array']; // Array of data that is not to be selected since it doesn't fit the "group" (e.g. ["tire", "phone", "apple"])
                this.requirements.prompt = 'String'; // Message prompting the user which group to select (e.g. "Select all of the vegetables from below")
                break;
        }
        this.requirements.winMessage = 'String'; // Message displayed when the challenge-completer finishes all of the tasks
        this.requirements.showScore = Boolean(); // Show score after finishing all of the tasks

        console.log('Parameters to fill in:');
        Object.entries(this.requirements).forEach(pair => {
            console.log('    ' + pair[0] + ': ' + pair[1].toString());
        });

    }

    on(eventName, handler) {
        if (!this.events.includes(eventName)) {
            console.warn(`The '${eventName}' event does not exist for this class.`);
        }
        else if (this.handlers.hasOwnProperty(eventName)) {
            this.handlers[eventName].push(handler);
        }
        else {
            this.handlers[eventName] = [handler];
        }
    }

    static dispatch(eventName, handlers) {
        if (handlers.hasOwnProperty(eventName)) {
            handlers[eventName].forEach(handler => setTimeout(handler, 0));
        }
    }

    start() {
        this.fulfillRequirements();
        this.showCards();
    }

    // For setting the required information
    set() {
        return this.info;
    }

    fulfillRequirements() {

        const data = this.info;

        const requirementsMet = Object.keys(this.requirements).every(key => {
            if (key in data) {

                // If checking for a 1D or 2D array
                if (typeof this.requirements[key] === 'object') {

                    // If a 1D array is required
                    if (this.requirements[key][0].constructor !== Array) {

                        // Check if a 1D array was passed in (and is not empty)
                        if (this.requirements[key].constructor === data[key].constructor && data[key].length && data[key][0].constructor !== Array) {
                            return true;
                        } else {
                            const array1DAlert = new Alert('Your value for "' + key + '" does not match the expected type of: Array');
                            array1DAlert.show();
                        }

                    } else { // If a 2D array is required

                        if (typeof data[key][0] === 'undefined') {
                            const array2DAlert = new Alert('Your value for "' + key + '" does not match the expected type of: 2D Array');
                            array2DAlert.show();
                        }

                        // Check if a 2D array was passed in
                        if (this.requirements[key][0].constructor === data[key][0].constructor) {

                            if (this.challengeType === ChallengeType.PairMatch) {

                                const areValidPairs = data[key].every(pair => {
                                    return pair.length === 2 && pair.constructor === Array;
                                });

                                if (areValidPairs) {
                                    return true;
                                } else {

                                    const pairsAlert = new Alert('Your value for "pairs" does not contain a valid array of pairs');
                                    pairsAlert.show();

                                }

                            } else if (this.challengeType === ChallengeType.GroupSelect) {

                                const areValidCategories = data[key].every(pair => {
                                    return pair.length >= 2 && pair.constructor === Array;
                                }) && data[key].length > 1;

                                if (areValidCategories) {
                                    return true;
                                } else {

                                    const pairsAlert = new Alert('Your value for "categoryContent" does not contain valid categories of information');
                                    pairsAlert.show();

                                }

                            }

                        } else {
                            const array2DAlert = new Alert('Your value for "' + key + '" does not match the expected type of: 2D Array');
                            array2DAlert.show();
                        }

                    }

                }

                if (typeof this.requirements[key] == typeof data[key]) {
                    return true;
                } else {
                    const valueAlert = new Alert('Your value for "' + key + '" does not match the expected type of: ' + typeof this.requirements[key]);
                    valueAlert.show();
                }

            } else {
                const keyAlert = new Alert('You are missing the parameter: "' + key + '"');
                keyAlert.show();
            }
        });

        // Check for data congruency after initial checks
        if (requirementsMet) {

            Object.keys(data).forEach(key => {
                if (!(key in this.requirements)) { // If there is an extra parameter passed in
                    const keyAlert = new Alert('You have included a superfluous parameter: "' + key + '"');
                    keyAlert.show();
                }
            });

            if (this.challengeType === ChallengeType.GroupSelect) {
                // If the prompts length doesn't make the categoryContent length
                if (data.prompts.length !== data.categoryContent.length) {
                    const mismatchAlert = new Alert('The number of prompts does not match the number of categories');
                    mismatchAlert.show();
                }
            }

        }

        if (requirementsMet) {
            console.log('Correct parameters given. Challenge ready for use.');
            this.parseInformation(data);
        }

    }

    parseInformation(data) {

        switch (this.challengeType) {
            case ChallengeType.SequentialSelect:

                this.progressionData.content = [];
                data.content.forEach(item => {
                    const card = new CloudCard(item);

                    const handler = this.cardTapped;
                    const instance = this;
                    card.addClickHandler(function () {
                        handler(this.card, instance);
                    });

                    this.cards.push(card);
                    this.progressionData.content.push(card);
                });
                this.progressionData.currentTarget = this.cards[0];
                this.progressionData.currentPrompt = data.prompt;
                this.progressionData.winMessage = data.winMessage;
                this.progressionData.data = data;

                break;
            case ChallengeType.GroupSelect:

                this.progressionData.content = [];
                data.categoryContent.forEach((category, i) => {

                    this.progressionData.content.push([]);
                    category.forEach(item => {
                        const card = new CloudCard(item, i + 1);

                        const handler = this.cardTapped;
                        const instance = this;
                        card.addClickHandler(function () {
                            handler(this.card, instance);
                        });

                        this.cards.push(card);
                        this.progressionData.content[i].push(card);
                    });

                });

                this.progressionData.currentGroup = 1;
                this.progressionData.currentPrompt = data.prompts[this.progressionData.currentGroup - 1];
                this.progressionData.inOrder = data.cardsInOrder;
                this.progressionData.count = 0;
                if (this.progressionData.inOrder) {
                    this.progressionData.currentTarget = this.cards[0];
                }
                this.progressionData.winMessage = data.winMessage;
                this.progressionData.data = data;

                break;
            case ChallengeType.PairMatch:

                this.progressionData.content = [];
                data.pairs.forEach((pair, i) => {

                    this.progressionData.content.push([]);
                    pair.forEach(item => {
                        const card = new CloudCard(item, i + 1);

                        const handler = this.cardTapped;
                        const instance = this;
                        card.addClickHandler(function () {
                            handler(this.card, instance);
                        });

                        this.cards.push(card);
                        this.progressionData.content[i].push(card);
                    });

                });
                this.progressionData.currentPrompt = data.prompt;
                this.progressionData.currentTarget = null;
                this.progressionData.count = 0;
                this.progressionData.winMessage = data.winMessage;
                this.progressionData.data = data;

                break;
            case ChallengeType.SingleGroupSelect:

                this.progressionData.content = [];
                data.selectableGroup.forEach(item => {
                    const card = new CloudCard(item, 1);

                    const handler = this.cardTapped;
                    const instance = this;
                    card.addClickHandler(function () {
                        handler(this.card, instance);
                    });

                    this.cards.push(card);
                    this.progressionData.content.push(card);
                });

                data.decoyGroup.forEach(item => {
                    const card = new CloudCard(item, 2);

                    const handler = this.cardTapped;
                    const instance = this;
                    card.addClickHandler(function () {
                        handler(this.card, instance);
                    });

                    this.cards.push(card);
                });
                this.progressionData.currentPrompt = data.prompt;
                this.progressionData.currentGroup = 1;
                this.progressionData.count = 0;
                this.progressionData.winMessage = data.winMessage;
                this.progressionData.data = data;

                break;
        }

    }

    showCards() {

        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';

        const container = document.createElement('div');
        document.body.appendChild(container);

        this.container = container;

        this.container.style.position = 'absolute';

        this.addCardsToContainer();


        // The dimensions of the container based on how many cards are present
        let boundingBox = this.defineBoundingBox();

        // Resize the container to match this box
        this.resizeContainer(boundingBox);
        //return;

        const placedCards = [];

        // Place each card on the screen
        this.cards.forEach(card => {

            let tryCount = 0;

            let isOverlap = false;

            do {

                tryCount++;

                // Get random point in the bounding box
                const randomPoint = this.randomPointInBox(boundingBox, card);

                card.setPosition(randomPoint.x, randomPoint.y);

                // Check if the current card being placed overlaps with any previously-placed card
                isOverlap = placedCards.some(placedCard => {
                    return card.isOverlap(placedCard);
                });

                if (tryCount % 20 === 0) {
                    boundingBox.width += 10;
                    boundingBox.height += 10;
                    this.resizeContainer(boundingBox);

                    this.cards.forEach(card => {
                        card.setPosition(card.corners.topLeft.x + 5, card.corners.topLeft.y + 5);
                    });

                }


            } while (isOverlap);

            placedCards.push(card);

        });

        const outlineDiv = document.createElement('div');
        document.body.appendChild(outlineDiv);

        this.outlineDiv = outlineDiv;

        const messageLabel = document.createElement('div');
        document.body.appendChild(messageLabel);

        this.messageLabel = messageLabel;

        this.updateMessageLabel(this.progressionData.currentPrompt);

    }

    // Determines behavior when a card is tapped on, based on the type of challenge
    cardTapped(card, instance) {

        switch (instance.challengeType) {
            case ChallengeType.SequentialSelect:
                if (instance.progressionData.currentTarget === card) {
                    card.hide();
                    if (card === instance.cards[instance.cards.length - 1]) {
                        // Challenge finished
                        instance.updateMessageLabel(instance.progressionData.winMessage);
                        return;
                    }
                    instance.progressionData.currentTarget = instance.cards[instance.cards.indexOf(card) + 1];
                } else {
                    instance.wrongCard(card);
                }
                break;
            case ChallengeType.GroupSelect:
                if (instance.progressionData.inOrder) {

                    if (card === instance.progressionData.currentTarget) {
                        card.hide();
                        if (card === instance.cards[instance.cards.length - 1]) {
                            // Challenge finished
                            instance.updateMessageLabel(instance.progressionData.winMessage);
                            return;
                        }
                        instance.progressionData.currentTarget = instance.cards[instance.cards.indexOf(card) + 1];
                        if (instance.progressionData.currentTarget.group > card.group) { // If the group has now changed
                            instance.progressionData.currentGroup = instance.progressionData.currentTarget.group;
                            instance.progressionData.currentPrompt = instance.progressionData.data.prompts[instance.progressionData.currentGroup - 1];
                            instance.updateMessageLabel(instance.progressionData.currentPrompt);
                        }
                    } else {
                        instance.wrongCard(card);
                    }
                } else {
                    if (card.group === instance.progressionData.currentGroup) {
                        instance.progressionData.count += 1;
                        card.hide();
                        if (card.group === instance.progressionData.data.categoryContent.length && instance.progressionData.count == instance.progressionData.data.categoryContent[instance.progressionData.currentGroup - 1].length) {
                            // Challenge finished
                            instance.updateMessageLabel(instance.progressionData.winMessage);
                            return;
                        }
                        if (instance.progressionData.count == instance.progressionData.content[instance.progressionData.currentGroup - 1].length) { // If the group has now changed
                            instance.progressionData.count = 0;
                            instance.progressionData.currentGroup += 1;
                            instance.progressionData.currentPrompt = instance.progressionData.data.prompts[instance.progressionData.currentGroup - 1];
                            instance.updateMessageLabel(instance.progressionData.currentPrompt);
                        }
                    } else {
                        instance.wrongCard(card);
                    }
                }

                break;
            case ChallengeType.PairMatch:

                if (instance.progressionData.currentTarget) { // If something has been selected already

                    // If they re-selected the same card
                    if (card === instance.progressionData.currentTarget) {
                        instance.progressionData.currentTarget.deselect();
                        instance.progressionData.currentTarget = null;
                    } else if (instance.progressionData.content[instance.progressionData.currentTarget.group - 1].includes(card)) { // If it is the other card in the pair
                        card.select();
                        setTimeout(function () {
                            card.hide();
                            instance.progressionData.currentTarget.hide();
                            instance.progressionData.currentTarget = null;
                            instance.progressionData.count += 1;

                            if (instance.progressionData.count === instance.progressionData.content.length) {
                                // Challenge finished
                                instance.updateMessageLabel(instance.progressionData.winMessage);
                                return;
                            }

                        }, 200);
                    } else {
                        card.select();

                        setTimeout(function () {
                            instance.progressionData.currentTarget.shake();
                            instance.wrongCard(card);
                            instance.progressionData.currentTarget.deselect();
                            card.deselect();
                            instance.progressionData.currentTarget = null;
                        }, 200);
                    }
                } else {
                    instance.progressionData.currentTarget = card;
                    instance.progressionData.currentTarget.select();
                }

                break;
            case ChallengeType.SingleGroupSelect:

                if (card.group === instance.progressionData.currentGroup) {
                    card.hide();
                    instance.progressionData.count += 1;
                    if (instance.progressionData.count === instance.progressionData.content.length) {
                        // Challenge finished
                        instance.updateMessageLabel(instance.progressionData.winMessage);
                        return;
                    }
                } else {
                    instance.wrongCard(card);
                }

                break;
        }

    }

    wrongCard(card) {
        card.shake();
        this.errors++;
    }

    addCardsToContainer() {
        this.cards.forEach(card => {
            card.addTo(this.container);
        });
    }

    updateMessageLabel(message) {

        this.messageLabel.textContent = message;
        this.messageLabel.style.position = 'absolute';
        this.messageLabel.style.width = `${this.container.offsetWidth * 1.2}px`;
        this.messageLabel.style.height = 'auto';
        this.messageLabel.style.left = `${this.container.offsetLeft - 0.1 * this.container.offsetWidth}px`;
        this.messageLabel.style.color = '#00ADAD';
        this.messageLabel.style.fontSize = '20px';
        this.messageLabel.style.fontFamily = 'arial';
        this.messageLabel.style.textAlign = 'center';
        this.messageLabel.style.padding = '10px 0';
        this.messageLabel.style.boxShadow = '0 2px 2px grey';
        this.messageLabel.style.backgroundColor = '#E5E5E5';
        this.messageLabel.style.top = `${this.container.offsetTop - 1.5 * this.messageLabel.offsetHeight}px`;

        const outlineCSS = {
            position: 'absolute',
            width: `${this.messageLabel.offsetWidth - 2}px`,
            height: `${(this.container.offsetHeight + (this.container.offsetTop - this.messageLabel.offsetTop)) * 1.1}px`,
            left: `${this.messageLabel.offsetLeft}px`,
            top: `${this.messageLabel.offsetTop}px`,
            border: '1px solid black',
            backgroundColor: 'transparent',
            zIndex: -1
        };

        Object.assign(this.outlineDiv.style, outlineCSS);

        if (message === this.info.winMessage) {
            CloudMatchChallenge.dispatch('win', this.handlers);
            if (this.info.showScore) {
                const content = (this.info.content || this.info.pairs || this.info.selectableGroup);
                if (content) {
                    this.messageLabel.innerHTML += ` <br>Your score: ${Math.round(Math.max(0, (1 - this.errors / content.length)) * 100)}%`;
                }
                else {
                    let counter = 0;
                    this.info.categoryContent.forEach(a => counter += a.length);
                    if (counter) {
                        this.messageLabel.innerHTML += ` <br>Your score: ${Math.round(Math.max(0, (1 - this.errors / counter)) * 100)}%`;

                    }
                }
            }
        }
    }

    resizeContainer(box) {

        this.container.style.width = `${box.width}px`;
        this.container.style.height = `${box.height}px`;

        this.container.style.left = `${window.innerWidth / 2 - box.width / 2}px`;
        this.container.style.top = `${window.innerHeight / 2 - box.height / 2}px`;

    }

    defineBoundingBox() {

        let totalWidth = 0;
        let totalHeight = 0;

        let cardCount = this.cards.length;

        this.cards.forEach(card => {
            totalWidth += card.width;
            totalHeight += card.height;
        });

        const averageWidth = totalWidth / cardCount;
        const averageHeight = totalHeight / cardCount;

        return {
            width: averageWidth * this.nextSquareWidth(cardCount * 2),
            height: averageHeight * this.nextSquareWidth(cardCount * 2)
        };

    }

    randomPointInBox(box, card) {

        const validX = box.width - card.width;
        const validY = box.height - card.height;

        return {
            x: Math.random() * validX,
            y: Math.random() * validY
        };

    }

    nextSquareWidth(n) {
        for (var i = 1; i <= n; i++) {
            if (Math.pow(i, 2) > n) {
                return i + 1;
            }
        }
    }


}

class CloudCard {

    constructor(content, group = 0) {

        this.content = content;

        if (this.content.substring(0, 4) === 'http') {
            this.contentType = ContentType.picture;
        } else {
            this.contentType = ContentType.text;
        }

        this.domElement = null;
        this.card = null;

        this.group = group;

        this.init();
    }

    init() {

        if (this.contentType === ContentType.picture) {
            const element = document.createElement('div');

            const cardCSS = {
                position: 'absolute',
                width: '50px',
                height: '50px',
                borderRadius: '3px',
                boxShadow: '2px 2px 2px grey',
                color: '#00ADAD',
                fontSize: '0px',
                webkitTouchCallout: 'none', /* iOS Safari */
                webkitUserSelect: 'none', /* Safari */
                khtmlUserSelect: 'none', /* Konqueror HTML */
                mozUserSelect: 'none', /* Firefox */
                msUserSelect: 'none', /* Internet Explorer/Edge */
                userSelect: 'none' /* Non-prefixed version, currently supported by Chrome and Opera */
            };

            Object.assign(element.style, cardCSS);

            const image = document.createElement('img');
            image.src = this.content;

            element.appendChild(image);

            const imageCSS = {
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            };

            Object.assign(image.style, imageCSS);

            this.domElement = element;

            element.card = this;

            return;
        }

        const element = document.createElement('div');
        //element.className = "card";

        const cardCSS = {
            position: 'absolute',
            padding: '6px 8px 6px 8px',
            borderRadius: '3px',
            boxShadow: '2px 2px 2px grey',
            fontFamily: 'arial',
            fontWeight: '500',
            fontSize: '16px',
            textAlign: 'center',
            backgroundColor: '#F2F2F2',
            color: '#00ADAD',
            webkitTouchCallout: 'none', /* iOS Safari */
            webkitUserSelect: 'none', /* Safari */
            khtmlUserSelect: 'none', /* Konqueror HTML */
            mozUserSelect: 'none', /* Firefox */
            msUserSelect: 'none', /* Internet Explorer/Edge */
            userSelect: 'none' /* Non-prefixed version, currently supported by Chrome and Opera */
        };

        Object.assign(element.style, cardCSS);

        element.textContent = this.content;

        this.domElement = element;

        element.card = this;

    }

    setPosition(x, y) {

        this.domElement.style.left = `${x}px`;
        this.domElement.style.top = `${y}px`;

    }

    isOverlap(card) {

        // Get top-left and bottom-right coordinates of each card
        const l1 = this.cornersPadded.topLeft;
        const r1 = this.cornersPadded.bottomRight;
        const l2 = card.cornersPadded.topLeft;
        const r2 = card.cornersPadded.bottomRight;

        // If any card is totally to the left of the other
        if (l1.x > r2.x || l2.x > r1.x) return false;

        // If any card is totally below the other
        if (l1.y > r2.y || l2.y > r1.y) return false;

        // Otherwise, there is overlap
        return true;
    }

    addTo(element) {
        element.appendChild(this.domElement);
    }

    addClickHandler(handler) {
        this.domElement.onclick = handler;
    }

    shake() {
        const div = this.domElement;

        div.style.transitionDuration = '0.05s';
        div.style.transform = 'rotate(5deg)';

        setTimeout(function () {
            div.style.transform = 'rotate(-5deg)';

            setTimeout(function () {
                div.style.transform = 'rotate(0deg)';
            }, 100);
        }, 100);

        div.style.transitionDuration = '0s';
    }

    hide() {
        this.domElement.style.visibility = 'hidden';
    }

    select() {
        if (this.contentType === ContentType.text) {
            this.domElement.style.backgroundColor = '#C6C6C6';
        } else {
            this.domElement.style.filter = 'brightness(70%)';
        }
    }

    deselect() {
        if (this.contentType === ContentType.text) {
            this.domElement.style.backgroundColor = '#F2F2F2';
        } else {
            this.domElement.style.filter = 'brightness(100%)';
        }
    }

    getContent() {
        return this.domElement.textContent;
    }

    get corners() {
        return {
            topLeft: {
                x: this.domElement.offsetLeft,
                y: this.domElement.offsetTop
            },
            bottomRight: {
                x: this.domElement.offsetLeft + this.domElement.offsetWidth,
                y: this.domElement.offsetTop + this.domElement.offsetHeight
            }
        };
    }

    get cornersPadded() {
        return {
            topLeft: {
                x: this.corners.topLeft.x - CloudCard.padding,
                y: this.corners.topLeft.y - CloudCard.padding
            },
            bottomRight: {
                x: this.corners.bottomRight.x + CloudCard.padding,
                y: this.corners.bottomRight.y + CloudCard.padding
            }
        };
    }

    get width() {
        return this.domElement.offsetWidth;
    }

    get height() {
        return this.domElement.offsetHeight;
    }

    static get padding() {
        return 10; // pixels
    }

}

class Alert {

    constructor(message) {

        this.message = message;

    }

    show() {

        const blurDiv = document.createElement('div');

        const blurCSS = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            opacity: '0.7',
            zIndex: '1'
        };
        Object.assign(blurDiv.style, blurCSS);

        const alert = document.createElement('div');

        const alertCSS = {
            position: 'absolute',
            height: '100px',
            width: '600px',
            border: '1px solid black',
            borderRadius: '10px',
            backgroundColor: 'white',
            zIndex: '2'
        };
        Object.assign(alert.style, alertCSS);

        const img = document.createElement('img');
        img.src = 'https://cdn1.iconfinder.com/data/icons/smallicons-controls/32/614338-.svg-512.png';

        const imgCSS = {
            position: 'absolute',
            width: '40px',
            height: '40px'
        };
        Object.assign(img.style, imgCSS);

        const text = document.createElement('p');
        text.className = 'alertText';
        text.textContent = this.message;

        const textCSS = {
            position: 'absolute',
            width: '600px',
            textAlign: 'center',
            fontFamily: 'arial',
            fontSize: '16px',
            margin: '0'
        };
        Object.assign(text.style, textCSS);

        alert.appendChild(text);
        alert.appendChild(img);
        document.body.appendChild(alert);
        document.body.appendChild(blurDiv);

        img.style.left = `${alert.offsetWidth / 2 - img.offsetWidth / 2}px`;
        img.style.top = '10px';

        text.style.left = '0px';
        text.style.top = '65px';

        alert.style.left = `${window.innerWidth / 2 - alert.offsetWidth / 2}px`;
        alert.style.top = `${window.innerHeight / 2 - alert.offsetHeight / 2}px`;

        throw Error;

    }


}