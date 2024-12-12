const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'Login', component: () => import('pages/LoginPage.vue') },
      { path: 'Lokacija', component: () => import('pages/LokacijaPage.vue') },
      { path: 'Mapa', component: () => import('pages/MapaPage.vue') },
      { path: 'Onama', component: () => import('pages/OnamaPage.vue') },
      { path: 'PopisKnjiga', component: () => import('pages/PopisKnjigaPage.vue') },
      { path: 'Registracija', component: () => import('pages/RegistracijaPage.vue') },
      { path: 'Trazi knjigu', component: () => import('pages/TraziKnjiguPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
