<template>
    <div>
        <nav-bar></nav-bar>
        <section class="section">
            <h1 class="title has-text-centered mb6">
                Novel Corona Virus (COVID19) Statistics
            </h1>
            <div class="columns has-text-centered main-stats">
                <div class="column">
                    <p class="title is-size-4">
                        Infected
                    </p>
                    <p class="subtitle is-size-3">
                        {{withCommas(confirmedCases)}}
                    </p>
                </div>
                <div class="column">
                    <p class="title is-size-4">
                        Recovered
                    </p>
                    <p class="subtitle is-size-3">
                        {{withCommas(recoveredCases)}}
                    </p>
                </div>
                <div class="column">
                    <p class="title is-size-4">
                        Deaths
                    </p>
                    <p class="subtitle is-size-3">
                        {{withCommas(deathCases)}}
                    </p>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="confirmedCasesChart">
                <div id="main" style="width:100%; height:300px; padding-top:1rem">

                </div>
            </div>

            <div class="columns" style="margin-top: 10px">
                <div class="column mortalCases">
                    <div id="pieChart" style="height:400px; width:100% ;">
                    </div>
                </div>

                <div class="column mortalCases" style="margin-left: 1rem">
                    <div id="bar" style="height:400px; width:100% ;">
                    </div>
                </div>
            </div>

            <div class="confirmedCasesChart">
                <div id="worldMap" style="width:100%;height:300px; padding-top:1rem">

                </div>
            </div>
        </section>

    </div>
</template>

