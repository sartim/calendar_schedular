$("#repeat").attr('checked', 'checked'); // load repeat radio button selected
$(".loader").show(); // load loader
/**
 *  Hide week names on page load
 */
$("#dayofweek").hide();
/**
 * Initialize Datetime Picker
 */
$('.datetimepicker').datetimepicker({ format: 'YYYY-MM-DD HH:mm:ss'});
/**
 * On select option from every
 */
$('#every').unbind("click").click(function(){
    e = $('#every option:selected').val(); // get selected option
    if (e == 'days') {
        $('#dayofweek').fadeOut('slow');
    } else if (e == 'weeks') {
        $('#dayofweek').fadeIn('slow');
        t = new Date().getDay(); // get current day of the week as integer
        // Loop array with map
        var arr = $('input[name=chkbox]:checkbox').map(function () {
            console.log(this.id);
            // if the id is the current day of the week
            if (this.id == t){
                $('input[name=chkbox]:checkbox#'+t).attr( 'checked', true )
            }
        }).get()

    } else if (e == 'months') {
        $('#dayofweek').fadeOut('slow');
    } else if (e == 'years') {
        $('#dayofweek').fadeOut('slow');
    }
});
/**
 * After clicking cancel button on confirm
 */
$('#cls2').unbind("click").click(function(){
    // Clear DOM here
    $('#title-id-set-to').empty();
    $('#description-id-set-to').empty();
    $('#rest-set-to').empty();
    $('#everyday').empty();
    $('#weekly').empty();
    $('#monthly').empty();
    $('#selected-start').empty();
    $('#selected-end').empty();
    $("#wdy-id-set-to").empty();
});
/**
 * After clicking submit on first modal for input
 */
$('#sbt').unbind("click").click(function(){
    $('#ModalConfirm').modal({ backdrop: 'static', keyboard: true });
    var n = $('#num').val(); // get the number of occurrence set
    var e = $('#every option:selected').val(); // get selected repeat occurrence
    var h = $('#title').val(); // get title input
    var r = $('#description').val(); // get description input
    var d = $('#id_end_date_end').val(); // get filled date time on end
    var end = moment(d).format('YYYY-MM-DD HH:mm:ss'); // format the filled datetime
    var etime = end.split(" ")[1];
    var c = $('#selected-start1').text();
    var start = moment(c).format('YYYY-MM-DD HH:mm:ss'); // format the start datetime
    var stime = start.split(" ")[1];
    i = 0;
    var arr = [];
    // var form_data = $('#form-data').serialize();
    if (n == 1 && e == 'days') { // Daily
        $('#everyday').html('Yes');
        $('#set-to').html('Daily until ' + end);

        console.log('Daily');
    } else if (n > 1 && e == 'days') {
        $('#everyday').html('No');
        $('#set-to').html('Every ' + n + ' days until ' + end);

        console.log('Every ' + n + ' days');
    } else if (n == 1 && e == 'weeks') { // Weekly
        $('#everyday').html('No');
        $('#weekly').html('Yes');
        $('#set-to').html('Weekly until ' + end);

        console.log('Weekly');
    } else if (n > 1 && e == 'weeks') {
        $('#everyday').html('No');
        $('#weekly').html('No');
        $('#set-to').html('Weekly on ' + n + ' until ' + end);

        console.log(arr);

    } else if (n == 1 && e == 'months') { // Monthly
        $('#everyday').html('No');
        $('#weekly').html('No');
        $('#monthly').html('Yes');
        $('#set-to').html('Monthly until ' + end);

        console.log('Monthly');
    } else if (n > 1 && e == 'months') {
        $('#everyday').html('No');
        $('#weekly').html('No');
        $('#monthly').html('Yes');
        $('#set-to').html('Every ' + n + ' months until ' + end);

        console.log('Every ' + n + ' months');
    } else if (n == 1 && e == 'years') { // Yearly
        $('#everyday').html('No');
        $('#weekly').html('No');
        $('#monthly').html('No');
        $('#yearly').html('Yes');
        $('#set-to').html('Monthly until ' + end);

        console.log('Yearly');
    } else if (n > 1 && e == 'years') {
        $('#everyday').html('No');
        $('#weekly').html('No');
        $('#monthly').html('No');
        $('#years').html('Yes');
        $('#set-to').html('Every ' + n + ' years until ' + end);

        console.log('Every ' + n + ' years');
    }
    $('#selected-hood').html(h);
    $('#selected-start').html(start);
    $('#selected-end').html(end);
    $('#selected-stime').html(stime);
    $('#selected-etime').html(etime);
    $('#title-set-to').html('<h4>Events in <span class="text-danger">'+ h + '</span></h4>');
});
/**
 * After clicking submit on second modal for confirm
 */
