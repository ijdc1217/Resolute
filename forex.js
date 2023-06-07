
let eur_url = 'https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&apikey=demo';
let aapl_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&apikey=5IAPLUTXTDPF4NBR';
let tsla_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&apikey=5IAPLUTXTDPF4NBR`;
let amzn_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=1min&apikey=5IAPLUTXTDPF4NBR`;
let wmt_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=WMT&interval=1min&apikey=5IAPLUTXTDPF4NBR`;
let msft_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=5IAPLUTXTDPF4NBR`;
let ko_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=KO&interval=1min&apikey=5IAPLUTXTDPF4NBR`;
let nflx_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NFLX&interval=1min&apikey=5IAPLUTXTDPF4NBR`;
let meta_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=META&interval=1min&apikey=5IAPLUTXTDPF4NBR`;
let f_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=F&interval=1min&apikey=5IAPLUTXTDPF4NBR`;


fetch_populate(eur_url);

function fetch_populate(apiUrl) {

    document.getElementById("line_container").innerHTML = `<canvas id="line_chart" width="100%" height="300px"></canvas>`
    document.getElementById("doughnut_container").innerHTML = `<canvas id="doughnut_chart" width="100%" height="200px"></canvas>`



    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            // Initial Data Manipulation

            let symbol = data['Meta Data'][`2. From Symbol`];
            let stock_data = data['Time Series FX (5min)'];
            let date_time = Object.keys(stock_data).reverse();
            date_time.shift();

            let price = date_time.map(label => stock_data[label]['4. close']);
            let time = [];


            date_time.forEach(item => {
                const newItem = item.substring(11);
                time.push(newItem);
            });

            let open_data = date_time.map(label => stock_data[label]['1. open']);
            open_data.sort();
            let high_data = date_time.map(label => stock_data[label]['2. high']);
            high_data.sort();
            let low_data = date_time.map(label => stock_data[label]['3. low']);
            low_data.sort();


            // Populate Data


            document.querySelector(`#p_open`).innerHTML = `${open_data[98]}`
            document.querySelector(`#t_open`).innerHTML = `${open_data[0]}`

            document.querySelector(`#p_high`).innerHTML = `${high_data[98]}`
            document.querySelector(`#t_high`).innerHTML = `${high_data[0]}`

            document.querySelector(`#p_low`).innerHTML = `${low_data[98]}`
            document.querySelector(`#t_low`).innerHTML = `${low_data[0]}`


            switch (symbol) {
                case `EUR`:
                    document.querySelector(`#currencyName`).innerHTML = `The Euro Dollar`;
                    break;
            }



            // Line Chart Code

            const initialData = {
                labels: time.slice(0, 10),
                datasets: [
                    {
                        label: symbol + ` Trade price to USD($)`,
                        data: price.slice(0, 10),
                        lineTension: 0.0,
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(75, 192, 192, 0.2)',
                        pointBorderColor: "white",
                        pointHoverRadius: 4,
                        pointHoverBackgroundColor: 'rgba(75, 192, 192, 0.2)',
                        pointHitRadius: 20,
                        pointBorderWidth: 3,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },

                ]
            };


            var ctx = document.getElementById('line_chart').getContext('2d');
            var line_chart = new Chart(ctx, {
                type: 'line',
                data: initialData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });


            // Compare Function
            // document.getElementById(`tesla`).addEventListener(`click`, () => {
            //     fetch(tsla_url)
            //         .then(response => response.json())
            //         .then(data => {
            //             let symbol2 = data['Meta Data'][`2. Symbol`];
            //             let stock_data2 = data['Time Series (1min)'];
            //             let date_time2 = Object.keys(stock_data2).reverse();
            //             date_time2.shift();
            //             let price2 = date_time2.map(label => stock_data2[label]['4. close']);

            //             let dataset2 = {
            //                 label: symbol2 + ` Stock price ($)`,
            //                 data: price2.slice(0, 10),
            //                 lineTension: 0.0,
            //                 borderColor: 'rgba(75, 192, 192, 0.2)',
            //                 pointRadius: 3,
            //                 pointBackgroundColor: 'rgba(75, 192, 192, 0.2)',
            //                 pointBorderColor: "white",
            //                 pointHoverRadius: 4,
            //                 pointHoverBackgroundColor: 'rgba(75, 192, 192, 0.2)',
            //                 pointHitRadius: 20,
            //                 pointBorderWidth: 3,
            //                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
            //                 borderColor: 'rgba(75, 192, 192, 1)',
            //                 borderWidth: 1
            //             }

            //             initialData.datasets.push(dataset2)

            //             let dataIndex = 10;
            //             setInterval(() => {
            //                 if (dataIndex < time.length) {
            //                     // line_chart.data.labels = time.slice(dataIndex - 9, dataIndex + 1);
            //                     // line_chart.data.datasets[0].data = price.slice(dataIndex - 9, dataIndex + 1);
            //                     line_chart.data.datasets[1].data = price2.slice(dataIndex - 9, dataIndex + 1);
            //                     line_chart.update();
            //                     dataIndex++;
            //                 }
            //             }, 5000);

            //         });

            // })

            // document.getElementById(`ibm`).addEventListener(`click`, () => {
            //     fetch(ibm_url)
            //         .then(response => response.json())
            //         .then(data => {
            //             let symbol2 = data['Meta Data'][`2. Symbol`];
            //             let stock_data2 = data['Time Series (1min)'];
            //             let date_time2 = Object.keys(stock_data2).reverse();
            //             date_time2.shift();
            //             let price2 = date_time2.map(label => stock_data2[label]['4. close']);

            //             let dataset2 = {
            //                 label: symbol2 + ` Stock price ($)`,
            //                 data: price2.slice(0, 10),
            //                 lineTension: 0.0,
            //                 borderColor: 'rgba(75, 192, 192, 0.2)',
            //                 pointRadius: 3,
            //                 pointBackgroundColor: 'rgba(75, 192, 192, 0.2)',
            //                 pointBorderColor: "white",
            //                 pointHoverRadius: 4,
            //                 pointHoverBackgroundColor: 'rgba(75, 192, 192, 0.2)',
            //                 pointHitRadius: 20,
            //                 pointBorderWidth: 3,
            //                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
            //                 borderColor: 'rgba(75, 192, 192, 1)',
            //                 borderWidth: 1
            //             }

            //             initialData.datasets.push(dataset2)

            //             let dataIndex = 10;
            //             setInterval(() => {
            //                 if (dataIndex < time.length) {
            //                     // line_chart.data.labels = time.slice(dataIndex - 9, dataIndex + 1);
            //                     // line_chart.data.datasets[0].data = price.slice(dataIndex - 9, dataIndex + 1);
            //                     line_chart.data.datasets[1].data = price2.slice(dataIndex - 9, dataIndex + 1);
            //                     line_chart.update();
            //                     dataIndex++;
            //                 }
            //             }, 5000);

            //         });

            // })

            let dataIndex = 10;
            setInterval(() => {
                if (dataIndex < time.length) {
                    line_chart.data.labels = time.slice(dataIndex - 9, dataIndex + 1);
                    line_chart.data.datasets[0].data = price.slice(dataIndex - 9, dataIndex + 1);
                    // line_chart.data.datasets[1].data = price2.slice(dataIndex - 9, dataIndex + 1);
                    line_chart.update();
                    dataIndex++;
                }
            }, 5000);

            // Doughnut Chart Code

            function gen_analysis() {
                const pump = Math.floor(Math.random() * 100);
                const dump = Math.floor(Math.random() * (100 - pump));
                const hold = 100 - pump - dump;
                return [pump, dump, hold];
            };
            var dct = document.getElementById('doughnut_chart').getContext('2d');
            var doughnut_chart = new Chart(dct, {
                type: 'doughnut',
                data: {
                    labels: ['Pump', 'Dump', 'Hold'],
                    datasets: [{
                        data: gen_analysis(),
                        backgroundColor: ['#198754', '#dc3545', '#ffc107'],
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            });
            setInterval(() => {
                doughnut_chart.data.datasets[0].data = gen_analysis();
                doughnut_chart.update();
            }, 5000);

        })




};
