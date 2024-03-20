import { Injectable } from '@angular/core';

const subjects: any = {
  math: {
    'it-IT': 'Matematica',
    'en': 'Math',
  },
  ict: {
    'it-IT': 'Informatica',
    'en': 'ICT',
  },
  economy: {
    'it-IT': 'Economia',
    'en': 'Economy',
  },
  italian_literature: {
    'it-IT': 'Letteratura italiana',
    'en': 'Italian literature',
  },
  italian_grammar: {
    'it-IT': 'Grammatica italiana',
    'en': 'Italian grammar',
  },
  english_grammar: {
    'it-IT': 'Grammatica inglese',
    'en': 'English grammar',
  },
  english_literature: {
    'it-IT': 'Letteratura inglese',
    'en': 'English literature',
  },
  history: {
    'it-IT': 'Storia',
    'en': 'History',
  },
  chemistry: {
    'it-IT': 'Chimica',
    'en': 'Chemistry',
  },
  physics: {
    'it-IT': 'Fisica',
    'en': 'Physics',
  },
  science: {
    'it-IT': 'Scienze',
    'en': 'Science',
  },
  biology: {
    'it-IT': 'Biologia',
    'en': 'Biology',
  },
  law: {
    'it-IT': 'Diritto',
    'en': 'Law',
  },
};

const schools: any = {
  high_school: {
    'it-IT': 'Scuola superiore',
    'en': 'High school',
  },
  middle_school: {
    'it-IT': 'Scuola media',
    'en': 'Middle school',
  },
  elementary_school: {
    'it-IT': 'Scuola elementare',
    english: 'Elementary school',
  },
  university: {
    'it-IT': 'Università',
    english: 'University',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  constructor() {}
  public translateSubject(sub: string): string {
    if (subjects[sub]) return subjects[sub][navigator.language];
    return 'no such subject';
  }
  public translateSchool(school: string): string {
    if (schools[school]) return schools[school][navigator.language];
    return 'no such school';
  }
}
