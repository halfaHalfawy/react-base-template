class LocaleService {
  private static _Lang_Key = "i18nextLng";
  private defaultLang!: string;
  constructor() {
    this.init = this.init.bind(this);
    this.getSavedlng = this.getSavedlng.bind(this);
  }

  getSavedlng() {
    return localStorage.getItem(LocaleService._Lang_Key) ?? this.defaultLang;
  }
  setSavedlng(lng: string) {
    localStorage.setItem(LocaleService._Lang_Key, lng);
  }
  init(defaultLang: string) {
    this.defaultLang = defaultLang;
    if (!localStorage.getItem(LocaleService._Lang_Key)) {
      localStorage.setItem(LocaleService._Lang_Key, defaultLang);
    }
  }
}

export const localeService = new LocaleService();
