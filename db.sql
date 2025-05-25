CREATE DATABASE DM_TI_FINANCEIRO;

USE DM_TI_FINANCEIRO;

CREATE TABLE Subseccional (
	Id INT NOT NULL,
	Descricao VARCHAR(100) NOT NULL,
	Id_usuario INT NOT NULL,
	Status CHAR(1) DEFAULT 'A',
CONSTRAINT Pk_Id_Subseccional PRIMARY KEY (Id)
);

CREATE TABLE Demonstrativo (
	Id INT IDENTITY(1,1),
	Descricao VARCHAR(100) NOT NULL,
	Status CHAR(1) DEFAULT 'A',
CONSTRAINT Pk_Id_Demonst PRIMARY KEY (Id)
);

CREATE TABLE Instituicao (
	Id INT IDENTITY(1,1),
	Descricao VARCHAR(100) NOT NULL,
	Status CHAR(1) DEFAULT 'A',
CONSTRAINT Pk_Id_Instit PRIMARY KEY (Id)
);

CREATE TABLE Transparencia (
	Id INT IDENTITY(1,1),
	Id_Demonst INT NOT NULL,
	Referencia VARCHAR(80) NOT NULL,
	Ano VARCHAR(4) NOT NULL,
	Periodicidade VARCHAR(80) NOT NULL,
	DtPrevEntr DATE NOT NULL,
	DtEntrega DATE,
	Status CHAR(1) DEFAULT 'A',
CONSTRAINT Pk_Id_Transpparencia PRIMARY KEY (Id),
CONSTRAINT Fk_Id_Demonst FOREIGN KEY (Id_Demonst) REFERENCES Demonstrativo (Id)
);

CREATE TABLE BalanceteCFOAB (
	Id INT IDENTITY(1,1),
	Id_Demonst INT NOT NULL,
	Referencia VARCHAR(80) NOT NULL,
	Ano VARCHAR(4) NOT NULL,
	Periodicidade VARCHAR(80) NOT NULL,
	DtPrevEntr DATE NOT NULL,
	DtEntrega DATE,
	Eficiencia INT,
	Status CHAR(1) DEFAULT 'A',
CONSTRAINT Pk_Id_BalancCFOAB PRIMARY KEY (Id),
CONSTRAINT Fk_Id_DemonstBal FOREIGN KEY (Id_Demonst) REFERENCES Demonstrativo (Id)
);

CREATE TABLE PagamentoCotas (
	Id INT IDENTITY(1,1),
	Id_Instit INT NOT NULL,
	MesRef VARCHAR(10) NOT NULL,
	AnoRef VARCHAR(4) NOT NULL,
	DtPrevEntr DATE NOT NULL,
	ValorDuodecimo DECIMAL(19,2),
	ValorDesconto DECIMAL(19,2),
	Id_TpDesc INT NOT NULL,
	ValorPago DECIMAL(19,2),
	DtPagto DATE,
	Observacao VARCHAR(255),
	Status CHAR(1) DEFAULT 'A',
CONSTRAINT Pk_Id_PagtoCotas PRIMARY KEY (Id),
CONSTRAINT Fk_Id_Instit FOREIGN KEY (Id_Instit) REFERENCES Instituicao (Id)
);

CREATE TABLE PrestacaoContasSubseccional (
	Id INT IDENTITY(1,1),
	Id_Subseccional INT NOT NULL,
	MesRef VARCHAR(10) NOT NULL,
	AnoRef VARCHAR(4) NOT NULL,
	DtPrevEntr DATE NOT NULL,
	DtEntrega DATE,
	DtPagto DATE,
	ValorPago DECIMAL(19,2),
	Eficiencia INT,
	Observacao VARCHAR(255),
	Status CHAR(1) DEFAULT 'A',
CONSTRAINT Pk_Id_PrestContasSub PRIMARY KEY (Id),
CONSTRAINT FK_Id_SubsecPrestCont FOREIGN KEY (Id_Subseccional) REFERENCES Subseccional (Id)
);

CREATE TABLE BaseOrcamentaria(
	Id INT IDENTITY(1,1),
	Id_Lancto INT NOT NULL,
	Lancto VARCHAR(50) NOT NULL,
	Valor DECIMAL(19, 2) NOT NULL,
	DtDocto DATE NOT NULL,
	DtLancto DATE NOT NULL,
	Ano INT NOT NULL,
	Tipo VARCHAR(50) NOT NULL,
	Status CHAR(1) DEFAULT 'A',
CONSTRAINT Pk_Id_BaseOrc PRIMARY KEY (Id)
);

CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    NomeUsuario VARCHAR(100), 
    Email VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Setor VARCHAR(100),
    Cargo VARCHAR(100),
    Id_Perfil INT NOT NULL,
    Status CHAR(1) DEFAULT 'A',
    CONSTRAINT FK_Id_Perfil FOREIGN KEY (Id_Perfil) REFERENCES Perfis(Id),
    CONSTRAINT UQ_NomeUsuario UNIQUE (NomeUsuario) 
);

CREATE TABLE Perfis (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO Perfis (Nome) VALUES ('Admin');

CREATE TABLE Modulos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO Modulos (Nome) VALUES 
('Subseccional'),
('Demonstrativo'),
('Instituicao'),
('Transparencia'),
('BalanceteCFOAB'),
('PagamentoCotas'),
('PrestacaoContasSubseccional'),
('BaseOrcamentaria'),
('Usuarios'),
('Perfis');

CREATE TABLE Permissoes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Id_Perfil INT NOT NULL,
    Id_Modulo INT NOT NULL,
    P_Create BIT DEFAULT 0,
    P_Read   BIT DEFAULT 0,
    P_Update BIT DEFAULT 0,
    P_Delete BIT DEFAULT 0,
    FOREIGN KEY (Id_Perfil) REFERENCES Perfis(Id),
    FOREIGN KEY (Id_Modulo) REFERENCES Modulos(Id)
);

-- Perfil Admin
INSERT INTO Permissoes (Id_Perfil, Id_Modulo, P_Create, P_Read, P_Update, P_Delete) VALUES
(1, 1, 1, 1, 1, 1),
(1, 2, 1, 1, 1, 1),
(1, 3, 1, 1, 1, 1),
(1, 4, 1, 1, 1, 1),
(1, 5, 1, 1, 1, 1),
(1, 6, 1, 1, 1, 1),
(1, 7, 1, 1, 1, 1),
(1, 8, 1, 1, 1, 1),
(1, 9, 1, 1, 1, 1),
(1,10, 1, 1, 1, 1);
