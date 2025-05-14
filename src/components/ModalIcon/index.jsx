

export const ModalIcon = ({image}) => {
    return(
        <div className="w-[48px] h-[48px] bg-white border border-[#E9EAEB] rounded-[10px] flex justify-center items-center">
            <img className="w-[24px] h-[24px]" src={image} alt="modal icon" />
        </div>
    )
}