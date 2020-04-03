<template>
    <div>
        <main-navbar></main-navbar>
        <section class="section pt0">
            <h1 class="title has-text-centered">
                Novel Corona Virus (COVID-19) Statistics India
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
                        Recovered
                    </p>
                    <p class="subtitle is-size-3">
                        {{withCommas(totalRecoveredCases)}}
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
                <div class="visualization-wrapper box mb2">
                    <h2 class="subtitle has-text-centered">
                        Number of infected, discharged and death cases over time.
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
                <div class="visualization-wrapper box mb8">
                    <h2 class="subtitle has-text-centered">
                        State wise analysis(Infected, Discharged and death cases)
                    </h2>
                    <div >
                        <b-table class="table-padding table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                                 v-if="details"
                                 :data= "details"
                        >

                            <template slot-scope="props" >
                                <b-table-column class="table-padding2" field="name" label="States" >{{props.row.loc}}</b-table-column>
                                <b-table-column class="table-padding2" field="confirmed" label="Infected" >{{props.row.confirmedCasesIndian}}</b-table-column>
                                <b-table-column class="table-padding2" field="Discharged" label="Discharged" >{{props.row.discharged}}</b-table-column>
                                <b-table-column class="table-padding2" field="deaths" label="Deaths" >{{props.row.deaths}}</b-table-column>

                            </template>

                        </b-table>
                    </div>
                </div>
            </div>
        </section>

        <main-footer></main-footer>

    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "IndiaVisualization.vue",
        components:{
            MainFooter: () => import('./MainFooter'),
            MainNavbar: () => import('./MainNavbar.vue')
        },
        data(){
            return {
                'totalConfirmedCases': '',
                'totalRecoveredCases': '',
                'totalDeathCases': '',
                'details': []
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
            this.fetchDataForTable();
        },
        methods:{
            withCommas(number){
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            fetchDataDayWise(){
                this.axiosInstance.get("/india-data/day-wise")
                    .then(response => {
                       var confirmed = response.data.total.data;
                       var deaths = response.data.deaths.data;
                       var recovered = response.data.discharged.data;
                       var dates = response.data.date.data;

                        var finalArray = dates.map(function (obj) {
                            return obj.day;
                        });

                        var finalArray2 = confirmed.map(function (obj) {
                            return obj.summary.total;
                        });

                        var finalArray3 = recovered.map(function (obj) {
                            return obj.summary.discharged;
                        });

                        var finalArray4 = deaths.map(function (obj) {
                            return obj.summary.deaths;
                        });

                        this.drawChart(finalArray,finalArray2,finalArray3,finalArray4);

                        this.$data.totalConfirmedCases = finalArray2[finalArray2.length - 1];
                        this.$data.totalRecoveredCases = finalArray3[finalArray2.length - 1];
                        this.$data.totalDeathCases = finalArray4[finalArray2.length - 1];


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
                                color: '#00d1b2'
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
                                color: '#3298dc'
                            },
                            data: confirmed
                        },

                    ]

                }, true)

            },

            drawBarGraph(){
                this.axiosInstance.get("/india-data/for-table")
                    .then(response => {
                        console.log(response.data)
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
                                    color: '#08519c',
                                },
                                {
                                    name: 'Discharged',
                                    type: 'bar',
                                    data: finalArray3,
                                    color: '#00d1b2',
                                },
                                {
                                    name: 'Deaths',
                                    type: 'bar',
                                    data: finalArray4,
                                    color: '#f14668'
                                }
                            ]
                        })

                    }).catch(error => {
                    console.log(error.response.data)
                })
            },

            fetchDataForTable(){
                this.axiosInstance.get('/india-data/for-table')
                .then(response =>{
                    console.log(response.data);
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