import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard'
const routes: Routes = [
  {
    path: "auth",
    canActivate: [AuthGuard],
    loadChildren: ()=> 
      import('././auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "",
    loadChildren: ()=>
      import('././landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: "console",
    loadChildren: ()=>
      import('././dev-console/dev-console.module').then(m => m.DevConsoleModule)
  },
  {
    path: "dashboard",
    loadChildren: ()=>
      import('././contact-data/contact-data.module').then(m => m.ContactDataModule)
  },
  {
    path: "docs",
    loadChildren: ()=>
      import('././product-docs/product-docs.module').then(m => m.ProductDocsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: NoPreloading })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
