<template>
    <div>
        <main-navbar></main-navbar>
        <section class="section pt0">
            <h1 class="title has-text-centered">
                Novel Corona Virus (COVID-19) Statistics USA
            </h1>
            <h2 class="subtitle has-text-centered mb2">
                Last updated: {{last_updated}} ({{hoursAgo}})
            </h2>
            <div class="columns has-text-centered main-stats">
                <div class="column">

                    <p class="title is-size-4 confirmed-color">

                    <p class="title is-size-4 confirmed-color-light">

                        Confirmed
                    </p>
                    <p class="subtitle is-size-3 confirmed-color">
                        {{withCommas(totalConfirmedCases)}}
                    </p>
                </div>

                <div class="column">

                    <p class="title is-size-4 deaths-color">

                    <p class="title is-size-4 deaths-color-light">

                        Deaths
                    </p>
                    <p class="subtitle is-size-3 deaths-color">
                        {{withCommas(totalDeathCases)}}
                    </p>
                </div>
            </div>
            <div class="visualization-wrapper">
                <usa-map v-bind:usaMapData="states_array"></usa-map>
            </div>
        </section>


        <section>
            <div class="container">
                <div class="visualization-wrapper box mb2">
                    <h2 class="subtitle has-text-centered">
                        Number of infected and death cases over time.
                    </h2>
                    <div class="StackedLargeScaleAreaChart" style="height: 400px"></div>

                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="visualization-wrapper box mb2">
                    <h2 class="subtitle has-text-centered">
                        State wise analysis(Infected and death cases)
                    </h2>
                    <div id="bar" style="height: 1500px"></div>

                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="visualization-wrapper box mb2">
                    <h2 class="subtitle has-text-centered">
                        State wise analysis(Infected and death cases)
                    </h2>
                    <div >
                        <b-table
                                 v-if="states_array"
                                 :hoverable="true"
                                 :striped="true"
                                 :narrowed="false"
                                 :data= "states_array">

                            <template slot-scope="props" >
                                <b-table-column :searchable="true" class="table-padding2" field="name" label="States" >
                                    {{props.row.name}}
                                </b-table-column>
                                <b-table-column class="table-padding2" field="confirmed" label="Confirmed Cases" >
                                    <span class="confirmed-color">
                                        {{props.row.confirmed[0]}}
                                    </span>
                                </b-table-column>
                                <b-table-column class="table-padding2" field="deaths" label="Deaths" >
                                    <span class="deaths-color">
                                        {{props.row.deaths[0]}}
                                    </span>
                                </b-table-column>
                            </template>

                        </b-table>
                    </div>
                </div>

                <h1>Demographic Data Analysis</h1>
                <section>
                    <div class="container">
                        <div class="visualization-wrapper box mb2">
                            <h2 class="subtitle has-text-centered">
                              <u> Disclaimer</u> <br><br>
                                <p style="font-size: 15px">Data during this period are incomplete because of the lag in time
                                    between when the death occurred and when the death certificate is completed,
                                    submitted to NCHS and processed for reporting purposes. This delay can range from 1 week to 8 weeks
                                    or more, depending on the jurisdiction, age, and cause of death.
                                    <br><br>
                                    Influenza death counts include deaths with pneumonia or COVID-19 also
                                    listed as a cause of death.
                                </p>

                            </h2>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="container">
                        <div class="visualization-wrapper box mb2">
                            <h2 class="subtitle has-text-centered">
                                Age wise analysis(Death cases)
                            </h2>
                            <div id="barByAge" style="height: 600px"></div>

                        </div>
                    </div>
                </section>

                <section>
                    <div class="container">
                        <div class="visualization-wrapper box mb2">
                            <h2 class="subtitle has-text-centered">
                                Gender wise analysis(Death cases)
                            </h2>
                            <div id="barBySex" style="height: 400px"></div>

                        </div>
                    </div>
                </section>

                <section>
                    <div class="container">
                        <div class="visualization-wrapper box mb2">
                            <h2 class="subtitle has-text-centered">
                                 Total Death Cases due to Covid19
                            </h2>
                            <div id="pieChart" style="height: 500px"></div>

                        </div>
                    </div>
                </section>

                <div class="box mb8">
                    <h2 class="subtitle has-text-centered">
                        Data Sources
                    </h2>
                    <p class="has-text-centered">
                        All data shown on this page has been sourced from
                        <a href="https://github.com/nytimes/covid-19-data" target="_blank">
                            New York Times Covid-19 Repository,
                        </a>
                        <br> And Demographic data taken from -
                        <a href="https://www.cdc.gov/nchs/nvss/vsrr/COVID19/index.htm" target="_blank">
                            Centers for Disease Control and Prevention(CDC)
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
        name: "USvisualization",
        components:{
            MainFooter: () => import('../MainFooter'),
            UsaMap: () => import('../maps/UsaMap'),
            MainNavbar: () => import('../MainNavbar.vue')
        },

        data() {
            return {
                totalConfirmedCases: '',
                totalDeathCases: '',
                last_updated: '',
                states_array: '',
                hoursAgo: ''
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
            this.drawBarGraph();
            this.drawTable();
            this.drawDemographicBarGraphByAge();
            this.drawDemographicBarGraphBySex();
            this.drawPieChartAccordingSex();
        },

        methods: {
            withCommas(number){
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            fetchData(){
                this.axiosInstance.get("/data/usa/day-wise")
                    .then(response => {
                        this.$data.totalConfirmedCases = response.data.totalConfirmedCases;
                        this.$data.totalDeathCases = response.data.totalDeathCases;
                        this.drawChart(response.data);

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
                                    color: '#ff073a'
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
                                    color: '#007bff'
                                },
                                data: arr_y
                            },
                        ]

                    }, true)
                });
            },

            drawBarGraph(){
                this.axiosInstance.get("/data/usa/each-state")
                    .then(response => {
                        var state_list = response.data.y_list;
                        var case_list = response.data.case_list;
                        var death_list = response.data.death_list;

                        const myChart = window.echarts.init(document.getElementById('bar'));
                        myChart.setOption({
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            legend: {
                                data: ['Infected People', 'Deaths']
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
                                data: state_list
                            },
                            series: [
                                {
                                    name: 'Infected People',
                                    type: 'bar',
                                    data: case_list,
                                    color: '#007bff',
                                },
                                {
                                    name: 'Deaths',
                                    type: 'bar',
                                    data: death_list,
                                    color: '#ff073a'
                                }
                            ]
                        })

                    }).catch(error => {
                    console.log(error.response.data)
                })
            },

            drawTable(){
                this.axiosInstance.get("/data/usa/for-table")
                    .then(response => {
                        this.$data.states_array = response.data.data;
                        this.$data.last_updated = response.data.created_at;

                        this.$data.last_updated = (new Date(response.data.created_at * 1000 )).toDateString();
                        this.$data.hoursAgo = timeDifferenceForHumans((new Date().getTime()), (new Date(response.data.created_at * 1000)).getTime());
                    }).catch(error => {
                    console.log(error.response.data)
                })
            },

            //method to paint charts.
            drawDemographicBarGraphByAge(){
                this.axiosInstance.get('https://data.cdc.gov/resource/hc4f-j6nb.json')
                .then(response=> {
                    // eslint-disable-next-line no-empty
                    var group = 'By age';
                    var indicatorArray = [];
                    var covidDeathsArray = [];
                    var pneumoniaDeaths = [];
                    var influenzaArray = [];
                    for (var i = 0; i < response.data.length; i++){
                        if(response.data[i].group == group){
                            var indicator = response.data[i].indicator.replace('&ndash;','-');
                            var covidDeaths = response.data[i].covid_deaths;
                            var pneumonia = response.data[i].pneumonia_and_covid_deaths;
                            var influenza = response.data[i].all_influenza_deaths_j09_j11;

                            indicatorArray.push(indicator);
                            covidDeathsArray.push(covidDeaths);
                            pneumoniaDeaths.push(pneumonia);
                            influenzaArray.push(influenza);
                        }

                    }
                    const myChart = window.echarts.init(document.getElementById('barByAge'));
                    myChart.setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        legend: {
                            data: ['Covid19', 'Pneumonia with Covid19', 'Influenza']
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
                            data: indicatorArray
                        },
                        series: [
                            {
                                name: 'Covid19',
                                type: 'bar',
                                data: covidDeathsArray,
                                color: '#007bff',
                            },
                            {
                                name: 'Pneumonia with Covid19',
                                type: 'bar',
                                data: pneumoniaDeaths,
                                color: '#f14668'
                            },
                            {
                                name: 'Influenza',
                                type: 'bar',
                                data: influenzaArray,
                                color: '#48c774'
                            }
                        ]
                    })

                }).catch(error=>{
                    console.log(error.response.data)
                })
            },

            drawDemographicBarGraphBySex(){
                this.axiosInstance.get('https://data.cdc.gov/resource/hc4f-j6nb.json')
                    .then(response=> {
                        // eslint-disable-next-line no-empty
                        var group = 'By sex';
                        var indicatorArray = [];
                        var covidDeathsArray = [];
                        var pneumoniaDeaths = [];
                        var influenzaArray = [];
                        for (var i = 0; i < response.data.length; i++){
                            if(response.data[i].group == group){
                                var indicator = response.data[i].indicator;
                                var covidDeaths = response.data[i].covid_deaths;
                                var pneumonia = response.data[i].pneumonia_and_covid_deaths;
                                var influenza = response.data[i].all_influenza_deaths_j09_j11;

                                indicatorArray.push(indicator);
                                covidDeathsArray.push(covidDeaths);
                                pneumoniaDeaths.push(pneumonia);
                                influenzaArray.push(influenza);
                            }

                        }
                        const myChart = window.echarts.init(document.getElementById('barBySex'));
                        myChart.setOption({
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            legend: {
                                data: ['Covid19', 'Pneumonia with Covid19', 'Influenza']
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
                                data: indicatorArray
                            },
                            series: [
                                {
                                    name: 'Covid19',
                                    type: 'bar',
                                    data: covidDeathsArray,
                                    color: '#007bff',
                                },
                                {
                                    name: 'Pneumonia with Covid19',
                                    type: 'bar',
                                    data: pneumoniaDeaths,
                                    color: '#f14668'
                                },
                                {
                                    name: 'Influenza',
                                    type: 'bar',
                                    data: influenzaArray,
                                    color: '#48c774'
                                }
                            ]
                        });

                    }).catch(error=>{
                    console.log(error.response.data)
                })
            },

            drawPieChartAccordingSex(){
                this.axiosInstance.get('https://data.cdc.gov/resource/hc4f-j6nb.json')
                    .then(response=> {
                        // eslint-disable-next-line no-empty
                        var group = 'By sex';
                        var indicator = "Total deaths";
                        for (var i = 0; i < response.data.length; i++){
                            if(response.data[i].group === group && response.data[i].indicator === indicator){
                                var covidDeaths = response.data[i].covid_deaths;
                                var pneumonia = response.data[i].pneumonia_and_covid_deaths;
                                var influenza = response.data[i].all_influenza_deaths_j09_j11;
                            }
                        }
                        const myChart = window.echarts.init(document.getElementById('pieChart'));
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
                                top: 10,
                                left: 'center',
                                data: ['Covid19', 'Pneumonia with Covid19', 'Influenza']
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
                                        {value: covidDeaths, name: 'Covid19'},
                                        {value: pneumonia, name: 'Pneumonia with Covid19'},
                                        {value: influenza, name: 'Influenza'},
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
h1{
    font-size: 30px;
    text-align: center;
    padding-bottom: 2rem;
}
</style>