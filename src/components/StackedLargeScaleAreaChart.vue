<template>
    <div>
        <h1 class="title has-text-centered mt2 mb2">
            Worldwide case statistics
        </h1>

        <h2 class="subtitle has-text-centered mb3 mt2">
            Comparative rise of <span class="confirmed-color">confirmed cases</span>,
            <span class="recovered-color">recovered</span> and <span class="deaths-color">deaths</span> over time.
        </h2>
        <div id="all" style="height: 400px"></div>

        <h2 class="subtitle has-text-centered mb0 mt2">
            Number of <span class="confirmed-color">confirmed</span> cases over time.
        </h2>
        <div id="confirmed" style="height: 400px"></div>

        <h2 class="subtitle has-text-centered mb0 mt2">
            Number of <span class="recovered-color">recovered</span> cases over time.
        </h2>
        <div id="recovered" style="height: 400px"></div>

        <h2 class="subtitle has-text-centered mb0 mt2">
            Number of <span class="deaths-color">deaths</span> over time.
        </h2>
        <div id="deaths" style="height: 400px"></div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "StackedLargeScaleAreaChart",
        mounted() {
            this.axiosInstance = axios.create({
                timeout: 50000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            this.fetchData();
        },

        methods: {
            fetchData(){
                this.axiosInstance.get("/cases").then(response => {
                    this.drawChart(response.data);
                }).catch(error => {
                    //alert('cannot fetch data!');
                    console.log(error);
                })
            },

            drawChart(graphData) {
                const all_chart = window.echarts.init(document.getElementById("all"));
                const confirmed_chart = window.echarts.init(document.getElementById("confirmed"));
                const recovered_chart = window.echarts.init(document.getElementById("recovered"));
                const deaths_chart = window.echarts.init(document.getElementById("deaths"));

                const x_axis = graphData.dates;

                const confirmed = graphData.confirmed;
                const recovered = graphData.recovered;
                const death = graphData.deaths;

                const human_date = [];

                let tooltip = {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                };

                let toolbox = {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                };

                let legend = {
                    data: ['Confirmed', 'Recovered', 'Deaths']
                };

                let xAxis = [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: human_date
                    }
                ];

                let yAxis = {
                    type: 'value',
                    boundaryGap: [0, '10%']
                };

                let series = [
                    {
                        name: 'Deaths',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            color: '#f14668'
                        },
                        data: death
                    },

                    {
                        name: 'Recovered',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            color: '#48c774'
                        },
                        data: recovered
                    },

                    {
                        name: 'Confirmed',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            color: '#3298dc'
                        },
                        data: confirmed
                    },
                ];

                x_axis.forEach((x_axis_item) =>{
                    // Timestamp is in nanoseconds. Convert it to human readable form
                    human_date.push((new Date(x_axis_item * 1000)).toLocaleDateString());
                    all_chart.setOption({renderer: 'svg', tooltip: tooltip, toolbox: toolbox, legend: legend, xAxis: xAxis, yAxis: yAxis, series: series}, true);
                    confirmed_chart.setOption({renderer: 'svg', tooltip: tooltip, toolbox: toolbox, xAxis: xAxis, yAxis: yAxis, series: [series[2]]}, true);
                    recovered_chart.setOption({renderer: 'svg', tooltip: tooltip, toolbox: toolbox, xAxis: xAxis, yAxis: yAxis, series: [series[1]]}, true);
                    deaths_chart.setOption({renderer: 'svg', tooltip: tooltip, toolbox: toolbox, xAxis: xAxis, yAxis: yAxis, series: [series[0]]}, true);

                });
            }
        }
    }
</script>

<style scoped>

</style>