<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="https://sciencefictionlab-public.s3.eu-central-1.amazonaws.com/covid19-bucket/logo.png">
                </a>

                <a role="button" class="navbar-burger burger"  @click="showNav = !showNav" :class="{ 'is-active': showNav }">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div :class="{ 'is-active': showNav }" class="navbar-menu">
                <div class="navbar-start">

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Show Details For
                        </a>

                        <div class="navbar-dropdown">
                            <a href="/details/us" class="navbar-item">
                                USA
                            </a>
                            <a href="/details/switzerland" class="navbar-item">
                                Switzerland
                            </a>
                            <a href="/details/india" class="navbar-item">
                                India
                            </a>
                            <hr class="navbar-divider">
                            <a href="/" class="navbar-item">
                                Worldwide
                            </a>
                        </div>
                    </div>
                </div>


                <div class="navbar-end">
                    <div class="navbar-item">
                        <a href="/faqs" class="navbar-item">
                            FAQs
                        </a>
                        <a href="/covid19-information" class="navbar-item">
                            Covid-19 Information
                        </a>
                        <a href="/EconomicImpact" class="navbar-item">
                            Covid-19 Impact on Economy
                        </a>
                        <div class="buttons">
                            <a href="https://github.com/allps/covid19_analysis/" target="_blank" class="button is-small is-primary is-outlined">
                                Contribute
                            </a>
                            <a href="https://github.com/allps/covid19_dashboard/issues/new/" target="_blank" class="button is-small is-link">
                                Report an Issue
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data(){
            return {
                showNav: false
            }
        }
    }
</script>

<style scoped>
    .navbar{
        padding-bottom: 0
    }
</style>