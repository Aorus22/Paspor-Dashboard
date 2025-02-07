import Image from "next/image";

const Header = () => {
    return (
    <header className={`bg-white shadow-md p-4 fixed w-full z-10`}>
        <div className="flex items-center gap-2">
            <img 
                src="/icon/logo1.png" 
                alt="Logo Kantor Imigrasi" 
                className="h-12 rounded-lg border-2 border-white"
            />
            <img 
                src="/icon/logo2.png" 
                alt="Logo Kantor Imigrasi" 
                className="h-12 rounded-lg border-2 border-white"
            />
            <h1 className="text-[#1f2937] text-2xl font-bold tracking-tight">
                Kantor Imigrasi Kelas I TPI Cilacap
            </h1>
        </div>
    </header>
    )
}

export default Header;