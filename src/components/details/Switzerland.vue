<template>
    <div>
        <main-navbar></main-navbar>
        <section class="section pt0">
            <h1 class="title has-text-centered">
                Novel Corona Virus (COVID-19) Statistics Switzerland
            </h1>
<!--            <h2 class="subtitle has-text-centered mb2">-->
<!--                Last updated: {{lastUpdatedTime}} ({{hoursAgo}})-->
<!--            </h2>-->
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
                <switzerland-map v-bind:swiss-map-data="kantons"></switzerland-map>
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
                        Number of infected cases over time in Kantons.
                    </h2>
                    <div class="StackedConfirmedCasesChart" style="height: 400px"></div>

                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="visualization-wrapper box mb2">
                    <h2 class="subtitle has-text-centered">
                        Kanton wise analysis(Infected, recovered and death cases)
                    </h2>
                    <div >
                        <b-table v-if="kantons"
                                :hoverable="true"
                                :striped="true"
                                :narrowed="false"
                                 :data="kantons"
                                >

                            <template slot-scope="props">
                                <b-table-column class="table-padding2" field="name" label="Kantons" >
                                    {{props.row.kanton}}
                                </b-table-column>
                                <b-table-column class="table-padding2" field="confirmed" label="Confirmed Cases" >
                                    <span class="confirmed-color">
                                        {{props.row.confirmed}}
                                    </span>
                                </b-table-column>
                                <b-table-column class="table-padding2" field="Recovered" label="Recovered">
                                    <span class="recovered-color">
                                        {{props.row.recovered}}
                                    </span>
                                </b-table-column>
                                <b-table-column class="table-padding2" field="deaths" label="Deaths">
                                    <span class="deaths-color">
                                        {{props.row.death}}
                                    </span>
                                </b-table-column>
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
    import SwitzerlandMap from "../maps/SwitzerlandMap";

    export default {
        name: "switzerland.vue",
        components:{
            SwitzerlandMap,
            MainFooter: () => import('../MainFooter'),
            MainNavbar: () => import('../MainNavbar.vue')
        },
        data(){
            return{
                totalConfirmedCases: '',
                totalRecoveredCases: '',
                totalDeathCases: '',
                kantons: []
            }
        },
        mounted(){
            this.axiosInstance = axios.create({
                timeout: 50000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.fetchDataDayWiseInSwitzerland();
            this.drawChartKantonWiseConfirmedCases();
            this. drawTable();
        },


        methods:{
            withCommas(number){
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            fetchDataDayWiseInSwitzerland(){
                this.axiosInstance.get('/switzerland-data/day-wise')
                .then(response =>{
                    this.$data.totalConfirmedCases = response.data.confirmedCases.totalConfirmedCases;
                    this.$data.totalRecoveredCases = response.data.recoveredCases.totalRecoveredCases;
                    this.$data.totalDeathCases = response.data.deathCases.totalDeathCases;
                    var date_list = response.data.confirmedCases.Dates;
                    var confirmed_list  = response.data.confirmedCases.confirmed;
                    var recovered_list  = response.data.recoveredCases.recovered;
                    var death_list  = response.data.deathCases.death;
                    this.drawChartDayWise(date_list, confirmed_list, recovered_list, death_list)
                }).catch(error=>{
                    console.log(error.response.data)
                })
            },

            // eslint-disable-next-line no-unused-vars
            drawChartDayWise(date_list, confirmed_list, recovered_list, death_list){
                var humanDate = [];
                date_list.forEach((x_axis_item) =>{
                    // Timestamp is in nanoseconds. Convert it to human readable form
                    humanDate.push((new Date(x_axis_item *1000)).toLocaleDateString());
                });

                const myChart = window.echarts.init(document.getElementsByClassName("StackedLargeScaleAreaChart")[0]);
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
                        data: ['Infected','Recovered', 'Deaths']
                    },

                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: humanDate
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
                            data: death_list
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
                            data: recovered_list
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
                            data: confirmed_list
                        },
                    ]

                }, true)


            },

            drawChartKantonWiseConfirmedCases(){
                this.axiosInstance.get('/switzerland-data/kanton-wise')
                .then(response=>{
                    console.log(response.data)
                    var date = response.data.confirmedCases.dates;
                    var kantonDetails = response.data.confirmedCases.kanton_details;

                    let kantonArray = kantonDetails.map(function (obj) {
                        return obj.kanton;
                    });
                    let dataArray = kantonDetails.map(function (obj) {
                        return obj.confirmed;
                    });

                    var humanDate = [];
                    date.forEach((x_axis_item) =>{
                        // Timestamp is in nanoseconds. Convert it to human readable form
                        humanDate.push((new Date(x_axis_item *1000)).toLocaleDateString());
                    });

                    const myChart = window.echarts.init(document.getElementsByClassName("StackedConfirmedCasesChart")[0]);

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

                                xAxis: [
                                    {
                                        type: 'category',
                                        boundaryGap: false,
                                        data: humanDate
                                    }
                                ],

                                yAxis: {
                                    type: 'value',
                                    boundaryGap: [0, '10%']
                                },

                                legend: {
                                    data: [kantonArray[0],kantonArray[1], kantonArray[2], kantonArray[3],
                                        kantonArray[4], kantonArray[5], kantonArray[6], kantonArray[7],
                                        kantonArray[8], kantonArray[9], kantonArray[10], kantonArray[11],
                                        kantonArray[12], kantonArray[13],kantonArray[14],kantonArray[15],
                                        kantonArray[16],kantonArray[17],kantonArray[18],kantonArray[19],kantonArray[20],
                                        kantonArray[21],kantonArray[22],kantonArray[23],kantonArray[24],kantonArray[25] ]
                                },

                                series: [
                                    {
                                        name: kantonArray[0],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[0]
                                    },
                                    {
                                        name: kantonArray[1],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[1]
                                    },
                                    {
                                        name: kantonArray[2],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[2]
                                    },
                                    {
                                        name: kantonArray[3],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[3]
                                    },
                                    {
                                        name: kantonArray[4],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[4]
                                    },
                                    {
                                        name: kantonArray[5],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[5]
                                    },
                                    {
                                        name: kantonArray[6],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[6]
                                    },
                                    {
                                        name: kantonArray[7],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[7]
                                    },
                                    {
                                        name: kantonArray[8],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[8]
                                    },
                                    {
                                        name: kantonArray[9],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[9]
                                    },
                                    {
                                        name: kantonArray[10],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[10]
                                    },{
                                        name: kantonArray[11],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[11]
                                    },
                                    {
                                        name: kantonArray[12],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[12]
                                    },
                                    {
                                        name: kantonArray[13],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[13]
                                    },
                                    {
                                        name: kantonArray[15],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[15]
                                    },
                                    {
                                        name: kantonArray[16],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[16]
                                    },
                                    {
                                        name: kantonArray[17],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[17]
                                    },
                                    {
                                        name: kantonArray[18],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[18]
                                    },
                                    {
                                        name: kantonArray[19],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[19]
                                    },
                                    {
                                        name: kantonArray[20],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[20]
                                    },
                                    {
                                        name: kantonArray[21],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[21]
                                    },
                                    {
                                        name: kantonArray[22],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[22]
                                    },
                                    {
                                        name: kantonArray[23],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[23]
                                    },
                                    {
                                        name: kantonArray[24],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[24]
                                    },
                                    {
                                        name: kantonArray[25],
                                        type: 'line',
                                        smooth: true,
                                        symbol: 'none',
                                        sampling: 'average',
                                        itemStyle: {
                                        },
                                        data: dataArray[25]
                                    },
                                ]

                            }, true)

                }).catch(error=>{
                    console.log(error.response.data)
                })
            },

            drawTable(){
                this.axiosInstance.get('/switzerland-data/for-table')
                .then(response =>{
                    this.$data.kantons = response.data.data;
                }).catch(error=>{
                    console.log(error.response.data)
                })
            },
        }
    }

</script>

<style scoped>

</style>