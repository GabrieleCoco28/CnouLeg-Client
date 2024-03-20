import { Injectable } from '@angular/core';

const subjects: any = {
  math: {
    'it-IT': 'Matematica',
    'en': 'Math',
    icon: 'calculate'
  },
  ict: {
    'it-IT': 'Informatica',
    'en': 'ICT',
    icon: 'terminal'
  },
  economy: {
    'it-IT': 'Economia',
    'en': 'Economy',
    icon: 'account_balance'
  },
  italian_literature: {
    'it-IT': 'Letteratura italiana',
    'en': 'Italian literature',
    icon: 'book_2'
  },
  italian_grammar: {
    'it-IT': 'Grammatica italiana',
    'en': 'Italian grammar',
    icon: 'dictionary'
  },
  english_grammar: {
    'it-IT': 'Grammatica inglese',
    'en': 'English grammar',
    icon: 'dictionary'
  },
  english_literature: {
    'it-IT': 'Letteratura inglese',
    'en': 'English literature',
    icon: 'book_2'
  },
  history: {
    'it-IT': 'Storia',
    'en': 'History',
    icon: 'history_edu'
  },
  chemistry: {
    'it-IT': 'Chimica',
    'en': 'Chemistry',
    icon: 'experiment'
  },
  physics: {
    'it-IT': 'Fisica',
    'en': 'Physics',
    icon: 'rocket_launch'
  },
  science: {
    'it-IT': 'Scienze',
    'en': 'Science',
    icon: 'biotech'
  },
  biology: {
    'it-IT': 'Biologia',
    'en': 'Biology',
    icon: 'genetics'
  },
  law: {
    'it-IT': 'Diritto',
    'en': 'Law',
    icon: 'gavel'
  },
  geography: {
    'it-IT': 'Geografia',
    'en': 'Geography',
    icon: 'globe'
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

  public getSubjectIcon(sub: string) {
    if (subjects[sub] && subjects[sub].icon) return subjects[sub].icon;
  }
}
