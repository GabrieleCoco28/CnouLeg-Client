import { Injectable } from '@angular/core';

const subjects: any = {
  math: {
    italian: 'Matematica',
    english: 'Math',
  },
  ict: {
    italian: 'Informatica',
    english: 'ICT',
  },
  economy: {
    italian: 'Economia',
    english: 'Economy',
  },
  italian_literature: {
    italian: 'Letteratura italiana',
    english: 'Italian literature',
  },
  italian_grammar: {
    italian: 'Grammatica italiana',
    english: 'Italian grammar',
  },
  english_grammar: {
    italian: 'Grammatica inglese',
    english: 'English grammar',
  },
  english_literature: {
    italian: 'Letteratura inglese',
    english: 'English literature',
  },
  history: {
    italian: 'Storia',
    english: 'History',
  },
  chemistry: {
    italian: 'Chimica',
    english: 'Chemistry',
  },
  physics: {
    italian: 'Fisica',
    english: 'Physics',
  },
  science: {
    italian: 'Scienze',
    english: 'Science',
  },
  biology: {
    italian: 'Biologia',
    english: 'Biology',
  },
  law: {
    italian: 'Diritto',
    english: 'Law',
  },
};

const schools: any = {
  high_school: {
    italian: 'Scuola superiore',
    english: 'High school',
  },
  middle_school: {
    italian: 'Scuola media',
    english: 'Middle school',
  },
  elementary_school: {
    italian: 'Scuola elementare',
    english: 'Elementary school',
  },
  university: {
    italian: 'Università',
    english: 'University',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  constructor() {}
  public translateSubject(sub: string, lang: string): string {
    if (subjects[sub]) return subjects[sub][lang];
    return 'no such subject';
  }
  public translateSchool(school: string, lang: string): string {
    if (schools[school]) return schools[school][lang];
    return 'no such school';
  }
}
