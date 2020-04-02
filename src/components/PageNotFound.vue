<template>
    <div>
        <section class="section">
            <div class="container">
                <svg viewBox="0 0 600 300">
                    <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                        404
                    </text>
                </svg>
                <h1 class="title has-text-centered">
                    <a href="/">
                        Go back to home
                    </a>
                </h1>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "PageNotFound"
    }
</script>

<style scoped>
    svg {
        width: 100%;
        height: 60vh;
    }
    svg text {
        text-transform: uppercase;
        animation: stroke 5s infinite alternate;
        stroke-width: 2;
        stroke: #000;
        font-size: 140px;
    }
    @keyframes stroke {
        0%   {
            fill: #000; stroke: #7d7d7d;
            stroke-dashoffset: 25%; stroke-dasharray: 0 50%; stroke-width: 2;
        }
        70%  {fill: #000; stroke: #7d7d7d; }
        80%  {fill: #000; stroke: #7d7d7d; stroke-width: 3; }
        100% {
            fill: #7d7d7d; stroke: #7d7d7d;
            stroke-dashoffset: -25%; stroke-dasharray: 50% 0; stroke-width: 0;
        }
    }
</style>