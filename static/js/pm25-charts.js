let chart = echarts.init(document.querySelector("#main"));

drawPM25();
// 呼叫ajax(jQuery)
function drawPM25() {

    $.ajax(
        {
            url: "/pm25-json",
            type: "GET",
            dataType: "json",
            success: (data) => {
                console.log(data);
            },
            errer: () => {
                alert("讀取資料失敗!");
            }
        }
    );


    // 指定图表的配置项和数据
    let option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ['Asus NoteBook', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [100, 20, 36, 10, 10, 20]
            }
        ]
    };




    chart.setOption(option);
}