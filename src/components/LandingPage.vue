<template>
    <div>
        <nav-bar></nav-bar>
        <section class="section pt0">
            <h1 class="title has-text-centered">
                Novel Corona Virus (COVID-19) Statistics
            </h1>
            <h2 class="subtitle has-text-centered mb4">
                Last updated: {{lastUpdatedTime}} ({{hoursAgo}} hours ago)
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
                        Country wise mortality rate
                    </h2>
                    <country-wise-mortality-rate></country-wise-mortality-rate>
                </div>

                <div class="visualization-wrapper box">
                    <h2 class="subtitle has-text-centered">
                        Comparision of infected, deaths and recovered globally
                    </h2>
                    <all-cases-pie-charts></all-cases-pie-charts>
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
    import StackedLargeScaleAreaChart from "./StackedLargeScaleAreaChart";
    import CountryWiseMortalityRate from "./CountryWiseMortalityRate";
    import AllCasesPieCharts from "./AllCasesPieCharts";
    import WorldMap from "./maps/WorldMap";
    const lazy = () => import('./Navbar.vue');

    export default {
        name: 'LandingPage',
        components:{
            WorldMap,
            AllCasesPieCharts,
            CountryWiseMortalityRate,
            StackedLargeScaleAreaChart,
            'nav-bar': lazy
        },
        data() {
            return {
                lastUpdatedTime: '27.03 18:53 GMT',
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
                        var valid_str = response.data;
                        this.$data.confirmedCases = valid_str.confirmed;
                        this.$data.recoveredCases = valid_str.recovered;
                        this.$data.deathCases = valid_str.deaths;
                        this.$data.totalCountriesAffected = valid_str.totalCountries;

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

    @media only screen and (max-width: 430px) {
        .main-stats .column{
            border-right: none
        }
    }
</style>
