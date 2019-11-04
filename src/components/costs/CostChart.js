import React, { Component } from "react"

const { Chart } = window;

class CostChart extends Component {
  componentDidMount() {
    const ctx = document.getElementById("costChart");
    const costChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
          labels: ["28,000円"],
          datasets: [
            {
              label: "あなたの支払い",
              data: [15000],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1
           },
           {
             label: "相手の支払い",
             data: [13000],
             backgroundColor: "rgba(54, 162, 235, 0.2)",
             borderColor: "rgba(54, 162, 235, 1)",
             borderWidth: 1
           }
          ]
      },
      options: {
        scales: {
          yAxes: [{
            stacked: true,
          }],
          xAxes: [{
            stacked: true,
            scaleLabel: {             // 軸ラベル
              display: true, // 表示設定
              labelString: "円",  // ラベル
              fontSize: 10          // フォントサイズ
            }
          }]
        }
      }
    });
  }
  render() {
    return (
      <canvas id="costChart"></canvas>
    )
  }
}

// export default connect(mapStateToProps)(CostChart)
export default CostChart
