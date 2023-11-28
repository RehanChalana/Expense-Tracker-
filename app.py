from flask import Flask, request, send_file
from flask_cors import CORS
import json
from reportlab.pdfgen import canvas

app = Flask(__name__)
CORS(app)

def generate_pdf(data):
    # Your PDF generation logic here...
    # Create a PDF document
    pdf_filename = "expense_report.pdf"
    c = canvas.Canvas(pdf_filename)

    # Set font and font size
    c.setFont("Helvetica", 12)

    # Add a title
    c.drawString(100, 750, "Expense Report")

    # Add expenses to the PDF
    y_position = 730  # Initial Y position for expenses
    for i in range(len(data)):
        # Add expense details to the PDF
        temp = data
        c.drawString(100, y_position, data[i])
        y_position -= 20  # Move to the next line

    # Add total
    # c.drawString(100, y_position, f"Total: ${total}")

    # Save the PDF
    c.save()

    return pdf_filename

@app.route('/generate_pdf', methods=['POST'])
def generate_pdf_endpoint():
    data = request.get_json()  # Retrieve JSON data from the request
    generate_pdf(data)
    return send_file("expense_report.pdf", as_attachment=True)

if __name__ == '__main__':
    app.run(port=5000)
