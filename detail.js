function convertToJson(response) {
    return response.json();
}

function showInfo(data) {
    const coin_img = document.getElementById('coin_img');
    const coin_name = document.getElementById('coin_name');
    const coin_description = document.getElementById('coin_description');
    //DOM Manipulation.
    coin_img.src = data.image.large;
    coin_name.innerText = data.name;
    coin_description.innerHTML = data.description.en;
    console.log(data);
}

function showPrice(data) {
    const inr_price = document.getElementById('inr_price');
    const usd_price = document.getElementById('usd_price');
    const eur_price = document.getElementById('eur_price');
    //DOM Manipulation.
    inr_price.innerText = data.bitcoin.inr;
    usd_price.innerText = data.bitcoin.usd;
    eur_price.innerText = data.bitcoin.eur;
    console.log(data);
}

function showMarketchart(data) {
    
    //DOM Manipulation.
    console.log(data);
    showGraph(data);
}



fetch('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false').then(convertToJson).then(showInfo);
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr%2Cusd%2Ceur').then(convertToJson).then(showPrice);
fetch ('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=14&interval=daily').then(convertToJson).then(showMarketchart);


function showGraph(history_data){
console.log(history_data.prices);
    let labels = [];
    let prices = [];

    for(let i = 0; i < history_data.prices.length; i += 1) {
        const single_price = history_data.prices[i];

        // const readable_label = convertUnixToReadable(single_price[0]);
        labels.push(single_price[0]);
        prices.push(single_price[1]);
        console.log(single_price);
    }
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: prices,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}