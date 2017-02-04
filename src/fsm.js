class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error("Config is not passed");
        }
        this.config = config;
        this.initial = "normal";
        this.state = this.initial;
        this.undoArr = [];
        this.redoArr = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.undoArr.push(this.state);
        this.redoArr.length = 0;
        for (let statesKey in this.config.states) {
            if (state == statesKey) {
                this.state = state;
                return this.state;
            }
        }
        throw new Error("State is not exist");
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.undoArr.push(this.state);
        this.redoArr.length = 0;
        if (this.config.states[this.state].transitions[event]) {
             this.state = this.config.states[this.state].transitions[event];
             return this.state;
        } else {
            throw new Error("Event in current state is not exist");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let firstArr = [];
        let secondArr = [];
        if(!event) {
            for (let statesKey in this.config.states) {
                firstArr.push(statesKey);
            }
            return firstArr;
        } else {
            for (let statesKey in this.config.states) {
                if (this.config.states[statesKey].transitions[event]) {
                    secondArr.push(statesKey);
                }
            }
            return secondArr;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.undoArr.length > 0) {
            this.redoArr.push(this.state);
            this.state = this.undoArr.pop();
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.redoArr.length > 0) {
            this.state = this.redoArr.pop();
            return true;
        } else{
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoArr.length = 0;
        this.redoArr.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
