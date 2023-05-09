import React from "react";
import "./App.css";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


// get data from LS
const getLocalData = () => {
  let list = localStorage.getItem('count');
  if (list) {
    return localStorage.getItem('count');
  }
}

function App() {
  const [count, setCount] = useState(parseInt(getLocalData()));
  const [alertVisible, setAlertVisible] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [remaining, setRemaining] = useState("");
  const [maxValue, setMaxValue] = useState(200);
  const [valueMsg, setValueMsg] = useState("");
  const [minValue, setMinValue] = useState(25);


  // add
  const addCount = () => {
    setCount(count + 1)
    toast.success('Count increase by 1')
  }


  // sub
  const subCount = () => {
    if (count === 0) {
      toast.warning('You reached the minimum value');
    } else {
      setCount(count - 1);
      toast.success('Count decreased by 1');
    }


    // Reset
  }
  const resetCount = () => {
    if (count === 0) {
      toast.success('Count value is already 0')
    } else {
      setCount(0);
      toast.success('Count reset succesfully')
    }
  }

  // hit target alert
  useEffect(() => {
    if (count > maxValue) {
      setAlertVisible(true);
      setValueMsg("you crossed your ")
    } else {
      setAlertVisible(false);
    }
  }, [count]);


  // add to local storage
  useEffect(() => {
    localStorage.setItem('count', (count) || 0)
  })


  // custom count
  const handleSubmit = (e) => {
    e.preventDefault();

    if (customValue.trim() === "") {
      toast.error("The value cannot be empty");
    } else if (isNaN(customValue)) {
      toast.error("Invalid input");
    } else {
      const parsedValue = parseInt(customValue);
      if (parsedValue < 0) {
        toast.warning("Oops! The count cannot be negative");
        setCustomValue("");
      } else {
        setCount(parsedValue);
        toast.success(`Count set to ${parsedValue}`);
        setCustomValue("");
      }
    }
  };

  // handle increase
  const handleIncrease = (value) => {
    setCount(count + value);
    toast.success(`Count increased by ${value}`);
  }


  // handle decrese
  const handleDecrese = (value) => {
    const newCount = count - value;
    if (newCount < 0) {
      setCount(0);
      toast.warning(`Value cannot be less than 0`);
    } else {
      setCount(newCount);
      toast.success(`Count decreased by ${value}`);
    }
  };

  // handle value
  const handleValue = (e) => {
    e.preventDefault();

    if (minValue) {
      setMinValue(minValue);
      toast.success(`Minimum value set to ${minValue} `)
    }
    if (maxValue) {
      setMaxValue(maxValue);
      toast.success(`Maximum value set to ${maxValue} `)
    }
  }

  useEffect(() => {
    const remain = maxValue - count;
    if (remain < 0) {
      setRemaining(0);
    } else {
      setRemaining(remain);
    }
  }, [count]);

  return (
    <div className="grid grid-cols-3">

      <div className="mt-20 w-full h-screen">
        <div className="">
          <div className="my-2">
            <p className="text-center text-gray-200">Set your minimum and maximum target</p>
          </div>
          <div className="">
            <form onSubmit={handleValue}>
              <div className="flex justify-center">
                <label htmlFor="minValue" className="my-2 text-gray-200 mr-2">Min:</label>
                <input type="number" name="minValue" className="w-16 p-2 rounded-md mr-4" value={minValue} onChange={(e) => setMinValue(e.target.value)} />
                <label htmlFor="maxValue" className="my-2 text-gray-200 mr-2">Max:</label>
                <input type="number" name="maxValue" className="w-16 p-2 rounded-md mr-4" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
              </div>
              <div className="flex justify-center mt-4">
                <br />
                <button type="submit" className="bg-green-400 py-2 w-64 rounded-lg ">Save</button>
              </div>
            </form>
          </div>


          <div className='flex justify-center my-10'>
            <form onSubmit={handleSubmit} className=''>
              <input type="number" name='num' placeholder='set a number' className='px-3 py-2 rounded-l-full ' value={customValue} onChange={(e) => setCustomValue(e.target.value)} />
              <button type='submit' className='bg-gray-900 py-2 px-2 text-gray-300 rounded-r-full border-none'>Set</button>
            </form>
          </div>

          <div className="ml-10">
            <div className='grid grid-cols-2 xl:grid-cols-4'>
              <button className='px-6 py-2 bg-gray-900 rounded-md mx-1 text-gray-400 my-4' onClick={() => handleIncrease(10)}>+10</button>
              <button className='px-6 py-2 bg-gray-900 rounded-md mx-1 text-gray-400 my-4' onClick={() => handleIncrease(50)}>+50</button>
              <button className='px-6 py-2 bg-gray-900 rounded-md mx-1 text-gray-400 my-4' onClick={() => handleIncrease(100)}>+100</button>
              <button className='px-6 py-2 bg-gray-900 rounded-md mx-1 text-gray-400 my-4' onClick={() => handleIncrease(1000)}>+1000</button>
            </div>

            <div className='grid grid-cols-2 xl:grid-cols-4 my-6'>
              <button className='px-[26px] py-2 bg-gray-900 rounded-md mx-1 text-gray-400 my-4' onClick={() => handleDecrese(10)}>-10</button>
              <button className='px-[26px] py-2 bg-gray-900 rounded-md mx-1 text-gray-400 my-4' onClick={() => handleDecrese(50)}>-50</button>
              <button className='px-[26px] py-2 bg-gray-900 rounded-md mx-1 text-gray-400 my-4' onClick={() => handleDecrese(100)}>-100</button>
              <button className='px-[26px] py-2 bg-gray-900 rounded-md mx-1 text-gray-400 my-4' onClick={() => handleDecrese(1000)}>-1000</button>
            </div>
          </div>


        </div>
      </div>


      <div className="w-full h-screen ">


        <div className=' flex justify-center items-center mt-20'>
          <button onClick={subCount} className='text-gray-700 bg-gray-900 text-7xl rounded-md px-7 pb-2'>-</button>
          <p className='text-6xl text-gray-300 px-5 py-2'>{count}</p>
          <button onClick={addCount} className='text-gray-700 bg-gray-900 text-7xl rounded-md px-5 pb-2'>+</button>
        </div>

        <div className=" w-full text-center my-4">
          <button className='px-6 py-2 bg-gray-900 text-gray-500 font-bold rounded-md ' onClick={resetCount}>Reset</button>
        </div>

        <div className='my-16'>
          {alertVisible && <p className='text-2xl text-gray-300 text-center mt-20'>Your daily target is completed! </p>}
        </div>


      </div>

      <div className="">
        <ToastContainer position='bottom-right' theme='dark' />
        <div className=" h-52 text-center my-20">
          <div className="w-64 h-full mx-auto border border-gray-900 rounded-lg">

            <div className="bg-gray-900 py-1 rounded-t-lg">
              <p className="text-gray-300">Status</p>
            </div>
            <div className="text-left space-y-2">
              <p className="ml-2 mr-8 text-gray-300">Min: {minValue} </p>
              <p className="ml-2 mr-8 text-gray-300"> Max: {maxValue}</p>
              <p className="ml-2 mr-8 text-gray-300">Reamaining: {remaining}</p>
              <p className="ml-2 mr-8 text-gray-300">Completed: {maxValue}</p>
              <p className="ml-2 mr-8 text-gray-300">Completed: {maxValue}</p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