$("#sbt2").unbind("click").click(function(){
    var daily = $('#everyday').text();
    var weekly = $('#weekly').text();
    var monthly = $('#monthly').text();
    var title = $('#title-id-set-to').val();
    console.log(title.toString());
    var description = $('#description-id-set-to').val();
    console.log(restaurant.toString());
    var weekday = $('#wdy-id-set-to').val();
    var start = $('#selected-start').text();
    var end = $('#selected-end').text();
    // Assign handlers immediately after making the request,
    // and remember the jqxhr object for this request
    var jqxhr = $.post( '/admin/featured-restaurants/calc',
        {
            csrfmiddlewaretoken: '{{ csrf_token }}',
            hood: hood.toString(),
            restaurant: restaurant.toString(),
            daily: daily,
            weekly: weekly,
            monthly: monthly,
            start: start,
            end: end,
            mon: $('input[id=0][name=wkdy-chkbox]:checkbox:checked').val(),
            tue: $('input[id=1][name=wkdy-chkbox]:checkbox:checked').val(),
            wed: $('input[id=2][name=wkdy-chkbox]:checkbox:checked').val(),
            thu: $('input[id=3][name=wkdy-chkbox]:checkbox:checked').val(),
            fri: $('input[id=4][name=wkdy-chkbox]:checkbox:checked').val(),
            sat: $('input[id=5][name=wkdy-chkbox]:checkbox:checked').val(),
            sun: $('input[id=6][name=wkdy-chkbox]:checkbox:checked').val()
        })
      .done(function() {
        console.log('Begin Submit');
      })
      .fail(function() {
          alert("Error! Data not saved");
      })
      .always(function() {
        console.log( "finished" );
      });
    //
    // Set another completion function for the request above
    jqxhr.always(function() {
      // Clear DOM here
      $('#rest-id-set-to').empty();
      $('#title-id-set-to').empty();
      $('#description-set-to').empty();
      $('#everyday').empty();
      $('#weekly').empty();
      $('#monthly').empty();
      $('#selected-start').empty();
      $('#selected-end').empty();
      $("#wdy-id-set-to").empty();
      location.reload();
    });
});
/**
 * After clicking checkbox for single day
 */
$("input#single-day").unbind("click").click(function(){
    $('#occurrence').fadeOut('slow');
    //$('#id_end_date_start').fadeOut('slow');
    //$('#id_start_date_end').fadeOut('slow');
});
/**
 * After clicking checkbox for repeat
 */
$("input#repeat").unbind("click").click(function(){
    $('#occurrence').fadeIn('slow');
    //$('#id_end_date_start').fadeIn('slow');
    //$('#id_start_date_end').fadeIn('slow');
});

// jQuery Prototype function for clicking outside
(function($){
  $.fn.outside = function(ename, cb){
      return this.each(function(){
          var $this = $(this),
              self = this;
          $(document).bind(ename, function temp(e){
              if(e.target !== self && !$.contains(self, e.target)){
                  cb.apply(self, [e]);
                  if(!self.parentNode) $(document.body).unbind(ename, temp);
              }
          });
      });
  };
}(jQuery));
// Running click on prototype plugin
$('#id_end_date_end').outside('click', function(e) {
    var start_date_start = $('#id_start_date_start').val();
    var sdt = start_date_start.split(' ')[0];
    var stm = start_date_start.split(' ')[1];

    var end_date_end = $('#id_end_date_end').val();
    var edt = end_date_end.split(' ')[0];
    var etm = end_date_end.split(' ')[1];

    $('#id_start_date_end').val(sdt + ' ' + etm);
    $('#id_end_date_start').val(edt + ' ' + stm);
});

/**
 * Initialize Calendar
 */
