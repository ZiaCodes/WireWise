import Chart,{ArcElement, Tooltip, Legend,BarElement, CategoryScale, LinearScale,defaults} from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend,BarElement, CategoryScale, LinearScale);


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = false
defaults.plugins.title.align = "center"
defaults.plugins.title.font.size = 15

const HorizentalChart = ({label,dataset}) => {

  const options={
    indexAxis:'y',
    scales:{
      x:{
        stacked:true
      },
      y:{
        stacked:true
      }
    },
    plugins:{
      title:{
        text:"# Over View of Request Call"
      },
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        anchor: "end",
        font: { size: "11" }
      } 
    },
    legend: {
      display: false
    }
  }
  return (
    <>
    <Bar
    className='ml-4 p-2'
      data={{
        labels:label,
        datasets: dataset
    }}
    options={options}
    />
    </>
  )
}

export default HorizentalChart
