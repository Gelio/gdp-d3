(function() {
    var d3 = require('d3'),
        $ = require('jquery');

    $(document).ready(function() {
        $('.currYear').html(new Date().getFullYear());

        $.ajax({
            url: 'GDP-data.json',
            error: downloadError,
            success: downloadCompleted
        });
    });


    function downloadError(jqXHR, textStatus, errorThrown) {
        console.log('Cannot download data', jqXHR, textStatus, errorThrown);
        $('.chart').html('We\'re sorry, but data cannot be downloader from the server. Please try again later.');
    }

    function downloadCompleted(data) {
        console.log('Got data');
        console.log(data.data);

        // Render data on the page
    }
})();