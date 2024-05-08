import { E } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  public subjects: any = {
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
    other: {
      it: 'Altro',
      en: 'Other',
      icon: 'more_horiz'
    }
  };
  
  public schools: any = {
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
    other: {
      it: 'Altro',
      en: 'Other'
    }
  };

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
    roleSchoolSubjectBio: {
      it: 'Ruolo, scuola, materia e bio',
      en: 'Role, school, subject and bio'
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
    },
    copiedToClipboard: {
      it: 'Copiato negli appunti',
      en: 'Copied to clipboard'
    },
    accessFirst: {
      it: 'Non puoi procedere senza aver prima effettuato l\'accesso',
      en: 'You cannot proceed without logging in first'
    },
    userNotFound: {
      it: 'Utente non trovato',
      en: 'User not found'
    },
    userNotFoundSubtext: {
      it: 'Ci dispiace, ma l\'utente che stai cercando non esiste o è stato eliminato',
      en: 'Sorry, but the user you are looking for does not exist or has been deleted'
    },
    exit: {
      it: 'Esci',
      en: 'Exit'
    },
    myProfile: {
      it: 'Mio profilo',
      en: 'My profile'
    },
    loadImage: {
      it: 'Carica immagine',
      en: 'Load image'
    },
    deleteImage: {
      it: 'Elimina immagine',
      en: 'Delete image'
    },
    personalInfos: {
      it: 'Informazioni personali',
      en: 'Personal informations'
    },
    teaches: {
      it: 'Insegna',
      en: 'Teaches'
    },
    teachesAt: {
      it: 'Insegna presso',
      en: 'Teaches at'
    },
    studies: {
      it: 'Studia',
      en: 'Studies'
    },
    studiesAt: {
      it: 'Studia presso',
      en: 'Studies at'
    },
    at: {
      it: 'presso',
      en: 'at'
    },
    title: {
      it: 'Titolo',
      en: 'Title'
    },
    createNote: {
      it: 'Crea una nuova nota',
      en: 'Create a new note'
    },
    addTag: {
      it: 'Aggiungi tag...',
      en: 'Add tag...'
    },
    publish: {
      it: 'Pubblica',
      en: 'Publish'
    },
    titleEmptyError: {
      it: 'Il titolo non può essere vuoto',
      en: 'The title cannot be empty'
    },
    descriptionEmptyError: {
      it: 'La descrizione non può essere vuota',
      en: 'The description cannot be empty'
    },
    markdownEmptyError: {
      it: 'Il markdown non può essere vuoto',
      en: 'The markdown cannot be empty'
    },
    markdownMinCharsError: {
      it: 'Il markdown deve contenere almeno 100 caratteri',
      en: 'Markdown must contain at least 100 characters'
    },
    text: {
      it: 'Testo',
      en: 'Text'
    },
    insert: {
      it: 'Inserisci',
      en: 'Insert'
    },
    load: {
      it: 'Carica',
      en: 'Load'
    },
    italic: {
      it: 'Italico',
      en: 'Italic'
    },
    bold: {
      it: 'Grassetto',
      en: 'Bold'
    },
    strikethrough: {
      it: 'Barrato',
      en: 'Strikethrough'
    },
    bulleted_list: {
      it: 'Elenco puntato',
      en: 'Bulleted list'
    },
    numbered_list: {
      it: 'Elenco numerato',
      en: 'Numbered list'
    },
    image: {
      it: 'Immagine',
      en: 'Image'
    },
    quotation: {
      it: 'Citazione',
      en: 'Quotation'
    },
    inline_code: {
      it: 'Codice in linea',
      en: 'Inline code'
    },
    code_block: {
      it: 'Blocco di codice',
      en: 'Code block'
    },
    table: {
      it: 'Tabella',
      en: 'Table'
    },
    horizontal_line: {
      it: 'Linea orizzontale',
      en: 'Horizontal line'
    },
    notes: {
      it: 'Note',
      en: 'Notes'
    },
    edit: {
      it: 'Modifica',
      en: 'Edit'
    },
    delete: {
      it: 'Elimina',
      en: 'Delete'
    },
    update: {
      it: 'Aggiorna',
      en: 'Update'
    },
    search: {
      it: 'Cerca',
      en: 'Search'
    },
    users: {
      it: 'Utenti',
      en: 'Users'
    },
    rating: {
      it: 'Valutazione',
      en: 'Rating'
    },
    apply: {
      it: 'Applica',
      en: 'Apply'
    },
    type: {
      it: "Tipo",
      en: "Type"
    },
    clear: {
      it: 'Pulisci',
      en: 'Clear'
    }
  };
  constructor() {}
  public translateSubject(sub: string | unknown): string {
    if (this.subjects[sub as string]) return this.subjects[sub as string][this.getLanguage()];
    return 'no such subject';
  }
  public translateClass(school: string | unknown): string {
    if (this.schools[school as string]) return this.schools[school as string][this.getLanguage()];
    return 'no such school';
  }
  public getSubjectIcon(sub: string | unknown) {
    if (this.subjects[sub as string] && this.subjects[sub as string].icon) return this.subjects[sub as string].icon;
  }
  public getLanguage() {
    if (navigator.language.includes('en')) return 'en';
    if (navigator.language.includes('it')) return 'it';
    return 'en';
  }
}
