import Smart from './smart';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getFormatTime } from '../utils/common';

const StatsTypes = {
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME_SPEND: 'TIME-SPEND',
};

const BAR_HEIGHT = 55;

const getFormat = (type) => {
  switch (type) {
    case StatsTypes.MONEY:
      return (val) => `€ ${val}`;
    case StatsTypes.TYPE:
      return (val) => `${val}x`;
    case StatsTypes.TIME_SPEND:
      return (val) => `${getFormatTime(val)}`;
  }
};

const renderChart = (ctx, data, labels, title) => {
  ctx.height = BAR_HEIGHT * data.length;
  const format = getFormat(title);
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: format,
        },
      },
      title: {
        display: true,
        text: title,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createTripStatsTemplate = () => {
  return `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
};

export default class TripStats extends Smart{
  constructor(costByTypes, pointsByTypes, durationsByTypes) {
    super();
    this._costByTypes = costByTypes;
    this._pointsByTypes = pointsByTypes;
    this._durationsByTypes = durationsByTypes;
    this._renderCharts();
  }

  getTemplate () {
    return createTripStatsTemplate();
  }

  _renderCharts() {
    const moneyContainer = this.getElement().querySelector('.statistics__chart--money');
    const typeContainer = this.getElement().querySelector('.statistics__chart--transport');
    const timeContainer = this.getElement().querySelector('.statistics__chart--time');

    renderChart(moneyContainer,
      [...this._costByTypes.values()],
      [...this._costByTypes.keys()],
      StatsTypes.MONEY);
    renderChart(typeContainer,
      [...this._pointsByTypes.values()],
      [...this._pointsByTypes.keys()],
      StatsTypes.TYPE);
    renderChart(timeContainer,
      [...this._durationsByTypes.values()],
      [...this._durationsByTypes.keys()],
      StatsTypes.TIME_SPEND);
  }
}
