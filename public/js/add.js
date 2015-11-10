var title = "";
var type = "";
var category = "";
var topic = [];
var people = [];
var month = 11;
var day = 1;
var period = false;
var startH = 0;
var startM = 0;
var endH = 0;
var endM = 0;
var emotion = "";
var description = "";
var language = "";
var shared = false;
var audience = [];
var media = [];
var feedback = "";
var resource = [];
var attitude = "";
var reason = "";
var url = "";
var tookAction = false;
var action = "";
var finished = true;

function init() {
  console.log("init");
  $("#input-category-other").hide();
  $('#input-endH').hide();
  $('#input-endM').hide();
  $("#input-emotion-other").hide();
  $('#input-audience').hide();
  $('#input-audience-btn').hide();
  $('#input-media').hide();
  $('#input-media-btn').hide();
  $('#input-feedback').hide();
  $("#input-attitude-other").hide();
  $('#input-action').hide();
  checkForm();
}

function checkForm() {
  //type
  $('#input-type .btn').click(function() {
    $('#input-type .btn').removeClass("active");
    $(this).addClass('active');
    type = this.innerHTML;
  });

  //category
  $('#input-category .btn').click(function() {
    $('#input-category .btn').removeClass("active");
    $(this).addClass('active');
    if (this.innerHTML == "Other") {
      $("#input-category-other").show();
      category = "";
    } else {
      category = this.innerHTML;
      $("#input-category-other").hide();
    }
  });

  //topic
  $('#input-topic-btn .btn').click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      var removeIndex = topic.indexOf(this.innerHTML);
      topic.splice(removeIndex, 1);
      $('#input-topic').val(topic.toString());
      return;
    } else {
      $(this).addClass('active');
      topic.push(this.innerHTML);
      $('#input-topic').val(topic.toString());
    }
  });

  //people
  $('#input-people-btn .btn').click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      var removeIndex = people.indexOf(this.innerHTML);
      people.splice(removeIndex, 1);
      $('#input-people').val(topic.toString());
      return;
    } else {
      $(this).addClass('active');
      people.push(this.innerHTML);
      $('#input-people').val(people.toString());
    }
  });

  $('#input-month').val(11);

  //period
  $('#input-period').click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      period = false;
      $('#input-endH').hide();
      $('#input-endM').hide();
      return;
    } else {
      $(this).addClass('active');
      period = true;
      $('#input-endH').show();
      $('#input-endM').show();
    }
  });

  //emotion
  $('#input-emotion .btn').click(function() {
    $('#input-emotion .btn').removeClass("active");
    $(this).addClass('active');
    if (this.innerHTML == "Other") {
      $("#input-emotion-other").show();
      emotion = "";
    } else {
      emotion = this.innerHTML;
      $("#input-emotion-other").hide();
    }
  });

  $('#input-language .btn').click(function() {
    $('#input-language .btn').removeClass("active");
    $(this).addClass('active');
    language = this.innerHTML;
  });

  //shared
  $('#input-shared').click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      shared = false;
      $('#input-audience').hide();
      $('#input-audience-btn').show();
      $('#input-media').hide();
      $('#input-feedback').hide();
      $('#input-media-btn').hide();
      return;
    } else {
      $(this).addClass('active');
      shared = true;
      $('#input-audience').show();
      $('#input-audience-btn').show();
      $('#input-media').show();
      $('#input-media-btn').show();
      $('#input-feedback').show();
    }
  });

  //audience
  $('#input-audience-btn .btn').click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      var removeIndex = audience.indexOf(this.innerHTML);
      audience.splice(removeIndex, 1);
      $('#input-audience').val(audience.toString());
      return;
    } else {
      $(this).addClass('active');
      audience.push(this.innerHTML);
      $('#input-audience').val(audience.toString());
    }
  });

  //media
  $('#input-media-btn .btn').click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      var removeIndex = media.indexOf(this.innerHTML);
      media.splice(removeIndex, 1);
      $('#input-media').val(topic.toString());
      return;
    } else {
      $(this).addClass('active');
      media.push(this.innerHTML);
      $('#input-media').val(media.toString());
    }
  });

  //resource
  $('#input-resource-btn .btn').click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      var removeIndex = resource.indexOf(this.innerHTML);
      resource.splice(removeIndex, 1);
      $('#input-resource').val(topic.toString());
      return;
    } else {
      $(this).addClass('active');
      resource.push(this.innerHTML);
      $('#input-resource').val(resource.toString());
    }
  });

  //attitude
  $('#input-attitude .btn').click(function() {
    $('#input-attitude .btn').removeClass("active");
    $(this).addClass('active');
    if (this.innerHTML == "Other") {
      $("#input-attitude-other").show();
      attitude = "";
    } else {
      attitude = this.innerHTML;
      $("#input-attitude-other").hide();
    }
  });

  //take action
  $('#input-tookAction').click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      tookAction = false;
      $('#input-action').hide();
      return;
    } else {
      $(this).addClass('active');
      tookAction = true;
      $('#input-action').show();
    }
  });

}

jQuery("form").submit(function(e) {
  e.preventDefault();

  $("#myForm").validate({
    rules: {
      url: {
        url: true
      }
    }
  });
  
  var location = "";

  if (!$("#input-topic").val()) {
    topic = "";
  } else {
    topic = jQuery("#input-topic").val();
  }

  if (!$("#input-people").val()) {
    people = "";
  } else {
    people = jQuery("#input-people").val();
  }

  if (!$("#input-audience").val()) {
    audience = "";
  } else {
    audience = jQuery("#input-audience").val();
  }

  if (!$("#input-media").val()) {
    media = "";
  } else {
    media = jQuery("#input-media").val();
  }
  if (!$("#input-resource").val()) {
    resource = "";
  } else {
    resource = jQuery("#input-resource").val();
  }



  title = jQuery("#input-title").val();
  month = parseInt(jQuery("#input-month").val());
  day = parseInt(jQuery("#input-day").val());
  startH = parseInt(jQuery("#input-startH").val());
  startM = parseInt(jQuery("#input-startM").val());
  endH = parseInt(jQuery("#input-endH").val());
  endM = parseInt(jQuery("#input-endM").val());
  var location = jQuery("#input-location").val();
  description = jQuery("#input-description").val();
  feedback = jQuery("#input-feedback").val();
  reason = jQuery("#input-reason").val();
  url = jQuery("#input-url").val();
  action = jQuery("#input-action").val();

  if (category == "") {
    category = $("#input-category-other").val();
  }

  // make sure we have a location
  //if (!title || title == "") return alert('We need a title!');

  // POST the data from above to our API create route
  jQuery.ajax({
    url: '/api/create',
    dataType: 'json',
    type: 'POST',
    // we send the data in a data object (with key/value pairs)
    data: {
      title: title,
      type: type,
      category: category,
      topic: topic,
      people: people,
      month: month,
      day: day,
      period: period,
      startH: startH,
      startM: startM,
      endH: endH,
      endM: endM,
      location: location,
      emotion: emotion,
      description: description,
      language: language,
      shared: shared,
      audience: audience,
      media: media,
      feedback: feedback,
      resource: resource,
      attitude: attitude,
      reason: reason,
      url: url,
      tookAction: tookAction,
      action: action,
      finished: finished
    },
    success: function(response) {
      if (response.status == "OK") {
        // success
        console.log(response);
        // now, clear the input fields
        jQuery("form input").val('');
      } else {
        alert("something went wrong");
      }
    },
    error: function(err) {
      // do error checking
      alert("something went wrong");
      console.error(err);
    }
  });
  // prevents the form from submitting normally

  return false;
});


window.addEventListener('onload', init());