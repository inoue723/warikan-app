import React, { Component } from "react"

const { Chart, ChartDataLabels } = window;
Chart.plugins.unregister(ChartDataLabels);

class CostChart extends Component {
  getCostData(myCosts, partnerCosts) {
    let myTotalCost = 0;
    if (myCosts.length > 0) {
      myTotalCost = myCosts.reduce((acc, current) => acc + current.amount, 0);
    }

    let partnerTotalCost = 0;
    if (partnerCosts.length > 0) {
      partnerTotalCost = partnerCosts.reduce((acc, current) => acc + current.amount, 0);
    }

    const totalCost = myTotalCost + partnerTotalCost;
    const difference =  Math.trunc(myTotalCost - (totalCost / 2));
    return { totalCost, myTotalCost, partnerTotalCost, difference };
  }

  componentDidMount() {
    const { totalCost, myTotalCost, partnerTotalCost } = this.getCostData(this.props.myCosts, this.props.partnerCosts);
    const ctx = document.getElementById("costChart");
    new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: [`${totalCost.toLocaleString()}円`],
        datasets: [
          {
            label: "あなたの支払い",
            data: [myTotalCost],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1
          },
          {
            label: "相手の支払い",
            data: [partnerTotalCost],
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
        },
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              return value.toLocaleString() + "円";
            }
          }
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

export default CostChart
