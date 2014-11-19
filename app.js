
if(window.addEventListener) {
    window.addEventListener('load', function () {
        console.log('window loaded');
        var canvas, context;
        var tool;
        var toolDefault = 'rect';

        function init() {
            canvas = document.getElementById('picture');
            context = canvas.getContext('2d');

            var toolSelect = document.getElementById('dtool');
            if(!tooSelect) {
                alert('Error: failed to get the dtool element....');
                return;
            }

            toolSelect.addEventListener('change', toolChange);

            if (tools[toolDefault]) {
                tool = new tool[toolDefault]();
                toolSelect.value = toolDefault;
            }

            //console.log(toolFreehand);
            //tool = new toolFreehand();
            canvas.addEventListener('mousedown', trackMouse);
            canvas.addEventListener('mousemove', trackMouse);
            canvas.addEventListener('mouseup', trackMouse);
        }

        function trackMouse(e) {
            if (e.layerX || e.layerX == 0) { // Firefox
                e._x = e.layerX;
                e._y = e.layerY;
            } else if (e.offsetX || e.offsetX == 0) { // Opera
                e._x = e.offsetX;
                e._y = e.offsetY;
            }

            // Call the event handler of the tool.
            var func = tool[e.type];
            if (func) {
                func(e);
            }
        }

        // New function to change the tools

        function toolChange(e) {
            if(tool[this.value]) {
                tool = new tools[this.value]();
            }
        }

        // why does tools
        var tools = {};

        function toolFreehand() {
            var tool = this;
            this.started = false;

            this.mousedown = function(e) {
                context.beginPath();
                context.moveTo(e._x, e._y);
                tool.started = true;
            };

            this.mousemove = function(e) {
                if(tool.started) {
                    context.lineTo(e._x, e._y);
                    context.stroke();
                }
            };

            this.mouseup = function(e) {
                if(tool.started) {
                    tool.mousemove(e);
                    tool.started = false;
                }
            };

        }


           /* var x, y;

            // Get the mouse position relative to the canvas element.
            if (e.layerX || e.layerX === 0) { // Firefox
                x = e.layerX;
                y = e.layerY;
            }

            // calling the event handler of the tool, not tool functions have same names
            var func = tool[e.type];
            if(func) {
                func(e);
            }
        } */

        init();
    }); }

























