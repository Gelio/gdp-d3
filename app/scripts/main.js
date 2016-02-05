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

        var chartData = data.data;

        var height = 580,
            width = 980;

        var margins = {
            bottom: 20,
            left: 20
        };

        var chart = d3.select('.chart'),
            y = d3.scale.linear()
                .domain([0, d3.max(chartData, function(d) { return d[1];})])
                .range([height, 0]),
            x = d3.scale.ordinal()
                .domain(chartData.map(function(d) { return d[0];}))
                .rangeRoundBands([0, width], 0.1);

        console.log(chartData.map(function(d) { return d[0];}));
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickValues(x.domain().filter(function(d, i) { return !(i % 30);}));

        chart.attr('width', width + margins.left + 'px')
            .attr('height', height + margins.bottom + 'px');

        var innerChart = chart.append('g').attr('transform', 'translate(' + margins.left + ', 0)');

        /*innerChart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + (height + 1) + ')')
            .call(xAxis);*/

        innerChart.selectAll('g')
            .data(chartData)
            .enter().append('rect')
            .attr('x', function(d) { return x(d[0]) + 'px';})
            .attr('y', function(d) { return (y(d[1])) + 'px';})
            .attr('width', x.rangeBand() + 'px')
            .attr('height', function(d) { return (height  - y(d[1])) + 'px'})
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