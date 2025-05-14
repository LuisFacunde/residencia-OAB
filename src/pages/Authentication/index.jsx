import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Authentication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sector: '',
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
        navigate('/administrativo');
      } else {
        alert('Por favor, preencha todos os campos');
      }
  };

  return (
    <div className="flex">
      <div className='h-[100vh] w-[700px] shadow-xl shadow-black relative 
          bg-[#062055] bg-gradient-to-r from-[#062055] via-[#2951A3] to-[#122E67] flex
          flex-col justify-center items-center max-[1150px]:hidden'>
        
        <img className="max-w-75 absolute top-24" src="/src/assets/oab.svg" alt="" />
        <img className="max-h-170 absolute w-full top-9" src="/src/assets/handshake.svg" alt="" />
        <div className="absolute bottom-38 text-center flex flex-col gap-6">
          <h1 className="text-white text-4xl font-bold">PrestOAB</h1>
          <p className="text-[#BDBDBD]">Lorem ipsum dolor sit amet, consectetur <br /> 
          adipiscing elit, sed do eiusmod tempor incididun.</p>
        </div>
      </div>

      <div className="w-full">
        <div className="p-8 max-[400px]:p-4">
          <p className="flex cursor-pointer text-center gap-2 max-[400px]:text-[16px] max-[340px]:text-[14px]">
            <img src="/src/assets/arrow-left.svg" alt="" /> Voltar ao menu
          </p>
        </div>

        <div className="w-[100%] h-[75%] flex flex-col justify-center items-center gap-8 max-[1150px]:h-[75vh]">
          <div className="text-center flex flex-col gap-3.5">
            <h1 className="text-2xl font-bold max-[400px]:text-[20px] max-[340px]:text-[18px]">SEJA BEM VINDO DE VOLTA!</h1>
            <p className="text-1xl text-[#424242] font-normal max-[400px]:text-[16px] max-[340px]:text-[14px]">FAÇA O LOGIN PARA CONTINUAR</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4 px-9">
            <input
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="p-4 w-full border border-[#757575] rounded cursor-pointer"
              type="text"
              placeholder="Digite o seu usuário"
              required
            />

            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              
              <input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-4 w-full border border-[#757575] rounded pl-10 pr-28 cursor-pointer"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                required
              />
              
              <div 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                <p className="text-sm text-[#2951A3] cursor-pointer">
                  {showPassword ? "Ocultar" : "Mostrar"}
                </p>
              </div>
            </div>

            <button 
              type="submit"
              className="bg-[#C10A0F] hover:bg-[#A0080D] cursor-pointer w-full flex justify-between items-center text-center text-white px-8 py-5 rounded transition-colors duration-200"
            >
              Entrar no sistema <img src="/src/assets/arrow-right.svg" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}