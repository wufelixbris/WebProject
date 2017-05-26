"use strict"

if (addEventListener) window.addEventListener('load', start);
else attachEvent('onload', start); //polyfill for IE8 and below

/* highlight a listing when it is selected */
function start() {
    document.querySelector('body').addEventListener('click', function (event) {
        var sourceID = event.target.id.slice(1);
        switch (event.target.className.split(' ')[0]) {
            case 'panel':
            case 'panel-body':
            case 'panel-header':
            case 'panel':
                console.log("yes naan!");
                document.getElementById('A'.concat(sourceID)).classList.toggle('panel-selected');
                break;
            default:
                var selected = [].slice.apply(document.getElementsByClassName("panel-selected"));
                for (var i = 0; i < selected.length; i++){
                    selected[i].classList.toggle('panel-selected');
                };
        }
    });
}

/*polyfill to make above code work in IE8 taken from github https://gist.github.com/chriswrightdesign/7573368 */
 (function() {
 if (!Event.prototype.preventDefault) {
 Event.prototype.preventDefault=function() {
 this.returnValue=false;
 };
 }
 if (!Event.prototype.stopPropagation) {
 Event.prototype.stopPropagation=function() {
 this.cancelBubble=true;
 };
 }
 if (!Element.prototype.addEventListener) {
 var eventListeners=[];

 var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
    var self=this;
    var wrapper=function(e) {
        e.target=e.srcElement;
        e.currentTarget=self;
        if (listener.handleEvent) {
            listener.handleEvent(e);
        } else {
            listener.call(self,e);
        }
    };
    if (type=="DOMContentLoaded") {
        var wrapper2=function(e) {
            if (document.readyState=="complete") {
                wrapper(e);
            }
        };
        document.attachEvent("onreadystatechange",wrapper2);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});

        if (document.readyState=="complete") {
            var e=new Event();
            e.srcElement=window;
            wrapper2(e);
        }
    } else {
        this.attachEvent("on"+type,wrapper);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
    }
};
var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
    var counter=0;
    while (counter<eventListeners.length) {
        var eventListener=eventListeners[counter];
        if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
            if (type=="DOMContentLoaded") {
                this.detachEvent("onreadystatechange",eventListener.wrapper);
            } else {
                this.detachEvent("on"+type,eventListener.wrapper);
            }
            break;
        }
        ++counter;
    }
};
Element.prototype.addEventListener=addEventListener;
Element.prototype.removeEventListener=removeEventListener;
if (HTMLDocument) {
    HTMLDocument.prototype.addEventListener=addEventListener;
    HTMLDocument.prototype.removeEventListener=removeEventListener;
}
if (Window) {
    Window.prototype.addEventListener=addEventListener;
    Window.prototype.removeEventListener=removeEventListener;
}
}
})();
