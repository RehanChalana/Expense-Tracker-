
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
   

    # Add a title
    # c.drawString(100, 750, "Expense Report")
    

    # Add expenses to the PDF
    y=750
    c.setFont("Helvetica",25)
    
    c.drawString(230,800,f"Expense Report!")
    
    c.drawString(90,750,f"Title")
    c.drawString(240,750,f"Amount")
    c.drawString(340,750,f"Date")
    c.drawString(440,750,f"Category")
    c.setFont("Helvetica", 12)
    
    y_position = 730  # Initial Y position for expenses
    # x=100
    for i in data:
        Title = i["Title"]
        amount = i["Amount"]
        Date = i["Date"]
        category = i["category"]
        # Add expense details to the PDF
        c.drawString(100,y_position, f"{Title}")
        c.drawString(250,y_position,f"{amount}")
        c.drawString(350,y_position,f"{Date}")
        c.drawString(450,y_position,f"{category}")
        y_position -= 20  # Move to the next line
        # x+=10

    # Add total
    # total = data.get('total', 0)
    # c.drawString(100, y_position, f"Total: ${total}")

    # Save the PDF
    c.save()

    return pdf_filename

@app.route('/generate_pdf', methods=['POST'])
def generate_pdf_endpoint():
    data = request.get_json()  # Retrieve JSON data from the request
    file = generate_pdf(data)
    return send_file(file, as_attachment=True)

if __name__ == '__main__':
    app.run(port=5000)