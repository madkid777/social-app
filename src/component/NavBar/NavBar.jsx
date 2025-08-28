import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@heroui/navbar";
import { AiOutlineGlobal } from 'react-icons/ai';
import { Button } from '@heroui/react';
import { CounterContext } from '../../Auth/CounterContext';
import { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { Switch } from "@heroui/switch";
import { FaSun } from 'react-icons/fa';
import { IoMoonSharp } from "react-icons/io5";

export default function NavBarComponent({ handleDark }) {
    const { userToken, setUserToken } = useContext(AuthContext)
    const { counter } = useContext(CounterContext)
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem('token')
        setUserToken('')
        navigate('Login')
    }
    return (
        <Navbar className='bg-gray-50 shadow dark:bg-gray-600 dark:text-white'>
            <NavbarBrand>
                <Link to={""} className="font-bold text-inherit"><AiOutlineGlobal className='inline text-xl align-middle' /> <span className='align-middle'>Social</span></Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <NavLink to={""} color="foreground" href="#">
                        Home
                    </NavLink>
                </NavbarItem>
                {userToken &&
                    <>
                        <NavbarItem>
                            <NavLink to={"about"} aria-current="page" href="#">
                                About
                            </NavLink>
                        </NavbarItem>
                        <NavbarItem>
                            <NavLink to={"Posts"} aria-current="page" href="#">
                                Posts
                            </NavLink>
                        </NavbarItem>
                        <NavbarItem>
                            <NavLink to={"Profile"} aria-current="page" href="#">
                                Profile
                            </NavLink>
                        </NavbarItem>
                    </>}
            </NavbarContent>
            <NavbarContent justify="end">
                {!userToken ? <>
                    <NavbarItem className="hidden lg:flex">
                        <NavLink to={"Login"}>Login</NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" to={"Register"} variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </> : <Button as={Button} onClick={handleLogout} color="primary" variant="flat">
                    LogOut
                </Button>}
                <Switch
                    defaultSelected
                    color="primary"
                    size="lg"
                    thumbIcon={({ isSelected, className }) =>
                        isSelected ? <FaSun /> : <IoMoonSharp />
                    }
                    onChange={handleDark}
                >
                </Switch>
            </NavbarContent>

        </Navbar>
    )
}
