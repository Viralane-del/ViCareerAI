import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const results: any = {
            experience: [],
            education: [],
            skills: []
        };

        for (const [key, value] of formData.entries()) {
            if (value instanceof File && value.name.endsWith('.csv')) {
                const text = await value.text();
                const records: Record<string, string>[] = parse(text, {
                    columns: true,
                    skip_empty_lines: true,
                    trim: true
                });

                if (records.length === 0) continue;

                const headers = Object.keys(records[0]);

                if (headers.includes('Company Name') && headers.includes('Title')) {
                    // Positions.csv
                    results.experience = records.map((record: any) => ({
                        id: crypto.randomUUID(),
                        title: record['Title'],
                        company: record['Company Name'],
                        location: record['Location'] || '',
                        startDate: record['Started On'] || '',
                        endDate: record['Finished On'] || '',
                        isCurrent: !record['Finished On'],
                        description: record['Description'] || ''
                    }));
                } 
                else if (headers.includes('School Name') && headers.includes('Degree Name')) {
                    // Education.csv
                    results.education = records.map((record: any) => ({
                        id: crypto.randomUUID(),
                        degree: record['Degree Name'] || 'Derece Belirtilmemiş',
                        school: record['School Name'],
                        startDate: record['Started On'] || '',
                        endDate: record['Finished On'] || '',
                        description: record['Notes'] || ''
                    }));
                }
                else if (headers.includes('Name')) {
                    // Skills.csv
                    results.skills = records.map((record: any) => ({
                        id: crypto.randomUUID(),
                        name: record['Name']
                    }));
                }
            }
        }

        return NextResponse.json(results);
    } catch (error: any) {
        console.error("LinkedIn CSV Import Error:", error);
        return NextResponse.json({ error: "Dosya okuma veya ayrıştırma hatası: " + error.message }, { status: 500 });
    }
}
