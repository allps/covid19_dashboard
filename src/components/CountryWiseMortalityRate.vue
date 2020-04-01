<template>
    <div>
        <div class="columns mt5 is-multiline">
            <div class="column is-12">
                <p class="has-text-centered">
                    Mortality Rate (%)
                </p>
                <div class="CountryWiseMortalityRate" style="height: 400px"></div>
            </div>
            <div class="column is-12">
                <p class="has-text-centered">
                    Recovery Rate (%)
                </p>
                <div class="CountryWiseRecoveryRate" style="height: 400px"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "CountryWiseMortalityRate",
        data(){
            return {
                complete_list: {},
                mortality_rate_chart:{},
                recovery_rate_chart:{},
                countries_to_show: 10
            }
        },
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
                const self = this;
                this.axiosInstance.get("/perCountry/mortality").then(response => {
                    self.$data.complete_list = response.data;
                    let x_axis_mortality = self.$data.complete_list.data.mortality_rate.slice(0, 10);
                    let x_axis_recovery = self.$data.complete_list.data.recovery_rate.slice(0, 10);

                    self.$data.mortality_rate_chart = {
                        countries: self.$data.complete_list.data.country.slice(0, self.$data.countries_to_show),
                        x_axis: x_axis_mortality.map(x => {
                            return (x * 100).toPrecision(4);
                        }),
                        elementClass: 'CountryWiseMortalityRate',
                        color: '#f14668',
                        name: 'Mortality Rate'
                    };

                    self.$data.recovery_rate_chart = {
                        countries: self.$data.complete_list.data.country.slice(0, self.$data.countries_to_show  ),
                        x_axis: x_axis_recovery.map(x => {
                            return (x * 100).toPrecision(4);
                        }),
                        elementClass: 'CountryWiseRecoveryRate',
                        color: '#48c774',
                        name: 'Recovery Rate'

                    };
                    self.drawChart(self.$data.recovery_rate_chart);
                    self.drawChart(self.$data.mortality_rate_chart);
                }).catch(error => {
                    //alert('cannot fetch data!');
                    console.log(error);
                })
            },


            drawChart(chartData) {
                const myChart = window.echarts.init(document.getElementsByClassName(chartData.elementClass)[0]);
                console.log(chartData);
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
                            data: chartData.countries
                        },
                        series: [
                            {
                                name: chartData.name,
                                type: 'bar',
                                data: chartData.x_axis,
                                color: chartData.color,
                            },

                        ]
                    }
                )

            },
        }
    }
</script>

<style scoped>
    .first_column{
        border-right: 1px solid;
    }
</style>