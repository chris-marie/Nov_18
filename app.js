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
            if(!toolSelect) {
                alert('Error: failed to get the dtool element....');
                return;
            }

            toolSelect.addEventListener('change', toolChange);

            if (tools[toolDefault]) {
                tool = new tools[toolDefault]();
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
            if(tools[this.value]) {
                tool = new tools[this.value]();
            }
        }

        var tools = {};

        tools.pencil = function() {
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
        };

        tools.rect = function() {
            var tool = this;
            this.started = false;

            this.mousedown = function (e) {
                tool.started = true;
                tool.x0 = e._x;
                tool.y0 = e._y;
            };

            this.mousemove = function (e) {
                if (!tool.started) {
                    return;
                }

                var x = Math.min(e._x, tool.x0),
                    y = Math.min(e._y, tool.y0),
                    w = Math.abs(e._x - tool.x0),
                    h = Math.abs(e._y - tool.y0);
                context.clearRect(0, 0, canvas.width, canvas.height);

                if (!w || !h) {
                    return;
                }

                context.strokeRect(x, y, w, h);
            };

            this.mouseup = function (e) {
                if (tool.started) {
                    tool.mousemove(e);
                    tool.started = false;
                }
            };
        };

        init();
    }); }

