<script>

    import axios from "axios";
    const lazy = () => import('./Navbar.vue');

    export default {
        name: 'LandingPage',
        components:{
            'nav-bar': lazy
        },
        data() {
            return {
                totalCases: '',
                confirmedCases: '',
                recoveredCases: '',
                deathCases: '',
                totalCountriesAffected: ''
            }
        },

        mounted() {
            this.axiosInstance = axios.create({
                timeout: 50000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            this.totalCasesWorld();
            this.drawChart();
            this.drawMortalityBarGraph();
            this.totalNumberCases();
            // this.drawWorldMap();
        },


        methods: {
            withCommas(number){
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            totalNumberCases() {
                this.$data.totalCases = this.$data.confirmedCases + this.$data.recoveredCases + this.$data.deathCases;
            },

            totalCasesWorld() {
                this.axiosInstance.get("/cases/total")
                    .then(response => {
                        var str = response.data;
                        if (str.includes("\"")) {
                            var valid_str = JSON.parse(str);
                        }
                        this.$data.confirmedCases = valid_str.confirmed;
                        this.$data.recoveredCases = valid_str.recovered;
                        this.$data.deathCases = valid_str.deaths;
                        this.$data.totalCountriesAffected = valid_str.totalCountries;

                        // eslint-disable-next-line no-undef
                        var myChart = echarts.init(document.getElementById('pieChart'));

                        myChart.setOption({
                            title: {
                                // text: '天气情况统计',
                                // subtext: '虚构数据',
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'item',
                                // formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            legend: {
                                // orient: 'vertical',
                                // top: 'middle',
                                bottom: 10,
                                left: 'center',
                                data: ['Affected People', 'Recovered', 'Deaths']
                            },
                            series: [
                                {
                                    type: 'pie',
                                    radius: '65%',
                                    center: ['50%', '50%'],
                                    selectedMode: 'single',
                                    data: [
                                        {
                                            // value: 1548,
                                            // name: '幽州',
                                            label: {
                                                // formatter: [
                                                //     '{title|{b}}{abg|}',
                                                //     '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                                                //     '{hr|}',
                                                //     '  {Sunny|}{value|202}{rate|55.3%}',
                                                //     '  {Cloudy|}{value|142}{rate|38.9%}',
                                                //     '  {Showers|}{value|21}{rate|5.8%}'
                                                // ].join('\n'),
                                                backgroundColor: '#eee',
                                                borderColor: '#777',
                                                borderWidth: 1,
                                                borderRadius: 4,
                                                rich: {
                                                    title: {
                                                        color: '#eee',
                                                        align: 'center'
                                                    },
                                                    abg: {
                                                        backgroundColor: '#333',
                                                        width: '100%',
                                                        align: 'right',
                                                        height: 25,
                                                        borderRadius: [4, 4, 0, 0]
                                                    },
                                                    Sunny: {
                                                        height: 30,
                                                        align: 'left',

                                                    },
                                                    Cloudy: {
                                                        height: 30,
                                                        align: 'left',

                                                    },
                                                    Showers: {
                                                        height: 30,
                                                        align: 'left',

                                                    },
                                                    // weatherHead: {
                                                    //     color: '#333',
                                                    //     height: 24,
                                                    //     align: 'left'
                                                    // },
                                                    hr: {
                                                        borderColor: '#777',
                                                        width: '100%',
                                                        borderWidth: 0.5,
                                                        height: 0
                                                    },
                                                    value: {
                                                        width: 20,
                                                        padding: [0, 20, 0, 30],
                                                        align: 'left'
                                                    },
                                                    valueHead: {
                                                        color: '#333',
                                                        width: 20,
                                                        padding: [0, 20, 0, 30],
                                                        align: 'center'
                                                    },
                                                    rate: {
                                                        width: 40,
                                                        align: 'right',
                                                        padding: [0, 10, 0, 0]
                                                    },
                                                    rateHead: {
                                                        color: '#333',
                                                        width: 40,
                                                        align: 'center',
                                                        padding: [0, 10, 0, 0]
                                                    }
                                                }
                                            }
                                        },
                                        {value: this.$data.confirmedCases, name: 'Affected People'},
                                        {value: this.$data.recoveredCases, name: 'Recovered'},
                                        {value: this.$data.deathCases, name: 'Deaths'},
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
                        })

                    }).catch(error => {
                    console.log(error.response.data)
                })
            },

            drawChart() {
                // eslint-disable-next-line no-undef
                var myChart = echarts.init(document.getElementById('main'));
                this.axiosInstance.get("/cases")
                    .then(response => {
                        console.log(response.data)
                        var str = response.data;
                        if (str.includes("\"")) {
                            var valid_str = JSON.parse(str);
                        }

                        var arr_x = valid_str.json_xax;
                        var arr_y = valid_str.confirmed;
                        var recovered = valid_str.recovered;
                        var death = valid_str.death;

                        //timestamp is in nanoseconds
                        ////convert timestamp to human readable form
                        var array_humanDate = []
                        arr_x.forEach(function (arr) {
                            var arr_humanDate = (new Date(arr / 1000000)).toLocaleDateString();
                            array_humanDate.push(arr_humanDate)

                            myChart.setOption({
                                title: {
                                    text: 'Statistics'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        label: {
                                            backgroundColor: '#6a7985'
                                        }
                                    }
                                },
                                legend: {
                                    data: ['Affected People', 'Recovered', 'Deaths']
                                },
                                toolbox: {
                                    feature: {
                                        saveAsImage: {}
                                    }
                                },
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                xAxis: [
                                    {
                                        type: 'category',
                                        boundaryGap: false,
                                        data: array_humanDate
                                    }
                                ],
                                yAxis: [
                                    {
                                        type: 'value'
                                    }
                                ],
                                series: [
                                    {
                                        name: 'Deaths',
                                        type: 'line',
                                        stack: '总量',
                                        areaStyle: {},
                                        data: death
                                    },
                                    {
                                        name: 'Recovered',
                                        type: 'line',
                                        stack: '总量',
                                        areaStyle: {},
                                        data: recovered
                                    },

                                    {
                                        name: 'Affected People',
                                        type: 'line',
                                        stack: '总量',
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'top'
                                            }
                                        },
                                        areaStyle: {},
                                        data: arr_y
                                    }
                                ]
                            });
                        });

                    }).catch(error => {
                    console.log(error.response.data);
                });

            },

            drawMortalityBarGraph() {
                // eslint-disable-next-line no-undef
                var myChart = echarts.init(document.getElementById('bar'));
                this.axiosInstance.get("/perCountry/mortality")
                    .then(response => {
                        console.log(response.data)
                        var str = response.data;
                        if (str.includes("\"")) {
                            var valid_str = JSON.parse(str);
                        }

                        var arr_x = valid_str.json_xax;
                        var arr_y = valid_str.json_yax;
                        console.log(arr_y, arr_x)

                        myChart.setOption(
                            {
                                title: {
                                    text: 'Mortality in Countries',
                                    subtext: '(World-wide)'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                },
                                legend: {
                                    data: ['Mortality']
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
                                    data: arr_y
                                },
                                series: [
                                    {
                                        name: 'Mortality Rate',
                                        type: 'bar',
                                        data: arr_x,
                                        color: '#334B5C',
                                    },

                                ]
                            }
                        )
                    }).catch(error => {
                    console.log(error.response.data)
                })

            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-stats .column{
        border-right: 1px solid rgba(0, 0, 0, 0.2)
    }

    .main-stats .column:last-child{
        border-right: none
    }
</style>
