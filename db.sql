-- Descrição: Script para criação do banco de dados DM_TI_FINANCEIRO e suas tabelas.
-- Verifica se o banco de dados já existe e o exclui
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'DM_TI_FINANCEIRO')
BEGIN
    DROP DATABASE DM_TI_FINANCEIRO;
END
GO

-- Cria o banco de dados DM_TI_FINANCEIRO
CREATE DATABASE DM_TI_FINANCEIRO;
GO

-- Tabela TipoDesconto
CREATE TABLE TipoDesconto (
    Id INT IDENTITY(1,1),
    Nome VARCHAR(100) NOT NULL,
    CONSTRAINT Pk_Id_TipoDesconto PRIMARY KEY (Id)
);
GO

-- Tabela Transparencia
CREATE TABLE Transparencia (
    Id INT IDENTITY(1,1),
    Demonstracao VARCHAR(80) NOT NULL,
    Referencia VARCHAR(80) NOT NULL,
    Ano VARCHAR(4) NOT NULL,
    Periodicidade VARCHAR(80) NOT NULL,
    DtPrevEntr DATE NOT NULL,
    DtEntrega DATE,
    Id_usuario INT NOT NULL,
    CONSTRAINT Pk_Id_Transparencia PRIMARY KEY (Id)
);
GO

-- Tabela Subseccional
CREATE TABLE Subseccional (
    Id INT,
    SubSeccional VARCHAR(100) NOT NULL,
    Id_usuario INT NOT NULL,
    CONSTRAINT Pk_Id_Subseccional PRIMARY KEY (Id)
);
GO

-- Tabela BalanceteCFOAB
CREATE TABLE BalanceteCFOAB (
    Id INT IDENTITY(1,1),
    Demonstracao VARCHAR(80) NOT NULL,
    Referencia VARCHAR(80) NOT NULL,
    Ano VARCHAR(4) NOT NULL,
    Periodicidade VARCHAR(80) NOT NULL,
    DtPrevEntr DATE NOT NULL,
    DtEntrega DATE,
    Id_usuario INT NOT NULL,
    CONSTRAINT Pk_Id_BalancCFOAB PRIMARY KEY (Id)
);
GO

-- Tabela PagamentoCotas
CREATE TABLE PagamentoCotas (
    Id INT IDENTITY(1,1),
    Instituicao VARCHAR(100) NOT NULL,
    MesReferencia VARCHAR(10) NOT NULL,
    Ano VARCHAR(4) NOT NULL,
    ValorDevido DECIMAL(15,2),
    DtPrevEntr DATE NOT NULL,
    ValorPago DECIMAL(15,2),
    DtPagto DATE,
    Observacao VARCHAR(255),
    Id_usuario INT NOT NULL,
    CONSTRAINT Pk_Id_PagtoCotas PRIMARY KEY (Id)
);
GO

-- Tabela PrestacaoContasSubseccional
CREATE TABLE PrestacaoContasSubseccional (
    Id INT IDENTITY(1,1),
    Id_Subseccional INT NOT NULL,
    MesReferencia VARCHAR(10) NOT NULL,
    Ano VARCHAR(4) NOT NULL,
    DtPrevEntr DATE NOT NULL,
    DtEntrega DATE,
    DtPagto DATE,
    ValorDesconto DECIMAL(15,2),
    ValorDuodecimo DECIMAL(15,2),
    ValorPago AS (ValorDuodecimo - ValorDesconto) PERSISTED,
    Observacao VARCHAR(255),
    Status VARCHAR(1),
    ProtocoloSGD VARCHAR(17),
    Id_TipoDesconto INT,
    Id_usuario INT NOT NULL,
    CONSTRAINT Pk_Id_PrestContasSub PRIMARY KEY (Id),
    CONSTRAINT FK_Id_Subseccional FOREIGN KEY (Id_Subseccional) REFERENCES Subseccional (Id),
    CONSTRAINT FK_Id_TipoDesconto FOREIGN KEY (Id_TipoDesconto) REFERENCES TipoDesconto (Id)
);
GO

SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';
GO
