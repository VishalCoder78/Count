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

function Aapp() {
    const [count, setCount] = useState(parseInt(getLocalData()));
    const [alertVisible, setAlertVisible] = useState(false);
    const [customValue, setCustomValue] = useState();
    const [valueMsg, setValueMsg] = useState("")
    const [minValue, setMinValue] = useState(25);
    const [maxValue, setMaxValue] = useState(100);


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


    return (
        <div className='h-screen bg-gray-700' >
            <div>
                <div className="pt-10">
                    <div>
                        <p className="text-center text-gray-200 my-2">Set your minimum and maximum target</p>
                    </div>
                    <div className="flex justify-center">
                        <form onSubmit={handleValue}>
                            <div>
                                <label htmlFor="minValue" className="p-1.5 text-gray-200">Min:</label>
                                <input type="number" name="minValue" className="w-16 p-1.5 rounded-md" value={minValue} onChange={(e) => setMinValue(e.target.value)} />
                                <label htmlFor="maxValue" className="p-1.5 text-gray-200">Max:</label>
                                <input type="number" name="maxValue" className="w-16 p-1.5 rounded-md" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
                            </div>
                            <div>
                                <br />
                                <button type="submit" className="bg-green-400 w-full p-2 rounded-md">Save</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <ToastContainer position='top-right' theme='dark' />
            <div className=' flex flex-col justify-center items-center h-full'>

                <div className='mb-20'>

                    <div className=''>
                        <form onSubmit={handleSubmit} className=''>
                            <input type="number" name='num' placeholder='set a number' className='px-3 py-2 rounded-l-full w-[30rem] ' value={customValue} onChange={(e) => setCustomValue(e.target.value)} />
                            <button type='submit' className='bg-gray-900 py-2 px-2 text-gray-300 rounded-r-full border-none'>Set</button>
                        </form>
                    </div>

                    <div className='m-8'>
                        <button className='px-6 py-2 bg-gray-900 rounded-md mx-4 text-gray-400' onClick={() => handleIncrease(10)}>+10</button>
                        <button className='px-6 py-2 bg-gray-900 rounded-md mx-4 text-gray-400' onClick={() => handleIncrease(50)}>+50</button>
                        <button className='px-6 py-2 bg-gray-900 rounded-md mx-4 text-gray-400' onClick={() => handleIncrease(100)}>+100</button>
                        <button className='px-6 py-2 bg-gray-900 rounded-md mx-4 text-gray-400' onClick={() => handleIncrease(1000)}>+1000</button>
                    </div>

                    <div className='ml-8'>
                        <button className='px-7 py-2 bg-gray-900 rounded-md mx-3.5 text-gray-400' onClick={() => handleDecrese(10)}>-10</button>
                        <button className='px-7 py-2 bg-gray-900 rounded-md mx-3.5 text-gray-400' onClick={() => handleDecrese(50)}>-50</button>
                        <button className='px-7 py-2 bg-gray-900 rounded-md mx-3.5 text-gray-400' onClick={() => handleDecrese(100)}>-100</button>
                        <button className='px-7 py-2 bg-gray-900 rounded-md mx-3.5 text-gray-400' onClick={() => handleDecrese(1000)}>-1000</button>
                    </div>

                </div>

                <div className='flex'>
                    <button onClick={subCount} className='text-gray-700 bg-gray-900 text-7xl rounded-md px-7 pb-2'>-</button>
                    <p className='text-6xl text-gray-300 px-5 py-2'>{count}</p>
                    <button onClick={addCount} className='text-gray-700 bg-gray-900 text-7xl rounded-md px-5 pb-2'>+</button>
                </div>

                <div>
                    <button className='px-6 py-2 bg-gray-900 text-gray-500 font-bold rounded-md mt-8' onClick={resetCount}>Reset</button>
                </div>

                <div className='my-4'>
                    {alertVisible && <p className='text-2xl text-gray-300 text-center mt-5'>Your daily target is completed! </p>}
                </div>

            </div>
        </div>
    );
}
