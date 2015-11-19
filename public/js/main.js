var categories = ["ITP", "Life", "Family", "Hobby", "Work"];
var categoryColors = ["#958ab7", "#5fc093", "#fbc04b", "#f2816f", "#38b9c7"];
var emotions = ["Happy", "Surprise", "Sad", "Angry", "Regret", "Anxious"];
var counter;

$(document).ready(function() {
    $('#sub-header').hide();
    $('#eraser').hide();
    resizeDiv();
    drawAll();


    $(window).on('scroll', check_if_in_view);



    $('#eraser').click(function() {
        drawAll();
    });

    $('#itp-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            // $(this).animate({
            //     "width": "-=80px"
            // }, "slow");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByCategory("ITP");
        }
    });

    $('#life-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            $('#byThings').empty();
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            $('#byThings').empty();
            if (data.length > 0) {
                drawByCategory("Life");
            }
        }
    });

    $('#family-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByCategory("Family");
        }
    });

    $('#hobby-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByCategory("Hobby");
        }
    });

    $('#work-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByCategory("Work");
        }
    });

    $('#happy-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByEmotion("Happy");
        }
    });

    $('#sad-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByEmotion("Sad");
        }
    });

    $('#angry-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByEmotion("Angry");
        }
    });

    $('#anxious-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByEmotion("Anxious");
        }
    });

    $('#regret-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByEmotion("Regret");
        }
    });

    $('#surprise-button').click(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            drawAll();
            return;
        } else {
            $(this).addClass('clicked');
            drawByCategory("Surprise");
        }
    });


    $(".menu-button")
        .mouseenter(function() {
            $(this).html($(this).attr('label'));
            $(this).animate({
                "width": "+=80px"
            }, "slow");
        })
        .mouseleave(function() {
            $(this).html("");
            if ($(this).hasClass("clicked")) {
                $(this).animate({
                    "width": "-=70px"
                }, "slow");

            } else {
                $(this).animate({
                    "width": "-=80px"
                }, "slow");
            }

        });

});

function drawAll() {
    $('#byThings').empty();
    $.getJSON('api/get/sort', function(data) {
        if (data.length > 0) {
            drawData(data);
        } else {
            $('#byThings').html("Nothing Found");
        }
    });
}

function drawByDay(day) {
    $('#byThings').empty();
    $.getJSON('api/get/query?day=' + day, function(data) {
        if (data.length > 0) {
            drawData(data);
        } else {
            $('#byThings').html("Nothing Found");
        }
    });
}

function drawByCategory(category) {
    $('#byThings').empty();
    $.getJSON('api/get/query?category=' + category, function(data) {
        if (data.length > 0) {
            drawData(data);
        } else {
            $('#byThings').html("Sorry, nothing Found");
        }
    });
}

function drawByPeople(people) {
    $('#byThings').empty();
    $.getJSON('api/get/query?people=' + people, function(data) {
        if (data.length > 0) {
            drawData(data);
        } else {
            $('#byThings').html("Sorry, nothing Found");
        }
    });
}

function drawByEmotion(emotion) {
    $.getJSON('api/get/query?emotion=' + emotion, function(data) {
        if (data.length > 0) {
            drawData(data);
        } else {
            console.log("no");
            $('#byThings').html("Oh, you are not " + emotion.toLowerCase() + " at all!");
        }
    });
}

