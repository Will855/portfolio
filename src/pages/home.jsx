import Glitch from "../components/glitch/GlitchPresentation"
import MagneticBtn from "../components/magneticButton/magneticBtn"

export const Home = () => {
    return (
        <>
            <div className="min-h-screen p-4 grid md:grid-rows-[50%_auto]  gap-16">
                <div className="mx-auto self-end">
                    <Glitch />
                </div>
                <div className="mx-auto self-start">
                    <MagneticBtn />
                </div>
            </div>
        </>
    )
}