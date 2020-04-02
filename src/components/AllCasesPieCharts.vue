<template>
    <div>
        <div class="AllCasesPieCharts" style="height:500px; width:100% ;"></div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AllCasesPieCharts",
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
            fetchData() {
                this.axiosInstance.get("/cases/total").then(response => {
                    this.drawChart(response.data);
                }).catch(error => {
                    console.log(error);
                })
            },

            drawChart(graphData) {
                const myChart = window.echarts.init(document.getElementsByClassName("AllCasesPieCharts")[0]);

                myChart.setOption({
                    color: ['#f14668', '#3298dc', '#48c774'],
                    title: {
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                    },

                    toolbox: {
                        feature: {
                            saveAsImage: {
                                title: 'Save as image'
                            }
                        }
                    },

                    legend: {
                        bottom: 10,
                        left: 'center',
                        data: ['Affected People', 'Recovered', 'Deaths']
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '80%',
                            center: ['50%', '50%'],
                            data: [
                                {
                                    label: {
                                        backgroundColor: '#eee',
                                        borderColor: '#777',
                                        borderWidth: 1,
                                        borderRadius: 4,

                                    }
                                },
                                {value: graphData.confirmed, name: 'Affected People'},
                                {value: graphData.recovered, name: 'Recovered'},
                                {value: graphData.deaths, name: 'Deaths'},
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }, true)
            }

        }
    }
</script>

<style scoped>

</style>