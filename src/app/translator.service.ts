import { Injectable } from '@angular/core';

const subjects: any = {
  math: {
    it: 'Matematica',
    en: 'Math',
    icon: 'calculate',
  },
  ict: {
    it: 'Informatica',
    en: 'ICT',
    icon: 'terminal',
  },
  economy: {
    it: 'Economia',
    en: 'Economy',
    icon: 'account_balance',
  },
  italian_literature: {
    it: 'Letteratura italiana',
    en: 'Italian literature',
    icon: 'book_2',
  },
  italian_grammar: {
    it: 'Grammatica italiana',
    en: 'Italian grammar',
    icon: 'dictionary',
  },
  english_grammar: {
    it: 'Grammatica inglese',
    en: 'English grammar',
    icon: 'dictionary',
  },
  english_literature: {
    it: 'Letteratura inglese',
    en: 'English literature',
    icon: 'book_2',
  },
  history: {
    it: 'Storia',
    en: 'History',
    icon: 'history_edu',
  },
  chemistry: {
    it: 'Chimica',
    en: 'Chemistry',
    icon: 'experiment',
  },
  physics: {
    it: 'Fisica',
    en: 'Physics',
    icon: 'rocket_launch',
  },
  science: {
    it: 'Scienze',
    en: 'Science',
    icon: 'biotech',
  },
  biology: {
    it: 'Biologia',
    en: 'Biology',
    icon: 'genetics',
  },
  law: {
    it: 'Diritto',
    en: 'Law',
    icon: 'gavel',
  },
  geography: {
    it: 'Geografia',
    en: 'Geography',
    icon: 'globe',
  },
};

const schools: any = {
  high_school: {
    it: 'Scuola superiore',
    en: 'High school',
  },
  middle_school: {
    it: 'Scuola media',
    en: 'Middle school',
  },
  elementary_school: {
    it: 'Scuola elementare',
    en: 'Elementary school',
  },
  university: {
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
      it: 'Di',
      en: 'By',
    },
    comment: {
      it: 'Commenta',
      en: 'Comment',
    },
    comments: {
      it: 'Commenti',
      en: 'Comments',
    },
    rateThisNote: {
      it: 'Valuta questo appunto',
      en: 'Rate this note',
    },
    answer: {
      it: 'Rispondi',
      en: 'Answer',
    },
    answerSingular: {
      it: 'Risposta',
      en: 'Answer',
    },
    answerPlural: {
      it: 'Risposte',
      en: 'Answers',
    },
    cancel: {
      it: 'Annulla',
      en: 'Cancel',
    },
    leaveAComment: {
      it: 'Lascia un commento',
      en: 'Leave a comment',
    },
    answerTheComment: {
      it: 'Rispondi al commento',
      en: 'Answer the comment',
    },
    images: {
      it: 'Immagini',
      en: 'Images',
    },
    videos: {
      it: 'Video',
      en: 'Videos',
    },
    documents: {
      it: 'Documenti',
      en: 'Documents',
    },
    login: {
      it: 'Accedi',
      en: 'Login',
    },
    register: {
      it: 'Registrati',
      en: 'Sign up',
    },
    emailRequired: {
      it: 'Inserisci un indirizzo email',
      en: 'Enter an email address',
    },
    invaildEmail: {
      it: 'Indirizzo email non valido',
      en: 'Invalid email address',
    },
    passwordRequired: {
      it: 'Inserisci una password',
      en: 'Enter a password',
    },
    usernameRequired: {
      it: 'Inserisci uno username',
      en: 'Enter a username',
    },
    birthRequired: {
      it: 'Inserisci la tua data di nascita',
      en: 'Enter your date of birth',
    },
    genderRequired: {
      it: 'Inserisci il tuo genere',
      en: 'Enter your gender',
    },
    birthDate: {
      it: 'Data di nascita',
      en: 'Birth date',
    },
    birthDateAndGender: {
      it: 'Data di nascita e genere',
      en: 'Birth date and gender',
    },
    gender: {
      it: 'Genere',
      en: 'Gender',
    },
    male: {
      it: 'Uomo',
      en: 'Male',
    },
    female: {
      it: 'Donna',
      en: 'Female',
    },
    genderNotSpecified: {
      it: 'Preferisco non specificare',
      en: 'I prefer not to specify',
    },
    emailAndPassword: {
      it: 'Email e password',
      en: 'Email and password'
    },
    next: {
      it: 'Avanti',
      en: 'Next'
    },
    back: {
      it: 'Indietro',
      en: 'Back'
    },
    emailAlreadyExists: {
      it: 'Email già esistente',
      en: 'Email already exists'
    },
    roleSchoolBio: {
      it: 'Ruolo, scuola e bio',
      en: 'Role school and bio'
    },
    role: {
      it: 'Ruolo',
      en: 'Role'
    },
    school: {
      it: 'Scuola',
      en: 'School'
    },
    description: {
      it: 'Descrizione',
      en: 'Description'
    },
    teacher: {
      it: 'Insegnante',
      en: 'Teacher'
    },
    student: {
      it: 'Studente',
      en: 'Student'
    },
    other: {
      it: 'Altro',
      en: 'Other'
    },
    noteNotFound: {
      it: 'Nota non trovata',
      en: 'Note not found'
    },
    noteNotFoundSubtext: {
      it: 'Ci dispiace, ma la nota che stai cercando non esiste o è stata eliminata',
      en: 'We are sorry, but the note you are looking for does not exist or has been deleted'
    },
    accountSuccessfullyRegistered: {
      it: 'Account registrato con successo!',
      en: 'Account successfully registered!'
    },
    subject: {
      it: 'Materia',
      en: 'Subject'
    },
    emailDoesntExist: {
      it: 'Questa email non esiste',
      en: 'This email does not exist'
    },
    wrongPassword: {
      it: 'Password errata',
      en: 'Wrong password'
    },
    alreadyRegistered: {
      it: 'Hai già un\'account? Accedi',
      en: 'Do you already have an account? Sign in'
    },
    notAlreadyRegistered: {
      it: 'Non hai un account? Registrati',
      en: 'Do not have an account? Sign in'
    }
  };
  constructor() {}
  public translateSubject(sub: string): string {
    if (subjects[sub]) return subjects[sub][this.getLanguage()];
    return 'no such subject';
  }
  public translateClass(school: string): string {
    if (schools[school]) return schools[school][this.getLanguage()];
    return 'no such school';
  }
  public getSubjectIcon(sub: string) {
    if (subjects[sub] && subjects[sub].icon) return subjects[sub].icon;
  }
  public getLanguage() {
    if (navigator.language.includes('en')) return 'en';
    if (navigator.language.includes('it')) return 'it';
    return 'en';
  }
}
