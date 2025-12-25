import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

interface PDFOptions {
    title: string;
    subtitle?: string;
    headers: string[];
    rows: RowInput[];
    filename?: string;
}

export const generatePDF = ({
    title,
    subtitle,
    headers,
    rows,
    filename = "document.pdf",
}: PDFOptions) => {
    const doc = new jsPDF();

    // Judul
    doc.setFontSize(16);
    doc.text(title, 14, 15);

    // Subjudul / Tanggal
    doc.setFontSize(10);
    const sub = subtitle || `Dicetak pada: ${new Date().toLocaleString()}`;
    doc.text(sub, 14, 22);

    autoTable(doc, {
        startY: 28,
        head: [headers],
        body: rows,
        theme: "striped",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [0, 0, 0] },
    });

    doc.save(filename);
};
