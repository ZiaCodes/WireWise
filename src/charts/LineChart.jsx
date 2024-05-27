import Chart,{ArcElement, Tooltip, Legend,BarElement, CategoryScale, LinearScale,defaults} from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend,BarElement, CategoryScale, LinearScale);


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true
defaults.plugins.title.align = "start"
defaults.plugins.title.font.size = 15

const AnotherChart = ({label,dataset}) => {

  const options={
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
        text:"# Age wise Tickets"
      },
      datalabels: {
        display: true,
        color: "black",
        align: "center",
        anchor: "center",
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
    className='m-4'
      data={{
        labels:label,
        datasets: dataset
    }}
    options={options}
    />
    </>
  )
}

export default AnotherChart


export const LocationChart = ({label,dataset}) =>{
  const options={
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
        text:"# Location wise Tickets"
      },
      datalabels: {
        display: true,
        color: "black",
        align: "center",
        anchor: "center",
        font: { size: "11" }
      } 
    },
    legend: {
      display: false
    }
  }
  return(
    <Bar
    className='m-4'
      data={{
        labels:label,
        datasets: dataset
    }}
    options={options}
    />
  )
}