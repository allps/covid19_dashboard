<template>
    <div>
        <div class="visualization-wrapper box">
            <h1 class="title has-text-centered mt2 mb4">
                Cases Statistics for {{countryName}}
            </h1>
            <p class="has-text-centered" style="margin-top: -3rem" v-if="isDetailedInfoAvailable()">
                <a style="text-decoration: underline" v-bind:href="getDetailsLink(countryName)">
                    Detailed Information available for this country. Click Here.
                </a>
            </p>
            <div class="columns has-text-centered main-stats mt2 mb4">
                <div class="column">
                    <p class="title is-size-4 confirmed-color-light">
                        Infected
                    </p>
                    <p class="subtitle is-size-3 confirmed-color">
                        {{withCommas(cases.confirmed)}}
                    </p>
                </div>
                <div class="column">
                    <p class="title is-size-4 recovered-color-light">
                        Recovered
                    </p>
                    <p class="subtitle is-size-3 recovered-color">
                        {{withCommas(cases.recovered)}}
                    </p>
                </div>
                <div class="column">
                    <p class="title is-size-4 deaths-color-light">
                        Deaths
                    </p>
                    <p class="subtitle is-size-3 deaths-color">
                        {{withCommas(cases.deaths)}}
                    </p>
                </div>
            </div>

            <h2 class="subtitle has-text-centered mb0 mt2">
                Number of <span class="confirmed-color">confirmed</span> cases over time.
            </h2>
            <div id="confirmed_country" style="height: 400px;"></div>

            <h2 class="subtitle has-text-centered mb0 mt2">
                Number of <span class="recovered-color">recovered</span> cases over time.
            </h2>
            <div id="recovered_country" style="height: 400px;"></div>

            <h2 class="subtitle has-text-centered mb0 mt2">
                Number of <span class="deaths-color">deaths</span> over time.
            </h2>
            <div id="deaths_country" style="height: 400px;"></div>
        </div>

        <div class="visualization-wrapper box">
            <h2 class="subtitle has-text-centered">
                Comparision of infected, deaths and recovered in {{countryName}}
            </h2>
            <div id="country_pie_chart" style="height:500px; width:100% ;"></div>
        </div>
    </div>
</template>

<script>
    import {confirmedColor, deathsColor, recoveredColor, capitalizeFirstLetter, withCommas} from '../utils/utils'
    export default {
        name: "GenericCountryView",
        props:['confirmedCaseList', 'recoveredCaseList', 'deathsCaseList', 'countryName'],
        data(){
            return {
                cases: {
                    confirmed: '',
                    recovered: '',
                    deaths: ''
                }
            }
        },
        mounted() {
            this.drawLineCharts(this.confirmedCaseList, 'confirmed');
            this.drawLineCharts(this.recoveredCaseList, 'recovered');
            this.drawLineCharts(this.deathsCaseList, 'deaths');
            this.drawPieChart();
        },
        watch: {
            confirmedCaseList: function(newVal, oldVal) { // watch it
                this.drawLineCharts(newVal, 'confirmed');
            },
            recoveredCaseList: function(newVal, oldVal) { // watch it
                this.drawLineCharts(newVal, 'recovered');
            },
            deathsCaseList: function(newVal, oldVal) { // watch it
                this.drawLineCharts(newVal, 'deaths');
                this.drawPieChart();
            },

            countryName: function (newVal, oldVal) {
                this.isDetailedInfoAvailable();
                this.getDetailsLink();
            }
        },

        methods:{
            withCommas,
            isDetailedInfoAvailable(){
                let t = ['India'].includes(this.countryName)
                console.log('&&&&&&&&&&&&&&&&')
                console.log(t)
                return t;
            },
            getDetailsLink(){
                return '/details/' + this.countryName.toLowerCase();
            },
            drawLineCharts(chartData, stat){

                this.$data.cases[stat] = chartData[stat].slice(-1).pop();

                let chartElement = document.getElementById(stat + "_country");
                let existInstance = echarts.getInstanceByDom(chartElement);
                if (existInstance) {
                    if (true) {
                        echarts.dispose(chartElement);
                    }
                }
                let line_chart = window.echarts.init(chartElement);
                const x_axis = chartData.dates;
                const arr_y = chartData[stat];
                const human_date = [];
                const chartColor = this.getChartColor(stat);

                x_axis.forEach((x_axis_item) =>{
                    // Timestamp is in nanoseconds. Convert it to human readable form
                    human_date.push((new Date(x_axis_item * 1000)).toLocaleDateString());
                    line_chart.setOption({
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
                                data: human_date
                            }
                        ],

                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, '10%']
                        },

                        series: [
                            {
                                name: capitalizeFirstLetter(stat),
                                type: 'line',
                                smooth: true,
                                symbol: 'none',
                                sampling: 'average',
                                itemStyle: {
                                    color: chartColor.line
                                },
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: chartColor.gradUp
                                    }, {
                                        offset: 1,
                                        color: chartColor.gradDown
                                    }])
                                },
                                data: arr_y
                            },
                        ]

                    }, true)

                });
            },
            drawPieChart(){
                let chartElement = document.getElementById('country_pie_chart');
                let existInstance = echarts.getInstanceByDom(chartElement);
                if (existInstance) {
                    if (true) {
                        echarts.dispose(chartElement);
                    }
                }
                let pie_chart = window.echarts.init(chartElement);
                console.log(this.confirmedCaseList);
                pie_chart.setOption({
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
                        data: ['Confirmed Cases', 'Recovered', 'Deaths']
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
                                {value: this.confirmedCaseList.confirmed.slice(-1).pop(), name: 'Confirmed Cases'},
                                {value: this.recoveredCaseList.recovered.slice(-1).pop(), name: 'Recovered'},
                                {value: this.deathsCaseList.deaths.slice(-1).pop(), name: 'Deaths'},
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
            },
            getChartColor(stat){
                if(stat === 'confirmed') return {line: confirmedColor(), gradUp: 'rgba(0, 123, 255, 0.6)', gradDown: 'rgb(0, 123, 255)'};
                if(stat === 'recovered') return {line: recoveredColor(), gradUp: 'rgba(40, 167, 69, 0.6)', gradDown: 'rgb(40, 167, 69)'};
                if(stat === 'deaths') return {line: deathsColor(), gradUp: 'rgba(255, 7, 58, 0.6)', gradDown: 'rgba(255, 7, 58)'};
            }
        }
    }
</script>

<style scoped>

</style>