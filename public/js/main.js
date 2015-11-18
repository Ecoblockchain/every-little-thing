$(document).ready(function() {
    var categories = ["ITP", "Life", "Family", "Hobby", "Work"];
    var categoryColors = ["#57068c", "#27ae60", "#f8c82d", "#fe7c60", "#3498db"];
    var emotions = ["Happy", "Surprise", "Sad", "Angry", "Nervous", "Anxious"];
    var emotionColors = ["#57068c", "#27ae60", "#f8c82d", "#fe7c60", "#3498db", "#555"];

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
                    colorE = emotionColors[j];
                    break
                }
            }


            $(divT).attr({
                'id': 'thing-' + i,
                'class':'thing'
            });

            $(divC).attr({
                'id': 'thing-' + i + '-category',
                'class':'category'
            });

            $(divE).attr({
                'id': 'thing-' + i + '-emotion',
                'class': 'emotion'
            });

            $(divC).css({
                'background-color': colorC,
                'width': '50px'
            });

            $(divE).css({
                'background-color': colorE,
                'width': '50px'
            });


            $(divT).append(divC);
            $(divT).append(divE);
            $('#byThings').append(divT);
        }
    }

    function drawDay(data) {

    }

    function drawWeek(data) {

    }

    function drawMonth(data) {

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