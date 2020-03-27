<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="https://sciencefictionlab-public.s3.eu-central-1.amazonaws.com/covid19-bucket/logo.png">
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a href="https://github.com/allps/covid19_analysis/" target="_blank" class="button is-primary is-outlined">
                                Contribute
                            </a>
                            <a href="https://github.com/allps/covid19_dashboard/issues/new/" target="_blank" class="button is-light">
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
        name: "Navbar"
    }
</script>

<style scoped>

</style>