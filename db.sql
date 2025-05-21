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

CREATE TABLE Perfis (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO Perfis (Nome) VALUES 
('Admin'),
('Leitura'),
('Escrita'),
('Auditoria');

CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    NomeUsuario VARCHAR(100), 
    Email VARCHAR(100) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Id_Perfil INT NOT NULL,
    Status CHAR(1) DEFAULT 'A',
    CONSTRAINT FK_Id_Perfil FOREIGN KEY (Id_Perfil) REFERENCES Perfis(Id),
    CONSTRAINT UQ_NomeUsuario UNIQUE (NomeUsuario) 
);

CREATE TABLE Permissoes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Id_Perfil INT NOT NULL,
    Modulo VARCHAR(50) NOT NULL,        
    P_Create BIT DEFAULT 0,           
    P_Read BIT DEFAULT 0,           
    P_Update BIT DEFAULT 0,          
    P_Delete BIT DEFAULT 0,         
    CONSTRAINT FK_Permissao_Perfil FOREIGN KEY (Id_Perfil) REFERENCES Perfis(Id)
);

INSERT INTO Permissoes (Id_Perfil, Modulo, P_Create, P_Read, P_Update, P_Delete)
VALUES 
(1, 'Subseccional', 1, 1, 1, 1),
(1, 'Demonstrativo', 1, 1, 1, 1),
(1, 'Instituicao', 1, 1, 1, 1),
(1, 'Transparencia', 1, 1, 1, 1),
(1, 'BalanceteCFOAB', 1, 1, 1, 1),
(1, 'PagamentoCotas', 1, 1, 1, 1),
(1, 'PrestacaoContasSubseccional', 1, 1, 1, 1),
(1, 'BaseOrcamentaria', 1, 1, 1, 1),
(1, 'Usuarios', 1, 1, 1, 1);

INSERT INTO Permissoes (Id_Perfil, Modulo, P_Create, P_Read, P_Update, P_Delete)
VALUES 
(2, 'Subseccional', 0, 1, 0, 0),
(2, 'Demonstrativo', 0, 1, 0, 0),
(2, 'Instituicao', 0, 1, 0, 0),
(2, 'Transparencia', 0, 1, 0, 0),
(2, 'BalanceteCFOAB', 0, 1, 0, 0),
(2, 'PagamentoCotas', 0, 1, 0, 0),
(2, 'PrestacaoContasSubseccional', 0, 1, 0, 0),
(2, 'BaseOrcamentaria', 0, 1, 0, 0),
(2, 'Usuarios', 0, 1, 0, 0);

INSERT INTO Permissoes (Id_Perfil, Modulo, P_Create, P_Read, P_Update, P_Delete)
VALUES 
(3, 'Subseccional', 1, 1, 1, 0),
(3, 'Demonstrativo', 1, 1, 1, 0),
(3, 'Instituicao', 1, 1, 1, 0),
(3, 'Transparencia', 1, 1, 1, 0),
(3, 'BalanceteCFOAB', 1, 1, 1, 0),
(3, 'PagamentoCotas', 1, 1, 1, 0),
(3, 'PrestacaoContasSubseccional', 1, 1, 1, 0),
(3, 'BaseOrcamentaria', 1, 1, 1, 0),
(3, 'Usuarios', 1, 1, 1, 0);

INSERT INTO Permissoes (Id_Perfil, Modulo, P_Create, P_Read, P_Update, P_Delete)
VALUES 
(4, 'Subseccional', 0, 1, 0, 0),
(4, 'Demonstrativo', 0, 1, 0, 0),
(4, 'Instituicao', 0, 1, 0, 0),
(4, 'Transparencia', 0, 1, 0, 0),
(4, 'BalanceteCFOAB', 0, 1, 0, 0),
(4, 'PagamentoCotas', 0, 1, 0, 0),
(4, 'PrestacaoContasSubseccional', 0, 1, 0, 0),
(4, 'BaseOrcamentaria', 0, 1, 0, 0),
(4, 'Usuarios', 0, 1, 0, 0);
