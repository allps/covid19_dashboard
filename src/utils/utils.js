// Export individual function
function timeDifferenceForHumans(current, previous) {

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

function dateForHumans(datestr){

}

function withCommas(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function colorSwatch(){
    return {
        confirmed: ['#e5f2ff','#b3d7ff','#4da3ff','#1a88ff','#006fe6','#0056b3', '#003d80'],
        recovered: ['#c1f0cc','#98e6aa','#6fdd88','#46d366', '#2cb94d', '#22903c', '#19672b'],
        deaths: ['#ffe5eb','#ffb3c2','#ff809a','#ff4d71','#ff1a49', '#e6002f', '#b30025'],
    };
}

function confirmedColor(){
    return '#007bff';
}

function recoveredColor(){
    return '#28a745';
}

function deathsColor() {
    return '#ff073a'
}

function capitalizeFirstLetter(s){
    if (typeof s !== 'string') return '';
    return (s.toLowerCase()).charAt(0).toUpperCase() + s.slice(1)
}

module.exports = {
    timeDifferenceForHumans: timeDifferenceForHumans,
    dateForHumans:dateForHumans,
    withCommas: withCommas,
    confirmedColor: confirmedColor,
    recoveredColor: recoveredColor,
    deathsColor: deathsColor,
    capitalizeFirstLetter: capitalizeFirstLetter
};