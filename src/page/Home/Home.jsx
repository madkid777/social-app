
import { useContext } from 'react'
import styles from './Home.module.css'
import { CounterContext } from '../../Auth/CounterContext'
import home from "../../assets/img/1711123154858.png";
import { Button } from '@heroui/react';


export default function Home() {
    const { counter, setCounter } = useContext(CounterContext)
    return (
        <div className='felx justify-items-center mt-5'>
            <img src={home} alt="" className='' />
            <div>
                <h1 className='text-center mb-2'> {counter}</h1>
                <Button onClick={() => { setCounter(counter + 1) }} className='bg-cyan-300 text-white'>Just Click!</Button>
            </div>
        </div>

    )
}
