<template>
    <div>
        <main-navbar></main-navbar>
        <section class="section pt0">
            <h1 class="title has-text-centered">
                Novel Corona Virus (COVID-19) Statistics India
            </h1>
            <h2 class="subtitle has-text-centered mb2">
                Last updated: {{lastUpdatedTime}} ({{hoursAgo}})
            </h2>
            <div class="columns has-text-centered main-stats mt5 mb4">
                <div class="column">
                    <p class="title is-size-4 confirmed-color-light">
                        Confirmed
                    </p>
                    <p class="subtitle is-size-3 confirmed-color">
                        {{withCommas(totalConfirmedCases)}}
                    </p>
                </div>

                <div class="column">
                    <p class="title is-size-4 recovered-color-light">
                        Recovered
                    </p>
                    <p class="subtitle is-size-3 recovered-color">
                        {{withCommas(totalRecoveredCases)}}
                    </p>
                </div>

                <div class="column">
                    <p class="title is-size-4 deaths-color-light">
                        Deaths
                    </p>
                    <p class="subtitle is-size-3 deaths-color">
                        {{withCommas(totalDeathCases)}}
                    </p>
                </div>
            </div>

            <div class="visualization-wrapper">
                <india-map></india-map>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="visualization-wrapper box mb2">
                    <h2 class="subtitle has-text-centered">
                        Number of infected, recovered and death cases over time.
                    </h2>
                    <div class="StackedLargeScaleAreaChart" style="height: 400px"></div>

                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="visualization-wrapper box mb2">
                    <h2 class="subtitle has-text-centered">
                        State wise analysis
                    </h2>
                    <div id="bar" style="height: 1000px"></div>

                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="visualization-wrapper box mb2">
                    <h2 class="subtitle has-text-centered">
                        State wise analysis(Infected, Discharged and death cases)
                    </h2>
                    <div>
                        <b-table class="table-padding"
                                 v-if="details"
                                 :hoverable="true"
                                 :striped="true"
                                 :narrowed="false"
                                 :data="details">

                            <template slot-scope="props">
                                <b-table-column  class="table-padding2" field="name" label="State">
                                    {{props.row.loc}}
                                </b-table-column>
                                <b-table-column class="table-padding2" field="confirmed" label="Confirmed">
                                    <span class="confirmed-color">
                                        {{props.row.confirmedCasesIndian}}
                                    </span>
                                </b-table-column>
                                <b-table-column class="table-padding2" field="Recovered" label="Recovered">
                                    <span class="recovered-color">
                                        {{props.row.discharged}}
                                    </span>
                                </b-table-column>
                                <b-table-column class="table-padding2" field="deaths" label="Deaths">
                                    <span class="deaths-color">
                                        {{props.row.deaths}}
                                    </span>
                                </b-table-column>

                            </template>

                        </b-table>
                    </div>
                </div>

                <div class="box mb8">
                    <h2 class="subtitle has-text-centered">
                        Data Sources
                    </h2>
                    <p class="has-text-centered">
                        All data shown on this page has been sourced from
                        <a href="https://github.com/amodm/api-covid19-in" target="_blank">
                            Covid 19 IN
                        </a>
                    </p>
                </div>
            </div>
        </section>

        <main-footer></main-footer>

    </div>
</template>

<script>
    import axios from "axios";
    import {timeDifferenceForHumans} from '@/utils/utils.js'
    export default {
        name: "IndiaVisualization.vue",
        components:{
            MainFooter: () => import('../MainFooter'),
            MainNavbar: () => import('../MainNavbar.vue'),
            IndiaMap: () => import('../maps/IndiaMap')
        },
        data(){
            return {
                totalConfirmedCases: '',
                totalRecoveredCases: '',
                totalDeathCases: '',
                details: [],
                lastUpdatedTime: '',
                hoursAgo: ''
            }
        },
        mounted(){
            this.axiosInstance = axios.create({
                timeout: 50000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.fetchDataDayWise();
            this.drawBarGraph();
            this.fetchStateWiseData();
        },
        methods:{
            withCommas(number){
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            fetchDataDayWise(){
                this.axiosInstance.get("/india-data/day-wise")
                    .then(response => {
                        let detailed_data = response.data.data;

                        let finalArray = detailed_data.map(function (obj) {
                            return obj.day;
                        });

                        let finalArray2 = detailed_data.map(function (obj) {
                            return obj.summary.confirmedCasesIndian;
                        });

                        let finalArray3 = detailed_data.map(function (obj) {
                            return obj.summary.discharged;
                        });

                        let finalArray4 = detailed_data.map(function (obj) {
                            return obj.summary.deaths;
                        });

                        this.drawChart(finalArray,finalArray2,finalArray3,finalArray4);

                        this.$data.totalConfirmedCases = finalArray2[finalArray2.length - 1];
                        this.$data.totalRecoveredCases = finalArray3[finalArray2.length - 1];
                        this.$data.totalDeathCases = finalArray4[finalArray2.length - 1];
                        this.$data.lastUpdatedTime = (new Date(response.data.lastRefreshed)).toDateString();
                        this.$data.hoursAgo = timeDifferenceForHumans((new Date().getTime()), (new Date(response.data.lastRefreshed)).getTime());


                    }).catch(error => {
                    console.log(error.response.data)
                })
            },

            drawChart(finalArray,finalArray2,finalArray3,finalArray4){
                const myChart = window.echarts.init(document.getElementsByClassName("StackedLargeScaleAreaChart")[0]);
                const x_axis = finalArray;
                const confirmed = finalArray2;
                const recovered = finalArray3;
                const death = finalArray4;

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
                        data: ['Infected','Recovered','Deaths']
                    },

                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_axis
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
                                color: '#ff073a'
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
                                color: '#28a745'
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
                                color: '#007bff'
                            },
                            data: confirmed
                        },

                    ]

                }, true)

            },

            drawBarGraph(){
                this.axiosInstance.get("/data/india/state-wise")
                    .then(response => {
                        var detail_data_array = response.data.data.regional;

                        var finalArray = detail_data_array .map(function (obj) {
                            return obj.loc;
                        });

                        var finalArray2 = detail_data_array .map(function (obj) {
                            return obj.confirmedCasesIndian;
                        });

                        var finalArray3 = detail_data_array .map(function (obj) {
                            return obj.discharged;
                        });

                        var finalArray4 = detail_data_array .map(function (obj) {
                            return obj.deaths;
                        });


                        const myChart = window.echarts.init(document.getElementById('bar'));
                        myChart.setOption({

                            // title: {
                            //     text: 'STATE WISE ANALYSIS',
                            // },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            legend: {
                                data: ['Infected People','Discharged', 'Deaths']
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
                                data: finalArray
                            },
                            series: [
                                {
                                    name: 'Infected People',
                                    type: 'bar',
                                    data: finalArray2,
                                    color: '#007bff',
                                },
                                {
                                    name: 'Discharged',
                                    type: 'bar',
                                    data: finalArray3,
                                    color: '#28a745',
                                },
                                {
                                    name: 'Deaths',
                                    type: 'bar',
                                    data: finalArray4,
                                    color: '#ff073a'
                                }
                            ]
                        })

                    }).catch(error => {
                    console.log(error.response.data)
                })
            },

            fetchStateWiseData(){
                this.axiosInstance.get('/data/india/state-wise')
                .then(response =>{
                    this.$data.details = response.data.data.regional;

                }).catch(error=>{
                    console.log(error.response.data)
                })
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
    .table-padding{
        text-align: center!important;
    }
    .table-padding2{
        padding: 10px;

    }
</style>