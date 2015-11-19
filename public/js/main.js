$(document).ready(function() {
    resizeDiv();

    var categories = ["ITP", "Life", "Family", "Hobby", "Work"];
    var categoryColors = ["#958ab7", "#5fc093", "#fbc04b", "#f2816f", "#38b9c7"];
    var emotions = ["Happy", "Surprise", "Sad", "Angry", "Regret", "Anxious"];

    $.getJSON('api/get/sort', function(data) {
        drawAll(data);
    });

    function drawAll(data) {
        var minDay = data[0].date.day;
        var maxDay = data[data.length - 1].date.day;

        for (var i = 0; i < data.length; i++) {
            //every single thing

            var colorC;
            var colorE;
            var numP;
            var numS;
            var t;

            var divT = document.createElement('div'); //wrap everything in the thing
            var divC = document.createElement('div'); //div of color that shows category
            var divE = document.createElement('div'); //div of color that shows mood
            var divP = document.createElement('div'); //div of circles that shows people
            var divS = document.createElement('div'); //div shows sharing

            //set category color
            for (var j = 0; j < categories.length; j++) {
                if (data[i].category == categories[j]) {
                    colorC = categoryColors[j];
                    break
                }
            }

            //set mood color
            for (var j = 0; j < emotions.length; j++) {
                if (data[i].emotion == emotions[j]) {
                    colorE = "url(/img/emotion/" + emotions[j] + ".png)";
                    break
                }
            }

            //set width by time
            if (data[i].time.period == true) {
                t = data[i].time.endH * 60 + data[i].time.endM - data[i].time.startH * 60 - data[i].time.startM;
            } else {
                t = 20;
            }

            Number.prototype.map = function(in_min, in_max, out_min, out_max) {
                return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            }
            t = t.map(20, 1080, 50, 140);

            $(divT).attr({
                'id': 'thing-' + i,
                'class': 'thing col-md-2'
            });

            $(divC).attr({
                'id': 'thing-' + i + '-category',
                'class': 'category'
            });

            $(divE).attr({
                'id': 'thing-' + i + '-emotion',
                'class': 'emotion'
            });

            $(divC).css({
                'background-color': colorC,
                'width': t + 'px'
            });

            $(divE).css({
                "background-image": colorE,
                'width': t + 'px'
            });



            $(divT).append(divC);
            $(divT).append(divE);

            //draw people
            var h=0.22;
            var s=0.52;
            var v=0.82;
            var colorP = HSVtoRGB(h,s,v);
            var colorP = "rgb("+colorP.r+","+colorP.g+","+colorP.b+")";
            numP = data[i].people.length;
            for (var j = 0; j < numP; j++) {
                var svgContainer = d3.select(divT).append("svg")
                    .attr("width", 20)
                    .attr("height", 30)
                    .attr("class", "svg-container people-container")
                    .attr("id", 'thing-' + i + '-people-' + j)
                    .style("left", j * 16 + "px");
                if (data[i].people[j] == "") {
                    numP = 0;
                } else {
                    var circle = svgContainer.append("circle")
                        .attr("cx", 10)
                        .attr("cy", 14)
                        .attr("r", 6)
                        .attr("class", "people")
                        .style("fill", colorP);
                }
            }

            //draw media
            numS = data[i].sharing.media.length;
            for (var j = 0; j < numS; j++) {
                var svgContainer2 = d3.select(divT).append("svg")
                    .attr("width", 25)
                    .attr("height", 25)
                    .attr("class", "svg-container media-container")
                    .attr("id", 'thing-' + i + '-media-' + j)
                    .style("left", t + 10 + "px");
                if (data[i].sharing.media[j] == "") {
                    numS = 0;
                } else {
                    var triangle = svgContainer2.append("polygon")
                        .attr("class", "media")
                        .attr("points", "05,30,15,10,25,30")
                        .style("fill", "#346ca7");
                }
            }

            $('#byThings').append(divT);
        }
    }

    function drawDay(data) {

    }

    function drawWeek(data) {

    }

    function drawMonth(data) {

    }

    function HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    // var minDay = 10;
    // var maxDay = 13;
    // for (var j = minDay; j < (maxDay + 1); j++) {
    //     var counter = 0;
    //     for (var i = 0; i < categoryLabel.length; i++) {
    //         $.getJSON('api/get/query?day=' + j + '&category=' + categoryLabel[i], function(data) {

    //             categoryValue.push(data.length);
    //             counter++; // increment the counter

    //             // if the counter is equal to the length of the array-1, we know we can render it because it has gotten to the end
    //             if (counter == categoryLabel.length) renderCategory(j, categoryValue);
    //         });
    //     }
    // }

    // function renderCategory(day, categoryValue) {
    //     for (var i = 0; i < categoryLabel.length; i++) {
    //         var dataToPush = {};
    //         dataToPush['label'] = categoryLabel[i];
    //         dataToPush['value'] = categoryValue[i];
    //         dataToPush['color'] = categoryColor[i];
    //         dataByCategory.push(dataToPush);
    //     }
    //     //drawTreemap(day, dataByCategory);
    // }

    // function drawTreemap(data) {

    //     //data structure like this:
    //     // var data = [{
    //     //     label: 'Chrome',
    //     //     value: 44.06,
    //     //     color: "#37c837"
    //     // }];
    //     $('#treemap').jqxTreeMap({
    //         width: 100,
    //         height: 100,
    //         source: data,
    //         renderCallbacks: {
    //             '*': function(element, data) {
    //                 element.css({
    //                     color: data.color
    //                 });
    //                 element.html('<span style="font-size: 0px;">' + data.label + ', ' + data.value + '%</span>');
    //                 return true;
    //             }
    //         }
    //     });
    // }

});

window.onresize = function(event) {
resizeDiv();
}

function resizeDiv() {
vpw = $(window).width();
vph = $(window).height();
$('.section').css({"height": vph + "px"});
}