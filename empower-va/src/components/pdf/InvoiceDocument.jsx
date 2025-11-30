import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40 },
    header: { marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    logo: { width: 150, height: 'auto' },
    title: { fontSize: 32, color: '#1A565E', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'right' },
    invoiceDetails: { marginTop: 10, textAlign: 'right' },
    label: { fontSize: 10, color: '#666', marginBottom: 2, textTransform: 'uppercase' },
    value: { fontSize: 12, color: '#000', marginBottom: 8, fontFamily: 'Helvetica-Bold' },

    // Table
    table: { display: "table", width: "auto", borderStyle: "solid", borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 20 },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableHeader: { backgroundColor: '#f0fdf4', borderBottomColor: '#1A565E', borderBottomWidth: 1, alignItems: 'center', height: 24, fontStyle: 'bold', flexDirection: 'row' },
    colDesc: { width: '60%', paddingLeft: 5, fontSize: 10, paddingTop: 5 },
    colQty: { width: '10%', textAlign: 'center', fontSize: 10, paddingTop: 5 },
    colRate: { width: '15%', textAlign: 'right', fontSize: 10, paddingTop: 5 },
    colAmount: { width: '15%', textAlign: 'right', paddingRight: 5, fontSize: 10, paddingTop: 5 },

    rowText: { fontSize: 10, paddingTop: 5, paddingBottom: 5, color: '#333' },

    totalSection: { marginTop: 20, alignItems: 'flex-end' },
    totalLabel: { fontSize: 12, fontWeight: 'bold', color: '#666' },
    totalValue: { fontSize: 20, fontWeight: 'bold', color: '#1A565E' },

    bankDetails: { marginTop: 40, padding: 15, backgroundColor: '#f9fafb', borderRadius: 5 },
    bankTitle: { fontSize: 12, fontWeight: 'bold', color: '#1A565E', marginBottom: 5 },
    bankText: { fontSize: 10, color: '#555', marginBottom: 2 },

    footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 10, textAlign: 'center', color: '#999', borderTop: '1px solid #eee', paddingTop: 10 }
});

export const InvoiceDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <Image style={styles.logo} src="/logo.png" />
                <View>
                    <Text style={styles.title}>INVOICE</Text>
                    <View style={styles.invoiceDetails}>
                        <Text style={styles.label}>Invoice #</Text>
                        <Text style={styles.value}>{data.invoiceNumber || "001"}</Text>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
                    </View>
                </View>
            </View>

            {/* Bill To */}
            <View style={{ marginBottom: 30 }}>
                <Text style={styles.label}>Bill To:</Text>
                <Text style={styles.value}>{data.clientName || "[Client Name]"}</Text>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.colDesc}>DESCRIPTION</Text>
                <Text style={styles.colQty}>QTY</Text>
                <Text style={styles.colRate}>RATE</Text>
                <Text style={styles.colAmount}>AMOUNT</Text>
            </View>

            {/* Table Row (Single Item for MVP) */}
            <View style={styles.tableRow}>
                <Text style={{ ...styles.colDesc, ...styles.rowText }}>{data.description || "Service Rendered"}</Text>
                <Text style={{ ...styles.colQty, ...styles.rowText }}>{data.qty || "1"}</Text>
                <Text style={{ ...styles.colRate, ...styles.rowText }}>{data.rate || "0.00"}</Text>
                <Text style={{ ...styles.colAmount, ...styles.rowText }}>{data.amount || "0.00"}</Text>
            </View>

            {/* Total */}
            <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>TOTAL</Text>
                <Text style={styles.totalValue}>{data.amount || "£0.00"}</Text>
            </View>

            {/* Bank Details */}
            <View style={styles.bankDetails}>
                <Text style={styles.bankTitle}>Payment Details</Text>
                <Text style={styles.bankText}>Bank: Starling Bank</Text>
                <Text style={styles.bankText}>Account Name: Nicola Berry</Text>
                <Text style={styles.bankText}>Sort Code: XX-XX-XX</Text>
                <Text style={styles.bankText}>Account No: XXXXXXXX</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Thank you for your business! | Empower VA Services</Text>
            </View>

        </Page>
    </Document>
);
