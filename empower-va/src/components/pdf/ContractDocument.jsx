import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40 },
    header: { marginBottom: 20, borderBottom: '2px solid #1A565E', paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerLeft: { flexDirection: 'column' },
    logo: { width: 150, height: 'auto' }, // Adjust size as needed
    title: { fontSize: 24, color: '#1A565E', fontWeight: 'bold', textTransform: 'uppercase' },
    subtitle: { fontSize: 12, color: '#6FA388', marginTop: 5 },
    section: { margin: 10, padding: 10 },
    label: { fontSize: 10, color: '#666', marginBottom: 4, textTransform: 'uppercase' },
    value: { fontSize: 12, color: '#000', marginBottom: 15, fontFamily: 'Helvetica-Bold' },
    bodyText: { fontSize: 11, lineHeight: 1.5, marginBottom: 10, color: '#333' },
    footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 10, textAlign: 'center', color: '#999', borderTop: '1px solid #eee', paddingTop: 10 }
});

// The Component
export const ContractDocument = ({ data, logoUrl }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>Service Agreement</Text>
                    <Text style={styles.subtitle}>Empower VA Services</Text>
                </View>
                {logoUrl && <Image style={styles.logo} src={logoUrl} />}
            </View>

            {/* Preamble */}
            <View style={styles.section}>
                <Text style={styles.bodyText}>
                    This Service Agreement (the "Agreement") is entered into on this {new Date().getDate()} day of {new Date().toLocaleString('default', { month: 'long' })}, {new Date().getFullYear()} (the "Effective Date")
                </Text>
                <Text style={styles.bodyText}>
                    BETWEEN:
                </Text>
                <Text style={styles.bodyText}>
                    1. <Text style={{ fontFamily: 'Helvetica-Bold' }}>Empower VA Services</Text> (the "Service Provider"), a Virtual Assistant service operated by Nicola Berry,
                </Text>
                <Text style={styles.bodyText}>
                    AND
                </Text>
                <Text style={styles.bodyText}>
                    2. <Text style={{ fontFamily: 'Helvetica-Bold' }}>{data.clientName || "[Client Name]"}</Text> (the "Client").
                </Text>
                <Text style={styles.bodyText}>
                    (Hereinafter collectively referred to as the "Parties" or individually as a "Party").
                </Text>
            </View>

            {/* Recitals */}
            <View style={styles.section}>
                <Text style={styles.label}>WHEREAS:</Text>
                <Text style={styles.bodyText}>
                    ● The Service Provider offers virtual administrative, operational, marketing, and digital support services.
                </Text>
                <Text style={styles.bodyText}>
                    ● The Client desires to engage the Service Provider to perform certain services as described herein.
                </Text>
                <Text style={styles.bodyText}>
                    ● The Parties desire to enter into this Agreement to set forth the terms and conditions under which the Service Provider will render such services to the Client.
                </Text>
            </View>

            {/* 1. Engagement */}
            <View style={styles.section}>
                <Text style={styles.value}>1. Engagement of Services</Text>
                <Text style={styles.bodyText}>
                    The Client hereby engages the Service Provider, and the Service Provider hereby agrees to perform the services detailed in Section 2 of this Agreement (the "Services"), in accordance with the terms and conditions set forth herein.
                </Text>
            </View>

            {/* 2. Scope */}
            <View style={styles.section}>
                <Text style={styles.value}>2. Scope of Services</Text>
                <Text style={styles.bodyText}>
                    The Service Provider shall provide the following specific services to the Client:
                </Text>
                <Text style={{ ...styles.bodyText, fontFamily: 'Helvetica-Oblique', marginLeft: 10 }}>
                    {data.scope || "[Detailed Scope of Services to be inserted here]"}
                </Text>
                <Text style={styles.bodyText}>
                    Any additional services requested by the Client outside of this defined scope will be subject to a separate agreement or amendment to this Agreement and may incur additional fees.
                </Text>
            </View>

            {/* 3. Term */}
            <View style={styles.section}>
                <Text style={styles.value}>3. Term of Agreement</Text>
                <Text style={styles.bodyText}>
                    This Agreement shall commence on the Effective Date and shall continue until the completion of the Services or as otherwise agreed.
                </Text>
            </View>

            {/* 4. Fees */}
            <View style={styles.section}>
                <Text style={styles.value}>4. Fees & Payment</Text>
                <Text style={styles.bodyText}>
                    4.1. Fees: The Client agrees to pay the Service Provider the following fees for the Services:
                </Text>
                <Text style={{ ...styles.bodyText, fontFamily: 'Helvetica-Bold' }}>
                    Total Investment: {data.amount || "£0.00"}
                </Text>
                <Text style={styles.bodyText}>
                    (Rate: {data.rate ? `£${data.rate}/hr` : 'N/A'}, Qty: {data.qty || '1'})
                </Text>
                <Text style={styles.bodyText}>
                    4.2. Invoices: Invoices will be issued upon completion for project work or monthly for retainer work.
                </Text>
                <Text style={styles.bodyText}>
                    4.3. Late Payments: Payments not received by the due date may incur a late payment fee.
                </Text>
            </View>

            {/* 5-11. General Terms (Condensed for space, full text available) */}
            <View style={styles.section}>
                <Text style={styles.value}>5. General Terms</Text>
                <Text style={styles.bodyText}>
                    5.1. <Text style={{ fontFamily: 'Helvetica-Bold' }}>Client Responsibilities:</Text> Provide necessary info/access and timely feedback.
                </Text>
                <Text style={styles.bodyText}>
                    5.2. <Text style={{ fontFamily: 'Helvetica-Bold' }}>Independent Contractor:</Text> The Service Provider is an independent contractor, not an employee.
                </Text>
                <Text style={styles.bodyText}>
                    5.3. <Text style={{ fontFamily: 'Helvetica-Bold' }}>Confidentiality:</Text> Both parties agree to keep non-public info private.
                </Text>
                <Text style={styles.bodyText}>
                    5.4. <Text style={{ fontFamily: 'Helvetica-Bold' }}>GDPR:</Text> Both parties shall comply with data protection laws.
                </Text>
                <Text style={styles.bodyText}>
                    5.5. <Text style={{ fontFamily: 'Helvetica-Bold' }}>Intellectual Property:</Text> Rights transfer to Client upon full payment, unless otherwise agreed.
                </Text>
                <Text style={styles.bodyText}>
                    5.6. <Text style={{ fontFamily: 'Helvetica-Bold' }}>Termination:</Text> Either party may terminate with written notice (e.g. 30 days).
                </Text>
            </View>

            {/* Signatures */}
            <View style={{ ...styles.section, marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '45%' }}>
                    <Text style={styles.label}>FOR THE SERVICE PROVIDER:</Text>
                    <View style={{ height: 40, borderBottom: '1px solid #000', marginBottom: 5 }} />
                    <Text style={styles.bodyText}>Nicola Berry</Text>
                    <Text style={styles.subtitle}>Empower VA Services</Text>
                </View>
                <View style={{ width: '45%' }}>
                    <Text style={styles.label}>FOR THE CLIENT:</Text>
                    <View style={{ height: 40, borderBottom: '1px solid #000', marginBottom: 5 }} />
                    <Text style={styles.bodyText}>{data.clientName || "[Client Name]"}</Text>
                    <Text style={styles.subtitle}>Authorized Signatory</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Empower VA Services | Operational Architecture | empowervaservices.co.uk</Text>
            </View>

        </Page>
    </Document>
);
