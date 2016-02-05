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
        $('.chart').html('Data was fetched from the server. It\'s now processed and will be displayed shortly.');

        // Refactor that into one loop for more efficiency
        /*var periods = data.data.map(function(currData) { return currData[0]}),
            values = data.data.map(function(currData) { return currData[1]});*/

        var chartData = data.data;

        var height = 600,
            barWidth = 100/chartData.length;

        if(barWidth < 0)
            barWidth = 0.1;

        // Render data on the page
        var chart = d3.select('.chart'),
            x = d3.scale.linear()
                .domain([0, d3.max(chartData, function(d) { return d[1];})])
                .range([0, 100]);

        chart.attr('width', '100%')
            .attr('height', height + 'px');

        chart.selectAll('g')
            .data(chartData)
            .enter().append('rect')
            .attr('x', function(d, i) { return i/chartData.length*100 + '%';})
            .attr('y', function(d) { return (100 - x(d[1])) + '%';})
            .attr('width', barWidth + '%')
            .attr('height', function(d) { return x(d[1]) + '%'})
            .on('mouseover', highlightBar)
            .on('mouseout', removeHighlightAndTooltip)
            .on('mousemove', displayTooltip);
    }

    function highlightBar() {
        d3.select(this)
            .classed('highlighted', true)
    }

    function removeHighlightAndTooltip() {
        d3.select(this)
            .classed('highlighted', false);
        d3.select('.chart-tooltip')
            .classed('visible', false);
    }

    function displayTooltip(d) {
        //var mousePosition = d3.mouse(d3.select('.chart').node());
        var mousePosition = [ d3.event.pageX, d3.event.pageY ];
        d3.select('.chart-tooltip')
            .classed('visible', true)
            .style('left', (mousePosition[0] - 10) + 'px')
            .style('top', (mousePosition[1] + 15) + 'px')
            .text(d[0] + ' - ' + d[1]);
    }
})();