export const ModalInput = ({label,showLabel = true,placeholder,value}) => {
    return(
        <div className="flex flex-col gap-1.5">
            {showLabel && <label value={value} htmlFor="modal-input">{label}</label>}
            <input className=" border border-[#D5D7DA] rounded-[8px] py-2.5 px-3.5" type="text" placeholder={placeholder}/>
        </div>
    )
}