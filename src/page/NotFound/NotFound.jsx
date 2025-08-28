import styles from './NotFound.module.css'
import errPage from "../../assets/img/404-error-page-templates.jpg"
import { Link } from 'react-router-dom'
export default function NotFound() {
    return (
        <div>
            <div >
                <Link to="/" className='mx-auto mt-5'><img src={errPage} className='w-full' /></Link>
            </div>
        </div>
    )
}
