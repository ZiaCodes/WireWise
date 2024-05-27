import Chart, { ArcElement, Tooltip, Legend,defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

Chart.register(ArcElement, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;


defaults.plugins.title.display = true
defaults.plugins.title.align = "start"
defaults.plugins.title.font.size = 15

const DonutChart = ({label,dataset}) => {
  const options={
    plugins:{
      title:{
        text:"# Team wise ticket"
      }
    }
  }

  return (
    <>
        <Doughnut 
        className="m-4"
            data={{
                labels:label,
                datasets: dataset
            }}
            options={options}
        />
    </>
  )
}

export default DonutChart