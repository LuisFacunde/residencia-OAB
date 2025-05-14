

export const ModalButtons = ({onClick, text}) => {
    return(
        <button className={`${text == "Cancelar" ? "bg-white border text-[#414651] border-[#D5D7DA]" : "bg-[#C0090E] text-white"} font-bold text-[16px] rounded-lg w-full py-2.5 flex justify-center items-center`} onClick={onClick}>{text}</button>
    )
}