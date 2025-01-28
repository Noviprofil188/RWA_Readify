const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },  // Početna stranica
      { path: 'pocetna', component: () => import('pages/PočetnaPage.vue') },  // Početna stranica (alternative)
      { path: 'login', component: () => import('pages/LoginPage.vue') },  // Login stranica
      { path: 'lokacija', component: () => import('pages/LokacijaPage.vue') },  // Stranica sa lokacijom
      { path: 'o_nama', component: () => import('pages/OnamaPage.vue') },  // O nama stranica
      { path: 'popis_knjiga', component: () => import('pages/PopisKnjigaPage.vue') },  // Popis knjiga
      { path: 'registracija', component: () => import('pages/RegistracijaPage.vue') },  // Registracija stranica
      { path: 'rezervacija', component: () => import('pages/RezervacijaPage.vue') }, //Rezervacija knjiga
      { path: '/profil', component: () => import('pages/ProfilPage.vue'), // Profilna stranica
        meta: { requiresAuth: true }} // Provjera autentifikacije 
    ]
  },

  // Admin stranica s provjerom pristupa
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'), // Koristi AdminLayout
    meta: { requiresAuth: true, role: 'admin' }, // Provjera autentifikacije i uloge
    children: [
      { path: '', component: () => import('pages/AdminPage.vue') }, // Glavna admin stranica
      { path: 'popis_knjiga', component: () => import('pages/PopisKnjigaPage.vue') }, // Popis knjiga
      { path: 'pretrazivanje', component: () => import('pages/PretrazivanjePage.vue') }, // Pretraživanje knjiga
      { path: 'popis_korisnika', component: () => import('pages/PopisKorisnikaPage.vue') }, // Pregled korisnika
      { path: 'unos_knjiga', component: () => import('pages/UnosKnjigaPage.vue') }, // Unos knjiga
      { path: 'rezervacija', component: () => import('pages/RezervacijaPage.vue') }, //Rezervacija knjiga
    ],
  },


  // Profil stranica s provjerom pristupa
  {
    path: '/profil',
    component: () => import('layouts/ProfilLayout.vue'),
    meta: { requiresAuth: true, role: 'korisnik' }, // Provjera autentifikacije i uloge
    children: [
      { path: '', component: () => import('pages/ProfilPage.vue') }, // Glavna admin stranica
      { path: 'popis_knjiga', component: () => import('pages/PopisKnjigaPage.vue') }, // Popis knjiga
    ],
  },

  // Ako korisnik pokušava pristupiti nepostojećoj stranici
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')  // Stranica koja se prikazuje za 404 greške
  }
];

export default routes;