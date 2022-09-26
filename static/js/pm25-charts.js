let chart = echarts.init(document.querySelector("#main"));
let pm25HighSite = document.querySelector("#pm25_high_site");
let pm25HighValue = document.querySelector("#pm25_high_value");
let pm25LowSite = document.querySelector("#pm25_low_site");
let pm25LowValue = document.querySelector("#pm25_low_value");
let dateEl = document.querySelector("#date")

console.log(pm25HighSite, pm25HighValue, pm25LowSite, pm25LowValue)

$(document).ready(() => {
    drawPM25();
});


// 呼叫ajax(jQuery)
function drawPM25() {
    chart.showLoading();
    $.ajax(
        {
            url: "/pm25-json",
            type: "GET",
            dataType: "json",
            success: (data) => {
                chart.hideLoading();
                console.log(data);
                // drawPM25Chart(data);
                drawPM25Chart(data);
                renderMaxPM25(data)
            },
            error: () => {
                chart.hideLoading();
                alert("讀取資料失敗!");
            }
        }
    );
}

function renderMaxPM25(data) {
    let pm25 = data["pm25"];
    let site = data["site"];
    let maxValue = Math.max(...pm25)
    let maxIndex = pm25.indexOf(maxValue);
    let maxSite = data["site"][maxIndex];
    let minValue = Math.min(...pm25)
    let minIndex = pm25.indexOf(minValue);
    let minSite = data["site"][minIndex];
    console.log(maxSite, maxValue);
    console.log(minSite, minValue);

    pm25HighSite.innerText = maxSite;
    pm25HighValue.innerText = maxValue;
    pm25LowSite.innerText = minSite;
    pm25LowValue.innerText = minValue;
    dateEl.innerText = data["date"]
}


function drawPM25Chart2(data2) {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    // prettier-ignore
    let dataAxis = data2["site"];

    // prettier-ignore
    let data = data2["pm25"];
    let yMax = 500;
    let dataShadow = [];
    for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    option = {
        title: {
            text: '特性示例：渐变色 阴影 点击缩放',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
            data: dataAxis,
            axisLabel: {
                inside: true,
                color: '#fff'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999'
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data: data
            }
        ]
    };
    // Enable data zoom when user click bar.
    const zoomSize = 6;
    myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
                dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });

    option && myChart.setOption(option);

}


function drawPM25Chart(data) {
    // 指定图表的配置项和数据
    let option = {
        title: {
            text: 'PM2.5 全圖數據圖'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'left',
            top: 'center',
            feature: {
                magicType: { show: true, type: ['line', 'bar', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['PM2.5']
        },
        xAxis: {
            data: data["site"]
        },
        yAxis: {},
        series: [
            {
                name: 'PM2.5',
                type: 'bar',
                data: data["pm25"]
            }
        ]
    };

    chart.setOption(option);
}


