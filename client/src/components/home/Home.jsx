import Header from '../../components/header/Header'
import Posts from '../../components/posts/posts'
import SideBar from '../../components/sidebar/Sidebar'
import './home.css'

export default function Home() {

    return (
        <>
            <Header />
            <div className="home">
                <Posts />
                <SideBar />
            </div>
        </>
    )
}
