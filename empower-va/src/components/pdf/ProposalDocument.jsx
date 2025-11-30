import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40 },
    header: { marginBottom: 30, borderBottom: '2px solid #1A565E', paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    logo: { width: 150, height: 'auto' },
    title: { fontSize: 24, color: '#1A565E', fontWeight: 'bold', textTransform: 'uppercase' },
    subtitle: { fontSize: 12, color: '#6FA388', marginTop: 5 },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 14, color: '#1A565E', fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: 5, marginBottom: 10 },
    label: { fontSize: 10, color: '#666', marginBottom: 4, textTransform: 'uppercase' },
    value: { fontSize: 12, color: '#000', marginBottom: 10, fontFamily: 'Helvetica-Bold' },
    bodyText: { fontSize: 11, lineHeight: 1.5, marginBottom: 8, color: '#333' },
    highlightBox: { backgroundColor: '#f0fdf4', padding: 15, borderRadius: 5, marginBottom: 15 },
    footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 10, textAlign: 'center', color: '#999', borderTop: '1px solid #eee', paddingTop: 10 }
});

export const ProposalDocument = ({ data, logoUrl }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Project Proposal</Text>
                    <Text style={styles.subtitle}>Prepared by Empower VA Services</Text>
                </View>
                {logoUrl && <Image style={styles.logo} src={logoUrl} />}
            </View>

            {/* Client & Project Info */}
            <View style={styles.section}>
                <Text style={styles.label}>Prepared For:</Text>
                <Text style={styles.value}>{data.clientName || "[Client Name]"}</Text>

                <Text style={styles.label}>Project Title:</Text>
                <Text style={styles.value}>{data.projectTitle || "[Project Title]"}</Text>
            </View>

            {/* Scope of Work */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Scope of Work</Text>
                <Text style={styles.bodyText}>
                    We are pleased to submit this proposal to support your business. Based on our discussions, the following objectives and deliverables have been identified:
                </Text>
                <View style={styles.highlightBox}>
                    <Text style={styles.bodyText}>{data.scope || "Detailed scope of work goes here..."}</Text>
                </View>
            </View>

            {/* Timeline */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Timeline</Text>
                <Text style={styles.bodyText}>{data.timeline || "Estimated timeline for project completion..."}</Text>
            </View>

            {/* Investment */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Investment</Text>
                <Text style={styles.bodyText}>The total investment for this project is:</Text>
                <Text style={{ fontSize: 18, color: '#1A565E', fontWeight: 'bold', marginTop: 5 }}>
                    {data.investment || "£0.00"}
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Empower VA Services | Operational Architecture | empowervaservices.co.uk</Text>
            </View>

        </Page>
    </Document>
);
