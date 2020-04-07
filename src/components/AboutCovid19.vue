<template>
    <div>
        <main-navbar></main-navbar>
        <section class="section pt0">
            <h1 class="title has-text-centered mb4 mt2">
                About Novel Corona Virus (COVID-19)
            </h1>

            <div class="container">
                <div class="box">
                    <h2 class="subtitle">
                        Basic Information
                    </h2>
                    <p>
                        Coronaviruses are a large family of viruses which may cause illness in animals or humans.  In humans, several coronaviruses are known to cause respiratory infections ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS). The most recently discovered coronavirus causes coronavirus disease COVID-19.
                    </p>
                    <p>
                        COVID-19 is the infectious disease caused by the most recently discovered coronavirus. This new virus and disease were unknown before the outbreak began in Wuhan, China, in December 2019.
                    </p>

                    <h2 class="subtitle mt5">
                        How does Covid-19 spread?
                    </h2>
                    <p>
                        People can catch COVID-19 from others who have the virus. The disease can spread from person to person through small droplets from the nose or mouth which are spread when a person with COVID-19 coughs or exhales. These droplets land on objects and surfaces around the person. Other people then catch COVID-19 by touching these objects or surfaces, then touching their eyes, nose or mouth. People can also catch COVID-19 if they breathe in droplets from a person with COVID-19 who coughs out or exhales droplets. This is why it is important to stay more than 1 meter (3 feet) away from a person who is sick.
                    </p>
                    <p>
                        Studies to date suggest that the virus that causes COVID-19 is mainly transmitted through contact with respiratory droplets rather than through the air.
                    </p>
                    <p>
                        The coronavirus also spreads from infected patients who don’t show the noticeable symptoms. Therefore, people can be infected during the incubation period (2-12 days) by those who look normal but already have the disease. SARS-CoV-2 enters your body via your mouth, nose and eyes. The coronavirus also spreads from infected patients who don’t show the noticeable symptoms. Therefore, people can be infected during the incubation period (2-12 days) by infected persons without symptoms
                    </p>

                    <h2 class="subtitle mt5">
                        What are the symptoms of COVID-19?
                    </h2>
                    <p>
                        The most common symptoms of COVID-19 are <br/><br/><ul><li>fever</li><li>tiredness</li><li>and dry cough</li></ul>
                        <br/>
                        Some patients may have aches and pains, nasal congestion, runny nose, sore throat or diarrhea.
                        These symptoms are usually mild and begin gradually.<br><br>
                        Some people become infected but don’t develop any symptoms and don't feel unwell.
                        Most people (about 80%) recover from the disease without needing special treatment.<br><br>
                        Around 1 out of every 6 people who gets COVID-19 becomes seriously ill and develops difficulty breathing.<br>
                        <b>Older people, and those with underlying medical problems like high blood pressure, heart problems or diabetes, are more likely to develop serious illness. </b><br>
                        People with fever, cough and difficulty breathing should seek medical attention.
                    </p>

                    <h2 class="subtitle mt5 recovered-color">
                        Do the following
                    </h2>
                    <p>
                    <ol>
                        <li>
                            Practice frequent hand
                            washing. Wash hands with
                            soap and water or use alcohol
                            based hand rub. Wash hands
                            even if they are visibly clean
                        </li>
                        <li>
                            Cover your nose and
                            mouth with
                            handkerchief/tissue while
                            sneezing and coughing
                        </li>
                        <li>
                            Throw used
                            tissues into closed
                            bins immediately
                            after use
                        </li>
                        <li>
                            See a doctor if you feel unwell
                            (fever, difficult breathing and
                            cough). While visiting doctor
                            wear a mask/cloth to cover
                            your mouth and nose
                        </li>
                        <li>
                            Avoid participating
                            in large gatherings
                        </li>
                    </ol>
                    </p>


                    <h2 class="subtitle mt5 deaths-color">
                        DO NOT do the following
                    </h2>
                    <p>
                    <ol>
                        <li>
                            Have a close contact
                            with anyone, if you’re
                            experiencing cough
                            and fever
                        </li>
                        <li>
                            Touch your eyes,
                            nose and mouth
                        </li>
                        <li>
                            Spit in public
                        </li>
                    </ol>
                    </p>
                    <br><br><br>
                    <p>
                        Information taken from <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target="_blank">WHO INT Covid-19 Information Page</a> and
                        <a href="https://www.mohfw.gov.in/" target="_blank">Ministry of Health
                            and Family Welfare
                            Government of India
                        </a>
                    </p>
                </div>
            </div>
        </section>

        <main-footer></main-footer>
    </div>
</template>

<script>
    export default {
        name: "AboutCovid19",
        components:{
            MainFooter: () => import('./MainFooter'),
            MainNavbar: () => import('./MainNavbar.vue')
        },
    }
</script>

<style scoped>
    .box{
        padding: 2.5rem;
        color: #4c4c4c;
    }

    .box p{
        font-size: 1.1rem;
        line-height: 1.8rem;
        margin-top: 1rem;
    }

    .subtitle{
        color: #353535;
        font-weight: bold;
    }
</style>