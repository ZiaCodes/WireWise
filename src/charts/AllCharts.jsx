import { 
    Legend, 
    Tooltip, 
    ResponsiveContainer,
    BarChart, 
    Bar,
    XAxis, 
    YAxis, 
    CartesianGrid } from 'recharts';



const getIntroOfPage = (label) => {
    if (label === 'Above 3') {
        return "More than 3 days";
    }
    if (label === 'Below 3') {
        return "Less than 3 days";
    }
    if (label === 'Pending') {
        return "Calls which is not resolved";
    }
    if (label === 'Close') {
        return "Calls which are resolved";
    }
    if (label === 'AR') {
        return "Access point Requirement";
    }
    if (label === 'Transfer') {
        return "Need to transfer to another team";
    }
    if (label === 'WIP') {
        return "Work in progress";
    }
    if (label === 'New') {
        return "New Assignments";
    }
    if (label === 'Reopen') {
        return "Calls which are open again";
    }
    
    return '';
    };

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
        <div className="custom-tooltip">
            <p className="label">{`${label} : ${payload[0].value}`}</p>
            <p className="intro">{getIntroOfPage(label)}</p>
        </div>
        );
    }
    
    return null;
    };

const AllCharts = ({above,below,close,open,newAssignment,workInProgress,aPRequired,transfer,ReOpen}) => {


    const dataBarChart = [
        {
          name: 'Above 3',
          'Age slab': above,
          pv: 2400,
          amt: 2400,
          fill:'#ff0000'
        },
        {
          name: 'Below 3',
          'Age slab': below,
          pv: 1398,
          amt: 2210,
          fill:'#008000'
        }
      ];
    
    
      const statusBarChart = [
        {
          name: 'Close',
          'Call status': close,
          pv: 1398,
          amt: 2210,
          fill:'#008000'
        },
        {
          name: 'Pending',
          'Call status': open,
          pv: 2400,
          amt: 2400,
          fill:'#ff0000'
        },
        {
          name: 'New',
          'Call status': newAssignment,
          pv: 1398,
          amt: 2210,
          fill:'#ff001e'
        },
        {
          name: 'WIP',
          'Call status': workInProgress,
          pv: 1398,
          amt: 2210,
          fill:'#00ff84'
        },
        {
          name: 'AR',
          'Call status': aPRequired,
          pv: 1398,
          amt: 2210,
          fill:'#004cff'
        },
        {
          name: 'Transfer',
          'Call status': transfer,
          pv: 1398,
          amt: 2210,
          fill:'#ff00d0'
        },
        {
          name: 'Reopen',
          'Call status': ReOpen,
          pv: 1398,
          amt: 2210,
          fill:'#bb00ff'
        }
      ]

  return (
    <div className='lg:flex-nowrap flex-wrap w-full h-96 gap-8 flex p-12 justify-center items-center '>
    
      <ResponsiveContainer  >
      <BarChart
          width={500}
          height={300}
          data={statusBarChart}
          key={1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Call status" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width='100%' height='100%'>
      <BarChart
          width={100}
          height={200}
          data={dataBarChart}
          key={1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Age slab" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div>
    </div>
  </div>
  )
}

export default AllCharts