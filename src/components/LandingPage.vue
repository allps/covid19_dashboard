<template>
    <div>
        <main-navbar></main-navbar>
        <section class="section pt0">
            <h1 class="title has-text-centered">
                Novel Corona Virus (COVID-19) Statistics
            </h1>
            <h2 class="subtitle has-text-centered mb2">
                Last updated: {{lastUpdatedTime}} ({{hoursAgo}})
            </h2>
            <div class="columns has-text-centered main-stats mt5 mb4">
                <div class="column">
                    <p class="title is-size-4 confirmed-color-light">
                        Infected
                    </p>
                    <p class="subtitle is-size-3 confirmed-color">
                        {{withCommas(confirmedCases)}}
                    </p>
                </div>
                <div class="column">
                    <p class="title is-size-4 recovered-color-light">
                        Recovered
                    </p>
                    <p class="subtitle is-size-3 recovered-color">
                        {{withCommas(recoveredCases)}}
                    </p>
                </div>
                <div class="column">
                    <p class="title is-size-4 deaths-color-light">
                        Deaths
                    </p>
                    <p class="subtitle is-size-3 deaths-color">
                        {{withCommas(deathCases)}}
                    </p>
                </div>
            </div>
            <div class="visualization-wrapper">
                <world-map></world-map>
            </div>
        </section>

        <div class="has-text-centered is-size-6 mb3 has-text-weight-bold">
            <span class="is-size-4 mr1">Showing data for:</span>
            <div class="select">
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <div class="select is-fullwidth">
                                    <select @change="showStatsForCountry(countryShown)" v-model="countryShown" ref="selectedItem">
                                        <option value="worldwide" selected>Worldwide</option>
                                        <option v-for="country in countryList" :value="country">{{country}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="section">
            <div class="container">
                <div v-show="countryShown === 'worldwide'">
                    <div class="visualization-wrapper box">
                        <stacked-large-scale-area-chart></stacked-large-scale-area-chart>
                    </div>

                    <div class="visualization-wrapper box">
                        <h2 class="subtitle has-text-centered">
                            Country wise mortality and recovery rates
                        </h2>
                        <p class="has-text-centered">
                            (Showing for countries having confirmed cases 1000 or more.)
                        </p>
                        <country-wise-mortality-rate></country-wise-mortality-rate>
                    </div>

                    <div class="visualization-wrapper box">
                        <h2 class="subtitle has-text-centered">
                            Comparision of infected, deaths and recovered globally
                        </h2>
                        <all-cases-pie-charts></all-cases-pie-charts>
                    </div>
                </div>
                <div v-if="countryShown !== 'worldwide'">
                    <generic-country-view
                            v-bind:confirmedCaseList = "getCountrySpecificTimeSeriesData(countryShown, 'confirmed')"
                            v-bind:recoveredCaseList = "getCountrySpecificTimeSeriesData(countryShown, 'recovered')"
                            v-bind:deathsCaseList = "getCountrySpecificTimeSeriesData(countryShown, 'deaths')"
                            v-bind:countryName = "countryShown">
                    </generic-country-view>
                </div>
            </div>
        </section>

        <main-footer></main-footer>

    </div>
</template>

<script>

    import axios from "axios";
    import {timeDifferenceForHumans, withCommas} from '@/utils/utils.js'
    export default {
        name: 'LandingPage',
        components:{
            MainNavbar: () => import('./MainNavbar.vue'),
            MainFooter: () => import('./MainFooter'),
            WorldMap: () => import('./maps/WorldMap'),
            AllCasesPieCharts: () => import('./AllCasesPieCharts'),
            CountryWiseMortalityRate: () => import('./CountryWiseMortalityRate'),
            StackedLargeScaleAreaChart: () => import('./StackedLargeScaleAreaChart'),
            GenericCountryView: () => import('./GenericCountryView'),

        },
        data() {
            return {
                countryShown: 'worldwide',
                lastUpdatedTime: '',
                hoursAgo: '6',
                totalCases: '',
                confirmedCases: '',
                recoveredCases: '',
                deathCases: '',
                totalCountriesAffected: '',
                countryWise: {
                    confirmed: [],
                    recovered: [],
                    deaths: [],
                },
                countryList: []
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
            this.totalNumberCases();
            this.fetchCountryWiseTimeSeries();
        },


        methods: {

            fetchCountryWiseTimeSeries() {
                let self = this;
                ['confirmed', 'recovered', 'deaths'].forEach(stat_type => {
                    this.axiosInstance.get('/country/time-series/' + stat_type)
                        .then(response => {
                            self.$data.countryWise[stat_type] = response.data.data

                            if(stat_type === 'confirmed') {
                                self.$data.countryWise[stat_type].forEach(country => {
                                    self.$data.countryList.push(country.country)
                                })
                            }
                        }).catch(error => {console.log(error)})
                });
            },

            getCountrySpecificTimeSeriesData(countryName, stat){
                let index = this.$data.countryWise[stat].findIndex(countryData => {
                    return countryData.country === countryName
                });

                return this.$data.countryWise[stat][index];
            },

            withCommas,

            totalNumberCases() {
                this.$data.totalCases = this.$data.confirmedCases + this.$data.recoveredCases + this.$data.deathCases;
            },

            totalCasesWorld() {
                this.axiosInstance.get("/cases/total")
                    .then(response => {
                        this.$data.confirmedCases = response.data.confirmed;
                        this.$data.recoveredCases = response.data.recovered;
                        this.$data.deathCases = response.data.deaths;
                        this.$data.totalCountriesAffected = response.data.totalCountries;
                        this.$data.lastUpdatedTime = (new Date(parseInt(response.data.created_at) * 1000)).toDateString();
                        this.$data.hoursAgo = timeDifferenceForHumans((new Date().getTime()), (new Date(parseInt(response.data.created_at) * 1000)))

                    }).catch(error => {
                    console.log(error.response)
                })
            },

            showStatsForCountry(country){

            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
