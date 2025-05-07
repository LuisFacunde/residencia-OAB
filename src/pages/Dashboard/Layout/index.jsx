import { Outlet, NavLink } from "react-router-dom"
import hand from "../../../assets/hand.svg"
import profile from "../../../assets/profile.svg"
import logo from "../../../assets/logoOab.svg"
import painel from "../../../assets/painelIcon.svg"
import tabela from "../../../assets/tabelaIcon.svg"

const tables = ["tabela1", "tabela2"]

export const Layout = () => {
    return(
        <div className="bg-[#F5F5F9] flex">
            <div className="h-[100vh] w-[300px] bg-[#062360]">
                <div className="w-[100%] py-[30px] pb-[11px] flex justify-center items-center">
                    <img src={logo} alt="logo oab" />
                </div>
                <ul className="text-[#A4A6B3]">
                    <NavLink
                        to="/Administrativo"
                        className={({ isActive }) =>
                            `flex gap-6 px-8 py-5 transition-all cursor-pointer ${
                                isActive ? "border-white border-l-2 bg-[#092761]" : "hover:bg-[#092761]"
                            }`
                        }
                    >
                        <img className="w-[25px]" src={painel} alt="painel" />
                        Painel Administrativo
                    </NavLink>

                    {tables.map((table) => (
                        <NavLink
                            key={table}
                            to={`/tabelas/${table}`}
                            className={({ isActive }) =>
                                `flex gap-6 px-8 py-5 transition-all cursor-pointer ${
                                    isActive ? "border-white border-l-2 bg-[#092761]" : "hover:bg-[#092761]"
                                }`
                            }
                        >
                            <img className="w-[25px]" src={tabela} alt="tabela" />
                            {table}
                        </NavLink>
                    ))}
                </ul>
            </div>

            <div className="w-[calc(100%-300px)]">
                <div className="fixed px-16 py-6 text-[33px] z-50 w-[calc(100%-300px)] bg-white border-b-[1px] border-[#CFCFCF] shadow-md flex justify-between ">
                    <p className="flex gap-1.5 items-center">Olá, Caio <img className="w-[40px] h-[40px]" src={hand} alt="hand icon" /></p>
                    <img src={profile} alt="profile pic" />
                </div>
                <div className="mt-[99px] px-16 py-[40px]">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
