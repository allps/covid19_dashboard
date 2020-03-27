<template>
    <div>
        <div class="CountryWiseMortalityRate" style="height: 400px"></div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "CountryWiseMortalityRate",
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
                this.axiosInstance.get("/perCountry/mortality").then(response => {
                    this.drawChart(response.data);
                }).catch(error => {
                    //alert('cannot fetch data!');
                    console.log(error);
                })
            },


            drawChart(graphData) {
                const myChart = window.echarts.init(document.getElementsByClassName("CountryWiseMortalityRate")[0]);

                myChart.setOption(
                    {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },

                        toolbox: {
                            feature: {
                                saveAsImage: {
                                    title: 'Save as image'
                                }
                            }
                        },

                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        yAxis: {
                            type: 'category',
                            data: graphData.json_yax
                        },
                        series: [
                            {
                                name: 'Mortality Rate',
                                type: 'bar',
                                data: graphData.json_xax,
                                color: '#ff0817',
                            },

                        ]
                    }
                )

            },
        }
    }
</script>

<style scoped>

</style>