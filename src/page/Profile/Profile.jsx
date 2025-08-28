import styles from './Profile.module.css'
import ProfileCard from './ProfileCard/ProfileCard'
import ProfilePosts from './ProfilePosts/ProfilePosts'
export default function Profile() {
    return (
        <main className='grid grid-cols-3 w-[90%] mx-auto mt-4'>
            <ProfileCard />
            <ProfilePosts />
        </main>
    )
}
