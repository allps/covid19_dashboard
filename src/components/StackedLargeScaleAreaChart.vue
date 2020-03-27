<template>
    <div>
        <div class="StackedLargeScaleAreaChart" style="height: 400px"></div>
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
                const myChart = window.echarts.init(document.getElementsByClassName("StackedLargeScaleAreaChart")[0]);
                const x_axis = graphData.json_xax;
                const arr_y = graphData.confirmed;
                const recovered = graphData.recovered;
                const death = graphData.death;
                const human_date = [];

                x_axis.forEach((x_axis_item) =>{
                    // Timestamp is in nanoseconds. Convert it to human readable form
                    human_date.push((new Date(x_axis_item / 1000000)).toLocaleDateString());

                    myChart.setOption({
                        renderer: 'svg',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },

                        toolbox: {
                            feature: {
                                saveAsImage: {
                                    title: 'Save as image'
                                }
                            }
                        },

                        legend: {
                            data: ['Infected', 'Recovered', 'Deaths']
                        },

                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: human_date
                            }
                        ],

                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, '10%']
                        },

                        series: [
                            {
                                name: 'Deaths',
                                type: 'line',
                                smooth: true,
                                symbol: 'none',
                                sampling: 'average',
                                itemStyle: {
                                    color: 'rgb(255,15,7)'
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
                                    color: 'rgb(0,255,11)'
                                },
                                data: recovered
                            },

                            {
                                name: 'Infected',
                                type: 'line',
                                smooth: true,
                                symbol: 'none',
                                sampling: 'average',
                                itemStyle: {
                                    color: 'rgb(52,111,255)'
                                },
                                data: arr_y
                            },
                        ]

                    }, true)
                });
            }
        }
    }
</script>

<style scoped>

</style>