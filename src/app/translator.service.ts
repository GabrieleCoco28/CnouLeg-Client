import { Injectable } from '@angular/core';

const subjects: any = {
  math: {
    'it-IT': 'Matematica',
    it: 'Matematica',
    en: 'Math',
    icon: 'calculate',
  },
  ict: {
    'it-IT': 'Informatica',
    it: 'Informatica',
    en: 'ICT',
    icon: 'terminal',
  },
  economy: {
    'it-IT': 'Economia',
    it: 'Economia',
    en: 'Economy',
    icon: 'account_balance',
  },
  italian_literature: {
    'it-IT': 'Letteratura italiana',
    it: 'Letteratura italiana',
    en: 'Italian literature',
    icon: 'book_2',
  },
  italian_grammar: {
    'it-IT': 'Grammatica italiana',
    it: 'Grammatica italiana',
    en: 'Italian grammar',
    icon: 'dictionary',
  },
  english_grammar: {
    'it-IT': 'Grammatica inglese',
    it: 'Grammatica inglese',
    en: 'English grammar',
    icon: 'dictionary',
  },
  english_literature: {
    'it-IT': 'Letteratura inglese',
    it: 'Letteratura inglese',
    en: 'English literature',
    icon: 'book_2',
  },
  history: {
    'it-IT': 'Storia',
    it: 'Storia',
    en: 'History',
    icon: 'history_edu',
  },
  chemistry: {
    'it-IT': 'Chimica',
    it: 'Chimica',
    en: 'Chemistry',
    icon: 'experiment',
  },
  physics: {
    'it-IT': 'Fisica',
    it: 'Fisica',
    en: 'Physics',
    icon: 'rocket_launch',
  },
  science: {
    'it-IT': 'Scienze',
    it: 'Scienze',
    en: 'Science',
    icon: 'biotech',
  },
  biology: {
    'it-IT': 'Biologia',
    it: 'Biologia',
    en: 'Biology',
    icon: 'genetics',
  },
  law: {
    'it-IT': 'Diritto',
    it: 'Diritto',
    en: 'Law',
    icon: 'gavel',
  },
  geography: {
    'it-IT': 'Geografia',
    it: 'Geografia',
    en: 'Geography',
    icon: 'globe',
  },
};

const schools: any = {
  high_school: {
    'it-IT': 'Scuola superiore',
    it: 'Scuola superiore',
    en: 'High school',
  },
  middle_school: {
    'it-IT': 'Scuola media',
    it: 'Scuola media',
    en: 'Middle school',
  },
  elementary_school: {
    'it-IT': 'Scuola elementare',
    it: 'Scuola elementare',
    en: 'Elementary school',
  },
  university: {
    'it-IT': 'Università',
    it: 'Università',
    en: 'University',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  public labels: any = {
    by: {
      'it-IT': 'Di',
      it: 'Di',
      en: 'By',
    },
    comment: {
      'it-IT': 'Commenta',
      it: 'Commenta',
      en: 'Comment',
    },
    comments: {
      'it-IT': 'Commenti',
      it: 'Commenti',
      en: 'Comments',
    },
    rateThisNote: {
      'it-IT': 'Valuta questo appunto',
      it: 'Valuta questo appunto',
      en: 'Rate this note',
    },
    answer: {
      'it-IT': 'Rispondi',
      it: 'Rispondi',
      en: 'Answer',
    },
    answerSingular: {
      'it-IT': 'Risposta',
      it: 'Risposta',
      en: 'Answer',
    },
    answerPlural: {
      'it-IT': 'Risposte',
      it: 'Risposte',
      en: 'Answers',
    },
    cancel: {
      'it-IT': 'Annulla',
      it: 'Annulla',
      en: 'Cancel',
    },
    leaveAComment: {
      'it-IT': 'Lascia un commento',
      it: 'Lascia un commento',
      en: 'Leave a comment',
    },
    answerTheComment: {
      'it-IT': 'Rispondi al commento',
      it: 'Rispondi al commento',
      en: 'Answer the comment',
    },
    images: {
      'it-IT': 'Immagini',
      it: 'Immagini',
      en: 'Images',
    },
    videos: {
      'it-IT': 'Video',
      it: 'Video',
      en: 'Videos',
    },
    documents: {
      'it-IT': 'Documenti',
      it: 'Documenti',
      en: 'Documents',
    }
  };
  constructor() {}
  public translateSubject(sub: string): string {
    if (subjects[sub]) return subjects[sub][navigator.language];
    return 'no such subject';
  }
  public translateClass(school: string): string {
    if (schools[school]) return schools[school][navigator.language];
    return 'no such school';
  }
  public getSubjectIcon(sub: string) {
    if (subjects[sub] && subjects[sub].icon) return subjects[sub].icon;
  }
  public getLanguage() {
    return navigator.language;
  }
}
