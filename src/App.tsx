import './App.css';
import Header from './components/header/header';
import AboutMe from './components/about-me/about';
import Projects from './components/projects/projects';

export default function App() {
    return (
        <>
            <Header />
            <div id="content">
                <AboutMe />
                <Projects />
            </div>
        </>
    )
}