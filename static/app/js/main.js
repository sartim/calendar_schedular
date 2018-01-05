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