function drawData(data) {
    var counter = 0;
    var minDay = data[0].date.day;
    var maxDay = data[data.length - 1].date.day;

    counter = 0;
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

        //set thing container
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
        numP = data[i].people.length;
        for (var j = 0; j < numP; j++) {

            var svgContainer = d3.select(divT).append("svg")
                .attr("width", 20)
                .attr("height", 30)
                .attr("id", 'thing-' + i + '-people-' + j)
                .style("left", j * 16 + "px");
            if (data[i].people[j] == "") {
                numP = 0;
                svgContainer.attr("class", "svg-container people-container");
            } else {
                svgContainer.attr("class", "svg-container people-container " + data[i].people[j].replace(/\s+/g, '-').toLowerCase());
                var circle = svgContainer.append("circle")
                    .attr("cx", 10)
                    .attr("cy", 14)
                    .attr("r", 6)
                    .attr("class", "people");
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
        counter++;
    }

    if (counter == data.length) {

        $(".category, .emotion")
            .mouseenter(function() {
                $(this).parent().find('.emotion').animate({
                    "left": "+=20px"
                }, "slow");
                $(this).parent().find('.category').animate({
                    "top": "-=30px"
                }, "slow");
                $(this).parent().find('.people-container').animate({
                    "left": "-=30px"
                }, "slow");
                $(this).parent().find('.media-container').animate({
                    "left": "+=30px"
                }, "slow");
            })
            .mouseleave(function() {
                $(this).parent().find('.emotion').animate({
                    "left": "-=20px"
                }, "slow");
                $(this).parent().find('.category').animate({
                    "top": "+=30px"
                }, "slow");
                $(this).parent().find('.people-container').animate({
                    "left": "+=30px"
                }, "slow");
                $(this).parent().find('.media-container').animate({
                    "left": "-=30px"
                }, "slow");


            });

        updateColor(data);
        //peopleFilter(data);
        $('.emotion, .category').each(function() {
            var n = $(this).attr("id").split("-")[1];
            var bg = $('#thing-' + n + '-category').css("background-color");

            $(this).click(function() {
                $(document.body).css({
                    "overflow": "hidden"
                });


                var content = document.createElement('div');
                var overlay = document.createElement('div');
                var titleDiv = document.createElement('div');
                var descriptionDiv = document.createElement('div');
                var emotionDiv = document.createElement('div');
                var peopleDiv = document.createElement('div');
                var topicDiv = document.createElement('div');
                var sharingDiv = document.createElement('div');
                var dateDiv = document.createElement('div');


                $(content).attr({
                    "id": "pop",
                    "class": "popup row"
                });

                $(overlay).attr({
                    "id": "overlay",
                    "class": "overlay"
                });
                $(overlay).css({
                    "width": $(window).width(),
                    "height": $(window).height()
                });


                $(titleDiv).attr({
                    "class": "pop-title"
                });
                $(titleDiv).html(
                    "<h3>" + data[n].title + "</h3>"
                );
                $(titleDiv).css({
                    "background-color": bg
                });

                $(descriptionDiv).attr({
                    "class": "pop-description"
                });

                $(descriptionDiv).html(
                    "<p>" + data[n].description + "</p>"
                );

                $(emotionDiv).attr({
                    "class": "pop-emotion"
                });

                var htmlToAdd = "<div class=pop-" + data[n].emotion + ">" + data[n].emotion + "</div>";
                $(emotionDiv).append(htmlToAdd);

                for (var t = 0; t < data[n].topic.length; t++) {
                    var htmlToAdd = "<div class=topicTag>" + data[n].topic[t] + "</div>";
                    $(descriptionDiv).append(htmlToAdd);
                }

                if (data[n].sharing.shared == true) {
                    for (var s = 0; s < data[n].sharing.media.length; s++) {
                        var htmlToAdd = "<div class=pop-" + data[n].emotion + ">Shared on " + data[n].sharing.media[s] + "</div>";
                        $(emotionDiv).append(htmlToAdd);
                    }
                }

                $(dateDiv).attr({
                    "class": "pop-date"
                });

                $(dateDiv).html("Nov " + data[n].date.day);


                $(descriptionDiv).append(peopleDiv);
                $(descriptionDiv).append(dateDiv);

                $(content).append(titleDiv);
                $(content).append(descriptionDiv);
                $(content).append(emotionDiv);
                $(content).append(topicDiv);


                for (var j = 0; j < data[n].people.length; j++) {

                    var pContainer = d3.select(peopleDiv).append("svg")
                        .attr("width", 20)
                        .attr("height", 30)
                        .attr("class", "pop-svg")
                        .style("left", j * 16 + "px");
                    if (data[n].people[j] == "") {
                        numP = 0;
                        pContainer.attr("class", "");
                    } else {
                        var currentPerson = data[n].people[j].replace(/\s+/g, '-').toLowerCase();
                        var currentPersonSVG = $('.' + currentPerson).toArray();
                        //console.log($(currentPersonSVG[0]).children());
                        var pColor = $(currentPersonSVG[0]).children().css("fill");
                        //console.log(pColor);
                        var circle = pContainer.append("circle")
                            .attr("cx", 10)
                            .attr("cy", 14)
                            .attr("r", 6)
                            .attr("class", "people")
                            .style("fill", pColor);
                    }
                    pContainer.attr("class", data[n].people[j].replace(/\s+/g, '-').toLowerCase());
                    $(peopleDiv).append("<div class=people-tag>" + data[n].people[j] + "</div>")

                }


                $("#section-2").append(overlay);
                $("#section-2").append(content);

                // $(".topicTag").css({
                //     "background-color": bg
                // });

                $("#overlay").click(function() {
                    $("#overlay").remove();
                    $("#pop").remove();
                    $(document.body).css("overflow", "");
                });
            });
        });
    }
}

function updateColor(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].people.length; j++) {

            if (data[i].people[j] == "") {} else {
                var currentPerson = data[i].people[j].replace(/\s+/g, '-').toLowerCase();
                var currentPersonSVG = $('.' + currentPerson).toArray();
                for (var k = 0; k < currentPersonSVG.length; k++) {
                    var circle = $(currentPersonSVG[k]).children();
                    var h = 0.1 + 0.1 * currentPersonSVG.length;
                    var s = 0.52;
                    var v = 0.82;
                    var colorP = HSVtoRGB(h, s, v);
                    var colorP = "rgb(" + colorP.r + "," + colorP.g + "," + colorP.b + ")";
                    $(circle).css("fill", colorP);

                    String.prototype.capitalizeFirstLetter = function() {
                        return this.charAt(0).toUpperCase() + this.slice(1);
                    }
                    $(circle).click(function() {
                        //console.log(currentPerson.replace(/-/g, ' ').capitalizeFirstLetter());
                        //$('#byThings').empty();
                        drawByPeople(currentPerson.replace(/-/g, ' ').capitalizeFirstLetter());
                    });

                }
            }
        }
    }
    return
}

function check_if_in_view() {
    var window_height = $(window).height();
    var window_top_position = $(window).scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    var element_height = $('#section-2').outerHeight();
    var element_top_position = $('#section-2').offset().top;
    var element_bottom_position = (element_top_position + element_height);


    if (window_top_position > window_height) {
        $('#sub-header').fadeIn();
        $('#eraser').fadeIn();
    } else {
        $('#sub-header').fadeOut();
        $('#eraser').fadeOut();
    }

    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        $('#sub-header').fadeOut();
        $('#eraser').fadeOut();
    }
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

window.onresize = function(event) {
    resizeDiv();
}

function resizeDiv() {
    vpw = $(window).width();
    vph = $(window).height();
    $('.section').css({
        "height": vph + "px"
    });
    $('.menu-button').css({
        "height": vph / 11 + "px"
    });
}