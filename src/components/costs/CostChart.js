import React, { Component } from "react"

const { Chart, ChartDataLabels } = window;
Chart.plugins.unregister(ChartDataLabels);

class CostChart extends Component {
  componentDidMount() {
    const ctx = document.getElementById("costChart");
    const costChart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
          labels: [],
          datasets: [
            {
              label: "あなたの支払い",
              data: [150000],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1
           },
           {
             label: "相手の支払い",
             data: [130000],
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
            display: false
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
