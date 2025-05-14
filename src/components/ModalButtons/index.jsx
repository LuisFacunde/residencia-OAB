

export const ModalButtons = ({onClick, text}) => {
    return(
        <button className={`${text == "Cancelar" ? "bg-white border text-[#414651] border-[#D5D7DA] cursor-pointer" : "bg-[#C0090E] text-white"} font-bold text-[16px] rounded-lg w-full py-2.5 flex justify-center items-center cursor-pointer`} onClick={onClick}>{text}</button>
    )
}