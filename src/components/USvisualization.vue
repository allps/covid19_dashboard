<template>
    <div>
        <main-navbar></main-navbar>
        <section class="section pt0">
            <h1 class="title has-text-centered">
                Novel Corona Virus (COVID-19) Statistics USA
            </h1>
<!--            <h2 class="subtitle has-text-centered mb2">-->
<!--                Last updated: {{lastUpdatedTime}} ({{hoursAgo}})-->
<!--            </h2>-->
<!--            <div class="visualization-wrapper">-->
<!--                <world-map></world-map>-->
<!--            </div>-->
            <div class="columns has-text-centered main-stats">
                <div class="column">
                    <p class="title is-size-4">
                        Infected
                    </p>
                    <p class="subtitle is-size-3">
                        {{withCommas(totalConfirmedCases)}}
                    </p>
                </div>

                <div class="column">
                    <p class="title is-size-4">
                        Deaths
                    </p>
                    <p class="subtitle is-size-3">
                        {{withCommas(totalDeathCases)}}
                    </p>
                </div>
            </div>
        </section>


        <section>
            <div class="container">
                <div class="visualization-wrapper box mb8">
                    <h2 class="subtitle has-text-centered">
                        Number of infected and death cases over time.
                    </h2>
                    <div class="StackedLargeScaleAreaChart" style="height: 400px"></div>

                </div>
            </div>
        </section>

        <main-footer></main-footer>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "USvisualization",
        components:{
            MainFooter: () => import('./MainFooter'),
            MainNavbar: () => import('./MainNavbar.vue')
        },

        data() {
            return {
                  totalConfirmedCases: '',
                  totalDeathCases: ''
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
            withCommas(number){
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            fetchData(){
                this.axiosInstance.get("/us-data/day-wise")
                    .then(response => {
                        this.$data.totalConfirmedCases = response.data.totalConfirmedCases;
                        this.$data.totalDeathCases = response.data.totalDeathCases;
                        this.drawChart(response.data)
                    }).catch(error => {
                    console.log(error.response.data)
                })
            },

            drawChart(graphData) {
                const myChart = window.echarts.init(document.getElementsByClassName("StackedLargeScaleAreaChart")[0]);
                const x_axis = graphData.date;
                const arr_y = graphData.confirmed;
                const death = graphData.deaths;
                const human_date = [];

                x_axis.forEach((x_axis_item) =>{
                    // Timestamp is in nanoseconds. Convert it to human readable form
                    human_date.push((new Date(x_axis_item *1000)).toLocaleDateString());

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
                            data: ['Infected', 'Deaths']
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
                                    color: '#f14668'
                                },
                                data: death
                            },

                            {
                                name: 'Infected',
                                type: 'line',
                                smooth: true,
                                symbol: 'none',
                                sampling: 'average',
                                itemStyle: {
                                    color: '#3298dc'
                                },
                                data: arr_y
                            },
                        ]

                    }, true)
                });
            },

        }
    }
</script>

<style scoped>
    .main-stats .column{
        border-right: 1px solid rgba(0, 0, 0, 0.2)
    }

    .main-stats .column:last-child{
        border-right: none
    }

    @media only screen and (max-width: 430px) {
        .main-stats .column{
            border-right: none
        }
    }
</style>