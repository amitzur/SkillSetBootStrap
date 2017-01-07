function transition(fromPage, toPage, transitionName, onbeforetransition) {
    return new Promise(resolve => {
        let fromEl = fromPage && fromPage.el;
        let toEl = toPage.el;

        transitionHandler(Transitions[transitionName])(fromEl, toEl, resolve, onbeforetransition);
    });
}

function transitionHandler(options) {
    return function(from, to, callback, onbeforetransition) {
        console.log(options.name + " started");
        from && addClasses(from, options.fromClass);
        addClasses(to, options.toClass);
        show(to);
        onbeforetransition && onbeforetransition();
        (options.fromIsAnimated ? from : to).addEventListener("animationend", function(e) {
            console.log(options.name + " ended");
            e.target.removeEventListener("animationend", arguments.callee);
            from && removeClasses(from, options.fromClass);
            from && hide(from);
            removeClasses(to, options.toClass);
            callback();
        });
    };
}

function addClasses(el, classes) {
    classes.split(" ").forEach(c => el.classList.add(c));
}

function removeClasses(el, classes) {
    classes.split(" ").forEach(c => el.classList.remove(c));
}

function show(el) {
    el.classList.add("active");
}

function hide(el) {
    el.classList.remove("active");
}

var Transitions = {
    slideleft: {
        fromClass: "slide out",
        toClass: "slide in"
    },

    slideright: {
        fromClass: "slide out reverse",
        toClass: "slide in reverse"
    },

    coverleft: {
        toClass: "slide in"
    },

    coverright: {
        toClass: "slide in reverse"
    },

    coverup: {
        toClass: "slide in bottom"
    },

    leaveright: {
        fromClass: "slide out reverse",
        fromIsAnimated: true
    },

    leaveleft: {
        fromClass: "slide out",
        fromIsAnimated: true
    },

    leavedown: {
        fromClass: "slide out bottom reverse",
        fromIsAnimated: true
    }
};

Object.keys(Transitions).forEach(t => Transitions[t].name = t);

module.exports = transition;