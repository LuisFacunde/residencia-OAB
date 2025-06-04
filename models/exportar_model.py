from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from datetime import datetime

def gerar_relatorio_associados_pdf(dados, usuario, caminho_saida):
    c = canvas.Canvas(caminho_saida, pagesize=A4)
    largura, altura = A4

    c.setFont("Helvetica-Bold", 14)
    c.drawString(5 * cm, altura - 2 * cm, "Ordem dos Advogados do Brasil")
    c.setFont("Helvetica", 12)
    c.drawString(6.5 * cm, altura - 2.8 * cm, "Lista de Associados")
    c.setFont("Helvetica", 10)
    c.drawString(7 * cm, altura - 3.5 * cm, "Seccional")

    data_hora = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    c.setFont("Helvetica", 8)
    c.drawString(1.5 * cm, altura - 4.2 * cm, f"Emitido por: {usuario}")
    c.drawString(1.5 * cm, altura - 4.6 * cm, f"Data/Hora: {data_hora}")

    colunas = ["OAB", "NomeAssoc", "DtCompromisso", "CategoriaInscricao", "TempoInsc"]
    x_inicial = 1.5 * cm
    y = altura - 5.5 * cm
    c.setFont("Helvetica-Bold", 10)
    for i, col in enumerate(colunas):
        c.drawString(x_inicial + i * 4 * cm, y, col)

    y -= 0.7 * cm
    c.setFont("Helvetica", 9)
    for linha in dados:
        for i, valor in enumerate(linha):
            c.drawString(x_inicial + i * 4 * cm, y, str(valor))
        y -= 0.5 * cm
        if y < 3 * cm:
            c.showPage()
            y = altura - 3 * cm

    c.setFont("Helvetica-Bold", 10)
    c.drawString(1.5 * cm, y - 0.5 * cm, f"Total de associados: {len(dados)}")

    c.setFont("Helvetica-Oblique", 7)
    c.drawString(1.5 * cm, 1.5 * cm, "CONFIDENCIAL")
    c.drawString(1.5 * cm, 1.1 * cm, "Dados para fins exclusivos e estritamente institucionais, de acordo com Art. 7º da Lei 13.709 (LGPD)")

    c.save()
