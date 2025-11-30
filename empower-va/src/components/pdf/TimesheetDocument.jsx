import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40 },
    header: { marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1A565E', paddingBottom: 10 },
    logo: { width: 150, height: 'auto' },
    title: { fontSize: 24, color: '#1A565E', fontWeight: 'bold', textTransform: 'uppercase' },
    subtitle: { fontSize: 12, color: '#6FA388', marginTop: 5 },

    infoSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    label: { fontSize: 10, color: '#666', marginBottom: 2, textTransform: 'uppercase' },
    value: { fontSize: 12, color: '#000', fontFamily: 'Helvetica-Bold' },

    // Table
    table: { display: "table", width: "auto", borderStyle: "solid", borderBottomWidth: 1, borderBottomColor: '#eee', marginTop: 20 },
    tableRow: { margin: "auto", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: '#f0f0f0', minHeight: 30, alignItems: 'center' },
    tableHeader: { backgroundColor: '#f0fdf4', borderBottomColor: '#1A565E', borderBottomWidth: 1, alignItems: 'center', height: 24, fontStyle: 'bold', flexDirection: 'row' },

    colDate: { width: '20%', paddingLeft: 5, fontSize: 10 },
    colDesc: { width: '60%', fontSize: 10 },
    colDuration: { width: '20%', textAlign: 'right', paddingRight: 5, fontSize: 10 },

    totalSection: { marginTop: 20, alignItems: 'flex-end' },
    totalLabel: { fontSize: 12, fontWeight: 'bold', color: '#666' },
    totalValue: { fontSize: 20, fontWeight: 'bold', color: '#1A565E' },

    footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 10, textAlign: 'center', color: '#999', borderTop: '1px solid #eee', paddingTop: 10 }
});

export const TimesheetDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Timesheet</Text>
                    <Text style={styles.subtitle}>Empower VA Services</Text>
                </View>
                <Image style={styles.logo} src="/logo.png" />
            </View>

            {/* Info */}
            <View style={styles.infoSection}>
                <View>
                    <Text style={styles.label}>Client:</Text>
                    <Text style={styles.value}>{data.clientName || "Client Name"}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Week Ending:</Text>
                    <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
                </View>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.colDate}>DATE</Text>
                <Text style={styles.colDesc}>TASK DESCRIPTION</Text>
                <Text style={styles.colDuration}>DURATION</Text>
            </View>

            {/* Rows */}
            {data.entries && data.entries.map((entry, index) => (
                <View key={index} style={styles.tableRow}>
                    <Text style={styles.colDate}>{entry.date}</Text>
                    <Text style={styles.colDesc}>{entry.description}</Text>
                    <Text style={styles.colDuration}>{entry.duration}</Text>
                </View>
            ))}

            {/* Total */}
            <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>TOTAL HOURS</Text>
                <Text style={styles.totalValue}>{data.totalHours || "0:00"}</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Empower VA Services | Operational Architecture | empowervaservices.co.uk</Text>
            </View>

        </Page>
    </Document>
);
