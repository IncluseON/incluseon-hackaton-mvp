from pathlib import Path

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)


def generate_case_study_pdf(

    student_name: str,

    report_content: str,

    task_id: str
):

    # =====================================
    # CREATE DIRECTORY
    # =====================================

    Path("generated_reports").mkdir(
        exist_ok=True
    )

    # =====================================
    # FILE PATH
    # =====================================

    pdf_path = (
        f"generated_reports/"
        f"{task_id}.pdf"
    )

    # =====================================
    # PDF CONFIG
    # =====================================

    doc = SimpleDocTemplate(
        pdf_path
    )

    styles = getSampleStyleSheet()

    elements = []

    # =====================================
    # TITLE
    # =====================================

    title = Paragraph(
        f"""
        Estudo de Caso Clínico
        <br/>
        Aluno: {student_name}
        """,

        styles["Title"]
    )

    elements.append(title)

    elements.append(
        Spacer(1, 20)
    )

    # =====================================
    # REPORT CONTENT
    # =====================================

    content = Paragraph(
        report_content.replace(
            "\n",
            "<br/>"
        ),

        styles["BodyText"]
    )

    elements.append(content)

    # =====================================
    # BUILD PDF
    # =====================================

    doc.build(elements)

    return pdf_path