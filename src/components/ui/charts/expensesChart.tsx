/* eslint-disable max-len */
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import {
  Chart, ChartArea, ChartData, TooltipItem, ScriptableContext, Color,
} from 'chart.js'

interface Props {
  categories: string[];
  totals: number[];
}

const createGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea, colors: [string, string, string]): CanvasGradient => {
  const {
    left, right, top, bottom,
  } = chartArea
  const width = right - left
  const height = bottom - top
  const centerX = (left + right) / 2
  const centerY = (top + bottom) / 2
  const radius = Math.min(width, height) / 2

  const innerRadius = radius * 0.5
  const outerRadius = radius

  const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius)

  gradient.addColorStop(0, colors[0])
  gradient.addColorStop(0.5, colors[1])
  gradient.addColorStop(1, colors[2])

  return gradient
}

function ExpensesChart({ categories, totals }: Props) {
  const data: ChartData<'doughnut', number[], string> = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: totals,
        backgroundColor(context: ScriptableContext<'doughnut'>): Color {
          const { chart } = context
          const { ctx, chartArea } = chart

          if (!chartArea) {
            return 'rgba(0, 0, 0, 0.1)'
          }

          const colorSets: [string, string, string][] = [
            ['#5e60ce84', '#6930c384', '#7400b884'],
            ['#4e89ae84', '#4361ee84', '#480ca884'],
            ['#3f37c984', '#7209b784', '#f7258584'],
            ['#5390d984', '#5e60ce84', '#7400b884'],
            ['#4ea8de84', '#4f5bd584', '#9b5de584'],
          ]

          return createGradient(ctx, chartArea, colorSets[context.dataIndex % colorSets.length])
        },
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
      },
    ],
  }

  const total = totals.reduce((acc, cur) => acc + cur, 0)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(tooltipItem: TooltipItem<'doughnut'>) {
            return `${tooltipItem.label}: €${tooltipItem.raw}`
          },
        },
      },
      title: {
        display: false,
      },
    },
    animation: {
      onComplete(this: Chart) {
        const chart = this
        const { ctx, chartArea } = chart

        if (!chartArea) {
          return
        }

        ctx.save()
        ctx.font = '30px Sawarabi Mincho'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#8369F5'

        const centerX = (chartArea.left + chartArea.right) / 2
        const centerY = (chartArea.top + chartArea.bottom) / 2

        ctx.fillText(`Total: €${total.toFixed(2)}`, centerX, centerY)
        ctx.restore()
      },
    },
  }

  return <Doughnut data={data} options={options} />
}

export default ExpensesChart
