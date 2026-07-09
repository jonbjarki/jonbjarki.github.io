import './App.css';
import Header from './components/header/header';
import AboutMeSection from './components/about-me/about';
import ExperienceSection from './components/experience/experience';

export default function App() {
    return (
        <>
            <Header />
            <div id="content">
                <main>
                    <AboutMeSection />
                </main>
                <ExperienceSection />
            </div>
        </>
    )
}