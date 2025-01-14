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
    ]
  },

  // Admin stranica s provjerom pristupa
  {
    path: '/admin',
    component: () => import('pages/AdminLayout.vue'),
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem('role')  // Provjera pohranjenog role iz localStorage
      if (role === 'admin') {
        next()  // Ako je korisnik admin, dopuštamo pristup admin stranici
      } else {
        next('/')  // Ako nije admin, preusmjeravanje na početnu stranicu
      }
    }
  },

  // Ako korisnik pokušava pristupiti nepostojećoj stranici
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')  // Stranica koja se prikazuje za 404 greške
  }
]

export default routes;
