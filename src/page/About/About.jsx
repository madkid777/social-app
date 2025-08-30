import styles from './About.module.css'
import about from "../../assets/img/about___baltic_underwear_logo.jfif";

export default function About() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <img src={about} alt="" />
        </div>
    )
}
