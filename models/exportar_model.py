from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO

def gerar_pdf_relatorio(nome_tabela, colunas, dados):
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, 800, f"Relatório: {nome_tabela}")
    pdf.setFont("Helvetica", 10)
    pdf.drawString(50, 785, "Gerado automaticamente pelo sistema")

    y = 750
    pdf.setFont("Helvetica-Bold", 9)
    for i, col in enumerate(colunas):
        pdf.drawString(50 + i * 100, y, str(col))

    y -= 20
    pdf.setFont("Helvetica", 8)
    for linha in dados:
        for i, item in enumerate(linha):
            pdf.drawString(50 + i * 100, y, str(item))
        y -= 15
        if y < 50:
            pdf.showPage()
            y = 800

    pdf.save()
    buffer.seek(0)
    return buffer.getvalue()