$('#calendar').fullCalendar({
    header: {
        left: 'prev, next, today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
    },
    // First day in calendar week view
    firstDay: 1,
    weekNumbers: true,
    scrollTime: '07:00:00',
    allDay: true,
    defaultView: 'month',
    timezone: 'local',
    editable: true,
    allDaySlot: true,
    timeFormat: 'HH:mm',
    eventOverlap: false,
    droppable: true, // this allows things to be dropped onto the calendar
    eventLimit: true, // allow "more" link when too many events
    events: function(start, end, timezone, callback) {
        $('.loader').show();
        $.ajax({
            url: '/events',
            dataType: 'json',
            data: {
                start: start.format(),
                end: end.format()
            },
            success: function(doc) {

                var events = [];
                var today = new Date();
                if(!!doc){
                    $.map( doc, function( r ) {
                        events.push({
                            id: r.id,
                            title: r.title,
                            description: r.description,
                            start: r.start,
                            end: r.end,
                            color: (moment(r.end).format('YYYY-MM-DD HH:mm:ss') < moment(today).format('YYYY-MM-DD HH:mm:ss')) ? '#E6E6E6': (moment(r.end).format('YYYY-MM-DD HH:mm:ss') > moment(today).format('YYYY-MM-DD HH:mm:ss')) ? 'green' : '#E6E6E6'
                        });
                    });
                }
                callback(events);
                $('.loader').hide();
            }
        });
    },
    //axisFormat: 'HH:mm',
    selectable: true,
    selectHelper: true,
    select: function(start, end, date) {
        var check = moment(start).format('YYYY-MM-DD');
        var today = moment(today).format('YYYY-MM-DD');

        // var today = new Date(); // Getting today's date
        var selected = moment(start).format('YYYY-MM-DD HH:mm:ss'); // Format start date selected
        //var today = moment(today).format('YYYY-MM-DD HH:mm:ss'); // Format today's date
        var allDay = !start.hasTime() && !end.hasTime();
        var startdate = moment(start).format('YYYY-MM-DD HH:mm:ss');
        var enddate = moment(end).format('YYYY-MM-D HH:mm:ss');
        var enddt = enddate.split(' ')[0];
        var endtime = enddate.split(' ')[1];

        if(check < today){
            // Show modal if the date selected is less than current date
            $('#ModalError').modal('show');
        }
        else if(check == today || check > today ){
            // To render modal for creating a task with start and end datetime field filled
            $('#ModalAdd #id_start_date_start').val(moment(start).format('YYYY-MM-DD HH:mm:ss'));
            //$('#ModalAdd #id_start_date_end').val(enddt+' '+endtime);
            $('#ModalAdd #id_end_date_start').val(moment(end).format('YYYY-MM-DD HH:mm:ss'));
            $('#ModalAdd #id_end_date_end').val(moment(end).format('YYYY-MM-DD HH:mm:ss'));
            $('#ModalAdd').modal('show');
            $('#selected-start1').html(selected);
        }
    },
    eventRender: function(event, element) {
        element.append("<span class='closeon' style='margin-left:auto'><span class='glyphicon glyphicon-trash' style='font-size:10px'></span></span>");
        element.find(".closeon").click(function() {
            // Confirm delete
            if (confirm("Are you sure you want to delete?") == true) {
                // call delete function
                delete_event(event);
                // Clear event from calendar
                $('#calendar').fullCalendar('removeEvents', event.id);
            } else {
                return false;
            }
        });

        element.bind('dblclick', function() {
            console.log(event);
            $('#ModalEdit #id-edit-restaurant').val(event.title);
            $('#ModalEdit #id_start_date').val(moment(event.start).format('YYYY-MM-DD HH:mm:ss'));
            $('#ModalEdit #id_end_date').val(moment(event.end).format('YYYY-MM-DD HH:mm:ss'));
            $('#ModalEdit').modal('show');
            //window.location.href="/admin/deals/edit/"+event.id+"/";

        });
    },
    eventDrop: function(event) {
        edit(event);
    },
    eventResize: function(event) {
        edit(event);
    },
    eventMouseover: function(event) {
        var start = moment(event.start).format('DD MMM, YYYY HH:mm:ss');
        var end = moment(event.end).format('DD MMM, YYYY HH:mm:ss');
        var tooltip = '<div class="tooltipevent" style="border:none;border-radius:3px;' +
        'background:transparent;position:absolute;z-index:3000;display:block;opacity: 0.85;">' +
        '<ul class="list-group"><li class="list-group-item">Title: ' + event.title + '</li>' +
        '<li class="list-group-item">Description: ' + event.description + '</li>' +
        '<li class="list-group-item">Start Date: ' + start + '</li>' +
        '<li class="list-group-item">End Date: ' + end + '</li>' +
        '</div>';
        var $tooltip = $(tooltip).appendTo('body');

        $(this).mouseover(function(e) {
            $(this).css('z-index', 10000);
            $tooltip.fadeIn('500');
            $tooltip.fadeTo('10', 1.9);
        }).mousemove(function(e) {
            $tooltip.css('top', e.pageY + 10);
            $tooltip.css('left', e.pageX + 20);
        });
    },

    eventMouseout: function() {
        $(this).css('z-index', 8);
        $('.tooltipevent').remove();
    }
});

// To edit
var edit = function(){
    start = moment(event.start).format('YYYY-MM-DD HH:mm:ss');
    sdate = start.split(" ")[0];
    stime = start.split(" ")[1];

    if(event.end){
        end = event.end.format('YYYY-MM-DD HH:mm:ss');
        edate = end.split(" ")[0];
        etime = end.split(" ")[1];

    }else{
        edate = sdate;
        etime = stime;
    }

    id =  event.id;
    title = event.menu_item;
    price_in_kes = event.price_in_kes;
    description = event.description;

    $.post( '#', { csrfmiddlewaretoken: '{{ csrf_token }}' })
    .done(function() {
      alert("Saved");
    })
    .fail(function() {
      alert("Error! Data not saved");
    })
    .always(function() {
      console.log( "finished" );
    });
};
// To delete
var delete_event = function(event){
    start = event.start.format('YYYY-MM-DD HH:mm:ss');
    sdate = start.split(" ")[0];
    stime = start.split(" ")[1];

    id =  event.id;
    title = event.menu_item;
    price_in_kes = event.price_in_kes;
    description = event.description;

    if(event.end){
        end = event.end.format('YYYY-MM-DD HH:mm:ss');
        edate = end.split(" ")[0];
        etime = end.split(" ")[1];

    }else{
        edate = sdate;
        etime = stime;
    }
    $.post('#', {
        csrfmiddlewaretoken: '{{ csrf_token }}',
        id: id
        },
        function(){
            console.log("Deleted");
    });
};
