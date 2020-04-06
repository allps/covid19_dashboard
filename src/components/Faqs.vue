<template>
    <div>
        <main-navbar></main-navbar>
        <section class="section">
            <div class="container">
                <p class="question has-text-weight-bold ">
                    Is this an official source of Covid-19 related statistics?
                </p>
                <p class="answer">
                    No, this is not an official source of Covid-19 related statistics.
                </p>

                <p class="question has-text-weight-bold mt2">
                    What is the purpose of this project?
                </p>
                <p class="answer">
                    Purpose of this project is to provide basic information about Covid-19's spread in an easy-to-grasp manner.
                    Avoiding information overload and provide information only from authentic sources are other priorities.
                </p>

                <p class="question has-text-weight-bold mt2">
                    How often the data is updated here? Is this the most updated resource?
                </p>
                <p class="answer">
                    All data used is sourced from official resources.
                    Official resources take a while before they get updated.
                    Maps and charts are updated accordingly.
                </p>

                <p class="question has-text-weight-bold mt2">
                    Who are the people behind this project?
                </p>
                <p class="answer">
                    We are a group of data science practitioners who are volunteering for this project.
                    <br>
                    We collect, organize and analyze Covid-19 related data from various sources.
                    <br>
                    Subsequently we try our best to present the information in an accessible manner.
                    <br>
                    To know more about us check out the Github Repository link provided below.
                </p>

                <p class="question has-text-weight-bold mt2">
                    How do I contact you or report an issue?
                </p>
                <p class="answer">
                    We would be delighted to answer any query. We would be very happy if you let us know about any issues you find.
                    Feel free to use <a href="https://forms.gle/W8pbmjsMdVGk1roG8">This Google Form</a>
                    In case you find any technical issue please use "Report an Issue" button provided in the menu bar.
                </p>

                <p class="has-text-centered mt4 mb4">
                    <a href="https://github.com/allps/" class="is-medium is-light repo-link" target="_blank">
                        <img class="github-logo" src="../assets/github.png" alt=""> Find us on Github
                    </a>
                </p>
            </div>
        </section>
        <main-footer></main-footer>
    </div>
</template>

<script>
    export default {
        name: "Faqs",
        components: {
            MainNavbar: () => import('./MainNavbar.vue'),
            MainFooter: () => import('./MainFooter.vue')
        }
    }
</script>

<style scoped>
    img.github-logo{
        width: 1.8rem;
        vertical-align: sub;
    }

    a.repo-link {
        text-decoration: none;
        font-size: 1.5rem;
        border: 2px solid #949494;
        padding: 0.5rem;
        border-radius: 4px;
    }

    a.repo-link:hover{
        border-color: #4c4c4c;
    }
</style>