<template>
    <div>
        <nav-bar></nav-bar>
        <section class="section pt0">
            <h1 class="title has-text-centered">
                Novel Corona Virus (COVID-19) Statistics
            </h1>
            <h2 class="subtitle has-text-centered mb2">
                Last updated: {{lastUpdatedTime}} ({{hoursAgo}})
            </h2>
            <div class="visualization-wrapper">
                <world-map></world-map>
            </div>
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
            <div class="container">
                <div class="visualization-wrapper box">
                    <h2 class="subtitle has-text-centered">
                        Number of infected recovered and death cases over time.
                    </h2>
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
        </section>

        <main-footer></main-footer>

    </div>
</template>

<script>

    import axios from "axios";
    import StackedLargeScaleAreaChart from "./StackedLargeScaleAreaChart";
    import CountryWiseMortalityRate from "./CountryWiseMortalityRate";
    import AllCasesPieCharts from "./AllCasesPieCharts";
    import WorldMap from "./maps/WorldMap";
    import MainFooter from "./MainFooter";
    const lazy = () => import('./Navbar.vue');

    export default {
        name: 'LandingPage',
        components:{
            MainFooter,
            WorldMap,
            AllCasesPieCharts,
            CountryWiseMortalityRate,
            StackedLargeScaleAreaChart,
            'nav-bar': lazy
        },
        data() {
            return {
                lastUpdatedTime: '',
                hoursAgo: '6',
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
                        this.$data.confirmedCases = response.data.confirmed;
                        this.$data.recoveredCases = response.data.recovered;
                        this.$data.deathCases = response.data.deaths;
                        this.$data.totalCountriesAffected = response.data.totalCountries;
                        this.$data.lastUpdatedTime = (new Date(parseInt(response.data.created_at) * 1000)).toDateString();
                        this.$data.hoursAgo = this.timeDifferenceForHumans((new Date().getTime()), (new Date(parseInt(response.data.created_at) * 1000)))

                    }).catch(error => {
                    console.log(error.response)
                })
            },

            timeDifferenceForHumans(current, previous) {

                let msPerMinute = 60 * 1000;
                let msPerHour = msPerMinute * 60;
                let msPerDay = msPerHour * 24;
                let msPerMonth = msPerDay * 30;
                let msPerYear = msPerDay * 365;

                let elapsed = current - previous;

                if (elapsed < msPerMinute) {
                    return Math.round(elapsed/1000) + ' seconds ago';
                }

                else if (elapsed < msPerHour) {
                    return Math.round(elapsed/msPerMinute) + ' minutes ago';
                }

                else if (elapsed < msPerDay ) {
                    return Math.round(elapsed/msPerHour ) + ' hours ago';
                }

                else if (elapsed < msPerMonth) {
                    return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
                }

                else if (elapsed < msPerYear) {
                    return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
                }

                else {
                    return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
                }
            }

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

    @media only screen and (max-width: 430px) {
        .main-stats .column{
            border-right: none
        }
    }
</style>
