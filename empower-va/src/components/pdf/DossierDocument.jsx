import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40 },
    header: { marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1A565E', paddingBottom: 10 },
    logo: { width: 150, height: 'auto' },
    title: { fontSize: 24, color: '#1A565E', fontWeight: 'bold', textTransform: 'uppercase' },
    subtitle: { fontSize: 12, color: '#6FA388', marginTop: 5 },

    section: { marginBottom: 20, padding: 15, backgroundColor: '#f8fafc', borderRadius: 5 },
    sectionTitle: { fontSize: 14, color: '#1A565E', fontWeight: 'bold', marginBottom: 10, borderBottom: '1px solid #e2e8f0', paddingBottom: 5 },

    row: { flexDirection: 'row', marginBottom: 8 },
    label: { width: '30%', fontSize: 10, color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' },
    value: { width: '70%', fontSize: 11, color: '#334155' },

    footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 10, textAlign: 'center', color: '#999', borderTop: '1px solid #eee', paddingTop: 10 }
});

export const DossierDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Client Dossier</Text>
                    <Text style={styles.subtitle}>Confidential Client Profile</Text>
                </View>
                <Image style={styles.logo} src="/logo.png" />
            </View>

            {/* Core Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Core Identity</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Client Name:</Text>
                    <Text style={styles.value}>{data.clientName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Business Name:</Text>
                    <Text style={styles.value}>{data.businessName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{data.email}</Text>
                </View>
            </View>

            {/* Brand Identity */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Brand Identity</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Brand Colors:</Text>
                    <Text style={styles.value}>{data.brandColors}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Fonts:</Text>
                    <Text style={styles.value}>{data.fonts}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Tone of Voice:</Text>
                    <Text style={styles.value}>{data.toneOfVoice}</Text>
                </View>
            </View>

            {/* Access & Logistics */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Access & Logistics</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Communication:</Text>
                    <Text style={styles.value}>{data.communicationPref}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Key Tools:</Text>
                    <Text style={styles.value}>{data.tools}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Notes:</Text>
                    <Text style={styles.value}>{data.notes}</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Empower VA Services | Operational Architecture | empowervaservices.co.uk</Text>
            </View>

        </Page>
    </Document>
);
